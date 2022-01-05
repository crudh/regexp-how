import { allFlags } from "../constants";
import { Flags } from "../types";

export const flagsStringFromFlags = (flags: Flags): string =>
  allFlags.filter((flag) => flags[flag]).join("");
