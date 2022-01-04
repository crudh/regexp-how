import { useMemo } from "react";
import { MatchTextEntry } from "../types";

export const useMatchTextEntries = (
  text: string,
  regexp: RegExp | undefined
): MatchTextEntry[] => {
  return useMemo(() => {
    if (!regexp) return [];

    const matches = Array.from(text.matchAll(regexp))
      .filter((match) => match[0] !== "" && match.index !== undefined)
      .map((match) => ({
        text: match[0],
        index: match.index as number,
      }));

    const entries: MatchTextEntry[] = [];
    let prevIndex = 0;
    for (const match of matches) {
      if (match.index > prevIndex) {
        entries.push({
          text: text.slice(prevIndex, match.index),
          type: "other",
        });
      }

      entries.push({ text: match.text, type: "match" });
      prevIndex = match.index + match.text.length;
    }

    if (prevIndex < text.length) {
      entries.push({ text: text.slice(prevIndex), type: "other" });
    }

    return entries;
  }, [text, regexp]);
};
