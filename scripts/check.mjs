import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
let failed = false;

function fail(message) {
  console.error("FAIL", message);
  failed = true;
}

// 1. Every script must parse.
const scripts = fs.readdirSync(root).filter((f) => f.endsWith(".js"));
for (const file of scripts) {
  try {
    new vm.Script(fs.readFileSync(path.join(root, file), "utf8"), { filename: file });
    console.log("ok  ", file);
  } catch (error) {
    fail(`${file}: ${error.message}`);
  }
}

// 2. Every local file used by index.html or loaded by a script must exist.
const sources = ["index.html", ...scripts].map((f) => fs.readFileSync(path.join(root, f), "utf8"));
const html = sources[0];
const refs = new Set();
for (const m of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) refs.add(m[1]);
for (const m of html.matchAll(/url\((\/[^)"']+)\)/g)) refs.add(m[1]);
for (const text of sources.slice(1)) {
  for (const m of text.matchAll(/['"](\/[A-Za-z0-9_\-./]+\.(?:js|css))['"]/g)) refs.add(m[1]);
}
for (const ref of refs) {
  if (!fs.existsSync(path.join(root, ref))) fail(`missing file ${ref}`);
}
console.log(`checked ${refs.size} local references`);

if (failed) process.exit(1);
