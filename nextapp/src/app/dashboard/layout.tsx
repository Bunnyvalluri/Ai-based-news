"use client";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#f6f6f8] dark:bg-[#101622] min-h-screen font-sans text-slate-900 dark:text-slate-100">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
