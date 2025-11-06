import MagicBento from '@/components/MagicBento';
import Aurora from '@/components/Aurora';
import { Link } from 'react-router-dom';
import ShinyText from '@/components/ShinyText';
import SplitText from '@/components/SplitText';

const Showcase = () => {
  return (
    <div className="w-full">
      <div className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <SplitText
            text="Tired of losing your items?"
            tag="h1"
            className="text-5xl md:text-7xl lg:text-8xl font-normal"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            delay={50}
            duration={0.6}
            ease="power3.out"
          />
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mt-6">
            Tag them. Find them. Simple.
          </p>
          <Link
            to="/create"
            className="mt-8 inline-flex items-center justify-center bg-[#0487D9] text-white font-medium py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            <ShinyText text="Generate Tag" speed={3} />
          </Link>
        </div>
      </div>
      
      <div className="max-w-[54em] mx-auto px-[0.75em]">
        <hr className="border-t border-gray-800" />
      </div>

      <div id="features" className="scroll-mt-24">
        <MagicBento />
      </div>
    </div>
  );
};

export default Showcase;