import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { matchTextFixtures } from "../fixtures/matchTextFixtures";
import { useMatchTextEntries } from "./useMatchTextEntries";

for (const fixture of Object.values(matchTextFixtures)) {
  const { name, regexp, text, entries } = fixture;

  test(`should return correct entries for ${name}`, () => {
    const { result } = renderHook(() => useMatchTextEntries(text, regexp));

    expect(result.current).toEqual(entries);
  });
}
