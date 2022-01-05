import { Flag } from "./types";

export const allFlags = ["g", "i", "m"] as const;

export const flagNames: Record<Flag, string> = {
  g: "Global search",
  i: "Ignore case",
  m: "Multiline",
} as const;
