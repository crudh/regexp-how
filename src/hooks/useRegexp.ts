import { useMemo } from "react";

const errorMessage = (error: unknown, defaultMessage = "Error") =>
  error instanceof Error ? error.message : defaultMessage;

export const useRegexp = (
  regexpString: string,
  flags: string
): [RegExp?, string?] => {
  return useMemo(() => {
    try {
      return [new RegExp(regexpString, flags), undefined];
    } catch (error: unknown) {
      return [undefined, errorMessage(error)];
    }
  }, [regexpString]);
};
