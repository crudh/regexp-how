import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

export const RegexpMatchTextInput = ({
  onChange,
}: {
  onChange: (input: string) => void;
}) => {
  return (
    <Section>
      <SectionHeader>Text to match</SectionHeader>
      <div
        className="p-2 text-xl text-black break-all bg-white rounded-md"
        onInput={(e) => onChange(e.currentTarget.innerText)}
        contentEditable
      ></div>
    </Section>
  );
};
