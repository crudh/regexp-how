import { FC } from "react";

export const PageContent: FC = ({ children }) => (
  <div className="flex flex-col flex-grow p-2 md:p-8">{children}</div>
);
