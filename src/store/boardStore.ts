import { create } from 'zustand';

export type Tool = 'pen' | 'highlighter' | 'eraser' | 'line' | 'rect' | 'circle' | 'text' | 'select';

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  tool: Tool;
  points: Point[];
  color: string;
  width: number;
  opacity: number;
  text?: string;
}

export interface BoardPage {
  id: string;
  strokes: Stroke[];
}

interface BoardStore {
  tool: Tool;
  color: string;
  strokeWidth: number;
  pages: BoardPage[];
  currentPageIndex: number;
  undoStack: Stroke[][];
  redoStack: Stroke[][];
  setTool: (tool: Tool) => void;
  setColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  addStroke: (stroke: Stroke) => void;
  undo: () => void;
  redo: () => void;
  clearPage: () => void;
  addPage: () => void;
  setPage: (index: number) => void;
  deletePage: (index: number) => void;
}

const createEmptyPage = (): BoardPage => ({
  id: crypto.randomUUID(),
  strokes: [],
});

export const useBoardStore = create<BoardStore>((set, get) => ({
  tool: 'pen',
  color: '#00d4ff',
  strokeWidth: 3,
  pages: [createEmptyPage()],
  currentPageIndex: 0,
  undoStack: [],
  redoStack: [],
  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
  addStroke: (stroke) => {
    const { pages, currentPageIndex } = get();
    const page = pages[currentPageIndex];
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = {
      ...page,
      strokes: [...page.strokes, stroke],
    };
    set({
      pages: updatedPages,
      undoStack: [...get().undoStack, page.strokes],
      redoStack: [],
    });
  },
  undo: () => {
    const { undoStack, pages, currentPageIndex } = get();
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    const currentStrokes = pages[currentPageIndex].strokes;
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = { ...pages[currentPageIndex], strokes: prev };
    set({
      pages: updatedPages,
      undoStack: undoStack.slice(0, -1),
      redoStack: [...get().redoStack, currentStrokes],
    });
  },
  redo: () => {
    const { redoStack, pages, currentPageIndex } = get();
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    const currentStrokes = pages[currentPageIndex].strokes;
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = { ...pages[currentPageIndex], strokes: next };
    set({
      pages: updatedPages,
      redoStack: redoStack.slice(0, -1),
      undoStack: [...get().undoStack, currentStrokes],
    });
  },
  clearPage: () => {
    const { pages, currentPageIndex } = get();
    const currentStrokes = pages[currentPageIndex].strokes;
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = { ...pages[currentPageIndex], strokes: [] };
    set({
      pages: updatedPages,
      undoStack: [...get().undoStack, currentStrokes],
      redoStack: [],
    });
  },
  addPage: () => {
    const { pages } = get();
    set({
      pages: [...pages, createEmptyPage()],
      currentPageIndex: pages.length,
      undoStack: [],
      redoStack: [],
    });
  },
  setPage: (index) => set({ currentPageIndex: index, undoStack: [], redoStack: [] }),
  deletePage: (index) => {
    const { pages, currentPageIndex } = get();
    if (pages.length <= 1) return;
    const updated = pages.filter((_, i) => i !== index);
    set({
      pages: updated,
      currentPageIndex: Math.min(currentPageIndex, updated.length - 1),
      undoStack: [],
      redoStack: [],
    });
  },
}));
