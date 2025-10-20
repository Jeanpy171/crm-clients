import type { ReactNode } from "react";
import { NavBar } from "../components/navbar/NavBar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      <main className="p-3">{children}</main>;
    </div>
  );
};
