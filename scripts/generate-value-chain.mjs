/**
 * Regenerate the mental-health industry value-chain diagram.
 * Usage: node scripts/generate-value-chain.mjs
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "scripts/mental-health-value-chain.mmd");
const config = path.join(root, "scripts/mermaid-config.json");
const outSvg = path.join(root, "public/images/mental-health-value-chain.svg");
const outPng = path.join(root, "public/images/mental-health-value-chain.png");

function run(args) {
  const result = spawnSync("npx", ["--yes", "@mermaid-js/mermaid-cli@11.4.2", ...args], {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(["-i", input, "-o", outSvg, "-c", config, "-b", "transparent", "-w", "1800"]);
run(["-i", input, "-o", outPng, "-c", config, "-b", "#0e0e0e", "-w", "1800", "-s", "2"]);
console.log("Wrote", outSvg);
console.log("Wrote", outPng);
