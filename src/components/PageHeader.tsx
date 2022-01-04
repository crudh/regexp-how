import { FC } from "react";

export const PageHeader: FC = ({ children }) => (
  <h1 className="pt-6 text-3xl font-bold">{children}</h1>
);
