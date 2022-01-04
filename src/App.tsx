import { useState } from "react";
import { PageHeader } from "./components/PageHeader";
import { RegexpExamples } from "./components/RegexpExamples";
import { RegexpInput } from "./components/RegexpInput";
import { RegexpMatchText } from "./components/RegexpMatchText";
import { RegexpMatchTextInput } from "./components/RegexpMatchTextInput";
import { useMatchTextEntries } from "./hooks/useMatchTextEntries";
import { useRegexp } from "./hooks/useRegexp";
import { useRegexpExamples } from "./hooks/useRegexpExamples";

const App = () => {
  const regexpFlags = "g";

  const [text, setText] = useState("");
  const [regexpInput, setRegexpInput] = useState("");
  const [regexp, error] = useRegexp(regexpInput, regexpFlags);
  const examples = useRegexpExamples(regexp);
  const matchTextEntries = useMatchTextEntries(text, regexp);

  return (
    <div className="min-h-screen main">
      <div className="flex justify-center">
        <PageHeader>regexp.how</PageHeader>
      </div>
      <div className="flex flex-col p-2 md:p-8">
        <RegexpInput
          regexpFlags={regexpFlags}
          error={error}
          onChange={setRegexpInput}
        />
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <RegexpMatchTextInput onChange={setText} />
          </div>
          <div className="w-full">
            <RegexpMatchText matchTextEntries={matchTextEntries} />
          </div>
        </div>
        <RegexpExamples examples={examples} />
      </div>
    </div>
  );
};

export default App;
