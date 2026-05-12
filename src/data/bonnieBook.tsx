import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const bonnieShell = works.find((work) => work.id === 'bonnie');

if (!bonnieShell) {
  throw new Error('Bonnie shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#f2a3c7]/82' : 'text-[#9d3b67]'
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
      tone === 'light'
        ? 'border-white/16 bg-black/18'
        : 'border-black/10 bg-white/78'
    }`}
  >
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
        tone === 'light' ? 'text-[#f2a3c7]/84' : 'text-[#9d3b67]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.6rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#18050f]'
      }`}
    >
      {value}
    </div>
    <p className={`mt-auto pt-4 text-[13px] leading-relaxed ${tone === 'light' ? 'text-white/68' : 'text-black/64'}`}>{note}</p>
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
  <div className={tone === 'dark' ? 'border border-white/10 bg-white/5 p-6' : 'border border-black/10 bg-white/76 p-6'}>
    <p className={tone === 'dark' ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f2a3c7]/74' : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9d3b67]'}>
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
  <div className="border border-white/10 bg-black/16 p-6 backdrop-blur-sm">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f2a3c7]/74">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/82">{body}</p>
  </div>
);

export const bonnieBook: BookProject = {
  ...bonnieShell,
  showAuthorBadge: false,
  sections: [
    {
      id: 'bonnie-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#12040d] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/bonnie-bg.mp4"
            idSeed="bonnie-hero-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,163,199,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(95,14,53,0.24),transparent_34%),linear-gradient(180deg,rgba(10,3,7,0.08),rgba(10,3,7,0.66))]" />
          <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-center opacity-[0.04] mix-blend-soft-light" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#f2a3c7]/84">Bonnie / Personal Project</p>
            <h1 className="max-w-4xl font-serif text-[9.5vw] leading-[0.86] tracking-tight md:text-[5.4vw]">
              A Playable GTAV Teammate.
            </h1>
            <p className="mt-8 max-w-2xl font-serif text-[1.35rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              Bonnie is a playable GTAV teammate for players who want a real partner in-session. She joins through her own cloud-gaming session, takes voice commands in real time, remembers the world, and helps players keep progressing.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="Runs Missions" label="Primary Lens" note="Bonnie joins the player instead of commenting from the side." />
              <MetricTile value="Listens" label="Interaction Style" note="She takes voice commands while the session is still moving." />
              <MetricTile value="Keeps Memory" label="Core System" note="Crew history and world state should persist across runs." />
              <MetricTile value="Helps Players" label="Who It Serves" note="Bonnie is built to help GTAV players keep progressing." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'bonnie-origin',
      bgColorLeft: 'bg-[#f6e9ee]',
      textColorLeft: 'text-[#18050f]',
      bgColorRight: 'bg-[#12040d]',
      textColorRight: 'text-white',
      leftTitle: 'Why Bonnie Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#18050f] md:text-6xl">
            A Teammate, Not Another Spectator.
          </h2>
          <p className="max-w-xl border-l-4 border-[#c74a7f] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Most game-adjacent AI ideas stop at static tips, character chat, or a UI pileup. I wanted Bonnie to be materially more ambitious: a teammate that can actually enter the world, run the mission, follow live commands, and help GTAV players keep growing instead of just talking about the game.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            Bonnie is meant to be a literal online teammate. The concept is that she uses her own Xbox Cloud Gaming or PlayStation Plus Premium session to join the world, play the game autonomously, and respond to player voice commands while the mission is actually unfolding.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            She is not just learning generic GTA facts. Bonnie is grounded in thousands of hours of GTAV YouTube footage and in direct in-world play and exploration. The goal is a teammate who understands the map, the mission rhythms, the traffic of the world, and the kinds of decisions that matter when things start moving fast.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            Bonnie also exists to help GTAV players grow their world. She is there to support the run, feed the earnings back into progression, remember what the player has built, and keep getting more useful over time instead of behaving like a disposable novelty.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Autonomous Play" body="Bonnie is meant to join the session herself and run the game as an actual teammate, not just an advisor." />
            <SignalCard title="Mission Context" body="Her actions and calls should reflect the real objective, the world state, the route, and the current pressure of the run." />
            <SignalCard title="Voice Response" body="She should hear the player, respond quickly, and stay useful without sounding robotic or overtalking the session." />
          </div>
        </div>
      ),
    },
    {
      id: 'bonnie-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#d8b6c5] bg-[#f2c8d7] px-8 py-24 text-center text-[#18050f] md:px-24 md:py-32">
          <span className="mb-[-4.5rem] font-serif text-[10rem] leading-none text-white/35 select-none md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            Bonnie matters because she pushes past generic chat and toward an AI teammate that can actually enter the world, play beside the player, follow live commands, and keep getting smarter about how people play together.
          </p>
          <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-black/66">
            That is the project. Not a wallpaper character. Not a fake companion. A full-game teammate with memory, autonomy, voice responsiveness, and a reason to exist inside the session itself.
          </p>
        </div>
      ),
    },
    {
      id: 'bonnie-system',
      bgColorLeft: 'bg-[#0f0710]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#f8f0f3]',
      textColorRight: 'text-[#18050f]',
      leftTitle: 'System Shape',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="Architecture" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Memory, World Sense, And Execution.
          </h2>
          <p className="max-w-xl border-l-4 border-[#f2a3c7] pl-6 font-serif text-xl leading-relaxed text-white/72">
            Bonnie only feels real if the system underneath her can remember the player, understand the world, act inside the game, and keep responding cleanly while the session is still unfolding.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4">
          <SignalCard
            title="Persistent Player and Crew Memory"
            body="Bonnie should remember recurring teammates, preferred roles, reliable behaviors, prior wins, bad habits, and the progression history that makes one world feel different from another."
            tone="light"
          />
          <SignalCard
            title="Full-Game World Interpretation"
            body="She needs to read the mission phase, positioning, route, local danger, and what just happened in the world instead of leaning on generic canned advice."
            tone="light"
          />
          <SignalCard
            title="Voice Commands and Character"
            body="The interaction should feel immediate and alive: I speak, Bonnie reacts, and the response stays concise enough to remain useful during an active mission."
            tone="light"
          />
          <SignalCard
            title="Autonomous Mission Support"
            body="The interesting part is not hidden behavior. It is a teammate that can actually run with the player, help complete the work, and align her effort with progression in the game."
            tone="light"
          />
        </div>
      ),
    },
    {
      id: 'bonnie-surface',
      bgColorLeft: 'bg-[#f6ebe6]',
      textColorLeft: 'text-[#18050f]',
      bgColorRight: 'bg-[#1a0611]',
      textColorRight: 'text-white',
      leftTitle: 'What You Can Open Here',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="05" label="Surface" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#18050f] md:text-6xl">
            The Book Explains The Product. The Playground Shows The Direction.
          </h2>
          <p className="max-w-xl border-l-4 border-[#c74a7f] pl-6 font-serif text-xl leading-relaxed text-black/76">
            This page is where I explain the system honestly. The playground is where I show what Bonnie could feel like when an autonomous teammate, a voice layer, and a playable character start becoming one coherent surface.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SystemCard title="Playground" body="A stylized surface for the teammate experience, tuned to show the personality, pacing, and direction of the concept." />
            <SystemCard title="Briefing Layer" body="Mission framing, crew memory, and the context Bonnie should bring into the run before anything starts." />
            <SystemCard title="In-Session Support" body="Live mission help, concise responses, and teammate behavior that stays useful while the game is still moving." />
            <SystemCard title="Honest Boundaries" body="The visuals can imply more than the current runtime does. I would rather state that plainly than fake completion." />
          </div>

          <a
            href="/work/bonnie/bonnie-playground/dist/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-[#f2a3c7]/35 bg-[#f2a3c7]/10 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#f8d0e0] transition-colors hover:bg-[#f2a3c7]/16 opacity-50 cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            Playground Locked
            <span aria-hidden="true">↗</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-white/58">
            The playground is there to communicate the tone, the interface direction, and the teammate fantasy. It is not a claim that every visual beat already maps one-to-one to the runtime underneath.
          </p>
        </div>
      ),
    },
    {
      id: 'bonnie-capabilities',
      bgColorLeft: 'bg-[#ffdce8]',
      textColorLeft: 'text-[#18050f]',
      bgColorRight: 'bg-[#6d1237]',
      textColorRight: 'text-white',
      leftTitle: 'What Bonnie Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="06" label="AI Product Skills" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#18050f] md:text-6xl">
            Voice Interfaces, Game-State Awareness, Memory, And Companion UX.
          </h2>
          <p className="max-w-xl border-l-4 border-[#c74a7f] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Bonnie demonstrates voice command handling, game-state awareness, persistent session memory, autonomous task support, and consumer AI product design for players who want a teammate instead of a novelty layer.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4 md:grid-cols-2">
          <SignalCard title="Voice Command Handling" body="The system has to hear, interpret, and act while the session is still moving." tone="light" />
          <SignalCard title="Game-State Awareness" body="The interesting work is not generic chat. It is understanding mission context, world state, and player intent inside the run." tone="light" />
          <SignalCard title="Persistent Session Memory" body="Crew roles, world progress, and prior outcomes should compound into a better teammate instead of resetting every time." tone="light" />
          <SignalCard title="Consumer AI Product Design" body="Bonnie is also a product-design question about how AI teammates should feel when they are built for players, not demos." tone="light" />
        </div>
      ),
    },
    {
      id: 'bonnie-footer',
      fullWidthContent: (
        <div className="relative flex min-h-[88vh] w-full items-end overflow-hidden bg-[#12040d] px-8 py-16 text-white md:px-24">
          <img
            src="/images/footer-stills/bonnie-footer.webp"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="low"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,4,13,0.08),rgba(18,4,13,0.68)_78%)]" />
          <div className="relative z-10 max-w-5xl">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.34em] text-[#f2a3c7]/82">Bonnie / Closing Read</p>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight md:text-5xl">
              Bonnie is my attempt to build an AI teammate that can actually live in the GTA world, play beside the player, and keep helping that world grow over time.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-xl leading-relaxed text-white/80">
              The page is meant to show the concept clearly. The next step is continuing to harden the autonomy, the memory, the voice command layer, and the world understanding so the teammate earns the promise of the idea. And who knows, maybe Bonnie is learning to play more games as we speak.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
