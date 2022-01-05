import { allFlags } from "./constants";

export type MatchTextEntry =
  | {
      type: "matchStart" | "matchEnd" | "newLine";
    }
  | {
      type: "text";
      text: string;
    };

export type Flag = typeof allFlags[number];

export type Flags = Record<Flag, boolean>;
