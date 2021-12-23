import { FC, useEffect, useMemo, useRef, useState } from "react";
import Randexp from "randexp";

const NUMBER_OF_EXAMPLES = 5;

const errorMessage = (error: unknown, defaultMessage = "Error") =>
  error instanceof Error ? error.message : defaultMessage;

const useRegexp = (regexpString: string, flags: string): [RegExp?, string?] => {
  return useMemo(() => {
    try {
      return [new RegExp(regexpString, flags), undefined];
    } catch (error: unknown) {
      return [undefined, errorMessage(error)];
    }
  }, [regexpString]);
};

const useExamples = (regexp: RegExp | undefined): string[] => {
  return useMemo(() => {
    if (regexp === undefined) return [];

    return Array(NUMBER_OF_EXAMPLES)
      .fill("")
      .map(() => new Randexp(regexp).gen())
      .filter(Boolean)
      .filter(
        (example, index, exampleList) => exampleList.indexOf(example) === index
      );
  }, [regexp]);
};

const PageHeader: FC = ({ children }) => (
  <h1 className="pt-6 text-3xl font-bold">{children}</h1>
);

const Section: FC = ({ children }) => <div className="pb-6">{children}</div>;

const SectionHeader: FC = ({ children }) => (
  <h2 className="pb-2">{children}</h2>
);

const RegexpInput: FC<{
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
            <div className="pr-1 font-bold text-gray-400">/</div>
            <span
              className="text-black bg-white outline-none min-w-[10px]"
              ref={inputEl}
              onInput={(e) => onChange(e.currentTarget.textContent ?? "")}
              contentEditable
            />
            <div className="pl-1 font-bold text-gray-400">/{regexpFlags}</div>
          </div>
          <div className="flex">
            <button
              type="button"
              disabled={!inputEl.current?.textContent}
              className="pl-3 pr-3 font-bold text-black bg-gray-300 active:bg-gray-200 disabled:text-gray-400 rounded-r-md"
              onClick={() => {
                navigator.clipboard.writeText(
                  inputEl.current?.textContent ?? ""
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

const RegexpExamples: FC<{ regexp: RegExp | undefined }> = ({ regexp }) => {
  const examples = useExamples(regexp);
  if (examples.length === 0) return null;

  return (
    <Section>
      <SectionHeader>Examples</SectionHeader>
      <div className="p-2 border-2 rounded-md">
        <ul className="list-disc list-inside">
          {examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

const RegexpMatchText: FC = () => {
  return null;

  // return (
  //   <Section>
  //     <SectionHeader>Text to match</SectionHeader>
  //     <div
  //       contentEditable={true}
  //       className="p-2 text-xl text-black bg-white rounded-md"
  //     ></div>
  //   </Section>
  // );
};

const App = () => {
  const regexpFlags = "g";
  const [regexpInput, setRegexpInput] = useState("");
  const [regexp, error] = useRegexp(regexpInput, regexpFlags);

  return (
    <div className="min-h-screen main">
      <div className="flex justify-center">
        <PageHeader>regexp.how</PageHeader>
      </div>
      <div className="flex flex-col p-10">
        <RegexpInput
          regexpFlags={regexpFlags}
          error={error}
          onChange={setRegexpInput}
        />
        <RegexpMatchText />
        <RegexpExamples regexp={regexp} />
      </div>
    </div>
  );
};

export default App;
