import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { cn } from '../lib/utils';

export const TopBar = ({ 
  onBack, 
  showBack = false,
  title = "CALEB COOPER",
  headerTitle,
  activeTab,
  onTabChange,
  hideOnTop = false
}: { 
  onBack?: () => void;
  showBack?: boolean;
  title?: string;
  headerTitle?: string;
  activeTab?: 'case-study' | 'project' | 'dashboard';
  onTabChange?: (tab: 'case-study' | 'project' | 'dashboard') => void;
  hideOnTop?: boolean;
}) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnTop) {
      setIsScrolled(latest > 100);
    }
  });

  const shouldHide = hideOnTop && !isScrolled;

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-[2px] border-b border-black/5 transition-transform duration-500",
        shouldHide ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="max-w-[1700px] mx-auto w-full flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-sm font-semibold tracking-widest uppercase">{title}</h1>
        </div>

        <nav className="hidden md:flex items-center bg-transparent rounded-full p-1 border border-black/10">
          <button 
            onClick={() => onTabChange?.('dashboard')}
            className={cn(
              "px-6 py-1.5 text-sm font-medium rounded-full transition-colors",
              activeTab === 'dashboard' ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"
            )}
          >
            Dashboard
          </button>
          <button 
            onClick={() => onTabChange?.('project')}
            className={cn(
              "px-6 py-1.5 text-sm font-medium rounded-full transition-colors",
              activeTab === 'project' ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"
            )}
          >
            Project
          </button>
          <button 
            onClick={() => onTabChange?.('case-study')}
            className={cn(
              "px-6 py-1.5 text-sm font-medium rounded-full transition-colors",
              activeTab === 'case-study' ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"
            )}
          >
            Case Study
          </button>
        </nav>

        <div className="flex items-center gap-2">
           {/* Decorative profile icon or action */}
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 p-[2px]">
              <div className="w-full h-full rounded-full border-2 border-white bg-white/50" />
           </div>
        </div>
      </div>
      {headerTitle && (
        <div className="px-6 pb-6 pt-2 max-w-[1700px] mx-auto w-full">
          <h1 className="text-3xl md:text-5xl font-sans tracking-tight text-black">
            {headerTitle}
          </h1>
        </div>
      )}
    </motion.header>
  );
};

export const BottomBar = ({ 
  title, 
  onBack 
}: { 
  title?: string;
  onBack?: () => void;
}) => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed z-50 bottom-0 left-0 w-full flex items-center justify-between px-6 py-3 bg-transparent backdrop-blur-[2px] border-t border-black/5 text-xs text-gray-500"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        {title && (
          <span className="font-semibold text-black">{title}</span>
        )}
      </div>

      <div className="flex items-center gap-6 hidden md:flex">
         <span className="flex items-center gap-2 hover:text-black cursor-pointer"><span className="w-4 h-4 rounded border border-current flex items-center justify-center">D</span> Dashboard</span>
         <span className="flex items-center gap-2 hover:text-black cursor-pointer"><span className="w-4 h-4 rounded border border-current flex items-center justify-center">P</span> Project</span>
         <span className="flex items-center gap-2 hover:text-black cursor-pointer"><span className="w-4 h-4 rounded border border-current flex items-center justify-center">C</span> Case Study</span>
      </div>

      <div className="flex items-center gap-4">
         <button className="p-1 hover:text-black" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
           <ArrowUp className="w-4 h-4" />
         </button>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Live
         </div>
      </div>
    </motion.footer>
  );
};

/* ── WebflowNav ──────────────────────────────────────────────────────
   Pixel-accurate React replica of the <nav class="nav default"> from
   the Webflow project pages. Hidden until user scrolls past the first
   section, then slides in. Hamburger opens a fullscreen menu overlay
   with About / Projects / Case Studies links and an orange
   strikethrough on the active item.
   ------------------------------------------------------------------ */
export const WebflowNav = ({
  onBack,
  activeItem = 'case-study',
  brandTab,
  hideUntilScroll = true,
  onMenuNavigate,
}: {
  onBack?: () => void;
  activeItem?: 'dashboard' | 'project' | 'case-study';
  brandTab?: string;
  hideUntilScroll?: boolean;
  onMenuNavigate?: (tab: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [navVisible, setNavVisible] = useState(!hideUntilScroll);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideUntilScroll) {
      // Show after scrolling past ~90vh (first section)
      const threshold = window.innerHeight * 0.9;
      setNavVisible(latest > threshold);
    }
  });

  const handleNavigate = (href: string, tabKey?: string) => {
    setMenuOpen(false);
    if (onMenuNavigate && tabKey) {
      onMenuNavigate(tabKey);
    } else {
      window.location.assign(href);
    }
  };

  const menuItems = [
    { key: 'dashboard', label: 'About', href: '/work?tab=dashboard' },
    { key: 'project', label: 'Projects', href: '/work?tab=project' },
    { key: 'case-study', label: 'Case Studies', href: '/work?tab=case-study' },
  ];

  return (
    <>
      {/* ── Fixed Nav Bar — slides in/out ── */}
      <nav
        style={{
          zIndex: 999,
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          transform: navVisible || menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.5s cubic-bezier(.65,0,.35,1)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '10.8vh',
            backgroundColor: '#cdc6be',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4vh 2vw',
          }}
        >
          {/* Left — location: navigates to About/dashboard */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <a
              href="/work?tab=dashboard"
              onClick={(e) => { e.preventDefault(); handleNavigate('/work?tab=dashboard', 'dashboard'); }}
              style={{
                letterSpacing: 0,
                fontSize: '1.8vh',
                lineHeight: '2vh',
                color: '#1d1d1b',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              South Florida, USA
            </a>
          </div>

          {/* Center — brand: navigates to brandTab if set, else current tab */}
          <a
            href={`/work?tab=${brandTab ?? activeItem}`}
            onClick={(e) => { e.preventDefault(); handleNavigate(`/work?tab=${brandTab ?? activeItem}`, brandTab ?? activeItem); }}
            style={{
              display: 'flex',
              position: 'relative',
              textDecoration: 'none',
              width: 'auto',
            }}
          >
            <div
              style={{
                fontFamily: "'Canopee', sans-serif",
                fontSize: '3.5vh',
                lineHeight: 1,
                color: '#1d1d1b',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                marginTop: '0.5vh',
              }}
            >
              The AI Library
            </div>
          </a>

          {/* Right — hamburger */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '6px',
                padding: '8px',
              }}
            >
              <div style={{
                width: '2rem', height: '2px', backgroundColor: '#1d1d1b',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }} />
              <div style={{
                width: '2rem', height: '2px', backgroundColor: '#1d1d1b',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Fullscreen Menu Overlay ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          backgroundColor: '#1d1d1b',
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '15vh',
          overflow: 'hidden',
        }}
      >
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {menuItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavigate(item.href, item.key); }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <h1
                style={{
                  color: '#cdc6be',
                  paddingTop: '3vh',
                  paddingRight: '2vh',
                  fontSize: '30vh',
                  lineHeight: '20vh',
                  fontFamily: "'Canopee', sans-serif",
                  letterSpacing: '-0.02em',
                  transition: 'letter-spacing 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.letterSpacing = '0.05em'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.letterSpacing = '-0.02em'; }}
              >
                {item.label}
              </h1>
              {/* Orange strikethrough on active item */}
              {item.key === activeItem && (
                <div style={{
                  position: 'absolute',
                  left: '5%',
                  right: '5%',
                  top: '55%',
                  height: '1.5vh',
                  backgroundColor: '#c03f13',
                  transformOrigin: '0%',
                  pointerEvents: 'none',
                }} />
              )}
            </a>
          ))}
        </div>

        {/* Close button — top right inside overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '4vh',
            right: '2vw',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '6px',
            padding: '8px',
            zIndex: 9999,
          }}
        >
          <div style={{ width: '2rem', height: '2px', backgroundColor: '#cdc6be', transform: 'rotate(45deg) translateY(4px)' }} />
          <div style={{ width: '2rem', height: '2px', backgroundColor: '#cdc6be', transform: 'rotate(-45deg) translateY(-4px)' }} />
        </div>
      </div>
    </>
  );
};

