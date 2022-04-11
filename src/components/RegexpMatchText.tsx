import { ReactNode, useMemo } from "react";
import { MatchTextEntry } from "../types";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

const BlockText = ({ children = "" }: { children: ReactNode }) => (
  <span className="block-text">{children}</span>
);

const BlockMatch = ({ children }: { children: ReactNode }) => (
  <div className="block-match">{children}</div>
);

const BlockLine = ({ children }: { children: ReactNode }) => (
  <div className="block-line">{children}&nbsp;</div>
);

const MatchText = ({ entries }: { entries: MatchTextEntry[] }) => {
  let isInMatch = false;
  let currentMatch: JSX.Element[] = [];
  let currentLine: JSX.Element[] = [];
  const lines: JSX.Element[] = [];

  let index = 0;
  for (const entry of entries) {
    switch (entry.type) {
      case "text":
        (isInMatch ? currentMatch : currentLine).push(
          <BlockText key={index}>{entry.text}</BlockText>
        );
        break;
      case "matchStart":
        isInMatch = true;
        break;
      case "matchEnd":
        isInMatch = false;
        currentLine.push(<BlockMatch key={index}>{currentMatch}</BlockMatch>);
        currentMatch = [];
        break;
      case "newLine":
        if (isInMatch) {
          currentLine.push(<BlockMatch key={index}>{currentMatch}</BlockMatch>);
          currentMatch = [];
        }

        lines.push(<BlockLine key={lines.length}>{currentLine}</BlockLine>);
        currentLine = [];
        break;
    }

    index = index + 1;
  }

  if (currentLine.length > 0) {
    lines.push(<BlockLine key={lines.length}>{currentLine}</BlockLine>);
  }

  return (
    <div
      className="p-2 text-xl text-black break-all bg-gray-300 rounded-md"
      data-testid="matchText"
    >
      {lines}
    </div>
  );
};

export const RegexpMatchText = ({
  matchTextEntries,
}: {
  matchTextEntries: MatchTextEntry[];
}) => {
  const nrOfMatches = useMemo(
    () => matchTextEntries.filter(({ type }) => type === "matchStart"),
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
      <MatchText entries={matchTextEntries} />
    </Section>
  );
};
