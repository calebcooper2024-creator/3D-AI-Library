const required = ["LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.log("Summit LiveKit env self-check: NOT CONFIGURED");
  console.log(`Missing: ${missing.join(", ")}`);
  console.log("This is acceptable for local mock-mode builds, but /api/livekit-token will return 503 until these are set.");
  process.exit(0);
}

const url = process.env.LIVEKIT_URL;
if (!/^wss:\/\//.test(url) && !/^ws:\/\//.test(url)) {
  console.error("Summit LiveKit env self-check: FAIL");
  console.error("LIVEKIT_URL should be a ws:// or wss:// URL.");
  process.exit(1);
}

console.log("Summit LiveKit env self-check: PASS");
console.log(`LIVEKIT_URL=${url}`);
console.log("LIVEKIT_API_KEY is present");
console.log("LIVEKIT_API_SECRET is present");
