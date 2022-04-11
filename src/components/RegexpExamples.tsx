import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

export const RegexpExamples = ({ examples }: { examples: string[] }) => {
  if (examples.length === 0) return null;

  return (
    <Section>
      <SectionHeader>Examples</SectionHeader>
      <div className="p-2 border-2 rounded-md">
        <ul className="list-disc list-inside">
          {examples.map((example) => (
            <li key={example} className="break-all">
              {example}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
