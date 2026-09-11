import { type Subject } from './curriculum';

export type Stage = 'foundation' | 'preparatory' | 'middle' | 'secondary' | 'senior';

export interface Experiment {
  id: string;
  title: string;
  description: string;
  size: string; // e.g. "2.4 MB"
  url: string; // Placeholder or real URL
  subject: Subject;
  classLevel: number;
  stage: Stage;
}

export const stages: { id: Stage; label: string; range: string }[] = [
  { id: 'foundation', label: 'Foundation', range: 'Class 1–2' },
  { id: 'preparatory', label: 'Preparatory', range: 'Class 3–5' },
  { id: 'middle', label: 'Middle', range: 'Class 6–8' },
  { id: 'secondary', label: 'Secondary', range: 'Class 9–10' },
  { id: 'senior', label: 'Senior Secondary', range: 'Class 11–12' },
];

export const experiments: Experiment[] = [
  // FOUNDATION (Class 1–2)
  // Mathematics
  { id: 'f-m1', title: 'Animated Abacus', description: 'Counting & Numbers with visual beads.', size: '1.2 MB', url: '/simulations/math/abacus.html', subject: 'mathematics', classLevel: 1, stage: 'foundation' },
  { id: 'f-m2', title: 'Shape Matching', description: 'Drag and drop basic geometric shapes.', size: '0.8 MB', url: '/simulations/math/shapes.html', subject: 'mathematics', classLevel: 1, stage: 'foundation' },
  { id: 'f-m3', title: 'Apple Counter', description: 'Addition & Subtraction using fruit visuals.', size: '1.5 MB', url: '/simulations/math/apple-counter.html', subject: 'mathematics', classLevel: 2, stage: 'foundation' },
  { id: 'f-m4', title: 'Pattern Builder', description: 'Complete the sequence of colors and shapes.', size: '1.1 MB', url: '/simulations/math/patterns.html', subject: 'mathematics', classLevel: 2, stage: 'foundation' },
  { id: 'f-m5', title: 'Size Comparison', description: 'Measure and compare lengths of objects.', size: '0.9 MB', url: '/simulations/math/measurement.html', subject: 'mathematics', classLevel: 2, stage: 'foundation' },
  { id: 'f-m6', title: 'Coin Tray', description: 'Introduction to money and currency.', size: '1.3 MB', url: '/simulations/math/money.html', subject: 'mathematics', classLevel: 2, stage: 'foundation' },

  // EVS
  { id: 'f-evs1', title: 'Family Tree', description: 'Drag and drop family relationships.', size: '2.1 MB', url: '/simulations/evs/family-tree.html', subject: 'evs', classLevel: 1, stage: 'foundation' },
  { id: 'f-evs2', title: 'Animals & Habitats', description: 'Match animals to their homes.', size: '3.4 MB', url: '/simulations/evs/habitats.html', subject: 'evs', classLevel: 1, stage: 'foundation' },
  { id: 'f-evs3', title: 'Plant Growth', description: 'Simulate the life cycle of a seed.', size: '1.8 MB', url: '/simulations/evs/plant-growth.html', subject: 'evs', classLevel: 2, stage: 'foundation' },
  { id: 'f-evs4', title: 'Food Plate Builder', description: 'Build a healthy meal.', size: '2.5 MB', url: '/simulations/evs/food-plate.html', subject: 'evs', classLevel: 2, stage: 'foundation' },
  { id: 'f-evs5', title: 'Water Cycle', description: 'Interactive evaporation & rain animation.', size: '4.2 MB', url: '/simulations/evs/water-cycle.html', subject: 'evs', classLevel: 2, stage: 'foundation' },
  { id: 'f-evs6', title: 'Human Senses', description: 'Explore sight, sound, and touch.', size: '2.8 MB', url: '/simulations/evs/senses.html', subject: 'evs', classLevel: 2, stage: 'foundation' },

  // English
  { id: 'f-en1', title: 'Phonics Board', description: 'Alphabet sounds and interactive letters.', size: '5.1 MB', url: '/simulations/english/phonics.html', subject: 'english', classLevel: 1, stage: 'foundation' },
  { id: 'f-en2', title: 'CVC Builder', description: 'Construct Consonant-Vowel-Consonant words.', size: '1.6 MB', url: '/simulations/english/cvc-builder.html', subject: 'english', classLevel: 1, stage: 'foundation' },
  { id: 'f-en3', title: 'Rhyming Game', description: 'Find matching rhyme sounds.', size: '1.4 MB', url: '/simulations/english/rhyming.html', subject: 'english', classLevel: 2, stage: 'foundation' },

  // PREPARATORY (Class 3–5)
  // Mathematics
  { id: 'p-m1', title: 'Place Value Abacus', description: 'Tens, hundreds, and thousands visualization.', size: '1.2 MB', url: '/simulations/math/place-value.html', subject: 'mathematics', classLevel: 3, stage: 'preparatory' },
  { id: 'p-m2', title: 'Fraction Slicer', description: 'Slice shapes into equal parts.', size: '2.2 MB', url: '/simulations/math/fractions.html', subject: 'mathematics', classLevel: 4, stage: 'preparatory' },
  { id: 'p-m3', title: 'Multiplication Grid', description: 'Interactive table for learning products.', size: '0.7 MB', url: '/simulations/math/multiplication.html', subject: 'mathematics', classLevel: 3, stage: 'preparatory' },
  { id: 'p-m4', title: '3D Shape Viewer', description: 'Rotate and explore cube, sphere, cone.', size: '4.5 MB', url: '/simulations/math/3d-shapes.html', subject: 'mathematics', classLevel: 5, stage: 'preparatory' },
  { id: 'p-m5', title: 'Perimeter & Area', description: 'Draw rectangles and calculate size.', size: '1.4 MB', url: '/simulations/math/perimeter.html', subject: 'mathematics', classLevel: 5, stage: 'preparatory' },
  { id: 'p-m6', title: 'Bar Graph Builder', description: 'Input data to generate colorful graphs.', size: '1.8 MB', url: '/simulations/math/graphs.html', subject: 'mathematics', classLevel: 4, stage: 'preparatory' },
  { id: 'p-m7', title: 'Virtual Market', description: 'Simulate buying and selling with change.', size: '3.1 MB', url: '/simulations/math/market.html', subject: 'mathematics', classLevel: 5, stage: 'preparatory' },

  // Science
  { id: 'p-s1', title: 'Balanced Diet', description: 'Sort food into nutrition categories.', size: '2.3 MB', url: '/simulations/science/diet.html', subject: 'science', classLevel: 3, stage: 'preparatory' },
  { id: 'p-s2', title: 'Living vs Non-Living', description: 'Categorization sorting simulation.', size: '1.1 MB', url: '/simulations/science/living.html', subject: 'science', classLevel: 3, stage: 'preparatory' },
  { id: 'p-s3', title: 'Adaptation Simulator', description: 'How animals survive in different climates.', size: '4.8 MB', url: '/simulations/science/adaptation.html', subject: 'science', classLevel: 4, stage: 'preparatory' },
  { id: 'p-s4', title: 'Ball Push', description: 'Force & Motion basic experiments.', size: '2.6 MB', url: '/simulations/science/force.html', subject: 'science', classLevel: 4, stage: 'preparatory' },
  { id: 'p-s5', title: 'Heat Slider', description: 'States of Matter (Solid, Liquid, Gas).', size: '3.2 MB', url: '/simulations/science/states.html', subject: 'science', classLevel: 5, stage: 'preparatory' },
  { id: 'p-s6', title: 'Lever Tool', description: 'Simple Machines interaction.', size: '2.1 MB', url: '/simulations/science/lever.html', subject: 'science', classLevel: 5, stage: 'preparatory' },

  // Social Science
  { id: 'p-ss1', title: 'Map Direction', description: 'Compass navigation on a local map.', size: '1.5 MB', url: '/simulations/social-science/map.html', subject: 'social-science', classLevel: 3, stage: 'preparatory' },
  { id: 'p-ss2', title: '3D Earth Model', description: 'Rotate the globe and see continents.', size: '6.4 MB', url: '/simulations/social-science/globe.html', subject: 'social-science', classLevel: 4, stage: 'preparatory' },
  { id: 'p-ss3', title: 'Resource Sorting', description: 'Natural vs Man-made resources.', size: '1.2 MB', url: '/simulations/social-science/resources.html', subject: 'social-science', classLevel: 4, stage: 'preparatory' },
  { id: 'p-ss4', title: 'History Timeline', description: 'Interactive scrollable era timeline.', size: '2.8 MB', url: '/simulations/social-science/timeline.html', subject: 'social-science', classLevel: 5, stage: 'preparatory' },

  // English
  { id: 'p-en1', title: 'Parts of Speech', description: 'Identify Nouns, Verbs, Adjectives.', size: '1.3 MB', url: '/simulations/english/speech.html', subject: 'english', classLevel: 4, stage: 'preparatory' },
  { id: 'p-en2', title: 'Highlight Tool', description: 'Interactive reading practice.', size: '0.9 MB', url: '/simulations/english/reading.html', subject: 'english', classLevel: 3, stage: 'preparatory' },
  { id: 'p-en3', title: 'Tense Timeline', description: 'Past, Present, Future visualizer.', size: '1.5 MB', url: '/simulations/english/tenses.html', subject: 'english', classLevel: 5, stage: 'preparatory' },

  // MIDDLE (Class 6–8)
  // Mathematics
  { id: 'm-m1', title: 'Integer Number Line', description: 'Negative and positive number math.', size: '1.1 MB', url: '/simulations/math/integers.html', subject: 'mathematics', classLevel: 6, stage: 'middle' },
  { id: 'm-m2', title: 'Fraction to Decimal', description: 'Conversion visual slider.', size: '0.8 MB', url: '/simulations/math/decimal.html', subject: 'mathematics', classLevel: 6, stage: 'middle' },
  { id: 'm-m3', title: 'Ratio Scaling', description: 'Interactive scaling of objects.', size: '1.4 MB', url: '/simulations/math/ratio.html', subject: 'mathematics', classLevel: 6, stage: 'middle' },
  { id: 'm-m4', title: 'Algebra Tiles', description: 'Visual variables and expressions.', size: '2.1 MB', url: '/simulations/math/algebra-tiles.html', subject: 'mathematics', classLevel: 7, stage: 'middle' },
  { id: 'm-m5', title: 'Equation Balance', description: 'Solve linear equations on a scale.', size: '2.4 MB', url: '/simulations/math/balance.html', subject: 'mathematics', classLevel: 7, stage: 'middle' },
  { id: 'm-m6', title: 'Triangle Tool', description: 'Angle sum and properties.', size: '1.2 MB', url: '/simulations/math/triangles.html', subject: 'mathematics', classLevel: 7, stage: 'middle' },
  { id: 'm-m7', title: 'Volume Builder', description: 'Fill containers with unit cubes.', size: '3.3 MB', url: '/simulations/math/volume.html', subject: 'mathematics', classLevel: 8, stage: 'middle' },
  { id: 'm-m8', title: 'Statistic Tool', description: 'Mean, Median, and Mode calculator.', size: '1.1 MB', url: '/simulations/math/statistics.html', subject: 'mathematics', classLevel: 8, stage: 'middle' },
  { id: 'm-m9', title: 'Percentage Grid', description: 'Color grid to see percentages.', size: '0.6 MB', url: '/simulations/math/percentage.html', subject: 'mathematics', classLevel: 6, stage: 'middle' },

  // Science
  { id: 'm-s1', title: 'Cell Explorer', description: 'Inside Animal and Plant cells.', size: '7.2 MB', url: '/simulations/science/cells.html', subject: 'science', classLevel: 8, stage: 'middle' },
  { id: 'm-s2', title: 'Optics Tool', description: 'Reflection and Refraction visualizer.', size: '3.5 MB', url: '/simulations/science/optics.html', subject: 'science', classLevel: 7, stage: 'middle' },
  { id: 'm-s3', title: 'Circuit Builder', description: 'Batteries, bulbs, and wires.', size: '4.1 MB', url: '/simulations/science/circuit.html', subject: 'science', classLevel: 6, stage: 'middle' },
  { id: 'm-s4', title: 'Motion Plotter', description: 'Graphing distance over time.', size: '2.8 MB', url: '/simulations/science/motion.html', subject: 'science', classLevel: 7, stage: 'middle' },
  { id: 'm-s5', title: 'Wave Simulator', description: 'Visualizing sound frequency.', size: '3.9 MB', url: '/simulations/science/sound.html', subject: 'science', classLevel: 8, stage: 'middle' },
  { id: 'm-s6', title: 'Microscope Tool', description: 'Virtual slide zoom and focus.', size: '5.4 MB', url: '/simulations/science/microscope.html', subject: 'science', classLevel: 8, stage: 'middle' },
  { id: 'm-s7', title: 'Farming Cycle', description: 'Crop rotation and soil simulation.', size: '4.6 MB', url: '/simulations/science/farming.html', subject: 'science', classLevel: 8, stage: 'middle' },
  { id: 'm-s8', title: 'Food Web', description: 'Interconnected relationships.', size: '2.5 MB', url: '/simulations/science/food-web.html', subject: 'science', classLevel: 7, stage: 'middle' },

  // Social Science
  { id: 'm-ss1', title: 'Solar System', description: 'Planetary animation and distances.', size: '8.1 MB', url: '/simulations/social-science/space.html', subject: 'social-science', classLevel: 6, stage: 'middle' },
  { id: 'm-ss2', title: 'Landform Builder', description: 'Mountains, valleys, and plateaus.', size: '5.2 MB', url: '/simulations/social-science/landforms.html', subject: 'social-science', classLevel: 6, stage: 'middle' },
  { id: 'm-ss3', title: 'Ocean Map', description: 'Currents and marine layers.', size: '4.7 MB', url: '/simulations/social-science/ocean.html', subject: 'social-science', classLevel: 7, stage: 'middle' },
  { id: 'm-ss4', title: 'Mughal Timeline', description: 'Imperial history interactives.', size: '3.1 MB', url: '/simulations/social-science/mughal.html', subject: 'social-science', classLevel: 7, stage: 'middle' },
  { id: 'm-ss5', title: 'Constitution', description: 'Interactive preamble and rights.', size: '1.8 MB', url: '/simulations/social-science/constitution.html', subject: 'social-science', classLevel: 8, stage: 'middle' },
  { id: 'm-ss6', title: 'Resource Map', description: 'Minerals and agriculture of India.', size: '3.8 MB', url: '/simulations/social-science/india-map.html', subject: 'social-science', classLevel: 8, stage: 'middle' },

  // SECONDARY (Class 9–10)
  // Mathematics
  { id: 's-m1', title: 'Irrational Zoom', description: 'Root values on number line.', size: '1.4 MB', url: '/simulations/math/irrational.html', subject: 'mathematics', classLevel: 9, stage: 'secondary' },
  { id: 's-m2', title: 'Polynomial Graph', description: 'Quadratic and cubic functions.', size: '2.2 MB', url: '/simulations/math/polynomials.html', subject: 'mathematics', classLevel: 9, stage: 'secondary' },
  { id: 's-m3', title: 'Linear Intersection', description: 'Solving pairs of equations.', size: '1.8 MB', url: '/simulations/math/linear.html', subject: 'mathematics', classLevel: 10, stage: 'secondary' },
  { id: 's-m4', title: 'Triangle Congruence', description: 'SAS, ASA, SSS proofs.', size: '1.6 MB', url: '/simulations/math/congruence.html', subject: 'mathematics', classLevel: 9, stage: 'secondary' },
  { id: 's-m5', title: 'Circle Theorems', description: 'Interactive arcs and tangents.', size: '1.9 MB', url: '/simulations/math/circles.html', subject: 'mathematics', classLevel: 10, stage: 'secondary' },
  { id: 's-m6', title: 'Coordinate Lab', description: 'Distance and Section formulas.', size: '1.4 MB', url: '/simulations/math/坐标.html', subject: 'mathematics', classLevel: 10, stage: 'secondary' },
  { id: 's-m7', title: 'Trig Tool', description: 'Sine, Cosine, Tangent ratios.', size: '2.1 MB', url: '/simulations/math/trigonometry.html', subject: 'mathematics', classLevel: 10, stage: 'secondary' },

  // Physics
  { id: 's-p1', title: 'Motion Simulator', description: 'Acceleration and velocity curves.', size: '3.4 MB', url: '/simulations/physics/motion.html', subject: 'physics', classLevel: 9, stage: 'secondary' },
  { id: 'newton-second-law', title: "Newton's Second Law", description: 'Force, mass and acceleration simulation', size: '1.5 MB', url: 'https://manishkushwaha-ds.github.io/vidyaboard-simulations/simulations/Newton%20second%20law.html', subject: 'physics', classLevel: 9, stage: 'secondary' },
  { id: 's-p3', title: 'Gravitation Lab', description: 'Universal law visualization.', size: '3.8 MB', url: '/simulations/physics/gravity.html', subject: 'physics', classLevel: 9, stage: 'secondary' },
  { id: 's-p4', title: 'Inclined Plane', description: 'Work, Power, and Energy tool.', size: '2.7 MB', url: '/simulations/physics/energy.html', subject: 'physics', classLevel: 9, stage: 'secondary' },
  { id: 's-p5', title: 'Ray Diagrams', description: 'Concave and Convex mirrors.', size: '4.8 MB', url: '/simulations/physics/mirror.html', subject: 'physics', classLevel: 10, stage: 'secondary' },
  { id: 's-p6', title: 'Ohm’s Law', description: 'Resistance and Voltage circuit.', size: '3.1 MB', url: '/simulations/physics/ohms-law.html', subject: 'physics', classLevel: 10, stage: 'secondary' },

  // Chemistry
  { id: 's-c1', title: 'Atom Builder', description: 'Protons, Neutrons, Electrons.', size: '3.6 MB', url: '/simulations/chemistry/atoms.html', subject: 'chemistry', classLevel: 9, stage: 'secondary' },
  { id: 's-c2', title: 'Equation Balancer', description: 'Coefficient balancing simulator.', size: '1.8 MB', url: '/simulations/chemistry/balancing.html', subject: 'chemistry', classLevel: 10, stage: 'secondary' },
  { id: 's-c3', title: 'pH Scale Tool', description: 'Acids, Bases, and indicators.', size: '2.4 MB', url: '/simulations/chemistry/ph.html', subject: 'chemistry', classLevel: 10, stage: 'secondary' },
  { id: 's-c4', title: 'Carbon Chains', description: 'Hydrocarbon structure builder.', size: '3.8 MB', url: '/simulations/chemistry/carbon.html', subject: 'chemistry', classLevel: 10, stage: 'secondary' },
  { id: 's-c5', title: 'Periodic Table', description: 'Interactive element data.', size: '2.9 MB', url: '/simulations/chemistry/table.html', subject: 'chemistry', classLevel: 9, stage: 'secondary' },

  // Biology
  { id: 's-b1', title: 'Cell Division', description: 'Mitosis and Meiosis animation.', size: '6.4 MB', url: '/simulations/biology/division.html', subject: 'biology', classLevel: 9, stage: 'secondary' },
  { id: 's-b2', title: 'Body Systems', description: 'Digestive, Circular, Nervous.', size: '9.2 MB', url: '/simulations/biology/systems.html', subject: 'biology', classLevel: 10, stage: 'secondary' },
  { id: 's-b3', title: 'Punnett Square', description: 'Genetics and heredity tool.', size: '2.1 MB', url: '/simulations/biology/genetics.html', subject: 'biology', classLevel: 10, stage: 'secondary' },
  { id: 's-b4', title: 'Sustainability', description: 'Natural resource management.', size: '3.5 MB', url: '/simulations/biology/ecology.html', subject: 'biology', classLevel: 10, stage: 'secondary' },

  // SENIOR SECONDARY (Class 11–12)
  // Mathematics
  { id: 'ss-m1', title: 'Unit Circle', description: 'Trigonometric periodicity.', size: '2.2 MB', url: '/simulations/math/unit-circle.html', subject: 'mathematics', classLevel: 11, stage: 'senior' },
  { id: 'ss-m2', title: 'Complex Plotter', description: 'Argand plane visualization.', size: '1.8 MB', url: '/simulations/math/complex.html', subject: 'mathematics', classLevel: 11, stage: 'senior' },
  { id: 'ss-m3', title: 'Derivative Tool', description: 'Calculus tangent line simulation.', size: '2.8 MB', url: '/simulations/math/derivative.html', subject: 'mathematics', classLevel: 12, stage: 'senior' },
  { id: 'ss-m4', title: 'Integration Area', description: 'Area under the curve visual.', size: '3.1 MB', url: '/simulations/math/integration.html', subject: 'mathematics', classLevel: 12, stage: 'senior' },
  { id: 'ss-m5', title: 'Vector 3D', description: 'Coordinate vectors in space.', size: '4.5 MB', url: '/simulations/math/vectors.html', subject: 'mathematics', classLevel: 12, stage: 'senior' },
  { id: 'ss-m6', title: 'Matrix Calc', description: 'Determinants and operations.', size: '1.5 MB', url: '/simulations/math/matrix.html', subject: 'mathematics', classLevel: 12, stage: 'senior' },

  // Physics
  { id: 'ss-p1', title: 'Projectile Lab', description: 'Parabolic motion trajectories.', size: '3.8 MB', url: '/simulations/physics/projectile.html', subject: 'physics', classLevel: 11, stage: 'senior' },
  { id: 'ss-p2', title: 'Orbital Sim', description: 'Keplerian orbits and satellites.', size: '6.2 MB', url: '/simulations/physics/orbits.html', subject: 'physics', classLevel: 11, stage: 'senior' },
  { id: 'ss-p3', title: 'PV Graph', description: 'Thermodynamics gas cycles.', size: '2.9 MB', url: '/simulations/physics/thermo.html', subject: 'physics', classLevel: 11, stage: 'senior' },
  { id: 'ss-p4', title: 'Kirchhoff Circuit', description: 'Complex network analysis.', size: '5.4 MB', url: '/simulations/physics/kirchhoff.html', subject: 'physics', classLevel: 12, stage: 'senior' },
  { id: 'ss-p5', title: 'Induction Tool', description: 'Flux and Lenz Law simulator.', size: '4.1 MB', url: '/simulations/physics/induction.html', subject: 'physics', classLevel: 12, stage: 'senior' },
  { id: 'ss-p6', title: 'Photoelectric', description: 'Quantum photon effect.', size: '3.5 MB', url: '/simulations/physics/quantum.html', subject: 'physics', classLevel: 12, stage: 'senior' },

  // Chemistry
  { id: 'ss-c1', title: 'Mole Calculator', description: 'Stoichiometry and concentrations.', size: '1.1 MB', url: '/simulations/chemistry/moles.html', subject: 'chemistry', classLevel: 11, stage: 'senior' },
  { id: 'ss-c2', title: 'Orbital Viewer', description: '3D s, p, d, f subshells.', size: '7.8 MB', url: '/simulations/chemistry/orbitals.html', subject: 'chemistry', classLevel: 11, stage: 'senior' },
  { id: 'ss-c3', title: 'Bond Builder', description: 'Ionic and Covalent simulations.', size: '4.2 MB', url: '/simulations/chemistry/bonds.html', subject: 'chemistry', classLevel: 11, stage: 'senior' },
  { id: 'ss-c4', title: 'Rate Tool', description: 'Kinetics and activation energy.', size: '3.1 MB', url: '/simulations/chemistry/kinetics.html', subject: 'chemistry', classLevel: 12, stage: 'senior' },
  { id: 'ss-c5', title: 'Bio-Builder', description: 'Proteins and DNA structures.', size: '8.4 MB', url: '/simulations/chemistry/biomolecules.html', subject: 'chemistry', classLevel: 12, stage: 'senior' },

  // Biology
  { id: 'ss-b1', title: 'Photosynthesis', description: 'Light and Dark reactions.', size: '5.2 MB', url: '/simulations/biology/photosynthesis.html', subject: 'biology', classLevel: 11, stage: 'senior' },
  { id: 'ss-b2', title: 'Neuron Sim', description: 'Synaptic transmission curves.', size: '6.8 MB', url: '/simulations/biology/neurology.html', subject: 'biology', classLevel: 11, stage: 'senior' },
  { id: 'ss-b3', title: 'DNA Replication', description: 'Fork and enzyme animation.', size: '7.1 MB', url: '/simulations/biology/dna.html', subject: 'biology', classLevel: 12, stage: 'senior' },
  { id: 'ss-b4', title: 'Clone Lab', description: 'Genetic engineering tools.', size: '4.5 MB', url: '/simulations/biology/cloning.html', subject: 'biology', classLevel: 12, stage: 'senior' },
];
