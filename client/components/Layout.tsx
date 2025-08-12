import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50">
      <Sidebar />
      <main className="ml-72 min-h-screen">{children}</main>
    </div>
  );
}
