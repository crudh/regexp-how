import { Flag } from "./types";

export const allFlags = ["g", "i"] as const;

export const flagNames: Record<Flag, string> = {
  g: "Global search",
  i: "Ignore case",
} as const;
