"use client";

import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import whiteLogo from '/logo.svg';

// This function creates a black version of the logo on the fly for light backgrounds
const createBlackLogo = (callback: (blackLogoUrl: string) => void) => {
  const img = new Image();
  img.src = whiteLogo;
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL('image/png'));
    }
  };
};

interface QRCodeStyledProps {
  options: Partial<Options>;
  className?: string;
  onInstance?: (instance: QRCodeStyling) => void;
  useWhiteLogo?: boolean;
}

const QRCodeStyled = ({ options, className, onInstance, useWhiteLogo = false }: QRCodeStyledProps) => {
  const [logoUrl, setLogoUrl] = useState<string>(whiteLogo);
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

  useEffect(() => {
    if (!useWhiteLogo) {
      createBlackLogo(setLogoUrl);
    } else {
      setLogoUrl(whiteLogo);
    }
  }, [useWhiteLogo]);

  useEffect(() => {
    if (ref.current && logoUrl) {
      const finalOptions: Partial<Options> = {
        width: 300,
        height: 300,
        image: logoUrl,
        dotsOptions: {
          color: '#000000',
          type: 'rounded'
        },
        cornersSquareOptions: {
          type: 'extra-rounded'
        },
        imageOptions: {
          imageSize: 0.4,
          margin: 4
        },
        ...options
      };

      if (!qrCode.current) {
        qrCode.current = new QRCodeStyling(finalOptions);
        qrCode.current.append(ref.current);
      } else {
        qrCode.current.update(finalOptions);
      }
      if (onInstance && qrCode.current) {
        onInstance(qrCode.current);
      }
    }
  }, [options, logoUrl, onInstance]);

  return <div ref={ref} className={className} />;
};

export default QRCodeStyled;