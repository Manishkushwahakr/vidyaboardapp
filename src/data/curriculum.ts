export interface Experiment {
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
  simulationUrl?: string; // Path to local HTML or external simulation
}

export interface QuizQuestion {
  question: { en: string; hi: string };
  options: { en: string[]; hi: string[] };
  correct: number;
}

export type Subject = 
  | 'physics' 
  | 'chemistry' 
  | 'biology' 
  | 'mathematics' 
  | 'science' 
  | 'evs' 
  | 'social-science' 
  | 'english' 
  | 'commerce' 
  | 'computer-science' 
  | 'humanities';

export const subjectColors: Record<Subject, string> = {
  physics: 'var(--sci-cyan)',
  chemistry: 'var(--sci-orange)',
  biology: 'var(--sci-green)',
  mathematics: 'var(--sci-purple)',
  science: 'var(--sci-cyan)',
  evs: 'var(--sci-green)',
  'social-science': 'var(--sci-orange)',
  english: 'var(--sci-blue)',
  commerce: 'var(--sci-yellow)',
  'computer-science': 'var(--sci-pink)',
  humanities: 'var(--sci-red)',
};

export const subjectColorClasses: Record<Subject, { bg: string; text: string; border: string; glow: string }> = {
  physics: { bg: 'bg-sci-cyan/10', text: 'text-sci-cyan', border: 'border-sci-cyan/30', glow: 'glow-cyan' },
  chemistry: { bg: 'bg-sci-orange/10', text: 'text-sci-orange', border: 'border-sci-orange/30', glow: 'glow-orange' },
  biology: { bg: 'bg-sci-green/10', text: 'text-sci-green', border: 'border-sci-green/30', glow: 'glow-green' },
  mathematics: { bg: 'bg-sci-purple/10', text: 'text-sci-purple', border: 'border-sci-purple/30', glow: 'glow-purple' },
  science: { bg: 'bg-sci-cyan/10', text: 'text-sci-cyan', border: 'border-sci-cyan/30', glow: 'glow-cyan' },
  evs: { bg: 'bg-sci-green/10', text: 'text-sci-green', border: 'border-sci-green/30', glow: 'glow-green' },
  'social-science': { bg: 'bg-sci-orange/10', text: 'text-sci-orange', border: 'border-sci-orange/30', glow: 'glow-orange' },
  english: { bg: 'bg-sci-blue/10', text: 'text-sci-blue', border: 'border-sci-blue/30', glow: 'glow-blue' },
  commerce: { bg: 'bg-sci-yellow/10', text: 'text-sci-yellow', border: 'border-sci-yellow/30', glow: 'glow-yellow' },
  'computer-science': { bg: 'bg-sci-pink/10', text: 'text-sci-pink', border: 'border-sci-pink/30', glow: 'glow-pink' },
  humanities: { bg: 'bg-sci-red/10', text: 'text-sci-red', border: 'border-sci-red/30', glow: 'glow-red' },
};

function genId(subject: string, cls: number, idx: number) {
  return `${subject}-c${cls}-${idx}`;
}

/**
 * EXPERIMENT TEMPLATE FOR USER UPLOAD:
 * 
 * {
 *   id: genId('subject-code', class, index),
 *   title: { en: 'Title', hi: 'शीर्षक' },
 *   subject: 'subject-name',
 *   classLevel: class,
 *   objective: { en: 'Objective', hi: 'उद्देश्य' },
 *   materials: { en: ['M1'], hi: ['M1'] },
 *   procedure: { en: ['P1'], hi: ['P1'] },
 *   observation: { en: 'Obs', hi: 'अवलोकन' },
 *   conclusion: { en: 'Conc', hi: 'निष्कर्ष' },
 *   formula: 'F = ma',
 *   keyPoints: { en: ['K1'], hi: ['K1'] },
 *   quiz: [ { question: { en: 'Q', hi: 'Q' }, options: { en: ['O1'], hi: ['O1'] }, correct: 0 } ],
 *   simulationUrl: '/simulations/subject/class-X/file.html'
 * }
 */

const physicsExperiments: Experiment[] = [
  {
    id: genId('phy', 9, 1),
    title: { en: "Newton's Second Law (F=ma)", hi: "न्यूटन का गति का दूसरा नियम (F=ma)" },
    subject: 'physics',
    classLevel: 9,
    objective: { en: "To demonstrate the relationship between Force, Mass, and Acceleration.", hi: "बल, द्रव्यमान और त्वरण के बीच संबंध प्रदर्शित करना।" },
    materials: { en: ["Simulation software", "Virtual weights", "Frictionless track"], hi: ["सिमुलेशन सॉफ्टवेयर", "वर्चुअल बाट", "घर्षण रहित ट्रैक"] },
    procedure: { en: ["Set mass of the object", "Apply varying force", "Observe acceleration changes", "Verify F = ma"], hi: ["वस्तु का द्रव्यमान निर्धारित करें", "अलग-अलग बल लगाएं", "त्वरण में बदलाव देखें", "F = ma सत्यापित करें"] },
    observation: { en: "Acceleration is directly proportional to force and inversely proportional to mass.", hi: "त्वरण बल के सीधे आनुपातिक और द्रव्यमान के व्युत्क्रमानुपाती होता है।" },
    conclusion: { en: "Newton's second law is verified: Force = Mass × Acceleration.", hi: "न्यूटन का दूसरा नियम सत्यापित: बल = द्रव्यमान × त्वरण।" },
    formula: "F = m · a",
    keyPoints: { en: ["Force is measured in Newtons (N)", "Mass is measured in Kilograms (kg)", "Acceleration is m/s²"], hi: ["बल को न्यूटन (N) में मापा जाता है", "द्रव्यमान को किलोग्राम (kg) में मापा जाता है", "त्वरण m/s² है"] },
    quiz: [],
    simulationUrl: '/simulations/physics/class-9/newton_fma_hindi_english.html'
  }
];

const chemistryExperiments: Experiment[] = [];
const biologyExperiments: Experiment[] = [];
const mathExperiments: Experiment[] = [];
const scienceExperiments: Experiment[] = [];
const evsExperiments: Experiment[] = [];
const socialScienceExperiments: Experiment[] = [];
const englishExperiments: Experiment[] = [];
const commerceExperiments: Experiment[] = [];
const techExperiments: Experiment[] = [];
const humanitiesExperiments: Experiment[] = [];

export const allExperiments: Experiment[] = [
  ...physicsExperiments,
  ...chemistryExperiments,
  ...biologyExperiments,
  ...mathExperiments,
  ...scienceExperiments,
  ...evsExperiments,
  ...socialScienceExperiments,
  ...englishExperiments,
  ...commerceExperiments,
  ...techExperiments,
  ...humanitiesExperiments,
];

export const subjects: Subject[] = [
  'mathematics', 'science', 'physics', 'chemistry', 'biology', 
  'evs', 'social-science', 'english', 'commerce', 
  'computer-science', 'humanities'
];

export const classLevels = Array.from({ length: 12 }, (_, i) => i + 1);
