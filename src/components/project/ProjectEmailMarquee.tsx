import React from 'react';

const MARQUEE_EMAIL = 'calebcooper2024@gmail.com';

interface ProjectEmailMarqueeProps {
  className?: string;
}

const MarqueeContent: React.FC = () => (
  <div className="project-marquee-item" aria-hidden="true">
    <h4 className="project-marquee-news">Build the system, ship the surface, keep the paper trail clean</h4>
    <a
      href={`mailto:${MARQUEE_EMAIL}?subject=Project%20Request`}
      className="project-marquee-link"
      tabIndex={-1}
    >
      Email Caleb
    </a>
  </div>
);

const ProjectEmailMarquee: React.FC<ProjectEmailMarqueeProps> = ({ className = '' }) => {
  return (
    <div
      className={`project-marquee-outer ${className}`.trim()}
      role="marquee"
      aria-label="Contact information"
    >
      <a
        href={`mailto:${MARQUEE_EMAIL}?subject=Project%20Request`}
        className="project-marquee-inner"
        aria-label="Email Caleb Cooper for project work"
      >
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </a>
    </div>
  );
};

export default ProjectEmailMarquee;
