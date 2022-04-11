import { ReactNode } from "react";

export const Section = ({ children }: { children: ReactNode }) => (
  <div className="p-3">{children}</div>
);
