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
      }))
      .reverse();

    const entries: MatchTextEntry[] = [];
    let currentMatch = matches.pop();
    let currentText = "";
    let sequentialNewLineCount = 0;

    let charIndex = 0;
    for (const char of text) {
      const isMatchStart = charIndex === currentMatch?.index;
      const isMatchEnd =
        currentMatch?.index !== undefined &&
        currentMatch?.text !== undefined &&
        charIndex === currentMatch.index + currentMatch.text.length - 1;
      const isNewLine = char === "\n";

      if (isMatchStart) {
        if (currentText !== "") {
          entries.push({ type: "text", text: currentText });
          currentText = "";
        }

        entries.push({ type: "matchStart" });
      }

      if (isNewLine) {
        sequentialNewLineCount = sequentialNewLineCount + 1;

        if (sequentialNewLineCount > 0 && sequentialNewLineCount % 2 > 0) {
          if (currentText !== "") {
            entries.push({ type: "text", text: currentText });
            currentText = "";
          }

          entries.push({ type: "newLine" });
        }
      } else {
        sequentialNewLineCount = 0;

        currentText = currentText + char;
      }

      if (isMatchEnd) {
        if (currentText !== "") {
          entries.push({ type: "text", text: currentText });
          currentText = "";
        }

        entries.push({ type: "matchEnd" });
        currentMatch = matches.pop();
      }

      charIndex = charIndex + 1;
    }

    entries.push(
      currentText !== ""
        ? { type: "text", text: currentText }
        : { type: "newLine" }
    );

    return entries;
  }, [text, regexp]);
};
