import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const repoRoot = process.cwd();

let ts;
try {
  ts = require("typescript");
} catch (error) {
  console.error("Unable to load TypeScript. Run npm install first, then retry.");
  process.exit(1);
}

require.extensions[".ts"] = function compileTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      skipLibCheck: true,
      strict: true,
    },
    fileName: filename,
  });

  module._compile(output.outputText, filename);
};

const verificationPath = path.join(repoRoot, "src", "lib", "summit", "summitPolicyVerification.ts");
const verification = require(verificationPath);
const report = verification.runSummitPolicySelfCheck();

console.log(verification.formatSummitPolicySelfCheckReport(report));

if (!report.passed) {
  process.exit(1);
}
