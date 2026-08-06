import Link from "next/link";
import { IconArrowLeft } from "@/components/ui-yg/icons";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 yg-grid-subtle opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245, 168, 91, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center px-6">
        <p className="font-mono text-meta text-[var(--ink-quiet)] mb-4">
          <span className="text-[var(--accent-warm)]">●</span> 404 · Not Found
        </p>
        <h1 className="font-display text-display-xl leading-[0.92] mb-6">
          <span className="block">This page</span>
          <span className="block font-serif italic font-normal text-[var(--ink-soft)]">
            doesn&apos;t exist
          </span>
          <span className="block">yet.</span>
        </h1>
        <p className="text-body-lg text-[var(--ink-soft)] max-w-[44ch] mx-auto mb-10">
          Like a product before it&apos;s built. Let&apos;s get you back to the work that does exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink-bone)] text-[var(--bg-base)] px-6 py-3 font-mono text-meta hover:bg-[var(--accent-warm)] transition-colors yg-press"
          >
            <IconArrowLeft size={12} />
            BACK TO HOME
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 font-mono text-meta text-[var(--ink-bone)] hover:border-[var(--accent-warm)] transition-colors"
          >
            BROWSE WORK
          </Link>
        </div>
      </div>
    </main>
  );
}
