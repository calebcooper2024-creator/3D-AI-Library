import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const boonkShell = works.find((work) => work.id === 'boonk');

if (!boonkShell) {
  throw new Error('Boonk shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#e5c28f]/82' : 'text-[#0f766e]'
    }`}
  >
    {n} - {label}
  </p>
);

const MetricTile = ({
  value,
  label,
  note,
  tone = 'light',
}: {
  value: string;
  label: string;
  note: string;
  tone?: 'light' | 'dark';
}) => (
  <div
    className={`flex min-h-[210px] flex-col border p-5 md:p-6 ${
      tone === 'light' ? 'border-white/14 bg-[#10161b]/56' : 'border-black/10 bg-white/82'
    }`}
  >
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
        tone === 'light' ? 'text-[#e5c28f]/78' : 'text-[#0f766e]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.6rem,2vw,2.4rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#101010]'
      }`}
    >
      {value}
    </div>
    <p className={`mt-auto pt-4 text-[13px] leading-relaxed ${tone === 'light' ? 'text-white/66' : 'text-black/64'}`}>{note}</p>
  </div>
);

const SignalCard = ({
  title,
  body,
  tone = 'dark',
}: {
  title: string;
  body: string;
  tone?: 'dark' | 'light';
}) => (
  <div className={tone === 'dark' ? 'border border-white/10 bg-[#0f161b]/72 p-6' : 'border border-black/10 bg-white/84 p-6'}>
    <p className={tone === 'dark' ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#e5c28f]/78' : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#0f766e]'}>
      {title}
    </p>
    <p className={tone === 'dark' ? 'font-serif text-lg leading-relaxed text-white/84' : 'font-serif text-lg leading-relaxed text-black/72'}>
      {body}
    </p>
  </div>
);

const SystemCard = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => (
  <div className="border border-white/10 bg-[#102126]/60 p-6 backdrop-blur-sm">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#e5c28f]/78">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/82">{body}</p>
  </div>
);

export const boonkBook: BookProject = {
  ...boonkShell,
  showAuthorBadge: false,
  sections: [
    {
      id: 'boonk-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#14110b] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/boonk-4k.mp4"
            idSeed="boonk-hero-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(224,171,112,0.16),transparent_22%),radial-gradient(circle_at_78%_22%,rgba(91,199,187,0.14),transparent_20%),linear-gradient(180deg,rgba(10,10,12,0.12),rgba(10,10,12,0.72))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#e5c28f]/82">Boonk / Personal Project</p>
            <h1 className="max-w-4xl font-serif text-[9.3vw] leading-[0.86] tracking-tight md:text-[5.2vw]">
              Clones The Hard Parts.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-relaxed text-white/88 md:text-[1.52rem]">
              Boonk is a reconstruction system for websites. It focuses less on grabbing a flat copy of a page and more on retaining the anatomy that makes the site feel alive: components, motion, transitions, navigable structure, and swap-ready content surfaces.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="Clones Components" label="Primary Lens" note="Boonk retains individual parts instead of settling for a dead snapshot." />
              <MetricTile value="Keeps Motion" label="Interaction Style" note="Animations, transitions, and timing survive the reconstruction path." />
              <MetricTile value="Swaps Content" label="Core System" note="Copy and visuals can be updated without breaking the original anatomy." />
              <MetricTile value="Runs Local" label="Output" note="The result stays navigable, inspectable, and useful in local preview." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'boonk-origin',
      bgColorLeft: 'bg-[#fff0dc]',
      textColorLeft: 'text-[#101010]',
      bgColorRight: 'bg-[#132126]',
      textColorRight: 'text-white',
      leftTitle: 'Why Boonk Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[11ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#101010] md:text-6xl">
            Not Another Flat Site Cloner.
          </h2>
          <p className="max-w-xl border-l-4 border-[#c98c57] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Most cloning tools can capture the visible page. The real failure is that they miss the hard details: reusable components, motion systems, transition behavior, and the structure you need if the clone is supposed to become editable work instead of a frozen copy.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            Boonk starts from the live site, but the goal is not just "save this page." The goal is to reconstruct the site in a way that keeps the moving parts intact: component boundaries, local navigation, asset references, transitions, and page-to-page behavior.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            That matters because the best use case is not always duplication. Often the real value is taking an existing site anatomy and rebuilding it with new copy, new visuals, and a different product story without losing the interaction quality that made the original useful.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            Boonk is aimed at the layer most site cloners usually miss: preserving the hard-earned details that make a site feel authored rather than merely rendered.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Component Anatomy" body="The clone should preserve how the site is built, not just what the browser happened to paint." />
            <SignalCard title="Motion Fidelity" body="Transitions, timing, and interaction rhythm are part of the system and need to survive the export." />
            <SignalCard title="Swap-Ready Output" body="The reconstructed site should accept new copy and visuals without collapsing the original structure." />
          </div>
        </div>
      ),
    },
    {
      id: 'boonk-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#dcb487] bg-[linear-gradient(135deg,#191b1d_0%,#8e5f33_44%,#5bc7bb_100%)] px-8 py-24 text-center text-white md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/32 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            The interesting part is not that Boonk can copy a site. The interesting part is that it can retain enough of the site's anatomy to rebuild it with different content and still keep the original interaction quality alive.
          </p>
        </div>
      ),
    },
    {
      id: 'boonk-system',
      bgColorLeft: 'bg-[#152228]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#eef8f6]',
      textColorRight: 'text-[#101010]',
      leftTitle: 'What Boonk Preserves',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="Retention Layer" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Components, Motion, Structure, And Swapability.
          </h2>
          <p className="max-w-xl border-l-4 border-[#5bc7bb] pl-6 font-serif text-xl leading-relaxed text-white/76">
            Boonk is strongest when the exported result still behaves like a working site skeleton instead of a screenshot with links taped back on.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4">
          <SignalCard
            title="Component Retention"
            body="The clone should keep repeatable sections and local structure clear enough that edits feel surgical instead of destructive."
            tone="light"
          />
          <SignalCard
            title="Animation and Transition Carryover"
            body="Motion is part of the product. Boonk aims to retain the timing, sequencing, and transition feel that simple scrapers usually flatten away."
            tone="light"
          />
          <SignalCard
            title="Local Asset Rewriting"
            body="Fonts, images, stylesheets, video references, and internal links all need localization so the reconstructed site runs without reaching back to the origin."
            tone="light"
          />
          <SignalCard
            title="Editable Reconstruction"
            body="The point is not only to preserve fidelity. It is to make the clone useful for rebuilding with fresh copy, updated visuals, and a new narrative layer."
            tone="light"
          />
        </div>
      ),
    },
    {
      id: 'boonk-proof',
      bgColorLeft: 'bg-[#123038]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#fff7eb]',
      textColorRight: 'text-[#101010]',
      leftTitle: 'What Boonk Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="05" label="Why This Matters" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Anatomy Retention Beats Flat Capture.
          </h2>
          <p className="max-w-xl border-l-4 border-[#e5c28f] pl-6 font-serif text-xl leading-relaxed text-white/76">
            Boonk demonstrates frontend reverse engineering, motion reconstruction, asset localization, and content remapping. The point is not scraping. The point is rebuilding something usable enough to become the next product surface.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4">
          <SignalCard title="Frontend Reverse Engineering" body="The rebuilt site should preserve reusable sections instead of collapsing them into one brittle export." tone="light" />
          <SignalCard title="Motion Reconstruction" body="Transitions, motion timing, and interaction sequencing need to survive, because those are part of how the product feels." tone="light" />
          <SignalCard title="Content Remapping" body="Fresh copy, new visuals, and a different narrative layer should be able to drop into the preserved anatomy without rewriting the whole structure." tone="light" />
          <SignalCard title="Asset Localization" body="The clone should run locally with clean internal links and rewritten assets instead of reaching back to the original site to stay alive." tone="light" />
        </div>
      ),
    },
    {
      id: 'boonk-surface',
      bgColorLeft: 'bg-[#f7ecdf]',
      textColorLeft: 'text-[#101010]',
      bgColorRight: 'bg-[#19150f]',
      textColorRight: 'text-white',
      leftTitle: 'What You Can Open Here',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="06" label="Surface" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#101010] md:text-6xl">
            The Book Explains The Logic. The Playground Shows The Tool.
          </h2>
          <p className="max-w-xl border-l-4 border-[#c98c57] pl-6 font-serif text-xl leading-relaxed text-black/76">
            This page explains what Boonk is actually trying to preserve. The playground is where the capture, reconstruction, and preview workflow becomes concrete.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SystemCard title="Live Inspection" body="Boonk starts from the running site instead of trusting a dead export." />
            <SystemCard title="Structural Capture" body="The goal is to retain the anatomy that makes the site editable after the clone." />
            <SystemCard title="Asset Localization" body="URL rewrites and local asset handling keep the clone running in preview without remote dependencies." />
            <SystemCard title="Rebuild Surface" body="Once the anatomy survives, copy and visuals can be swapped without destroying the motion system." />
          </div>

          <a
            href="/work/boonk/boonk-v2-app/dist/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-[#e5c28f]/24 bg-[#e5c28f]/8 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#e5c28f]/14 opacity-50 cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            Playground Locked
            <span aria-hidden="true">↗</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-white/58">
            The playground is there to show the capture and reconstruction direction. It is not meant to claim that every edge case in the workspace is already solved.
          </p>
        </div>
      ),
    },
    {
      id: 'boonk-footer',
      fullWidthContent: (
        <div className="relative flex min-h-[88vh] w-full items-end overflow-hidden bg-[#14110b] px-8 py-16 text-white md:px-24">
          <img
            src="/images/footer-stills/boonk-footer.webp"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="low"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(224,171,112,0.12),transparent_24%),radial-gradient(circle_at_76%_24%,rgba(91,199,187,0.1),transparent_20%),linear-gradient(180deg,rgba(11,11,12,0.12),rgba(11,11,12,0.72)_78%)]" />
          <div className="relative z-10 max-w-5xl">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.34em] text-[#e5c28f]/78">Boonk / Closing Read</p>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight md:text-5xl">
              Boonk is about preserving the hard details that let a clone become real editable work: the components, the motion, the transitions, and the structure beneath the page.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-xl leading-relaxed text-white/80">
              That is the difference between a flat copy and a reconstruction system. If the anatomy survives, the site can be retold with new visuals, new copy, and a new product story without losing what made it effective.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
