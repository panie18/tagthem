import { Outlet, useLocation } from "react-router-dom";
import CardNav from '@/components/CardNav';
import logo from '/logo.svg';
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navItems = [
    {
      label: "Get Started",
      bgColor: "#0368A6",
      textColor: "#fff",
      links: [
        { label: "Generate Tag", ariaLabel: "Installation Guide", href: "/create" },
        { label: "Features", ariaLabel: "Usage Guide", href: "/#features" }
      ]
    },
    {
      label: "Community", 
      bgColor: "#0477BF",
      textColor: "#fff",
      links: [
        { label: "GitHub", ariaLabel: "GitHub Repository", href: "#" },
        { label: "Report a Bug", ariaLabel: "Report a Bug", href: "/report-bug" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#049DD9", 
      textColor: "#fff",
      links: [
        { label: "Contact Us", ariaLabel: "Contact Us", href: "/contact" }
      ]
    }
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-black font-sans text-white">
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={navItems}
        baseColor="rgba(10, 10, 10, 0.7)"
        menuColor="#fff"
        buttonBgColor="#0487D9"
        buttonTextColor="#fff"
        ctaLink="/create"
      />

      <main className={`relative z-10 flex-grow ${!isHomePage ? 'flex items-center justify-center p-4 pt-24 md:pt-32' : ''}`}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;