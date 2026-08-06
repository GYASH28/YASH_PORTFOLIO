import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject, getNextProject, PROFILE } from "@/data/projects";
import {
  IconArrowRight,
  IconArrowLeft,
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
    <main
      className="relative pt-28 pb-32"
      data-project={project.slug}
    >
      {/* Project-colored background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 20%, ${project.accent}15 0%, transparent 60%)`,
        }}
      />
      <div className="fixed inset-0 yg-grid-subtle opacity-15 pointer-events-none" />

      <div className="relative max-w-[1300px] mx-auto px-5 md:px-10">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-meta text-[var(--ink-quiet)] hover:text-[var(--accent-warm)] transition-colors mb-8"
        >
          <IconArrowLeft size={14} />
          ALL WORK
        </Link>

        {/* Hero */}
        <header className="mb-16">
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display text-display-lg leading-none"
              style={{ color: project.accent, opacity: 0.55 }}
            >
              0{project.index}
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-meta text-[var(--ink-quiet)]">
                {project.category.toUpperCase()}
              </span>
              <span className="font-mono text-meta mt-1" style={{ color: project.accent }}>
                STATUS · {project.status.toUpperCase()}
              </span>
            </div>
          </div>
          <h1 className="font-display text-display max-w-[16ch] leading-[0.96]">
            {project.name}
          </h1>
          <p className="font-serif italic text-h3 mt-3" style={{ color: project.accentSoft }}>
            {project.tagline}
          </p>
          <p className="mt-6 max-w-[60ch] text-body-lg text-[var(--ink-soft)]">
            {project.fullDescription}
          </p>
        </header>

        {/* Quick facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 pb-12 border-b border-[var(--border-soft)]">
          {[
            { label: "Role", value: project.role.join(" · ") },
            { label: "Status", value: project.status },
            { label: "Platform", value: project.platform.join(" · ") },
            { label: "Year started", value: project.yearStarted },
          ].map((f) => (
            <div key={f.label}>
              <p className="font-mono text-meta text-[var(--ink-quiet)] mb-2">
                {f.label.toUpperCase()}
              </p>
              <p className="text-small text-[var(--ink-bone)]">{f.value}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout: TOC + content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky TOC */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <p className="font-mono text-meta text-[var(--ink-quiet)] mb-4">CONTENTS</p>
              <ul className="space-y-2">
                {project.caseStudy.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className="text-small text-[var(--ink-soft)] hover:text-[var(--accent-warm)] transition-colors"
                    >
                      <span className="font-mono text-meta text-[var(--ink-quiet)] mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
                <p className="font-mono text-meta text-[var(--ink-quiet)] mb-3">TECHNOLOGIES</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-meta text-[var(--ink-soft)] px-2 py-1 rounded border border-[var(--border-soft)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border-soft)]">
                <p className="font-mono text-meta text-[var(--ink-quiet)] mb-3">LINKS</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-small text-[var(--ink-soft)] hover:text-[var(--accent-warm)] transition-colors"
                  >
                    <IconRepo size={12} />
                    Repository
                    <IconExternal size={10} className="opacity-50" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article className="lg:col-span-9 flex flex-col gap-14">
            {project.caseStudy.map((s, i) => (
              <section key={i} id={`section-${i}`} className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-meta" style={{ color: project.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-[var(--border-strong)]" />
                  <span className="font-mono text-meta text-[var(--ink-quiet)]">
                    {s.heading.toUpperCase()}
                  </span>
                </div>
                <h2 className="font-display text-h2 text-[var(--ink-bone)] mb-5">
                  {s.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-body-lg text-[var(--ink-soft)] leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* Capabilities recap */}
            <section id="capabilities-recap" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-meta" style={{ color: project.accent }}>
                  {String(project.caseStudy.length + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-[var(--border-strong)]" />
                <span className="font-mono text-meta text-[var(--ink-quiet)]">
                  SYSTEM CAPABILITIES
                </span>
              </div>
              <h2 className="font-display text-h2 text-[var(--ink-bone)] mb-6">
                System capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.capabilities.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-4"
                  >
                    <p className="font-display text-small text-[var(--ink-bone)]">{c.label}</p>
                    <p className="text-meta text-[var(--ink-quiet)] mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Links */}
            <section id="links" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-meta" style={{ color: project.accent }}>
                  {String(project.caseStudy.length + 2).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-[var(--border-strong)]" />
                <span className="font-mono text-meta text-[var(--ink-quiet)]">
                  LINKS & REPOSITORY
                </span>
              </div>
              <h2 className="font-display text-h2 text-[var(--ink-bone)] mb-6">
                Explore the system
              </h2>
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="Open"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-3 font-mono text-meta text-[var(--ink-bone)] hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] transition-colors"
                >
                  <IconRepo size={14} />
                  REPOSITORY
                  <IconExternal size={12} className="opacity-50" />
                </a>
              </div>
            </section>
          </article>
        </div>

        {/* Next project */}
        <section className="mt-32 pt-12 border-t border-[var(--border-soft)]">
          <p className="font-mono text-meta text-[var(--ink-quiet)] mb-4">
            NEXT PROJECT · 0{next.index}
          </p>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="Next"
            className="group block"
          >
            <h3 className="font-display text-h1 md:text-display text-[var(--ink-bone)] group-hover:text-[var(--accent-warm)] transition-colors">
              {next.name}
            </h3>
            <p className="font-serif italic text-body-lg mt-2" style={{ color: next.accentSoft }}>
              {next.tagline}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-meta text-[var(--ink-quiet)] group-hover:text-[var(--accent-warm)] transition-colors">
              VIEW CASE STUDY
              <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </section>

        {/* Final CTA */}
        <section className="mt-24 rounded-md border border-[var(--border-strong)] bg-[var(--surface-deep)]/40 p-8 md:p-12 text-center">
          <p className="font-mono text-meta text-[var(--ink-quiet)] mb-4">
            BUILDING SOMETHING SIMILAR?
          </p>
          <h2 className="font-display text-h2 md:text-h1 text-[var(--ink-bone)] max-w-[20ch] mx-auto">
            Let&apos;s make it <span className="text-[var(--accent-warm)]">real</span>.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-3 rounded-full bg-[var(--ink-bone)] text-[var(--bg-base)] px-7 py-4 font-mono text-meta hover:bg-[var(--accent-warm)] transition-colors yg-press"
            >
              EMAIL ME
              <IconArrowRight size={14} />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-7 py-4 font-mono text-meta text-[var(--ink-bone)] hover:border-[var(--accent-warm)] transition-colors"
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
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.shortDescription,
      url: `https://ykg.vercel.app/work/${project.slug}`,
    },
  };
}
