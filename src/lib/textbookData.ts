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
  color: string;
  subjects: TextbookSubject[];
}

// Helper functions
function h(text: string): TextbookBlock { return { type: 'heading', text }; }
function p(text: string): TextbookBlock { return { type: 'paragraph', text }; }
function ex(text: string): TextbookBlock { return { type: 'example', text }; }
function kt(term: string, definition: string): TextbookBlock { return { type: 'keyterm', term, definition }; }
function d(emoji: string, text: string): TextbookBlock { return { type: 'diagram', emoji, text }; }
function q(question: string, options: string[], answer: number): TextbookBlock { return { type: 'quiz', question, options, answer }; }
function s(text: string): TextbookBlock { return { type: 'summary', text }; }
function ff(text: string): TextbookBlock { return { type: 'funfact', text }; }
function tip(text: string): TextbookBlock { return { type: 'tip', text }; }

// Sample data
export const TEXTBOOK_LEVELS: TextbookLevel[] = [
  {
    id: 'preschool',
    name: 'Preschool',
    color: 'from-candy-pink to-candy-yellow',
    subjects: [],
  },
];

// Exported functions
export function getLevelById(id: string): TextbookLevel | undefined {
  return TEXTBOOK_LEVELS.find(l => l.id === id);
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
        for (let pi = 0; pi < chapter.pages.length; pi++) {
          const page = chapter.pages[pi];
          const haystack = (page.title + ' ' + page.blocks.map(b => b.text ?? b.term ?? b.definition ?? b.question ?? '').join(' ')).toLowerCase();
          if (haystack.includes(q)) {
            results.push({
              levelId: level.id, levelName: level.name, levelColor: level.color,
              subjectId: subject.id, subjectName: subject.name, subjectEmoji: subject.emoji, subjectColor: subject.color,
              chapterId: chapter.id, chapterTitle: chapter.title, chapterEmoji: chapter.emoji,
              pageTitle: page.title, pageIdx: pi,
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
              cards.push({ term: block.term, definition: block.definition, subjectName: subject.name, subjectEmoji: subject.emoji });
            }
          }
        }
      }
    }
  }
  return cards;
}

export function getStats(): { totalChapters: number; totalPages: number; totalKeyTerms: number; totalQuizzes: number } {
  let totalChapters = 0, totalPages = 0, totalKeyTerms = 0, totalQuizzes = 0;
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
