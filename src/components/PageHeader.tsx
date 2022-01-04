import { FC } from "react";

export const PageHeader: FC = ({ children }) => (
  <div className="flex justify-center">
    <h1 className="pt-6 text-3xl font-bold">{children}</h1>
  </div>
);
