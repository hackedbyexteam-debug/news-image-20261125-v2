// news-image-20261125-v2 entry (Node 22, standard library only): the image is
// the entry.png beside this file, and the program copies it to
// /output/entry.png, where the gate reads it. That is all the program has
// to do. The image itself sums up Wednesday 25 November 2026 in one
// 1024x1024 broadsheet: 55 stories across 10 regions and 21 fields, all
// first reported that day, with every drawing original.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const SOURCE = new URL("./entry.png", import.meta.url);

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, join(OUTPUT_DIR, "entry.png"));
const sourceBytes = statSync(SOURCE).size;
const copiedBytes = statSync(join(OUTPUT_DIR, "entry.png")).size;
if (sourceBytes !== copiedBytes) {
  throw new Error(`entry.png copy incomplete: ${copiedBytes} of ${sourceBytes} bytes`);
}
console.log(`entry.png copied to ${OUTPUT_DIR} (${copiedBytes} bytes, verified complete)`);
