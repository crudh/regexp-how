import { useMemo } from "react";
import Randexp from "randexp";

export const DEFAULT_MAX_NUMBER_OF_EXAMPLES = 5;

export const useRegexpExamples = (
  regexp: RegExp | undefined,
  maxNumberOfExamples: number = DEFAULT_MAX_NUMBER_OF_EXAMPLES
): string[] => {
  return useMemo(() => {
    if (regexp === undefined) return [];

    return Array(maxNumberOfExamples)
      .fill("")
      .map(() => new Randexp(regexp).gen())
      .filter(
        (example, index, exampleList) =>
          example !== "" && exampleList.indexOf(example) === index
      );
  }, [regexp]);
};
