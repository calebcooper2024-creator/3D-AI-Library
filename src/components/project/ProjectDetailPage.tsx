import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { getWorkDetail, type WorkDetail } from '../../data/workDetails';
import type {
  FullWidthSection,
  NarrativeSection,
  SectionContent,
  SplitSection,
} from '../../data/caseStudyMeta';
import { WebflowNav } from '../Navigation';
import ProjectFooterStamp from './ProjectFooterStamp';
import ProjectGallery from './ProjectGallery';
import ProjectNextPrevious from './ProjectNextPrevious';
import { runPaperCurtainSwap } from '../../lib/paperCurtainTransition';
import { ManagedHeroVideo } from '../ManagedHeroVideo';
import { createHeavyMotionSettler } from '../../lib/heavyMotion';
import './projectStyles.css';

interface ProjectDetailPageProps {
  slug: string;
  sectionsOverride?: SectionContent[];
  onBackAll: () => void;
  onNavigateToLibraryItem: (id: string) => void;
  onMenuNavigate: (tab: string) => void;
  isTransitioning?: boolean;
}

type ProjectDetailData = Omit<WorkDetail, 'sections'> & {
  sections: SectionContent[];
};

const isFullWidthSection = (section: SectionContent): section is FullWidthSection =>
  'fullWidthContent' in section;

const isSplitSection = (section: SectionContent): section is SplitSection =>
  'leftContent' in section || 'rightContent' in section;

const getNarrativeSectionBody = (section: NarrativeSection) =>
  'body' in section ? section.body : section.content;

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function FadeUp({
  children,
  delay = 0,
  className = '',
  amount = 0.12,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function ArchetypeA({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  sectionNum,
}: {
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  sectionNum: number;
}) {
  return (
    <div className="project-section-archetype-a">
      <motion.div
        className="project-section-archetype-a__copy"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="project-section-archetype-a__eyebrow">
          {String(sectionNum).padStart(2, '0')}
          {eyebrow ? ` - ${eyebrow}` : ''}
        </span>
        <h2 className="project-section-archetype-a__title">{title}</h2>
        {typeof body === 'string' ? (
          <p className="project-section-archetype-a__body">{body}</p>
        ) : (
          <div className="project-section-archetype-a__body">{body}</div>
        )}
      </motion.div>

      <motion.div
        className="project-section-archetype-a__frame-wrap"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="project-section-archetype-a__frame">
          <img src={imageSrc} alt={imageAlt} loading="lazy" />
        </div>
      </motion.div>
    </div>
  );
}

function ArchetypeB({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  sectionNum,
}: {
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  sectionNum: number;
}) {
  return (
    <div className="project-section-archetype-b">
      <motion.div
        className="project-ink-block"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="project-ink-block__section-num">
          {String(sectionNum).padStart(2, '0')}
        </span>
        {eyebrow && <span className="project-ink-block__eyebrow">{eyebrow}</span>}
        <h2 className="project-ink-block__title">{title}</h2>
      </motion.div>

      <motion.div
        className="project-section-archetype-b__right"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {typeof body === 'string' ? (
          <p className="project-section-archetype-b__body">{body}</p>
        ) : (
          <div className="project-section-archetype-b__body">{body}</div>
        )}
        <div className="project-section-archetype-b__frame">
          <img src={imageSrc} alt={imageAlt} loading="lazy" />
        </div>
      </motion.div>
    </div>
  );
}

function ArchetypeC({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  imageCaption,
  sectionNum,
}: {
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  sectionNum: number;
}) {
  return (
    <div className="project-section-archetype-c">
      <motion.div
        className="project-section-archetype-c__image-wrap"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="project-section-archetype-c__frame">
          <img src={imageSrc} alt={imageAlt} loading="lazy" />
          {imageCaption && (
            <div className="project-section-archetype-c__caption">
              {imageCaption}
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        className="project-section-archetype-c__content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <span className="project-section-archetype-c__eyebrow">
          {String(sectionNum).padStart(2, '0')}
          {eyebrow ? ` - ${eyebrow}` : ''}
        </span>
        <h2 className="project-section-archetype-c__title">{title}</h2>
        {typeof body === 'string' ? (
          <p className="project-section-archetype-c__body">{body}</p>
        ) : (
          <div className="project-section-archetype-c__body">{body}</div>
        )}
        <div className="project-section-archetype-c__tech-note">
          <span className="project-section-archetype-c__tech-note-label">
            Technical note
          </span>
          Section {String(sectionNum).padStart(2, '0')} of the build documentation.
        </div>
      </motion.div>
    </div>
  );
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug,
  sectionsOverride,
  onBackAll,
  onNavigateToLibraryItem,
  onMenuNavigate,
  isTransitioning = false,
}) => {
  const detail: ProjectDetailData | null = (() => {
    const existingDetail = getWorkDetail(slug);

    if (existingDetail) {
      return sectionsOverride
        ? { ...existingDetail, sections: sectionsOverride }
        : existingDetail;
    }

    if (slug === 'about-caleb') {
      return {
        slug: 'about-caleb',
        title: 'Caleb Cooper',
        subtitle: 'Architecture, Integrations, & World Models',
        year: '2026',
        client: 'Caleb Cooper',
        tags: ['Agentic Systems', 'World Models', 'Enterprise AI'],
        heroImage: '/images/books/about_me_cover.png',
        heroVideo: '/videos/about-bg.mp4',
        intro: 'AI Systems Engineer focused on agentic architecture and world model integrations.',
        gallery: [],
        sections: sectionsOverride ?? [],
      };
    }

    if (sectionsOverride) {
      return {
        slug,
        title: slug
          .split('-')
          .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
          .join(' '),
        subtitle: '',
        year: '2026',
        client: 'Caleb Cooper',
        tags: [],
        heroImage: '',
        intro: '',
        gallery: [],
        sections: sectionsOverride,
      };
    }

    return null;
  })();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [clicking, setClicking] = useState(false);
  const railRef = useRef<HTMLElement | null>(null);
  const railOffsetRef = useRef(0);
  const railVelocityRef = useRef(0);
  const railRafRef = useRef<number | null>(null);
  const railSnappingRef = useRef(false);
  const railMaxOffsetRef = useRef(0);
  const railSnapPointsRef = useRef<number[]>([0]);
  const railLastTimestampRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (railRafRef.current !== null) {
      cancelAnimationFrame(railRafRef.current);
      railRafRef.current = null;
    }
    railVelocityRef.current = 0;
    railSnappingRef.current = false;
    railOffsetRef.current = 0;
    railRef.current?.scrollTo({ left: 0, top: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const desktopQuery = window.matchMedia('(min-width: 901px)');
    const railMotion = createHeavyMotionSettler(`project-rail-${slug}`, 650);
    const SNAP_VELOCITY_THRESHOLD = 0.36;
    const SNAP_EASING = 0.16;
    const SNAP_DONE_PX = 0.5;
    const VELOCITY_SCALE = 0.12;
    const VELOCITY_LIMIT = 24;
    const DAMPING_PER_FRAME = 0.84;

    const measureRail = () => {
      const panels = Array.from(
        rail.querySelectorAll('.project-horizontal-panel')
      ) as HTMLElement[];

      railMaxOffsetRef.current = Math.max(0, rail.scrollWidth - rail.clientWidth);

      if (!panels.length) {
        railSnapPointsRef.current = [0];
        return;
      }

      const baseOffset = panels[0].offsetLeft;

      railSnapPointsRef.current = panels.map((panel) =>
        Math.max(
          0,
          Math.min(panel.offsetLeft - baseOffset, railMaxOffsetRef.current)
        )
      );
    };

    const clampOffset = (value: number) =>
      Math.max(0, Math.min(value, railMaxOffsetRef.current));

    const applyOffset = () => {
      const nextOffset = clampOffset(railOffsetRef.current);
      railOffsetRef.current = nextOffset;

      if (Math.abs(rail.scrollLeft - nextOffset) > 0.25) {
        rail.scrollLeft = nextOffset;
      }
    };

    const stopRailAnimation = () => {
      if (railRafRef.current !== null) {
        cancelAnimationFrame(railRafRef.current);
        railRafRef.current = null;
      }

      railVelocityRef.current = 0;
      railSnappingRef.current = false;
      railLastTimestampRef.current = 0;
      railMotion.end('rail-stop');
    };

    const animateRail = (timestamp: number) => {
      if (!desktopQuery.matches || lightboxOpen) {
        stopRailAnimation();
        return;
      }

      railMotion.markActive('rail-animation');

      const previousTimestamp = railLastTimestampRef.current || timestamp;
      const dt = Math.min(34, timestamp - previousTimestamp);
      const frameScale = dt > 0 ? dt / 16.667 : 1;
      railLastTimestampRef.current = timestamp;

      if (railSnappingRef.current) {
        const snapPoints = railSnapPointsRef.current;
        const snapTarget = snapPoints.reduce<number>(
          (closest, point) =>
            Math.abs(point - railOffsetRef.current) < Math.abs(closest - railOffsetRef.current)
              ? point
              : closest,
          snapPoints[0] ?? 0
        );
        const delta = snapTarget - railOffsetRef.current;

        if (Math.abs(delta) <= SNAP_DONE_PX) {
          railOffsetRef.current = snapTarget;
          applyOffset();
          stopRailAnimation();
          return;
        }

        railOffsetRef.current += delta * Math.min(1, SNAP_EASING * frameScale);
        applyOffset();
        railRafRef.current = requestAnimationFrame(animateRail);
        return;
      }

      railOffsetRef.current += railVelocityRef.current * frameScale;
      applyOffset();

      const maxOffset = railMaxOffsetRef.current;
      const atStart = railOffsetRef.current <= 0.5;
      const atEnd = railOffsetRef.current >= maxOffset - 0.5;

      if ((atStart && railVelocityRef.current < 0) || (atEnd && railVelocityRef.current > 0)) {
        railVelocityRef.current = 0;
      } else {
        railVelocityRef.current *= Math.pow(DAMPING_PER_FRAME, frameScale);
      }

      if (Math.abs(railVelocityRef.current) > SNAP_VELOCITY_THRESHOLD) {
        railRafRef.current = requestAnimationFrame(animateRail);
        return;
      }

      railVelocityRef.current = 0;
      railSnappingRef.current = true;
      railRafRef.current = requestAnimationFrame(animateRail);
    };

    const startRailAnimation = () => {
      railMotion.markActive('rail-start');

      if (railRafRef.current === null) {
        railLastTimestampRef.current = 0;
        railRafRef.current = requestAnimationFrame(animateRail);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!desktopQuery.matches || lightboxOpen || e.ctrlKey) return;

      const dominantDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(dominantDelta) < 0.01) return;

      e.preventDefault();
      railMotion.markActive('rail-wheel');
      railOffsetRef.current = clampOffset(rail.scrollLeft);
      railSnappingRef.current = false;
      railVelocityRef.current += dominantDelta * VELOCITY_SCALE;
      railVelocityRef.current = Math.max(
        -VELOCITY_LIMIT,
        Math.min(VELOCITY_LIMIT, railVelocityRef.current)
      );

      startRailAnimation();
    };

    const handleScroll = () => {
      if (railRafRef.current === null) {
        railOffsetRef.current = clampOffset(rail.scrollLeft);
      }
    };

    const handleResize = () => {
      measureRail();
      railOffsetRef.current = clampOffset(rail.scrollLeft);
      applyOffset();
    };

    measureRail();
    railOffsetRef.current = clampOffset(rail.scrollLeft);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            measureRail();
            railOffsetRef.current = clampOffset(rail.scrollLeft);
          })
        : null;

    resizeObserver?.observe(rail);

    rail.addEventListener('wheel', handleWheel, { passive: false });
    rail.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      rail.removeEventListener('wheel', handleWheel);
      rail.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
      stopRailAnimation();
      railMotion.dispose();
    };
  }, [lightboxOpen, slug]);

  if (!detail) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono p-8 text-center">
        <div>
          <h1 className="text-4xl mb-4 font-serif">Book Not Found</h1>
          <p className="opacity-50 mb-8">The requested book could not be loaded.</p>
          <button
            onClick={onBackAll}
            className="text-[#c9a04e] border border-[#c9a04e]/30 px-6 py-2 hover:bg-[#c9a04e]/10 transition-colors"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  const hasGallery = detail.gallery && detail.gallery.length > 0;
  const heroVisualImage = detail.heroBackdropImage ?? detail.heroImage;
  const hasPlayground = !!detail.playgroundHref;

  const stats: { label: string; value: number; suffix: string }[] = [
    { label: 'Year', value: parseInt(detail.year, 10), suffix: '' },
    { label: 'Chapters', value: detail.sections.length, suffix: '' },
    ...(hasGallery ? [{ label: 'Gallery', value: detail.gallery.length, suffix: '' }] : []),
  ];

  const handleLabClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clicking || !detail.playgroundHref) return;

    // Special case: If the playground is just a link back to the library shelf,
    // use the internal menu navigation to ensure the full curtain transition plays.
    if (detail.playgroundHref === '/CalebCooper/Library') {
      onMenuNavigate('library');
      return;
    }

    // LOCKDOWN - PLAYGROUNDS ARE CURRENTLY DISABLED
    return;
  };

  const labBody =
    detail.intro.split(' ').slice(0, 14).join(' ').replace(/[,.]?$/, '') + '.';

  return (
    <div className={`project-body project-theme-${slug} ${isTransitioning ? 'pointer-events-none' : ''}`}>
      <WebflowNav
        activeItem="library"
        brandTab="library"
        hideUntilScroll={false}
        revealOnHover
        onMenuNavigate={onMenuNavigate}
        onBack={onBackAll}
        backLabel="Back To Library"
      />

      <main ref={railRef} className="project-horizontal-shell">
        <section 
          className={`project-horizontal-panel project-horizontal-panel--intro project-horizontal-panel--tone-1${detail.heroVideo ? ' project-horizontal-panel--has-video' : ''}`}
          style={detail.heroVideo ? { background: 'transparent' } : {}}
        >
          <div 
            className="project-horizontal-intro-stack"
            style={detail.heroVideo ? { background: 'transparent' } : {}}
          >
            {detail.heroVideo && (
              <>
                <ManagedHeroVideo
                  src={detail.heroVideo}
                  idSeed={`project-detail-${detail.slug}`}
                  poster={detail.heroImage || undefined}
                  className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                  videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
                />
                <div
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(251,246,239,0.05) 0%, rgba(242,229,215,0.3) 100%)'
                  }}
                />
              </>
            )}
            <div className="project-horizontal-intro-stack__content relative z-10">
            <motion.div
              className="project-hero-fieldnotes"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            >
              <div className="project-hero-fieldnotes__meta">
                <div className="project-hero-fieldnotes__meta-item">
                  <span className="project-hero-fieldnotes__meta-label">Year</span>
                  <span className="project-hero-fieldnotes__meta-value">{detail.year}</span>
                </div>
                <div className="project-hero-fieldnotes__meta-item">
                  <span className="project-hero-fieldnotes__meta-label">Builder</span>
                  <span className="project-hero-fieldnotes__meta-value">{detail.client}</span>
                </div>
                <div className="project-hero-fieldnotes__meta-item">
                  <span className="project-hero-fieldnotes__meta-label">Tags</span>
                  <span className="project-hero-fieldnotes__meta-value">{detail.tags.length}</span>
                </div>
              </div>

              <div className="project-hero-fieldnotes__quote">
                <span className="project-hero-fieldnotes__quote-kicker">
                  Personal Project / {detail.year}
                </span>
                <h1 className="project-hero-fieldnotes__quote-title">{detail.title}</h1>
                <p className="project-hero-fieldnotes__quote-subtitle">{detail.subtitle}</p>
                <p className="project-hero-fieldnotes__quote-intro">{detail.intro}</p>
              </div>

              {hasPlayground && (
                <div className="project-hero-fieldnotes__cta">
                  <a
                    href={detail.playgroundHref}
                    onClick={handleLabClick}
                    className="project-hero-fieldnotes__door"
                    aria-label={detail.playgroundLabel ?? 'Open Lab'}
                    style={{
                      opacity: clicking ? 0.5 : undefined,
                      pointerEvents: clicking ? 'none' : undefined,
                    }}
                  >
                    <span className="project-hero-fieldnotes__door-eyebrow">Interactive</span>
                    <span className="project-hero-fieldnotes__door-label">
                      {detail.playgroundLabel ?? 'Open Lab'}
                    </span>
                    <span className="project-hero-fieldnotes__door-arrow">-&gt;</span>
                  </a>
                </div>
              )}
            </motion.div>

            <FadeUp>
              <div className="project-stats-inline">
                {stats.map(({ label, value, suffix }) => (
                  <div key={label} className="project-stats-inline__item">
                    <div className="project-stats-inline__number">
                      <CountUp to={value} suffix={suffix} />
                    </div>
                    <div className="project-stats-inline__label">{label}</div>
                  </div>
                ))}
                {hasPlayground && (
                  <div className="project-stats-inline__item">
                    <div
                      className="project-stats-inline__number"
                      style={{ color: 'var(--project-accent)' }}
                    >
                      -&gt;
                    </div>
                    <div className="project-stats-inline__label">Interactive</div>
                  </div>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

        {detail.sections.map((section, index) => {
          const archetype = index % 3;
          const galleryPreview = hasGallery ? detail.gallery[index % detail.gallery.length] : null;

          if (isFullWidthSection(section)) {
            return (
              <section
                key={section.id || `custom-${index}`}
                className="project-horizontal-panel project-horizontal-panel--custom"
                style={{ width: '100vw', flexShrink: 0 }}
              >
                {section.fullWidthContent}
              </section>
            );
          }

          if (isSplitSection(section)) {
            return (
              <section
                key={section.id || `split-${index}`}
                className="project-horizontal-panel project-horizontal-panel--split"
                style={{ width: '100vw', flexShrink: 0, display: 'flex' }}
              >
                <div className={`w-1/2 ${section.bgColorLeft || 'bg-black'} ${section.textColorLeft || 'text-white'} p-12 md:p-24 flex flex-col justify-center`}>
                   {section.leftTitle && <h3 className="font-serif text-3xl mb-8">{section.leftTitle}</h3>}
                   <div className="font-mono text-sm opacity-80 leading-relaxed">
                     {section.leftContent}
                   </div>
                </div>
                <div className={`w-1/2 ${section.bgColorRight || 'bg-zinc-900'} ${section.textColorRight || 'text-white'} p-12 md:p-24 flex flex-col justify-center`}>
                   {section.rightTitle && <h3 className="font-serif text-3xl mb-8">{section.rightTitle}</h3>}
                   <div className="font-mono text-sm opacity-80 leading-relaxed">
                     {section.rightContent}
                   </div>
                </div>
              </section>
            );
          }

          const sectionVisualSrc =
            section.media?.type === 'image'
              ? section.media.src
              : galleryPreview?.src ?? heroVisualImage;
          const sectionVisualAlt =
            section.media?.type === 'image' && section.media.alt
              ? section.media.alt
              : galleryPreview?.alt ?? detail.title;

          if (section.media?.type === 'custom') {
            return (
              <section
                key={section.id}
                className={`project-horizontal-panel project-horizontal-panel--story project-horizontal-panel--tone-${
                  (index % 4) + 1
                }`}
              >
                <FadeUp>
                  <div
                    style={{
                      padding: 'clamp(2rem,5vw,6rem) clamp(1.4rem,4.5vw,5rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', ui-sans-serif, sans-serif",
                        fontSize: '0.72rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--project-accent)',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                      {section.eyebrow ? ` - ${section.eyebrow}` : ''}
                    </span>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: "'Playfair Display', ui-serif, Georgia, serif",
                        fontWeight: 700,
                        fontSize: 'clamp(2.2rem,4vw,4.5rem)',
                        lineHeight: 0.94,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {section.title ?? ''}
                    </h2>
                    <div
                      style={{
                        fontFamily: "'Inter', ui-sans-serif, sans-serif",
                        fontSize: '1.05rem',
                        lineHeight: 1.75,
                        color: 'var(--project-ink-soft)',
                      }}
                    >
                      {section.media.node}
                    </div>
                  </div>
                </FadeUp>
              </section>
            );
          }
          const sectionBody = getNarrativeSectionBody(section);

          return (
            <section
              key={section.id || `story-${index}`}
              className={`project-horizontal-panel project-horizontal-panel--story project-horizontal-panel--tone-${
                (index % 4) + 1
              }`}
            >
              {archetype === 0 && (
                <ArchetypeA
                  eyebrow={section.eyebrow}
                  title={section.title ?? ''}
                  body={sectionBody}
                  imageSrc={sectionVisualSrc}
                  imageAlt={sectionVisualAlt}
                  sectionNum={index + 1}
                />
              )}
              {archetype === 1 && (
                <ArchetypeB
                  eyebrow={section.eyebrow}
                  title={section.title ?? ''}
                  body={sectionBody}
                  imageSrc={sectionVisualSrc}
                  imageAlt={sectionVisualAlt}
                  sectionNum={index + 1}
                />
              )}
              {archetype === 2 && (
                <ArchetypeC
                  eyebrow={section.eyebrow}
                  title={section.title ?? ''}
                  body={sectionBody}
                  imageSrc={sectionVisualSrc}
                  imageAlt={sectionVisualAlt}
                  imageCaption={galleryPreview?.caption}
                  sectionNum={index + 1}
                />
              )}
            </section>
          );
        })}

        {detail.longIntro && (
          <section className="project-horizontal-panel project-horizontal-panel--quote project-horizontal-panel--tone-4">
            <FadeUp>
              <div className="project-pull-quote">
                <p className="project-pull-quote__text">{detail.longIntro}</p>
                <div className="project-pull-quote__rule-wrap">
                  <div className="project-pull-quote__rule" />
                  <span className="project-pull-quote__attribution">{detail.title}</span>
                </div>
              </div>
            </FadeUp>
          </section>
        )}

        {hasGallery && (
          <section className="project-horizontal-panel project-horizontal-panel--gallery project-horizontal-panel--tone-2">
            <FadeUp>
              <div className="project-gallery-spread">
                <div className="project-gallery-spread__header">
                  <h2 className="project-gallery-spread__heading">- Gallery</h2>
                  <p className="project-gallery-spread__subline">
                    Selected frames from the build - screens, diagrams, and states that
                    did not make it into the written sections.
                  </p>
                </div>
                <ProjectGallery items={detail.gallery} />
              </div>
            </FadeUp>
          </section>
        )}

        {hasPlayground && (
          <section className="project-horizontal-panel project-horizontal-panel--lab project-horizontal-panel--tone-3">
            <FadeUp>
              <a
                href={detail.playgroundHref}
                onClick={handleLabClick}
                className="project-lab-annex"
                aria-label={detail.playgroundLabel ?? 'Open the Lab'}
                style={{
                  opacity: clicking ? 0.5 : undefined,
                  pointerEvents: clicking ? 'none' : undefined,
                }}
              >
                <div className="project-lab-annex__left">
                  <span className="project-lab-annex__eyebrow">Interactive Apparatus</span>
                  <h2 className="project-lab-annex__title">
                    {detail.playgroundLabel ?? 'Open the Lab'}
                  </h2>
                  <p className="project-lab-annex__body">{labBody}</p>
                </div>
                <span className="project-lab-annex__arrow" aria-hidden="true">
                  -&gt;
                </span>
              </a>
            </FadeUp>
          </section>
        )}

        <section className="project-horizontal-panel project-horizontal-panel--utility project-horizontal-panel--tone-1">
          <div
            style={{
              padding: '0 clamp(1.4rem,4.5vw,5rem) clamp(2rem,3.5vw,3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
            }}
          >
            <ProjectNextPrevious currentSlug={slug} onNavigate={onNavigateToLibraryItem} />
            <ProjectFooterStamp note={detail.footerNote} />
          </div>
        </section>

      </main>


      {lightboxOpen && hasGallery && (
        <ProjectGallery
          items={detail.gallery}
          startIndex={0}
          onClose={() => setLightboxOpen(false)}
          lightboxOnly
        />
      )}
    </div>
  );
};

export default ProjectDetailPage;
