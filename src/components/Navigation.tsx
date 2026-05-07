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
  activeTab?: 'case-study' | 'project' | 'dashboard' | 'library';
  onTabChange?: (tab: 'case-study' | 'project' | 'dashboard' | 'library') => void;
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
            About
          </button>
          <button 
            onClick={() => onTabChange?.('project')}
            className={cn(
              "px-6 py-1.5 text-sm font-medium rounded-full transition-colors",
              (activeTab === 'project' || activeTab === 'case-study' || activeTab === 'library') ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"
            )}
          >
            Library
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
         <span className="flex items-center gap-2 hover:text-black cursor-pointer"><span className="w-4 h-4 rounded border border-current flex items-center justify-center">A</span> About</span>
         <span className="flex items-center gap-2 hover:text-black cursor-pointer"><span className="w-4 h-4 rounded border border-current flex items-center justify-center">L</span> Library</span>

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
  revealOnHover,
  backLabel,
  onMenuNavigate,
}: {
  onBack?: () => void;
  activeItem?: 'dashboard' | 'project' | 'case-study' | 'library';
  brandTab?: string;
  hideUntilScroll?: boolean;
  revealOnHover?: boolean;
  backLabel?: string;
  onMenuNavigate?: (tab: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [backHovered, setBackHovered] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scrollY } = useScroll();
  const getScrollThreshold = () =>
    typeof window === 'undefined' ? 0 : window.innerHeight * 0.9;
  const [navVisible, setNavVisible] = useState(() =>
    hideUntilScroll
      ? (typeof window !== 'undefined' ? window.scrollY > getScrollThreshold() : false)
      : true
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideUntilScroll) {
      // Show after scrolling past ~90vh (first section)
      const threshold = getScrollThreshold();
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

  const backLabelText = backLabel ?? 'Back To Library';
  const brandHref = brandTab === 'dashboard' ? '/CalebCooper' : '/CalebCooper/Library';
  const brandLabel = activeItem === 'dashboard' ? 'Caleb Cooper' : 'Library';
  const menuItems = [
    { key: 'dashboard', label: 'About', href: '/CalebCooper' },
    { key: 'project', label: 'Library', href: '/CalebCooper/Library' },

  ];

  const navBrandTextStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.7rem, 3.4vw, 3.3rem)',
    lineHeight: 0.92,
    letterSpacing: '-0.035em',
    color: '#1d1d1b',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 700,
  };

  const overlayLabelStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', ui-monospace, monospace",
    fontSize: '0.72rem',
    lineHeight: 1,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: 'rgba(205,198,190,0.56)',
    marginBottom: '0.8rem',
  };

  const overlayTitleStyle: React.CSSProperties = {
    color: '#cdc6be',
    fontSize: 'clamp(4.5rem, 11vw, 9rem)',
    lineHeight: 0.9,
    fontFamily: "'Playfair Display', 'Canopee', serif",
    fontWeight: 700,
    letterSpacing: '-0.035em',
    transition: 'letter-spacing 0.3s ease-in-out, color 0.3s ease-in-out',
  };

  return (
    <>
      {revealOnHover && !menuOpen && (
        <div
          onMouseEnter={() => setHovered(true)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '4rem',
            zIndex: 998,
          }}
        />
      )}
      {/* ── Fixed Nav Bar — slides in/out ── */}
      <nav
        onMouseEnter={() => revealOnHover && setHovered(true)}
        onMouseLeave={() => revealOnHover && setHovered(false)}
        style={{
          zIndex: 999,
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          transform: revealOnHover
            ? (hovered || menuOpen ? 'translateY(0)' : 'translateY(-100%)')
            : (navVisible || menuOpen ? 'translateY(0)' : 'translateY(-100%)'),
          transition: 'transform 0.5s cubic-bezier(.65,0,.35,1)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '10.8vh',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4vh 2vw',
          }}
        >
          <div className="hidden md:flex" style={{ flex: 1, alignItems: 'center', gap: '1rem' }}>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                onMouseEnter={() => setBackHovered(true)}
                onMouseLeave={() => setBackHovered(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.8rem',
                  height: '2.8rem',
                  padding: 0,
                  borderRadius: '999px',
                  border: backHovered ? '1px solid rgba(29,29,27,0.2)' : '1px solid transparent',
                  background: backHovered ? 'rgba(255,255,255,0.22)' : 'transparent',
                  color: '#1d1d1b',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'background 0.22s ease, border-color 0.22s ease, transform 0.22s ease',
                  transform: backHovered ? 'scale(1.04)' : 'scale(1)',
                }}
                aria-label={backLabelText}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.22s ease',
                    transform: backHovered ? 'translateX(-1px)' : 'translateX(0)',
                  }}
                >
                  <ArrowLeft className="w-4 h-4" />
                </span>
              </button>
            )}
          </div>

          {/* Center — brand: navigates to brandTab if set, else current tab */}
          <a
            href={brandHref}
            className="hidden md:flex"
            onClick={(e) => { e.preventDefault(); handleNavigate(brandHref, brandTab ?? activeItem); }}
            style={{
              position: 'relative',
              textDecoration: 'none',
              width: 'auto',
            }}
          >
            <div
              style={navBrandTextStyle}
            >
              {brandLabel}
            </div>
          </a>

          {/* Right — hamburger */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem' }}>
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
          {menuItems.map((item, index) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavigate(item.href, item.key); }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: 'pointer',
                padding: '1.2rem 0',
              }}
            >
              <span style={overlayLabelStyle}>
                {String(index + 1).padStart(2, '0')} / Navigate
              </span>
              <h1
                style={overlayTitleStyle}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.letterSpacing = '-0.01em';
                  (e.target as HTMLElement).style.color = '#f3ca62';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.letterSpacing = '-0.035em';
                  (e.target as HTMLElement).style.color = '#cdc6be';
                }}
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

