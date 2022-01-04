import { FC, useEffect, useRef } from "react";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

export const RegexpInput: FC<{
  regexpFlags: string;
  error: string | undefined;
  onChange: (input: string) => void;
}> = ({ regexpFlags, error, onChange }) => {
  const inputEl = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    inputEl?.current?.focus();
  }, []);

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
              onInput={(e) => onChange(e.currentTarget.textContent ?? "")}
              contentEditable
            />
            <div className="flex items-end pl-1 font-bold text-gray-500">
              /{regexpFlags}
            </div>
          </div>
          <div className="flex">
            <button
              type="button"
              disabled={!inputEl.current?.textContent}
              className="pl-3 pr-3 font-bold text-black bg-gray-300 active:bg-gray-200 disabled:text-gray-400 rounded-r-md"
              onClick={() => {
                navigator.clipboard.writeText(
                  `/${inputEl.current?.textContent ?? ""}/${regexpFlags}`
                );
              }}
            >
              Copy
            </button>
          </div>
        </div>
        <div className="pt-1">{error ?? null}</div>
      </div>
    </Section>
  );
};
