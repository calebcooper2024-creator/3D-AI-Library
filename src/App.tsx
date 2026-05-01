import React, { useEffect, useRef, useState } from 'react';
import { Bookshelf } from './components/Bookshelf';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { HomeView } from './components/HomeView';
import { projects } from './data/portfolio';
import { works } from './data/works';
import { aboutMeBook } from './data/aboutMe';
import { WebflowNav } from './components/Navigation';
import { AnimatePresence, motion } from 'motion/react';

type ActiveView = 'home' | 'case-study' | 'project';

const getActiveViewFromLocation = (): ActiveView => {
  const tab = new URLSearchParams(window.location.search).get('tab');
  if (tab === 'project') return 'project';
  if (tab === 'case-study') return 'case-study';
  return 'home'; // default landing — also handles ?tab=dashboard
};

const getActiveViewUrl = (tab: ActiveView) => {
  const url = new URL(window.location.href);
  url.searchParams.set('tab', tab === 'home' ? 'dashboard' : tab);
  return `${url.pathname}${url.search}${url.hash}`;
};

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>(() => getActiveViewFromLocation());
  const [isHomeTransitioning, setIsHomeTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  const syncHistoryForView = (tab: ActiveView, mode: 'push' | 'replace' = 'replace') => {
    const nextUrl = getActiveViewUrl(tab);
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl === currentUrl) return;
    const nextState = { ...(window.history.state ?? {}), tab };
    if (mode === 'push') {
      window.history.pushState(nextState, '', nextUrl);
    } else {
      window.history.replaceState(nextState, '', nextUrl);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setSelectedBookId(null);
      setIsHomeTransitioning(false);
      setActiveView(getActiveViewFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const handleTabChange = (tab: string) => {
    if (isHomeTransitioning || selectedBookId) return;

    const nextView: ActiveView | null =
      tab === 'dashboard'   ? 'home' :
      tab === 'project'     ? 'project' :
      tab === 'case-study'  ? 'case-study' : null;

    if (!nextView) return;

    const alreadyHere =
      (nextView === 'home' && activeView === 'home') || nextView === activeView;
    if (alreadyHere) return;

    const effect = (window as any).paperCurtainEffect;
    const durationMs: number = (window as any).paperCurtainDuration ?? 1400;

    if (effect) {
      effect.in();
      setTimeout(() => {
        setSelectedBookId(null);
        setActiveView(nextView);
        syncHistoryForView(nextView, 'push');
        effect.out();
      }, durationMs);
    } else {
      setSelectedBookId(null);
      setActiveView(nextView);
      syncHistoryForView(nextView, 'push');
    }
  };

  // For bookshelf views only
  const allBooks = activeView === 'case-study' ? projects : works;

  const selectedBook =
    activeView === 'home'
      ? (selectedBookId === aboutMeBook.id ? aboutMeBook : null)
      : activeView === 'case-study'
      ? projects.find((b) => b.id === selectedBookId) ?? null
      : null;

  const handleBookSelect = (id: string) => {
    if (isHomeTransitioning) return;

    const effect = (window as any).paperCurtainEffect;
    const durationMs: number = (window as any).paperCurtainDuration ?? 1400;

    // Project view books always navigate externally via detailHref
    if (activeView === 'project') {
      const targetBook = works.find((b) => b.id === id);
      if (!targetBook || !targetBook.detailHref) return;
      setIsHomeTransitioning(true);
      if (effect) {
        effect.in();
        if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = window.setTimeout(() => {
          syncHistoryForView(activeView, 'replace');
          window.location.assign(targetBook.detailHref!);
        }, durationMs);
      } else {
        if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = window.setTimeout(() => {
          syncHistoryForView(activeView, 'replace');
          window.location.assign(targetBook.detailHref!);
        }, 420);
      }
      return;
    }

    // Home and case-study views open CaseStudyDetail
    setIsHomeTransitioning(true);
    if (effect) {
      effect.in();
      if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => {
        setSelectedBookId(id);
        setIsHomeTransitioning(false);
        transitionTimerRef.current = null;
        effect.out();
      }, durationMs);
    } else {
      if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => {
        setSelectedBookId(id);
        setIsHomeTransitioning(false);
        transitionTimerRef.current = null;
      }, 420);
    }
  };

  const handleCloseDetail = () => {
    setSelectedBookId(null);
    setIsHomeTransitioning(false);
  };

  const navActiveItem: 'dashboard' | 'project' | 'case-study' =
    activeView === 'home' ? 'dashboard' :
    activeView === 'project' ? 'project' : 'case-study';

  return (
    <div className="min-h-screen bg-transparent">
      <AnimatePresence mode="wait">
        {!selectedBookId && (
          <motion.div
            key={`view-${activeView}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: isHomeTransitioning ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.4, 0, 0.2, 1] }}
            className={isHomeTransitioning ? 'pointer-events-none' : undefined}
          >
            <WebflowNav
              activeItem={navActiveItem}
              brandTab="project"
              hideUntilScroll={false}
              onMenuNavigate={handleTabChange}
            />
            {activeView === 'home' ? (
              <HomeView
                onSelectBook={handleBookSelect}
                isTransitioning={isHomeTransitioning}
              />
            ) : (
              <div style={{ position: 'relative' }}>
                <div style={{
                  filter: activeView === 'case-study' ? 'blur(3px)' : 'none',
                  transition: 'filter 0.4s ease',
                }}>
                  <Bookshelf
                    books={allBooks}
                    onSelectBook={activeView === 'case-study' ? () => {} : handleBookSelect}
                    isTransitioning={isHomeTransitioning}
                  />
                </div>
                {activeView === 'case-study' && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 50,
                    pointerEvents: 'none',
                  }}>
                    <div style={{
                      background: 'rgba(29, 29, 27, 0.85)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '12px',
                      padding: '3rem 4rem',
                      textAlign: 'center',
                      border: '1px solid rgba(205, 198, 190, 0.15)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    }}>
                      <div style={{
                        fontFamily: "'Canopee', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        color: '#cdc6be',
                        lineHeight: 1.1,
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em',
                      }}>
                        Under Construction
                      </div>
                      <div style={{
                        width: '60px',
                        height: '2px',
                        background: '#c03f13',
                        margin: '0 auto 1.2rem',
                      }} />
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                        color: 'rgba(205, 198, 190, 0.6)',
                        lineHeight: 1.6,
                        maxWidth: '380px',
                        letterSpacing: '0.02em',
                      }}>
                        Case studies are being finalized and will be available soon. Check back shortly.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {selectedBookId && selectedBook && (
          <CaseStudyDetail
            key="detail"
            book={selectedBook}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
