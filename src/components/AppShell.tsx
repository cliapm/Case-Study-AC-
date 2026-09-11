import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d2d4f] text-sm font-bold text-white">AC</div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Project Agua Clara</p>
              <p className="text-sm font-medium text-slate-700">Simulation</p>
            </div>
          </Link>
          <nav className="hidden gap-4 text-sm font-medium text-slate-600 md:flex">
            <Link href="/participant/login">Participant</Link>
            <Link href="/facilitator/login">Facilitator</Link>
            <Link href="/facilitator/qr">QR</Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
