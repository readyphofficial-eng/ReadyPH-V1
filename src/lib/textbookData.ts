// ============ DATA TYPES ============
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'example'
  | 'keyterm'
  | 'diagram'
  | 'quiz'
  | 'summary'
  | 'funfact'
  | 'tip';

export interface TextbookBlock {
  type: BlockType;
  text?: string;
  term?: string;
  definition?: string;
  emoji?: string;
  question?: string;
  options?: string[];
  answer?: number;
}

export interface TextbookPage {
  title: string;
  blocks: TextbookBlock[];
}

export interface TextbookChapter {
  id: string;
  title: string;
  emoji: string;
  pages: TextbookPage[];
}

export interface TextbookSubject {
  id: string;
  name: string;
  emoji: string;
  color: string;
  chapters: TextbookChapter[];
}

export interface TextbookLevel {
  id: string;
  name: string;
  emoji: string;
  color: string;
  subjects: TextbookSubject[];
}

// Helpers for concise block creation
function h(text: string): TextbookBlock { return { type: 'heading', text }; }
function p(text: string): TextbookBlock { return { type: 'paragraph', text }; }
function ex(text: string): TextbookBlock { return { type: 'example', text }; }
function kt(term: string, definition: string): TextbookBlock { return { type: 'keyterm', term, definition }; }
function d(emoji: string, text: string): TextbookBlock { return { type: 'diagram', emoji, text }; }
function q(question: string, options: string[], answer: number): TextbookBlock { return { type: 'quiz', question, options, answer }; }
function s(text: string): TextbookBlock { return { type: 'summary', text }; }
function ff(text: string): TextbookBlock { return { type: 'funfact', text }; }
function tip(text: string): TextbookBlock { return { type: 'tip', text }; }

// ============ PRESCHOOL (Kinder) ============
const preschooljSubjects: TextbookSubject[] = [
  {
    id: 'ps-letters', name: 'Letters', emoji: '🔤', color: 'from-red-400 to-orange-400',
    chapters: [
      {
        id: 'ps-let-1', title: 'The Alphabet', emoji: '🔤',
        pages: [
          {
            title: 'Meet the Letters',
            blocks: [
              h('What is the Alphabet?'),
              p('The alphabet is a set of 26 letters from A to Z.'),
              d('🔤📝', 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'),
              kt('Vowels', 'A, E, I, O, U'),
              q('How many letters in the alphabet?', ['20', '26', '30', '25'], 1),
            ]
          },
          {
            title: 'Vowels and Consonants',
            blocks: [
              h('Special Letters'),
              p('Vowels are A, E, I, O, U. All other letters are consonants.'),
              ex('CAT has the vowel A. DOG has the vowel O.'),
              q('Which is a vowel?', ['B', 'E', 'K', 'T'], 1),
            ]
          },
          {
            title: 'Letter Sounds',
            blocks: [
              h('Every Letter Has a Sound'),
              p('A makes "ah", B makes "buh", C makes "cuh".'),
              ex('When we blend sounds, we make words!'),
              q('What sound does B make?', ['"ah"', '"buh"', '"cuh"', '"duh"'], 1),
            ]
          }
        ]
      },
      {
        id: 'ps-let-2', title: 'Writing & Names', emoji: '✏️',
        pages: [
          {
            title: 'Uppercase and Lowercase',
            blocks: [
              h('Big and Small Letters'),
              p('Every letter has uppercase (A) and lowercase (a) forms.'),
              ex('APPLE vs apple – same letter, different sizes.'),
              q('What is lowercase of B?', ['b', 'd', 'p', 'q'], 0),
            ]
          },
          {
            title: 'My Name',
            blocks: [
              h('Names Are Special'),
              p('Your name always starts with a capital letter.'),
              ex('Maria, Juan, Ana – capital letters at start!'),
              kt('Capital Letter', 'Big letter at the start of names.'),
              q('How should your name start?', ['lowercase', 'UPPERCASE', 'Uppercase', 'any way'], 2),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ps-numbers', name: 'Numbers', emoji: '🔢', color: 'from-green-400 to-emerald-400',
    chapters: [
      {
        id: 'ps-num-1', title: 'Counting', emoji: '1️⃣',
        pages: [
          {
            title: 'Numbers 1-10',
            blocks: [
              h('Let\'s Count!'),
              p('1 2 3 4 5 6 7 8 9 10 – count in order!'),
              d('1️⃣2️⃣3️⃣4️⃣5️⃣', 'One through Five'),
              ex('1 apple, 2 oranges, 3 bananas'),
              q('What comes after 5?', ['4', '6', '7', '8'], 1),
            ]
          },
          {
            title: 'Numbers 1-20',
            blocks: [
              h('Counting Higher'),
              p('We can count up to 20 and even more!'),
              d('🔟➕1️⃣0️⃣', 'Ten, Eleven, Twelve...'),
              q('What comes after 15?', ['14', '16', '17', '18'], 1),
            ]
          }
        ]
      },
      {
        id: 'ps-num-2', title: 'More & Less', emoji: '⚖️',
        pages: [
          {
            title: 'Comparing',
            blocks: [
              h('Which Has More?'),
              p('4 apples is MORE than 2 apples.'),
              ex('🍎🍎🍎🍎 > 🍎🍎'),
              kt('More', 'A bigger amount.'),
              kt('Less', 'A smaller amount.'),
              q('Which is more: 3 or 7?', ['3', '7'], 1),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ps-colors', name: 'Colors', emoji: '🎨', color: 'from-pink-400 to-rose-400',
    chapters: [
      {
        id: 'ps-col-1', title: 'Rainbow Colors', emoji: '🌈',
        pages: [
          {
            title: 'Colors of the Rainbow',
            blocks: [
              h('7 Rainbow Colors'),
              p('Red, Orange, Yellow, Green, Blue, Indigo, Violet'),
              d('🌈', 'ROYGBIV'),
              ex('🍎=Red, 🟠=Orange, 🌞=Yellow, 🌿=Green, 💙=Blue'),
              q('Is green in the rainbow?', ['Yes', 'No'], 0),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ps-shapes', name: 'Shapes', emoji: '���', color: 'from-blue-400 to-cyan-400',
    chapters: [
      {
        id: 'ps-shp-1', title: 'Basic Shapes', emoji: '▭',
        pages: [
          {
            title: 'Circle, Square, Triangle',
            blocks: [
              h('Common Shapes'),
              p('⭕ Circle, 🟫 Square, 🔺 Triangle'),
              ex('Ball=Circle, Box=Square, Pizza=Triangle'),
              kt('Circle', 'Round shape, no corners.'),
              kt('Square', '4 equal sides, 4 corners.'),
              kt('Triangle', '3 sides, 3 corners.'),
              q('How many corners on a square?', ['2', '3', '4', '5'], 2),
            ]
          }
        ]
      }
    ]
  }
];

// ============ GRADE 1 ============
const grade1Subjects: TextbookSubject[] = [
  {
    id: 'g1-reading', name: 'Reading', emoji: '📖', color: 'from-blue-400 to-indigo-500',
    chapters: [
      {
        id: 'g1-read-1', title: 'Simple Words', emoji: '📝',
        pages: [
          {
            title: 'Three-Letter Words',
            blocks: [
              h('Short Words'),
              p('These words have only 3 letters: CAT, DOG, RUN, SIT, BAT'),
              ex('The CAT sat on the MAT.'),
              q('Is CAT a 3-letter word?', ['Yes', 'No'], 0),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'g1-math', name: 'Math', emoji: '🔢', color: 'from-green-400 to-teal-500',
    chapters: [
      {
        id: 'g1-math-1', title: 'Addition', emoji: '➕',
        pages: [
          {
            title: 'Adding 1+1',
            blocks: [
              h('Simple Addition'),
              p('1 + 1 = 2'),
              d('🍎➕🍎=🍎🍎', 'One apple plus one apple equals two apples'),
              q('1 + 2 = ?', ['2', '3', '4', '1'], 1),
            ]
          }
        ]
      }
    ]
  }
];

// ============ GRADE 2 ============
const grade2Subjects: TextbookSubject[] = [
  {
    id: 'g2-reading', name: 'Reading', emoji: '📖', color: 'from-blue-400 to-indigo-500',
    chapters: [
      {
        id: 'g2-read-1', title: 'Sentences', emoji: '📝',
        pages: [
          {
            title: 'Reading Sentences',
            blocks: [
              h('Complete Sentences'),
              p('A sentence has a subject and a verb.'),
              ex('The boy runs. The girl plays.'),
              kt('Subject', 'Who or what the sentence is about.'),
              kt('Verb', 'The action word.'),
              q('In "The cat sleeps", what is the verb?', ['cat', 'sleeps', 'the', 'The'], 1),
            ]
          }
        ]
      }
    ]
  }
];

// ============ GRADE 3 ============
const grade3Subjects: TextbookSubject[] = [
  {
    id: 'g3-english', name: 'English', emoji: '📚', color: 'from-purple-400 to-pink-500',
    chapters: [
      {
        id: 'g3-eng-1', title: 'Grammar Basics', emoji: '✏️',
        pages: [
          {
            title: 'Nouns and Verbs',
            blocks: [
              h('Parts of Speech'),
              p('Nouns are things. Verbs are actions.'),
              ex('NOUN: cat, dog, house. VERB: run, jump, eat.'),
              kt('Noun', 'A person, place, or thing.'),
              kt('Verb', 'An action word.'),
              q('Is "happy" a noun or verb?', ['Noun', 'Verb', 'Neither'], 2),
            ]
          }
        ]
      }
    ]
  }
];

// ============ GRADE 4 ============
const grade4Subjects: TextbookSubject[] = [
  {
    id: 'g4-science', name: 'Science', emoji: '🔬', color: 'from-green-400 to-emerald-600',
    chapters: [
      {
        id: 'g4-sci-1', title: 'Life Cycles', emoji: '🦋',
        pages: [
          {
            title: 'Butterfly Life Cycle',
            blocks: [
              h('From Egg to Butterfly'),
              p('A butterfly goes through 4 stages: Egg → Larva → Pupa → Adult'),
              d('🥚➜🐛➜🛡️➜🦋', 'The 4 stages of butterfly life'),
              kt('Larva', 'The caterpillar stage of a butterfly.'),
              kt('Pupa', 'The cocoon or chrysalis stage.'),
              q('What stage comes after larva?', ['Egg', 'Pupa', 'Adult', 'Butterfly'], 1),
            ]
          }
        ]
      }
    ]
  }
];

// ============ GRADE 5 ============
const grade5Subjects: TextbookSubject[] = [
  {
    id: 'g5-math', name: 'Math', emoji: '📐', color: 'from-orange-400 to-yellow-500',
    chapters: [
      {
        id: 'g5-math-1', title: 'Fractions', emoji: '🥧',
        pages: [
          {
            title: 'Understanding Fractions',
            blocks: [
              h('What is a Fraction?'),
              p('A fraction is a part of a whole. 1/2 means one piece out of two.'),
              d('🥧➜[1/2] [1/2]', 'A pizza cut in half'),
              kt('Numerator', 'The top number - how many parts we have.'),
              kt('Denominator', 'The bottom number - how many equal parts total.'),
              ex('1/4 of a pizza = one slice out of 4 slices.'),
              q('1/2 means how many parts out of how many?', ['1 out of 2', '2 out of 2', '1 out of 4', '2 out of 4'], 0),
            ]
          }
        ]
      }
    ]
  }
];

// ============ GRADE 6 ============
const grade6Subjects: TextbookSubject[] = [
  {
    id: 'g6-science', name: 'Science', emoji: '🔬', color: 'from-teal-400 to-cyan-600',
    chapters: [
      {
        id: 'g6-sci-1', title: 'Ecosystem', emoji: '🌍',
        pages: [
          {
            title: 'What is an Ecosystem?',
            blocks: [
              h('Living and Non-Living'),
              p('An ecosystem has living things (plants, animals) and non-living things (water, soil, sun).'),
              d('🌿🦌💧🌞', 'Parts of an ecosystem'),
              kt('Ecosystem', 'A community of living and non-living things in an area.'),
              kt('Habitat', 'Where an organism lives.'),
              ex('A forest ecosystem has trees, animals, water, and soil.'),
              q('What is NOT part of an ecosystem?', ['Plant', 'Animal', 'Water', 'Television'], 3),
            ]
          }
        ]
      }
    ]
  }
];

// ============ GRADE 7 ============
const grade7Subjects: TextbookSubject[] = [
  {
    id: 'g7-history', name: 'History', emoji: '📜', color: 'from-amber-600 to-orange-700',
    chapters: [
      {
        id: 'g7-hist-1', title: 'Ancient Civilizations', emoji: '🏛️',
        pages: [
          {
            title: 'Egypt',
            blocks: [
              h('Ancient Egypt'),
              p('Egypt was one of the world\'s first great civilizations, along the Nile River.'),
              d('🏜️🌊🏛️', 'Egypt\'s desert and monuments'),
              kt('Pharaoh', 'An Egyptian ruler or king.'),
              kt('Pyramid', 'A large stone tomb built for pharaohs.'),
              ex('The Great Pyramid of Giza was built around 2560 BC.'),
              ff('The Sphinx has a human head and lion body!'),
              q('Who ruled Egypt?', ['Emperor', 'Pharaoh', 'King', 'Sultan'], 1),
            ]
          }
        ]
      }
    ]
  }
];

// ============ GRADE 8 ============
const grade8Subjects: TextbookSubject[] = [
  {
    id: 'g8-science', name: 'Science', emoji: '🧬', color: 'from-cyan-400 to-blue-600',
    chapters: [
      {
        id: 'g8-sci-1', title: 'Cell Biology', emoji: '🦠',
        pages: [
          {
            title: 'What is a Cell?',
            blocks: [
              h('The Basics of Cells'),
              p('A cell is the smallest unit of life. All living things are made of cells.'),
              d('🔬🧬', 'Cells under a microscope'),
              kt('Cell', 'The basic unit of life.'),
              kt('Nucleus', 'The control center of a cell.'),
              ex('Your body is made of trillions of cells!'),
              q('Are all living things made of cells?', ['Yes', 'No', 'Only animals', 'Only plants'], 0),
            ]
          }
        ]
      }
    ]
  }
];

// ============ JUNIOR HIGHSCHOOL (GRADES 7-10) ============
const juniorHighSubjects: TextbookSubject[] = [
  {
    id: 'jh-physics', name: 'Physics', emoji: '⚛️', color: 'from-blue-500 to-indigo-700',
    chapters: [
      {
        id: 'jh-phys-1', title: 'Motion & Forces', emoji: '🚀',
        pages: [
          {
            title: 'Newton\'s Laws',
            blocks: [
              h('Understanding Motion'),
              p('Newton\'s First Law: An object at rest stays at rest unless a force acts on it.'),
              d('🚗➡️', 'A car needs force to move and force to stop'),
              kt('Force', 'A push or pull that changes motion.'),
              kt('Velocity', 'Speed in a direction.'),
              ex('When a car brakes, the passengers lean forward due to inertia.'),
              q('What is needed to change an object\'s motion?', ['Time', 'Force', 'Weight', 'Heat'], 1),
            ]
          }
        ]
      }
    ]
  }
];

// ============ SENIOR HIGHSCHOOL - SCIENCE ============
const seniorscienceSubjects: TextbookSubject[] = [
  {
    id: 'sh-biology', name: 'Biology', emoji: '🧬', color: 'from-green-500 to-emerald-700',
    chapters: [
      {
        id: 'sh-bio-1', title: 'Genetics', emoji: '🧬',
        pages: [
          {
            title: 'DNA and Genes',
            blocks: [
              h('The Code of Life'),
              p('DNA is deoxyribonucleic acid. It contains genes that code for traits.'),
              d('🧬', 'The DNA double helix'),
              kt('Gene', 'A segment of DNA that codes for a protein.'),
              kt('Allele', 'Different versions of a gene.'),
              kt('Dominant', 'A trait that masks another trait.'),
              kt('Recessive', 'A trait that is hidden by a dominant trait.'),
              ex('Your eye color is determined by genes inherited from both parents.'),
              ff('The human genome has about 20,000-25,000 genes!'),
              q('What does DNA stand for?', ['Deoxyribonucleic Acid', 'Digital Nucleic Asset', 'Dynamic Nucleic Acid', 'Deoxyribose Nitride'], 0),
            ]
          },
          {
            title: 'Heredity & Inheritance',
            blocks: [
              h('Passing Traits'),
              p('Traits are inherited through DNA from parents to offspring.'),
              ex('If both parents have brown eyes, most children will too.'),
              kt('Phenotype', 'The observable physical traits.'),
              kt('Genotype', 'The genetic makeup.'),
              q('Dominant alleles are represented by...?', ['Lowercase', 'Uppercase', 'Symbols', 'Numbers'], 1),
            ]
          }
        ]
      },
      {
        id: 'sh-bio-2', title: 'Evolution', emoji: '🦕',
        pages: [
          {
            title: 'Natural Selection',
            blocks: [
              h('Darwin\'s Theory'),
              p('Natural selection is the process where organisms with advantageous traits survive and reproduce more.'),
              d('🦁🦓🐘', 'Survival of the fittest in nature'),
              kt('Adaptation', 'A trait that helps organism survive.'),
              kt('Evolution', 'Change in organisms over time.'),
              kt('Fitness', 'Ability to survive and reproduce.'),
              ex('Giraffes with longer necks can eat higher leaves, so they survive better.'),
              ff('Humans and apes share a common ancestor from 6-7 million years ago!'),
              q('Natural selection favors...', ['Weak organisms', 'Advantageous traits', 'Harmful mutations', 'Random traits'], 1),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sh-chemistry', name: 'Chemistry', emoji: '⚗️', color: 'from-purple-500 to-pink-700',
    chapters: [
      {
        id: 'sh-chem-1', title: 'Atomic Structure', emoji: '⚛️',
        pages: [
          {
            title: 'Atoms and Elements',
            blocks: [
              h('Building Blocks of Matter'),
              p('Everything is made of atoms. Atoms are the smallest unit of an element.'),
              d('⚛️', 'Atom with nucleus and electrons'),
              kt('Atom', 'Smallest unit of matter.'),
              kt('Nucleus', 'Center of atom with protons and neutrons.'),
              kt('Electron', 'Negatively charged particle orbiting nucleus.'),
              kt('Proton', 'Positively charged particle in nucleus.'),
              kt('Neutron', 'Neutral particle in nucleus.'),
              ex('Hydrogen has 1 proton. Carbon has 6 protons. Oxygen has 8 protons.'),
              q('The nucleus contains...', ['Only electrons', 'Protons and neutrons', 'Only protons', 'Energy only'], 1),
            ]
          },
          {
            title: 'Periodic Table',
            blocks: [
              h('Organizing Elements'),
              p('The periodic table organizes elements by atomic number and properties.'),
              d('📊', 'The periodic table of elements'),
              kt('Atomic Number', 'Number of protons in an atom.'),
              kt('Atomic Mass', 'Total mass of protons and neutrons.'),
              ex('Hydrogen (H) is element 1. Helium (He) is element 2.'),
              q('What does atomic number represent?', ['Number of neutrons', 'Number of protons', 'Atomic mass', 'Electron shells'], 1),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sh-physics', name: 'Physics', emoji: '⚛️', color: 'from-blue-600 to-cyan-800',
    chapters: [
      {
        id: 'sh-phys-1', title: 'Thermodynamics', emoji: '🔥',
        pages: [
          {
            title: 'Heat and Temperature',
            blocks: [
              h('Energy Transfer'),
              p('Heat is energy transfer from hot to cold. Temperature is measure of kinetic energy.'),
              d('🔥❄️', 'Heat flow from hot to cold'),
              kt('Heat', 'Energy transferred due to temperature difference.'),
              kt('Temperature', 'Measure of average kinetic energy of particles.'),
              kt('Thermodynamics', 'Study of heat, work, and energy.'),
              ex('When you touch ice, heat transfers from your hand to the ice.'),
              q('Heat always flows from...', ['Cold to hot', 'Hot to cold', 'Both directions equally', 'No direction'], 1),
            ]
          },
          {
            title: 'Entropy',
            blocks: [
              h('Order and Disorder'),
              p('The Second Law of Thermodynamics: Entropy (disorder) always increases.'),
              ex('A clean room becomes messy over time without maintenance.'),
              kt('Entropy', 'Measure of disorder in a system.'),
              kt('Closed System', 'A system with no outside energy input.'),
              q('According to Second Law, entropy...', ['Decreases', 'Stays same', 'Increases', 'Reverses'], 2),
            ]
          }
        ]
      }
    ]
  }
];

// ============ SENIOR HIGHSCHOOL - HUMANITIES ============
const seniorhumanitiesSubjects: TextbookSubject[] = [
  {
    id: 'sh-history', name: 'History', emoji: '📚', color: 'from-amber-600 to-yellow-700',
    chapters: [
      {
        id: 'sh-hist-1', title: 'World War II', emoji: '⚔️',
        pages: [
          {
            title: 'Causes and Start',
            blocks: [
              h('The Second World War'),
              p('WWII started in 1939 and lasted until 1945. It involved most major nations.'),
              d('🌍⚔️', 'A global conflict'),
              kt('Axis Powers', 'Germany, Italy, Japan'),
              kt('Allied Powers', 'USA, UK, USSR, and others'),
              ex('Germany\'s invasion of Poland on September 1, 1939 started the war.'),
              q('When did WWII start?', ['1933', '1937', '1939', '1941'], 2),
            ]
          },
          {
            title: 'Major Events',
            blocks: [
              h('Key Turning Points'),
              p('D-Day (1944), Pearl Harbor (1941), and the Holocaust were major events.'),
              ex('D-Day was the invasion of Normandy, France on June 6, 1944.'),
              kt('Holocaust', 'Nazi genocide of 6 million Jews'),
              q('What was D-Day?', ['Bombing of Japan', 'Invasion of France', 'Attack on Poland', 'Battle of Britain'], 1),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sh-literature', name: 'Literature', emoji: '📖', color: 'from-pink-500 to-rose-700',
    chapters: [
      {
        id: 'sh-lit-1', title: 'Classic Novels', emoji: '📕',
        pages: [
          {
            title: 'Pride and Prejudice',
            blocks: [
              h('Jane Austen\'s Masterpiece'),
              p('Published in 1813, Pride and Prejudice explores love, marriage, and social class.'),
              d('📖💕', 'A timeless romance'),
              kt('Protagonist', 'Main character - Elizabeth Bennet'),
              kt('Theme', 'First impressions can be deceiving'),
              ex('Elizabeth initially dislikes Mr. Darcy, but grows to love him.'),
              q('Who is the main character?', ['Jane Bennet', 'Elizabeth Bennet', 'Mr. Bingley', 'Lydia Bennet'], 1),
            ]
          }
        ]
      }
    ]
  }
];

// ============ SENIOR HIGHSCHOOL - SPECIALIZED (STEM) ============
const seniorSTEMSubjects: TextbookSubject[] = [
  {
    id: 'sh-adv-math', name: 'Advanced Mathematics', emoji: '🧮', color: 'from-indigo-600 to-purple-800',
    chapters: [
      {
        id: 'sh-math-1', title: 'Calculus', emoji: '∫',
        pages: [
          {
            title: 'Limits and Continuity',
            blocks: [
              h('Introduction to Calculus'),
              p('Calculus is the study of rates of change and accumulation.'),
              d('📈', 'Curves and slopes'),
              kt('Limit', 'The value a function approaches as input approaches some value.'),
              kt('Derivative', 'The rate of change of a function.'),
              kt('Integral', 'The accumulation of quantities.'),
              ex('The derivative of f(x) = x² is f\'(x) = 2x'),
              q('The derivative represents...', ['Area under curve', 'Rate of change', 'Sum of values', 'The function itself'], 1),
            ]
          },
          {
            title: 'Differentiation',
            blocks: [
              h('Taking Derivatives'),
              p('Differentiation is the process of finding the derivative of a function.'),
              ex('d/dx(x³) = 3x²'),
              kt('Chain Rule', 'For composite functions: d/dx[f(g(x))] = f\'(g(x))·g\'(x)'),
              q('What is the derivative of f(x) = 5x?', ['5', '5x', 'x', '1'], 0),
            ]
          }
        ]
      },
      {
        id: 'sh-math-2', title: 'Linear Algebra', emoji: '🔲',
        pages: [
          {
            title: 'Matrices',
            blocks: [
              h('Matrix Operations'),
              p('A matrix is a rectangular array of numbers arranged in rows and columns.'),
              d('🔲', 'A 2x3 matrix'),
              kt('Matrix', 'Rectangular array of elements'),
              kt('Determinant', 'A scalar value derived from a square matrix'),
              kt('Inverse', 'Matrix A⁻¹ such that A·A⁻¹ = I'),
              ex('Matrices are used in computer graphics and data science.'),
              q('Matrices can be used for...', ['Storing data', 'Linear transformations', 'Both', 'Neither'], 2),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sh-adv-chem', name: 'Advanced Chemistry', emoji: '🧪', color: 'from-green-600 to-teal-800',
    chapters: [
      {
        id: 'sh-chem-2', title: 'Organic Chemistry', emoji: '🧬',
        pages: [
          {
            title: 'Carbon Compounds',
            blocks: [
              h('The Chemistry of Life'),
              p('Organic chemistry is the study of carbon-containing compounds.'),
              d('🧪', 'Organic molecules'),
              kt('Hydrocarbon', 'Compound of carbon and hydrogen.'),
              kt('Functional Group', 'Atoms responsible for chemical reactions.'),
              kt('Isomer', 'Compounds with same molecular formula but different structure.'),
              ex('Methane (CH₄) is the simplest hydrocarbon.'),
              ff('There are over 10 million known organic compounds!'),
              q('Organic chemistry focuses on...', ['Metals', 'Carbon compounds', 'Solutions', 'Reactions only'], 1),
            ]
          },
          {
            title: 'Reaction Mechanisms',
            blocks: [
              h('How Reactions Work'),
              p('Reaction mechanisms explain step-by-step how molecules transform.'),
              ex('Substitution, addition, and elimination reactions are common.'),
              kt('Mechanism', 'Detailed path of a chemical reaction'),
              q('What is a reaction mechanism?', ['Fast reaction', 'Step-by-step process', 'Heat source', 'Catalyst'], 1),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sh-adv-bio', name: 'Advanced Biology', emoji: '🔬', color: 'from-blue-600 to-green-800',
    chapters: [
      {
        id: 'sh-bio-3', title: 'Molecular Biology', emoji: '🧬',
        pages: [
          {
            title: 'Protein Synthesis',
            blocks: [
              h('From DNA to Protein'),
              p('Proteins are made by DNA through transcription and translation.'),
              d('🧬➜🧬➜⚙️', 'DNA to RNA to Protein'),
              kt('Transcription', 'DNA to mRNA'),
              kt('Translation', 'mRNA to protein'),
              kt('Codon', 'Three-base sequence coding for amino acid'),
              ex('The genetic code determines which amino acids form the protein.'),
              ff('Proteins are the workhorses of every living cell!'),
              q('Translation occurs at...', ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'], 1),
            ]
          },
          {
            title: 'Genetic Engineering',
            blocks: [
              h('Modifying DNA'),
              p('Genetic engineering allows scientists to insert genes into organisms.'),
              ex('Scientists insert insulin gene into bacteria to produce insulin.'),
              kt('GMO', 'Genetically Modified Organism'),
              kt('CRISPR', 'Gene-editing technology to cut and modify DNA'),
              q('What is CRISPR?', ['A protein', 'Gene-editing tool', 'Virus', 'Bacteria'], 1),
            ]
          }
        ]
      }
    ]
  }
];

// ============ SENIOR HIGHSCHOOL - SPECIALIZED (HUMANITIES) ============
const seniorHumanitiesSpecializedSubjects: TextbookSubject[] = [
  {
    id: 'sh-phil', name: 'Philosophy', emoji: '🤔', color: 'from-purple-700 to-indigo-900',
    chapters: [
      {
        id: 'sh-phil-1', title: 'Epistemology', emoji: '🧠',
        pages: [
          {
            title: 'Theory of Knowledge',
            blocks: [
              h('What Can We Know?'),
              p('Epistemology asks: What is knowledge? How do we know? What can we know?'),
              d('🤔', 'Philosophy thinking'),
              kt('Knowledge', 'Justified true belief'),
              kt('Rationalism', 'Knowledge comes from reason'),
              kt('Empiricism', 'Knowledge comes from experience'),
              ex('Descartes: "I think, therefore I am" (Cogito, ergo sum)'),
              q('Empiricism emphasizes...', ['Reason', 'Experience', 'Intuition', 'Faith'], 1),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sh-econ', name: 'Economics', emoji: '📊', color: 'from-green-700 to-yellow-800',
    chapters: [
      {
        id: 'sh-econ-1', title: 'Microeconomics', emoji: '💰',
        pages: [
          {
            title: 'Supply and Demand',
            blocks: [
              h('Market Forces'),
              p('Supply is what producers offer. Demand is what consumers want.'),
              d('📊', 'Supply & demand curve'),
              kt('Supply', 'Quantity of goods producers are willing to sell.'),
              kt('Demand', 'Quantity consumers are willing to buy.'),
              kt('Equilibrium', 'Price where supply equals demand.'),
              ex('When demand ↑ and supply stays same, price ↑'),
              q('At equilibrium...', ['Supply > Demand', 'Supply = Demand', 'Supply < Demand', 'No market'], 1),
            ]
          }
        ]
      }
    ]
  }
];

// ============ COMPILE ALL LEVELS ============
export const TEXTBOOK_LEVELS: TextbookLevel[] = [
  {
    id: 'preschool',
    name: 'Preschool/Kinder',
    emoji: '🌈',
    color: 'from-pink-400 to-purple-500',
    subjects: preschooljSubjects,
  },
  {
    id: 'grade1',
    name: 'Grade 1',
    emoji: '1️⃣',
    color: 'from-red-400 to-orange-500',
    subjects: grade1Subjects,
  },
  {
    id: 'grade2',
    name: 'Grade 2',
    emoji: '2️⃣',
    color: 'from-orange-400 to-yellow-500',
    subjects: grade2Subjects,
  },
  {
    id: 'grade3',
    name: 'Grade 3',
    emoji: '3️⃣',
    color: 'from-yellow-400 to-lime-500',
    subjects: grade3Subjects,
  },
  {
    id: 'grade4',
    name: 'Grade 4',
    emoji: '4️⃣',
    color: 'from-lime-400 to-green-500',
    subjects: grade4Subjects,
  },
  {
    id: 'grade5',
    name: 'Grade 5',
    emoji: '5️⃣',
    color: 'from-green-400 to-teal-500',
    subjects: grade5Subjects,
  },
  {
    id: 'grade6',
    name: 'Grade 6',
    emoji: '6️⃣',
    color: 'from-teal-400 to-cyan-500',
    subjects: grade6Subjects,
  },
  {
    id: 'grade7',
    name: 'Grade 7',
    emoji: '7️⃣',
    color: 'from-cyan-400 to-blue-500',
    subjects: grade7Subjects,
  },
  {
    id: 'grade8',
    name: 'Grade 8',
    emoji: '8️⃣',
    color: 'from-blue-400 to-indigo-500',
    subjects: grade8Subjects,
  },
  {
    id: 'juniorhighschool',
    name: 'Junior Highschool (Grades 7-10)',
    emoji: '🎓',
    color: 'from-indigo-500 to-purple-600',
    subjects: juniorHighSubjects,
  },
  {
    id: 'seniorsciencetrack',
    name: 'Senior Highschool - Science',
    emoji: '🔬',
    color: 'from-green-600 to-teal-700',
    subjects: seniorscienceSubjects,
  },
  {
    id: 'seniorhumanitiestrack',
    name: 'Senior Highschool - Humanities',
    emoji: '📚',
    color: 'from-amber-600 to-orange-700',
    subjects: seniorhumanitiesSubjects,
  },
  {
    id: 'seniorstemspecialized',
    name: 'Senior Highschool - STEM Specialized',
    emoji: '🔬',
    color: 'from-purple-700 to-indigo-900',
    subjects: seniorSTEMSubjects,
  },
  {
    id: 'seniorhsspecialized',
    name: 'Senior Highschool - Humanities Specialized',
    emoji: '🤔',
    color: 'from-purple-800 to-blue-900',
    subjects: seniorHumanitiesSpecializedSubjects,
  },
];

// Search function
export function searchPages(query: string) {
  const results = [];
  const lower = query.toLowerCase();
  
  TEXTBOOK_LEVELS.forEach(level => {
    level.subjects.forEach(subject => {
      subject.chapters.forEach(chapter => {
        chapter.pages.forEach((page, idx) => {
          const text = `${page.title} ${page.blocks.map(b => b.text || b.term || '').join(' ')}`.toLowerCase();
          if (text.includes(lower)) {
            results.push({ level: level.id, subject: subject.id, chapter: chapter.id, page: idx, title: page.title });
          }
        });
      });
    });
  });
  return results;
}

export function getStats() {
  let pages = 0, chapters = 0, subjects = 0;
  TEXTBOOK_LEVELS.forEach(level => {
    level.subjects.forEach(subject => { subjects++; subject.chapters.forEach(ch => { chapters++; pages += ch.pages.length; }); });
  });
  return { pages, chapters, subjects };
}
