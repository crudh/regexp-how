import { useMemo } from "react";
import { flagsStringFromFlags } from "../functions/flags";
import { Flags } from "../types";

const errorMessage = (error: unknown, defaultMessage = "Error") =>
  error instanceof Error ? error.message : defaultMessage;

export const useRegexp = (
  regexpString: string,
  flags: Flags
): [RegExp?, string?] => {
  return useMemo(() => {
    console.log(flagsStringFromFlags(flags));
    try {
      return [new RegExp(regexpString, flagsStringFromFlags(flags)), undefined];
    } catch (error: unknown) {
      return [undefined, errorMessage(error)];
    }
  }, [regexpString, flags]);
};
