import { forwardRef } from 'react';
import logo from '/logo.svg';
import { Mail, Phone } from 'lucide-react';
import QRCodeStyled from './QRCodeStyled';

interface StickerPreviewProps {
  options: {
    width: number;
    height: number;
    message: string;
    showEmail: boolean;
    showPhone: boolean;
  };
  tagData: {
    email?: string | null;
    phone?: string | null;
  } | null;
  foundUrl: string;
}

const StickerPreview = forwardRef<HTMLDivElement, StickerPreviewProps>(({ options, tagData, foundUrl }, ref) => {
  const CM_TO_PX = 37.8;
  const widthPx = options.width * CM_TO_PX;
  const heightPx = options.height * CM_TO_PX;
  const smallerDimPx = Math.min(widthPx, heightPx);
  
  const qrContainerSize = smallerDimPx * 0.55;
  const qrSize = qrContainerSize * 0.95;
  const logoSize = smallerDimPx * 0.1;
  const messageFontSize = smallerDimPx * 0.06;
  const contactFontSize = smallerDimPx * 0.045;
  const contactIconSize = smallerDimPx * 0.05;
  const domainFontSize = smallerDimPx * 0.05;

  return (
    <div
      ref={ref}
      className="bg-white text-black p-4 rounded-lg flex flex-col items-center justify-around text-center"
      style={{ width: widthPx, height: heightPx }}
    >
      <img src={logo} alt="TagThem Logo" style={{ height: `${logoSize}px`, filter: 'invert(1)' }} />
      
      <p className="font-bold" style={{ fontSize: `${messageFontSize}px`, padding: '0 4px', margin: 'auto 0' }}>{options.message}</p>
      
      <div style={{ width: qrContainerSize, height: qrContainerSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <QRCodeStyled
          options={{
            width: qrSize,
            height: qrSize,
            data: foundUrl,
            qrOptions: { errorCorrectionLevel: 'H' }
          }}
        />
      </div>
      
      <div className="flex flex-col items-center justify-center gap-1" style={{ fontSize: `${contactFontSize}px`, margin: 'auto 0' }}>
        {options.showEmail && tagData?.email && (
          <div className="flex items-center gap-1.5">
            <Mail size={contactIconSize} />
            <span>{tagData.email}</span>
          </div>
        )}
        {options.showPhone && tagData?.phone && (
          <div className="flex items-center gap-1.5">
            <Phone size={contactIconSize} />
            <span>{tagData.phone}</span>
          </div>
        )}
      </div>
      
      <p className="font-semibold" style={{ fontSize: `${domainFontSize}px` }}>tagthem.app</p>
    </div>
  );
});

export default StickerPreview;