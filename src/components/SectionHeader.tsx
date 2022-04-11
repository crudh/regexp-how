import { ReactNode } from "react";

export const SectionHeader = ({ children }: { children: ReactNode }) => (
  <h2 className="pb-2">{children}</h2>
);
