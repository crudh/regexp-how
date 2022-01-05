export type MatchTextEntry =
  | {
      type: "matchStart" | "matchEnd" | "newLine";
    }
  | {
      type: "text";
      text: string;
    };
