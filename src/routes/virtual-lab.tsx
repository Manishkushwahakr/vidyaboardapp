import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  ChevronRight, 
  Download, 
  Play, 
  CheckCircle2, 
  CloudOff, 
  Baby, 
  Pencil, 
  BookOpen, 
  Brain, 
  Zap,
  ArrowLeft,
  Trash2,
  Monitor
} from "lucide-react";
import { experiments, stages, type Stage, type Experiment } from "../data/experiments";
import { subjectColorClasses, subjects as allSubjects, type Subject } from "../data/curriculum";
import { useLangStore } from "../store/langStore";
import { t } from "../data/translations";
import { GlowCard } from "../components/GlowCard";
import { useLabStore } from "../store/labStore";
import { toast } from "sonner";

export const Route = createFileRoute("/virtual-lab")({
  component: VirtualLabPage,
});

const stageIcons: Record<Stage, any> = {
  foundation: Baby,
  preparatory: Pencil,
  middle: BookOpen,
  secondary: Brain,
  senior: Zap,
};

function VirtualLabPage() {
  const lang = useLangStore((s) => s.lang);
  const labStore = useLabStore();
  
  const [step, setStep] = useState<'stage' | 'class' | 'subject' | 'list'>('stage');
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [query, setQuery] = useState('');
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    labStore.init();
  }, []);

  // Cleanup blob URL on unmount or experiment change
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handleOpenExperiment = async (exp: Experiment) => {
    // Priority 1: Check if content exists in IndexedDB (Offline)
    if (labStore.downloadedIds.includes(exp.id)) {
      try {
        const content = await labStore.getSimulationContent(exp.id);
        if (content) {
          const blob = new Blob([content], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);
          setSelectedExperiment(exp);
          return;
        }
      } catch (err) {
        console.error('Error loading offline simulation:', err);
        // Fallback to online if IDB fails for some reason
      }
    }

    // Priority 2: Fallback to Online URL
    if (!navigator.onLine && !labStore.downloadedIds.includes(exp.id)) {
      toast.error('Connect to internet to open this simulation or download it first.');
      return;
    }

    setBlobUrl(null);
    setSelectedExperiment(exp);
  };

  const filteredClasses = useMemo(() => {
    if (!selectedStage) return [];
    const stage = stages.find(s => s.id === selectedStage);
    if (!stage) return [];
    const [start, end] = stage.range.match(/\d+/g)!.map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [selectedStage]);

  const availableSubjects = useMemo(() => {
    if (selectedClass === null) return [];
    const subSet = new Set<Subject>();
    experiments.forEach(e => {
      if (e.classLevel === selectedClass) subSet.add(e.subject);
    });
    return Array.from(subSet);
  }, [selectedClass]);

  const filteredExperiments = useMemo(() => {
    return experiments.filter(e => {
      if (selectedClass !== null && e.classLevel !== selectedClass) return false;
      if (selectedSubject !== null && e.subject !== selectedSubject) return false;
      if (query) {
        const q = query.toLowerCase();
        return e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [selectedClass, selectedSubject, query]);

  if (selectedExperiment) {
    return (
      <div className="flex h-full flex-col bg-black">
        <div className="flex items-center justify-between border-b border-white/10 bg-card p-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setSelectedExperiment(null);
                if (blobUrl) URL.revokeObjectURL(blobUrl);
              }}
              className="rounded-full p-2 hover:bg-white/10"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div>
              <h2 className="text-sm font-bold text-foreground">{selectedExperiment.title}</h2>
              <p className="text-[10px] text-muted-foreground">Class {selectedExperiment.classLevel} • {selectedExperiment.subject}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             {labStore.downloadedIds.includes(selectedExperiment.id) ? (
               <span className="flex items-center gap-1 text-[10px] font-medium text-sci-green bg-sci-green/10 px-2 py-1 rounded-full">
                 <CheckCircle2 size={10} /> OFFLINE
               </span>
             ) : (
               <span className="flex items-center gap-1 text-[10px] font-medium text-sci-cyan bg-sci-cyan/10 px-2 py-1 rounded-full">
                 <Monitor size={10} /> ONLINE
               </span>
             )}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe 
            src={blobUrl || selectedExperiment.url} 
            className="h-full w-full border-none"
            title={selectedExperiment.title}
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-6 overflow-hidden bg-background">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {step !== 'stage' && (
            <button 
              onClick={() => {
                if (step === 'class') setStep('stage');
                else if (step === 'subject') setStep('class');
                else if (step === 'list') setStep('subject');
              }}
              className="rounded-full bg-secondary p-2 transition-transform hover:scale-110 active:scale-95"
            >
              <ArrowLeft size={18} className="text-foreground" />
            </button>
          )}
          <h1 className="text-2xl font-black italic tracking-tighter text-foreground uppercase">
            {t(lang, 'virtualLab')}
          </h1>
        </div>
        
        {step === 'list' && (
          <div className="relative w-48 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search experiments..."
              className="h-9 w-full rounded-full border border-border bg-card pl-9 pr-4 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto px-1 pb-20">
        {/* Step 1: Stages */}
        {step === 'stage' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage) => {
              const Icon = stageIcons[stage.id];
              return (
                <GlowCard 
                  key={stage.id} 
                  onClick={() => {
                    setSelectedStage(stage.id);
                    setStep('class');
                  }}
                  className="group relative h-40 overflow-hidden cursor-pointer"
                  glowColor="cyan"
                >
                  <div className="flex h-full flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <div className="rounded-xl bg-primary/10 p-3 group-hover:scale-110 transition-transform">
                        <Icon size={28} className="text-primary" />
                      </div>
                      <ChevronRight className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{stage.label}</h3>
                      <p className="text-xs text-muted-foreground">{stage.range}</p>
                    </div>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        )}

        {/* Step 2: Classes */}
        {step === 'class' && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredClasses.map((cl) => (
              <button
                key={cl}
                onClick={() => {
                  setSelectedClass(cl);
                  setStep('subject');
                }}
                className="flex h-24 flex-col items-center justify-center rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-95"
              >
                <span className="text-2xl font-black text-foreground">{cl}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Class</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Subjects */}
        {step === 'subject' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {availableSubjects.map((sub) => {
              const colors = subjectColorClasses[sub] || subjectColorClasses['science'];
              return (
                <GlowCard
                  key={sub}
                  onClick={() => {
                    setSelectedSubject(sub);
                    setStep('list');
                  }}
                  className="flex items-center gap-4 cursor-pointer"
                  glowColor={colors.glow.replace('glow-', '') as any}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}>
                    <Monitor size={24} className={colors.text} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground capitalize">{sub.replace('-', ' ')}</h3>
                    <p className="text-[10px] text-muted-foreground">
                      {experiments.filter(e => e.classLevel === selectedClass && e.subject === sub).length} Experiments
                    </p>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        )}

        {/* Step 4: Experiment List */}
        {step === 'list' && (
          <div className="space-y-3">
            {filteredExperiments.map((exp) => {
              const colors = subjectColorClasses[exp.subject] || subjectColorClasses['science'];
              const isDownloaded = labStore.downloadedIds.includes(exp.id);
              const isDownloading = labStore.isDownloading[exp.id];
              
              return (
                <GlowCard key={exp.id} className="group flex items-center gap-4" glowColor={colors.glow.replace('glow-', '') as any}>
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colors.bg}`}>
                    <Play size={24} className={colors.text} fill={colors.text} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                       <h4 className="font-bold text-foreground truncate">{exp.title}</h4>
                       {isDownloaded && <CheckCircle2 size={14} className="text-sci-green" />}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{exp.description}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded uppercase">{exp.size}</span>
                      <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded uppercase">Class {exp.classLevel}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleOpenExperiment(exp)}
                      className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
                    >
                      <Play size={12} fill="white" /> Open
                    </button>
                    {!isDownloaded && (
                      <button 
                        onClick={() => labStore.downloadExperiment(exp.id, exp.url)}
                        disabled={isDownloading}
                        className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground transition-all hover:bg-secondary active:scale-95 disabled:opacity-50"
                      >
                        {isDownloading ? (
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : (
                          <span className="mr-0.5">⬇</span>
                        )}
                        {isDownloading ? 'Downloading...' : 'Download'}
                      </button>
                    )}
                    {isDownloaded && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center gap-1 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-sci-green bg-sci-green/5 rounded-full border border-sci-green/20">
                          <CheckCircle2 size={12} /> Downloaded
                        </div>
                        <button 
                          onClick={() => labStore.removeExperiment(exp.id)}
                          className="flex items-center justify-center gap-1 py-1 text-[8px] font-bold text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={10} /> Remove Local Cache
                        </button>
                      </div>
                    )}
                  </div>
                </GlowCard>
              );
            })}

            {filteredExperiments.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <CloudOff size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">No experiments found for this criteria</p>
                <p className="text-sm">Try searching for something else or changing filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
