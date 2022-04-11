import { FormEvent, useTransition } from "react";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

export const RegexpMatchTextInput = ({
  onChange,
}: {
  onChange: (input: string) => void;
}) => {
  const [, startTransition] = useTransition();

  const handleChange = (event: FormEvent<HTMLElement>) => {
    startTransition(() => onChange(event.currentTarget.innerText));
  };

  return (
    <Section>
      <SectionHeader>Text to match</SectionHeader>
      <div
        className="p-2 text-xl text-black break-all bg-white rounded-md"
        onInput={handleChange}
        contentEditable
      ></div>
    </Section>
  );
};
