export type MatchTextEntry = {
  type: "matchStart" | "matchEnd" | "newLine" | "text";
  text?: string;
};
