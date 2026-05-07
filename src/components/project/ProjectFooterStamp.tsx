import React from 'react';

interface ProjectFooterStampProps {
  note?: string;
}

const ProjectFooterStamp: React.FC<ProjectFooterStampProps> = ({ note }) => {
  return (
    <footer className="project-footer" role="contentinfo">
      <div className="project-footer__left">
        <div className="project-footer__col-text">
          <div className="project-footer__title">Caleb Cooper</div>
          <div className="project-footer__year">{note ? note : 'AI systems, product surfaces, and library builds'}</div>
        </div>
        <img
          src="/assets/img/60474834660f934090d42877_stamp-94c7c66056.png"
          alt="Caleb Cooper stamp"
          className="project-footer__stamp"
        />
      </div>

      <div className="project-footer__right">
        <a
          href="https://www.linkedin.com/in/calebcooper21/"
          target="_blank"
          rel="noopener noreferrer"
          className="project-footer__link"
          aria-label="Caleb Cooper LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href="mailto:calebcooper2024@gmail.com?subject=Project%20Request"
          className="project-footer__link"
          aria-label="Email Caleb Cooper"
        >
          Email
        </a>
      </div>
    </footer>
  );
};

export default ProjectFooterStamp;
