import { FC, useMemo } from "react";
import { MatchTextEntry } from "../types";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

const BlockText: FC = ({ children = "" }) => <span>{children}</span>;

const BlockMatch: FC = ({ children }) => (
  <span className="bg-yellow-300">{children}</span>
);

const BlockLine: FC = ({ children }) => <div>{children}&nbsp;</div>;

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
    <div className="p-2 text-xl text-black break-all bg-gray-300 rounded-md">
      {lines}
    </div>
  );
};

export const RegexpMatchText: FC<{ matchTextEntries: MatchTextEntry[] }> = ({
  matchTextEntries,
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
