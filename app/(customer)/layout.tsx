import { Header } from "@/components/layout/Header";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header showProfile />
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}
