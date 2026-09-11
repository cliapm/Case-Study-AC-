"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FacilitatorLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const configured = process.env.NEXT_PUBLIC_FACILITATOR_PASSWORD ?? "admin123";
    if (password === configured) {
      router.push("/facilitator/dashboard");
      return;
    }
    setError("Incorrect facilitator password.");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Facilitator access</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0d2d4f]">Project Agua Clara</h1>
        <p className="mt-2 text-sm text-slate-500">Confidential simulation control panel</p>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none ring-0 transition focus:border-[#0d2d4f]"
              placeholder="Enter facilitator password"
            />
          </div>

          {error ? <p className="text-sm font-medium text-[#9e1b2b]">{error}</p> : null}

          <button type="submit" className="w-full rounded-xl bg-[#9e1b2b] px-4 py-3 font-semibold text-white hover:bg-[#7d1524]">
            Enter Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-medium text-[#0d2d4f] underline">Back to home</Link>
        </div>
      </div>
    </main>
  );
}
