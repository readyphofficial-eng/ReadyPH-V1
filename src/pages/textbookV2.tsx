import { useMemo, useState } from 'react';

type SubjectBook = {
  name: string;
  emoji: string;
  image: string;
  topics: string[];
};

type GradeBook = {
  id: string;
  name: string;
  description: string;
  color: string;
  subjects: SubjectBook[];
};

type SubjectSeed = Omit<SubjectBook, 'topics'>;

const IMAGES = {
  literacy: 'https://images.unsplash.com/photo-1455390582262-044c577e92c8?auto=format&fit=crop&w=1200&q=80',
  math: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
  science: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
  community: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
  geography: 'https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&fit=crop&w=1200&q=80',
  art: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
  technology: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  nature: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
  books: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
};

const SUBJECTS: Record<string, SubjectSeed> = {
  filipino: { name: 'Filipino', emoji: '🇵🇭', image: IMAGES.literacy },
  english: { name: 'English', emoji: '🔤', image: IMAGES.books },
  math: { name: 'Mathematics', emoji: '🔢', image: IMAGES.math },
  science: { name: 'Science', emoji: '🔬', image: IMAGES.science },
  makabansa: { name: 'Makabansa', emoji: '🏡', image: IMAGES.community },
  ap: { name: 'Araling Panlipunan', emoji: '🌏', image: IMAGES.geography },
  gmrc: { name: 'GMRC / Values Education', emoji: '💛', image: IMAGES.community },
  mapeh: { name: 'MAPEH', emoji: '🎨', image: IMAGES.art },
  tle: { name: 'EPP / TLE and ICT', emoji: '🛠️', image: IMAGES.technology },
  oral: { name: 'Oral Communication', emoji: '🎙️', image: IMAGES.literacy },
  reading: { name: 'Reading and Writing', emoji: '📚', image: IMAGES.books },
  komunikasyon: { name: 'Komunikasyon at Pananaliksik', emoji: '🗣️', image: IMAGES.literacy },
  genmath: { name: 'General Mathematics', emoji: '📈', image: IMAGES.math },
  statistics: { name: 'Statistics and Probability', emoji: '📊', image: IMAGES.math },
  earthlife: { name: 'Earth and Life Science', emoji: '🌋', image: IMAGES.nature },
  ucsp: { name: 'Understanding Culture, Society, and Politics', emoji: '🏛️', image: IMAGES.geography },
  personal: { name: 'Personal Development', emoji: '🌱', image: IMAGES.community },
  philosophy: { name: 'Introduction to Philosophy', emoji: '💭', image: IMAGES.books },
  pe: { name: 'Physical Education and Health', emoji: '⚽', image: IMAGES.art },
  stem: { name: 'STEM / Specialized Learning', emoji: '🧪', image: IMAGES.science },
  humss: { name: 'HUMSS / Specialized Learning', emoji: '📝', image: IMAGES.literacy },
  abm: { name: 'ABM / Specialized Learning', emoji: '💼', image: IMAGES.math },
  tvl: { name: 'TVL / Work Skills', emoji: '🧰', image: IMAGES.technology },
};

const TOPICS: Record<string, string[]> = {
  kinder: {
    literacy: ['Listening to Stories', 'Letters and Their Sounds', 'My Name and Familiar Words', 'Drawing and Early Writing'],
    math: ['Sorting and Matching', 'Counting Objects', 'Shapes Around Us', 'Comparing More and Less'],
    makabansa: ['Myself and My Family', 'People at School', 'Our Home and Community', 'Keeping Our Surroundings Safe'],
    gmrc: ['Kind Words and Good Manners', 'Taking Turns', 'Caring for Others', 'Being Safe and Healthy'],
    mapeh: ['Movement and Play', 'Songs and Rhymes', 'Colors and Creative Art', 'Healthy Habits'],
  },
  primary: {
    filipino: ['Pakikinig at Pag-unawa', 'Pagbasa ng mga Salita at Pangungusap', 'Pagsasalita at Pagkukuwento', 'Pagsulat ng Maiikling Ideya'],
    english: ['Listening and Speaking', 'Phonics, Words, and Sentences', 'Reading for Meaning', 'Writing Short Messages'],
    math: ['Whole Numbers and Place Value', 'Addition and Subtraction', 'Shapes and Measurement', 'Patterns and Simple Problem Solving'],
    makabansa: ['Ako, Pamilya, at Paaralan', 'Pamayanan at mga Tungkulin', 'Kultura at mga Simbolo ng Pilipinas', 'Pangangalaga sa Kapaligiran'],
    gmrc: ['Respect and Responsibility', 'Honesty in Daily Life', 'Cooperation and Kindness', 'Caring for Self and Others'],
    mapeh: ['Music, Rhythm, and Movement', 'Drawing and Local Arts', 'Games and Physical Fitness', 'Health and Personal Safety'],
  },
  intermediate: {
    filipino: ['Pag-unawa sa Iba’t Ibang Teksto', 'Talasalitaan at Gramatika', 'Pagsulat ng Talata at Sanaysay', 'Panitikan at Kulturang Pilipino'],
    english: ['Reading Comprehension and Vocabulary', 'Grammar in Context', 'Informative and Creative Writing', 'Speaking and Listening for Purpose'],
    math: ['Fractions, Decimals, and Percent', 'Factors, Multiples, and Operations', 'Geometry and Measurement', 'Data, Patterns, and Problem Solving'],
    science: ['Living Things and Their Environments', 'Matter and Its Properties', 'Force, Motion, and Energy', 'Earth, Weather, and Space'],
    ap: ['Kasaysayan at Pagkabansa', 'Lokasyon at Katangiang Heograpikal', 'Pamahalaan at Pakikilahok', 'Kabuhayan at mga Isyung Panlipunan'],
    gmrc: ['Dignity and Respect', 'Responsible Decision-Making', 'Family and Community Values', 'Care for the Common Good'],
    mapeh: ['Music and Philippine Performance', 'Visual Arts and Design', 'Movement, Sports, and Fitness', 'Health, Nutrition, and Safety'],
    tle: ['Home and School Skills', 'Food, Plants, and Livelihood', 'Digital Literacy and Safety', 'Planning and Making a Useful Product'],
  },
  junior: {
    filipino: ['Panitikan at mga Akdang Pilipino', 'Wika, Gramatika, at Retorika', 'Pagsusuri ng Teksto at Media', 'Akademiko at Malikhaing Pagsulat'],
    english: ['Literature and Text Analysis', 'Language, Grammar, and Vocabulary', 'Research and Media Literacy', 'Argumentative and Creative Writing'],
    math: ['Numbers, Rational Expressions, and Algebra', 'Linear and Nonlinear Relationships', 'Geometry, Measurement, and Trigonometry', 'Statistics, Probability, and Applications'],
    science: ['Matter, Atoms, and Chemical Change', 'Cells, Heredity, and Ecosystems', 'Force, Motion, and Energy', 'Earth Systems, Climate, and Space'],
    ap: ['Kasaysayan ng Asya at Daigdig', 'Ekonomiks at Kabuhayan', 'Pamahalaan at Pagkamamamayan', 'Mga Isyung Panlipunan at Pandaigdig'],
    gmrc: ['Pagpapahalaga sa Sarili at Kapwa', 'Mapanagutang Pagpapasya', 'Pakikipag-ugnayan at Kapayapaan', 'Pagkamamamayan at Pananagutan'],
    mapeh: ['Music and Arts in Culture', 'Physical Fitness and Movement', 'Personal and Community Health', 'Sportsmanship and Well-being'],
    tle: ['Digital Citizenship and Productivity', 'Technology and Livelihood Skills', 'Design, Making, and Entrepreneurship', 'Career Exploration and Safety'],
  },
  senior: {
    filipino: ['Akademikong Pagbasa at Pagsulat', 'Pananaliksik at Pagsusuri ng Sanggunian', 'Pagsulat ng Iba’t Ibang Teksto', 'Wika, Panitikan, at Kulturang Pilipino'],
    english: ['Academic and Professional Communication', 'Critical Reading and Text Analysis', 'Research, Citation, and Media Literacy', 'Writing for Academic and Workplace Purposes'],
    oral: ['Communication Process and Context', 'Verbal and Nonverbal Strategies', 'Organizing and Delivering a Speech', 'Professional and Intercultural Communication'],
    reading: ['Critical Reading Strategies', 'Evaluating Claims and Evidence', 'Academic Writing and Citation', 'Research-Based Composition'],
    komunikasyon: ['Konsepto at Gamit ng Wika', 'Komunikasyon sa Lipunan', 'Pagbasa at Pagsusuri ng Teksto', 'Pananaliksik at Akademikong Pagsulat'],
    genmath: ['Functions and Their Representations', 'Rational and Exponential Models', 'Logic, Finance, and Decision-Making', 'Mathematics in Real-World Contexts'],
    statistics: ['Data Collection and Sampling', 'Descriptive Statistics', 'Probability and Distributions', 'Statistical Inference and Decisions'],
    earthlife: ['Earth Systems and Natural Hazards', 'Biodiversity and Ecosystems', 'Evolution and Life Processes', 'Science, Technology, and Society'],
    ucsp: ['Culture and Society', 'Socialization and Institutions', 'Politics, Power, and Citizenship', 'Social Issues and Community Research'],
    personal: ['Self-Development and Identity', 'Mental Health and Well-being', 'Relationships and Decision-Making', 'Life Goals and Career Planning'],
    philosophy: ['The Human Person and Meaning', 'Reasoning and Critical Thinking', 'Ethics and Moral Decisions', 'Freedom, Society, and the Good Life'],
    pe: ['Fitness Concepts and Assessment', 'Movement and Physical Activity', 'Healthy Lifestyle Choices', 'Safety and Lifelong Wellness'],
    stem: ['Scientific Inquiry and Research', 'Mathematical Models and Applications', 'Technology, Innovation, and Design', 'Ethics and Responsible Practice'],
    humss: ['Society and Human Behavior', 'Communication and Public Issues', 'Research and Community Perspectives', 'Culture, Identity, and Social Change'],
    abm: ['Accounting and Business Concepts', 'Marketing and Customer Needs', 'Finance and Business Decisions', 'Entrepreneurship and Business Planning'],
    tvl: ['Workplace Communication and Safety', 'Tools, Processes, and Technical Skills', 'Digital and Industry Practices', 'Work Immersion and Career Readiness'],
  },
};

const SUBJECTS_BY_BAND: Record<string, string[]> = {
  kinder: ['literacy', 'math', 'makabansa', 'gmrc', 'mapeh'],
  primary: ['filipino', 'english', 'math', 'makabansa', 'gmrc', 'mapeh'],
  intermediate: ['filipino', 'english', 'math', 'science', 'ap', 'gmrc', 'mapeh', 'tle'],
  junior: ['filipino', 'english', 'math', 'science', 'ap', 'gmrc', 'mapeh', 'tle'],
  senior: ['filipino', 'english', 'oral', 'reading', 'komunikasyon', 'genmath', 'statistics', 'earthlife', 'ucsp', 'personal', 'philosophy', 'pe', 'stem', 'humss', 'abm', 'tvl'],
};

function bandForGrade(grade: number | 'K'): string {
  if (grade === 'K') return 'kinder';
  if (grade <= 3) return 'primary';
  if (grade <= 6) return 'intermediate';
  if (grade <= 10) return 'junior';
  return 'senior';
}

const GRADES: GradeBook[] = [
  { id: 'K', name: 'Kindergarten', description: 'Early learning', color: 'from-amber-400 to-orange-500', subjects: [] },
  ...Array.from({ length: 12 }, (_, index) => {
    const grade = index + 1;
    const band = bandForGrade(grade);
    return {
      id: `G${grade}`,
      name: `Grade ${grade}`,
      description: grade <= 6 ? 'Elementary' : grade <= 10 ? 'Junior High School' : 'Senior High School',
      color: grade <= 3 ? 'from-emerald-400 to-green-600' : grade <= 6 ? 'from-sky-400 to-blue-600' : grade <= 10 ? 'from-violet-400 to-purple-600' : 'from-rose-400 to-pink-600',
      subjects: [],
    };
  }),
].map(grade => {
  const band = bandForGrade(grade.id === 'K' ? 'K' : Number(grade.id.slice(1)));
  return {
    ...grade,
    subjects: SUBJECTS_BY_BAND[band].map(key => {
      const subject = SUBJECTS[key];
      return { ...subject, topics: TOPICS[band][key] ?? TOPICS[band].english };
    }),
  };
});

export function TextbooksV2() {
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const selectedGrade = GRADES.find(grade => grade.id === selectedGradeId) ?? null;
  const selectedSubject = selectedGrade?.subjects.find(subject => subject.name === selectedSubjectName) ?? null;
  const topics = selectedSubject?.topics ?? [];
  const topic = selectedTopicIndex === null ? null : topics[selectedTopicIndex] ?? null;

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];
    return GRADES.flatMap(grade => grade.subjects.flatMap(subject =>
      subject.topics
        .map((title, index) => ({ grade, subject, title, index }))
        .filter(item => `${grade.name} ${subject.name} ${item.title}`.toLowerCase().includes(query))
    )).slice(0, 30);
  }, [search]);

  const openGrade = (grade: GradeBook) => {
    setSelectedGradeId(grade.id);
    setSelectedSubjectName(null);
    setSelectedTopicIndex(null);
    setSearch('');
    window.scrollTo(0, 0);
  };

  const openSubject = (subject: SubjectBook) => {
    setSelectedSubjectName(subject.name);
    setSelectedTopicIndex(null);
    window.scrollTo(0, 0);
  };

  const openTopic = (grade: GradeBook, subject: SubjectBook, index: number) => {
    setSelectedGradeId(grade.id);
    setSelectedSubjectName(subject.name);
    setSelectedTopicIndex(index);
    setSearch('');
    window.scrollTo(0, 0);
  };

  const backToLibrary = () => {
    setSelectedGradeId(null);
    setSelectedSubjectName(null);
    setSelectedTopicIndex(null);
    window.scrollTo(0, 0);
  };

  const backToSubjects = () => {
    setSelectedSubjectName(null);
    setSelectedTopicIndex(null);
    window.scrollTo(0, 0);
  };

  const backToTopics = () => {
    setSelectedTopicIndex(null);
    window.scrollTo(0, 0);
  };

  const changeTopic = (direction: -1 | 1) => {
    if (selectedTopicIndex === null) return;
    const next = selectedTopicIndex + direction;
    if (next >= 0 && next < topics.length) {
      setSelectedTopicIndex(next);
      window.scrollTo(0, 0);
    }
  };

  const openSearchResult = (result: { grade: GradeBook; subject: SubjectBook; index: number }) => {
    openTopic(result.grade, result.subject, result.index);
  };

  return (
    <main className="min-h-screen bg-[#fff9ee] pb-28 text-slate-800">
      <header className="bg-gradient-to-r from-cyan-600 to-blue-700 px-5 pb-6 pt-10 text-white shadow-lg">
        <button onClick={backToLibrary} className="mb-3 text-left text-sm font-bold text-white/80">📚 K–12 eBook Library</button>
        <h1 className="text-2xl font-black">K–12 eBook Library</h1>
        <p className="mt-1 text-sm text-white/85">Browse by grade, subject, and lesson. Read at your own pace.</p>
      </header>

      {topic && selectedGrade && selectedSubject ? (
        <article className="mx-4 mt-4 overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="relative h-52 bg-slate-200">
            <img src={selectedSubject.image} alt={`${selectedSubject.name} lesson illustration`} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs font-bold uppercase tracking-wider">{selectedGrade.name} · {selectedSubject.name}</p>
              <h2 className="mt-1 text-2xl font-black">{topic}</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              <button onClick={backToSubjects} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold">← Subjects</button>
              <button onClick={backToTopics} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold">← Lessons</button>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Reading lesson</p>
            <h3 className="mt-1 text-xl font-black">About this lesson</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              This chapter introduces <b>{topic.toLowerCase()}</b> in {selectedSubject.name} for {selectedGrade.name}. Read the ideas slowly, connect them to what you already know, and use the example to see how the topic appears in everyday life.
            </p>

            <div className="my-5 overflow-hidden rounded-2xl bg-sky-50">
              <img src={selectedSubject.image} alt={`Illustration for ${topic}`} className="h-44 w-full object-cover" loading="lazy" />
              <p className="px-4 py-2 text-xs text-slate-500">Illustration: {selectedSubject.name} · {topic}</p>
            </div>

            <section className="rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-4">
              <h3 className="font-black text-blue-900">📖 Main idea</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {topic} is studied through the ideas, skills, and examples connected to {selectedSubject.name}. Notice important details, look for patterns, and ask how the lesson relates to your community and daily experiences.
              </p>
            </section>

            <section className="mt-4 rounded-2xl bg-amber-50 p-4">
              <h3 className="font-black text-amber-900">💡 Sample to think about</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Think of one familiar situation related to <b>{topic.toLowerCase()}</b>. Identify what you already know, describe what is happening, and explain how the ideas from {selectedSubject.name} can help you understand it.
              </p>
              <p className="mt-3 rounded-xl bg-white p-3 text-sm italic text-slate-600">Example: A learner observes something in their home or community, records the details, and uses the lesson to explain what they noticed.</p>
            </section>

            <section className="mt-4 rounded-2xl bg-emerald-50 p-4">
              <h3 className="font-black text-emerald-900">📝 Remember</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">Good readers connect new information to examples, explain ideas in their own words, and return to the text when they need to check a detail.</p>
            </section>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <button onClick={() => changeTopic(-1)} disabled={selectedTopicIndex === 0} className="rounded-full bg-slate-100 px-4 py-2.5 text-sm font-bold disabled:opacity-40">← Previous</button>
              <span className="text-xs font-bold text-slate-400">Lesson {(selectedTopicIndex ?? 0) + 1} of {topics.length}</span>
              <button onClick={() => changeTopic(1)} disabled={selectedTopicIndex === topics.length - 1} className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-40">Next →</button>
            </div>
          </div>
        </article>
      ) : selectedSubject && selectedGrade ? (
        <section className="px-4 pt-4">
          <button onClick={backToSubjects} className="mb-3 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">← {selectedGrade.name} subjects</button>
          <div className="mb-4 overflow-hidden rounded-3xl bg-white shadow-lg">
            <img src={selectedSubject.image} alt={`${selectedSubject.name} book cover`} className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{selectedGrade.name} eBook</p>
              <h2 className="text-2xl font-black">{selectedSubject.emoji} {selectedSubject.name}</h2>
              <p className="mt-1 text-sm text-slate-500">Choose a lesson to start reading.</p>
            </div>
          </div>
          <div className="space-y-2">
            {selectedSubject.topics.map((title, index) => (
              <button key={title} onClick={() => setSelectedTopicIndex(index)} className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm transition hover:shadow-md">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-700">{index + 1}</span>
                <span className="flex-1 text-sm font-bold">{title}</span>
                <span className="text-lg text-slate-300">›</span>
              </button>
            ))}
          </div>
        </section>
      ) : selectedGrade ? (
        <section className="px-4 pt-4">
          <button onClick={backToLibrary} className="mb-3 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">← All grades</button>
          <div className={`mb-4 rounded-3xl bg-gradient-to-r ${selectedGrade.color} p-5 text-white shadow-lg`}>
            <p className="text-xs font-bold uppercase tracking-wider">{selectedGrade.description}</p>
            <h2 className="mt-1 text-2xl font-black">{selectedGrade.name}</h2>
            <p className="mt-1 text-sm text-white/85">{selectedGrade.subjects.length} learning areas · select a book</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {selectedGrade.subjects.map(subject => (
              <button key={subject.name} onClick={() => openSubject(subject)} className="overflow-hidden rounded-2xl bg-white text-left shadow-md transition hover:-translate-y-0.5">
                <img src={subject.image} alt="" className="h-24 w-full object-cover" loading="lazy" />
                <div className="p-3"><span className="text-2xl">{subject.emoji}</span><p className="mt-1 text-sm font-black leading-tight">{subject.name}</p><p className="mt-1 text-xs text-slate-400">{subject.topics.length} lessons</p></div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="px-4 pt-4">
          <div className="rounded-3xl bg-white p-4 shadow-md">
            <h2 className="text-lg font-black">Find a lesson</h2>
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search grade, subject, or topic" className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-400" />
            {search.trim() && (
              <div className="mt-3 space-y-2">
                {searchResults.length ? searchResults.map((result, index) => (
                  <button key={`${result.grade.id}-${result.subject.name}-${index}`} onClick={() => openSearchResult(result)} className="w-full rounded-xl bg-blue-50 p-3 text-left">
                    <p className="text-sm font-bold">{result.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{result.grade.name} · {result.subject.name}</p>
                  </button>
                )) : <p className="py-2 text-sm text-slate-500">No lessons found.</p>}
              </div>
            )}
          </div>

          <div className="my-5 rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-600 p-5 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-5xl">📚</span>
              <div><h2 className="text-xl font-black">Choose your grade</h2><p className="mt-1 text-sm text-white/80">Open a subject book, then pick a lesson.</p></div>
            </div>
          </div>

          <div className="space-y-3">
            {GRADES.map(grade => (
              <button key={grade.id} onClick={() => openGrade(grade)} className={`flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r ${grade.color} p-4 text-left text-white shadow-md transition hover:shadow-lg`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/25 text-2xl">{grade.id === 'K' ? '🧒' : '🎓'}</span>
                <span className="flex-1"><span className="block text-lg font-black">{grade.name}</span><span className="text-xs text-white/80">{grade.description} · {grade.subjects.length} subjects</span></span>
                <span className="text-2xl">›</span>
              </button>
            ))}
          </div>

          <p className="mt-5 rounded-2xl bg-amber-100 p-4 text-xs leading-5 text-amber-900">
            This eBook library is organized around K–12 grade levels and learning areas. Curriculum guides can change; please use the current official DepEd guide for your school year as the reference for required competencies.
          </p>
        </section>
      )}
    </main>
  );
}

export default TextbooksV2;
