// Types
export interface TextbookBlock {
  type: 'heading' | 'paragraph' | 'example' | 'keyterm' | 'diagram' | 'quiz' | 'summary' | 'funfact' | 'tip';
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

const preschoolSubjects: TextbookSubject[] = [
  {
    id: 'letters',
    name: 'Letters & Sounds',
    emoji: '🔤',
    color: 'from-pink-400 to-orange-400',
    chapters: [
      {
        id: 'alphabet',
        title: 'Alphabet Adventure',
        emoji: '🔤',
        pages: [
          {
            title: 'Meet the Alphabet',
            blocks: [
              h('The Alphabet'),
              p('The alphabet has 26 letters. We use them to read and write words.'),
              d('🔤', 'A, B, C, D, E, F, G...'),
              kt('Alphabet', 'A set of letters used to make words.'),
              q('How many letters are in the alphabet?', ['20', '26', '30', '25'], 1),
            ],
          },
          {
            title: 'Letters and Sounds',
            blocks: [
              h('Sound It Out'),
              p('Each letter can make a sound. Sounds help us say words clearly.'),
              ex('B says /b/, C says /k/ or /s/ depending on the word.'),
              kt('Sound', 'The noise a letter makes when spoken.'),
              q('What do letters help us do?', ['Jump', 'Read and write', 'Sleep', 'Cook'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'numbers',
    name: 'Numbers',
    emoji: '🔢',
    color: 'from-green-400 to-emerald-400',
    chapters: [
      {
        id: 'counting',
        title: 'Counting Fun',
        emoji: '1️⃣',
        pages: [
          {
            title: 'Counting 1 to 10',
            blocks: [
              h('Let’s Count!'),
              p('Numbers help us count objects, toys, and friends.'),
              d('1️⃣2️⃣3️⃣4️⃣5️⃣', 'One, two, three, four, five'),
              kt('Count', 'Say numbers in order to find how many.'),
              q('What comes after 4?', ['3', '5', '6', '7'], 1),
            ],
          },
          {
            title: 'More and Less',
            blocks: [
              h('Comparing Numbers'),
              p('Some numbers are bigger, some are smaller. We can compare them.'),
              ex('5 is more than 3. 2 is less than 6.'),
              kt('More', 'A larger amount.'),
              q('Which is less: 8 or 3?', ['8', '3'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'colors',
    name: 'Colors',
    emoji: '🎨',
    color: 'from-purple-400 to-pink-400',
    chapters: [
      {
        id: 'rainbow',
        title: 'Rainbow Colors',
        emoji: '🌈',
        pages: [
          {
            title: 'Primary Colors',
            blocks: [
              h('Colors Around Us'),
              p('There are many colors in nature, art, and objects.'),
              d('🌈', 'Red, orange, yellow, green, blue, purple'),
              kt('Color', 'The look or shade of an object.'),
              q('Which color is in a rainbow?', ['Blue', 'Green', 'Red', 'All of these'], 3),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'shapes',
    name: 'Shapes',
    emoji: '🔷',
    color: 'from-blue-400 to-cyan-400',
    chapters: [
      {
        id: 'basic-shapes',
        title: 'Shapes We See',
        emoji: '🔺',
        pages: [
          {
            title: 'Circle, Square, Triangle',
            blocks: [
              h('Shapes'),
              p('Shapes help us describe objects around us.'),
              d('⭕🟦🔺', 'Circle, square, and triangle'),
              kt('Circle', 'A round shape with no corners.'),
              q('How many sides does a square have?', ['2', '3', '4', '5'], 2),
            ],
          },
        ],
      },
    ],
  },
];

const elementarySubjects: TextbookSubject[] = [
  {
    id: 'english',
    name: 'English',
    emoji: '📚',
    color: 'from-blue-500 to-indigo-600',
    chapters: [
      {
        id: 'reading',
        title: 'Reading Skills',
        emoji: '📖',
        pages: [
          {
            title: 'Word Families',
            blocks: [
              h('Reading Words'),
              p('Words are grouped by patterns, and this helps us read faster.'),
              ex('cat, hat, bat all belong to the same word family.'),
              kt('Word family', 'Words with a shared sound and pattern.'),
              q('Which word belongs to the cat family?', ['mat', 'sun', 'tree', 'book'], 0),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'math',
    name: 'Mathematics',
    emoji: '➕',
    color: 'from-green-500 to-teal-500',
    chapters: [
      {
        id: 'addition',
        title: 'Numbers and Operations',
        emoji: '🔢',
        pages: [
          {
            title: 'Adding Numbers',
            blocks: [
              h('Addition'),
              p('Addition combines quantities to find a total.'),
              d('🍎➕🍎=🍎🍎', 'Two apples plus one apple makes three apples.'),
              kt('Addition', 'Putting numbers together to make a larger number.'),
              q('What is 4 + 3?', ['5', '6', '7', '8'], 2),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    emoji: '🔬',
    color: 'from-emerald-500 to-teal-600',
    chapters: [
      {
        id: 'plants',
        title: 'Plants and Living Things',
        emoji: '🌱',
        pages: [
          {
            title: 'How Plants Grow',
            blocks: [
              h('Plant Life'),
              p('Plants need sunlight, water, and air to grow.'),
              d('🌞💧🌱', 'Sunlight and water help plants grow.'),
              kt('Germination', 'The beginning of plant growth from a seed.'),
              q('What do plants need to grow?', ['Only rocks', 'Sunlight, water, and air', 'Only darkness', 'Only soil'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    emoji: '🌍',
    color: 'from-orange-400 to-amber-500',
    chapters: [
      {
        id: 'community',
        title: 'Our Community',
        emoji: '🏡',
        pages: [
          {
            title: 'People and Places',
            blocks: [
              h('Community Life'),
              p('A community is a place where people live, work, and help one another.'),
              ex('Schools, markets, and parks are part of the community.'),
              kt('Community', 'A group of people living together in one place.'),
              q('What is a community?', ['A single person', 'A group of people living and working together', 'Only a school', 'Only a road'], 1),
            ],
          },
        ],
      },
    ],
  },
];

const juniorHighSubjects: TextbookSubject[] = [
  {
    id: 'jhs-math',
    name: 'Mathematics',
    emoji: '📐',
    color: 'from-indigo-500 to-purple-600',
    chapters: [
      {
        id: 'algebra',
        title: 'Algebra Basics',
        emoji: '🧮',
        pages: [
          {
            title: 'Variables and Expressions',
            blocks: [
              h('Variables'),
              p('A variable is a symbol that stands for an unknown number.'),
              d('x + 3 = 7', 'x is the unknown value.'),
              kt('Variable', 'A symbol used to represent a number.'),
              q('What is x in x + 4 = 9?', ['3', '5', '7', '9'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jhs-science',
    name: 'Science',
    emoji: '🧪',
    color: 'from-cyan-500 to-blue-600',
    chapters: [
      {
        id: 'ecosystems',
        title: 'Ecosystems',
        emoji: '🌿',
        pages: [
          {
            title: 'Living and Nonliving Things',
            blocks: [
              h('Ecosystem Basics'),
              p('An ecosystem includes living and nonliving things that interact.'),
              ex('Plants, animals, water, soil, and sunlight make up an ecosystem.'),
              kt('Ecosystem', 'A community where living things interact with their environment.'),
              q('Which is a living thing?', ['Stone', 'River', 'Tree', 'Air'], 2),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jhs-english',
    name: 'English',
    emoji: '📝',
    color: 'from-pink-500 to-rose-600',
    chapters: [
      {
        id: 'grammar',
        title: 'Grammar Essentials',
        emoji: '✍️',
        pages: [
          {
            title: 'Sentence Parts',
            blocks: [
              h('Sentence Structure'),
              p('A complete sentence has a subject and a predicate.'),
              d('📜', 'The cat sleeps.'),
              kt('Predicate', 'The action or description in the sentence.'),
              q('Which part tells the action?', ['Subject', 'Predicate', 'Article', 'Adjective'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jhs-history',
    name: 'History',
    emoji: '🏛️',
    color: 'from-amber-500 to-orange-600',
    chapters: [
      {
        id: 'civilizations',
        title: 'Ancient Civilizations',
        emoji: '🏺',
        pages: [
          {
            title: 'Roots of Civilization',
            blocks: [
              h('Civilizations'),
              p('Ancient civilizations developed writing, trade, and government systems.'),
              ex('Mesopotamia and Egypt are among the earliest societies.'),
              kt('Civilization', 'A complex society with cities and organized systems.'),
              q('What helped civilizations grow?', ['Only hunting', 'Writing and trade', 'Walking only', 'No rules'], 1),
            ],
          },
        ],
      },
    ],
  },
];

const seniorHighSubjects: TextbookSubject[] = [
  {
    id: 'sh-biology',
    name: 'Biology',
    emoji: '🧬',
    color: 'from-green-500 to-emerald-700',
    chapters: [
      {
        id: 'cells',
        title: 'Cell Biology',
        emoji: '🔬',
        pages: [
          {
            title: 'The Cell',
            blocks: [
              h('Basic Unit of Life'),
              p('All living things are made of cells. Cells perform life processes.'),
              d('🧬', 'Cells carry DNA and perform functions necessary for life.'),
              kt('Cell', 'The smallest unit of life.'),
              q('What is the basic unit of life?', ['Atom', 'Cell', 'Tissue', 'Organ'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-chemistry',
    name: 'Chemistry',
    emoji: '⚗️',
    color: 'from-violet-500 to-purple-700',
    chapters: [
      {
        id: 'matter',
        title: 'Matter and Change',
        emoji: '🧪',
        pages: [
          {
            title: 'States of Matter',
            blocks: [
              h('Matter'),
              p('Matter exists as solid, liquid, and gas. Matter has mass and volume.'),
              d('⚗️', 'Water can be solid, liquid, or gas.'),
              kt('Matter', 'Anything that has mass and takes up space.'),
              q('Which state has a definite shape?', ['Gas', 'Liquid', 'Solid', 'Plasma'], 2),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-physics',
    name: 'Physics',
    emoji: '⚛️',
    color: 'from-blue-500 to-cyan-700',
    chapters: [
      {
        id: 'motion',
        title: 'Motion and Force',
        emoji: '🚀',
        pages: [
          {
            title: 'Understanding Motion',
            blocks: [
              h('Motion'),
              p('Motion is the change in position over time. Force can change motion.'),
              d('🚗➡️', 'A moving object changes its position.'),
              kt('Force', 'A push or pull that changes an object’s motion.'),
              q('What changes an object’s motion?', ['Time', 'Force', 'Color', 'Sound'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-humanities',
    name: 'Humanities',
    emoji: '📜',
    color: 'from-amber-500 to-orange-700',
    chapters: [
      {
        id: 'history',
        title: 'Philippine History',
        emoji: '🏛️',
        pages: [
          {
            title: 'Historical Roots',
            blocks: [
              h('History'),
              p('History helps us learn about the events, people, and ideas that shaped society.'),
              ex('Studying history helps us understand present-day society.'),
              kt('History', 'The study of past events and human experiences.'),
              q('Why do we study history?', ['To forget the past', 'To understand people and events of the past', 'To avoid learning', 'To stop change'], 1),
            ],
          },
        ],
      },
    ],
  },
];

const specializedSubjects: TextbookSubject[] = [
  {
    id: 'specialized-research',
    name: 'Research',
    emoji: '🔎',
    color: 'from-indigo-600 to-purple-800',
    chapters: [
      {
        id: 'research-methods',
        title: 'Research Methods',
        emoji: '🧠',
        pages: [
          {
            title: 'Asking Questions',
            blocks: [
              h('Research Starts with a Question'),
              p('Research begins with curiosity. A clear question guides the process.'),
              d('❓📘', 'A good question leads to investigation and evidence.'),
              kt('Research', 'A careful process of finding and studying information.'),
              q('What should research begin with?', ['A guess only', 'A clear question', 'A random story', 'No plan'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'specialized-math',
    name: 'Advanced Mathematics',
    emoji: '🧮',
    color: 'from-blue-600 to-indigo-800',
    chapters: [
      {
        id: 'calculus',
        title: 'Functions and Limits',
        emoji: '📈',
        pages: [
          {
            title: 'Understanding Change',
            blocks: [
              h('Calculus'),
              p('Calculus studies how quantities change and accumulate over time.'),
              d('📈', 'Rates of change can be measured and analyzed.'),
              kt('Derivative', 'The rate of change of a function.'),
              q('What does a derivative measure?', ['A fixed number', 'Rate of change', 'Color', 'A story'], 1),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'specialized-economics',
    name: 'Economics',
    emoji: '💰',
    color: 'from-emerald-600 to-green-800',
    chapters: [
      {
        id: 'market',
        title: 'Supply and Demand',
        emoji: '📊',
        pages: [
          {
            title: 'Buying and Selling',
            blocks: [
              h('Market Forces'),
              p('Supply is how much is available, and demand is how much people want.'),
              d('📊', 'Prices go up when demand is high and supply is low.'),
              kt('Demand', 'The desire and ability of buyers to purchase something.'),
              q('What happens when demand rises?', ['Prices often rise', 'Prices always fall', 'Nothing changes', 'Only supply changes'], 0),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'specialized-literature',
    name: 'Literature',
    emoji: '📖',
    color: 'from-pink-600 to-rose-800',
    chapters: [
      {
        id: 'poetry',
        title: 'Poetry and Analysis',
        emoji: '✒️',
        pages: [
          {
            title: 'Reading Poetry',
            blocks: [
              h('Poetry'),
              p('Poetry uses sound, rhythm, and imagery to express thoughts and emotions.'),
              d('📖', 'A poem may use figurative language and rhythm.'),
              kt('Imagery', 'Language that creates pictures in the reader’s mind.'),
              q('What does poetry often use?', ['Only numbers', 'Rhythm and imagery', 'Maps only', 'No language'], 1),
            ],
          },
        ],
      },
    ],
  },
];

export const TEXTBOOK_LEVELS: TextbookLevel[] = [
  {
    id: 'preschool',
    name: 'Preschool',
    emoji: '🌈',
    color: 'from-pink-400 to-purple-500',
    subjects: preschoolSubjects,
  },
  {
    id: 'elementary',
    name: 'Elementary',
    emoji: '📘',
    color: 'from-blue-400 to-cyan-500',
    subjects: elementarySubjects,
  },
  {
    id: 'junior-high',
    name: 'Junior High School',
    emoji: '🎓',
    color: 'from-indigo-500 to-purple-600',
    subjects: juniorHighSubjects,
  },
  {
    id: 'senior-high',
    name: 'Senior High School',
    emoji: '🏫',
    color: 'from-green-500 to-teal-700',
    subjects: seniorHighSubjects,
  },
  {
    id: 'senior-specialized',
    name: 'Senior High School Specialized',
    emoji: '🔬',
    color: 'from-purple-700 to-indigo-900',
    subjects: specializedSubjects,
  },
];

// Exported functions
export function getLevelById(id: string): TextbookLevel | undefined {
  return TEXTBOOK_LEVELS.find(level => level.id === id);
}

export function getChapterPageCount(levelId: string, subjectId: string, chapterId: string): number {
  const level = TEXTBOOK_LEVELS.find(l => l.id === levelId);
  const subject = level?.subjects.find(s => s.id === subjectId);
  const chapter = subject?.chapters.find(c => c.id === chapterId);
  return chapter?.pages.length ?? 0;
}

export function getSubjectChapterCount(levelId: string, subjectId: string): number {
  const level = TEXTBOOK_LEVELS.find(l => l.id === levelId);
  const subject = level?.subjects.find(s => s.id === subjectId);
  return subject?.chapters.length ?? 0;
}

export function getLevelSubjectCount(levelId: string): number {
  const level = TEXTBOOK_LEVELS.find(l => l.id === levelId);
  return level?.subjects.length ?? 0;
}

export interface SearchResult {
  levelId: string;
  levelName: string;
  levelColor: string;
  subjectId: string;
  subjectName: string;
  subjectEmoji: string;
  subjectColor: string;
  chapterId: string;
  chapterTitle: string;
  chapterEmoji: string;
  pageTitle: string;
  pageIdx: number;
}

export function searchPages(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const q = query.toLowerCase().trim();
  if (!q) return results;

  for (const level of TEXTBOOK_LEVELS) {
    for (const subject of level.subjects) {
      for (const chapter of subject.chapters) {
        for (let pageIdx = 0; pageIdx < chapter.pages.length; pageIdx++) {
          const page = chapter.pages[pageIdx];
          const haystack = (page.title + ' ' + page.blocks.map(b => b.text ?? b.term ?? b.definition ?? b.question ?? '').join(' ')).toLowerCase();
          if (haystack.includes(q)) {
            results.push({
              levelId: level.id,
              levelName: level.name,
              levelColor: level.color,
              subjectId: subject.id,
              subjectName: subject.name,
              subjectEmoji: subject.emoji,
              subjectColor: subject.color,
              chapterId: chapter.id,
              chapterTitle: chapter.title,
              chapterEmoji: chapter.emoji,
              pageTitle: page.title,
              pageIdx,
            });
          }
        }
      }
    }
  }

  return results.slice(0, 30);
}

export interface Flashcard {
  term: string;
  definition: string;
  subjectName: string;
  subjectEmoji: string;
}

export function getAllKeyTerms(): Flashcard[] {
  const cards: Flashcard[] = [];

  for (const level of TEXTBOOK_LEVELS) {
    for (const subject of level.subjects) {
      for (const chapter of subject.chapters) {
        for (const page of chapter.pages) {
          for (const block of page.blocks) {
            if (block.type === 'keyterm' && block.term && block.definition) {
              cards.push({
                term: block.term,
                definition: block.definition,
                subjectName: subject.name,
                subjectEmoji: subject.emoji,
              });
            }
          }
        }
      }
    }
  }

  return cards;
}

export function getStats(): { totalChapters: number; totalPages: number; totalKeyTerms: number; totalQuizzes: number } {
  let totalChapters = 0;
  let totalPages = 0;
  let totalKeyTerms = 0;
  let totalQuizzes = 0;

  for (const level of TEXTBOOK_LEVELS) {
    for (const subject of level.subjects) {
      totalChapters += subject.chapters.length;
      for (const chapter of subject.chapters) {
        totalPages += chapter.pages.length;
        for (const page of chapter.pages) {
          for (const block of page.blocks) {
            if (block.type === 'keyterm') totalKeyTerms++;
            if (block.type === 'quiz') totalQuizzes++;
          }
        }
      }
    }
  }

  return { totalChapters, totalPages, totalKeyTerms, totalQuizzes };
}
