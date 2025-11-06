import { Github, Twitter, Linkedin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const EMOJIS = ['❤️', '💖', '💕'];
const EMOJI_COUNT = 50;

interface Emoji {
  id: string;
  blastId: number;
  emoji: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
  rotation: number;
}

const Footer = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  const handleHeartClick = () => {
    const blastId = Date.now();
    const newEmojis: Emoji[] = Array.from({ length: EMOJI_COUNT }).map((_, i) => {
      const duration = 3 + Math.random() * 3;
      const delay = Math.random() * 1.5;
      return {
        id: `${blastId}-${i}`,
        blastId,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: Math.random() * 100,
        y: Math.random() * 50 - 100,
        duration,
        delay,
        size: 20 + Math.random() * 25,
        rotation: Math.random() * 360 - 180,
      };
    });

    setEmojis(current => [...current, ...newEmojis]);

    const maxDuration = newEmojis.reduce((max, e) => Math.max(max, e.duration + e.delay), 0);

    setTimeout(() => {
      setEmojis(current => current.filter(e => e.blastId !== blastId));
    }, maxDuration * 1000 + 500);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {emojis.map(({ id, emoji, x, y, duration, delay, size, rotation }) => (
          <motion.div
            key={id}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: '-100vh', opacity: 0, scale: 0.5, rotate: rotation }}
            transition={{ duration, delay, ease: 'easeOut' }}
            style={{ position: 'absolute', left: `${x}vw`, bottom: `${y}px`, fontSize: `${size}px`, willChange: 'transform, opacity' }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
      <footer className="bg-black text-gray-400 py-8 px-4 sm:px-6 lg:px-8 z-10 relative border-t border-gray-800 rounded-t-2xl overflow-hidden">
        <div className="footer-glow-circles" aria-hidden="true">
          <div className="footer-glow-circle"></div>
          <div className="footer-glow-circle"></div>
          <div className="footer-glow-circle"></div>
          <div className="footer-glow-circle"></div>
          <div className="footer-glow-circle"></div>
          <div className="footer-glow-circle"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-6xl md:text-9xl font-normal text-white/5">
            Tagthem.app
          </span>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="footer-top">
            <div className="footer-top-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/imprint">Imprint</Link>
              <Link to="/report-bug">Report a Bug</Link>
            </div>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="social-icon" aria-label="GitHub"><Github size={20} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="copyright">&copy; {new Date().getFullYear()} Tagthem.app</span>
            <a href="#" className="back-to-top" onClick={scrollToTop}>
              BACK TO TOP <ArrowUp size={16} className="inline-block ml-1" />
            </a>
          </div>
          <div className="footer-credit">
            Made with{' '}
            <span className="heart-container" onClick={handleHeartClick}>
              ❤️
              <span className="heart-tooltip">click for a ❤️</span>
            </span>{' '}
            by <a href="https://paulify.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">Paulify Dev</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;