import { renderHook } from "@testing-library/react-hooks";
import { useMatchTextEntries } from "./useMatchTextEntries";

test("should return empty list for text and undefined regexp", () => {
  const text = "asd";

  const { result } = renderHook(() => useMatchTextEntries(text, undefined));

  expect(result.current).toEqual([]);
});

describe("global flag", () => {
  test("should return correct entries for empty text and no match", () => {
    const text = "";

    const { result } = renderHook(() =>
      useMatchTextEntries(text, new RegExp("", "g"))
    );

    expect(result.current).toEqual([{ type: "newLine" }]);
  });

  test("should return correct entries for line and no match", () => {
    const text = "asd";

    const { result } = renderHook(() =>
      useMatchTextEntries(text, new RegExp("", "g"))
    );

    expect(result.current).toEqual([{ type: "text", text: "asd" }]);
  });

  test("should return correct entries for entire line being a match", () => {
    const text = "asd";

    const { result } = renderHook(() =>
      useMatchTextEntries(text, new RegExp("asd", "g"))
    );

    expect(result.current).toEqual([
      { type: "matchStart" },
      { type: "text", text: "asd" },
      { type: "matchEnd" },
      { type: "newLine" },
    ]);
  });

  test("should return correct entries for line and match", () => {
    const text = "asd xxx asd";

    const { result } = renderHook(() =>
      useMatchTextEntries(text, new RegExp("xxx", "g"))
    );

    expect(result.current).toEqual([
      { type: "text", text: "asd " },
      { type: "matchStart" },
      { type: "text", text: "xxx" },
      { type: "matchEnd" },
      { type: "text", text: " asd" },
    ]);
  });

  test("should return correct entries for line and multiple matches", () => {
    const text = "asd xxx asdxxx";

    const { result } = renderHook(() =>
      useMatchTextEntries(text, new RegExp("xxx", "g"))
    );

    expect(result.current).toEqual([
      { type: "text", text: "asd " },
      { type: "matchStart" },
      { type: "text", text: "xxx" },
      { type: "matchEnd" },
      { type: "text", text: " asd" },
      { type: "matchStart" },
      { type: "text", text: "xxx" },
      { type: "matchEnd" },
      { type: "newLine" },
    ]);
  });

  test("should return correct entries for multiple lines and match", () => {
    const text = `aaa
	bbb
	123
	ccc`;

    const { result } = renderHook(() =>
      useMatchTextEntries(text, new RegExp("\\d{3}", "g"))
    );

    expect(result.current).toEqual([
      { type: "text", text: "aaa" },
      { type: "newLine" },
      { type: "text", text: "\tbbb" },
      { type: "newLine" },
      { type: "text", text: "\t" },
      { type: "matchStart" },
      { type: "text", text: "123" },
      { type: "matchEnd" },
      { type: "newLine" },
      { type: "text", text: "\tccc" },
    ]);
  });

  test("should return correct entries for multiple lines and multiple matches", () => {
    const text = `aaa
bbb
123
ccc
999`;

    const { result } = renderHook(() =>
      useMatchTextEntries(text, new RegExp("\\d{3}", "g"))
    );

    expect(result.current).toEqual([
      { type: "text", text: "aaa" },
      { type: "newLine" },
      { type: "text", text: "bbb" },
      { type: "newLine" },
      { type: "matchStart" },
      { type: "text", text: "123" },
      { type: "matchEnd" },
      { type: "newLine" },
      { type: "text", text: "ccc" },
      { type: "newLine" },
      { type: "matchStart" },
      { type: "text", text: "999" },
      { type: "matchEnd" },
      { type: "newLine" },
    ]);
  });

  test("should return correct entries for multiple empty lines and no match", () => {
    const text = `



`;

    const { result } = renderHook(() =>
      useMatchTextEntries(text, new RegExp("", "g"))
    );

    expect(result.current).toEqual([
      { type: "newLine" },
      { type: "newLine" },
      { type: "newLine" },
    ]);
  });
});
