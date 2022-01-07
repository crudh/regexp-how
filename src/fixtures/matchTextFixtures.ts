import { MatchTextEntry } from "../types";

export const matchTextFixtures: Record<
  string,
  {
    name: string;
    regexp: RegExp | undefined;
    text: string;
    entries: MatchTextEntry[];
    html: string;
  }
> = {
  lineUndefinedRegexp: {
    name: "line and undefined regexp",
    regexp: undefined,
    text: "asd",
    entries: [],
    html: "",
  },
  emptyLineNoMatch: {
    name: "empty line and no match",
    regexp: new RegExp("xxx", "g"),
    text: "",
    entries: [{ type: "newLine" }],
    html: `<div class="block-line">&nbsp;</div>`,
  },
  lineNoMatch: {
    name: "line and no match",
    regexp: new RegExp("xxx", "g"),
    text: "asd",
    entries: [{ type: "text", text: "asd" }],
    html: `<div class="block-line"><span class="block-text">asd</span>&nbsp;</div>`,
  },
  lineNoMatchCasing: {
    name: "line and no match due to different casing",
    regexp: new RegExp("xxx", "g"),
    text: "XXX",
    entries: [{ type: "text", text: "XXX" }],
    html: `<div class="block-line"><span class="block-text">XXX</span>&nbsp;</div>`,
  },
  lineMatch: {
    name: "line and match",
    regexp: new RegExp("xxx", "g"),
    text: "asd xxx asd",
    entries: [
      { type: "text", text: "asd " },
      { type: "matchStart" },
      { type: "text", text: "xxx" },
      { type: "matchEnd" },
      { type: "text", text: " asd" },
    ],
    html: `<div class="block-line"><span class="block-text">asd </span><div class="block-match"><span class="block-text">xxx</span></div><span class="block-text"> asd</span>&nbsp;</div>`,
  },
  entireLineMatch: {
    name: "entire line being a match",
    regexp: new RegExp("asd", "g"),
    text: "asd",
    entries: [
      { type: "matchStart" },
      { type: "text", text: "asd" },
      { type: "matchEnd" },
      { type: "newLine" },
    ],
    html: `<div class="block-line"><div class="block-match"><span class="block-text">asd</span></div>&nbsp;</div>`,
  },
  lineMultipleMatches: {
    name: "line and multiple matches",
    regexp: new RegExp("xxx", "g"),
    text: "asd xxx asdxxx",
    entries: [
      { type: "text", text: "asd " },
      { type: "matchStart" },
      { type: "text", text: "xxx" },
      { type: "matchEnd" },
      { type: "text", text: " asd" },
      { type: "matchStart" },
      { type: "text", text: "xxx" },
      { type: "matchEnd" },
      { type: "newLine" },
    ],
    html: `<div class="block-line"><span class="block-text">asd </span><div class="block-match"><span class="block-text">xxx</span></div><span class="block-text"> asd</span><div class="block-match"><span class="block-text">xxx</span></div>&nbsp;</div>`,
  },
  multipleLinesMatch: {
    name: "multiple lines and match",
    regexp: new RegExp("\\d{3}", "g"),
    text: `aaa
bbb
123
ccc`,
    entries: [
      { type: "text", text: "aaa" },
      { type: "newLine" },
      { type: "text", text: "bbb" },
      { type: "newLine" },
      { type: "matchStart" },
      { type: "text", text: "123" },
      { type: "matchEnd" },
      { type: "newLine" },
      { type: "text", text: "ccc" },
    ],
    html: `<div class="block-line"><span class="block-text">aaa</span>&nbsp;</div><div class="block-line"><span class="block-text">bbb</span>&nbsp;</div><div class="block-line"><div class="block-match"><span class="block-text">123</span></div>&nbsp;</div><div class="block-line"><span class="block-text">ccc</span>&nbsp;</div>`,
  },
  multipleLinesMultipleMatches: {
    name: "multiple lines and multiple matches",
    regexp: new RegExp("\\d{3}", "g"),
    text: `aaa
bbb
123
ccc
999`,
    entries: [
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
    ],
    html: `<div class="block-line"><span class="block-text">aaa</span>&nbsp;</div><div class="block-line"><span class="block-text">bbb</span>&nbsp;</div><div class="block-line"><div class="block-match"><span class="block-text">123</span></div>&nbsp;</div><div class="block-line"><span class="block-text">ccc</span>&nbsp;</div><div class="block-line"><div class="block-match"><span class="block-text">999</span></div>&nbsp;</div>`,
  },
  multipleLinesMatchOverMultipleLines: {
    name: "multiple lines and a match over multiple lines",
    regexp: new RegExp("asd\\nasd", "g"),
    text: `asd
asd`,
    entries: [
      { type: "matchStart" },
      { type: "text", text: "asd" },
      { type: "newLine" },
      { type: "text", text: "asd" },
      { type: "matchEnd" },
      { type: "newLine" },
    ],
    html: `<div class="block-line"><div class="block-match"><span class="block-text">asd</span></div>&nbsp;</div><div class="block-line"><div class="block-match"><span class="block-text">asd</span></div>&nbsp;</div>`,
  },
  multipleEmptyLinesNoMatch: {
    name: "multiple empty lines and no match",
    regexp: new RegExp("", "g"),
    text: `



`,
    entries: [{ type: "newLine" }, { type: "newLine" }, { type: "newLine" }],
    html: `<div class="block-line">&nbsp;</div><div class="block-line">&nbsp;</div><div class="block-line">&nbsp;</div>`,
  },
  ignoreCaseLineMatch: {
    name: "line and match due to ingore case",
    regexp: new RegExp("xxx", "gi"),
    text: "XXX",
    entries: [
      { type: "matchStart" },
      { text: "XXX", type: "text" },
      { type: "matchEnd" },
      { type: "newLine" },
    ],
    html: `<div class="block-line"><div class="block-match"><span class="block-text">XXX</span></div>&nbsp;</div>`,
  },
  ignoreCaseLineMultipleMatches: {
    name: "line and multiple matches due to exact match and ignore case match",
    regexp: new RegExp("xxx", "gi"),
    text: "asd XXX asd xxx",
    entries: [
      { type: "text", text: "asd " },
      { type: "matchStart" },
      { type: "text", text: "XXX" },
      { type: "matchEnd" },
      { type: "text", text: " asd " },
      { type: "matchStart" },
      { type: "text", text: "xxx" },
      { type: "matchEnd" },
      { type: "newLine" },
    ],
    html: `<div class="block-line"><span class="block-text">asd </span><div class="block-match"><span class="block-text">XXX</span></div><span class="block-text"> asd </span><div class="block-match"><span class="block-text">xxx</span></div>&nbsp;</div>`,
  },
  nonGlobalIgnoreCaseLineMatch: {
    name: "non global line and match due to ingore case",
    regexp: new RegExp("xxx", "i"),
    text: "XXX",
    entries: [
      { type: "matchStart" },
      { text: "XXX", type: "text" },
      { type: "matchEnd" },
      { type: "newLine" },
    ],
    html: `<div class="block-line"><div class="block-match"><span class="block-text">XXX</span></div>&nbsp;</div>`,
  },
  nonGlobalIgnoreCaseLineMatchAndNoMatch: {
    name: "line and matches due to ignore case match",
    regexp: new RegExp("xxx", "i"),
    text: "asd XXX asd xxx",
    entries: [
      { type: "text", text: "asd " },
      { type: "matchStart" },
      { type: "text", text: "XXX" },
      { type: "matchEnd" },
      { type: "text", text: " asd xxx" },
    ],
    html: `<div class="block-line"><span class="block-text">asd </span><div class="block-match"><span class="block-text">XXX</span></div><span class="block-text"> asd xxx</span>&nbsp;</div>`,
  },
  nonGlobalLineMatch: {
    name: "non global line and match",
    regexp: new RegExp("XXX", ""),
    text: "XXX",
    entries: [
      { type: "matchStart" },
      { text: "XXX", type: "text" },
      { type: "matchEnd" },
      { type: "newLine" },
    ],
    html: `<div class="block-line"><div class="block-match"><span class="block-text">XXX</span></div>&nbsp;</div>`,
  },
  nonGlobalLineMatchAndNoMatch: {
    name: "non global line and match",
    regexp: new RegExp("xxx", ""),
    text: "asd XXX asd xxx",
    entries: [
      { type: "text", text: "asd XXX asd " },
      { type: "matchStart" },
      { type: "text", text: "xxx" },
      { type: "matchEnd" },
      { type: "newLine" },
    ],
    html: `<div class="block-line"><span class="block-text">asd XXX asd </span><div class="block-match"><span class="block-text">xxx</span></div>&nbsp;</div>`,
  },
};
