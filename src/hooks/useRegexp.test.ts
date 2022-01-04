import { renderHook } from "@testing-library/react-hooks";
import { useRegexp } from "./useRegexp";

const REGEXP = 0;
const ERROR_MESSAGE = 1;

test("should work with an empty regexp", () => {
  const { result } = renderHook(() => useRegexp("", "g"));

  expect(result.current[ERROR_MESSAGE]).toBeUndefined();
  expect(result.current[REGEXP]).toBeDefined();
});

test("should not work with an incomplete regexp", () => {
  const { result } = renderHook(() => useRegexp("\\", "g"));

  expect(result.current[ERROR_MESSAGE]).toBeDefined();
  expect(result.current[REGEXP]).toBeUndefined();

  expect(
    result.current[ERROR_MESSAGE]?.includes("Invalid regular expression")
  ).toEqual(true);
});
