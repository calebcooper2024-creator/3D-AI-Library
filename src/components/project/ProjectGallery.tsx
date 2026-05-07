import React, { useCallback, useEffect, useState } from 'react';
import { WorkGalleryItem } from '../../data/workDetails';

interface ProjectLightboxProps {
  items: WorkGalleryItem[];
  startIndex: number;
  onClose: () => void;
}

const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ items, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const item = items[index];

  return (
    <div
      className="project-lightbox"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <img
        className="project-lightbox__img"
        src={item.src}
        alt={item.alt}
        draggable={false}
      />

      <button
        className="project-lightbox__close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {items.length > 1 && (
        <>
          <button
            className="project-lightbox__arrow project-lightbox__arrow--prev"
            onClick={prev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="project-lightbox__arrow project-lightbox__arrow--next"
            onClick={next}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {(item.title || item.caption) && (
        <div className="project-lightbox__meta">
          {item.title && <div className="project-lightbox__meta-title">{item.title}</div>}
          {item.caption && <div className="project-lightbox__meta-caption">{item.caption}</div>}
          {items.length > 1 && (
            <div className="project-lightbox__meta-caption" style={{ marginTop: '0.4rem' }}>
              {index + 1} / {items.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── ProjectGallery ──────────────────────────────────────────────────────────

interface ProjectGalleryProps {
  items: WorkGalleryItem[];
  /** When true, renders only the lightbox (no thumbnail grid) */
  lightboxOnly?: boolean;
  /** Starting index when lightboxOnly is true */
  startIndex?: number;
  /** Called when lightbox closes; required when lightboxOnly is true */
  onClose?: () => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  items,
  lightboxOnly = false,
  startIndex = 0,
  onClose,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  // Pure lightbox mode — used by the gallery-open button in ProjectDetailPage
  if (lightboxOnly && onClose) {
    return (
      <ProjectLightbox
        items={items}
        startIndex={startIndex}
        onClose={onClose}
      />
    );
  }

  return (
    <div>
      <div className={`project-gallery__grid project-gallery__grid--count-${Math.min(items.length, 4)}`}>
        {items.map((item, i) => (
          <button
            key={i}
            className="project-gallery__item"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${item.alt ?? 'gallery image'}`}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            {item.caption && (
              <div className="project-gallery__caption">{item.caption}</div>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <ProjectLightbox
          items={items}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default ProjectGallery;
