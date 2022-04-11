import { ReactNode } from "react";

export const PageHeader = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-center">
    <h1 className="pt-6 text-3xl font-bold">{children}</h1>
  </div>
);
