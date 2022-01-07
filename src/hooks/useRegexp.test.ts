import { renderHook } from "@testing-library/react-hooks";
import { useRegexp } from "./useRegexp";

test("should work with an empty regexp", () => {
  const { result } = renderHook(() => useRegexp("", { g: true, i: false }));

  const [regexp, errorMessage] = result.current;

  expect(errorMessage).toBeUndefined();
  expect(regexp).toBeDefined();
});

test("should not work with an incomplete regexp", () => {
  const { result } = renderHook(() => useRegexp("\\", { g: true, i: false }));

  const [regexp, errorMessage] = result.current;

  expect(errorMessage).toBeDefined();
  expect(regexp).toBeUndefined();

  expect(errorMessage?.includes("Invalid regular expression")).toEqual(true);
});

test("should work with an normal regexp", () => {
  const { result } = renderHook(() =>
    useRegexp("\\d{3}", { g: true, i: false })
  );

  const [regexp, errorMessage] = result.current;

  expect(errorMessage).toBeUndefined();
  expect(regexp).toBeDefined();
});

test("should work with an normal regexp and ignore case", () => {
  const { result } = renderHook(() =>
    useRegexp("\\d{3}", { g: true, i: true })
  );

  const [regexp, errorMessage] = result.current;

  expect(errorMessage).toBeUndefined();
  expect(regexp).toBeDefined();
});
