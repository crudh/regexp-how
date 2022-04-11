import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { RegexpMatchText } from "./RegexpMatchText";
import { matchTextFixtures } from "../fixtures/matchTextFixtures";

for (const fixture of Object.values(matchTextFixtures)) {
  const { name, entries, html } = fixture;

  test(`should render correct html for ${name}`, () => {
    render(<RegexpMatchText matchTextEntries={entries} />);

    const matchText = screen.getByTestId("matchText");
    expect(matchText.innerHTML).toEqual(html);
  });
}
