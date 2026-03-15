import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container-app grid gap-6 py-8 lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
