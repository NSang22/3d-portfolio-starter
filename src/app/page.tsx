import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HeroAnimations from "@/components/HeroAnimations";
import ProjectGrid from "@/components/ProjectGrid";
import SignalHeroLoader from "@/components/SignalHeroLoader";
import StaticWaveformSVG from "@/components/StaticWaveformSVG";
import { projects } from "@/data/projects";
import { DOMAIN_COLORS, type Domain } from "@/data/domainColors";

const navItems = [
  { href: "#selected-work", label: "Selected Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const timeline: {
  role: string;
  org: string;
  span: string;
  domain: Domain;
  impact: string;
}[] = [
  {
    role: "AI and Backend Development Intern",
    org: "Florida Community Innovation Foundation",
    span: "2024 — Present",
    domain: "civic",
    impact:
      "Owns backend direction for the Florida Resource Map, translating product requirements into scalable systems and leading a six-person engineering effort.",
  },
  {
    role: "Scrum Master and Team Lead",
    org: "Project ALIGN, University of Florida",
    span: "2025",
    domain: "ml",
    impact:
      "Led modeling workflow for literacy-alignment scoring, combining clustering, XGBoost, and evaluation design for large batches of AI-generated stories.",
  },
  {
    role: "Research Intern",
    org: "Florida International University",
    span: "2023 — 2024",
    domain: "biomedical",
    impact:
      "Bioinformatics-focused AI research, contributing to domain-tuned language models and biological sequence analysis.",
  },
];

const card =
  "border border-white/5 bg-[#0d1117] transition-colors duration-300 hover:border-[#06b6d4]";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050810] text-white">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[rgba(5,8,16,0.95)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.35em] text-[#8892a4] transition-colors hover:text-white"
          >
            Nikhil Sangamkar
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8892a4] transition-colors hover:text-[#06b6d4]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:nsangamkar1222@gmail.com"
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition-colors duration-300 hover:border-[#06b6d4] hover:text-[#06b6d4]"
          >
            Say Hello
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 hidden md:block">
          <SignalHeroLoader />
        </div>

        <div className="absolute inset-0 md:hidden">
          <StaticWaveformSVG />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-20 z-[11] w-20 -translate-x-1/2 sm:top-24 sm:w-24 md:top-28 md:w-28">
          <div className="relative aspect-square overflow-hidden border border-white/5 bg-[#0a0f1a]">
            <Image
              src="/images/nik_headshot-modified.png"
              alt="Portrait of Nikhil Sangamkar"
              width={112}
              height={112}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-end px-6 py-16 md:px-10">
          <div className="w-full max-w-lg md:w-[40%]">
            <HeroAnimations />
          </div>
        </div>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-[#8892a4] opacity-40">
          ↓ follow the signal
        </p>
      </section>

      <section
        id="selected-work"
        className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-[0.45fr_1fr]">
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.3em] text-[#8892a4]"
              style={{ opacity: 0.55 }}
            >
              02 — Output
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-4xl leading-none md:text-5xl lg:text-6xl">
              Products built like systems, not demos.
            </h2>
          </div>

          <ProjectGrid projects={projects} />
        </div>
      </section>

      <section
        id="experience"
        className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24"
      >
        <div className={`p-6 md:p-10 ${card}`}>
          <div className="grid gap-12 lg:grid-cols-[0.45fr_1fr]">
            <div>
              <p
                className="text-[9px] uppercase tracking-[0.3em] text-[#8892a4]"
                style={{ opacity: 0.55 }}
              >
                03 — Experience
              </p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-4xl leading-none md:text-5xl lg:text-6xl">
                Shipping, leading, researching.
              </h2>
            </div>

            <div className="space-y-6">
              {timeline.map((item) => (
                <div
                  key={item.role}
                  className="grid grid-cols-1 gap-5 border-b border-white/5 pb-6 last:border-b-0 last:pb-0 md:grid-cols-[0.34fr_1fr]"
                >
                  <div className="flex gap-3">
                    <div
                      className="w-[3px] shrink-0 self-stretch"
                      style={{ background: DOMAIN_COLORS[item.domain] }}
                    />
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.28em] text-[#06b6d4]">
                        {item.span}
                      </p>
                      <p className="mt-1 text-sm text-[#8892a4]">{item.org}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl">{item.role}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#8892a4]">
                      {item.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-16 md:px-10 md:pb-36 md:pt-24"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className={`p-6 md:p-10 ${card}`}>
            <p
              className="text-[9px] uppercase tracking-[0.3em] text-[#8892a4]"
              style={{ opacity: 0.55 }}
            >
              04 — Contact
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-4xl leading-none md:text-5xl lg:text-6xl">
              
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#8892a4]">
              I am most useful where the constraints are real: ambiguous data,
              complex stakeholders, demanding reliability, and systems that
              cannot just look impressive in screenshots.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:nsangamkar1222@gmail.com"
                className="inline-flex items-center gap-2 bg-[#06b6d4] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#050810] transition-opacity hover:opacity-85"
              >
                Email me
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:border-[#06b6d4] hover:text-[#06b6d4]"
              >
                Resume
              </a>
            </div>
          </div>

          <div className={`p-6 md:p-10 ${card}`}>
            <p
              className="text-[9px] uppercase tracking-[0.3em] text-[#8892a4]"
              style={{ opacity: 0.55 }}
            >
              Direct
            </p>
            <div className="mt-8 space-y-5">
              <a
                href="mailto:nsangamkar1222@gmail.com"
                className="block border-b border-white/5 pb-4 text-xl transition-colors hover:text-[#06b6d4]"
              >
                nsangamkar1222@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/nikhilsangamkar/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border-b border-white/5 pb-4 text-lg transition-colors hover:text-[#06b6d4]"
              >
                LinkedIn
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/NSang22"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-lg transition-colors hover:text-[#06b6d4]"
              >
                GitHub
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
