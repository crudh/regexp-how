import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import {
  useRegexpExamples,
  DEFAULT_MAX_NUMBER_OF_EXAMPLES,
} from "./useRegexpExamples";

const containsDuplicates = (list: string[]): boolean =>
  list.find((item) => list.filter((item2) => item2 === item).length !== 1) !==
  undefined;

test("should generate no examples for undefined regexp", () => {
  const { result } = renderHook(() => useRegexpExamples(undefined));

  expect(result.current).toEqual([]);
});

test("should generate one example for a regexp that only has one variation", () => {
  const { result } = renderHook(() =>
    useRegexpExamples(new RegExp("abc", "g"))
  );

  expect(result.current).toEqual(["abc"]);
});

test("should generate multiple examples for a regexp with many variations", () => {
  const { result } = renderHook(() =>
    useRegexpExamples(new RegExp(/\d{5}/, "g"))
  );

  expect(
    result.current.length > 0 &&
      result.current.length <= DEFAULT_MAX_NUMBER_OF_EXAMPLES
  ).toBe(true);
});

test("should not generate any examples if maxNumberOfExamples is 0", () => {
  const { result } = renderHook(() =>
    useRegexpExamples(new RegExp(/\d{5}/, "g"), 0)
  );

  const examples = result.current;

  expect(examples.length).toBe(0);
  expect(containsDuplicates(examples)).toBe(false);
});

test.each([...Array.from(Array(10).keys()).map((key) => key + 1)])(
  "should generate at least 1 and at most max examples if max is %i",
  (maxNumberOfExamples) => {
    const { result } = renderHook(() =>
      useRegexpExamples(new RegExp(/\d{5}/, "g"), maxNumberOfExamples)
    );

    const examples = result.current;

    expect(examples.length > 0 && examples.length <= maxNumberOfExamples).toBe(
      true
    );
    expect(containsDuplicates(examples)).toBe(false);
  }
);
