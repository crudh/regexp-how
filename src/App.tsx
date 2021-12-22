import { FC, useMemo, useState } from "react";
import Randexp from "randexp";

const NUMBER_OF_EXAMPLES = 5;

const errorMessage = (error: unknown, defaultMessage = "Error") =>
  error instanceof Error ? error.message : defaultMessage;

const useExamples = (regexp: RegExp | undefined): string[] => {
  return useMemo(() => {
    if (regexp === undefined) return [];

    return Array(NUMBER_OF_EXAMPLES)
      .fill("")
      .map(() => new Randexp(regexp).gen())
      .filter(Boolean);
  }, [regexp]);
};

const PageHeader: FC = ({ children }) => (
  <h1 className="pt-6 text-3xl font-bold">{children}</h1>
);

const Section: FC = ({ children }) => <div className="pb-6">{children}</div>;

const SectionHeader: FC = ({ children }) => (
  <h2 className="pb-2">{children}</h2>
);

const Examples: FC<{ regexp: RegExp | undefined }> = ({ regexp }) => {
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

const App = () => {
  const [regexpInput, setRegexpInput] = useState("");
  const [error, setError] = useState<string | undefined>();

  const regexp = useMemo(() => {
    setError(undefined);

    try {
      return new RegExp(regexpInput, "g");
    } catch (error: unknown) {
      setError(errorMessage(error));
    }

    return undefined;
  }, [regexpInput]);

  return (
    <div className="min-h-screen main">
      <div className="flex justify-center">
        <PageHeader>regexp.how</PageHeader>
      </div>
      <div className="flex flex-col p-10">
        <Section>
          <SectionHeader>Regular expression</SectionHeader>
          <div className="flex flex-col justify-center">
            <input
              className={`w-full text-xl p-2 rounded-md ${
                error ? "bg-red-500" : ""
              }`}
              value={regexpInput}
              onChange={(e) => setRegexpInput(e.target.value)}
            />
            <div>{error ?? null}</div>
          </div>
        </Section>
        {/* <Section>
          <SectionHeader>Text to match</SectionHeader>
          <div
            contentEditable={true}
            className="p-2 text-xl text-black bg-white rounded-md"
          ></div>
        </Section> */}
        <Examples regexp={regexp} />
      </div>
    </div>
  );
};

export default App;
