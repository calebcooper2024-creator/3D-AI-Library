// Demo mode: all responses are simulated locally — no API key needed.

export interface AIAction {
  ls_x: number;
  ls_y: number;
  rs_x: number;
  rs_y: number;
  lt: number;
  rt: number;
  lb: boolean;
  rb: boolean;
  btn_a: boolean;
  btn_b: boolean;
  btn_x: boolean;
  btn_y: boolean;
  dpad_up: boolean;
  dpad_down: boolean;
  dpad_left: boolean;
  dpad_right: boolean;
  btn_menu: boolean;
  btn_view: boolean;
  btn_ls: boolean;
  btn_rs: boolean;
  explanation: string;
  voice_response: string;
  status?: {
    health: number;
    wanted_level: number;
    speed: number;
  };
  detections?: {
    box_2d: [number, number, number, number];
    label: string;
  }[];
}

const TACTICAL_LINES = [
  "GPS route locked. Accelerating to merge with traffic — minimal exposure.",
  "Two hostiles at 11 o'clock. Maintaining lane discipline to avoid engagement.",
  "Speed optimal. Monitoring minimap for pursuit vectors.",
  "Hard right incoming. Pre-turning steering input. Throttle steady.",
  "Wanted level rising. Switching to back-road routing. Evasive pattern engaged.",
  "Heist window opens in 90 seconds. Holding staging position.",
  "NPC cluster ahead. Reducing throttle, threading the gap.",
  "Bridge crossing. Camera panning to check for ambush. Smooth acceleration.",
  "Mission target in sight. Braking to recon approach vector.",
  "Clear road. Punching to 80mph. ETA to objective: 42 seconds.",
];

const VOICE_LINES: Record<string, string[]> = {
  Tactical: [
    "Copy. Adjusting heading.",
    "Route locked. Moving.",
    "Eyes on the objective. Stay frosty.",
    "Threat neutralised. Continuing.",
    "On approach. 30 seconds out.",
  ],
  Aggressive: [
    "Let's go, go, go!",
    "Smash through — no time for finesse.",
    "Floor it. We own this road.",
    "Take the gap. Now.",
    "They can't keep up. Push harder.",
  ],
  Safe: [
    "Slowing down — keeping it clean.",
    "Maintaining safe following distance.",
    "No wanted level. Let's keep it that way.",
    "All clear. Cruising.",
    "Running dark. Quiet route selected.",
  ],
  Chaotic: [
    "THIS IS FINE. EVERYTHING IS FINE.",
    "Ramming speed! YOLO!",
    "Oops. Adapting. Still adapting.",
    "The helicopter won't follow us in here, probably.",
    "Maximum chaos mode activated.",
  ],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function jitter(base: number, range: number): number {
  return Math.max(-1, Math.min(1, base + (Math.random() - 0.5) * range));
}

let _health = 100;
let _wantedLevel = 0;
let _speed = 0;
let _frameCount = 0;

export async function generateVoiceFeedback(_text: string): Promise<string | null> {
  // No audio in demo mode
  return null;
}

export async function processVoiceInput(
  _base64Audio: string,
  missionGoal: string,
  personality: string
): Promise<{ transcript: string | null; text: string; audio: string | null }> {
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

  const responses = VOICE_LINES[personality] || VOICE_LINES['Tactical'];
  const goalKeywords = missionGoal.toLowerCase().split(' ').filter(w => w.length > 3);
  const goalWord = goalKeywords[Math.floor(Math.random() * goalKeywords.length)] || 'objective';

  return {
    transcript: `Bonnie, what's the status on the ${goalWord}?`,
    text: pick(responses),
    audio: null,
  };
}

export async function analyzeGameFrame(
  _base64Image: string,
  _goal: string = "Drive safely to the destination",
  personality: string = "Tactical"
): Promise<AIAction> {
  await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

  _frameCount++;

  // Simulate changing game state
  _speed = Math.min(120, Math.max(0, _speed + (Math.random() - 0.3) * 20));
  if (_frameCount % 8 === 0 && _wantedLevel < 3) _wantedLevel = Math.min(5, _wantedLevel + (Math.random() > 0.7 ? 1 : 0));
  if (_frameCount % 12 === 0) _wantedLevel = Math.max(0, _wantedLevel - 1);
  _health = Math.max(60, _health - Math.random() * 2);

  const turning = (Math.random() - 0.5) * 0.8;
  const throttle = 0.5 + Math.random() * 0.4;
  const braking = Math.random() > 0.85 ? Math.random() * 0.6 : 0;

  const detectionLabels = ['Vehicle', 'Pedestrian', 'Police', 'Barrier', 'Car'];
  const numDetections = Math.floor(Math.random() * 3);
  const detections = Array.from({ length: numDetections }, () => ({
    box_2d: [
      Math.floor(Math.random() * 600),
      Math.floor(Math.random() * 800),
      Math.floor(Math.random() * 400) + 600,
      Math.floor(Math.random() * 200) + 800,
    ] as [number, number, number, number],
    label: pick(detectionLabels),
  }));

  const voiceLines = VOICE_LINES[personality] || VOICE_LINES['Tactical'];

  return {
    ls_x: jitter(turning, 0.3),
    ls_y: jitter(throttle - braking, 0.2),
    rs_x: jitter(0, 0.1),
    rs_y: jitter(0, 0.1),
    lt: braking,
    rt: braking > 0.1 ? 0 : throttle,
    lb: false,
    rb: Math.random() > 0.95,
    btn_a: false,
    btn_b: false,
    btn_x: Math.random() > 0.97,
    btn_y: false,
    dpad_up: false,
    dpad_down: false,
    dpad_left: Math.random() > 0.98,
    dpad_right: false,
    btn_menu: false,
    btn_view: false,
    btn_ls: false,
    btn_rs: false,
    explanation: pick(TACTICAL_LINES),
    voice_response: pick(voiceLines),
    status: {
      health: Math.round(_health),
      wanted_level: _wantedLevel,
      speed: Math.round(_speed),
    },
    detections,
  };
}
