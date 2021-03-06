import { FormEvent, useEffect, useRef, useTransition } from "react";
import { flagsStringFromFlags } from "../functions/flags";
import { Flags } from "../types";
import { RegexpFlags } from "./RegexpFlags";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

export const RegexpInput = ({
  regexpFlags,
  error,
  onChange,
  onSetFlags,
}: {
  regexpFlags: Flags;
  error: string | undefined;
  onChange: (input: string) => void;
  onSetFlags: (flags: Flags) => void;
}) => {
  const [, startTransition] = useTransition();
  const inputEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    inputEl?.current?.focus();
  }, []);

  const handleChange = (event: FormEvent<HTMLElement>) => {
    startTransition(() => onChange(event.currentTarget.textContent ?? ""));
  };

  const flagsString = flagsStringFromFlags(regexpFlags);

  return (
    <Section>
      <SectionHeader>Regular expression</SectionHeader>
      <div className="flex flex-col justify-center">
        <div className="flex">
          <div
            className={`flex flex-grow bg-white border-2 p-2 rounded-l-md text-xl ${
              error ? "border-red-500" : ""
            }`}
            onClick={() => inputEl.current?.focus()}
          >
            <div className="pr-1 font-bold text-gray-500">/</div>
            <span
              className="text-black bg-white outline-none min-w-[10px] break-all"
              ref={inputEl}
              onInput={handleChange}
              contentEditable
            />
            <div className="flex items-end pl-1 font-bold text-gray-500">
              /{flagsString}
            </div>
          </div>
          <div className="flex">
            <button
              type="button"
              disabled={!inputEl.current?.textContent}
              className="pl-3 pr-3 font-bold text-black bg-gray-300 active:bg-gray-200 disabled:text-gray-400 rounded-r-md"
              onClick={() => {
                navigator.clipboard.writeText(
                  `/${inputEl.current?.textContent ?? ""}/${flagsString}`
                );
              }}
            >
              Copy
            </button>
          </div>
        </div>
        {error && <div className="p-1 mt-2 bg-red-500">{error}</div>}
        <RegexpFlags flags={regexpFlags} onSetFlags={onSetFlags} />
      </div>
    </Section>
  );
};
