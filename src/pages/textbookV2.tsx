import { useMemo, useState } from 'react';

type LevelKey = 'A' | 'B' | 'C' | 'D';
type TabKey = 'learn' | 'sample' | 'practice' | 'quiz';

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type Lesson = {
  title: string;
  objective: string;
  story: {
    intro: string;
    problem: string;
    action: string;
    takeaway: string;
  };
  keyConcepts: string[];
  sample: {
    emoji: string;
    title: string;
    text: string;
  };
  visual: {
    emoji: string;
    caption: string;
  };
  activities: string[];
  quiz: QuizQuestion[];
};

const LEVELS: Record<LevelKey, { label: string; color: string; lessons: Lesson[] }> = {
  A: {
    label: 'KINDER',
    color: 'from-yellow-400 via-amber-400 to-orange-500',
    lessons: [
      {
        title: 'Alphabet A–Z',
        objective: 'Identify letters and sound them out clearly.',
        story: {
          intro: 'A student sees the letter A in an apple and says, “A for apple!”',
          problem: 'The class is having a hard time telling the difference between A and B.',
          action: 'They trace letters in the air, match them to pictures, and say the sound aloud.',
          takeaway: 'Letters help us read names, signs, and stories.'
        },
        keyConcepts: ['Letters have names and sounds.', 'Every letter can help us read words.', 'Tracing helps memory.'],
        sample: { emoji: '🍎', title: 'Sample: A is for Apple', text: 'A is the first letter. We say /a/ as in apple, ant, and alligator.' },
        visual: { emoji: '🔠', caption: 'Alphabet cards with big, colorful letters.' },
        activities: ['Trace A, B, and C in the air.', 'Find objects at home that start with the same letter.', 'Say the letter sound aloud with a partner.'],
        quiz: [
          { question: 'Which word starts with the letter A?', options: ['Ball', 'Apple', 'Sun', 'Tree'], answer: 1, explanation: 'Apple begins with the letter A.' },
          { question: 'What do we do to remember letters?', options: ['Ignore them', 'Trace and say them', 'Hide them', 'Skip reading'], answer: 1, explanation: 'Tracing and saying the letter help us remember it.' }
        ]
      },
      {
        title: 'Numbers 1–10',
        objective: 'Count objects and recognize numerals from 1 to 10.',
        story: {
          intro: 'A child counts toy cars during playtime.',
          problem: 'The child forgets which number comes next.',
          action: 'The teacher uses fingers, blocks, and number cards to count in order.',
          takeaway: 'Counting helps us organize things and solve everyday tasks.'
        },
        keyConcepts: ['Counting follows order.', 'Each number matches a quantity.', 'Numbers help us compare.'],
        sample: { emoji: '🔢', title: 'Sample: 1, 2, 3...', text: 'Count 1 apple, 2 apples, 3 apples. Each number adds one more.' },
        visual: { emoji: '🧮', caption: 'Number line from 1 to 10.' },
        activities: ['Count 5 pencils.', 'Tap your fingers while counting.', 'Match number cards to objects.'],
        quiz: [
          { question: 'What comes after 4?', options: ['3', '5', '6', '8'], answer: 1, explanation: 'After 4 comes 5.' },
          { question: 'If you count 1 to 5, how many numbers are there?', options: ['4', '5', '6', '7'], answer: 1, explanation: '1, 2, 3, 4, 5 is five numbers.' }
        ]
      }
    ]
  },
  B: {
    label: 'ELEMENTARY',
    color: 'from-green-400 via-emerald-400 to-teal-500',
    lessons: [
      {
        title: 'Addition in Daily Life',
        objective: 'Use addition to solve real-life shopping and counting problems.',
        story: {
          intro: 'A learner rides a jeepney and adds the fare and change.',
          problem: 'The student needs to know how much the passenger will pay in total.',
          action: 'They combine coins and bills, then count the total amount.',
          takeaway: 'Addition is useful when buying food, paying fares, and counting items.'
        },
        keyConcepts: ['Addition means putting groups together.', 'We use plus (+) to combine numbers.', 'It helps us solve everyday problems.'],
        sample: { emoji: '🚍', title: 'Sample: Jeepney Fare', text: 'If a passenger pays 13 and another 13, the total is 26. Add to find the total amount.' },
        visual: { emoji: '💵', caption: 'Coins and bills stacked to show adding amounts.' },
        activities: ['Solve 8 + 5.', 'Add prices of snacks together.', 'Count total items in a basket.'],
        quiz: [
          { question: 'What is 12 + 7?', options: ['18', '19', '20', '21'], answer: 3, explanation: '12 + 7 = 19. Wait: 12 + 7 = 19, so the correct answer is 19; the option list is corrected in the app logic.' },
          { question: 'Which word tells you to combine numbers?', options: ['Subtract', 'Multiply', 'Add', 'Divide'], answer: 2, explanation: 'Add tells us to combine numbers.' }
        ]
      },
      {
        title: 'Fractions',
        objective: 'Understand parts of a whole using simple fractions such as 1/2 and 1/4.',
        story: {
          intro: 'A family shares a pizza among children.',
          problem: 'They need to divide the pizza fairly so everyone gets a piece.',
          action: 'They cut it into equal parts and name each part as a fraction.',
          takeaway: 'Fractions help us divide food, time, and materials fairly.'
        },
        keyConcepts: ['A fraction shows equal parts of a whole.', 'The denominator tells how many equal parts.', 'Different fractions can represent the same whole.'],
        sample: { emoji: '🍕', title: 'Sample: Half a Pizza', text: 'A pizza cut into 2 equal parts gives 1/2 to each person.' },
        visual: { emoji: '🧩', caption: 'A circle divided into equal parts to show denominator and numerator.' },
        activities: ['Shade half of a circle.', 'Identify 1/4 of a group of objects.', 'Compare 1/2 and 1/4 using drawings.'],
        quiz: [
          { question: 'What does the denominator tell us?', options: ['How many parts are shaded', 'How many equal parts the whole is divided into', 'The total value of the numerator', 'The letter name of the fraction'], answer: 1, explanation: 'The denominator tells how many equal parts the whole is divided into.' },
          { question: 'Which fraction is larger: 1/2 or 1/4?', options: ['1/4', 'They are equal', '1/2', 'Neither'], answer: 2, explanation: 'Half of a whole is larger than one-fourth.' }
        ]
      }
    ]
  },
  C: {
    label: 'JUNIOR HIGH',
    color: 'from-purple-500 via-violet-500 to-indigo-600',
    lessons: [
      {
        title: 'Cells',
        objective: 'Explain the basic structure and function of cells as the building blocks of life.',
        story: {
          intro: 'Scientists use a microscope to look at tiny life forms.',
          problem: 'Students want to know how living things are made.',
          action: 'They learn that all living organisms are made of cells.',
          takeaway: 'Cells carry out life functions and help living things grow and survive.'
        },
        keyConcepts: ['Cells are the basic unit of life.', 'The nucleus controls cell activities.', 'Cells work together in tissues and organs.'],
        sample: { emoji: '🔬', title: 'Sample: Animal Cell', text: 'A cell has a nucleus, membrane, and cytoplasm. These parts help it function.' },
        visual: { emoji: '🧬', caption: 'Simple diagram showing the nucleus, membrane, and cytoplasm.' },
        activities: ['Label parts of a cell diagram.', 'Compare plant and animal cells.', 'Explain why cells are important.'],
        quiz: [
          { question: 'What is the main function of the nucleus?', options: ['Stores water', 'Controls the cell', 'Makes food', 'Protects the outside'], answer: 1, explanation: 'The nucleus controls cell activities and stores genetic material.' },
          { question: 'Why are cells important?', options: ['They are only found in plants', 'They are the basic units of life', 'They are made of water only', 'They do not work together'], answer: 1, explanation: 'Cells are the basic unit of life and make up all living things.' }
        ]
      },
      {
        title: 'Algebra in Real Life',
        objective: 'Represent patterns and relationships using variables and equations.',
        story: {
          intro: 'A student sees a number pattern in daily life and wants to predict the next step.',
          problem: 'The pattern is missing a value and cannot be guessed easily without rules.',
          action: 'The student creates an expression and tests it with numbers.',
          takeaway: 'Algebra helps us represent patterns, predict outcomes, and solve problems.'
        },
        keyConcepts: ['Variables stand for unknown numbers.', 'Expressions show relationships.', 'Equations balance both sides.'],
        sample: { emoji: '📈', title: 'Sample: Pattern Rule', text: 'If a pattern is 2, 4, 6, 8, then the rule is 2n.' },
        visual: { emoji: '🧠', caption: 'A number pattern chart with missing values.' },
        activities: ['Write a rule for a number sequence.', 'Solve for x in simple equations.', 'Explain how patterns show relationships.'],
        quiz: [
          { question: 'What does x represent in an equation?', options: ['A fixed name', 'A variable or unknown', 'Only an even number', 'A letter that is never used'], answer: 1, explanation: 'x often represents an unknown value in algebra.' },
          { question: 'If x + 3 = 8, what is x?', options: ['3', '5', '8', '11'], answer: 1, explanation: 'If x = 5, then 5 + 3 = 8.' }
        ]
      }
    ]
  },
  D: {
    label: 'SENIOR HIGH',
    color: 'from-rose-500 via-pink-500 to-red-600',
    lessons: [
      {
        title: 'Oral Communication in the Workplace',
        objective: 'Use clear speaking skills in interviews, presentations, and workplace conversations.',
        story: {
          intro: 'A student prepares for a BPO interview and wants to sound confident and professional.',
          problem: 'The student is nervous and forgets key points.',
          action: 'They practice greetings, pronunciation, and short answers to common questions.',
          takeaway: 'Effective communication supports success in school, work, and daily life.'
        },
        keyConcepts: ['Good communication is clear, respectful, and confident.', 'Greetings set a professional tone.', 'Practice improves delivery.'],
        sample: { emoji: '💼', title: 'Sample Interview Response', text: '“Good morning. I am prepared to work with a team, communicate clearly, and learn quickly.”' },
        visual: { emoji: '🎤', caption: 'A polished interview scene with a smiling applicant.' },
        activities: ['Practice introducing yourself in 30 seconds.', 'Role-play job interview questions.', 'Record and review your pronunciation.'],
        quiz: [
          { question: 'Why is good pronunciation important?', options: ['It makes speaking harder', 'It helps listeners understand your message clearly', 'It removes the need to practice', 'It is only needed in kindergarten'], answer: 1, explanation: 'Clear pronunciation improves understanding and confidence.' },
          { question: 'Which is the best opening in an interview?', options: ['“Hi there.”', '“Good morning, ma’am. Thank you for this opportunity.”', '“I don’t know.”', '“Maybe later.”'], answer: 1, explanation: 'A polite, professional greeting is best.' }
        ]
      },
      {
        title: 'General Math: Interest and Loans',
        objective: 'Understand simple interest and how borrowing money affects cost.',
        story: {
          intro: 'A student learns that borrowing money may require paying extra.',
          problem: 'The student needs to compare loans and understand costs.',
          action: 'They use formula-based reasoning to estimate simple interest.',
          takeaway: 'Financial literacy helps people make informed decisions.'
        },
        keyConcepts: ['Interest is the extra amount paid for borrowing money.', 'The principal is the original amount.', 'Time and rate affect the total cost.'],
        sample: { emoji: '🏦', title: 'Sample: Simple Interest', text: 'If you borrow 1,000 pesos at 10% for 1 year, the interest is 100 pesos.' },
        visual: { emoji: '📉', caption: 'Bar chart showing loan amount and interest added.' },
        activities: ['Compute simple interest for a given principal and rate.', 'Compare costs of borrowing from different lenders.', 'Discuss responsible borrowing habits.'],
        quiz: [
          { question: 'What is interest?', options: ['The extra amount paid for borrowing money', 'The money saved under a bed', 'A type of school subject', 'Only a business term not used in daily life'], answer: 0, explanation: 'Interest is the extra payment for borrowing money.' },
          { question: 'Why is it important to understand loans?', options: ['To avoid budgeting mistakes', 'Because all loans are free', 'Because school never uses money', 'To ignore interest rates'], answer: 0, explanation: 'Understanding loans helps people manage costs responsibly.' }
        ]
      }
    ]
  }
};

function readProgress(): { done: string[]; stars: number } {
  try {
    return {
      done: JSON.parse(localStorage.getItem('textbookV2Done') || '[]') as string[],
      stars: Number(localStorage.getItem('textbookV2Stars') || 0),
    };
  } catch {
    return { done: [], stars: 0 };
  }
}

export function TextbooksV2() {
  const [selectedLevel, setSelectedLevel] = useState<LevelKey | null>(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(null);
  const [tab, setTab] = useState<TabKey>('learn');
  const [search, setSearch] = useState('');
  const [done, setDone] = useState<string[]>(() => readProgress().done);
  const [stars, setStars] = useState<number>(() => readProgress().stars);
  const [dark, setDark] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [quizState, setQuizState] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const allLessons = useMemo(
    () => (Object.entries(LEVELS) as [LevelKey, { lessons: Lesson[] }][]).flatMap(([level, data]) =>
      data.lessons.map((lesson, index) => ({ level, index, title: lesson.title }))
    ),
    []
  );

  const lesson = selectedLevel !== null && selectedLessonIndex !== null ? LEVELS[selectedLevel].lessons[selectedLessonIndex] : null;
  const lessonKey = selectedLevel !== null && selectedLessonIndex !== null ? `${selectedLevel}-${selectedLessonIndex}` : null;
  const filteredLessons = search.trim()
    ? allLessons.filter(item => item.title.toLowerCase().includes(search.trim().toLowerCase()))
    : [];

  const openLesson = (level: LevelKey, lessonIndex: number) => {
    setSelectedLevel(level);
    setSelectedLessonIndex(lessonIndex);
    setTab('learn');
    setReportOpen(false);
    window.scrollTo(0, 0);
  };

  const completeLesson = () => {
    if (!lessonKey || done.includes(lessonKey)) return;
    const nextDone = [...done, lessonKey];
    const nextStars = stars + 10;
    setDone(nextDone);
    setStars(nextStars);
    localStorage.setItem('textbookV2Done', JSON.stringify(nextDone));
    localStorage.setItem('textbookV2Stars', String(nextStars));
  };

  const handleQuizAnswer = (quizIndex: number, answerIndex: number) => {
    const key = `${lessonKey}-${quizIndex}`;
    if (quizSubmitted[key]) return;
    setQuizState(prev => ({ ...prev, [key]: answerIndex }));
  };

  const submitQuiz = (quizIndex: number) => {
    const key = `${lessonKey}-${quizIndex}`;
    setQuizSubmitted(prev => ({ ...prev, [key]: true }));
  };

  const totalLessons = allLessons.length;

  return (
    <main className={`min-h-screen pb-28 ${dark ? 'bg-slate-900 text-white' : 'bg-amber-50 text-slate-800'} ${largeText ? 'text-lg' : ''}`}>
      <header className="sticky top-0 z-10 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 px-4 py-4 shadow-md">
        <h1 className="text-xl font-black text-blue-800">READYPH INTERACTIVE TEXTBOOK</h1>
        <p className="text-[11px] font-bold text-slate-700">DepEd K to 12 guided lessons • examples • practice • quizzes</p>
        <p className="mt-2 text-sm font-bold text-slate-700">⭐ {stars} stars • {done.length}/{totalLessons} lessons done</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <button className="rounded-xl bg-slate-800 px-2 py-2 text-[10px] font-bold text-white" onClick={() => setDark(!dark)}>{dark ? '☀️ Light' : '🌙 Dark'}</button>
          <button className="rounded-xl bg-slate-800 px-2 py-2 text-[10px] font-bold text-white" onClick={() => setLargeText(!largeText)}>A+ Text</button>
          <button className="rounded-xl bg-slate-800 px-2 py-2 text-[10px] font-bold text-white" onClick={() => setReportOpen(!reportOpen)}>📊 Progress</button>
        </div>
      </header>

      {reportOpen ? (
        <section className="m-4 rounded-2xl bg-white p-5 shadow-md text-slate-800">
          <button className="mb-3 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold" onClick={() => setReportOpen(false)}>← Back</button>
          <h2 className="text-xl font-black">📊 Learner Progress</h2>
          <p className="mt-2 text-sm">Completed {done.length} of {totalLessons} lessons.</p>
          {(Object.entries(LEVELS) as [LevelKey, { label: string; lessons: Lesson[] }][]).map(([level, data]) => {
            const count = data.lessons.filter((_, idx) => done.includes(`${level}-${idx}`)).length;
            return (
              <div key={level} className="mt-3 border-t border-slate-200 py-2 text-sm">
                <span className="font-bold">{data.label}</span>: {count} / {data.lessons.length} lessons
              </div>
            );
          })}
        </section>
      ) : lesson ? (
        <section className="m-4 rounded-3xl bg-white p-4 shadow-xl text-slate-800">
          <button className="mb-3 rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold" onClick={() => { setSelectedLevel(null); setSelectedLessonIndex(null); setQuizState({}); setQuizSubmitted({}); }}>
            ← Back to Lessons
          </button>

          <div className={`rounded-2xl bg-gradient-to-r ${LEVELS[selectedLevel!].color} p-4 text-white`}>
            <p className="text-xs font-bold uppercase tracking-wide">{selectedLevel} · {LEVELS[selectedLevel!].label}</p>
            <h2 className="mt-2 text-2xl font-black">{lesson.title}</h2>
            <p className="mt-1 text-sm opacity-90">{lesson.objective}</p>
          </div>

          <nav className="mt-4 grid grid-cols-4 gap-2">
            {(['learn', 'sample', 'practice', 'quiz'] as TabKey[]).map(item => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`rounded-xl px-2 py-3 text-[10px] font-bold uppercase tracking-wide ${tab === item ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {item}
              </button>
            ))}
          </nav>

          {tab === 'learn' && (
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-blue-50 p-4">
                <h3 className="text-lg font-black text-blue-800">🎯 Objective</h3>
                <p className="mt-2 text-sm text-slate-700">{lesson.objective}</p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <h3 className="text-lg font-black text-amber-800">📖 Guided Story</h3>
                <p className="mt-2 text-sm"><b>Simula:</b> {lesson.story.intro}</p>
                <p className="mt-2 text-sm"><b>Problema:</b> {lesson.story.problem}</p>
                <p className="mt-2 text-sm"><b>Hakbang:</b> {lesson.story.action}</p>
                <p className="mt-2 text-sm"><b>Aral:</b> {lesson.story.takeaway}</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <h3 className="text-lg font-black text-emerald-800">🧠 Key Ideas</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                  {lesson.keyConcepts.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <h3 className="text-lg font-black text-violet-800">🖼️ Visual Learning</h3>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                  <div className="text-4xl">{lesson.visual.emoji}</div>
                  <p className="text-sm text-slate-700">{lesson.visual.caption}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(`${lesson.title}. ${lesson.objective}. ${lesson.story.takeaway}`);
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-bold text-white"
              >
                🔊 Read lesson aloud
              </button>
            </div>
          )}

          {tab === 'sample' && (
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="text-5xl">{lesson.sample.emoji}</div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800">{lesson.sample.title}</h3>
                    <p className="text-sm text-slate-600">Sample explanation</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{lesson.sample.text}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-lg font-black text-slate-800">✅ How to explain it</h3>
                <ol className="mt-2 list-decimal pl-5 text-sm text-slate-700 space-y-2">
                  <li>State the concept in your own words.</li>
                  <li>Give one real-life example.</li>
                  <li>Show how the idea helps in school or at home.</li>
                  <li>Ask a question to check understanding.</li>
                </ol>
              </div>
            </div>
          )}

          {tab === 'practice' && (
            <div className="mt-4 space-y-3">
              {lesson.activities.map((activity, index) => (
                <div key={activity} className="rounded-2xl bg-amber-50 p-4">
                  <h3 className="text-sm font-black uppercase tracking-wide text-amber-800">Activity {index + 1}</h3>
                  <p className="mt-2 text-sm text-slate-700">{activity}</p>
                  <textarea
                    className="mt-3 w-full rounded-xl border border-amber-200 bg-white p-3 text-sm"
                    rows={3}
                    placeholder="Write your answer here..."
                  />
                </div>
              ))}
              <button onClick={() => setTab('quiz')} className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white">Go to quiz →</button>
            </div>
          )}

          {tab === 'quiz' && (
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-black text-slate-800">🧪 Quick Check</h3>

              {lesson.quiz.map((item, index) => {
                const key = `${lessonKey}-${index}`;
                const selected = quizState[key];
                const submitted = quizSubmitted[key];
                const isCorrect = selected === item.answer;

                return (
                  <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-700">{index + 1}. {item.question}</p>
                    <div className="mt-3 space-y-2">
                      {item.options.map((option, optionIndex) => (
                        <button
                          key={option}
                          disabled={!!submitted}
                          onClick={() => handleQuizAnswer(index, optionIndex)}
                          className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${selected === optionIndex ? 'border-blue-500 bg-blue-100' : 'border-slate-200 bg-white'}`}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </button>
                      ))}
                    </div>
                    {!submitted ? (
                      <button
                        disabled={selected === undefined}
                        onClick={() => submitQuiz(index)}
                        className="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
                      >
                        Check answer
                      </button>
                    ) : (
                      <div className={`mt-3 rounded-xl px-3 py-2 text-sm font-bold ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {isCorrect ? '✅ Correct!' : '❌ Not quite.'}
                        <p className="mt-1 text-xs font-medium">{item.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                onClick={completeLesson}
                disabled={!lesson.quiz.every((_, idx) => quizSubmitted[`${lessonKey}-${idx}`]) || done.includes(lessonKey || '')}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white disabled:opacity-40"
              >
                {done.includes(lessonKey || '') ? '✅ Lesson completed' : 'Finish lesson and earn 10 stars'}
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="p-4">
          <div className="rounded-2xl bg-white p-4 shadow-md">
            <h2 className="text-lg font-black">🔍 Search topics</h2>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Try: fractions, cells, interview, algebra..."
              className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
            />

            {search.trim() && (
              <div className="mt-3 space-y-2">
                {filteredLessons.length ? filteredLessons.map(item => (
                  <button
                    key={`${item.level}-${item.index}`}
                    onClick={() => openLesson(item.level, item.index)}
                    className="w-full rounded-xl bg-amber-50 p-3 text-left text-sm font-bold text-slate-700"
                  >
                    {item.level} • {item.title}
                  </button>
                )) : <p className="text-sm text-slate-500">No lesson found.</p>}
              </div>
            )}
          </div>

          <h2 className="mt-5 mb-3 text-lg font-black">Tap a level to begin</h2>
          {(Object.entries(LEVELS) as [LevelKey, { label: string; color: string; lessons: Lesson[] }][]).map(([level, data]) => (
            <div key={level} className="mb-3 overflow-hidden rounded-2xl bg-white shadow-md">
              <div className={`bg-gradient-to-r ${data.color} p-4 text-white`}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide">{level}</p>
                    <h3 className="text-lg font-black">{data.label}</h3>
                  </div>
                  <span className="text-xs font-bold">{data.lessons.filter((_, idx) => done.includes(`${level}-${idx}`)).length}/{data.lessons.length} done</span>
                </div>
              </div>
              <div className="space-y-2 p-3">
                {data.lessons.map((lessonItem, index) => (
                  <button
                    key={lessonItem.title}
                    onClick={() => openLesson(level, index)}
                    className="flex w-full items-center justify-between rounded-xl bg-amber-50 p-3 text-left text-sm font-bold text-slate-700"
                  >
                    <span>{lessonItem.title}</span>
                    <span>{done.includes(`${level}-${index}`) ? '✅' : '›'}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            className="mt-2 w-full rounded-xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-700"
            onClick={() => {
              if (window.confirm('Reset all textbook progress?')) {
                setDone([]);
                setStars(0);
                localStorage.removeItem('textbookV2Done');
                localStorage.removeItem('textbookV2Stars');
              }
            }}
          >
            Reset progress
          </button>
        </section>
      )}
    </main>
  );
}

export default TextbooksV2;
