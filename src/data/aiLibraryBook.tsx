import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#f3ca62]/82' : 'text-[#9f6b12]'
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
  <div className={`border-l-2 pl-5 ${tone === 'light' ? 'border-[#f3ca62]' : 'border-[#c85b32]'}`}>
    <div
      className={`font-sans text-5xl font-black leading-none tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#171312]'
      }`}
    >
      {value}
    </div>
    <p
      className={`mt-2 font-mono text-[10px] uppercase tracking-widest ${
        tone === 'light' ? 'text-[#f3ca62]/84' : 'text-[#9f6b12]'
      }`}
    >
      {label}
    </p>
    <p className={`mt-3 text-sm leading-relaxed ${tone === 'light' ? 'text-white/66' : 'text-black/62'}`}>{note}</p>
  </div>
);

const FeatureCard = ({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: string;
}) => (
  <div className="border border-black/10 bg-white/78 p-6 shadow-[0_18px_48px_rgba(0,0,0,0.04)]">
    <div className={`mb-4 h-1.5 w-12 rounded-full ${accent}`} />
    <p className="mb-3 font-serif text-2xl leading-tight text-[#171312]">{title}</p>
    <p className="text-base leading-relaxed text-black/68">{body}</p>
  </div>
);

const SignalCard = ({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: string;
}) => (
  <div className={`border border-white/12 p-6 backdrop-blur-sm ${tone}`}>
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/84">{body}</p>
  </div>
);

export const aiLibraryBook: BookProject = {
  id: 'ai-library',
  title: 'The AI Library',
  subtitle: 'Real Business Is Done On Paper. Okay? Write That Down.',
  author: 'Caleb Cooper',
  showAuthorBadge: false,
  spineColor: '#ffffff',
  coverColor: '#f8f8f8',
  textColor: '#1a1a1a',
  fontTitle: 'font-serif',
  textureClass: 'texture-paper',

  coverContent: (
    <div
      className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.3)]"
      style={{ backgroundImage: "url('/images/books/stuttgart_library.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/10 p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 pointer-events-none" />

        <div className="relative flex h-full flex-col items-center justify-center">
          <h2
            className="relative z-10 mb-10 uppercase leading-[0.75] tracking-[-0.04em]"
            style={{
              fontFamily: 'Canopee, serif',
              fontSize: '84px',
              color: '#e2b857',
              textShadow: `
                -0.5px -0.5px 0px rgba(255,255,255,0.3),
                1px 1px 0px rgba(0,0,0,0.5),
                0px 15px 30px rgba(0,0,0,0.4)
              `,
            }}
          >
            THE AI
            <br />
            LIBRARY
          </h2>

          <div className="relative z-10 mb-10 h-[0.5px] w-32 bg-[#e2b857]/40" />

          <div className="relative z-10 px-6 py-4">
            <p
              className="max-w-[360px] font-serif text-[28px] font-light italic leading-[1.15] tracking-tight text-[#e2b857]"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              "Real Business Is Done On Paper. Okay? Write That Down."
            </p>
          </div>
        </div>
      </div>
    </div>
  ),

  spineContent: (
    <div className="absolute inset-0 overflow-hidden border-r border-black/5 bg-white">
      <div className="absolute inset-0 bg-[url('/images/books/ai_library_cover.png')] bg-cover bg-center opacity-10 grayscale" />

      <div className="relative flex h-full flex-col items-center justify-between py-10">
        <span className="[writing-mode:vertical-rl] rotate-180 font-sans text-[7px] font-bold uppercase tracking-[0.2em] text-black/40">
          Built in Google Antigravity
        </span>
        <span className="absolute right-4 top-10 rotate-90 font-mono text-[10px] text-black/20">No. 02</span>

        <div className="flex flex-col items-center gap-6">
          <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-[15px] font-bold tracking-[0.2em] text-black">
            THE AI LIBRARY
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-black/20" />
        </div>
      </div>
    </div>
  ),

  sections: [
    {
      id: 'ai-library-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#0a0e19] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/library-4k.mp4"
            idSeed={`managed-${Math.random().toString(36).substring(7)}`}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="h-full w-full object-cover opacity-[0.8]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,87,51,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(56,125,255,0.26),transparent_34%),radial-gradient(circle_at_bottom_center,rgba(243,202,98,0.18),transparent_38%),linear-gradient(180deg,rgba(6,7,14,0.18),rgba(6,7,14,0.88))]" />
          <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-center opacity-[0.05] mix-blend-soft-light" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#f3ca62]/84">The AI Library / Prompt-Built Interface</p>
            <h1 className="max-w-4xl font-serif text-[12.5vw] leading-[0.82] tracking-tight md:text-[7vw]">
              I Built A Library Out Of Prompts.
            </h1>
            <p className="mt-8 max-w-4xl font-serif text-2xl leading-relaxed text-white/88 md:text-[2rem]">
              The shelf is the spectacle, but the real point is simpler: I took a screenshot-level idea, pushed it through AI-assisted implementation, and turned it into a working editorial site with books, transitions, and project narratives that people can actually open.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="1" label="Starting Screenshot" note="One Spline reference was enough to start the first serious build loop." />
              <MetricTile value="7 Days" label="First Library Build" note="The first complete public version came together in one concentrated week." />
              <MetricTile value="2" label="Core Videos" note="The page uses motion as editorial atmosphere, not as a gimmick layer." />
              <MetricTile value="Still Live" label="Status" note="The site is still growing, and the books keep getting sharper." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-library-origin',
      bgColorLeft: 'bg-[#f5ede2]',
      textColorLeft: 'text-[#171312]',
      bgColorRight: 'bg-[#10172b]',
      textColorRight: 'text-white',
      leftTitle: 'Why This Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#171312] md:text-6xl">
            A Screenshot Became A Working Shelf.
          </h2>
          <p className="max-w-xl border-l-4 border-[#c85b32] pl-6 font-serif text-xl leading-relaxed text-black/76">
            I did not build this site by starting with a perfect design system. I built it by describing the feeling of an intelligent library clearly enough that AI could help me turn that feeling into working interface decisions.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            The first spark was a 3D book interaction in Spline that I could not reproduce on my own. When I came back to it, I handed a screenshot to Gemini 3.1 Pro to get the bones in place, then used GPT-5.4 in Codex to keep pushing until the shelf, the books, and the page system all behaved like a real product instead of a demo fragment.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            That loop mattered more than any single model. I described intent, inspected the output, tightened the brief, cut weak ideas, and kept iterating until the site started feeling premium. Claude was there too, smoking tokens like cigarettes and occasionally stopping halfway through a task.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            The AI Library is the result of that process. It is not just a pretty shelf. It is a public proof that I can direct AI toward a coherent software surface, keep the implementation honest, and refine the work until it reads like something intentional.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#f3ca62]/74">Input</p>
              <p className="mt-3 font-serif text-xl leading-snug text-white/88">One visual reference</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#f3ca62]/74">Method</p>
              <p className="mt-3 font-serif text-xl leading-snug text-white/88">Prompt, inspect, revise</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#f3ca62]/74">Result</p>
              <p className="mt-3 font-serif text-xl leading-snug text-white/88">A working public system</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-library-paper-quote',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#ddc486] bg-[#f4cf63] px-8 py-24 text-center text-[#171312] md:px-24 md:py-32">
          <span className="mb-[-4.5rem] font-serif text-[10rem] leading-none text-white/40 select-none md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            We can't overestimate the value of computers. Yes, they are great for playing games and forwarding funny emails, but Real Business Is Done On Paper. Okay? Write that down.
          </p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.34em] text-black/58">
            Michael Scott / The Office
          </p>
          <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-black/66">
            That quote belongs here because the site treats software like an editorial object. The books, the page rhythm, the paper references, and the writing all push the same idea: digital work can still feel authored.
          </p>
        </div>
      ),
    },
    {
      id: 'ai-library-system',
      bgColorLeft: 'bg-[#0f234f]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#f4efe7]',
      textColorRight: 'text-[#171312]',
      leftTitle: 'How It Works',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="System" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            The Shelf Is The Wrapper. The System Is The Point.
          </h2>
          <p className="max-w-xl border-l-4 border-[#f3ca62] pl-6 font-serif text-xl leading-relaxed text-white/74">
            The hard part was not getting one attractive frame. The hard part was building a repeatable structure: data-driven books, detail pages, transitions, and enough editorial discipline that the site could keep expanding without collapsing into one-off chaos.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard
              title="Bookshelf Surface"
              body="The shelf is a real navigation system. Covers, spines, and book states are data-driven so each book can become its own object instead of a repeated card."
              accent="bg-[#2f62ff]"
            />
            <FeatureCard
              title="Paper Curtain"
              body="The transitions give the site its authored rhythm. They make page changes feel physical instead of snapping between unrelated screens."
              accent="bg-[#d4512f]"
            />
            <FeatureCard
              title="Book Interiors"
              body="Each interior page can carry its own voice while still obeying a consistent editorial structure. That is how the site can grow without feeling random."
              accent="bg-[#f0b92f]"
            />
            <FeatureCard
              title="Prompted Refinement"
              body="The build loop was not one prompt. It was repeated implementation, review, correction, and narrowing until the output stopped feeling generic."
              accent="bg-[#1aa37a]"
            />
          </div>
          <div className="rounded-[28px] border border-black/10 bg-white/72 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.06)]">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9f6b12]">Implementation Reality</p>
            <p className="font-serif text-xl leading-relaxed text-black/68">
              Under the styling, this is still a serious React build. State, routing, section composition, motion timing, book data, and media handling all had to become explicit before the site could read as finished.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-library-proof',
      fullWidthContent: (
        <div className="w-full overflow-hidden bg-[#efe7dc] px-8 py-20 text-[#171312] md:px-24 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Kicker n="04" label="What You Can Find Here" tone="dark" />
            <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight md:text-6xl">
              This Site Is Also A Showcase Of AI Product Work.
            </h2>
            <p className="mt-8 max-w-4xl font-serif text-xl leading-relaxed text-black/70 md:text-2xl">
              The AI Library is not only about presentation. It is the wrapper around a broader set of examples: agentic tools, graph-backed memory, enterprise AI case studies, narrative surfaces, and rapid prototypes that turn abstract ideas into inspectable systems.
            </p>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <FeatureCard
                title="RAG and GraphRAG"
                body="Examples of retrieval-backed thinking, graph-connected context, and memory surfaces that try to stay grounded instead of sounding smart."
                accent="bg-[#2f62ff]"
              />
              <FeatureCard
                title="World Models and A2UI"
                body="Interfaces that expose state, transitions, and reasoning artifacts instead of treating AI as a single black-box response field."
                accent="bg-[#d4512f]"
              />
              <FeatureCard
                title="AI Storytelling"
                body="Book covers, interiors, and showcase pages that use narrative structure to make technical systems easier to understand and judge."
                accent="bg-[#f0b92f]"
              />
              <FeatureCard
                title="Rapid Prototyping"
                body="A working example of how quickly AI-assisted implementation can move when the direction is strong and the revision loop stays tight."
                accent="bg-[#1aa37a]"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-library-honesty',
      bgColorLeft: 'bg-[#13110f]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#f8f2ea]',
      textColorRight: 'text-[#171312]',
      leftTitle: 'What It Does Not Pretend To Be',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="05" label="Honesty" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Some Visuals Are Directional. The Build Is Real.
          </h2>
          <p className="max-w-xl border-l-4 border-[#f3ca62] pl-6 font-serif text-xl leading-relaxed text-white/74">
            I am not pretending every visual is a literal mirror of the underlying runtime. Some surfaces are few-shot attempts to communicate the shape of a project. The point is to stay clear about that while still shipping real code, real page structure, and real interaction design.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-5">
          <div className="rounded-[24px] border border-black/10 bg-white/76 p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9f6b12]">What Is Literal</p>
            <p className="font-serif text-lg leading-relaxed text-black/68">
              The shelf, the transitions, the sections, the book system, and the implementation workflow are all real. They are not mockups.
            </p>
          </div>
          <div className="rounded-[24px] border border-black/10 bg-white/76 p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9f6b12]">What Can Be Interpretive</p>
            <p className="font-serif text-lg leading-relaxed text-black/68">
              Some hero visuals and playground surfaces are directional representations meant to convey what a system could feel like before every layer is fully productized.
            </p>
          </div>
          <div className="rounded-[24px] border border-black/10 bg-white/76 p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9f6b12]">Why That Still Matters</p>
            <p className="font-serif text-lg leading-relaxed text-black/68">
              The site is a proof of applied AI judgment. It shows that I can use AI to direct interface, architecture, and implementation toward something coherent enough to evaluate.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-library-footer-video',
      fullWidthContent: (
        <div className="relative overflow-hidden bg-[#0c1120] text-white">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
            <ManagedHeroVideo
            src="/videos/library-4k.mp4"
            idSeed={`managed-${Math.random().toString(36).substring(7)}`}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="h-full w-full object-cover"
          />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,32,0.26),rgba(12,17,32,0.44))] lg:bg-[linear-gradient(90deg,rgba(12,17,32,0.97)_0%,rgba(12,17,32,0.84)_18%,rgba(12,17,32,0.4)_48%,rgba(12,17,32,0.12)_100%)]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(243,202,98,0.12),transparent_36%),radial-gradient(circle_at_left_top,rgba(47,98,255,0.14),transparent_26%)]" />
          <div className="relative z-10 mx-auto max-w-6xl px-8 py-16 md:px-24 md:py-24 lg:min-h-[640px] lg:py-28">
            <div className="max-w-[560px] space-y-7">
              <Kicker n="06" label="Still Expanding" />
              <h2 className="max-w-[10ch] font-serif text-5xl leading-[0.92] tracking-tight md:text-7xl">
                This Library Keeps Growing.
              </h2>
              <p className="max-w-2xl font-serif text-xl leading-relaxed text-white/78 md:text-[1.45rem]">
                I am still refining covers, interiors, copy, and videos across the shelf. The AI Library is the container for that work, but it is also proof that the build loop itself is now one of my strongest tools.
              </p>
              <div className="grid gap-5 pt-4 md:grid-cols-2">
                <SignalCard
                  title="What Gets Better"
                  body="Exterior design, clearer writing, stronger media, and tighter alignment between the books and the systems they represent."
                  tone="bg-white/6"
                />
                <SignalCard
                  title="What Stays Constant"
                  body="The bar: serious systems, clear storytelling, and AI-assisted implementation that can survive inspection instead of just looking interesting."
                  tone="bg-black/18"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
};
