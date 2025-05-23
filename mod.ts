import type { ApplicationData, PlatformData } from "./src/index.ts";

export * from "./src/types.gen.ts";
export type ApplicationDataMeta = ApplicationData["meta"];
export type ApplicationDataPayload = ApplicationData["payload"];
export type PlatformDataMeta = PlatformData["meta"];
