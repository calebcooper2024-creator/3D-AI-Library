import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { SectionContent } from './portfolio';
import { STANDARD_SOURCE_NOTE_LABEL, STANDARD_SOURCE_NOTE_TEXT } from './caseStudyMeta';

/* ── Micro-components ─────────────────────────────────────────── */

const Kicker = ({ n, label }: { n: string; label: string }) => (
  <p className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-red-500/80">
    {n} — {label}
  </p>
);

const StatBlock = ({ value, label, note }: { value: string; label: string; note?: string }) => (
  <div className="border-l-2 border-red-500 pl-5">
    <div className="font-sans font-black text-5xl leading-none tracking-tight text-red-100">{value}</div>
    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-red-400">{label}</p>
    {note && <p className="mt-3 text-sm leading-relaxed text-white/55">{note}</p>}
  </div>
);

const StatBlockDark = ({ value, label, note }: { value: string; label: string; note?: string }) => (
  <div className="border-l-2 border-red-400 pl-5">
    <div className="font-sans font-black text-5xl leading-none tracking-tight text-red-800">{value}</div>
    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-red-500">{label}</p>
    {note && <p className="mt-3 text-sm leading-relaxed text-black/60">{note}</p>}
  </div>
);

const StackRow = ({ layer, choice, why }: { layer: string; choice: string; why: string }) => (
  <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-red-900/10 pb-4">
    <span className="font-mono text-[9px] uppercase tracking-widest text-red-500 pt-0.5 leading-tight">{layer}</span>
    <div>
      <h4 className="font-semibold text-sm text-red-950 leading-snug">{choice}</h4>
      <p className="mt-1 text-xs leading-relaxed text-black/55">{why}</p>
    </div>
  </div>
);

const GateRow = ({ condition, passes }: { condition: string; passes: boolean }) => (
  <div className={`flex items-start gap-3 border px-4 py-3 ${passes ? 'border-red-200 bg-red-50/60' : 'border-red-700/40 bg-red-700/5'}`}>
    <span className={`mt-0.5 font-mono text-xs font-black flex-shrink-0 ${passes ? 'text-red-400' : 'text-red-700'}`}>{passes ? '✓' : '✕'}</span>
    <span className="text-sm leading-relaxed text-black/75">{condition}</span>
  </div>
);

const Phase = ({ num, label, duration, goal }: { num: string; label: string; duration: string; goal: string }) => (
  <div className="border border-red-900/10 bg-white/80 p-5">
    <div className="mb-3 flex items-start justify-between">
      <span className="font-mono text-[9px] uppercase tracking-widest text-red-500">Phase {num}</span>
      <span className="font-mono text-[9px] text-black/35">{duration}</span>
    </div>
    <h4 className="mb-2 font-sans font-black text-base leading-snug text-red-950">{label}</h4>
    <p className="text-sm leading-relaxed text-black/60">{goal}</p>
  </div>
);

const ThreshRow = ({ scenario, threshold, rationale }: { scenario: string; threshold: string; rationale: string }) => (
  <div className="grid grid-cols-[1fr_80px] gap-4 border-b border-white/10 pb-4">
    <div>
      <p className="text-sm font-medium text-white/90">{scenario}</p>
      <p className="mt-1 text-xs leading-relaxed text-white/45">{rationale}</p>
    </div>
    <span className="font-mono text-xs text-red-300 pt-0.5 text-right">{threshold}</span>
  </div>
);

const ReviewField = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex gap-3 border-b border-white/8 pb-2">
    <span className="font-mono text-[9px] uppercase tracking-widest text-red-400/80 w-28 flex-shrink-0 pt-0.5">{label}</span>
    <span className="text-sm text-white/60">{value ?? <span className="text-white/25 italic">collected per call</span>}</span>
  </div>
);

const FooterCard = ({ title, body }: { title: string; body: string }) => (
  <div className="border border-white/12 bg-black/20 p-6 backdrop-blur-sm">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-red-200/80">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/80">{body}</p>
  </div>
);

const AcceptanceMetric = ({
  eyebrow,
  value,
  title,
  body,
}: {
  eyebrow: string;
  value: React.ReactNode;
  title: string;
  body: string;
}) => (
  <div className="flex h-full flex-col border border-white/15 bg-black/12 p-5 md:p-6">
    <p className="font-mono text-[10px] uppercase tracking-widest text-red-200/80">{eyebrow}</p>
    <div className="mt-4 min-h-[5.5rem] font-sans font-black text-[clamp(3rem,5vw,4.75rem)] leading-[0.88] tracking-[-0.05em] text-white">
      {value}
    </div>
    <p className="mt-5 border-t border-white/20 pt-4 font-mono text-xs uppercase tracking-widest text-white">
      {title}
    </p>
    <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
  </div>
);

/* ── Section array ─────────────────────────────────────────────── */

const helloPatientSections: SectionContent[] = [

  /* ── 1. HERO ──────────────────────────────────────── */
  {
    id: 'hp-hero',
    fullWidthContent: (
      <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-red-600 p-8 text-white md:p-24">
        {/* Video Background */}
        <ManagedHeroVideo
            src="/videos/hero-bg.mp4"
            idSeed="hello-patient-hero-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />

        {/* Dark Overlay for legibility - fine-tuned */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/85 via-red-950/30 to-transparent z-0" />

        {/* Background grid */}
        <div className="absolute inset-0 grid grid-cols-12 opacity-[0.05] z-0">
          {Array.from({ length: 144 }).map((_, i) => <div key={i} className="border border-white/60" />)}
        </div>

        {/* Overline */}
        <p className="relative z-10 mb-8 font-mono text-xs uppercase tracking-[0.32em] text-red-100/80">
          01 — Real-time voice agent architecture
        </p>

        {/* Headline */}
        <h1 className="relative z-10 max-w-5xl font-serif text-[14vw] leading-[0.82] tracking-tight md:text-[9vw]">
          Front Office In Crisis.
        </h1>

        {/* Subhead */}
        <p className="relative z-10 mt-10 max-w-4xl font-serif text-xl leading-snug text-white/85 md:text-2xl">
          A LiveKit voice agent for an orthopedic practice drowning in 900 calls a day. The product call: build a constrained scheduling agent — not a broad receptionist — and prove it through a deterministic policy gate, a medical-grade voice stack, and a staff-facing review queue.
        </p>

        {/* Meta grid */}
        <div className="relative z-10 mt-20 grid grid-cols-2 gap-6 border-t border-white/20 pt-8 font-mono text-sm md:grid-cols-4">
          <div><p className="text-red-100/55">Runtime</p><p className="mt-2">LiveKit Agents</p></div>
          <div><p className="text-red-100/55">Voice Stack</p><p className="mt-2">Deepgram · Cartesia · GPT-4o</p></div>
          <div><p className="text-red-100/55">EHR</p><p className="mt-2">eClinicalWorks</p></div>
          <div><p className="text-red-100/55">Scope</p><p className="mt-2">Scheduling & Routing MVP</p></div>
        </div>
      </div>
    ),
  },

  /* ── 2. THE CRISIS ────────────────────────────────── */
  {
    id: 'hp-crisis',
    bgColorLeft: 'bg-red-950',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-red-50',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="02" label="Operational State" />
        <h2 className="max-w-[10ch] font-serif text-5xl leading-tight md:text-6xl">
          900 Calls. 200 Callers. Patients Redialing.
        </h2>
        <p className="mt-8 font-serif text-lg leading-relaxed text-white/70 border-l-2 border-red-500 pl-5">
          Summit Orthopedics fired its outsourced call center after sustained patient complaints, poor insurance knowledge, and incorrect scheduling. What remained was a 900-call-per-day volume hitting a front office that had no infrastructure to absorb it.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6">
          <StatBlock value="~900" label="Inbound calls / day" note="Observed on a single call day at peak volume." />
          <StatBlock value="~200" label="Unique callers" note="The delta is a repeat-dialing loop — patients calling back because they could not get through." />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <StatBlock value="50%" label="Scheduling intent" note="Roughly half of all calls were scheduling-related — the highest-volume, most automatable category." />
          <StatBlock value="~33%" label="Billing calls" note="Billing calls routed toward an external revenue cycle management vendor — outside the agent's scope." />
        </div>
      </div>
    ),
    rightContent: (
      <div className="space-y-10 py-8">
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-red-600">Operating Environment</p>
          <h3 className="font-serif text-3xl leading-tight text-red-950 mb-6">A practice growing faster than its front-office processes.</h3>
          <p className="text-base leading-relaxed text-black/70">
            Jeff, a new Operations Director, had just joined to stabilize the practice. Referral coordinators and surgery schedulers were being reorganized into doctor-aligned Care Coordinators. Billing was moving to an external RCM vendor. Jessica, the Office Manager, owned day-to-day operations and was overloaded. Catie held critical insurance nuance that no system had ever captured.
          </p>
        </div>

        <div className="border border-red-200 bg-white p-6 space-y-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-2">eClinicalWorks Integration Inventory</p>
          {[
            { label: '✓ Available', item: 'Patient lookup by name and date of birth' },
            { label: '✓ Available', item: 'Provider schedule and availability reads' },
            { label: '✓ Available', item: 'Appointment creation' },
            { label: '✓ Available', item: 'Basic patient demographics' },
            { label: '✕ Not available', item: 'Insurance eligibility checking' },
            { label: '✕ Not available', item: 'Complex insurance mapping' },
            { label: '✕ Not available', item: 'Referral management' },
          ].map(({ label, item }) => (
            <div key={item} className="flex items-start gap-3 border-b border-red-100 pb-3">
              <span className={`font-mono text-[9px] font-black flex-shrink-0 mt-0.5 ${label.startsWith('✓') ? 'text-red-400' : 'text-red-700'}`}>{label}</span>
              <span className="text-sm text-black/70">{item}</span>
            </div>
          ))}
          <p className="mt-2 font-serif text-sm italic text-black/50">The integration determines the MVP boundary. The agent can schedule. It cannot verify payer status or validate referrals.</p>
        </div>

        <div className="border-l-4 border-red-400 bg-red-50 pl-6 py-4 pr-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-2">Risk Signal</p>
          <p className="font-serif text-lg italic leading-snug text-red-900">
            Insurance companies were warning that the practice could lose contracts if phones were not answered. The repeat-dialer pattern suggested patients were not getting through at all, not just waiting on hold.
          </p>
        </div>
      </div>
    ),
  },

  /* ── 3. DECISION POINT ────────────────────────────── */
  {
    id: 'hp-decision',
    fullWidthContent: (
      <div className="relative w-full overflow-hidden bg-red-50 p-8 md:p-32 flex flex-col items-center border-y border-red-200/80">
        <span className="font-serif text-[14rem] leading-none text-red-200/70 mb-[-9rem] select-none">"</span>
        <h2 className="relative z-10 max-w-5xl font-serif text-4xl leading-tight text-red-950 text-center italic md:text-5xl">
          The decision is not whether voice AI can answer phones. The decision is whether Summit should trust a voice agent to perform part of its access workflow while the organization is still restructuring.
        </h2>
        <div className="mt-16 max-w-3xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-4">The PM's Ruling</p>
          <p className="font-serif text-xl leading-relaxed text-black/70">
            Launch a constrained scheduling and routing agent with hard exclusions, staff review, and staged rollout. Earn scope through performance, not ambition.
          </p>
        </div>
      </div>
    ),
  },

  /* ── 4. STRATEGIC SCOPE ──────────────────────────── */
  {
    id: 'hp-scope',
    bgColorLeft: 'bg-white',
    textColorLeft: 'text-red-950',
    bgColorRight: 'bg-red-50',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="03" label="Product Strategy" />
        <h2 className="max-w-[10ch] font-serif text-5xl leading-tight md:text-6xl">
          A Bounded Scheduling Agent.
        </h2>
        <p className="mt-8 font-serif text-lg leading-relaxed text-red-900/75 border-l-2 border-red-400 pl-5">
          A broad AI receptionist would be impressive in a demo and dangerous in production. A narrow scheduling agent can be tested, launched, reviewed, and improved. The practice needs relief fast — but the highest-risk workflows are exactly the ones that require stable rules, verified data, and human judgment.
        </p>
        <div className="mt-10 space-y-4">
          <div className="border border-red-200 bg-red-50/50 p-5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-red-500 mb-2">Why Jeff explicitly excluded work comp</p>
            <p className="text-sm leading-relaxed text-black/65">Workers compensation scheduling requires authorization data, claim numbers, and insurance coordination that no current integration supports. One wrong booking creates downstream legal exposure.</p>
          </div>
          <div className="border border-red-200 bg-red-50/50 p-5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-red-500 mb-2">Why the MVP avoids insurance verification</p>
            <p className="text-sm leading-relaxed text-black/65">Catie's insurance knowledge is institutional and unstructured. Building a reliable eligibility layer requires that knowledge to be documented, tested, and stable — none of which is true yet.</p>
          </div>
        </div>
      </div>
    ),
    rightContent: (
      <div className="space-y-8 py-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-4">Included in MVP</p>
          <div className="space-y-2">
            {[
              'Inbound call answer and intent classification',
              'New and existing patient scheduling',
              'Name and DOB lookup against eClinicalWorks',
              'Provider availability lookup',
              'Appointment creation (policy-gated)',
              'Referred-provider and body-part routing',
              'Billing transfer to RCM queue',
              'Workers compensation hard transfer',
              'Medical request capture and escalation',
              'Staff review dashboard',
              'Call summaries, transcripts, and structured trace logs',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 border-b border-red-100 pb-2">
                <span className="font-mono text-[9px] text-red-400 font-black mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm text-black/70">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-700 mb-4">Excluded from MVP</p>
          <div className="space-y-2">
            {[
              'Medical advice of any kind',
              'Complex insurance interpretation',
              'Insurance eligibility verification',
              'Referral validation',
              'Workers compensation scheduling',
              'Surgery scheduling',
              'Post-operative triage',
              'Prior authorization handling',
              'Payment collection',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 border-b border-red-200/60 pb-2">
                <span className="font-mono text-[9px] text-red-700 font-black mt-0.5 flex-shrink-0">✕</span>
                <span className="text-sm text-black/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* ── 5. LIVEKIT ARCHITECTURE ─────────────────────── */
  {
    id: 'hp-livekit',
    fullWidthContent: (
      <div className="relative w-full overflow-hidden bg-red-950 text-white p-8 md:p-24">
        <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-center opacity-5 mix-blend-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Kicker n="04" label="Architecture" />
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-5xl leading-tight md:text-6xl mb-8">LiveKit is the runtime. Twilio is the carrier.</h2>
              <p className="font-serif text-lg leading-relaxed text-white/70 mb-8">
                This build is designed as a LiveKit showcase, not a Twilio bot. Telephony becomes an ingress channel into LiveKit, not the center of the system. Each inbound call creates a LiveKit Room — a bounded context for the entire patient interaction.
              </p>
              <p className="font-serif text-lg leading-relaxed text-white/70">
                The room model matters because Summit's callers will interrupt, pause, search for insurance cards, ask side questions, and sometimes become frustrated. A request-response chatbot architecture will feel brittle. A LiveKit room-based architecture is built for conversations where audio, timing, state, and tool use all matter simultaneously.
              </p>
            </div>
            <div className="space-y-5">
              <div className="border border-white/12 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-400 mb-4">LiveKit Room per Call</p>
                <div className="space-y-4">
                  {[
                    { participant: 'patient_sip_participant', role: 'Caller from PSTN via Twilio SIP trunk → LiveKit SIP ingress' },
                    { participant: 'summit_ai_agent', role: 'The LiveKit Agent: greeting, classification, scheduling, escalation' },
                    { participant: 'human_staff_participant', role: 'Optional — joins for warm transfer or supervisor override' },
                  ].map(({ participant, role }) => (
                    <div key={participant} className="border-b border-white/8 pb-4">
                      <p className="font-mono text-xs text-red-300 mb-1">{participant}</p>
                      <p className="text-sm leading-relaxed text-white/55">{role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/12 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-400 mb-4">Room Metadata (per session)</p>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs text-white/50">
                  {['Call ID', 'Phone number', 'Start time', 'Intended queue', 'Agent version', 'Location', 'Patient identity status', 'Appointment workflow state', 'Exclusion flags', 'Tool-call eligibility', 'Escalation status', 'Transcript confidence'].map(m => (
                    <div key={m} className="border-b border-white/8 pb-2">{m}</div>
                  ))}
                </div>
              </div>

              <div className="border border-white/12 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-400 mb-3">SIP Ingress Flow</p>
                <ol className="space-y-2">
                  {[
                    'Patient dials Summit phone number',
                    'Twilio or Telnyx receives the PSTN call',
                    'SIP trunk routes the call to LiveKit SIP',
                    'LiveKit creates a SIP participant in a room',
                    'The LiveKit Agent joins the room',
                    'Agent greets the patient and begins the workflow',
                    'Human transfer via SIP bridge if needed',
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-white/55">
                      <span className="font-mono text-[9px] text-red-400 font-black flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ── 6. THE STACK ────────────────────────────────── */
  {
    id: 'hp-stack',
    bgColorLeft: 'bg-white',
    textColorLeft: 'text-red-950',
    bgColorRight: 'bg-red-50',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="05" label="Technical Design" />
        <h2 className="font-serif text-5xl leading-tight md:text-6xl mb-8">Every layer earns its place.</h2>
        <p className="font-serif text-lg leading-relaxed text-red-900/70 mb-10">
          The stack is assembled around one principle: the product challenge is not generating answers. The product challenge is managing real-time human conversation over audio in a medical office context.
        </p>
        <div className="space-y-5">
          <StackRow layer="Runtime" choice="LiveKit Agents (Python)" why="Handles real-time audio sessions, programmable agent participation, model plugins, tool use, turn handling, and production observability. The showcase layer." />
          <StackRow layer="Telephony" choice="LiveKit SIP + Twilio SIP trunk" why="PSTN calls enter LiveKit through a SIP trunk. Twilio is the phone carrier, not the voice-agent runtime." />
          <StackRow layer="STT" choice="Deepgram Nova-3 Medical" why="Medical vocabulary, streaming transcription, strong fit for orthopedic terms, provider names, and phone audio quality. Evaluated independently from LLM behavior." />
          <StackRow layer="VAD / Turn" choice="Silero VAD + LiveKit turn detector" why="Silero contributes speech activity detection. LiveKit's turn detector adds conversational context for end-of-turn. Together they handle both barge-in and slow elderly callers." />
          <StackRow layer="LLM (live)" choice="OpenAI GPT-4o" why="Chosen for live calls because it is fast enough for turn-based phone interaction and strong enough for constrained tool use and intent classification. The deterministic policy gate carries the safety-critical logic, so paying frontier-model latency and cost on every turn is unnecessary." />
          <StackRow layer="LLM (offline)" choice="OpenAI GPT-5 mini" why="Used after the call for transcript review, policy-violation checks, and QA categorization. It buys stronger review reasoning than the live path while staying cheap enough for batch scoring, replay analysis, and PM review." />
          <StackRow layer="TTS" choice="Cartesia Sonic 3 streaming" why="Low latency streaming TTS that can be interrupted immediately. Calm, slightly slower than default, optimized for elderly phone callers." />
          <StackRow layer="Workflow" choice="Deterministic state machine" why="Medical, scheduling, transfer, and exclusion rules live outside free-form model behavior. The LLM proposes; the state machine decides." />
          <StackRow layer="EHR Tools" choice="eClinicalWorks tool layer" why="lookup_patient, get_provider_availability, create_appointment — each gated by the policy layer before execution." />
          <StackRow layer="Dashboard" choice="React + TanStack Table + LiveKit traces" why="Staff review queue connected to real call outcomes. Makes the AI operationally inspectable from day one." />
        </div>
      </div>
    ),
    rightContent: (
      <div className="space-y-8 py-8">
        <div className="border border-red-200 bg-white p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-4">STT Evaluation Set</p>
          <p className="text-sm leading-relaxed text-black/65 mb-4">
            Before any live calls, Deepgram Nova-3 Medical is evaluated against a custom orthopedic test set. The practice's provider names and body-part vocabulary are non-negotiable accuracy requirements.
          </p>
          <div className="space-y-3">
            {[
              { category: 'Provider names', examples: 'Patel, Morrison, Cohen, Webb, Chen, Park, Adams, Williams, Nguyen, Rodriguez, Kim', threshold: '> 95% after confirmation loop' },
              { category: 'Body parts', examples: 'shoulder, elbow, hand, wrist, hip, knee, spine, back, neck, foot, ankle', threshold: '> 95% on common set' },
              { category: 'DOB capture', examples: 'Numeric date readback confirmation', threshold: '> 98% after readback' },
              { category: 'Clinical terms', examples: 'meniscus, rotator cuff, carpal tunnel, sciatica, tendon, ligament', threshold: 'Evaluated separately' },
            ].map(({ category, examples, threshold }) => (
              <div key={category} className="border-b border-red-100 pb-3">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-500 mb-1">{category}</p>
                <p className="text-xs text-black/55 mb-1">{examples}</p>
                <p className="font-mono text-[9px] text-red-700 font-semibold">{threshold}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-red-200 bg-white p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-4">Voice Style Parameters</p>
          <div className="space-y-3">
            {[
              { param: 'Speaking speed', value: '0.88–0.95 of default' },
              { param: 'Pause after confirmations', value: '300–500ms' },
              { param: 'Turn length', value: 'One question at a time' },
              { param: 'Tone register', value: 'Calm, clear, not clinical' },
              { param: 'Emotional affect', value: 'No exaggerated warmth, no sales tone' },
            ].map(({ param, value }) => (
              <div key={param} className="grid grid-cols-2 gap-3 border-b border-red-100 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-red-400">{param}</span>
                <span className="text-xs text-black/65">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-l-2 border-red-300 pl-4 pt-1">
            <p className="font-serif text-sm italic text-black/60">Fallback: ElevenLabs Turbo if user testing shows stronger elderly-patient comprehension. OpenAI TTS if BAA constraints require vendor consolidation.</p>
          </div>
        </div>

        <div className="border border-red-200 bg-white p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-3">Body-Part Routing Table</p>
          <p className="text-xs text-black/50 mb-4">The LLM normalizes caller language. The routing table decides the provider group. No freeform routing.</p>
          <div className="space-y-2">
            {[
              { part: 'Shoulder, elbow', providers: 'Dr. Patel, Dr. Morrison' },
              { part: 'Hand, wrist', providers: 'Dr. Cohen, Dr. Webb' },
              { part: 'Hip, knee', providers: 'Dr. Chen, Dr. Park, Dr. Adams' },
              { part: 'Spine, back, neck', providers: 'Dr. Williams, Dr. Nguyen' },
              { part: 'Foot, ankle', providers: 'Dr. Rodriguez' },
              { part: 'Sports medicine', providers: 'Dr. Kim or body-part rule' },
            ].map(({ part, providers }) => (
              <div key={part} className="grid grid-cols-2 gap-2 border-b border-red-100 pb-2 text-xs">
                <span className="text-red-800 font-medium">{part}</span>
                <span className="text-black/55">{providers}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* ── 7. POLICY GATE ──────────────────────────────── */
  {
    id: 'hp-policy',
    bgColorLeft: 'bg-red-950',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="06" label="Safety Layer" />
        <h2 className="font-serif text-5xl leading-tight md:text-6xl mb-8">
          The LLM proposes. The policy gate decides.
        </h2>
        <p className="font-serif text-lg leading-relaxed text-white/70 mb-10">
          Appointment creation is an irreversible action in eClinicalWorks. It writes to the provider's schedule, creates a patient record stub, and triggers downstream billing preparation. The policy gate sits between the LLM's intent and the eCW API call.
        </p>
        <div className="border border-white/12 bg-white/5 p-6 space-y-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-red-400 mb-2">Core Tool Signatures</p>
          {[
            { fn: 'lookup_patient(name, dob)', desc: 'Match caller identity against eCW patient records.' },
            { fn: 'get_provider_availability(...)', desc: 'Read open slots for a provider, appointment type, and date range.' },
            { fn: 'create_appointment(...)', desc: 'Write appointment to eCW. Policy-gated. Requires gate pass.' },
            { fn: 'transfer_call(destination, reason)', desc: 'Route to billing, WC coordinator, or staff queue.' },
            { fn: 'create_staff_task(...)', desc: 'Create a coordinator task for medical requests, WC, or unclear cases.' },
            { fn: 'flag_for_review(call_id, reason, payload)', desc: 'Emit a structured event to the staff review queue.' },
            { fn: 'log_patient_statement(...)', desc: 'Capture patient words for clinical team review without acting on them.' },
          ].map(({ fn, desc }) => (
            <div key={fn} className="border-b border-white/8 pb-4">
              <p className="font-mono text-xs text-red-300 mb-1">{fn}</p>
              <p className="text-sm text-white/50">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    rightContent: (
      <div className="space-y-6 py-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-4">Appointment Creation Gate</p>
          <p className="text-sm leading-relaxed text-black/65 mb-5">
            Every condition below must pass before <code className="font-mono text-xs bg-red-50 px-1 py-0.5 text-red-700">create_appointment</code> is allowed to execute. A single failure routes to clarification or human handoff.
          </p>
          <div className="space-y-2">
            <GateRow condition="Patient identity captured or new-patient flow selected" passes={true} />
            <GateRow condition="Date of birth confirmed via agent readback" passes={true} />
            <GateRow condition="Provider selected from approved provider table" passes={true} />
            <GateRow condition="Time slot selected from live availability data" passes={true} />
            <GateRow condition="Caller verbally confirmed the appointment details" passes={true} />
            <GateRow condition="Workers compensation detected in any utterance" passes={false} />
            <GateRow condition="Urgent medical concern flag triggered" passes={false} />
            <GateRow condition="Surgery scheduling requested" passes={false} />
            <GateRow condition="Insurance verification required before booking" passes={false} />
          </div>
        </div>

        <div className="border border-red-200 bg-red-50 p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-3">Human Approval Mode (Phase 2)</p>
          <p className="text-sm leading-relaxed text-black/65">During the pilot phase, <code className="font-mono text-[10px] bg-white px-1 py-0.5 text-red-700">create_appointment</code> does not write to eCW directly. Instead, it prepares the booking record and sends it to the staff review queue for one-click confirmation. This builds trust before direct booking is enabled.</p>
        </div>

        <div className="border border-red-200 bg-white p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-3">Workers Compensation Path</p>
          <p className="text-sm leading-relaxed text-black/65 mb-3">Workers compensation is a hard transfer — not a routing decision that the LLM can override. The agent says:</p>
          <blockquote className="border-l-2 border-red-400 pl-4 font-serif text-sm italic text-black/70">
            "Because this is related to a work injury, I need to route you to the workers compensation coordinator so the authorization and claim details are handled correctly. I will transfer you now."
          </blockquote>
        </div>

        <div className="border border-red-200 bg-white p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-3">Medical Request Path</p>
          <p className="text-sm leading-relaxed text-black/65 mb-3">The agent never answers medical questions. It captures and escalates:</p>
          <blockquote className="border-l-2 border-red-400 pl-4 font-serif text-sm italic text-black/70">
            "I cannot provide medical advice, but I can take down your message and route it to the clinical team."
          </blockquote>
          <p className="mt-3 text-xs text-black/50">Creates a structured task: patient name, DOB, provider, callback number, patient's own words, urgency flags, and transcript link.</p>
        </div>
      </div>
    ),
  },

  /* ── 8. VAD & TURN DETECTION ─────────────────────── */
  {
    id: 'hp-vad',
    fullWidthContent: (
      <div className="relative w-full overflow-hidden bg-red-900 text-white p-8 md:p-24">
        <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-center opacity-[0.04] mix-blend-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Kicker n="07" label="Voice Engineering" />
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-5xl leading-tight md:text-6xl mb-8">Barge-in and end-of-turn are two different problems.</h2>
              <p className="font-serif text-lg leading-relaxed text-white/70 mb-6">
                Fast barge-in protects the caller from being talked over — the agent must stop speaking the instant a patient starts. Slower end-of-turn detection protects elderly or uncertain callers from being interrupted mid-thought.
              </p>
              <p className="font-serif text-lg leading-relaxed text-white/70 mb-8">
                The LiveKit turn detection stack layers Silero VAD for speech activity, LiveKit's context-aware turn detector for end-of-turn, and custom endpointing settings calibrated by conversation mode.
              </p>
              <div className="border border-white/12 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-300 mb-4">Patience Prompts for Slow Callers</p>
                <div className="space-y-3">
                  {[
                    '"No problem, take your time."',
                    '"I heard part of that, but I want to make sure I get it right. Could you repeat your date of birth?"',
                    '"I may have misheard the provider name. Did you say Dr. Chen or Dr. Cohen?"',
                  ].map(phrase => (
                    <p key={phrase} className="font-serif text-sm italic text-white/60 border-l-2 border-red-500/50 pl-4">{phrase}</p>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-300 mb-6">End-of-Turn Threshold Design</p>
              <div className="space-y-5">
                <ThreshRow scenario="Normal scheduling conversation" threshold="700–900ms" rationale="Natural phone pacing. Keep the call moving without rushing." />
                <ThreshRow scenario="Elderly or slow caller" threshold="1000–1400ms" rationale="Avoid interrupting mid-thought. LiveKit context detector identifies slow speaker patterns." />
                <ThreshRow scenario="Yes / no confirmation" threshold="500–700ms" rationale="Keep the call moving. The caller expects a fast response to a binary answer." />
                <ThreshRow scenario="Caller searching for insurance card or referral" threshold="1500–2500ms" rationale="Patient may be looking at paperwork. Agent waits and prompts patience rather than misinterpreting silence." />
                <ThreshRow scenario="Noisy audio detected" threshold="Conservative + clarification" rationale="Avoid capturing a wrong DOB or provider name from degraded signal. Request confirmation." />
              </div>

              <div className="mt-10 border border-white/12 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-300 mb-4">No-Action-on-Uncertainty Rule</p>
                <p className="text-sm leading-relaxed text-white/60">
                  If STT confidence falls below threshold on a provider name, DOB, or date, the agent must request confirmation before proceeding. No irreversible action is taken on low-confidence capture. The penalty for a wrong DOB is creating an appointment for the wrong patient — a medical safety issue, not a UX annoyance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ── 9. STAFF DASHBOARD ──────────────────────────── */
  {
    id: 'hp-dashboard',
    fullWidthContent: (
      <div className="relative w-full overflow-hidden bg-[#0f0505] text-white p-8 md:p-24">
        <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-center opacity-[0.03] mix-blend-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Kicker n="08" label="Operational Control" />
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 mb-16">
            <div>
              <h2 className="font-serif text-5xl leading-tight md:text-6xl mb-8">The dashboard is the trust layer.</h2>
              <p className="font-serif text-lg leading-relaxed text-white/70">
                Without the staff review queue, the system becomes an invisible automation layer and staff will not trust it. Every AI-created appointment lands in the queue before it is confirmed. Every transfer, escalation, and correction is logged. The dashboard turns the agent from a black box into an auditable colleague.
              </p>
              <div className="mt-8 border border-white/12 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-400 mb-4">Review States</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { state: 'Needs Review', color: 'text-yellow-400' },
                    { state: 'Approved', color: 'text-green-400' },
                    { state: 'Corrected', color: 'text-orange-400' },
                    { state: 'Canceled', color: 'text-red-400' },
                    { state: 'Escalated', color: 'text-purple-400' },
                    { state: 'Duplicate', color: 'text-gray-400' },
                  ].map(({ state, color }) => (
                    <div key={state} className="flex items-center gap-2 border border-white/8 px-3 py-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color.replace('text-', 'bg-')}`} />
                      <span className={`font-mono text-xs ${color}`}>{state}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-l-2 border-red-500 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-red-400 mb-2">Most important early metric</p>
                <p className="font-serif text-lg italic text-white/80">
                  Not automation rate. Corrected appointment rate. If staff are correcting too many appointments, the agent is creating hidden work — the opposite of its purpose.
                </p>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-400 mb-6">Review Queue Fields (per call)</p>
              <div className="space-y-1">
                {[
                  'Call ID', 'Call time', 'Caller name', 'Patient match status',
                  'New or existing patient', 'Appointment status', 'Provider',
                  'Location', 'Date and time', 'Visit reason',
                  'Routing basis — referred provider, body part, staff rule, or unclear',
                  'Insurance as stated by caller', 'Work comp flag',
                  'Transfer status', 'Agent confidence score',
                  'Review status', 'Reviewer', 'Correction reason',
                  'Transcript or redacted summary',
                ].map((field, fi) => (
                    <React.Fragment key={fi}><ReviewField label={field} /></React.Fragment>
                  ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12">
            <p className="font-mono text-[9px] uppercase tracking-widest text-red-400 mb-6">LiveKit Showcase Features</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { n: '01', title: 'Room Inspector', desc: 'Patient and AI agent participants visible in real time. Audio track status, connection quality, SIP metadata.' },
                { n: '02', title: 'Live Transcript Stream', desc: 'Interim and final utterances. Speaker-labeled. Confidence scores visible per segment.' },
                { n: '03', title: 'Turn Detection Timeline', desc: 'Speech start, end-of-utterance, agent thinking interval, TTS start, and barge-in events on a single timeline.' },
                { n: '04', title: 'Tool-Call Panel', desc: 'eCW lookup, availability read, appointment create, review flag — each with latency and outcome visible.' },
                { n: '05', title: 'Latency Metrics', desc: 'STT partial latency, end-of-turn delay, LLM time-to-first-token, TTS time-to-first-audio, eCW tool latency.' },
                { n: '06', title: 'Replay Mode', desc: 'Full call trace replay. Compare agent decisions against expected outcomes at the utterance level.' },
                { n: '07', title: 'Failure Injection', desc: 'Noisy caller, slow elderly caller, ambiguous provider name, unavailable slot, eCW timeout — testable without live calls.' },
                { n: '08', title: 'Staff Review Queue', desc: 'Real call outcomes connected to the dashboard. One-click approve, correct, or escalate.' },
                { n: '09', title: 'Transfer Simulation', desc: 'Billing, workers compensation, and medical request transfer paths fully demoed in sandbox mode.' },
              ].map(({ n, title, desc }) => (
                <div key={n} className="border border-white/10 bg-white/4 p-5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-red-400 block mb-3">{n}</span>
                  <h4 className="font-sans font-bold text-base mb-2">{title}</h4>
                  <p className="text-sm leading-relaxed text-white/45">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ── 10. PHASED LAUNCH ───────────────────────────── */
  {
    id: 'hp-launch',
    bgColorLeft: 'bg-white',
    textColorLeft: 'text-red-950',
    bgColorRight: 'bg-red-50',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="09" label="Staged Rollout" />
        <h2 className="font-serif text-5xl leading-tight md:text-6xl mb-8">
          Earn scope through performance.
        </h2>
        <p className="font-serif text-lg leading-relaxed text-red-900/70 mb-10">
          The agent does not go from zero to direct booking on day one. Each phase has a clear gate. The system must prove reliability at the current scope before expanding. Rollback triggers are defined in advance, not discovered in production.
        </p>
        <div className="border border-red-200 bg-red-50/50 p-6 space-y-4">
          <p className="font-mono text-[9px] uppercase tracking-widest text-red-600 mb-2">Rollback Triggers (Phase 3+)</p>
          {[
            'Wrong-provider correction rate exceeds threshold',
            'Workers compensation booked by mistake (zero tolerance)',
            'Medical advice policy violation detected',
            'Duplicate or phantom appointments created',
            'Transfer failure rate spikes',
            'Patient complaints exceed threshold',
          ].map(trigger => (
            <div key={trigger} className="flex items-start gap-3 border-b border-red-100 pb-3">
              <span className="font-mono text-[9px] text-red-600 font-black flex-shrink-0 mt-0.5">▲</span>
              <span className="text-sm text-black/65">{trigger}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-8">
        <Phase
          num="0"
          label="Discovery & Rule Capture"
          duration="1–2 weeks"
          goal="Document provider routing table, appointment types, location rules, transfer numbers, work comp policy, billing transfer policy, and medical escalation triggers. Build the 150–300 call test set."
        />
        <Phase
          num="1"
          label="Internal Shadow Mode"
          duration="1–2 weeks"
          goal="Agent listens to test calls or historical replays and produces proposed actions — but does not book. Validate STT accuracy, intent classification, routing logic, and call summaries against ground truth."
        />
        <Phase
          num="2"
          label="Human Approval Mode"
          duration="2–4 weeks"
          goal="Agent answers a limited call group, prepares bookings, sends them to staff for one-click confirmation. Measures staff trust, catches bad routing before eCW writes, and tunes the caller experience."
        />
        <Phase
          num="3"
          label="Limited Direct Booking"
          duration="Ongoing, gated"
          goal="Allow direct booking only for approved paths: non-work-comp, clean provider match or body-part routing, confirmed appointment, no urgent flags. Every booking still goes to same-day review."
        />
        <Phase
          num="4"
          label="Production V1"
          duration="Post Phase 3 approval"
          goal="Expand call coverage with rollback triggers armed. Maintain weekly QA scoring, monthly routing rule review, and emergency rollback capability within 15 minutes."
        />

        <div className="border border-red-200 bg-white p-6 mt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-red-600 mb-4">V2 Roadmap Sequence</p>
          <div className="space-y-3">
            {[
              { v: 'V2.1', label: 'Insurance capture assistant', note: 'Structured insurance capture without eligibility verification. Catie\'s rules, human review.' },
              { v: 'V2.2', label: 'Insurance mapping support', note: 'Payer alias table, subscriber ID patterns, confidence scoring. Never promise coverage.' },
              { v: 'V2.3', label: 'Referral workflow', note: 'Only after integration support exists: referral status, authorization number, expiry, approved provider.' },
              { v: 'V2.4', label: 'Rescheduling and cancellation', note: 'After direct booking reliability is high. Requires identity verification and schedule-update safety.' },
              { v: 'V2.5', label: 'Care Coordinator cockpit', note: 'Dashboard work queues aligned to Jeff\'s doctor-specific Care Coordinator structure.' },
            ].map(({ v, label, note }) => (
              <div key={v} className="flex items-start gap-4 border-b border-red-100 pb-3">
                <span className="font-mono text-[9px] text-red-500 font-black flex-shrink-0 mt-0.5 w-10">{v}</span>
                <div>
                  <p className="text-sm font-semibold text-red-950">{label}</p>
                  <p className="mt-1 text-xs text-black/55">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* ── 11. ACCEPTANCE METRICS ──────────────────────── */
  {
    id: 'hp-metrics',
    fullWidthContent: (
      <div className="relative w-full overflow-hidden bg-red-700 text-white p-8 md:p-24">
        <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-center opacity-[0.06] mix-blend-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-red-100/80">10 — Acceptance gates</p>
          <h2 className="font-serif text-4xl leading-tight mb-6 md:text-5xl max-w-4xl">
            What the agent must clear before live calls.
          </h2>
          <p className="font-serif text-lg leading-relaxed text-white/70 mb-16 max-w-3xl">
            Every number below is a target measured against a 150–300 call simulation set, not a marketing claim. The bar is set high enough that hitting it requires real engineering work — and low enough that real-world phone audio with elderly callers and orthopedic vocabulary can clear it.
          </p>

          {/* Measured targets */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-20">
            <AcceptanceMetric
              eyebrow="Target · Simulation"
              value="≥92%"
              title="Intent Classification"
              body="Across the 11-intent test set, after one clarification pass."
            />
            <AcceptanceMetric
              eyebrow="Target · Simulation"
              value="≥96%"
              title="DOB Capture"
              body="After agent readback confirmation. Required before any patient lookup."
            />
            <AcceptanceMetric
              eyebrow="Target · Latency"
              value={
                <>
                  <span className="block">&lt;700</span>
                  <span className="mt-1 block text-[0.34em] uppercase tracking-[0.3em] text-red-100/90">ms</span>
                </>
              }
              title="Median EoT → First Audio"
              body="End-of-turn detection → first agent audio frame. Under this threshold, the agent feels responsive instead of delayed."
            />
            <AcceptanceMetric
              eyebrow="Target · Latency"
              value={
                <>
                  <span className="block">&lt;1.5</span>
                  <span className="mt-1 block text-[0.34em] uppercase tracking-[0.3em] text-red-100/90">seconds</span>
                </>
              }
              title="P95 EoT → First Audio"
              body={'Tail latency for harder turns and tool-bound replies. Excludes the eCW round trip, which is masked with conversational filler ("Let me check that for you").'}
            />
          </div>

          {/* Latency budget breakdown */}
          <div className="border-t border-white/15 pt-12 mb-16">
            <p className="font-mono text-[10px] uppercase tracking-widest text-red-200/80 mb-3">Latency budget — how the 700ms gets spent</p>
            <h3 className="font-serif text-2xl leading-tight md:text-3xl mb-8 max-w-3xl">
              The median target is built backward from the stack, not pulled from a roadmap.
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
              {[
                { stage: 'EoT detection', budget: '120–200ms', note: 'Silero VAD + LiveKit turn detector. Context-aware finalization.' },
                { stage: 'STT finalization', budget: '80–150ms', note: 'Deepgram Nova-3 Medical streaming partial → final commit.' },
                { stage: 'LLM TTFT', budget: '180–300ms', note: 'GPT-4o with streaming, a short system prompt, and cached tool schemas.' },
                { stage: 'TTS first byte', budget: '80–150ms', note: 'Cartesia Sonic 3 streaming. Begins synthesis on the first LLM token.' },
                { stage: 'Network + jitter', budget: '40–100ms', note: 'SIP trunk RTT + LiveKit room hop + jitter buffer.' },
              ].map(({ stage, budget, note }) => (
                <div key={stage} className="border border-white/15 bg-white/5 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-red-200/80 mb-2">{stage}</p>
                  <p className="font-sans font-bold text-base mb-2">{budget}</p>
                  <p className="text-xs leading-relaxed text-white/55">{note}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-serif text-sm italic text-white/55 max-w-3xl">
              Streaming overlap matters more than per-stage minimums. TTS starts on the first LLM token, not after the LLM finishes. STT finalization happens during VAD silence-confirmation. Real wall-clock latency is shorter than the sum of stages.
            </p>
          </div>

          {/* Policy invariants */}
          <div className="border-t border-white/15 pt-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-red-200/80 mb-3">Policy invariants — enforced by the gate, not measured</p>
            <h3 className="font-serif text-2xl leading-tight md:text-3xl mb-8 max-w-3xl">
              Three actions the agent cannot take, regardless of model output.
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="border border-white/15 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-200 mb-3">Invariant 01</p>
                <p className="font-sans font-bold text-lg mb-3">Appointment without confirmation</p>
                <p className="text-sm leading-relaxed text-white/60">The <code className="font-mono text-[11px] bg-white/10 px-1 py-0.5">create_appointment</code> tool requires an explicit caller-confirmation flag in its payload. The gate rejects the call otherwise.</p>
              </div>
              <div className="border border-white/15 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-200 mb-3">Invariant 02</p>
                <p className="font-sans font-bold text-lg mb-3">Workers comp booking</p>
                <p className="text-sm leading-relaxed text-white/60">Any utterance matching the WC classifier flips a session flag. While that flag is set, scheduling tools are unavailable. The only valid action is transfer.</p>
              </div>
              <div className="border border-white/15 bg-white/5 p-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-200 mb-3">Invariant 03</p>
                <p className="font-sans font-bold text-lg mb-3">Medical advice response</p>
                <p className="text-sm leading-relaxed text-white/60">Medical-question intent forces the agent into capture-and-escalate mode. The system prompt and the policy gate both block any tool calls that would generate clinical content.</p>
              </div>
            </div>
          </div>

          {/* Pilot metrics caveat */}
          <div className="border-t border-white/15 pt-12 mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-red-200/80 mb-3">What gets watched in pilot</p>
                <p className="font-serif text-base leading-relaxed text-white/70">
                  Live pilot tracks containment rate, transfer rate, human rescue rate, wrong-provider corrections, and median staff review time. The most important early metric is not automation rate — it is <span className="italic">corrected appointment rate</span>. Above a threshold, the agent is creating hidden work and rolls back to Phase 2.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-red-200/80 mb-3">What gets disclosed up front</p>
                <p className="font-serif text-base leading-relaxed text-white/70">
                  Numbers above are design targets for a system in spec, not measured production results. Real pilot performance will sit below the simulation targets at launch and is expected to converge across two to three rule-tuning cycles before V1 is approved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ── 11.5 LIVE BUILD / DEMO STAGE ────────────────── */
  {
    id: 'hp-demo',
    fullWidthContent: (
      <div className="relative w-full overflow-hidden bg-red-950 text-white p-8 md:p-24">
        <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-center opacity-[0.04] mix-blend-overlay" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-red-500/15 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-red-300/80">
            11 — Live Build
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] mb-14 items-end">
            <div>
              <h2 className="max-w-[11ch] font-serif text-5xl leading-tight md:text-6xl mb-6">
                The Agent On The Line.
              </h2>
              <p className="font-serif text-lg leading-relaxed text-white/70 max-w-2xl">
                An interactive build of the Summit voice agent will run inside this frame. Place a call, watch the agent classify intent, see the policy gate accept or reject a tool call, and inspect end-of-turn latency in real time.
              </p>
            </div>
            <div className="border border-red-400/40 bg-red-500/10 px-5 py-3 self-start md:self-end">
              <p className="font-mono text-[9px] uppercase tracking-widest text-red-300 mb-1">Status</p>
              <p className="font-mono text-sm text-white">In Build · Q2 2026</p>
            </div>
          </div>

          {/* DEMO STAGE — placeholder frame for the eventual UI */}
          <div className="relative border-2 border-red-400/35 bg-red-950/60 backdrop-blur-sm shadow-[0_2rem_4rem_rgba(0,0,0,0.4)]">
            {/* Top bar */}
            <div className="border-b border-red-400/30 px-6 py-3 flex items-center justify-between bg-red-900/40">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-300/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-300/30" />
                </div>
                <span className="font-mono text-xs text-white/65">summit-voice-agent · livekit-room</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-red-300/70">Interactive Demo</span>
            </div>

            {/* 3-column stage layout */}
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_260px] min-h-[460px]">
              {/* Left: Call Control */}
              <div className="border-b md:border-b-0 md:border-r border-red-400/20 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/80">Call Control</p>
                  <div className="border border-white/12 bg-white/[0.04] px-4 py-3">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/70 mb-1">SIP From</p>
                    <p className="font-mono text-sm text-white/40">+1 ••• ••• ••••</p>
                  </div>
                  <div className="border border-white/12 bg-white/[0.04] px-4 py-3">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/70 mb-1">Room ID</p>
                    <p className="font-mono text-sm text-white/40 italic">awaiting connect</p>
                  </div>
                  <div className="border border-white/12 bg-white/[0.04] px-4 py-3">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/70 mb-1">Agent</p>
                    <p className="font-mono text-sm text-white/40">summit-v0.1</p>
                  </div>
                </div>
                <div className="mt-6 border border-red-400/60 bg-red-500/15 px-4 py-3 text-center">
                  <span className="font-mono text-sm uppercase tracking-widest text-red-200/90">Start Call →</span>
                </div>
              </div>

              {/* Center: Live Transcript */}
              <div className="border-b md:border-b-0 md:border-r border-red-400/20 p-6 flex flex-col">
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/80 mb-6">Live Transcript</p>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-xs">
                    <div className="w-14 h-14 rounded-full border border-red-400/40 flex items-center justify-center mx-auto mb-5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-200/70">
                        <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="font-serif text-base italic text-white/45 mb-2">Transcript will stream here.</p>
                    <p className="font-mono text-[10px] text-white/30 leading-relaxed">Interim and final utterances. Confidence scores per segment. Speaker-labeled.</p>
                  </div>
                </div>
                <div className="border-t border-white/8 pt-3 mt-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-white/30">EoT detector: idle</span>
                  <span className="font-mono text-[9px] text-white/30">VAD: silero · 200ms</span>
                </div>
              </div>

              {/* Right: Tools + Latency */}
              <div className="p-6 space-y-6">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/80 mb-4">Tool Calls</p>
                  <div className="space-y-2">
                    {[
                      'lookup_patient',
                      'get_provider_availability',
                      'create_appointment',
                      'transfer_call',
                      'flag_for_review',
                    ].map(t => (
                      <div key={t} className="border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[10px] text-white/45 flex items-center justify-between">
                        <span>{t}()</span>
                        <span className="text-white/20">idle</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/80 mb-4">Latency</p>
                  <div className="space-y-2">
                    {[
                      { stage: 'STT partial', val: '—' },
                      { stage: 'LLM TTFT', val: '—' },
                      { stage: 'TTS first byte', val: '—' },
                      { stage: 'EoT → Audio', val: '—' },
                    ].map(({ stage, val }) => (
                      <div key={stage} className="grid grid-cols-[1fr_auto] gap-2 border-b border-white/8 pb-2">
                        <span className="font-mono text-[10px] text-white/45">{stage}</span>
                        <span className="font-mono text-[10px] text-white/30">{val} ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="border-t border-red-400/30 px-6 py-3 bg-red-900/40 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">Stage status: awaiting build</span>
              <span className="font-mono text-[10px] text-red-300/70">v0.1 — interactive demo coming</span>
            </div>
          </div>

          {/* What this demo will do */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            <div className="border border-red-400/20 bg-white/[0.04] p-5">
              <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/80 mb-3">What you'll do</p>
              <p className="text-sm leading-relaxed text-white/65">
                Place a real call to a LiveKit-hosted SIP number, or initiate a WebRTC session straight from this page. The agent greets, classifies intent, and either schedules, transfers, or escalates based on what you say.
              </p>
            </div>
            <div className="border border-red-400/20 bg-white/[0.04] p-5">
              <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/80 mb-3">What's instrumented</p>
              <p className="text-sm leading-relaxed text-white/65">
                Live transcript, tool-call panel, per-stage latency meter, policy-gate accept/reject events, and a replay button to step back through the full call message graph.
              </p>
            </div>
            <div className="border border-red-400/20 bg-white/[0.04] p-5">
              <p className="font-mono text-[9px] uppercase tracking-widest text-red-300/80 mb-3">Failure injection</p>
              <p className="text-sm leading-relaxed text-white/65">
                Toggleable scenarios: noisy caller, slow elderly caller, ambiguous provider name, eCW timeout, unavailable slots, and a workers-comp utterance to verify the policy gate fires.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ── 12. CLOSING THESIS ──────────────────────────── */
  {
    id: 'hp-thesis',
    fullWidthContent: (
      <div className="w-full bg-red-50 p-8 md:p-32 flex flex-col items-center border-y border-red-200/80">
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.32em] text-red-500">12 — PM Recommendation</p>
        <p className="max-w-4xl font-serif text-3xl leading-snug text-red-950 text-center md:text-4xl">
          Build the voice agent, but do not build the fantasy version.
        </p>
        <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-black/65 text-center">
          The product should be judged by whether it makes Summit calmer, not by whether it maximizes automation. The voice agent earns more scope only after it proves that it can schedule safely, transfer honestly, and create less work than it removes.
        </p>
        <div className="mt-16 border-t border-red-200 pt-12 w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Runtime', value: 'LiveKit Agents' },
              { label: 'Telephony', value: 'LiveKit SIP + Twilio' },
              { label: 'STT', value: 'Deepgram Nova-3 Medical' },
              { label: 'LLM (live)', value: 'GPT-4o' },
              { label: 'TTS', value: 'Cartesia Sonic 3' },
              { label: 'Workflow', value: 'Deterministic FSM' },
              { label: 'EHR', value: 'eClinicalWorks' },
              { label: 'Dashboard', value: 'React + LiveKit traces' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-mono text-[9px] uppercase tracking-widest text-red-500/70">{label}</p>
                <p className="mt-1 font-sans font-semibold text-sm text-red-950">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* ── 13. SOURCE NOTE ─────────────────────────────── */
  {
    id: 'hp-source',
    fullWidthContent: (
      <div className="relative overflow-hidden bg-red-950 text-white">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
          <ManagedHeroVideo
            src="/videos/hero-bg.mp4"
            idSeed="hello-patient-secondary-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(69,10,10,0.3),rgba(69,10,10,0.52))] lg:bg-[linear-gradient(90deg,rgba(69,10,10,0.97)_0%,rgba(69,10,10,0.84)_18%,rgba(69,10,10,0.42)_48%,rgba(69,10,10,0.14)_100%)]" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(248,113,113,0.18),transparent_34%)]" />

        <div className="relative z-10 mx-auto max-w-6xl px-8 py-16 md:px-24 md:py-24 lg:min-h-[640px] lg:py-28">
          <div className="max-w-[620px] space-y-7">
            <Kicker n="13" label="Source Note" />
            <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight md:text-7xl">
              Serious Proposal. Not A Deployment Claim.
            </h2>
            <p className="max-w-2xl font-serif text-xl leading-relaxed text-white/78 md:text-[1.4rem]">
              The value of this page is not that it pretends to be shipped work. The value is that it treats Summit like a real product problem with real operational pressure, a bounded MVP, explicit safeguards, and a concrete path to a production-ready voice system.
            </p>

            <div className="grid gap-5 pt-4 md:grid-cols-2">
              <FooterCard
                title="What This Case Study Is"
                body="A serious implementation proposal for how AI voice infrastructure, scheduling policy, review tooling, and rollout discipline could work in this environment."
              />
              <FooterCard
                title="What It Is Not"
                body="A claim that I deployed this exact system for Summit Health. Unless I say otherwise, the company on the cover is the problem frame, not proof of a live production engagement."
              />
            </div>

            <div className="max-w-[560px] border-l-2 border-red-300/58 pl-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-red-200/82">
                {STANDARD_SOURCE_NOTE_LABEL}
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-white/72 md:text-[1.12rem]">
                {STANDARD_SOURCE_NOTE_TEXT}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default helloPatientSections;
