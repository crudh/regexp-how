import { FC } from "react";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

export const RegexpExamples: FC<{ examples: string[] }> = ({ examples }) => {
  if (examples.length === 0) return null;

  return (
    <Section>
      <SectionHeader>Examples</SectionHeader>
      <div className="p-2 border-2 rounded-md">
        <ul className="list-disc list-inside">
          {examples.map((example, index) => (
            <li key={index} className="break-all">
              {example}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
