import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';

const HERO_VIDEO = '/videos/resume-bg.mp4';
const COVER_IMAGE = '/images/books/resume_cover.jpg';

const RESUME_VARIANTS: { label: string; file: string | null; note?: string }[] = [
  { label: 'AI / Data Engineer', file: '/files/caleb-cooper-ai-data-resume.pdf' },
  { label: 'AI Architect', file: null, note: 'Coming soon' },
  { label: 'AI Engineer', file: null, note: 'Coming soon' },
  { label: 'AI Product Manager', file: null, note: 'Coming soon' },
  { label: 'Data', file: null, note: 'Coming soon' },
];

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const resumeBook: BookProject = {
  id: 'resume',
  title: 'Resume',
  subtitle: 'Caleb Cooper — AI Systems Engineer',
  author: 'Caleb Cooper',
  showAuthorBadge: false,
  spineColor: '#0d0d0d',
  coverColor: '#111111',
  textColor: '#e8d5b0',
  fontTitle: 'font-serif',
  textureClass: 'texture-leather',
  coverImage: COVER_IMAGE,

  coverContent: (
    <div
      className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_110px_rgba(0,0,0,0.82)]"
      style={{ backgroundImage: `url('${COVER_IMAGE}')` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10),rgba(0,0,0,0.72)_55%,rgba(0,0,0,0.96))] p-10">
        <div className="flex h-full flex-col justify-between">
          <div className="flex justify-end">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">2026</span>
          </div>
          <div>
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.32em] text-[#e8d5b0]/70">
              Caleb Cooper
            </p>
            <h2 className="font-serif text-4xl leading-[0.92] tracking-tight text-white">
              Resume
            </h2>
            <div className="mt-3 h-px w-10 bg-[#e8d5b0]/40" />
            <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.28em] text-white/50 leading-relaxed max-w-[14rem]">
              AI Systems Engineer · Agentic Infrastructure · Voice · Data
            </p>
          </div>
        </div>
      </div>
    </div>
  ),

  spineContent: (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#0a0a08' }}>
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(232,213,176,0.5) 3px, rgba(232,213,176,0.5) 4px)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #c9a04e, #f0d98c, #c9a04e)' }} />
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 flex items-center justify-center"
        style={{ width: '34px', height: '34px', border: '1px solid rgba(201,160,78,0.55)', background: 'rgba(201,160,78,0.06)' }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', fontWeight: 700, color: '#c9a04e', letterSpacing: '0.06em', lineHeight: 1 }}>CC</span>
      </div>
      <div className="absolute left-[10px] right-[10px]" style={{ top: '54px', height: '1px', background: 'rgba(201,160,78,0.28)' }} />
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '68px', bottom: '108px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', fontFamily: "'Playfair Display', serif", fontSize: '21px', fontWeight: 700, color: '#f5ede0', letterSpacing: '0.16em', textTransform: 'uppercase', lineHeight: 1 }}>Résumé</span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '104px', width: '32px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a04e, transparent)', transform: 'translateX(-50%) rotate(-30deg)' }} />
      <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '98px', width: '20px', height: '1px', background: 'rgba(201,160,78,0.35)', transform: 'translateX(-50%) rotate(-30deg)' }} />
      <div className="absolute bottom-[18px] left-1/2 -translate-x-1/2">
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: "'Space Grotesk', ui-monospace, monospace", fontSize: '8.5px', fontWeight: 500, color: 'rgba(201,160,78,0.65)', letterSpacing: '0.24em', textTransform: 'uppercase' }}>Caleb Cooper</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #c9a04e, #f0d98c, #c9a04e)' }} />
    </div>
  ),

  sections: [
    {
      id: 'resume-hero',
      fullWidthContent: (
        <div className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
          <ManagedHeroVideo
            src={HERO_VIDEO}
            idSeed="resume-hero"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.55)_60%,rgba(13,13,13,0.98)_100%)]" />
          <div className="relative z-10 flex min-h-screen items-end pb-24 px-8 md:px-20">
            <div className="w-full max-w-5xl">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.38em] text-[#e8d5b0]/70">
                Caleb Cooper · AI Systems Engineer
              </p>
              <h1 className="font-serif text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] tracking-tight text-white">
                Resume
              </h1>
              <div className="mt-6 h-px w-16 bg-[#e8d5b0]/40" />
              <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-white/70 md:text-2xl">
                Agentic systems, voice interfaces, and data architecture across enterprise and product.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'resume-downloads',
      fullWidthContent: (
        <div className="relative bg-[#f5f0ea] py-24 px-8 md:px-20">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.38em] text-[#8b6a2b]">
              Downloads
            </p>
            <h2 className="mb-3 font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] tracking-tight text-[#171312]">
              Resume Variations
            </h2>
            <p className="mb-12 max-w-xl font-serif text-lg leading-relaxed text-black/60">
              Tailored for different roles — pick the version that matches what you're hiring for.
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              {RESUME_VARIANTS.map((variant) => (
                <div
                  key={variant.label}
                  className="flex items-center justify-between border border-black/10 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <div>
                    <p className="font-sans text-base font-semibold text-[#171312]">
                      {variant.label}
                    </p>
                    {variant.note && (
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-black/38">
                        {variant.note}
                      </p>
                    )}
                  </div>
                  {variant.file ? (
                    <a
                      href={variant.file}
                      download
                      className="flex items-center gap-2 border border-[#171312] bg-[#171312] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#3a3330] hover:border-[#3a3330]"
                    >
                      <DownloadIcon />
                      Download
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 border border-black/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black/30 cursor-not-allowed">
                      <DownloadIcon />
                      Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'resume-footer',
      fullWidthContent: (
        <div className="relative min-h-[50vh] overflow-hidden bg-[#0d0d0d]">
          <img
            src="/images/footer-stills/resume-footer.webp"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(13,13,13,0.72)]" />
          <div className="relative z-10 flex min-h-[50vh] items-center justify-center px-8 text-center">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.38em] text-[#e8d5b0]/60">
                Open to opportunities
              </p>
              <h2 className="font-serif text-[clamp(2rem,6vw,4.5rem)] leading-[0.92] tracking-tight text-white">
                Let's build something.
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/calebcooper21/"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#e8d5b0]/40 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#e8d5b0] transition-colors hover:bg-[#e8d5b0]/10"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:CalebCooper2024@gmail.com"
                  className="border border-white/20 bg-white/8 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white hover:border-white/40"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
};
