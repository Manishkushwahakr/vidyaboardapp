import { Link, useLocation } from '@tanstack/react-router';
import { Home, PenTool, FlaskConical, Presentation, Settings, ChevronUp, ChevronDown } from 'lucide-react';
import { useLangStore } from '../store/langStore';
import { t } from '../data/translations';
import { useState, useEffect } from 'react';

const tabs = [
  { to: '/' as const, icon: Home, labelKey: 'home' as const },
  { to: '/smart-board' as const, icon: PenTool, labelKey: 'smartBoard' as const },
  { to: '/virtual-lab' as const, icon: FlaskConical, labelKey: 'virtualLab' as const },
  { to: '/slides' as const, icon: Presentation, labelKey: 'slides' as const },
  { to: '/settings' as const, icon: Settings, labelKey: 'settings' as const },
];

export function TabBar() {
  const lang = useLangStore((s) => s.lang);
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);

  // We only allow hiding on smart-board and virtual-lab
  const isHideable = location.pathname.startsWith('/smart-board') || location.pathname.startsWith('/virtual-lab');

  // Auto-hide when entering hideable routes if desired, or just keep state
  useEffect(() => {
    if (!isHideable) {
      setIsHidden(false);
    }
  }, [isHideable]);

  return (
    <>
      {/* Pull Handle (Visible when hidden and on hideable routes) */}
      {isHideable && isHidden && (
        <button
          onClick={() => setIsHidden(false)}
          className="fixed bottom-0 left-1/2 z-[60] -translate-x-1/2 rounded-t-xl bg-primary px-6 py-1 text-primary-foreground shadow-lg animate-bounce-subtle"
        >
          <ChevronUp size={20} />
        </button>
      )}

      <nav 
        className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card/95 backdrop-blur-sm px-2 py-1 transition-transform duration-300 ease-in-out ${
          isHideable && isHidden ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Hide Toggle Button (Only on hideable routes) */}
        {isHideable && (
          <button 
            onClick={() => setIsHidden(true)}
            className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-t-xl bg-card/80 px-4 py-1.5 text-muted-foreground backdrop-blur-sm border-t border-x border-border"
          >
            <ChevronDown size={18} />
          </button>
        )}

        {tabs.map((tab) => {
          const isActive = tab.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(tab.to);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex min-h-[48px] min-w-[48px] flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1 transition-all duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={22} className={isActive ? 'drop-shadow-[0_0_8px_oklch(0.78_0.15_200)]' : ''} />
              <span className="text-[10px] font-medium">{t(lang, tab.labelKey)}</span>
              {isActive && (
                <div className="absolute bottom-0 h-0.5 w-8 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
