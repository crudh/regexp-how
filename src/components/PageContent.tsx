import { ReactNode } from "react";

export const PageContent = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col flex-grow p-2 md:p-8">{children}</div>
);
