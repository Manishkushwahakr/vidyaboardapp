import { createFileRoute } from '@tanstack/react-router'
import { Languages, Grid3X3, Save, Pointer, Trash2, Info, Sun, Moon } from "lucide-react";
import { useLangStore } from "../store/langStore";
import { useSettingsStore } from "../store/settingsStore";
import { useThemeStore } from "../store/themeStore";
import { t } from "../data/translations";
import { GlowCard } from "../components/GlowCard";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const lang = useLangStore((s) => s.lang);
  const toggle = useLangStore((s) => s.toggle);
  const { theme, toggleTheme } = useThemeStore();
  const { gridEnabled, autoSave, penPressure, setGridEnabled, setAutoSave, setPenPressure } = useSettingsStore();

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <h1 className="mb-6 text-xl font-bold text-foreground">{t(lang, 'settings')}</h1>

      <div className="max-w-lg space-y-4">
        {/* Theme Toggle */}
        <GlowCard glowColor={theme === 'dark' ? 'cyan' : undefined}>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-primary/10' : 'bg-secondary'}`}>
              {theme === 'dark' ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-primary" />}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">{t(lang, 'theme')}</h3>
              <p className="text-xs text-muted-foreground">{theme === 'dark' ? t(lang, 'darkMode') : t(lang, 'lightMode')}</p>
            </div>
            <button
              onClick={toggleTheme}
              className="min-h-[44px] rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {theme === 'dark' ? t(lang, 'lightMode') : t(lang, 'darkMode')}
            </button>
          </div>
        </GlowCard>

        {/* Language */}
        <GlowCard glowColor="cyan">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Languages size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">{t(lang, 'language')}</h3>
              <p className="text-xs text-muted-foreground">English / हिन्दी</p>
            </div>
            <button
              onClick={toggle}
              className="min-h-[44px] rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {lang === 'en' ? 'हिन्दी' : 'English'}
            </button>
          </div>
        </GlowCard>

        {/* Board Settings */}
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(lang, 'boardSettings')}</h2>
          <div className="space-y-2">
            <ToggleSetting icon={Grid3X3} label={t(lang, 'showGrid')} value={gridEnabled} onChange={setGridEnabled} />
            <ToggleSetting icon={Save} label={t(lang, 'autoSave')} value={autoSave} onChange={setAutoSave} />
            <ToggleSetting icon={Pointer} label={t(lang, 'penPressure')} value={penPressure} onChange={setPenPressure} />
          </div>
        </div>

        {/* Data Management */}
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(lang, 'dataManagement')}</h2>
          <GlowCard className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <Trash2 size={20} className="text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">{t(lang, 'clearAllData')}</h3>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure?')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="min-h-[44px] rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
            >
              {t(lang, 'clear')}
            </button>
          </GlowCard>
        </div>

        {/* About */}
        <GlowCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Info size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{t(lang, 'about')}</h3>
              <p className="text-xs text-muted-foreground">{t(lang, 'aboutDesc')}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t(lang, 'version')} 1.0.0</p>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}

function ToggleSetting({
  icon: Icon, label, value, onChange,
}: { icon: typeof Grid3X3; label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <GlowCard className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
        <Icon size={20} className="text-muted-foreground" />
      </div>
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-7 w-12 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-muted'}`}
      >
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-foreground transition-transform ${value ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </GlowCard>
  );
}
