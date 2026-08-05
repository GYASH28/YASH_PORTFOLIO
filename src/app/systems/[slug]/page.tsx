import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject, getNextProject, IDENTITY } from "@/data/projects";
import {
  IconArrowRight,
  IconExternal,
  IconRepo,
  IconLive,
} from "@/components/ui-yg/icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <main className="relative pt-24 pb-32">
      {/* Background */}
      <div className="fixed inset-0 yg-grid-bg opacity-15 pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 20%, ${project.colorTheme.glow} 0%, transparent 60%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Back link */}
        <Link
          href="/systems"
          className="inline-flex items-center gap-2 font-mono text-meta text-[var(--text-muted)] hover:text-[var(--signal-primary)] transition-colors mb-8"
        >
          ← ALL SYSTEMS
        </Link>

        {/* Hero */}
        <header className="mb-16">
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display text-display-2 leading-none"
              style={{ color: project.colorTheme.primary }}
            >
              0{project.index}
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-meta text-[var(--text-muted)]">
                {project.category.toUpperCase()}
              </span>
              <span
                className="font-mono text-meta mt-1"
                style={{ color: project.colorTheme.primary }}
              >
                STATUS · {project.status.toUpperCase()}
              </span>
            </div>
          </div>
          <h1 className="font-display text-display-2 md:text-display-1 leading-[0.95] max-w-[16ch]">
            {project.name}
          </h1>
          <p
            className="font-mono text-body-lg mt-3"
            style={{ color: project.colorTheme.primary }}
          >
            {project.tagline}
          </p>
          <p className="mt-6 max-w-[60ch] text-body-lg text-[var(--text-secondary)]">
            {project.purpose}
          </p>
        </header>

        {/* Quick facts grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 pb-12 border-b border-[var(--border-soft)]">
          {[
            { label: "Role", value: project.role },
            { label: "Status", value: project.status },
            { label: "Platform", value: project.platform.join(" · ") },
            { label: "Category", value: project.category },
          ].map((f) => (
            <div key={f.label}>
              <p className="font-mono text-meta text-[var(--text-muted)] mb-2">
                {f.label.toUpperCase()}
              </p>
              <p className="text-small text-[var(--text-primary)]">{f.value}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout: TOC + content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky TOC desktop */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <p className="font-mono text-meta text-[var(--text-muted)] mb-4">
                CONTENTS
              </p>
              <ul className="space-y-2">
                {project.caseStudy.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className="text-small text-[var(--text-secondary)] hover:text-[var(--signal-primary)] transition-colors"
                    >
                      <span className="font-mono text-meta text-[var(--text-muted)] mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Tech badges */}
              <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
                <p className="font-mono text-meta text-[var(--text-muted)] mb-3">
                  TECHNOLOGIES
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-meta text-[var(--text-secondary)] px-2 py-1 rounded border border-[var(--border-soft)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-6 pt-6 border-t border-[var(--border-soft)]">
                <p className="font-mono text-meta text-[var(--text-muted)] mb-3">
                  LINKS
                </p>
                <div className="flex flex-col gap-2">
                  {project.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-small text-[var(--text-secondary)] hover:text-[var(--signal-primary)] transition-colors"
                    >
                      {l.kind === "repository" ? <IconRepo size={12} /> : <IconLive size={12} />}
                      {l.label}
                      <IconExternal size={10} className="text-[var(--text-muted)]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article className="lg:col-span-9 flex flex-col gap-16">
            {project.caseStudy.map((s, i) => (
              <section
                key={i}
                id={`section-${i}`}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-mono text-meta"
                    style={{ color: project.colorTheme.primary }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-[var(--border-strong)]" />
                  <span className="font-mono text-meta text-[var(--text-muted)]">
                    {s.heading.toUpperCase()}
                  </span>
                </div>
                <h2 className="font-display text-h2 text-[var(--text-primary)] mb-6">
                  {s.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-body-lg text-[var(--text-secondary)] leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* Capabilities recap */}
            <section id="capabilities-recap" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-meta"
                  style={{ color: project.colorTheme.primary }}
                >
                  {String(project.caseStudy.length + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-[var(--border-strong)]" />
                <span className="font-mono text-meta text-[var(--text-muted)]">
                  SYSTEM CAPABILITIES
                </span>
              </div>
              <h2 className="font-display text-h2 text-[var(--text-primary)] mb-6">
                System capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.capabilities.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-4"
                  >
                    <p className="font-display text-small text-[var(--text-primary)]">
                      {c.label}
                    </p>
                    <p className="text-meta text-[var(--text-muted)] mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Live links / repo */}
            <section id="links" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-meta"
                  style={{ color: project.colorTheme.primary }}
                >
                  {String(project.caseStudy.length + 2).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-[var(--border-strong)]" />
                <span className="font-mono text-meta text-[var(--text-muted)]">
                  LINKS & REPOSITORY
                </span>
              </div>
              <h2 className="font-display text-h2 text-[var(--text-primary)] mb-6">
                Explore the system
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-3 font-mono text-meta text-[var(--text-primary)] hover:border-[var(--signal-primary)] hover:bg-[var(--signal-soft)]/10 transition-colors"
                  >
                    {l.kind === "repository" ? <IconRepo size={14} /> : <IconLive size={14} />}
                    {l.label.toUpperCase()}
                    <IconExternal size={12} className="text-[var(--text-muted)]" />
                  </a>
                ))}
              </div>
            </section>
          </article>
        </div>

        {/* Next project */}
        <section className="mt-32 pt-12 border-t border-[var(--border-soft)]">
          <p className="font-mono text-meta text-[var(--text-muted)] mb-4">
            NEXT SYSTEM · 0{next.index}
          </p>
          <Link
            href={`/systems/${next.slug}`}
            className="group block"
          >
            <h3 className="font-display text-h1 md:text-display-2 text-[var(--text-primary)] group-hover:text-[var(--signal-primary)] transition-colors">
              {next.name}
            </h3>
            <p
              className="font-mono text-body-lg mt-2"
              style={{ color: next.colorTheme.primary }}
            >
              {next.tagline}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-meta text-[var(--text-muted)] group-hover:text-[var(--signal-primary)] transition-colors">
              VIEW CASE STUDY
              <IconArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        </section>

        {/* Final CTA strip */}
        <section className="mt-24 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-1)]/40 p-8 md:p-12 text-center">
          <p className="font-mono text-meta text-[var(--text-muted)] mb-4">
            BUILDING SOMETHING SIMILAR?
          </p>
          <h2 className="font-display text-h2 md:text-h1 text-[var(--text-primary)] max-w-[20ch] mx-auto">
            Let&apos;s make it real.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${IDENTITY.email}`}
              className="inline-flex items-center gap-3 rounded-full bg-[var(--signal-primary)] px-7 py-4 font-mono text-meta text-[#0a0a0f] hover:bg-[var(--signal-soft)] transition-colors"
            >
              EMAIL ME
              <IconArrowRight size={14} />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-7 py-4 font-mono text-meta text-[var(--text-primary)] hover:border-[var(--signal-primary)] transition-colors"
            >
              PROJECT ENQUIRY
              <IconArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.purpose,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.purpose,
      url: `https://ykg.vercel.app/systems/${project.slug}`,
    },
  };
}
