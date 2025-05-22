#!/usr/bin/env -S deno run --allow-read --allow-write

import { exists } from "@std/fs";

const OUTPUT_DIR = "src";

async function main() {
  console.log("🧹 Cleaning generated files...");
  
  try {
    if (await exists(OUTPUT_DIR)) {
      await Deno.remove(OUTPUT_DIR, { recursive: true });
      console.log(`✅ Removed ${OUTPUT_DIR} directory`);
    } else {
      console.log("ℹ️  No generated files to clean");
    }
  } catch (error) {
    console.error("❌ Error cleaning generated files:", error);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  await main();
}