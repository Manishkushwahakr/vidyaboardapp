import { createFileRoute, Link } from "@tanstack/react-router";
import { PenTool, FlaskConical, Presentation, Beaker, BookOpen, Calculator, Atom, Leaf, Globe, Clock } from "lucide-react";
import { GlowCard } from "../components/GlowCard";
import { useLangStore } from "../store/langStore";
import { t } from "../data/translations";
import { allExperiments } from "../data/curriculum";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const subjectCards = [
  { key: 'physics' as const, icon: Atom, color: 'cyan' as const, count: 0 },
  { key: 'chemistry' as const, icon: Beaker, color: 'orange' as const, count: 0 },
  { key: 'biology' as const, icon: Leaf, color: 'green' as const, count: 0 },
  { key: 'mathematics' as const, icon: Calculator, color: 'purple' as const, count: 0 },
];

// Count experiments per subject
subjectCards.forEach((s) => {
  s.count = allExperiments.filter((e) => e.subject === s.key).length;
});

function HomePage() {
  const lang = useLangStore((s) => s.lang);
  const toggle = useLangStore((s) => s.toggle);

  return (
    <div className="min-h-full p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t(lang, 'appName')}</h1>
          <p className="text-sm text-muted-foreground">{t(lang, 'welcome')}</p>
        </div>
        <button
          onClick={toggle}
          className="min-h-[48px] min-w-[48px] rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          {lang === 'en' ? 'हिन्दी' : 'EN'}
        </button>
      </div>

      {/* Quick Actions */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t(lang, 'quickActions')}</h2>
        <div className="grid grid-cols-3 gap-3">
          <Link to="/smart-board">
            <GlowCard glowColor="cyan" className="flex flex-col items-center gap-2 py-5">
              <PenTool size={28} className="text-sci-cyan" />
              <span className="text-xs font-medium text-foreground">{t(lang, 'startBoard')}</span>
            </GlowCard>
          </Link>
          <Link to="/virtual-lab">
            <GlowCard glowColor="orange" className="flex flex-col items-center gap-2 py-5">
              <FlaskConical size={28} className="text-sci-orange" />
              <span className="text-xs font-medium text-foreground">{t(lang, 'openLab')}</span>
            </GlowCard>
          </Link>
          <Link to="/slides">
            <GlowCard glowColor="green" className="flex flex-col items-center gap-2 py-5">
              <Presentation size={28} className="text-sci-green" />
              <span className="text-xs font-medium text-foreground">{t(lang, 'createSlides')}</span>
            </GlowCard>
          </Link>
        </div>
      </section>

      {/* Subjects */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t(lang, 'subjects')}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {subjectCards.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.key} to="/virtual-lab" search={{ subject: s.key }}>
                <GlowCard glowColor={s.color} className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-sci-${s.color}/10`}>
                    <Icon size={20} className={`text-sci-${s.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t(lang, s.key)}</p>
                    <p className="text-xs text-muted-foreground">{s.count} {t(lang, 'experiments')}</p>
                  </div>
                </GlowCard>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t(lang, 'recentActivity')}</h2>
        <GlowCard className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <BookOpen size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{allExperiments.length}+ {t(lang, 'experiments')}</p>
            <p className="text-xs text-muted-foreground">Class 1–12 • 4 {t(lang, 'subjects')}</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={14} />
            <span className="text-xs">v1.0</span>
          </div>
        </GlowCard>
      </section>
    </div>
  );
}
