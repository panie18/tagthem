import { useRef, useEffect, useState } from 'react';
import './MagicBento.css';

const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    color: '#060010',
    title: 'NFC & QR Tags',
    description: 'Generate both NFC and QR code tags for maximum compatibility.',
    label: 'Technology'
  },
  {
    color: '#060010',
    title: 'Simple Setup',
    description: 'Enter your contact info and generate your unique tag in seconds.',
    label: 'Ease of Use'
  },
  {
    color: '#060010',
    title: 'Instant Contact',
    description: 'Finders can scan the tag to see your contact details immediately.',
    label: 'Speed'
  },
  {
    color: '#060010',
    title: 'Privacy Control',
    description: 'You choose what information to share on your tag.',
    label: 'Security'
  },
  {
    color: '#060010',
    title: 'No App Required',
    description: 'Works on any smartphone without needing a special app.',
    label: 'Accessibility'
  },
  {
    color: '#060010',
    title: 'Versatile Use',
    description: 'Perfect for keys, wallets, pets, luggage, and more.',
    label: 'Flexibility'
  }
];

const BentoCardGrid = ({ children, gridRef }: any) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const MagicBento = ({
  textAutoHide = true,
  enableBorderGlow = true,
  disableAnimations = false,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || shouldDisableAnimations || !enableBorderGlow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = (grid as HTMLElement).querySelectorAll('.card--border-glow');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--glow-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--glow-y', `${y}px`);
      });
    };

    grid.addEventListener('mousemove', handleMouseMove);

    return () => {
      grid.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shouldDisableAnimations, enableBorderGlow]);


  return (
    <div className="py-16">
      <div className="w-full max-w-[54em] mx-auto px-[0.75em] text-center">
        <h2 className="text-5xl md:text-6xl font-normal mb-8">
          Features
        </h2>
      </div>
      
      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`card ${textAutoHide ? 'card--text-autohide' : ''} ${enableBorderGlow && !shouldDisableAnimations ? 'card--border-glow' : ''}`}
            style={{ backgroundColor: card.color }}
          >
            <div className="card__header">
              <div className="card__label">{card.label}</div>
            </div>
            <div className="card__content">
              <h2 className="card__title">{card.title}</h2>
              <p className="card__description">{card.description}</p>
            </div>
          </div>
        ))}
      </BentoCardGrid>
    </div>
  );
};

export default MagicBento;
