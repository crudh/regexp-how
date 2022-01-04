import { FC, useMemo } from "react";
import { MatchTextEntry } from "../types";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

export const RegexpMatchText: FC<{ matchTextEntries: MatchTextEntry[] }> = ({
  matchTextEntries,
}) => {
  const nrOfMatches = useMemo(
    () => matchTextEntries.filter(({ type }) => type === "match"),
    [matchTextEntries]
  ).length;

  return (
    <Section>
      <SectionHeader>
        Matched text
        {nrOfMatches > 0
          ? ` - ${nrOfMatches} match${nrOfMatches > 1 ? "es" : ""}!`
          : matchTextEntries.length > 0
          ? " - Nothing matched!"
          : ""}
      </SectionHeader>
      <div className="p-2 text-xl text-black break-all bg-gray-300 rounded-md min-h-[44px]">
        {matchTextEntries.map((entry, index) => (
          <span
            key={index}
            className={entry.type === "match" ? "bg-yellow-300" : ""}
          >
            {entry.text}
          </span>
        ))}
      </div>
    </Section>
  );
};
