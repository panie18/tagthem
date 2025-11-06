import { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import './CardNav.css';
import ShinyText from './ShinyText';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  ctaLink
}: {
    logo: string;
    logoAlt?: string;
    items: {
        label: string;
        bgColor: string;
        textColor: string;
        links: {
            label: string;
            ariaLabel: string;
            href: string;
        }[];
    }[];
    className?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    ctaLink?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const CtaButton = () => {
    const styles = { 
      backgroundColor: buttonBgColor, 
      color: buttonTextColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none'
    };
    const className = "card-nav-cta-button";

    if (ctaLink) {
      return (
        <Link to={ctaLink} className={className} style={styles}>
          <ShinyText text="Get Started" speed={3} />
        </Link>
      );
    }

    return (
      <button type="button" className={className} style={styles}>
        <ShinyText text="Get Started" speed={3} />
      </button>
    );
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isExpanded ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt={logoAlt} className="logo" />
            </Link>
          </div>

          <CtaButton />
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a key={`${lnk.label}-${i}`} className="nav-card-link" href={lnk.href} aria-label={lnk.ariaLabel}>
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;