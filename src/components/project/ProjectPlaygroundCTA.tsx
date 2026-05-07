import React, { useState } from 'react';
import { runPaperCurtainSwap } from '../../lib/paperCurtainTransition';

interface ProjectPlaygroundCTAProps {
  href: string;
  label?: string;
}

const ProjectPlaygroundCTA: React.FC<ProjectPlaygroundCTAProps> = ({
  href,
  label = 'Playground',
}) => {
  const [clicking, setClicking] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clicking) return;
    setClicking(true);

    // Phase 5A: close curtain before navigating to external playground surface.
    void runPaperCurtainSwap(() => {
      window.location.assign(href);
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="project-playground-cta"
      aria-label={label}
      style={{ opacity: clicking ? 0.5 : undefined, pointerEvents: clicking ? 'none' : undefined }}
    >
      <span className="project-playground-cta__label">{label}</span>
      <img
        src="/assets/img/61001a3509319b6ae39e156b_arrow-long-30c12dec51.svg"
        alt=""
        aria-hidden="true"
        className="project-playground-cta__arrow"
      />
    </a>
  );
};

export default ProjectPlaygroundCTA;
