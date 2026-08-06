"use client";

import { useState } from "react";
import { PROFILE } from "@/data/projects";
import {
  IconMail,
  IconGitHub,
  IconLinkedIn,
  IconLocation,
  IconArrowRight,
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
 * Contact — final invitation, not a generic form block.
 *
 * Multi-step enquiry form with real validation. Composes a mailto: link
 * as a working contact path (no backend).
 */
export default function Contact() {
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
    await new Promise((r) => setTimeout(r, 600));
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Background — warmer than other sections, celebratory */}
      <div className="absolute inset-0 yg-grid-subtle opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245, 168, 91, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center max-w-[24ch] mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 font-mono text-meta text-[var(--ink-quiet)] mb-6">
            <span className="h-px w-8 bg-[var(--accent-warm)]" />
            <span>Contact · Final Invitation</span>
            <span className="h-px w-8 bg-[var(--accent-warm)]" />
          </div>
          <h2 className="font-display text-display leading-[0.96]">
            <span className="block">Have an ambitious</span>
            <span className="block">
              <span className="font-serif italic font-normal text-[var(--ink-soft)]">product</span> in mind?
            </span>
            <span className="block text-[var(--accent-warm)]">Let&apos;s make it real.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — direct contact */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              data-cursor="Email"
              className="group rounded-md border border-[var(--border-strong)] bg-[var(--surface-deep)] p-5 hover:border-[var(--accent-warm)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <IconMail size={18} className="text-[var(--accent-warm)]" />
                <span className="font-mono text-meta text-[var(--ink-quiet)]">DIRECT EMAIL</span>
              </div>
              <p className="mt-3 font-display text-h3 text-[var(--ink-bone)] group-hover:text-[var(--accent-warm)] transition-colors">
                {PROFILE.email}
              </p>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-4 hover:border-[var(--accent-warm)] transition-colors"
              >
                <IconGitHub size={16} className="text-[var(--accent-warm)]" />
                <p className="mt-3 font-mono text-meta text-[var(--ink-quiet)]">CODE</p>
                <p className="text-small text-[var(--ink-bone)] mt-1">GitHub</p>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-4 hover:border-[var(--accent-warm)] transition-colors"
              >
                <IconLinkedIn size={16} className="text-[var(--accent-warm)]" />
                <p className="mt-3 font-mono text-meta text-[var(--ink-quiet)]">PROFESSIONAL</p>
                <p className="text-small text-[var(--ink-bone)] mt-1">LinkedIn</p>
              </a>
            </div>

            <div className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/40 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <IconLocation size={14} className="text-[var(--accent-warm)]" />
                <span className="font-mono text-meta text-[var(--ink-quiet)]">LOCATION</span>
                <span className="text-small text-[var(--ink-bone)] ml-auto">{PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)] yg-pulse" />
                <span className="font-mono text-meta text-[var(--ink-quiet)]">AVAILABILITY</span>
                <span className="text-small text-[var(--ink-bone)] ml-auto">{PROFILE.availability}</span>
              </div>
            </div>

            <p className="font-serif italic text-body text-[var(--ink-soft)] leading-relaxed pt-2">
              I read every enquiry. If your idea is ambitious and your timeline is real, I&apos;ll respond.
            </p>
          </div>

          {/* Right — enquiry form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-deep)]/60 p-6 md:p-8 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--border-soft)]">
                <div>
                  <p className="font-display text-h3 text-[var(--ink-bone)]">Project enquiry</p>
                  <p className="font-mono text-meta text-[var(--ink-quiet)] mt-1">FIELDS WITH * ARE REQUIRED</p>
                </div>
                <span className="font-mono text-meta text-[var(--accent-warm)]">
                  {submitted ? "SENT" : "READY"}
                </span>
              </div>

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

              <Field label="What are you trying to build?" required error={errors.building}>
                <textarea
                  value={form.building}
                  onChange={(e) => setForm({ ...form, building: e.target.value })}
                  className="yg-input min-h-[6rem] resize-y"
                  placeholder="One paragraph — the product you want to build, who it's for, and the friction it solves."
                  aria-invalid={!!errors.building}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Current stage">
                  <select
                    value={form.stage}
                    onChange={(e) => setForm({ ...form, stage: e.target.value })}
                    className="yg-input"
                  >
                    {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="What help do you need?">
                  <select
                    value={form.help}
                    onChange={(e) => setForm({ ...form, help: e.target.value })}
                    className="yg-input"
                  >
                    {HELP_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Timeline">
                  <select
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className="yg-input"
                  >
                    {TIMELINES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Budget (optional)">
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="yg-input"
                  placeholder="Range or note — e.g. ₹50k–2L, $2k–5k, TBD"
                />
              </Field>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  data-cursor="Send"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--ink-bone)] text-[var(--bg-base)] px-8 py-4 font-mono text-meta hover:bg-[var(--accent-warm)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors yg-press"
                >
                  {submitting ? "OPENING MAIL CLIENT…" : submitted ? "SENT — CHECK YOUR EMAIL" : "SEND ENQUIRY"}
                  <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-meta text-[var(--ink-quiet)]">
                  Opens your email client with a pre-filled message. No data stored.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .yg-input {
          width: 100%;
          background: var(--bg-base);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          padding: 0.7rem 0.9rem;
          font-family: var(--font-body);
          font-size: var(--text-body);
          color: var(--ink-bone);
          transition: border-color 200ms, box-shadow 200ms;
        }
        .yg-input:focus {
          outline: none;
          border-color: var(--accent-warm);
          box-shadow: 0 0 0 3px var(--accent-warm-soft);
        }
        .yg-input::placeholder { color: var(--ink-quiet); }
        .yg-input[aria-invalid="true"] { border-color: var(--destructive); }
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
      <span className="block font-mono text-meta text-[var(--ink-quiet)] mb-2">
        {label.toUpperCase()}{required && <span className="text-[var(--accent-warm)] ml-1">*</span>}
      </span>
      {children}
      {error && (
        <span className="block font-mono text-meta text-[var(--destructive)] mt-1">{error}</span>
      )}
    </label>
  );
}
