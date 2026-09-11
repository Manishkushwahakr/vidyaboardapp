# VidyaBoard - Project Documentation

## 📋 Project Overview

**VidyaBoard** is an interactive, smart digital board application designed specifically for Indian school teachers (Classes 1-12). It provides a comprehensive educational platform combining drawing/presentation tools, virtual laboratory simulations, and interactive learning experiences in both English and Hindi.

**Vision**: Empower Indian educators with modern, accessible digital tools to enhance classroom engagement and student learning outcomes.

---

## 🎯 Key Features

1. **Smart Board (Drawing Canvas)**
   - Multi-tool drawing interface (pen, highlighter, eraser, shapes)
   - Multiple page management with undo/redo
   - Color picker and stroke width customization
   - Real-time canvas rendering with canvas API
   - Image upload support

2. **Virtual Lab**
   - Science experiments for Physics, Chemistry, Biology
   - Subject-specific content organization
   - Interactive simulations with local HTML or external integration
   - Quiz-based assessment after experiments
   - Class-level categorization (1-12)

3. **Presentation/Slides**
   - Slide creation and management
   - Integration with smart board tools
   - Navigation and playback controls

4. **Multi-Language Support**
   - English and Hindi interface translations
   - Localized experiment descriptions and procedures

5. **Theme Support**
   - Light/dark mode toggle
   - Persistent theme preferences

---

## 🏗️ Architecture

### Technology Stack

```
Frontend Framework: React 18+ with TanStack Start
Routing: TanStack Router (file-based routing)
State Management: Zustand (lightweight stores)
UI Components: Radix UI + Shadcn/ui
Styling: Tailwind CSS + CSS Variables
Build Tool: Vite
Package Manager: Bun
Backend/Deployment: Cloudflare Workers (Wrangler)
Canvas Drawing: Native HTML5 Canvas API
Form Handling: React Hook Form + Zod
Data Fetching: TanStack React Query
Notifications: Sonner (toast notifications)
Date Utils: date-fns
Icons: Lucide React
```

### Deployment Platform
- **Cloudflare**: Wrangler integration for edge deployment
- **Build Configuration**: Vite with Tailwind CSS and TanStack optimizations

---

## 📁 Project Structure

```
remix-of-vidyaboard-smart-canvas-main/
├── public/
│   └── simulations/                    # Physics/Chemistry/Biology simulations
│       └── physics/
│           └── class-9/
│               └── newton_fma_*.html   # Local simulation files
│
├── src/
│   ├── components/                     # Reusable React components
│   │   ├── GlowCard.tsx               # Glowing card component (science themed)
│   │   ├── SubjectBadge.tsx           # Subject indicator badges
│   │   ├── TabBar.tsx                 # Bottom navigation bar
│   │   └── ui/                        # Shadcn/ui component library
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── calendar.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── checkbox.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle.tsx
│   │       ├── toggle-group.tsx
│   │       └── tooltip.tsx
│   │
│   ├── data/                           # Static data & content
│   │   ├── curriculum.ts              # Subject definitions, colors, metadata
│   │   ├── experiments.ts             # Lab experiment database
│   │   └── translations.ts            # i18n translation strings
│   │
│   ├── hooks/                          # Custom React hooks
│   │   └── use-mobile.tsx             # Mobile device detection
│   │
│   ├── lib/                            # Utilities & helpers
│   │   ├── db.ts                      # Database utilities
│   │   └── utils.ts                   # General utilities (cn classname merge)
│   │
│   ├── routes/                         # TanStack Router pages (file-based)
│   │   ├── __root.tsx                 # Root layout & 404 page
│   │   ├── index.tsx                  # Home page / Dashboard
│   │   ├── settings.tsx               # Settings page
│   │   ├── slides.tsx                 # Presentation/Slides page
│   │   ├── smart-board.tsx            # Drawing board page (CORE)
│   │   └── virtual-lab.tsx            # Virtual lab page (CORE)
│   │
│   ├── store/                          # Zustand state management
│   │   ├── boardStore.ts              # Canvas drawing state
│   │   ├── labStore.ts                # Virtual lab experiment state
│   │   ├── langStore.ts               # Language preference (en/hi)
│   │   ├── settingsStore.ts           # User settings state
│   │   └── themeStore.ts              # Dark/light theme state
│   │
│   ├── router.tsx                      # TanStack Router config
│   ├── routeTree.gen.ts               # Auto-generated route types
│   └── styles.css                      # Global styles & CSS variables
│
├── Configuration Files
│   ├── package.json                   # Project dependencies & scripts
│   ├── package-lock.json              # Dependency lock
│   ├── bun.lockb                      # Bun package manager lock
│   ├── bunfig.toml                    # Bun configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── vite.config.ts                 # Vite build configuration
│   ├── wrangler.jsonc                 # Cloudflare Workers config
│   ├── components.json                # Shadcn/ui config
│   ├── eslint.config.js               # ESLint configuration
│   └── extract-pdf.cjs                # PDF extraction utility
│
└── Root Files
    ├── .gitignore                     # Git ignore patterns
    ├── .tanstack/                     # TanStack generated files
    ├── NCERT_Digital_Board_Class1_to_12.pdf  # Reference NCERT content
    └── output.txt                     # Utility output file
```

---

## 🔗 File Dependencies & Data Flow

### Core Data Flow

```
DATA LAYER
├── src/data/curriculum.ts
│   ├── Subject types & colors
│   ├── Used by: all subject-based components
│   └── Exports: subjectColors, subjectColorClasses
│
├── src/data/experiments.ts
│   ├── Experiment definitions (quiz, procedures, etc)
│   ├── Used by: VirtualLabPage, labStore
│   └── Related to: public/simulations/ (HTML files)
│
└── src/data/translations.ts
    ├── English/Hindi strings
    └── Used by: All pages via t(lang, key) function
```

### State Management (Zustand Stores)

```
src/store/
├── themeStore.ts → RootComponent (__root.tsx)
│   └── Provides: theme, setTheme
│
├── langStore.ts → HomePage (index.tsx), all pages
│   └── Provides: lang, toggle (en ↔ hi)
│
├── boardStore.ts → SmartBoardPage (smart-board.tsx)
│   ├── Manages: drawing tool, strokes, pages
│   ├── Types: Tool, Point, Stroke, BoardPage
│   └── Provides: undo/redo, page management
│
├── labStore.ts → VirtualLabPage (virtual-lab.tsx)
│   └── Manages: experiment state, quiz progress
│
└── settingsStore.ts → SettingsPage (settings.tsx)
    └── Manages: user preferences
```

### Component Hierarchy

```
RootComponent (__root.tsx)
├── Outlet (route content)
│   ├── HomePage (index.tsx)
│   │   └── GlowCard × 4 (Physics/Chemistry/Biology/Math)
│   │
│   ├── SmartBoardPage (smart-board.tsx)
│   │   ├── Canvas drawing area
│   │   ├── Toolbar (PenTool, Highlighter, Eraser, etc)
│   │   └── Page navigation
│   │
│   ├── VirtualLabPage (virtual-lab.tsx)
│   │   ├── Experiment list filtered by subject
│   │   ├── Quiz interface
│   │   └── Simulation viewer (iframe or HTML)
│   │
│   ├── SlidesPage (slides.tsx)
│   │   └── Presentation controls
│   │
│   └── SettingsPage (settings.tsx)
│       └── User preferences
│
└── TabBar (bottom navigation)
    └── Navigation links to all main pages
```

### UI Component Usage

- **Custom Components**: GlowCard, SubjectBadge, TabBar
- **Shadcn/ui Library**: Dialog, Drawer, Tabs, Card, Button, Select, Form, etc.
- **Radix UI**: Underlying primitives (Dialog, Dropdown, Menu, etc.)

### Canvas Drawing System (smart-board.tsx)

```
SmartBoardPage
├── Canvas ref + drawing context
├── Tool selection (pen, highlighter, eraser, shapes, text)
├── Stroke data structure:
│   ├── id, tool, points, color, width, opacity
│   └── Stored in boardStore → pages → strokes
├── Event handlers:
│   ├── onMouseDown/Move/Up (drawing)
│   ├── Undo/Redo (history management)
│   └── Page management (add/delete/navigate)
└── Export: Canvas to image (future feature)
```

---

## 📊 Data Models

### Subject Colors & Classes
```typescript
// From curriculum.ts
type Subject = 'physics' | 'chemistry' | 'biology' | 'mathematics' | ...

subjectColorClasses: Record<Subject, {
  bg: string;      // background color
  text: string;    // text color
  border: string;  // border color
  glow: string;    // glow effect color
}>
```

### Experiment Model
```typescript
// From curriculum.ts & experiments.ts
interface Experiment {
  id: string;
  title: { en: string; hi: string };
  subject: Subject;
  classLevel: number;
  objective: { en: string; hi: string };
  materials: { en: string[]; hi: string[] };
  procedure: { en: string[]; hi: string[] };
  observation: { en: string; hi: string };
  conclusion: { en: string; hi: string };
  formula?: string;
  keyPoints: { en: string[]; hi: string[] };
  quiz: QuizQuestion[];
  simulationUrl?: string;  // Local or external HTML
}

interface QuizQuestion {
  question: { en: string; hi: string };
  options: { en: string[]; hi: string[] };
  correct: number;
}
```

### Drawing Stroke Model
```typescript
// From boardStore.ts
interface Stroke {
  id: string;
  tool: Tool;           // pen, highlighter, eraser, line, rect, circle, text
  points: Point[];      // [{ x, y }, ...]
  color: string;        // hex color
  width: number;        // stroke width in pixels
  opacity: number;      // 0-1
  text?: string;        // for text tool
}

interface BoardPage {
  id: string;
  strokes: Stroke[];
}
```

---

## 🚀 Available Routes (TanStack Router)

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | HomePage | Dashboard with quick actions & subject cards |
| `/smart-board` | SmartBoardPage | Interactive drawing board for teachers |
| `/virtual-lab` | VirtualLabPage | Science experiments & simulations |
| `/slides` | SlidesPage | Presentation/slide creation |
| `/settings` | SettingsPage | User preferences & settings |
| `/*` | NotFoundComponent | 404 error page |

---

## 🎨 Styling & Theme System

### CSS Variables (styles.css)
- Science subject colors: `--sci-cyan`, `--sci-orange`, `--sci-green`, `--sci-purple`, etc.
- Tailwind CSS variables for theme colors
- Dark mode support with CSS custom properties

### Theme Management
- **Store**: `themeStore.ts` (Zustand)
- **Classes**: Applied to root div (`dark` class for dark mode)
- **Colors**: RGB-based with alpha channel support

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @tanstack/react-router | ^1.168.0 | File-based routing |
| @tanstack/react-start | ^1.167.14 | Full-stack framework |
| @tanstack/react-query | ^5.83.0 | Data fetching & caching |
| zustand | Latest | Lightweight state management |
| react-hook-form | Latest | Form validation |
| zod | Latest | Schema validation |
| @radix-ui/* | Various | Unstyled accessible components |
| tailwindcss | ^4.2.1 | Utility-first CSS |
| shadcn/ui | Various | Pre-built Radix components |
| lucide-react | Latest | Icon library |
| sonner | Latest | Toast notifications |
| cmdk | ^1.1.1 | Command palette |
| date-fns | ^4.1.0 | Date utilities |

---

## 🔄 Important File Relationships

### Smart Board Workflow
1. User opens `/smart-board` → SmartBoardPage
2. Selects tool from toolbar
3. Draws on canvas → strokes added to `boardStore`
4. Canvas re-renders on each stroke update
5. Undo/Redo modifies page history
6. Multiple pages managed via page navigation

### Virtual Lab Workflow
1. User opens `/virtual-lab` → VirtualLabPage
2. Selects subject (Physics/Chemistry/Biology)
3. Views experiment list (from `experiments.ts`)
4. Launches experiment → shows procedure in modal
5. Starts simulation → loads HTML from `public/simulations/`
6. Completes quiz from experiment data
7. Lab state persisted in `labStore`

### i18n Workflow
1. `langStore.ts` maintains current language
2. `translations.ts` contains all strings
3. Components import: `import { t } from "../data/translations"`
4. Usage: `t(lang, 'key')` → returns English or Hindi
5. Toggle: `langStore.toggle()` switches between en/hi

---

## 📝 Configuration Files Explained

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript compiler options |
| `vite.config.ts` | Vite build config (using @lovable.dev preset) |
| `wrangler.jsonc` | Cloudflare Workers deployment config |
| `components.json` | Shadcn/ui component registry |
| `eslint.config.js` | ESLint rules for code quality |
| `package.json` | Dependencies & npm scripts |
| `bunfig.toml` | Bun-specific configuration |

---

## 🏗️ Build & Development

### Scripts
```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Development Workflow
1. Changes to files in `src/` auto-reload via Vite HMR
2. Routes auto-discovered from `src/routes/` directory
3. Components can be added to `src/components/`
4. Stores created with Zustand in `src/store/`

---

## 🌐 Internationalization (i18n)

### Structure
- **Default Language**: English (en)
- **Supported Languages**: English, Hindi
- **Location**: `src/data/translations.ts`
- **Storage**: `langStore` (Zustand)
- **Access**: `useLangStore()` hook

### Adding New Translations
1. Add key-value pairs to `translations.ts`
2. Format: `{ en: "...", hi: "..." }`
3. Use in components: `t(lang, 'keyName')`

---

## 🎯 Future Development Areas

### Currently Incomplete Features
- **Slides Module** (`src/routes/slides.tsx`) - Presentation creation
- **Settings Page** (`src/routes/settings.tsx`) - User preferences UI
- **Database Integration** (`src/lib/db.ts`) - Persistence layer
- **Export Features** - Save drawings/experiments as files
- **Quiz System** - Full implementation in virtual lab
- **Mobile Responsiveness** - Needs enhancement for phones

### Suggested Enhancements
1. **Collaboration Features** - Real-time co-drawing
2. **Content Repository** - More simulations/experiments
3. **Analytics Dashboard** - Track student progress
4. **Assessment Tools** - Auto-grading for quizzes
5. **Media Support** - Audio/video integration
6. **Offline Mode** - Service worker for offline functionality
7. **Export/Import** - Save/load experiments and boards
8. **API Backend** - Connect to external data sources

---

## 🐛 Debugging & Development Tips

### Key Development Files
- `src/router.tsx` - Router configuration
- `src/routeTree.gen.ts` - Auto-generated (DO NOT EDIT)
- `styles.css` - Global styles with CSS variables
- `.tanstack/` - TanStack generated files

### Common Development Tasks
- **Add new route**: Create file in `src/routes/`
- **Add new component**: Create in `src/components/` (or `ui/` for primitives)
- **Add new store**: Create in `src/store/` with Zustand
- **Add translations**: Update `src/data/translations.ts`
- **Add experiment**: Update `src/data/experiments.ts`

---

## 📄 External References

- NCERT Content Reference: `NCERT_Digital_Board_Class1_to_12.pdf`
- Public Simulations: `public/simulations/physics/class-9/newton_fma_*.html`
- PDF Extraction Tool: `extract-pdf.cjs`

---

## 🎓 Project Summary

VidyaBoard is a modern, full-stack educational tool combining:
- **Frontend**: React + TanStack ecosystem with real-time canvas drawing
- **Styling**: Tailwind CSS with science-themed color palette
- **State Management**: Zustand for lightweight reactive state
- **Deployment**: Cloudflare Workers edge computing
- **Content**: Bilingual (English/Hindi) Indian curriculum

The architecture prioritizes **teacher experience**, **student engagement**, and **accessibility** for Indian classrooms while maintaining modern web development best practices.

---

**Last Updated**: 2026-09-11
**Project Status**: Active Development
**Main Branches**: Smart Board, Virtual Lab, Multi-Language Support
