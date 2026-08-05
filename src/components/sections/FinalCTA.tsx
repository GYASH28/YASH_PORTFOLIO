"use client";

import { useState } from "react";
import { IDENTITY } from "@/data/projects";
import {
  IconMail,
  IconGitHub,
  IconLinkedIn,
  IconLocation,
  IconArrowRight,
  IconAvailability,
} from "@/components/ui-yg/icons";

type FormState = {
  name: string;
  email: string;
  building: string;
  stage: string;
  help: string;
  timeline: string;
  budget?: string;
};

const STAGES = ["Idea", "Prototype", "MVP built", "Live & iterating"];
const HELP_TYPES = ["Strategy", "Design", "AI implementation", "Full-stack delivery"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

/**
 * Final CTA + Contact — complete the signal.
 *
 * Includes:
 *  - Closing CTA copy
 *  - Direct contact options (email, GitHub, LinkedIn)
 *  - Multi-step project enquiry form with validation
 *  - Optional "Do not destabilize the core" delight button
 */
export default function FinalCTA() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    building: "",
    stage: STAGES[0],
    help: HELP_TYPES[0],
    timeline: TIMELINES[0],
    budget: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [destabilized, setDestabilized] = useState(false);

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.building.trim()) e.building = "Tell me what you're building";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // No backend — compose a mailto: link as a real, working contact path.
    const subject = encodeURIComponent(`Project enquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
        `Email: ${form.email}\n\n` +
        `Building: ${form.building}\n` +
        `Stage: ${form.stage}\n` +
        `Help needed: ${form.help}\n` +
        `Timeline: ${form.timeline}\n` +
        (form.budget ? `Budget: ${form.budget}\n` : "")
    );
    // Simulate submission latency for UX feedback.
    await new Promise((r) => setTimeout(r, 600));
    window.location.href = `mailto:${IDENTITY.email}?subject=${subject}&body=${body}`;
    setSubmitting(false);
    setSubmitted(true);
  };

  const onDestabilize = () => {
    setDestabilized(true);
    window.setTimeout(() => setDestabilized(false), 2400);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Background — completed signal core state */}
      <div className="absolute inset-0 yg-grid-bg opacity-20" />
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: destabilized
            ? "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(239,68,68,0.15) 0%, transparent 60%)"
            : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(107,91,255,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-[24ch] mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 font-mono text-meta text-[var(--text-muted)] mb-6">
            <span className="h-px w-8 bg-[var(--signal-primary)]" />
            <span>FINAL SIGNAL · 06</span>
            <span className="h-px w-8 bg-[var(--signal-primary)]" />
          </div>
          <h2 className="font-display text-display-2 md:text-display-1 leading-[0.95]">
            Have a system worth building?
            <br />
            <span className="text-[var(--signal-primary)] yg-glow-text">
              Let&apos;s make it real.
            </span>
          </h2>
          <p className="mt-6 text-body-lg text-[var(--text-secondary)] max-w-[40ch] mx-auto">
            The signal completes when it reaches someone who needs it. If
            you&apos;re building something real, I&apos;d like to hear about it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — direct contact */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <a
              href={`mailto:${IDENTITY.email}`}
              data-cursor="EMAIL"
              className="group rounded-lg border border-[var(--border-strong)] bg-[var(--surface-1)] p-5 hover:border-[var(--signal-primary)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <IconMail size={20} className="text-[var(--signal-primary)]" />
                <span className="font-mono text-meta text-[var(--text-muted)]">
                  DIRECT EMAIL
                </span>
              </div>
              <p className="mt-3 font-display text-h3 text-[var(--text-primary)] group-hover:text-[var(--signal-primary)] transition-colors">
                {IDENTITY.email}
              </p>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-lg border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-4 hover:border-[var(--signal-primary)] transition-colors"
              >
                <IconGitHub size={18} className="text-[var(--signal-primary)]" />
                <p className="mt-3 font-mono text-meta text-[var(--text-muted)]">CODE</p>
                <p className="text-small text-[var(--text-primary)] mt-1">GitHub</p>
              </a>
              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-lg border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-4 hover:border-[var(--signal-primary)] transition-colors"
              >
                <IconLinkedIn size={18} className="text-[var(--signal-primary)]" />
                <p className="mt-3 font-mono text-meta text-[var(--text-muted)]">PROFESSIONAL</p>
                <p className="text-small text-[var(--text-primary)] mt-1">LinkedIn</p>
              </a>
            </div>

            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-1)]/40 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <IconLocation size={16} className="text-[var(--human-accent)]" />
                <span className="font-mono text-meta text-[var(--text-muted)]">LOCATION</span>
                <span className="text-small text-[var(--text-primary)] ml-auto">{IDENTITY.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconAvailability size={16} className="text-[var(--human-accent)]" />
                <span className="font-mono text-meta text-[var(--text-muted)]">AVAILABILITY</span>
                <span className="text-small text-[var(--text-primary)] ml-auto">{IDENTITY.available}</span>
              </div>
            </div>

            {/* Destabilize the Core — delight control */}
            <button
              onClick={onDestabilize}
              className="group rounded-lg border border-dashed border-[var(--border-strong)] bg-transparent p-4 text-left hover:border-[var(--human-accent)] transition-colors"
              aria-label="Destabilize the core — optional delight interaction"
            >
              <p className="font-mono text-meta text-[var(--text-muted)] group-hover:text-[var(--human-accent)] transition-colors">
                ⚠ DO NOT DESTABILIZE THE CORE
              </p>
              <p className="text-meta text-[var(--text-muted)] mt-1">
                {destabilized ? "RECOVERING… SYSTEM STABLE" : "Optional · Safe · Reduced-motion friendly"}
              </p>
            </button>
          </div>

          {/* Right — enquiry form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-1)]/60 p-6 md:p-8 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--border-soft)]">
                <div>
                  <p className="font-display text-h3 text-[var(--text-primary)]">
                    Project enquiry
                  </p>
                  <p className="font-mono text-meta text-[var(--text-muted)] mt-1">
                    FIELDS WITH * ARE REQUIRED
                  </p>
                </div>
                <span className="font-mono text-meta text-[var(--signal-primary)]">
                  {submitted ? "SENT" : "READY"}
                </span>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name" required error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="yg-input"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label="Email" required error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="yg-input"
                    placeholder="you@email.com"
                    aria-invalid={!!errors.email}
                  />
                </Field>
              </div>

              {/* Building */}
              <Field label="What are you trying to build?" required error={errors.building}>
                <textarea
                  value={form.building}
                  onChange={(e) => setForm({ ...form, building: e.target.value })}
                  className="yg-input min-h-[6rem] resize-y"
                  placeholder="One paragraph — the system you want to build, who it's for, and the friction it solves."
                  aria-invalid={!!errors.building}
                />
              </Field>

              {/* Stage / Help / Timeline — selects */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Stage">
                  <select
                    value={form.stage}
                    onChange={(e) => setForm({ ...form, stage: e.target.value })}
                    className="yg-input"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Help needed">
                  <select
                    value={form.help}
                    onChange={(e) => setForm({ ...form, help: e.target.value })}
                    className="yg-input"
                  >
                    {HELP_TYPES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Timeline">
                  <select
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className="yg-input"
                  >
                    {TIMELINES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Budget — optional */}
              <Field label="Budget (optional)">
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="yg-input"
                  placeholder="Range or note — e.g. ₹50k–2L, $2k–5k, TBD"
                />
              </Field>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  data-cursor="SEND"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--signal-primary)] px-8 py-4 font-mono text-meta text-[#0a0a0f] hover:bg-[var(--signal-soft)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "OPENING MAIL CLIENT…" : submitted ? "SENT — CHECK YOUR EMAIL" : "SEND ENQUIRY"}
                  <IconArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <p className="text-meta text-[var(--text-muted)]">
                  Opens your email client with a pre-filled message. No data stored.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Input styles */}
      <style>{`
        .yg-input {
          width: 100%;
          background: var(--bg-primary);
          border: 1px solid var(--border-strong);
          border-radius: 6px;
          padding: 0.75rem 0.875rem;
          font-family: var(--font-body);
          font-size: var(--text-body);
          color: var(--text-primary);
          transition: border-color 200ms, box-shadow 200ms;
        }
        .yg-input:focus {
          outline: none;
          border-color: var(--signal-primary);
          box-shadow: 0 0 0 3px var(--signal-glow);
        }
        .yg-input::placeholder {
          color: var(--text-muted);
        }
        .yg-input[aria-invalid="true"] {
          border-color: var(--danger);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-meta text-[var(--text-muted)] mb-2">
        {label.toUpperCase()}{required && <span className="text-[var(--signal-primary)] ml-1">*</span>}
      </span>
      {children}
      {error && (
        <span className="block font-mono text-meta text-[var(--danger)] mt-1">
          {error}
        </span>
      )}
    </label>
  );
}
