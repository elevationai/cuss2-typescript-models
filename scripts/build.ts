#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --allow-env

import { exists } from "@std/fs";
import { join } from "@std/path";

const OUTPUT_DIR = "src";

async function removeUnwantedPrefixes(filePath: string) {
  try {
    // Read the generated file
    let content = await Deno.readTextFile(filePath);

    // Remove all instances of Cuss2*Domain prefixes from type names and references
    // This covers patterns like: Cuss2BiometricsDomain, Cuss2*Domain, etc.
    content = content.replace(/\bCuss2[A-Za-z]*Domain/g, "");

    // Comment out duplicate enum definitions using block comments
    let enumCount = 0;
    content = content.replace(
      /export enum CharacteristicsDocumentType \{[^}]+}/g,
      (match) => {
        enumCount++;
        return enumCount > 1
          ? `/* Commenting out duplicate ....\n${match}\n*/`
          : match;
      },
    );

    // Write the cleaned content back
    await Deno.writeTextFile(filePath, content);
  } catch (error) {
    console.error("❌ Error removing prefixes:", error);
    throw error;
  }
}

async function main() {
  console.log("🔨 Building TypeScript models from CUSS2-API.yaml...");

  try {
    // Clean existing generated files
    console.log("🧹 Cleaning existing generated files...");
    if (await exists(OUTPUT_DIR)) {
      await Deno.remove(OUTPUT_DIR, { recursive: true });
    }

    // Run @hey-api/openapi-ts to generate TypeScript models
    console.log("🚀 Running @hey-api/openapi-ts...");
    const command = new Deno.Command("npx", {
      args: ["@hey-api/openapi-ts"],
      stdout: "piped",
      stderr: "piped",
    });

    const process = command.spawn();
    const { code, stdout, stderr } = await process.output();

    if (code !== 0) {
      const errorText = new TextDecoder().decode(stderr);
      console.error("❌ Error running @hey-api/openapi-ts:");
      console.error(errorText);
      Deno.exit(1);
    }

    const outputText = new TextDecoder().decode(stdout);
    console.log(outputText);

    // Verify that types were generated
    const typesFile = join(OUTPUT_DIR, "types.gen.ts");
    if (await exists(typesFile)) {
      console.log("✅ TypeScript models generated successfully!");

      // Postprocess to remove unwanted prefixes
      console.log("🔄 Removing CUSS2 domain prefixes...");
      await removeUnwantedPrefixes(typesFile);
      console.log("✅ Prefixes removed successfully!");
    } else {
      console.error("❌ Expected types.gen.ts file was not generated");
      Deno.exit(1);
    }

    console.log("🎉 Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  await main();
}
