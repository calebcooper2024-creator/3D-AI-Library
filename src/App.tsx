import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Bookshelf } from './components/Bookshelf';
import { HomeView } from './components/HomeView';
import { ProjectEntryOverlay } from './components/ProjectEntryOverlay';
import { projects, BookProject as PortfolioBook } from './data/portfolio';
import { works } from './data/works';
import {
  loadBookData,
  hasCustomBookData,
  getCachedBookData,
  CUSTOM_WORK_DETAIL_IDS,
} from './data/bookDataLoader';
import type { SectionContent } from './data/caseStudyMeta';
import { WebflowNav } from './components/Navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ShelfBook } from './components/Bookshelf';
import { prepareProjectEntry } from './lib/projectEntryGate';
import { setHeavyMotion } from './lib/heavyMotion';
import { getWorkDetail } from './data/workDetails';
import { clearVideoReadiness } from './lib/videoReadinessTracker';

// ---------- Lazy-loaded detail views ----------
// These are code-split into their own chunks and only loaded when a book is opened.
const loadCaseStudyDetailModule = () => import('./components/CaseStudyDetail');
const CaseStudyDetail = React.lazy(() =>
  loadCaseStudyDetailModule().then((m) => ({ default: m.CaseStudyDetail }))
);
const loadProjectDetailPageModule = () => import('./components/project/ProjectDetailPage');
const ProjectDetailPage = React.lazy(() =>
  loadProjectDetailPageModule().then((m) => ({
    default: m.ProjectDetailPage,
  }))
);
const Placeholder404Page = React.lazy(() =>
  import('./components/Placeholder404Page').then((m) => ({
    default: m.Placeholder404Page,
  }))
);

// ---------- Shelf book data (for shelf rendering + detail fallback) ----------
// aboutMeBook and aiLibraryBook are statically imported because they're needed
// for the HomeView featured shelf and the unified book list. Their full sections
// are included but the cost is acceptable (~40 kB combined).
import { aboutMeBook } from './data/aboutMe';
import { aiLibraryBook } from './data/aiLibraryBook';

type ActiveView = 'home' | 'case-study' | 'project';
type LibraryBook = ShelfBook & {
  type: 'work' | 'case-study';
  sections?: SectionContent[];
};

const AVAILABLE_CASE_STUDY_IDS = new Set(['summit-health', 'cellcore']);
const ABOUT_CASE_STUDY_ID = 'about-caleb';
const AI_LIBRARY_DETAIL_ID = 'ai-library';
const PLACEHOLDER_404_ID = '404-under-construction';
const ROUTES = {
  about: '/CalebCooper',
  library: '/CalebCooper/Library',
  standalone404: '/CalebCooper/404-under-construction',
} as const;

const PLAYGROUND_TARGETS: Record<string, string> = {
  'ai-library': ROUTES.library,
  'global-intelligence-market': '/work/global-intelligence-market/playground/index.html',
  'brokie-v2': '/work/brokie-v2/brokie-playground/index.html',
  cortex: '/cortex-playground/dist/index.html',
  'life-tap-labs': '/work/life-tap-labs/ltl-playground/dist/index.html',
  panopticon: '/work/panopticon/panopticon-playground/World Model.html',
  bonnie: '/work/bonnie/bonnie-playground/dist/index.html',
  byc2w: '/work/byc2w/playground/dist/index.html',
  boonk: '/work/boonk/boonk-v2-app/dist/index.html',
  'brokie-v1': '/work/brokie-v1-app/out/index.html',
};

const normalizePathname = (pathname: string) => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed.length > 0 ? trimmed : '/';
};

const getDetailRoute = (book: { id: string; type: 'work' | 'case-study' }) =>
  `${ROUTES.library}/${book.id}`;

const getPlaygroundRoute = (slug: string) => `${ROUTES.library}/${slug}/Playground`;

const getPlaygroundTarget = (slug: string) => PLAYGROUND_TARGETS[slug] ?? null;

const getLegacyCanonicalRoute = (pathname: string, search: string) => {
  const normalizedPath = normalizePathname(pathname);
  const params = new URLSearchParams(search);
  const tab = params.get('tab');
  const project = params.get('project');
  const caseStudy = params.get('caseStudy');

  if (normalizedPath === '/') {
    return ROUTES.standalone404;
  }

  if (normalizedPath === '/about') {
    return ROUTES.about;
  }

  if (normalizedPath === '/work') {
    if (tab === 'dashboard') {
      return ROUTES.about;
    }

    if (project || caseStudy) {
      return `${ROUTES.library}/${project ?? caseStudy}`;
    }

    return ROUTES.library;
  }

  if (normalizedPath.startsWith('/work/')) {
    const slug = normalizedPath
      .replace(/^\/work\//, '')
      .replace(/\/index\.html$/, '')
      .replace(/\/$/, '');
    return slug ? getDetailRoute({ id: slug, type: 'work' }) : ROUTES.library;
  }

  if (normalizedPath === '/work?') {
    return ROUTES.library;
  }

  return null;
};

const createUnavailableCaseStudy = (book: PortfolioBook): PortfolioBook => ({
  ...book,
  sections: [
    {
      id: `${book.id}-unavailable`,
      fullWidthContent: (
        <div className="relative min-h-screen overflow-hidden bg-[#e2dedb] text-[#161312]">
          {book.coverImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
              style={{ backgroundImage: `url('${book.coverImage}')` }}
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(226,222,219,0.96))]" />
          <div className="relative z-10 flex min-h-screen items-center justify-center px-8 py-24">
            <div className="w-full max-w-4xl border border-black/10 bg-white/75 p-10 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm md:p-16">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.38em] text-black/55">
                Case Study / Currently Unavailable
              </p>
              <h1 className="mb-5 font-serif text-5xl leading-[0.9] tracking-tight text-black md:text-7xl">
                {book.title}
              </h1>
              <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-black/48">
                {book.subtitle}
              </p>
              <div className="mb-10 h-px w-16 bg-black/16" />
              <p className="max-w-2xl font-serif text-2xl leading-tight text-black md:text-3xl">
                Currently unavailable. Check back soon.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]
});

const getRouteSnapshotFromLocation = () => {
  const pathname = normalizePathname(window.location.pathname);
  const search = window.location.search;
  const legacyCanonicalRoute = getLegacyCanonicalRoute(pathname, search);

  if (pathname === ROUTES.standalone404) {
    return { kind: 'standalone-404' as const, canonicalUrl: ROUTES.standalone404 };
  }

  if (pathname === ROUTES.about) {
    return { kind: 'home' as const, canonicalUrl: ROUTES.about };
  }

  if (pathname === ROUTES.library) {
    return { kind: 'library' as const, canonicalUrl: ROUTES.library };
  }

  if (pathname.startsWith(`${ROUTES.library}/`)) {
    const detailPath = pathname.slice(ROUTES.library.length + 1);
    const playgroundSuffix = '/Playground';

    if (detailPath.endsWith(playgroundSuffix)) {
      const slug = detailPath.slice(0, -playgroundSuffix.length);
      return {
        kind: 'playground' as const,
        slug,
        canonicalUrl: getPlaygroundRoute(slug),
      };
    }

    return {
      kind: 'detail' as const,
      slug: detailPath,
      canonicalUrl: getDetailRoute({ id: detailPath, type: 'work' }),
    };
  }

  if (legacyCanonicalRoute) {
    if (legacyCanonicalRoute === ROUTES.about) {
      return { kind: 'home' as const, canonicalUrl: ROUTES.about };
    }

    if (legacyCanonicalRoute.startsWith(`${ROUTES.library}/`)) {
      const detailSuffix = legacyCanonicalRoute.slice(ROUTES.library.length + 1);
      if (detailSuffix.endsWith('/Playground')) {
        const slug = detailSuffix.slice(0, -'/Playground'.length);
        return {
          kind: 'playground' as const,
          slug,
          canonicalUrl: legacyCanonicalRoute,
        };
      }

      return {
        kind: 'detail' as const,
        slug: detailSuffix,
        canonicalUrl: legacyCanonicalRoute,
      };
    }
  }

  return { kind: 'home' as const, canonicalUrl: ROUTES.about };
};

const getActiveViewFromLocation = (): ActiveView => {
  const route = getRouteSnapshotFromLocation();
  if (route.kind === 'standalone-404') return 'project';
  if (route.kind === 'library' || route.kind === 'detail' || route.kind === 'playground') {
    return 'project';
  }
  return 'home';
};

const getActiveViewUrl = (tab: ActiveView) => {
  if (tab === 'home') return ROUTES.about;
  return ROUTES.library;
};

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedBookType, setSelectedBookType] = useState<'work' | 'case-study' | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>(() => getActiveViewFromLocation());
  const [isHomeTransitioning, setIsHomeTransitioning] = useState(false);
  const [entryOverlay, setEntryOverlay] = useState<{
    visible: boolean;
    title: string | null;
    progress: number;
    phase: string;
  }>({
    visible: false,
    title: null,
    progress: 0,
    phase: 'starting',
  });
  const [availabilityNotice, setAvailabilityNotice] = useState<{ title: string; message: string } | null>(null);
  // Lazily-resolved book data for the detail view
  const [resolvedBookData, setResolvedBookData] = useState<PortfolioBook | null>(null);
  const [isLoadingBookData, setIsLoadingBookData] = useState(false);
  const [bookLoadError, setBookLoadError] = useState<string | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const entryRequestRef = useRef(0);

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

  const handleTabChange = (tab: string) => {
    if (isHomeTransitioning) return;

    const nextView: ActiveView | null =
      tab === 'dashboard'   ? 'home' :
      tab === 'project'     ? 'project' :
      tab === 'library'     ? 'project' :
      tab === 'case-study'  ? 'case-study' : null;

    if (!nextView) return;

    const currentRoute = getRouteSnapshotFromLocation();
    const alreadyHere =
      (nextView === 'home' && currentRoute.kind === 'home') ||
      ((nextView === 'project' || nextView === 'case-study') && currentRoute.kind === 'library');
    if (alreadyHere) return;

    const effect = (window as any).paperCurtainEffect;
    const durationMs: number = (window as any).paperCurtainDuration ?? 1400;

    if (effect) {
      effect.in();
      setTimeout(() => {
        setSelectedBookId(null);
        setSelectedBookType(null);
        setResolvedBookData(null);
        setActiveView(nextView);
        syncHistoryForView(nextView, 'push');
        
        window.setTimeout(() => {
          effect.out();
        }, 400);
      }, durationMs);
    } else {
      setSelectedBookId(null);
      setSelectedBookType(null);
      setResolvedBookData(null);
      setActiveView(nextView);
      syncHistoryForView(nextView, 'push');
    }
  };

  // Unify all datasets into one alphabetically sorted shelf
  const allBooks: LibraryBook[] = React.useMemo(() => {
    const unified: LibraryBook[] = [
      { ...aboutMeBook, type: 'work' },
      { ...aiLibraryBook, type: 'work' },
      ...projects.map<LibraryBook>((project) => ({ ...project, type: 'case-study' })),
      ...works.map<LibraryBook>((work) => ({ ...work, type: 'work' }))
    ];

    // Priority IDs to keep at the front
    const pinnedIds = ['about-caleb', 'ai-library'];
    const pinned = unified.filter(b => pinnedIds.includes(b.id)).sort((a,b) => {
       // Force Caleb Cooper (about-caleb) to be absolute first, then AI Library
       if (a.id === 'about-caleb') return -1;
       if (b.id === 'about-caleb') return 1;
       return a.id.localeCompare(b.id);
    });
    
    const others = unified
      .filter((b) => !pinnedIds.includes(b.id))
      .sort((a, b) => a.title.localeCompare(b.title));

    return [...pinned, ...others];
  }, []);

  useEffect(() => {
    if (!availabilityNotice) return;

    const timeout = window.setTimeout(() => {
      setAvailabilityNotice(null);
    }, 2600);

    return () => window.clearTimeout(timeout);
  }, [availabilityNotice]);

  // ---------- Lazy book data loading ----------
  // When selectedBookId changes and it's a custom detail book, load its data.
  // about-caleb and ai-library are resolved synchronously (statically imported).
  // All other custom books are resolved lazily via bookDataLoader.
  const STATIC_BOOK_OVERRIDES: Record<string, PortfolioBook> = React.useMemo(
    () => ({
      'about-caleb': aboutMeBook,
      'ai-library': aiLibraryBook,
    }),
    []
  );

  useEffect(() => {
    if (!selectedBookId) {
      setResolvedBookData(null);
      setIsLoadingBookData(false);
      setBookLoadError(null);
      return;
    }

    let cancelled = false;
    setBookLoadError(null);

    // 1. Check statically-imported books first (about-caleb, ai-library)
    const staticBook = STATIC_BOOK_OVERRIDES[selectedBookId];
    if (staticBook) {
      setResolvedBookData(staticBook);
      setIsLoadingBookData(false);
      return () => { cancelled = true; };
    }

    // 2. Check if we already have cached data from a previous lazy load
    const cached = getCachedBookData(selectedBookId);
    if (cached) {
      setResolvedBookData(cached);
      setIsLoadingBookData(false);
      return () => { cancelled = true; };
    }

    // 3. If it's a custom detail book, load it lazily
    if (hasCustomBookData(selectedBookId)) {
      setIsLoadingBookData(true);
      setResolvedBookData(null);

      loadBookData(selectedBookId)
        .then((data) => {
          if (cancelled) return;
          if (data) {
            setResolvedBookData(data);
            setBookLoadError(null);
          } else {
            setResolvedBookData(null);
            setBookLoadError(selectedBookId);
          }
        })
        .catch((error) => {
          if (cancelled) return;
          console.error('[bookDataLoader] Failed to load book data', selectedBookId, error);
          setResolvedBookData(null);
          setBookLoadError(selectedBookId);
        })
        .finally(() => {
          if (cancelled) return;
          setIsLoadingBookData(false);
        });

      return () => { cancelled = true; };
    }

    // 4. For case studies (from portfolio.tsx), use the inline project data
    if (selectedBookType === 'case-study') {
      const project = projects.find((p) => p.id === selectedBookId) ?? null;
      if (project) {
        if (AVAILABLE_CASE_STUDY_IDS.has(project.id)) {
          setResolvedBookData(project);
        } else {
          setResolvedBookData(createUnavailableCaseStudy(project));
        }
      } else {
        setResolvedBookData(null);
      }
      setIsLoadingBookData(false);
    }
  }, [selectedBookId, selectedBookType]);

  const selectedBook = React.useMemo(() => {
    if (!selectedBookId) return null;
    return allBooks.find(b => b.id === selectedBookId) || null;
  }, [selectedBookId, allBooks]);

  // Use the lazily-resolved book data for the detail view
  const selectedCaseStudy = resolvedBookData;

  const routeSnapshot = getRouteSnapshotFromLocation();
  const standalonePageId = routeSnapshot.kind === 'standalone-404' ? PLACEHOLDER_404_ID : null;

  const getBlockedBookMessage = (book: LibraryBook): string | null => {
    if (book.type === 'case-study' && !AVAILABLE_CASE_STUDY_IDS.has(book.id)) {
      return 'This book is currently unavailable. Check back soon.';
    }

    return null;
  };

  const getDetailUrl = (book: LibraryBook) => getDetailRoute(book);

  const pushDetailToHistory = (book: LibraryBook, fromTab: ActiveView) => {
    const nextUrl = getDetailUrl(book);
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl === currentUrl) return;

    window.history.pushState(
      {
        ...(window.history.state ?? {}),
        tab: book.type === 'case-study' ? 'case-study' : 'project',
        detailView: true,
        detailId: book.id,
        detailType: book.type,
        fromTab,
      },
      '',
      nextUrl
    );
  };

  const syncSelectionFromLocation = () => {
    const nextRoute = getRouteSnapshotFromLocation();
    const nextView = nextRoute.kind === 'home' ? 'home' : 'project';

    entryRequestRef.current += 1;
    setActiveView(nextView);
    setIsHomeTransitioning(false);
    setEntryOverlay({ visible: false, title: null, progress: 0, phase: 'starting' });
    setHeavyMotion('project-entry', false, 'sync-location');
    setAvailabilityNotice(null);

    if (nextRoute.kind === 'home') {
      setSelectedBookId(null);
      setSelectedBookType(null);
      setResolvedBookData(null);
      if (nextRoute.canonicalUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.history.replaceState(window.history.state ?? {}, '', nextRoute.canonicalUrl);
      }
      return;
    }

    if (nextRoute.kind === 'standalone-404') {
      setSelectedBookId(null);
      setSelectedBookType(null);
      setResolvedBookData(null);
      if (nextRoute.canonicalUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.history.replaceState(window.history.state ?? {}, '', nextRoute.canonicalUrl);
      }
      return;
    }

    if (nextRoute.kind === 'playground') {
      setSelectedBookId(null);
      setSelectedBookType(null);
      setResolvedBookData(null);
      const target = getPlaygroundTarget(nextRoute.slug);
      if (target && target !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.location.replace(target);
      }
      return;
    }

    if (nextRoute.kind === 'library') {
      setSelectedBookId(null);
      setSelectedBookType(null);
      setResolvedBookData(null);
      if (nextRoute.canonicalUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.history.replaceState(window.history.state ?? {}, '', nextRoute.canonicalUrl);
      }
      return;
    }

    const requestedBook = allBooks.find((book) => book.id === nextRoute.slug) ?? null;

    if (!requestedBook) {
      setSelectedBookId(null);
      setSelectedBookType(null);
      setResolvedBookData(null);
      if (nextRoute.canonicalUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.history.replaceState(window.history.state ?? {}, '', ROUTES.library);
      }
      return;
    }

    setSelectedBookId(requestedBook.id);
    setSelectedBookType(requestedBook.type);
    if (nextRoute.canonicalUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(window.history.state ?? {}, '', nextRoute.canonicalUrl);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      syncSelectionFromLocation();
    };

    syncSelectionFromLocation();
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, [allBooks]);



  const handleBookSelect = (id: string) => {
    if (isHomeTransitioning) return;

    const targetBook = allBooks.find(b => b.id === id);
    if (!targetBook) return;

    const blockedMessage = getBlockedBookMessage(targetBook);
    if (blockedMessage) {
      setAvailabilityNotice({
        title: targetBook.title,
        message: blockedMessage,
      });
      return;
    }

    setAvailabilityNotice(null);

    const requestId = ++entryRequestRef.current;
    const fromTab = activeView;
    const detailVideoSrc =
      targetBook.type === 'work'
        ? getWorkDetail(targetBook.id)?.heroVideo ?? null
        : null;

    const loadProject = async () => {
      if (targetBook.type === 'work' && !CUSTOM_WORK_DETAIL_IDS.has(targetBook.id)) {
        await loadProjectDetailPageModule();
        return;
      }

      await loadCaseStudyDetailModule();

      if (hasCustomBookData(targetBook.id)) {
        await loadBookData(targetBook.id);
      }
    };

    setIsHomeTransitioning(true);
    setEntryOverlay({ visible: true, title: targetBook.title, progress: 5, phase: 'starting' });
    setHeavyMotion('project-entry', true, 'book-select-start');

    void prepareProjectEntry({
      projectId: targetBook.id,
      videoSrc: detailVideoSrc,
      loadProject,
      onProgress: ({ overallProgress, phase }) => {
        if (entryRequestRef.current !== requestId) return;
        setEntryOverlay((prev) => ({ ...prev, progress: overallProgress, phase }));
      },
      // Content is ready: render the page behind the overlay now.
      // Heavy motion is cleared so ManagedHeroVideo can start playing.
      // The gate continues waiting for the managed video's playing event.
      onContentReady: () => {
        if (entryRequestRef.current !== requestId) return;
        setHeavyMotion('project-entry', false, 'content-ready');
        setSelectedBookId(id);
        setSelectedBookType(targetBook.type);
        setActiveView(targetBook.type === 'case-study' ? 'case-study' : 'project');
        pushDetailToHistory(targetBook, fromTab);
        setIsHomeTransitioning(false);
      },
    }).then(() => {
      if (entryRequestRef.current !== requestId) return;
      // Show 100% briefly so the user sees the bar complete, then dismiss.
      setEntryOverlay((prev) => ({ ...prev, progress: 100, phase: 'ready' }));
      window.setTimeout(() => {
        if (entryRequestRef.current !== requestId) return;
        setEntryOverlay({ visible: false, title: null, progress: 100, phase: 'ready' });
        setHeavyMotion('project-entry', false, 'book-select-complete');
      }, 380);
    });
  };

  const handleCloseDetail = () => {
    entryRequestRef.current += 1;
    setEntryOverlay({ visible: false, title: null, progress: 0, phase: 'starting' });
    setHeavyMotion('project-entry', false, 'detail-close');
    setBookLoadError(null);
    // Clear the readiness record so re-opening the same book waits for the
    // video to actually play again rather than resolving instantly from cache.
    if (selectedBookId) {
      const videoSrc = selectedBookType === 'work'
        ? getWorkDetail(selectedBookId)?.heroVideo ?? null
        : null;
      if (videoSrc) clearVideoReadiness(videoSrc);
    }
    if (window.history.state?.detailView) {
      window.history.back();
      return;
    }

    setSelectedBookId(null);
    setSelectedBookType(null);
    setResolvedBookData(null);
    setIsHomeTransitioning(false);
    setAvailabilityNotice(null);
    setActiveView('project');
    syncHistoryForView('project', 'replace');
  };

  const handleExploreLibrary = () => {
    const effect = (window as any).paperCurtainEffect;
    const durationMs: number = (window as any).paperCurtainDuration ?? 1400;

    const completeNavigation = () => {
      setSelectedBookId(null);
      setSelectedBookType(null);
      setResolvedBookData(null);
      setIsHomeTransitioning(false);
      setAvailabilityNotice(null);
      setActiveView('project');
      syncHistoryForView('project', 'push');
    };

    if (effect) {
      effect.in();
      window.setTimeout(() => {
        completeNavigation();
        window.setTimeout(() => {
          effect.out();
        }, 400);
      }, durationMs);
      return;
    }

    completeNavigation();
  };

  const navActiveItem: 'dashboard' | 'project' | 'case-study' =
    activeView === 'home' ? 'dashboard' :
    activeView === 'project' ? 'project' : 'case-study';

  // Show the detail view if:
  // 1. A book is selected AND data is loaded (or loading)
  const showCaseStudyDetail =
    selectedBookId &&
    selectedCaseStudy &&
    (selectedBookType === 'case-study' || CUSTOM_WORK_DETAIL_IDS.has(selectedBookId));

  const showProjectDetail =
    selectedBookId &&
    selectedBook &&
    selectedBookType === 'work' &&
    !CUSTOM_WORK_DETAIL_IDS.has(selectedBookId);

  // Invariant guards: selectedBookId must never render only blank paper.
  // isCustomOrCaseStudy covers all books that go through async/dynamic data loading.
  // showBookLoadFallback: data not yet available (including the 1-frame window before effect fires).
  // showBookErrorFallback: loadBookData rejected or returned null.
  const isCustomOrCaseStudy =
    selectedBookId !== null &&
    (CUSTOM_WORK_DETAIL_IDS.has(selectedBookId) || selectedBookType === 'case-study');
  const showBookLoadFallback =
    isCustomOrCaseStudy && !showCaseStudyDetail && bookLoadError === null;
  const showBookErrorFallback =
    selectedBookId !== null && bookLoadError !== null;

  return (
    <div className="min-h-screen bg-transparent">
      <ProjectEntryOverlay
        visible={entryOverlay.visible}
        title={entryOverlay.title}
        progress={entryOverlay.progress}
        phase={entryOverlay.phase}
      />
      <Suspense fallback={null}>
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
              ) : standalonePageId === PLACEHOLDER_404_ID ? (
                <Placeholder404Page />
              ) : (
                <div style={{ position: 'relative' }}>
                  <Bookshelf
                    books={allBooks}
                    onSelectBook={handleBookSelect}
                    canOpenBook={(id) => {
                      const targetBook = allBooks.find((book) => book.id === id);
                      if (!targetBook) return false;
                      return getBlockedBookMessage(targetBook) === null;
                    }}
                    onBlockedSelectBook={(id) => {
                      const targetBook = allBooks.find((book) => book.id === id);
                      if (!targetBook) return;
                      const blockedMessage = getBlockedBookMessage(targetBook);
                      if (!blockedMessage) return;
                      setAvailabilityNotice({
                        title: targetBook.title,
                        message: blockedMessage,
                      });
                    }}
                    shelfMessage={availabilityNotice?.message ?? null}
                    isTransitioning={isHomeTransitioning}
                  />
                </div>
              )}

              {/* LinkedIn logo — fixed bottom-left on About and Library pages */}
              {standalonePageId !== PLACEHOLDER_404_ID && (
                <a
                  href="https://www.linkedin.com/in/calebcooper21/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Caleb Cooper on LinkedIn"
                  style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    zIndex: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.2rem',
                    height: '2.2rem',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.82)',
                    border: '1px solid rgba(0,0,0,0.10)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                    backdropFilter: 'blur(6px)',
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                    textDecoration: 'none',
                    color: '#0a66c2',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.08)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 18px rgba(0,0,0,0.16)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </motion.div>
          )}

          {showCaseStudyDetail && (
            <CaseStudyDetail
              key="detail-case"
              book={selectedCaseStudy}
              onClose={handleCloseDetail}
              onExploreLibrary={selectedBookId === AI_LIBRARY_DETAIL_ID ? handleExploreLibrary : undefined}
            />
          )}

          {showProjectDetail && (
            <ProjectDetailPage
              key="detail-work"
              slug={selectedBookId}
              sectionsOverride={selectedBook.sections}
              onBackAll={handleCloseDetail}
              onNavigateToLibraryItem={(id) => handleBookSelect(id)}
              onMenuNavigate={handleTabChange}
            />
          )}

          {showBookLoadFallback && (
            <div
              key="book-loading-fallback"
              style={{
                position: 'fixed', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#e2dedb',
                zIndex: 40,
              }}
            >
              <p style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '1.25rem' }}>
                Opening Book
              </p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#161312', marginBottom: '2.5rem', textAlign: 'center', padding: '0 2rem', lineHeight: 1.15 }}>
                {selectedBook?.title ?? selectedBookId}
              </p>
              <button
                onClick={handleCloseDetail}
                style={{
                  fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.55)', background: 'transparent', border: '1px solid rgba(0,0,0,0.2)',
                  padding: '0.6rem 1.4rem', cursor: 'pointer',
                }}
              >
                Back to Library
              </button>
            </div>
          )}

          {showBookErrorFallback && (
            <div
              key="book-error-fallback"
              style={{
                position: 'fixed', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#e2dedb',
                zIndex: 40,
              }}
            >
              <p style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '1.25rem' }}>
                Book could not be loaded
              </p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#161312', marginBottom: '0.5rem', textAlign: 'center', padding: '0 2rem', lineHeight: 1.15 }}>
                {selectedBook?.title ?? selectedBookId}
              </p>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)', marginBottom: '2.5rem', textAlign: 'center' }}>
                There was a problem loading this book
              </p>
              <button
                onClick={handleCloseDetail}
                style={{
                  fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.55)', background: 'transparent', border: '1px solid rgba(0,0,0,0.2)',
                  padding: '0.6rem 1.4rem', cursor: 'pointer',
                }}
              >
                Back to Library
              </button>
            </div>
          )}
        </AnimatePresence>
      </Suspense>

    </div>
  );
}
