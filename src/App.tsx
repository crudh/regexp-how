import { useState } from "react";
import { PageContent } from "./components/PageContent";
import { PageFooter } from "./components/PageFooter";
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
    <div className="flex flex-col min-h-screen main">
      <PageHeader>regexp.how</PageHeader>
      <PageContent>
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
      </PageContent>
      <PageFooter />
    </div>
  );
};

export default App;
