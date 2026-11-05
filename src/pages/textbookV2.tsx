import { useMemo, useState } from 'react';

const LEVELS = {
  A: { label: 'KINDER', color: 'from-yellow-400 to-amber-500', lessons: ['Alphabet A–Z', 'Phonics Sounds', 'My Name', 'Sight Words', 'Ang Pamilya Ko', 'Numbers 1–10', 'Numbers 11–20', 'Colors & Shapes', 'Big & Small', 'Counting with Fruits', 'Parts of My Body', 'Animals', 'Weather & Seasons', 'Community Helpers', 'Plants & Food', 'Good Manners', 'Sharing & Helping', 'My Family & Barangay', 'Songs & Rhymes', 'My Feelings'] },
  B: { label: 'ELEMENTARY', color: 'from-green-500 to-emerald-600', lessons: ['Ako at Pamilya Ko', 'Addition: Jeepney Fare', 'Ang Aso ni Juan', 'Good Manners', 'My Community', 'Sari-Sari Store Math', 'Pang-uri at Pandiwa', 'My Province', 'Grammar Basics', 'Cleanliness & Helping', 'Multiplication at the Palengke', 'Plants Around Us', 'Weather in the Philippines', 'Fractions Intro', 'Talata at Pagbasa', 'Fractions with Pizza', 'Our Islands', 'Matter & Earth', 'Paragraph Writing', 'Decimals', 'Percentage Discounts', 'Philippine Heroes', 'Force & Energy', 'Ecosystems', 'Agriculture', 'Volume & Area', 'Our Government', 'Solar System', 'Internet Safety', 'Entrepreneurship Intro'] },
  C: { label: 'JUNIOR HIGH', color: 'from-purple-500 to-violet-600', lessons: ['Integers & Temperature', 'Cells', 'Asian Heroes', 'Algebra in Real Life', 'Ecosystems', 'Linear Equations', 'Atoms & Elements', 'Force & Motion', 'World War II in the Philippines', 'Research Writing', 'Quadratic Equations', 'Heredity', 'Economics at the Palengke', 'Chemical Bonds', 'Trigonometry Intro', 'Statistics & Surveys', 'Climate Change in the Philippines', 'Media Literacy', 'Electricity at Home', 'Argumentative Essay'] },
  D: { label: 'SENIOR HIGH', color: 'from-rose-500 to-red-600', lessons: ['Oral Communication: BPO Interview', 'General Math: Interest & Loans', 'Earth Science: Typhoons', 'Filipino Culture', 'Practical Research 1', 'Komunikasyon at Pagbasa', 'Pre-Calculus', 'Business Math', 'Creative Writing', 'ICT Tech Professionalism', 'Statistics for Business', 'Entrepreneurship Business Plan', 'Physical Science: Energy', 'Work Immersion Resume', 'Research 2: Full Paper', 'Personal Development', 'Philosophy', 'General Biology', 'Accounting', 'Work Immersion Ethics'] },
} as const;

type Level = keyof typeof LEVELS;
type Tab = 'learn' | 'practice' | 'quiz';
const quizQuestions = [
  'What is the main idea of this lesson?',
  'Which example best shows this topic in everyday life?',
  'What is an important word or concept from the lesson?',
  'What should you do first when working on this topic?',
  'Why is this topic useful to learn?',
  'Which is a good way to check your understanding?',
  'Where might you use this skill at home or school?',
  'What is a helpful strategy if you make a mistake?',
  'How could you explain this topic to a classmate?',
  'What is one thing you learned from this lesson?',
];

function readProgress(): { done: string[]; stars: number } {
  try {
    return {
      done: JSON.parse(localStorage.getItem('textbookV2Done') || '[]') as string[],
      stars: Number(localStorage.getItem('textbookV2Stars') || 0),
    };
  } catch { return { done: [], stars: 0 }; }
}

export function TextbooksV2() {
  const [level, setLevel] = useState<Level | null>(null);
  const [lessonIndex, setLessonIndex] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab>('learn');
  const [search, setSearch] = useState('');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [done, setDone] = useState<string[]>(() => readProgress().done);
  const [stars, setStars] = useState(() => readProgress().stars);
  const [dark, setDark] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [reflection, setReflection] = useState('');
  const [report, setReport] = useState(false);

  const allLessons = useMemo(() => (Object.keys(LEVELS) as Level[]).flatMap(l =>
    LEVELS[l].lessons.map((title, index) => ({ level: l, index, title }))), []);
  const lesson = level !== null && lessonIndex !== null ? LEVELS[level].lessons[lessonIndex] : null;
  const lessonKey = level !== null && lessonIndex !== null ? `${level}-${lessonIndex}` : '';
  const filtered = search.trim() ? allLessons.filter(item => item.title.toLowerCase().includes(search.trim().toLowerCase())) : [];
  const totalLessons = allLessons.length;

  const openLesson = (l: Level, index: number) => {
    setLevel(l); setLessonIndex(index); setTab('learn'); setAnswers({}); setSubmitted({}); setReflection(''); setReport(false);
    window.scrollTo(0, 0);
  };
  const finishLesson = () => {
    if (!lessonKey || done.includes(lessonKey)) return;
    const nextDone = [...done, lessonKey];
    const nextStars = stars + 10;
    setDone(nextDone); setStars(nextStars);
    localStorage.setItem('textbookV2Done', JSON.stringify(nextDone));
    localStorage.setItem('textbookV2Stars', String(nextStars));
  };

  return (
    <main className={`min-h-screen pb-28 ${dark ? 'bg-slate-900 text-white' : 'bg-amber-50 text-slate-800'} ${largeFont ? 'text-lg' : ''}`}>
      <header className="sticky top-0 z-10 bg-yellow-300 px-4 py-4 text-center shadow">
        <h1 className="text-xl font-black text-blue-800">MY INTERACTIVE TEXTBOOK — V2</h1>
        <p className="text-xs font-semibold">90 Lessons · 10-question quizzes · Practice activities · Saved progress</p>
        <p className="mt-1 text-sm font-bold">⭐ {stars} stars · {done.length} / {totalLessons} lessons complete</p>
        <div className="mt-2 flex gap-2">
          <button className="flex-1 rounded-xl bg-slate-700 px-2 py-2 text-xs font-bold text-white" onClick={() => setDark(!dark)}>{dark ? '☀️ Light' : '🌙 Dark'}</button>
          <button className="flex-1 rounded-xl bg-slate-700 px-2 py-2 text-xs font-bold text-white" onClick={() => setLargeFont(!largeFont)}>A+ Text</button>
          <button className="flex-1 rounded-xl bg-slate-700 px-2 py-2 text-xs font-bold text-white" onClick={() => setReport(!report)}>📊 Progress</button>
        </div>
      </header>

      {report ? (
        <section className="m-4 rounded-2xl bg-white p-5 text-slate-800 shadow">
          <button className="mb-3 rounded-xl bg-slate-200 px-4 py-2 font-bold" onClick={() => setReport(false)}>← Back</button>
          <h2 className="mb-3 text-xl font-black">📊 Learning Progress</h2>
          <p className="mb-3">You have completed {done.length} of {totalLessons} lessons and earned {stars} stars.</p>
          {(Object.keys(LEVELS) as Level[]).map(l => {
            const count = LEVELS[l].lessons.filter((_, i) => done.includes(`${l}-${i}`)).length;
            return <p key={l} className="border-t py-2">{LEVELS[l].label}: {count} / {LEVELS[l].lessons.length} lessons</p>;
          })}
        </section>
      ) : lesson ? (
        <section className="m-3 rounded-2xl bg-white p-4 text-slate-800 shadow-lg">
          <button className="mb-3 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold" onClick={() => { setLessonIndex(null); setAnswers({}); setSubmitted({}); }}>← Back to Lessons</button>
          <h2 className="text-xl font-black">{level} · {lesson}</h2>
          <p className="mb-4 text-sm text-slate-500">Learning goal: Understand {lesson} and connect it to everyday life.</p>
          <nav className="mb-4 grid grid-cols-3 gap-2">
            {(['learn', 'practice', 'quiz'] as Tab[]).map((item, i) => <button key={item} onClick={() => setTab(item)} className={`rounded-xl px-2 py-3 text-xs font-bold text-white ${tab === item ? 'bg-blue-600' : 'bg-blue-400'}`}>P{i + 1} {item.toUpperCase()}</button>)}
          </nav>
          {tab === 'learn' && <div className="space-y-4">
            <article className="rounded-xl bg-blue-50 p-4"><h3 className="font-black">🎯 Objective</h3><p>By the end of this lesson, you can describe {lesson}, give an example, and explain how it can help you.</p></article>
            <article className="rounded-xl bg-amber-50 p-4"><h3 className="font-black">📖 Big Story</h3><p><b>Simula:</b> In Barangay Maligaya, a learner discovers {lesson} at school.</p><p className="mt-2"><b>Gitna:</b> The class explores examples together and asks questions.</p><p className="mt-2"><b>Problema:</b> Some ideas feel confusing at first.</p><p className="mt-2"><b>Solusyon:</b> Everyone practices step by step, shares ideas, and asks for help.</p><p className="mt-2"><b>Wakas / Aral:</b> Learning {lesson} can help at home, in school, and in future work.</p></article>
            <button className="w-full rounded-xl bg-violet-100 p-3 font-bold" onClick={() => { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${lesson}. Learning helps us at home, school, and work.`)); } }}>🔊 Read lesson aloud</button>
            <article className="rounded-xl bg-emerald-50 p-4"><h3 className="font-black">📚 Key Words</h3><ul className="list-inside list-disc"><li><b>Learn:</b> to gain new knowledge or skill.</li><li><b>Practice:</b> to repeat an activity to improve.</li><li><b>Example:</b> a case that helps explain an idea.</li></ul></article>
            <article className="rounded-xl bg-sky-50 p-4"><h3 className="font-black">🧩 Try an Example</h3><p>Choose one idea from {lesson}. Explain it in your own words, then think of one way to use it in your community.</p></article>
            <article className="rounded-xl bg-rose-50 p-4"><h3 className="font-black">🌏 Real-Life Connection</h3><p>Talk with a classmate or family member about where {lesson} appears in everyday life. Listening and asking questions can help you learn more.</p></article>
            <label className="block font-bold" htmlFor="reflection">💬 Think and reflect</label><textarea id="reflection" className="w-full rounded-xl border p-3" rows={3} value={reflection} onChange={e => setReflection(e.target.value)} placeholder="What did you learn? How will you use it?" />
            <button onClick={() => setTab('practice')} className="w-full rounded-xl bg-blue-600 p-3 font-bold text-white">Continue to practice →</button>
          </div>}
          {tab === 'practice' && <div className="space-y-3">
            {['Solo: Write or solve five examples about', 'Group: Discuss how your community uses', 'Draw: Make a picture that explains', 'Challenge: Teach a new idea about', 'Home mission: Share something you learned about'].map((activity, i) => <article key={activity} className="rounded-xl bg-amber-50 p-4"><h3 className="font-black">Activity {i + 1}</h3><p>{activity} {lesson}.</p><textarea className="mt-2 w-full rounded-lg border p-2" rows={2} placeholder="Write your ideas here..." /></article>)}
            <button onClick={() => setTab('quiz')} className="w-full rounded-xl bg-blue-600 p-3 font-bold text-white">Go to quiz →</button>
          </div>}
          {tab === 'quiz' && <div className="space-y-3"><h3 className="font-black">🧠 Quiz — 10 questions</h3><p className="text-sm">Choose the response that best shows what you learned about {lesson}.</p>
            {quizQuestions.map((question, i) => <article key={question} className="rounded-xl border p-3"><p className="mb-2 font-bold">{i + 1}. {question}</p>{[`A useful idea about ${lesson}`, 'A response unrelated to the lesson', 'Skip practice and do not ask questions'].map((choice, option) => <button key={choice} disabled={submitted[i]} onClick={() => setAnswers(prev => ({ ...prev, [i]: option }))} className={`mb-1 w-full rounded-lg border p-2 text-left text-sm ${answers[i] === option ? 'border-blue-500 bg-blue-100' : 'bg-slate-50'} ${submitted[i] && option === 0 ? 'border-green-500 bg-green-100' : ''}`}>{String.fromCharCode(65 + option)}. {choice}</button>)}{!submitted[i] ? <button disabled={answers[i] === undefined} onClick={() => setSubmitted(prev => ({ ...prev, [i]: true }))} className="mt-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40">Check answer</button> : <p className={`mt-2 text-sm font-bold ${answers[i] === 0 ? 'text-green-700' : 'text-red-600'}`}>{answers[i] === 0 ? '✓ Correct!' : 'Try again after reviewing the lesson.'}</p>}</article>)}
            <button onClick={finishLesson} disabled={done.includes(lessonKey) || !quizQuestions.every((_, i) => submitted[i] && answers[i] === 0)} className="w-full rounded-xl bg-emerald-600 p-3 font-bold text-white disabled:opacity-40">{done.includes(lessonKey) ? '✅ Lesson completed · ⭐ earned' : 'Finish lesson and earn 10 stars'}</button>
          </div>}
        </section>
      ) : (
        <section className="p-4">
          <div className="mb-4 rounded-2xl bg-white p-4 shadow"><h2 className="mb-2 text-lg font-black">🔍 Search Lessons</h2><input aria-label="Search lessons" className="w-full rounded-xl border p-3" value={search} onChange={e => setSearch(e.target.value)} placeholder="Try Fractions, BPO, Cells..." />
            {search.trim() && <div className="mt-2 space-y-1">{filtered.length ? filtered.map(item => <button key={`${item.level}-${item.index}`} className="w-full rounded-lg bg-amber-50 p-2 text-left font-semibold" onClick={() => openLesson(item.level, item.index)}>{item.level} · {item.title}</button>) : <p className="p-2 text-sm text-slate-500">No lessons found.</p>}</div>}
          </div>
          <h2 className="mb-3 text-lg font-black">Tap a level to start!</h2>
          {(Object.keys(LEVELS) as Level[]).map(l => <details key={l} className="mb-3 overflow-hidden rounded-2xl bg-white shadow" open={level === l} onToggle={e => { if ((e.currentTarget as HTMLDetailsElement).open) setLevel(l); }}>
            <summary className={`cursor-pointer bg-gradient-to-r ${LEVELS[l].color} p-4 font-black text-white`}>{l} — {LEVELS[l].label} · {LEVELS[l].lessons.length} lessons <span className="float-right">{LEVELS[l].lessons.filter((_, i) => done.includes(`${l}-${i}`)).length} done</span></summary>
            <div className="grid gap-2 p-3">{LEVELS[l].lessons.map((title, i) => <button key={title} onClick={() => openLesson(l, i)} className="flex items-center justify-between rounded-xl bg-amber-50 p-3 text-left font-semibold"><span>{title}</span><span>{done.includes(`${l}-${i}`) ? '✅' : '›'}</span></button>)}</div>
          </details>)}
          <button className="mt-2 w-full rounded-xl bg-slate-200 p-3 font-bold" onClick={() => { if (window.confirm('Reset all textbook progress?')) { setDone([]); setStars(0); localStorage.removeItem('textbookV2Done'); localStorage.removeItem('textbookV2Stars'); } }}>Reset textbook progress</button>
        </section>
      )}
    </main>
  );
}

export default TextbooksV2;
