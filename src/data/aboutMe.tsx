import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#c9a04e]/80' : 'text-[#8b6a2b]'
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
  note?: string;
  tone?: 'light' | 'dark';
}) => (
  <div className={`border-l-2 pl-5 ${tone === 'light' ? 'border-[#c9a04e]' : 'border-[#8b6a2b]'}`}>
    <div
      className={`font-sans text-5xl font-black leading-none tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#171312]'
      }`}
    >
      {value}
    </div>
    <p
      className={`mt-2 font-mono text-[10px] uppercase tracking-widest ${
        tone === 'light' ? 'text-[#c9a04e]/86' : 'text-[#8b6a2b]'
      }`}
    >
      {label}
    </p>
    {note ? (
      <p className={`mt-3 text-sm leading-relaxed ${tone === 'light' ? 'text-white/62' : 'text-black/62'}`}>{note}</p>
    ) : null}
  </div>
);

const RoleCard = ({ title, body }: { title: string; body: string }) => (
  <div className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9a04e]/72">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/84">{body}</p>
  </div>
);

const ProjectCard = ({ title, body }: { title: string; body: string }) => (
  <div className="border border-black/10 bg-white/72 p-6">
    <p className="mb-3 font-serif text-2xl leading-tight text-[#171312]">{title}</p>
    <p className="text-base leading-relaxed text-black/68">{body}</p>
  </div>
);

export const aboutMeBook: BookProject = {
  id: 'about-caleb',
  title: 'Caleb Cooper',
  subtitle: 'I Build with AI.',
  author: 'Caleb Cooper',
  showAuthorBadge: false,
  spineColor: '#060606',
  coverColor: '#050505',
  textColor: '#c9a04e',
  fontTitle: 'font-serif',
  textureClass: 'texture-leather',
  coverImage: '/images/books/about_me_cover.png',

  coverContent: (
    <div
      className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_110px_rgba(0,0,0,0.82)]"
      style={{ backgroundImage: "url('/images/books/about_me_cover.png')" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.78)_58%,rgba(0,0,0,0.96))] p-10">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[8px] uppercase tracking-[0.42em] text-[#c9a04e]/72">AI SYSTEMS ENGINEER</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-[#c9a04e]/46">APRIL 2026 - ONGOING</span>
          </div>

          <div>
            <h2 className="font-serif text-[58px] leading-[0.84] tracking-tighter text-white drop-shadow-2xl">
              Caleb
              <br />
              Cooper
            </h2>
            <div className="mt-6 h-[0.5px] w-16 bg-[#c9a04e] opacity-55" />
            <p className="mt-6 max-w-[210px] font-mono text-[9px] uppercase leading-relaxed tracking-[0.28em] text-[#c9a04e]/78">
              I turn ideas into working software with AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),

  spineContent: (
    <div className="absolute inset-0 overflow-hidden border-r border-[#c9a04e]/10 bg-[#060606]">
      <div className="absolute inset-0 bg-[url('/images/books/about_me_cover.png')] bg-cover bg-center opacity-14 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-transparent to-black/82" />

      <div className="relative flex h-full flex-col items-center justify-between py-9">
        <span className="[writing-mode:vertical-rl] font-mono text-[7px] uppercase tracking-[0.38em] text-[#c9a04e]/56">
          I BUILD WITH AI
        </span>

        <div className="flex flex-col items-center gap-6">
          <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-[20px] tracking-[0.16em] text-white">
            CALEB COOPER
          </span>
          <div className="h-12 w-[1px] bg-[#c9a04e]/28" />
        </div>

        <span className="rotate-90 font-mono text-[8px] uppercase tracking-[0.28em] text-[#c9a04e]/34">APR 2026</span>
      </div>
    </div>
  ),

  sections: [
    {
      id: 'caleb-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#090705] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/about-bg.mp4"
            idSeed="about-me-hero-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,160,78,0.18),transparent_36%),linear-gradient(180deg,rgba(5,4,3,0.18),rgba(5,4,3,0.9))]" />
          <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-center opacity-[0.05] mix-blend-soft-light" />

          <div className="relative z-10 max-w-5xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#c9a04e]/84">Caleb Cooper / AI Systems Engineer</p>
            <h1 className="max-w-4xl font-serif text-[13vw] leading-[0.82] tracking-tight md:text-[7.2vw]">
              I Turn Ideas Into Working Systems.
            </h1>
            <p className="mt-8 max-w-4xl font-serif text-2xl leading-relaxed text-white/88 md:text-[2rem]">
              In April 2026, I decided to see how far I could actually push my skills with AI. This site, the books, and the systems behind them are the result. They are still ongoing.
            </p>

            <div className="mt-10">
              <a
                href="https://www.linkedin.com/in/calebcooper21/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-[#c9a04e]/40 bg-[#c9a04e]/10 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#c9a04e] transition-colors hover:bg-[#c9a04e]/20"
              >
                LinkedIn Profile
                <span aria-hidden="true" className="text-[14px] leading-none mb-[2px]">↗</span>
              </a>
            </div>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="5" label="Active Workspaces" note="I am building across five core local codebases right now." />
              <MetricTile value="~411k" label="Lines of Source" note="Approximate source-text scale across the active workspaces on this machine." />
              <MetricTile value="Apr 2026" label="This Push Started" note="I started this run in April to see how far I could actually go." />
              <MetricTile value="Ongoing" label="Status" note="None of this is frozen. I am still adding, refining, and pressure-testing it." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'caleb-origin',
      bgColorLeft: 'bg-[#f3ece3]',
      textColorLeft: 'text-[#171312]',
      bgColorRight: 'bg-[#120f0d]',
      textColorRight: 'text-white',
      leftTitle: 'Why I Built This Site',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#171312] md:text-6xl">
            I Wanted To See How Far I Could Push This.
          </h2>
          <p className="max-w-xl border-l-4 border-[#c9a04e] pl-6 font-serif text-xl leading-relaxed text-black/76">
            I did not build this site to pretend I am a traditional designer or web developer. I built it to prove that I can use AI to close the gap between an idea in my head and a product people can actually open, read, and judge.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            Last year I saw a 3D book interaction in Spline and could not replicate it. This year I came back to the idea, handed a screenshot to Gemini 3.1 Pro to get the base concept moving, and then used GPT-5.4 with extra-high reasoning in Codex to carry the build across the finish line.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            Claude was there too, smoking tokens like cigarettes and occasionally stopping halfway through a task, which is funny in hindsight and expensive in the moment. I was working with roughly $60 a month in AI tools, constant limits, and a short detour away from my preferred projects.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            Seven days later, The AI Library existed. The bigger point is not the bookshelf. The bigger point is that I can use AI to bring my ideas, and other people's ideas, to life quickly enough that the bottleneck becomes judgment, not blank-page friction.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9a04e]/74">Starting point</p>
              <p className="mt-3 font-serif text-xl leading-snug text-white/88">1 screenshot</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9a04e]/74">Time to first version</p>
              <p className="mt-3 font-serif text-xl leading-snug text-white/88">7 days</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9a04e]/74">Constraint</p>
              <p className="mt-3 font-serif text-xl leading-snug text-white/88">Constant model limits</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'caleb-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#d5c6ae] bg-[#efe6da] px-8 py-24 text-center md:px-24 md:py-32">
          <span className="mb-[-5rem] font-serif text-[10rem] leading-none text-[#d7c6a9]/60 select-none md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight text-[#171312] md:text-5xl">
            I Am Not a Designer or a Web Developer by Trade. I Built This Site Anyway Because AI Lets Me Move From Curiosity to Implementation Faster Than My Old Skill Boundary Ever Allowed.
          </p>
          <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-black/60">
            That is the point of this page. It is not a victory lap. It is proof of how I work when I care enough about the idea to make it real.
          </p>
        </div>
      ),
    },
    {
      id: 'caleb-background',
      bgColorLeft: 'bg-[#111111]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#f3ece3]',
      textColorRight: 'text-[#171312]',
      leftTitle: 'Where I Come From',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="Background" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            I Learned Through Research, Data, And Curiosity.
          </h2>
          <p className="font-serif text-[1.08rem] leading-relaxed text-white/78 md:text-[1.18rem]">
            I come from a biotechnology background, and I won a poster symposium for work on restriction endonucleases, enzymes that cut DNA at specific sequences. That training stayed with me. I still care about evidence, structure, and whether a system actually holds up under scrutiny.
          </p>
          <p className="font-serif text-[1.08rem] leading-relaxed text-white/78 md:text-[1.18rem]">
            I also have a data engineering and analytics foundation. I use AI heavily when I build pipelines, clean messy data, and apply machine learning to communications and customer datasets for behavior insights, product bundling, and next-order sequencing.
          </p>
          <p className="font-serif text-[1.08rem] leading-relaxed text-white/78 md:text-[1.18rem]">
            If you move through this site, you will find examples of RAG, GraphRAG, world models, A2UI, AI storytelling, rapid prototyping, agentic tools, agentic engineering, and broader generative AI product work. A lot of how I learn is still direct: YouTube, documentation, research, and repeated implementation until the idea clicks.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-6">
          <Kicker n="04" label="Applied AI Work" tone="dark" />
          <div className="space-y-5">
            <div className="border border-black/10 bg-white/72 p-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8b6a2b]">TELUS AI</p>
              <p className="font-serif text-lg leading-relaxed text-black/70">
                I have worked on multimodal AI training and evaluation across images, screenshots, public social posts, and similar content where consistency and judgment matter more than flashy demos.
              </p>
            </div>
            <div className="border border-black/10 bg-white/72 p-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8b6a2b]">Outlier AI</p>
              <p className="font-serif text-lg leading-relaxed text-black/70">
                I have spent time on agentic tool use, system instructions, function calling, forced reasoning, and failure-mode work. A lot of that effort has been about getting models to reason more accurately instead of sounding confident.
              </p>
            </div>
            <div className="border border-black/10 bg-white/72 p-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8b6a2b]">Snorkel AI</p>
              <p className="font-serif text-lg leading-relaxed text-black/70">
                I worked on terminal-task style evaluation before Claude Code was released. That sharpened how I think about tool use, verification, and the difference between a model that can talk about work and a model that can actually do it.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'caleb-proof',
      fullWidthContent: (
        <div className="relative w-full overflow-hidden bg-[#0c0907] px-8 py-20 text-white md:px-24 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,160,78,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(201,160,78,0.08),transparent_36%)]" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <Kicker n="05" label="What This Proves" />
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.92] tracking-tight md:text-7xl">
              I Use AI to Ship the Work, Not to Posture About It.
            </h2>
            <p className="mt-8 max-w-4xl font-serif text-xl leading-relaxed text-white/76 md:text-2xl">
              This site is meant to make a hiring decision easier. I want it to show how I think about architecture, product, implementation, iteration speed, and the discipline required to get an idea across the line.
            </p>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <RoleCard title="AI Engineering" body="I can take an idea from prompt, to code, to validation, to working surface without losing the thread." />
              <RoleCard title="AI Product" body="I scope around constraints, decide what deserves polish first, and keep the user-facing story coherent while the system is still evolving." />
              <RoleCard title="AI Integration" body="I am comfortable stitching together models, tools, interfaces, and real workflows until the stack feels usable instead of theoretical." />
              <RoleCard title="AI Strategy" body="I care about where the leverage is, what can be staged safely, and how to use AI where it moves the outcome instead of just decorating it." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'caleb-systems',
      fullWidthContent: (
        <div className="w-full bg-[#efe7dd] px-8 py-20 text-[#171312] md:px-24 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Kicker n="06" label="What I Am Building" tone="dark" />
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="space-y-6">
                <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight md:text-6xl">
                  I Started These Projects In April. I Am Still Building Them Now.
                </h2>
                <p className="font-serif text-xl leading-relaxed text-black/68">
                  I do not think of these as portfolio props. I think of them as standalone systems that solve different problems, sharpen different muscles, and force me to keep raising my own bar.
                </p>
                <p className="font-serif text-xl leading-relaxed text-black/68">
                  The point is not that every project is finished. The point is that I can design, direct, and implement across a wide enough surface area to keep all of them moving.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ProjectCard title="Agentic Dashboards" body="I am building this as a serious AI operating surface for directing work, surfacing decisions, and keeping complex systems inspectable." />
                <ProjectCard title="Cortex" body="I built Cortex to handle routing and model selection so AI work can move through the right path instead of a single fixed stack." />
                <ProjectCard title="Brokie" body="I use Brokie for graph memory, truth tracking, and the kind of durable context that makes long-running systems more than short-term chat." />
                <ProjectCard title="Global Intelligence Market" body="I am shaping this as a market-style system for compute, evidence, and pricing rather than a generic AI dashboard." />
                <ProjectCard title="Panopticon" body="I treat Panopticon as a local-first observability companion so I can inspect what a system is doing without pretending it is smarter than it is." />
                <ProjectCard title="Bonnie" body="I built Bonnie as a personal GTA V teammate concept and as a test of how far I can push a focused AI companion idea without flattening its personality." />
                <ProjectCard title="Boonk" body="I use Boonk to clone and adapt site structure with more fidelity than throwaway prompting usually gives me." />
                <ProjectCard title="BYC2W" body="I built BYC2W around the idea of helping an 8-year-old turn space and physics imagination into something real in about three hours." />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'caleb-metrics',
      fullWidthContent: (
        <div className="w-full overflow-hidden bg-[#12100e] px-8 py-20 text-white md:px-24 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Kicker n="07" label="Proof and Honesty" />
            <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight md:text-6xl">
              The Scale Is Real. The Visuals Are Directional.
            </h2>

            <div className="mt-14 grid gap-8 md:grid-cols-4">
              <MetricTile value="~411k" label="lines of source" note="Approximate source-text total across the five active workspaces on this machine." />
              <MetricTile value="5" label="core workspaces" note="This site, Winter Haven, Cortex, Brokie, and Global Intelligence Market." />
              <MetricTile value="7 days" label="first library build" note="That was enough time to turn a screenshot-level idea into a working public surface." />
              <MetricTile value="Still Live" label="status" note="I am still improving the books, the pages, and the systems behind them." />
            </div>

            <div className="mt-16 grid gap-8 border-t border-white/12 pt-12 md:grid-cols-2">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#c9a04e]/74">What the Visuals Are</p>
                <p className="font-serif text-xl leading-relaxed text-white/78">
                  Some of the visuals and playgrounds on this site are few-shot visual interpretations of what a project could look like. They help me communicate the direction of the work without pretending every surface is a one-to-one mirror of the runtime.
                </p>
              </div>
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#c9a04e]/74">What the Site Proves Anyway</p>
                <p className="font-serif text-xl leading-relaxed text-white/78">
                  I am not a designer or web developer by trade, but I can still use AI to bring ideas to life, move quickly, and keep iterating until the output is strong enough to show. I will keep adding to this.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'caleb-video',
      fullWidthContent: (
        <div className="relative overflow-hidden bg-[#0d0a08] text-white">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
            <img
              src="/images/footer-stills/about-footer.webp"
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="low"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,0.22),rgba(13,10,8,0.4))] lg:bg-[linear-gradient(90deg,rgba(13,10,8,0.97)_0%,rgba(13,10,8,0.86)_18%,rgba(13,10,8,0.42)_44%,rgba(13,10,8,0.16)_100%)]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(201,160,78,0.1),transparent_40%)]" />
          <div className="relative z-10 mx-auto max-w-6xl px-8 py-16 md:px-24 md:py-24 lg:min-h-[640px] lg:py-28">
            <div className="max-w-[560px] space-y-7">
              <Kicker n="08" label="Still Ongoing" />
              <h2 className="font-serif text-5xl leading-[0.92] tracking-tight md:text-7xl">
                I Am Still Building.
              </h2>
              <p className="max-w-2xl font-serif text-xl leading-relaxed text-white/78 md:text-[1.45rem]">
                I want this page to stay honest about that. The systems are active, the books are being refined, and I am still using AI to keep pushing the work forward.
              </p>
              <div className="grid gap-5 pt-4 md:grid-cols-2">
                <div className="border border-white/10 bg-black/22 p-6 backdrop-blur-sm">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[#c9a04e]/78">Case Studies</p>
                  <p className="font-serif text-lg leading-relaxed text-white/76">
                    I use the case studies as personal queries into how AI could be integrated into enterprise systems, applications, and architecture.
                  </p>
                </div>
                <div className="border border-white/10 bg-black/22 p-6 backdrop-blur-sm">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[#c9a04e]/78">What They Are Not</p>
                  <p className="font-serif text-lg leading-relaxed text-white/72">
                    Most of them are not literal work I completed for the company on the cover. They are serious problem-first explorations built as if the system actually had to hold up.
                  </p>
                </div>
              </div>
              <div className="max-w-[520px] border-l-2 border-[#c9a04e]/58 pl-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#c9a04e]/76">Why I Keep Them Here</p>
                <p className="mt-3 font-serif text-lg leading-relaxed text-white/72 md:text-[1.12rem]">
                  I want this page to show both sides of how I work: the systems I am actively building, and the enterprise AI questions I keep pressure-testing until they become concrete enough to build.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
};
