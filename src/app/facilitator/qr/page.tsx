"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QrPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  useEffect(() => {
    const target = `${window.location.origin}/participant/login`;
    QRCode.toCanvas(canvasRef.current, target, { width: 220, margin: 2 }, (error: Error | null | undefined) => {
      if (!error) {
        const url = canvasRef.current?.toDataURL("image/png") ?? "";
        setDownloadUrl(url);
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">QR access</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0d2d4f]">Participant Login QR</h1>
        <div className="mt-6 flex justify-center rounded-2xl bg-slate-50 p-4">
          <canvas ref={canvasRef} />
        </div>
        <div className="mt-6 flex justify-center">
          {downloadUrl ? (
            <a href={downloadUrl} download="project-agua-clara-qr.png" className="rounded-xl bg-[#9e1b2b] px-5 py-3 font-semibold text-white">Download QR image</a>
          ) : null}
        </div>
      </div>
    </main>
  );
}
