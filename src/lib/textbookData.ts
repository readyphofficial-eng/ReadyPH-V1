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

// Helper to create chapter with basic page
function makeChapter(id: string, title: string, emoji: string, intro: string): TextbookChapter {
  return {
    id,
    title,
    emoji,
    pages: Array.from({ length: 10 }, (_, i) => ({
      title: `${title} - Part ${i + 1}`,
      blocks: [
        h(title),
        p(`${intro} (Section ${i + 1})`),
        ex(`Example for ${title}: This shows how ${title.toLowerCase()} works in practice.`),
        kt('Key Concept', `Understanding ${title.toLowerCase()} helps build knowledge.`),
        q(`What is ${title.toLowerCase()}?`, ['Option A', 'Option B', 'Option C', 'Option D'], Math.floor(Math.random() * 4)),
      ]
    }))
  };
}

// Shared subjects applied to all levels with 10+ chapters each
const createSharedSubjects = (): TextbookSubject[] => [
  {
    id: 'english',
    name: 'English Language Arts',
    emoji: '📚',
    color: 'from-blue-500 to-indigo-600',
    chapters: [
      makeChapter('eng-1', 'Alphabet & Phonics', '🔤', 'Learning letters and their sounds'),
      makeChapter('eng-2', 'Vocabulary Building', '📖', 'Expanding word knowledge'),
      makeChapter('eng-3', 'Sentence Structure', '✍️', 'Understanding grammar basics'),
      makeChapter('eng-4', 'Reading Comprehension', '👁️', 'Understanding written text'),
      makeChapter('eng-5', 'Writing Skills', '✏️', 'Developing writing abilities'),
      makeChapter('eng-6', 'Spelling Rules', '🔤', 'Learning correct spelling'),
      makeChapter('eng-7', 'Parts of Speech', '📝', 'Nouns, verbs, adjectives, and more'),
      makeChapter('eng-8', 'Punctuation Marks', '❗', 'Using periods, commas, and more'),
      makeChapter('eng-9', 'Story Elements', '📖', 'Characters, plot, and setting'),
      makeChapter('eng-10', 'Poetry & Figurative Language', '✨', 'Metaphors, similes, and rhyme'),
      makeChapter('eng-11', 'Communication Skills', '💬', 'Speaking and listening effectively'),
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    emoji: '🔢',
    color: 'from-green-500 to-teal-600',
    chapters: [
      makeChapter('math-1', 'Numbers & Counting', '1️⃣', 'Basic number concepts'),
      makeChapter('math-2', 'Addition', '➕', 'Adding quantities together'),
      makeChapter('math-3', 'Subtraction', '➖', 'Taking away quantities'),
      makeChapter('math-4', 'Multiplication', '✖️', 'Repeated addition'),
      makeChapter('math-5', 'Division', '➗', 'Sharing and grouping'),
      makeChapter('math-6', 'Fractions', '🥧', 'Parts of a whole'),
      makeChapter('math-7', 'Decimals', '💰', 'Numbers with decimal points'),
      makeChapter('math-8', 'Geometry', '🔷', 'Shapes and spatial reasoning'),
      makeChapter('math-9', 'Measurement', '📏', 'Length, weight, and volume'),
      makeChapter('math-10', 'Patterns & Algebra', '📊', 'Finding patterns and solving equations'),
      makeChapter('math-11', 'Data & Statistics', '📈', 'Graphs, charts, and probability'),
    ]
  },
  {
    id: 'science',
    name: 'Science & Nature',
    emoji: '🔬',
    color: 'from-emerald-500 to-teal-700',
    chapters: [
      makeChapter('sci-1', 'Living & Non-Living', '🌿', 'Understanding organisms and matter'),
      makeChapter('sci-2', 'Plants', '🌱', 'Plant growth and photosynthesis'),
      makeChapter('sci-3', 'Animals & Ecosystems', '🦁', 'Animal behavior and habitats'),
      makeChapter('sci-4', 'Human Body', '💪', 'Body systems and health'),
      makeChapter('sci-5', 'The Five Senses', '👁️', 'How we perceive the world'),
      makeChapter('sci-6', 'Weather & Climate', '🌤️', 'Atmospheric phenomena'),
      makeChapter('sci-7', 'Earth & Space', '🌍', 'Planets, stars, and geology'),
      makeChapter('sci-8', 'Energy & Motion', '⚡', 'Forces and energy transfer'),
      makeChapter('sci-9', 'Matter & Chemical Change', '⚗️', 'States of matter and reactions'),
      makeChapter('sci-10', 'Life Cycles', '🦋', 'Birth, growth, and reproduction'),
      makeChapter('sci-11', 'Adaptations & Evolution', '🦕', 'How organisms change over time'),
    ]
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    emoji: '🌍',
    color: 'from-orange-500 to-red-600',
    chapters: [
      makeChapter('soc-1', 'Community & People', '👥', 'Understanding diverse communities'),
      makeChapter('soc-2', 'Families & Culture', '👨‍👩‍👧‍👦', 'Family structures and traditions'),
      makeChapter('soc-3', 'Geography & Maps', '🗺️', 'Learning about places and regions'),
      makeChapter('soc-4', 'History & Time', '⏰', 'Understanding past events'),
      makeChapter('soc-5', 'Governments & Rules', '🏛️', 'How societies are organized'),
      makeChapter('soc-6', 'Citizenship & Rights', '⚖️', 'Responsibilities and freedoms'),
      makeChapter('soc-7', 'Economics & Resources', '💵', 'Trade, work, and economics'),
      makeChapter('soc-8', 'Philippines History', '🇵🇭', 'Our nation\'s heritage'),
      makeChapter('soc-9', 'World Cultures', '🎭', 'Celebrating global diversity'),
      makeChapter('soc-10', 'Landmarks & Monuments', '🏰', 'Significant historical sites'),
      makeChapter('soc-11', 'Traditions & Celebrations', '🎉', 'Holidays and cultural events'),
    ]
  },
  {
    id: 'arts',
    name: 'Arts & Creativity',
    emoji: '🎨',
    color: 'from-pink-500 to-rose-600',
    chapters: [
      makeChapter('art-1', 'Colors & Mixing', '🎨', 'Primary and secondary colors'),
      makeChapter('art-2', 'Drawing Basics', '🖍️', 'Lines, shapes, and sketching'),
      makeChapter('art-3', 'Painting Techniques', '🖌️', 'Brushwork and color blending'),
      makeChapter('art-4', 'Sculpture & 3D', '🗿', 'Creating with clay and materials'),
      makeChapter('art-5', 'Photography & Images', '📷', 'Capturing and composing visuals'),
      makeChapter('art-6', 'Music Fundamentals', '🎵', 'Notes, rhythm, and instruments'),
      makeChapter('art-7', 'Dance & Movement', '💃', 'Expressing through dance'),
      makeChapter('art-8', 'Theatre & Performance', '🎭', 'Acting and storytelling'),
      makeChapter('art-9', 'Digital Art', '💻', 'Creating with technology'),
      makeChapter('art-10', 'Design Principles', '✨', 'Composition and visual balance'),
      makeChapter('art-11', 'Famous Artists & Works', '🖼️', 'Learning art history'),
    ]
  },
  {
    id: 'physical-education',
    name: 'Physical Education & Health',
    emoji: '⚽',
    color: 'from-cyan-500 to-blue-600',
    chapters: [
      makeChapter('pe-1', 'Fitness Basics', '💪', 'Strength and endurance'),
      makeChapter('pe-2', 'Flexibility & Stretching', '🧘', 'Range of motion exercises'),
      makeChapter('pe-3', 'Team Sports', '🏀', 'Basketball, volleyball, soccer'),
      makeChapter('pe-4', 'Individual Sports', '🏃', 'Running, swimming, gymnastics'),
      makeChapter('pe-5', 'Safety & First Aid', '🚑', 'Basic emergency response'),
      makeChapter('pe-6', 'Nutrition & Diet', '🥗', 'Healthy eating habits'),
      makeChapter('pe-7', 'Personal Hygiene', '🧼', 'Cleanliness and wellness'),
      makeChapter('pe-8', 'Mental Health & Emotions', '😊', 'Emotional well-being'),
      makeChapter('pe-9', 'Sleep & Rest', '😴', 'Good sleep habits'),
      makeChapter('pe-10', 'Preventing Disease', '🦠', 'Health and hygiene practices'),
      makeChapter('pe-11', 'Sports & Games', '🎯', 'Rules and fair play'),
    ]
  },
  {
    id: 'technology',
    name: 'Technology & Digital Literacy',
    emoji: '💻',
    color: 'from-purple-500 to-indigo-600',
    chapters: [
      makeChapter('tech-1', 'Computers Basics', '🖥️', 'Hardware and software'),
      makeChapter('tech-2', 'Using the Internet', '🌐', 'Browsing and searching'),
      makeChapter('tech-3', 'Cybersecurity', '🔒', 'Online safety and privacy'),
      makeChapter('tech-4', 'Email & Communication', '📧', 'Digital messaging'),
      makeChapter('tech-5', 'Programming Basics', '💾', 'Introduction to coding'),
      makeChapter('tech-6', 'Digital Tools', '🛠️', 'Software for productivity'),
      makeChapter('tech-7', 'Creating Presentations', '📊', 'Sharing ideas visually'),
      makeChapter('tech-8', 'Digital Media', '📱', 'Images, audio, and video'),
      makeChapter('tech-9', 'Artificial Intelligence', '🤖', 'AI and machine learning'),
      makeChapter('tech-10', 'Social Media Awareness', '📲', 'Responsible online behavior'),
      makeChapter('tech-11', 'Future Technologies', '🚀', 'Innovation and emerging tech'),
    ]
  },
  {
    id: 'critical-thinking',
    name: 'Critical Thinking & Problem Solving',
    emoji: '🧠',
    color: 'from-yellow-500 to-orange-600',
    chapters: [
      makeChapter('ct-1', 'Observation Skills', '👀', 'Noticing details'),
      makeChapter('ct-2', 'Logic & Reasoning', '🔍', 'Understanding cause and effect'),
      makeChapter('ct-3', 'Problem Analysis', '📋', 'Breaking down complex issues'),
      makeChapter('ct-4', 'Decision Making', '⚖️', 'Evaluating options'),
      makeChapter('ct-5', 'Creative Thinking', '💡', 'Generating ideas'),
      makeChapter('ct-6', 'Research Skills', '📚', 'Finding and evaluating information'),
      makeChapter('ct-7', 'Logical Fallacies', '❌', 'Identifying flawed arguments'),
      makeChapter('ct-8', 'Argumentation', '💬', 'Building strong arguments'),
      makeChapter('ct-9', 'Synthesis & Analysis', '🔗', 'Combining ideas'),
      makeChapter('ct-10', 'Metacognition', '🤔', 'Thinking about thinking'),
      makeChapter('ct-11', 'Collaborative Problem Solving', '🤝', 'Working together to solve issues'),
    ]
  },
];

// Create levels with shared subjects
export const TEXTBOOK_LEVELS: TextbookLevel[] = [
  {
    id: 'preschool',
    name: 'Preschool',
    emoji: '🌈',
    color: 'from-pink-400 to-purple-500',
    subjects: createSharedSubjects(),
  },
  {
    id: 'elementary',
    name: 'Elementary',
    emoji: '📘',
    color: 'from-blue-400 to-cyan-500',
    subjects: createSharedSubjects(),
  },
  {
    id: 'junior-high',
    name: 'Junior High School',
    emoji: '🎓',
    color: 'from-indigo-500 to-purple-600',
    subjects: createSharedSubjects(),
  },
  {
    id: 'senior-high',
    name: 'Senior High School',
    emoji: '🏫',
    color: 'from-green-500 to-teal-700',
    subjects: createSharedSubjects(),
  },
  {
    id: 'senior-specialized',
    name: 'Senior High School Specialized',
    emoji: '🔬',
    color: 'from-purple-700 to-indigo-900',
    subjects: createSharedSubjects(),
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
