import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const byc2wShell = works.find((work) => work.id === 'byc2w');

if (!byc2wShell) {
  throw new Error('BYC2W shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#ffe27a]/82' : 'text-[#2253ff]'
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
      tone === 'light' ? 'border-white/14 bg-black/18' : 'border-black/10 bg-white/82'
    }`}
  >
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
        tone === 'light' ? 'text-[#ffe27a]/82' : 'text-[#2253ff]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.55rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#10133d]'
      }`}
    >
      {value}
    </div>
    <p className={`mt-auto pt-4 text-[13px] leading-relaxed ${tone === 'light' ? 'text-white/70' : 'text-black/64'}`}>{note}</p>
  </div>
);

const SignalCard = ({
  title,
  body,
  tone = 'dark',
}: {
  title: string;
  body: React.ReactNode;
  tone?: 'dark' | 'light';
}) => (
  <div className={tone === 'dark' ? 'border border-white/10 bg-white/6 p-6' : 'border border-black/10 bg-white/82 p-6'}>
    <p
      className={
        tone === 'dark'
          ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffe27a]/82'
          : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#2253ff]'
      }
    >
      {title}
    </p>
    <div className={tone === 'dark' ? 'font-serif text-lg leading-relaxed text-white/84' : 'font-serif text-lg leading-relaxed text-black/72'}>{body}</div>
  </div>
);

const SystemCard = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => (
  <div className="border border-white/10 bg-black/16 p-6 backdrop-blur-sm">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffe27a]/82">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/84">{body}</p>
  </div>
);

const Byc2wMosaic = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <img src="/assets/img/byc2w-milky-overview.png" alt="BYC2W Milky Way overview" className="h-56 w-full rounded-sm border border-black/10 object-cover shadow-[0_18px_40px_rgba(0,0,0,0.08)]" />
    <img src="/assets/img/byc2w-milky-target-lock.png" alt="BYC2W target lock view" className="h-56 w-full rounded-sm border border-black/10 object-cover shadow-[0_18px_40px_rgba(0,0,0,0.08)]" />
    <img src="/assets/img/byc2w-milky-wide-scan.png" alt="BYC2W wide scan view" className="h-44 w-full rounded-sm border border-black/10 object-cover shadow-[0_18px_40px_rgba(0,0,0,0.08)] md:col-span-2" />
  </div>
);

export const byc2wBook: BookProject = {
  ...byc2wShell,
  showAuthorBadge: false,
  sections: [
    {
      id: 'byc2w-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#120a2c] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/byc2w-4k.mp4"
            idSeed={`managed-${Math.random().toString(36).substring(7)}`}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="h-full w-full object-cover opacity-[0.9]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,220,84,0.14),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(87,142,255,0.14),transparent_20%),radial-gradient(circle_at_60%_76%,rgba(255,97,140,0.1),transparent_24%),linear-gradient(180deg,rgba(12,6,28,0.1),rgba(12,6,28,0.66))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#ffe27a]/82">BYC2W / Bring Your Child To Work Day</p>
            <h1 className="max-w-4xl font-serif text-[8.7vw] leading-[0.84] tracking-tight md:text-[4.95vw]">
              Imagination, Space, Physics, And Three Hours.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.32rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              BYC2W started with an 8-year-old who loved space and physics and wanted to see imagination turn into something real. The point was not to build startup theater. The point was to use AI as a fast creative partner and prove how quickly curiosity can become an interactive artifact.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="3 Hours" label="Build Window" note="The whole thing happened fast enough that the original excitement never had time to die." />
              <MetricTile value="Kid Brief" label="Origin" note="The direction came from a child who cared about space, physics, and making an idea feel real." />
              <MetricTile value="Space + Physics" label="Theme" note="The visual language and interaction logic both stay rooted in cosmic curiosity." />
              <MetricTile value="Built To Show" label="Result" note="AI was used to compress the path from idea to something visible, playable, and shareable." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'byc2w-origin',
      bgColorLeft: 'bg-[#fff6dc]',
      textColorLeft: 'text-[#10133d]',
      bgColorRight: 'bg-[#12173d]',
      textColorRight: 'text-white',
      leftTitle: 'Why BYC2W Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#10133d] md:text-6xl">
            Teach Wonder. Then Build Fast.
          </h2>
          <p className="max-w-xl border-l-4 border-[#ff6b6b] pl-6 font-serif text-xl leading-relaxed text-black/76">
            BYC2W is what happens when AI gets used as a creative accelerator instead of a productivity slogan. An 8-year-old had a space-and-physics idea. The goal was to get from imagination to something real before the wonder faded.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            The interesting part was never polish for its own sake. It was the teaching loop: describe the idea, make a version, react to it, revise it, and keep moving until the child could point at the screen and say, yes, that feels like what I meant.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            AI helped shrink the gap between concept and artifact. Instead of stalling out in blank-page friction, the project moved through image direction, interface framing, and fast iteration quickly enough to stay fun.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            That is what BYC2W is really showing: not just that a thing can be built quickly, but that AI can help young imagination stay in motion long enough to become tangible.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Fast Iteration" body="The cycle from prompt to visible change stayed short, which kept the project playful instead of exhausting." />
            <SignalCard title="Shared Direction" body="The child could react to what appeared on screen and steer the next version without needing formal design language." />
            <SignalCard title="Creative Confidence" body="The build itself became part of the lesson: ideas do not need to stay trapped in your head." />
          </div>
        </div>
      ),
    },
    {
      id: 'byc2w-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#ffe27a] bg-[linear-gradient(135deg,#10265a_0%,#2451ff_34%,#ff6b6b_68%,#ffd84f_100%)] px-8 py-24 text-center text-white md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/22 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            The best version of AI for a child is not an answer machine. It is a way to turn curiosity into something visible, interactive, and real before the excitement has time to collapse.
          </p>
        </div>
      ),
    },
    {
      id: 'byc2w-surface',
      bgColorLeft: 'bg-[#10163a]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#fff7ee]',
      textColorRight: 'text-[#10133d]',
      leftTitle: 'What The Build Became',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="Build Surface" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Cosmic Storytelling With Rapid Prototyping.
          </h2>
          <p className="max-w-xl border-l-4 border-[#ffe27a] pl-6 font-serif text-xl leading-relaxed text-white/76">
            BYC2W is not important because it chased technical complexity. It is important because it made the right kind of complexity accessible: visual imagination, scientific wonder, and rapid prototyping in one short build loop.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-6">
          <Byc2wMosaic />
          <div className="grid gap-4 md:grid-cols-2">
            <SignalCard title="Space Storytelling" body="The surface leans into galaxies, scans, habitability, and celestial framing because that is where the original curiosity lived." tone="light" />
            <SignalCard title="Physics Flavor" body="The build borrows the language of systems, classification, and observation to make the project feel scientific without becoming sterile." tone="light" />
            <SignalCard title="Rapid Prompting" body="The point was to move quickly through visual and interface variations until the idea felt emotionally right." tone="light" />
            <SignalCard title="Real Enough To Share" body="What mattered was getting to something someone could actually open, react to, and remember." tone="light" />
          </div>
        </div>
      ),
    },
    {
      id: 'byc2w-proof',
      bgColorLeft: 'bg-[#fff3cf]',
      textColorLeft: 'text-[#10133d]',
      bgColorRight: 'bg-[#15102e]',
      textColorRight: 'text-white',
      leftTitle: 'What It Proves',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="What It Proves" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#10133d] md:text-6xl">
            AI Can Help Teach Through Making.
          </h2>
          <p className="max-w-xl border-l-4 border-[#2253ff] pl-6 font-serif text-xl leading-relaxed text-black/76">
            BYC2W demonstrates rapid prototyping, AI storytelling, creative direction, and educational product thinking. Used well, AI becomes a way to teach through making instead of just a way to automate.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SystemCard title="Rapid Prototyping" body="A meaningful artifact can appear quickly enough to keep the human side of the idea engaged." />
            <SystemCard title="AI Storytelling" body="The build turns a vague concept into a world with tone, visuals, and a reason to exist." />
            <SystemCard title="Educational Leverage" body="The project gives a child a way to see science-adjacent imagination become something concrete." />
            <SystemCard title="Creative Access" body="The barrier to making something memorable gets lower when iteration becomes conversational." />
          </div>

          <a
            href="/work/byc2w/playground/dist/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-white/18 bg-white/6 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-white/10"
          >
            Open BYC2W Playground
            <span aria-hidden="true">{'->'}</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-white/58">
            The playground is the artifact, not the entire story. The deeper point is how quickly AI can help an idea become visible enough to teach from.
          </p>
        </div>
      ),
    },
    {
      id: 'byc2w-footer',
      fullWidthContent: (
        <div className="relative min-h-[72vh] overflow-hidden bg-[#100a28] px-8 py-20 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/byc2w-4k.mp4"
            idSeed={`managed-${Math.random().toString(36).substring(7)}`}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="h-full w-full object-cover opacity-[0.84]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,6,22,0.26),rgba(9,6,22,0.62))]" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-end">
            <Kicker n="05" label="Closing Note" />
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight md:text-6xl">
              Wonder works better when it can become something real while the idea is still alive.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-white/82">
              BYC2W is a small project with a large point: AI can help compress the distance between imagination and artifact, especially when the person holding the idea is young, excited, and ready to see it take shape now.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
