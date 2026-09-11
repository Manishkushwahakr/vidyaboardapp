import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback, useEffect } from "react";
import { Plus, Play, Edit3, Trash2, ChevronLeft, ChevronRight, X, Globe, PenTool, Eraser, Palette, Image as ImageIcon, FileText, Download, File } from "lucide-react";
import { useLangStore } from "../store/langStore";
import { t } from "../data/translations";
import { GlowCard } from "../components/GlowCard";

export const Route = createFileRoute("/slides")({
  component: SlidesPage,
});

interface Slide {
  id: string;
  strokes: Array<{ points: { x: number; y: number }[]; color: string; width: number }>;
}

interface Deck {
  id: string;
  name: string;
  slides: Slide[];
  createdAt: number;
}

type DocumentType = 'pdf' | 'pptx' | 'docx';

interface DocumentDeck {
  id: string;
  name: string;
  documentData: string; // Base64 encoded document
  documentType: DocumentType;
  currentPage: number;
  totalPages: number;
  createdAt: number;
  fileName: string;
}

function createSlide(): Slide {
  return { id: crypto.randomUUID(), strokes: [] };
}

function SlidesPage() {
  const lang = useLangStore((s) => s.lang);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [documentDecks, setDocumentDecks] = useState<DocumentDeck[]>([]);
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [activeDocument, setActiveDocument] = useState<DocumentDeck | null>(null);
  const [mode, setMode] = useState<'list' | 'editor' | 'present' | 'doc-view' | 'doc-present'>('list');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const docInputRef = useRef<HTMLInputElement>(null);

  function createDeck() {
    const name = prompt(t(lang, 'deckName')) || t(lang, 'untitled');
    const deck: Deck = { id: crypto.randomUUID(), name, slides: [createSlide()], createdAt: Date.now() };
    setDecks([...decks, deck]);
    setActiveDeck(deck);
    setMode('editor');
    setCurrentSlideIndex(0);
  }

  function getDocumentType(fileName: string): DocumentType {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext === 'pptx' || ext === 'ppt') return 'pptx';
    if (ext === 'docx' || ext === 'doc') return 'docx';
    return 'pdf';
  }

  function getGlowColor(docType: DocumentType): 'orange' | 'cyan' | 'green' {
    switch (docType) {
      case 'pdf':
        return 'orange';
      case 'pptx':
        return 'cyan';
      case 'docx':
        return 'green';
      default:
        return 'orange';
    }
  }

  function getDocumentIcon(docType: DocumentType) {
    return FileText;
  }

  function handleDocumentUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const validExtensions = ['.pdf', '.pptx', '.docx', '.ppt', '.doc'];
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!validExtensions.includes(fileExt)) {
        alert(t(lang, 'unsupportedFileType'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const documentData = event.target?.result as string;
        const docName = file.name.replace(/\.[^/.]+$/, '') || t(lang, 'untitled');
        const docType = getDocumentType(file.name);

        const documentDeck: DocumentDeck = {
          id: crypto.randomUUID(),
          name: docName,
          documentData: documentData,
          documentType: docType,
          currentPage: 1,
          totalPages: 1,
          createdAt: Date.now(),
          fileName: file.name,
        };
        setDocumentDecks([...documentDecks, documentDeck]);
      };
      reader.readAsDataURL(file);
    }
    if (docInputRef.current) {
      docInputRef.current.value = '';
    }
  }

  function deleteDeck(id: string) {
    setDecks(decks.filter((d) => d.id !== id));
  }

  function deleteDocument(id: string) {
    setDocumentDecks(documentDecks.filter((d) => d.id !== id));
  }

  if (mode === 'present' && activeDeck) {
    return (
      <PresentMode
        deck={activeDeck}
        onExit={() => setMode('editor')}
      />
    );
  }

  if (mode === 'doc-present' && activeDocument) {
    return (
      <DocumentPresentMode
        document={activeDocument}
        onExit={() => setMode('doc-view')}
      />
    );
  }

  if (mode === 'doc-view' && activeDocument) {
    return (
      <DocumentViewer
        document={activeDocument}
        onPresent={() => setMode('doc-present')}
        onBack={() => { setMode('list'); setActiveDocument(null); }}
        onUpdate={(updated) => {
          setActiveDocument(updated);
          setDocumentDecks(documentDecks.map((d) => (d.id === updated.id ? updated : d)));
        }}
      />
    );
  }

  if (mode === 'editor' && activeDeck) {
    return (
      <SlideEditor
        deck={activeDeck}
        currentSlideIndex={currentSlideIndex}
        onSlideChange={setCurrentSlideIndex}
        onUpdate={(updated) => {
          setActiveDeck(updated);
          setDecks(decks.map((d) => (d.id === updated.id ? updated : d)));
        }}
        onPresent={() => setMode('present')}
        onBack={() => { setMode('list'); setActiveDeck(null); }}
      />
    );
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">{t(lang, 'slides')}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => docInputRef.current?.click()}
            className="flex min-h-[44px] items-center gap-2 rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          >
            <FileText size={18} /> {t(lang, 'uploadDocument')}
          </button>
          <input
            type="file"
            ref={docInputRef}
            onChange={handleDocumentUpload}
            className="hidden"
            accept=".pdf,.pptx,.ppt,.docx,.doc"
          />
          <button
            onClick={createDeck}
            className="flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            <Plus size={18} /> {t(lang, 'newDeck')}
          </button>
        </div>
      </div>

      {decks.length === 0 && documentDecks.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
          <Edit3 size={40} className="mb-2 opacity-50" />
          <p className="text-sm">{t(lang, 'createSlides')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* Documents */}
          {documentDecks.map((doc) => {
            const Icon = getDocumentIcon(doc.documentType);
            const glowColor = getGlowColor(doc.documentType);
            const typeLabel = doc.documentType.toUpperCase();

            return (
              <GlowCard key={doc.id} glowColor={glowColor}>
                <div className="flex items-start justify-between">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => { setActiveDocument(doc); setMode('doc-view'); }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className={glowColor === 'orange' ? 'text-orange-500' : glowColor === 'cyan' ? 'text-cyan-500' : 'text-green-500'} />
                      <h3 className="font-semibold text-foreground truncate">{doc.name}</h3>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{typeLabel} Document</p>
                  </div>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="rounded-lg p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </GlowCard>
            );
          })}

          {/* Regular Decks */}
          {decks.map((deck) => (
            <GlowCard key={deck.id} glowColor="cyan">
              <div className="flex items-start justify-between">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => { setActiveDeck(deck); setMode('editor'); setCurrentSlideIndex(0); }}
                >
                  <h3 className="font-semibold text-foreground">{deck.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {deck.slides.length} {t(lang, 'slideCount')}
                  </p>
                </div>
                <button
                  onClick={() => deleteDeck(deck.id)}
                  className="rounded-lg p-2 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </GlowCard>
          ))}
        </div>
      )}
    </div>
  );
}

function SlideEditor({
  deck, currentSlideIndex, onSlideChange, onUpdate, onPresent, onBack,
}: {
  deck: Deck;
  currentSlideIndex: number;
  onSlideChange: (i: number) => void;
  onUpdate: (deck: Deck) => void;
  onPresent: () => void;
  onBack: () => void;
}) {
  const lang = useLangStore((s) => s.lang);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDrawing = useRef(false);
  const currentPoints = useRef<{ x: number; y: number }[]>([]);
  
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#00d4ff');
  const [width, setWidth] = useState(3);
  const [showColors, setShowColors] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);

  const currentSlide = deck.slides[currentSlideIndex];

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentSlide.strokes.forEach((s) => {
      if (s.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (s.color === 'transparent') {
         ctx.globalCompositeOperation = 'destination-out';
         ctx.strokeStyle = 'white'; // Dummy for eraser path
      }
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      s.points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.restore();
    });
  }, [currentSlide]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    redraw();
  }, [redraw, currentSlideIndex]);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const rect = canvasRef.current!.getBoundingClientRect();
    if ('touches' in e) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleStart(e: React.MouseEvent | React.TouchEvent) {
    if ((e.target as HTMLElement).closest('.editor-ui')) return;
    e.preventDefault();
    isDrawing.current = true;
    currentPoints.current = [getPos(e)];
  }

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPos(e);
    currentPoints.current.push(pos);
    redraw();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || currentPoints.current.length < 2) return;
    
    ctx.save();
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,0.5)' : color;
    ctx.lineWidth = tool === 'eraser' ? width * 4: width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(currentPoints.current[0].x, currentPoints.current[0].y);
    currentPoints.current.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.restore();
  }

  function handleEnd() {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (currentPoints.current.length < 2) return;
    const updatedSlide = {
      ...currentSlide,
      strokes: [...currentSlide.strokes, { 
        points: [...currentPoints.current], 
        color: tool === 'eraser' ? 'transparent' : color, 
        width: tool === 'eraser' ? width * 4: width 
      }],
    };
    const updatedSlides = [...deck.slides];
    updatedSlides[currentSlideIndex] = updatedSlide;
    onUpdate({ ...deck, slides: updatedSlides });
    currentPoints.current = [];
  }

  function addSlide() {
    const updatedSlides = [...deck.slides, createSlide()];
    onUpdate({ ...deck, slides: updatedSlides });
    onSlideChange(updatedSlides.length - 1);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8;
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;
          ctx.drawImage(img, x, y, w, h);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  const colorsList = ['#00d4ff', '#ff6b35', '#22c55e', '#ef4444', '#ffffff', '#000000'];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="editor-ui flex items-center gap-2 border-b border-border bg-card px-3 py-2">
        <button onClick={onBack} className="text-sm text-primary hover:underline">← {t(lang, 'previous')}</button>
        <span className="flex-1 text-center text-sm font-semibold text-foreground">{deck.name}</span>
        <button onClick={onPresent}
          className="flex min-h-[40px] items-center gap-1 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
          <Play size={16} /> {t(lang, 'present')}
        </button>
      </div>

      <div className="editor-ui flex items-center gap-2 border-b border-border bg-card/50 px-3 py-1.5">
        <button onClick={() => onSlideChange(Math.max(0, currentSlideIndex - 1))}
          disabled={currentSlideIndex === 0}
          className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-30">
          <ChevronLeft size={18} />
        </button>
        <span className="text-xs text-muted-foreground">
          {t(lang, 'page')} {currentSlideIndex + 1}/{deck.slides.length}
        </span>
        <button onClick={() => onSlideChange(Math.min(deck.slides.length - 1, currentSlideIndex + 1))}
          disabled={currentSlideIndex === deck.slides.length - 1}
          className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-30">
          <ChevronRight size={18} />
        </button>
        <button onClick={addSlide} className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-muted">
          <Plus size={14} /> {t(lang, 'addSlide')}
        </button>
      </div>

      <div className="relative flex flex-1 flex-row bg-background overflow-hidden">
        {/* Canvas Area */}
        <div className="relative flex-1 transition-opacity duration-300">
          <canvas
            key={currentSlideIndex}
            ref={canvasRef}
            className="absolute inset-0 touch-none cursor-crosshair"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
          
          {/* Browser Modal */}
          {showBrowser && (
            <div className="editor-ui absolute inset-6 z-50 flex flex-col rounded-xl border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between bg-secondary px-3 py-1.5 border-b border-border">
                <span className="text-xs font-semibold flex items-center gap-1">
                  <Globe size={14} /> Browser
                </span>
                <button onClick={() => setShowBrowser(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>
              <iframe src="https://www.bing.com/search?q=NCERT+Class+Experiments" className="w-full flex-1 border-none" />
            </div>
          )}
        </div>

        {/* Tools Palette (Right side) */}
        <div className="editor-ui flex w-12 flex-col items-center gap-2 border-l border-border bg-card py-3 overflow-y-auto">
          <button onClick={() => setTool('pen')} 
            className={`p-2 rounded-lg transition-colors ${tool === 'pen' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
            <PenTool size={20} />
          </button>
          <button onClick={() => setTool('eraser')} 
            className={`p-2 rounded-lg transition-colors ${tool === 'eraser' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
            <Eraser size={20} />
          </button>
          
          <div className="my-1 h-px w-8 bg-border" />
          
          <button onClick={() => setShowColors(!showColors)} className="p-2 rounded-lg text-muted-foreground hover:bg-muted">
            <Palette size={20} />
          </button>

          <div className="my-1 h-px w-8 bg-border" />

          <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-lg text-muted-foreground hover:bg-muted">
            <ImageIcon size={20} />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

          <button onClick={() => setShowBrowser(true)} className="p-2 rounded-lg text-muted-foreground hover:bg-muted">
            <Globe size={20} />
          </button>

          {showColors && (
            <div className="absolute right-14 top-1/4 z-50 flex flex-col gap-2 rounded-xl border border-border bg-card p-2 shadow-xl">
              {colorsList.map(c => (
                <button key={c} onClick={() => { setColor(c); setShowColors(false); setTool('pen'); }} 
                  className={`h-6 w-6 rounded-full border-2 ${color === c ? 'border-primary' : 'border-transparent'}`} 
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PresentMode({ deck, onExit }: { deck: Deck; onExit: () => void }) {
  const lang = useLangStore((s) => s.lang);
  const [index, setIndex] = useState(0);
  const [penMode, setPenMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const currentPoints = useRef<{ x: number; y: number }[]>([]);
  const [drawnStrokes, setDrawnStrokes] = useState<Array<{points: {x: number, y: number}[], color: string}>>([]);

  const currentSlide = deck.slides[index];

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw original slide strokes
    currentSlide.strokes.forEach((s) => {
      if (s.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = s.color === 'transparent' ? 'rgba(0,0,0,0)' : s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (s.color === 'transparent') ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      s.points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.restore();
    });

    // Draw present mode annotations
    drawnStrokes.forEach(s => {
      ctx.save();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      s.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.restore();
    });
  }, [currentSlide, drawnStrokes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
  }, [redraw, index]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setIndex((i) => Math.min(i + 1, deck.slides.length - 1));
        setDrawnStrokes([]);
      }
      if (e.key === 'ArrowLeft') {
        setIndex((i) => Math.max(i - 1, 0));
        setDrawnStrokes([]);
      }
      if (e.key === 'Escape') onExit();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [deck.slides.length, onExit]);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    if ('touches' in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  function handleStart(e: React.MouseEvent | React.TouchEvent) {
    if (!penMode) return;
    setIsDrawing(true);
    currentPoints.current = [getPos(e)];
  }

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return;
    const pos = getPos(e);
    currentPoints.current.push(pos);
    redraw();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.strokeStyle = '#ff3366';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(currentPoints.current[0].x, currentPoints.current[0].y);
    currentPoints.current.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.restore();
  }

  function handleEnd() {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentPoints.current.length >= 2) {
      setDrawnStrokes(prev => [...prev, { points: [...currentPoints.current], color: '#ff3366' }]);
    }
    currentPoints.current = [];
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background overflow-hidden">
      {/* Presentation Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex h-14 items-center justify-between bg-black/40 px-6 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
          <div className="text-white">
            <h2 className="text-sm font-bold uppercase tracking-widest">{deck.name}</h2>
            <p className="text-[10px] text-white/60">{t(lang, 'slideCount')}: {index + 1}/{deck.slides.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <button
                onClick={() => setPenMode(!penMode)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                penMode ? 'bg-primary text-primary-foreground scale-105 shadow-[0_0_15px_oklch(0.78_0.15_200)]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            >
            <PenTool size={16} />
            {penMode ? 'ANNOTATION ON' : 'ENABLE PEN'}
            </button>
            {drawnStrokes.length > 0 && (
                <button onClick={() => setDrawnStrokes([])} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
                    <Eraser size={16} />
                </button>
            )}
        </div>
      </div>

      <div className="relative flex-1">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-0 bg-background ${penMode ? 'cursor-crosshair touch-none' : ''}`}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />

        {/* Navigation Overlays (Only if penMode is off) */}
        {!penMode && (
          <>
            <button
              onClick={() => { setIndex(Math.max(0, index - 1)); setDrawnStrokes([]); }}
              className="absolute left-0 top-14 bottom-6 w-20 bg-gradient-to-r from-black/20 to-transparent opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center text-white z-30 pointer-events-auto"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={() => { setIndex(Math.min(deck.slides.length - 1, index + 1)); setDrawnStrokes([]); }}
              className="absolute right-0 top-14 bottom-6 w-20 bg-gradient-to-l from-black/20 to-transparent opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center text-white z-30 pointer-events-auto"
            >
              <ChevronRight size={48} />
            </button>
          </>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full bg-black/40 px-6 py-2 backdrop-blur-xl border border-white/10 shadow-2xl">
        <button
          onClick={() => { setIndex(Math.max(0, index - 1)); setDrawnStrokes([]); }}
          disabled={index === 0}
          className="text-white hover:text-primary disabled:opacity-30 p-1"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-[10px] font-bold text-white min-w-[50px] text-center uppercase tracking-widest">
          {index + 1} / {deck.slides.length}
        </span>
        <button
          onClick={() => { setIndex(Math.min(deck.slides.length - 1, index + 1)); setDrawnStrokes([]); }}
          disabled={index === deck.slides.length - 1}
          className="text-white hover:text-primary disabled:opacity-30 p-1"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function DocumentViewer({
  document,
  onPresent,
  onBack,
  onUpdate,
}: {
  document: DocumentDeck;
  onPresent: () => void;
  onBack: () => void;
  onUpdate: (deck: DocumentDeck) => void;
}) {
  const lang = useLangStore((s) => s.lang);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (iframeRef.current && document.documentType === 'pdf') {
      iframeRef.current.src = `${document.documentData}#page=${newPage}`;
    }
  };

  const getDocTypeLabel = (type: DocumentType): string => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'pptx':
        return 'PowerPoint';
      case 'docx':
        return 'Word Document';
      default:
        return 'Document';
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
        <button onClick={onBack} className="text-sm text-primary hover:underline">
          ← {t(lang, 'previous')}
        </button>
        <span className="flex-1 text-center text-sm font-semibold text-foreground flex items-center gap-2 justify-center">
          <FileText size={18} />
          {document.name}
        </span>
        <button
          onClick={onPresent}
          className="flex min-h-[40px] items-center gap-1 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
        >
          <Play size={16} /> {t(lang, 'present')}
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-muted">
        {document.documentType === 'pdf' && (
          <iframe
            ref={iframeRef}
            src={document.documentData}
            className="w-full h-full border-none"
            title="PDF Viewer"
            style={{ minHeight: '100%' }}
          />
        )}
        {document.documentType === 'pptx' && (
          <div className="flex items-center justify-center h-full flex-col gap-4 text-muted-foreground">
            <File size={48} />
            <p className="text-sm text-center">
              {t(lang, 'powerPointPreview')}
            </p>
            <p className="text-xs">{document.fileName}</p>
          </div>
        )}
        {document.documentType === 'docx' && (
          <div className="flex items-center justify-center h-full flex-col gap-4 text-muted-foreground">
            <File size={48} />
            <p className="text-sm text-center">
              {t(lang, 'wordDocPreview')}
            </p>
            <p className="text-xs">{document.fileName}</p>
          </div>
        )}
      </div>

      {document.documentType === 'pdf' && (
        <div className="flex items-center justify-center gap-3 border-t border-border bg-card px-3 py-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-muted-foreground min-w-[80px] text-center">
            {t(lang, 'page')} {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="rounded p-1 text-muted-foreground hover:bg-muted"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

function DocumentPresentMode({
  document,
  onExit,
}: {
  document: DocumentDeck;
  onExit: () => void;
}) {
  const lang = useLangStore((s) => s.lang);
  const [currentPage, setCurrentPage] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [penMode, setPenMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const currentPoints = useRef<{ x: number; y: number }[]>([]);
  const [drawnStrokes, setDrawnStrokes] = useState<Array<{ points: { x: number; y: number }[]; color: string }>>([]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawnStrokes.forEach((s) => {
      if (s.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      s.points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.restore();
    });
  }, [drawnStrokes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
  }, [redraw]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentPage((p) => p + 1);
        setDrawnStrokes([]);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentPage((p) => Math.max(1, p - 1));
        setDrawnStrokes([]);
      }
      if (e.key === 'Escape') onExit();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onExit]);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    if ('touches' in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  function handleStart(e: React.MouseEvent | React.TouchEvent) {
    if (!penMode) return;
    setIsDrawing(true);
    currentPoints.current = [getPos(e)];
  }

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return;
    const pos = getPos(e);
    currentPoints.current.push(pos);
    redraw();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.strokeStyle = '#ff3366';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(currentPoints.current[0].x, currentPoints.current[0].y);
    currentPoints.current.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.restore();
  }

  function handleEnd() {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentPoints.current.length >= 2) {
      setDrawnStrokes((prev) => [...prev, { points: [...currentPoints.current], color: '#ff3366' }]);
    }
    currentPoints.current = [];
  }

  const getDocTypeLabel = (type: DocumentType): string => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'pptx':
        return 'PowerPoint';
      case 'docx':
        return 'Word Document';
      default:
        return 'Document';
    }
  };

  const downloadDocument = () => {
    const link = document.createElement('a');
    link.href = document.documentData;
    link.download = document.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background overflow-hidden">
      {/* Document Present Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-black/40 px-6 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* X button - tap to exit */}
          <button onClick={onExit} className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
          <div className="text-white">
            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <FileText size={16} />
              {document.name}
            </h2>
            <p className="text-[10px] text-white/60">{getDocTypeLabel(document.documentType)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPenMode(!penMode)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
              penMode ? 'bg-primary text-primary-foreground scale-105 shadow-[0_0_15px_oklch(0.78_0.15_200)]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <PenTool size={16} />
            {penMode ? 'ANNOTATION ON' : 'ENABLE PEN'}
          </button>
          {drawnStrokes.length > 0 && (
            <button
              onClick={() => setDrawnStrokes([])}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <Eraser size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="relative flex-1">
        {/* Document Content */}
        {document.documentType === 'pdf' && (
          <iframe
            ref={iframeRef}
            src={`${document.documentData}#page=${currentPage}`}
            className="absolute inset-0 w-full h-full border-none"
            title="Document Present"
          />
        )}
        {document.documentType === 'pptx' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 z-0 pointer-events-auto">
            <div className="text-center text-white flex flex-col items-center gap-6 z-10 relative">
              <div>
                <FileText size={80} className="mx-auto mb-4 opacity-50" />
                <p className="text-2xl font-bold">{document.name}</p>
                <p className="text-sm opacity-75 mt-2">PowerPoint Presentation</p>
              </div>
              <button
                onClick={downloadDocument}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors z-20 relative"
              >
                <Download size={18} /> {t(lang, 'download')} & {t(lang, 'open')}
              </button>
              <p className="text-xs opacity-60 max-w-sm">
                {t(lang, 'pptxOpeningNote')}
              </p>
            </div>
          </div>
        )}
        {document.documentType === 'docx' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 z-0 pointer-events-auto">
            <div className="text-center text-white flex flex-col items-center gap-6 z-10 relative">
              <div>
                <FileText size={80} className="mx-auto mb-4 opacity-50" />
                <p className="text-2xl font-bold">{document.name}</p>
                <p className="text-sm opacity-75 mt-2">Word Document</p>
              </div>
              <button
                onClick={downloadDocument}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors z-20 relative"
              >
                <Download size={18} /> {t(lang, 'download')} & {t(lang, 'open')}
              </button>
              <p className="text-xs opacity-60 max-w-sm">
                {t(lang, 'docxOpeningNote')}
              </p>
            </div>
          </div>
        )}

        {/* Annotation Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-20 ${penMode ? 'cursor-crosshair touch-none' : ''}`}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />

        {/* Navigation Overlays */}
        {!penMode && document.documentType === 'pdf' && (
          <>
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                setDrawnStrokes([]);
              }}
              className="absolute left-0 top-14 bottom-6 w-20 bg-gradient-to-r from-black/20 to-transparent opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center text-white z-30 pointer-events-auto"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={() => {
                setCurrentPage((p) => p + 1);
                setDrawnStrokes([]);
              }}
              className="absolute right-0 top-14 bottom-6 w-20 bg-gradient-to-l from-black/20 to-transparent opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center text-white z-30 pointer-events-auto"
            >
              <ChevronRight size={48} />
            </button>
          </>
        )}
      </div>

      {/* Document Navigation Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full bg-black/40 px-6 py-2 backdrop-blur-xl border border-white/10 shadow-2xl z-40">
        <button
          onClick={() => {
            setCurrentPage((p) => Math.max(1, p - 1));
            setDrawnStrokes([]);
          }}
          disabled={currentPage === 1}
          className="text-white hover:text-primary disabled:opacity-30 p-1"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-[10px] font-bold text-white min-w-[50px] text-center uppercase tracking-widest">
          {getDocTypeLabel(document.documentType)} {currentPage}
        </span>
        <button
          onClick={() => {
            setCurrentPage((p) => p + 1);
            setDrawnStrokes([]);
          }}
          className="text-white hover:text-primary p-1"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
