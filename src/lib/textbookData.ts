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

// Helper to create rich chapter with detailed pages
function makeChapter(id: string, title: string, emoji: string, lessons: { title: string; content: TextbookBlock[] }[]): TextbookChapter {
  return {
    id,
    title,
    emoji,
    pages: lessons.map(lesson => ({
      title: lesson.title,
      blocks: lesson.content
    }))
  };
}

// English Language Arts - Philippine Curriculum
const englishChapters = [
  makeChapter('eng-1', 'Alphabet & Phonics', '🔤', [
    { title: 'Learning the Alphabet', content: [
      h('The Filipino Alphabet'), p('The English alphabet has 26 letters. Each letter has a name and makes specific sounds.'),
      ex('The letter "A" sounds like /æ/ in "apple" and /eɪ/ in "cake".'), d('🔤', 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'),
      kt('Phoneme', 'The smallest sound unit in a language.'), kt('Letter', 'A symbol that represents a sound.'),
      q('How many letters are in the English alphabet?', ['24', '25', '26', '27'], 2), s('Each letter has its own sound. Learning sounds helps us read words.'),
      ff('The letter "Q" is almost always followed by "U" in English!'), tip('Practice saying each letter sound aloud to remember it better.')
    ]},
    { title: 'Vowels and Consonants', content: [
      h('Vowels vs Consonants'), p('Vowels are A, E, I, O, U. These letters make open mouth sounds. Consonants are all other letters.'),
      ex('The word "cat" has one vowel (A) and two consonants (C, T).'), d('🗣️', 'Vowels: Open sounds | Consonants: Blocked sounds'),
      kt('Vowel', 'Letters A, E, I, O, U that make open-mouth sounds.'), kt('Consonant', 'Letters that require blocking airflow to make sounds.'),
      q('Which letter is a vowel?', ['B', 'C', 'E', 'D'], 2), s('Vowels and consonants work together to form words.'),
      ff('The word "Strengths" has only one vowel!'), tip('Vowels usually appear once in every word.')
    ]},
    { title: 'Phonics Patterns', content: [
      h('Common Sound Patterns'), p('Words often follow patterns. Learning patterns helps us read new words.'),
      ex('Words ending in "tion" sound like "shun": nation, motion, station.'), d('📖', 'Pattern recognition helps speed reading.'),
      kt('Digraph', 'Two letters that make one sound (e.g., "ch", "sh").'), kt('Blend', 'Two consonants at the start making separate sounds (e.g., "bl", "st").'),
      q('Which letters make the "sh" sound together?', ['s and h', 'p and h', 'c and h', 's and w'], 0), s('Common patterns: ch, sh, th, ng, tion, ous.'),
      ff('The word "laugh" is pronounced differently than "cough" even though they look similar!'), tip('Practice blending sounds: C-A-T = "cat".')
    ]},
    { title: 'Short and Long Vowels', content: [
      h('Understanding Vowel Sounds'), p('Each vowel has a short sound and a long sound that sounds like its letter name.'),
      ex('Short A: "cat" | Long A: "cake"'), d('🎤', 'Short vowels need short time | Long vowels need longer time'),
      kt('Short Vowel', 'Quick vowel sound like in "cat".'), kt('Long Vowel', 'Vowel sound that matches the letter name like in "cake".'),
      q('Which word has the long "O" sound?', ['dog', 'home', 'hot', 'not'], 1), s('Short vowels in: cat, bed, sit, hot, cut | Long vowels in: cake, feel, kite, home, cute.'),
      ff('Silent E at the end of words usually makes the vowel long: "mat" vs "mate"!'), tip('Listen carefully to the vowel sounds when learning new words.')
    ]},
    { title: 'Reading Your First Words', content: [
      h('Decoding Simple Words'), p('Now we combine sounds to read real words!'),
      ex('C-A-T = cat | D-O-G = dog | B-A-T = bat'), d('📝', 'Sound + Sound + Sound = Word'),
      kt('Decode', 'To figure out how to read a word by sounding it out.'), kt('Blend', 'To put sounds together smoothly.'),
      q('What word is C-U-P?', ['cut', 'cap', 'cup', 'car'], 2), s('Blend sounds: Start with the first letter, move through each sound, then say the whole word quickly.'),
      ff('Some people can read at age 3, while others learn at 5 or 6. Everyone learns at their own pace!'), tip('Use your finger to point to each letter as you sound it out.')
    ]},
    { title: 'Sight Words', content: [
      h('Words We Need to Recognize'), p('Some words don\'t follow phonics rules. We need to learn them by sight.'),
      ex('Common sight words: the, and, is, to, of, a, in, that, have, I'), d('👁️', 'See and Remember'),
      kt('Sight Word', 'A word we learn to read instantly without sounding it out.'), kt('High-Frequency Word', 'Words used very often in reading and writing.'),
      q('Which is a sight word?', ['cat', 'the', 'bat', 'sat'], 1), s('Sight words: the, a, to, and, is, in, have, has, was, were, be, been.'),
      ff('About 100 sight words make up 80% of all the words we read!'), tip('Make flashcards for sight words and practice daily.')
    ]},
    { title: 'Word Families', content: [
      h('Words That Rhyme'), p('Many words share the same ending sound. These are called word families.'),
      ex('"at" family: bat, cat, hat, mat, rat, sat, fat'), d('🏠', 'Word families have the same ending pattern'),
      kt('Word Family', 'A group of words with the same ending sound and letters.'), kt('Rhyme', 'Words that have the same ending sound.'),
      q('Which word belongs to the "an" family?', ['can', 'bat', 'sit', 'hot'], 0), s('Common families: -at, -an, -and, -ing, -ack, -ot, -og.'),
      ff('There are over 37 different phonograms (word family patterns) in English!'), tip('Learning one word family teaches you many similar words.')
    ]},
    { title: 'Introduction to Sentences', content: [
      h('Combining Words'), p('When we put words together, we make sentences that share ideas.'),
      ex('"The cat sat." - This tells us what the cat is doing.'), d('📢', 'Words → Sentences → Stories'),
      kt('Sentence', 'A group of words that tells a complete thought.'), kt('Subject', 'The word that tells who or what is doing something.'),
      q('Which is a complete sentence?', ['Running fast', 'The cat runs', 'Very big', 'Green and yellow'], 1), s('A sentence needs: a subject (who) and an action (what).'),
      ff('The longest word in English is "pneumonoultramicroscopicsilicovolcanoconiosis" - say that three times fast!'), tip('Every sentence should tell a complete thought.')
    ]},
    { title: 'Comprehension Basics', content: [
      h('Understanding What You Read'), p('Reading is not just saying words - it\'s understanding the meaning.'),
      ex('"Ana reads a book." We understand: Ana is the one reading, and she\'s reading a book.'), d('🧠', 'Sound Words → Understand Meaning'),
      kt('Comprehension', 'Understanding the meaning of words and sentences.'), kt('Context', 'Information around a word that helps us understand it.'),
      q('In "The cat is sleeping", what is the cat doing?', ['running', 'playing', 'sleeping', 'eating'], 2), s('To understand: Sound out → Know the words → Think about the meaning.'),
      ff('Most people skip unknown words and figure them out from context clues!'), tip('Read slowly and think about what\'s happening in the story.')
    ]},
    { title: 'Filipino English Connection', content: [
      h('English in the Philippines'), p('In the Philippines, English is widely spoken and used in schools alongside Filipino.'),
      ex('Many Filipino words come from English: kwarto (quarter), libro (book), grado (grade), sektor (sector).'),
      d('🇵🇭', 'English + Filipino = Communication'), kt('Bilingual', 'Able to speak and understand two languages.'),
      q('Which Filipino word comes from English?', ['bahay', 'kwarto', 'kaibigan', 'piso'], 1), s('Learning English helps us communicate with people around the world!'),
      ff('The Philippines is one of the largest English-speaking countries in the world!'), tip('Mix English and Filipino when learning helps you remember better.')
    ]},
    { title: 'Phonics Practice Quiz', content: [
      h('Test Your Skills'), p('Let\'s see what you\'ve learned about sounds and words!'),
      q('What sound does the "c" make in "cat"?', ['/k/', '/s/', '/ch/', '/sh/'], 0),
      q('Which word has a long "e" sound?', ['bed', 'feel', 'wet', 'ten'], 1),
      q('How many vowels does "apple" have?', ['1', '2', '3', '4'], 0),
      q('Which is a digraph?', ['s', 'ch', 'b', 'n'], 1),
      s('Great work! You\'re learning to read!'), ff('Did you know? Reading to children before age 5 helps them read better later!'),
      tip('Practice reading signs and labels around your home.')
    ]}
  ]),
  
  makeChapter('eng-2', 'Vocabulary Building', '📖', [
    { title: 'Learning New Words', content: [
      h('Expanding Your Word Knowledge'), p('Every time we read, we learn new words. A rich vocabulary helps us understand better.'),
      ex('New word: "verdant" means full of green plants.'), d('📚', 'More words = Better understanding'),
      kt('Vocabulary', 'The set of words a person knows.'), kt('Definition', 'The meaning of a word.'),
      q('What does "enormous" mean?', ['tiny', 'very large', 'happy', 'quiet'], 1), s('Learn 5-10 new words each week to improve vocabulary.'),
      ff('The average English speaker knows about 20,000 words!'), tip('Read different books to learn varied vocabulary.')
    ]},
    { title: 'Context Clues', content: [
      h('Figuring Out New Words'), p('Sometimes you don\'t need a dictionary! Use the words around it to guess meaning.'),
      ex('"The luminous moon shone brightly in the sky." - We know "luminous" means bright/shining.'),
      d('💡', 'Use surrounding words to understand'), kt('Context Clue', 'Information around a word that helps explain it.'),
      q('In "The child was jubilant", what does jubilant mean?', ['sad', 'scared', 'very happy', 'angry'], 2),
      s('Types of clues: Definition given, Example shown, Opposite word nearby.'), ff('Context clues are the #1 way people learn new vocabulary!'),
      tip('When stuck on a word, read the whole sentence and guess.')
    ]},
    { title: 'Synonyms and Antonyms', content: [
      h('Words with Similar or Opposite Meanings'), p('Synonyms are words meaning almost the same. Antonyms are opposite meanings.'),
      ex('Synonyms: happy/joyful/cheerful | Antonyms: hot/cold, big/small'),
      d('🔄', 'Synonyms ↔ Antonyms'), kt('Synonym', 'A word with nearly the same meaning as another.'),
      kt('Antonym', 'A word with the opposite meaning.'),
      q('Which is a synonym for "happy"?', ['sad', 'angry', 'joyful', 'tired'], 2), s('Using different words with similar meanings makes writing more interesting.'),
      ff('The word "thesaurus" comes from Greek meaning "treasure store of words"!'), tip('Use a thesaurus to find better word choices when writing.')
    ]},
    { title: 'Word Parts: Prefixes', content: [
      h('Beginnings That Change Meaning'), p('Prefixes are word parts added to the beginning that change the meaning.'),
      ex('un-happy = not happy, re-read = read again, pre-school = before school'),
      d('🔧', 'Prefix + Word = New Meaning'), kt('Prefix', 'A word part added to the start of a word.'),
      q('What does "unhappy" mean?', ['very happy', 'not happy', 'a little happy', 'super happy'], 1),
      s('Common prefixes: un-, re-, pre-, dis-, mis-, in-, over-, under-.'),
      ff('Knowing prefixes can help you understand 1000s of words!'), tip('Break words into parts: prefix + root = meaning.')
    ]},
    { title: 'Word Parts: Suffixes', content: [
      h('Endings That Add Meaning'), p('Suffixes are word parts added to the end that change meaning or grammar.'),
      ex('play → player (one who plays), happy → happily (in a happy way)'),
      d('🔧', 'Word + Suffix = New Word'), kt('Suffix', 'A word part added to the end of a word.'),
      q('What does "slowly" mean?', ['full of speed', 'in a slow way', 'very fast', 'speed up'], 1),
      s('Common suffixes: -ing, -ed, -er, -est, -ly, -ness, -ful, -less.'),
      ff('The suffix "-tion" appears in over 1000 English words!'), tip('Add suffixes to change words from noun to verb to adjective.')
    ]},
    { title: 'Homonyms and Homophones', content: [
      h('Words That Sound or Look the Same'), p('Homophones sound the same but have different meanings. Homonyms look the same but mean different things.'),
      ex('Homophones: to/two/too, there/their, right/write. Homonyms: bank (river) vs bank (money)'),
      d('🔊', 'Same sound ≠ Same meaning'), kt('Homophone', 'Words pronounced the same but spelled differently.'),
      kt('Homonym', 'Words spelled the same but with different meanings.'),
      q('Which is a homophone pair?', ['cat/dog', 'run/running', 'see/sea', 'happy/sad'], 2),
      s('Be careful with homophones when writing!'), ff('English has over 1000 homophone pairs!'),
      tip('Context tells you which meaning is correct.')
    ]},
    { title: 'Word Categories', content: [
      h('Organizing Words by Type'), p('Grouping words by category helps us learn and remember them better.'),
      ex('Animals: cat, dog, bird | Colors: red, blue, green | Feelings: happy, sad, excited'),
      d('📂', 'Same category → Related meaning'), kt('Category', 'A group of things with something in common.'),
      q('Which word doesn\'t belong in the animal category?', ['elephant', 'butterfly', 'chair', 'fish'], 2),
      s('Categories help organize our thinking and improve memory.'), ff('The human brain learns by making connections between categories!'),
      tip('Make word lists by category when learning new vocabulary.')
    ]},
    { title: 'Academic Vocabulary', content: [
      h('School Subject Words'), p('Each subject (Math, Science, English) has special vocabulary words to learn.'),
      ex('Math: calculate, equation, factor | Science: hypothesis, observe, classify'),
      d('🎓', 'Subject-specific words'), kt('Academic Vocabulary', 'Formal words used in school subjects and learning.'),
      q('Which is a math vocabulary word?', ['photosynthesis', 'fraction', 'metamorphosis', 'stanza'], 1),
      s('Learning subject vocabulary makes understanding textbooks easier.'), ff('Some words are used in multiple subjects with slightly different meanings!'),
      tip('Keep a vocabulary journal for each subject.')
    ]},
    { title: 'Personal and Descriptive Words', content: [
      h('Describing People and Things'), p('Adjectives describe nouns. Adverbs describe verbs. Both make our writing better!'),
      ex('The quick brown fox jumped over the fence. (quick, brown, over = descriptive words)'),
      d('✨', 'Adjectives + Adverbs = Better description'), kt('Adjective', 'A word that describes a noun.'),
      kt('Adverb', 'A word that describes a verb.'),
      q('Which is an adjective?', ['running', 'quickly', 'beautiful', 'jumped'], 2),
      s('Use specific descriptive words instead of just "good" or "bad".'), ff('The word "beautiful" is used in over 20 different languages!'),
      tip('Use a thesaurus to find more interesting descriptive words.')
    ]},
    { title: 'Idioms and Phrases', content: [
      h('Words with Special Meanings'), p('Sometimes words together mean something different than each word alone.'),
      ex('"Raining cats and dogs" doesn\'t mean animals fall from sky - it means raining heavily!'),
      d('💭', 'Idioms = Special meanings'), kt('Idiom', 'A phrase where the meaning is different from the individual words.'),
      q('What does "break the ice" mean?', ['freeze water', 'start a conversation', 'hit ice', 'cold time'], 1),
      s('Common idioms: break a leg, piece of cake, hit the books, under the weather.'),
      ff('Every language has idioms! Learning them helps you speak naturally!'), tip('Listen to native speakers to learn common idioms.')
    ]}
  ]),

  makeChapter('eng-3', 'Sentence Structure', '✍️', [
    { title: 'Parts of a Sentence', content: [
      h('What Makes a Complete Sentence'), p('A sentence needs a subject (who/what) and a predicate (action/description).'),
      ex('"The cat sleeps." Subject: cat | Predicate: sleeps'), d('📝', 'Subject + Predicate = Sentence'),
      kt('Subject', 'Who or what the sentence is about.'), kt('Predicate', 'What the subject is doing or is.'),
      q('What is the subject in "Maria reads books"?', ['reads', 'books', 'Maria', 'reads books'], 2),
      s('Every sentence needs a complete subject and complete predicate.'), ff('The oldest known sentence might be from 2400 BC on clay tablets!'),
      tip('Ask "Who?" or "What?" to find the subject.')
    ]},
    { title: 'Simple and Compound Sentences', content: [
      h('Joining Ideas'), p('Simple sentences have one idea. Compound sentences join two ideas with words like "and", "but", "or".'),
      ex('Simple: "She runs." Compound: "She runs and he plays."'),
      d('➕', 'Idea + Idea = Compound'), kt('Simple Sentence', 'One subject-predicate pair.'), kt('Compound Sentence', 'Two ideas joined together.'),
      q('Which is a compound sentence?', ['The dog barked', 'She ran and jumped', 'I eat', 'They play'], 1),
      s('Joining words: and, but, or, yet, so, nor.'), ff('A book can have thousands of compound sentences!'),
      tip('Use compound sentences to make writing more interesting.')
    ]},
    { title: 'Complex Sentences', content: [
      h('Ideas with Relationships'), p('Complex sentences have a main idea and smaller ideas connected to it.'),
      ex('"Although it was raining, we went to the park." (Main: we went | Connected: it was raining)'),
      d('🔗', 'Main idea + Supporting idea'), kt('Complex Sentence', 'A main clause with one or more dependent clauses.'),
      kt('Dependent Clause', 'A word group that needs a main clause to be complete.'),
      q('In "Because she studied, she passed the test", what is the dependent clause?', ['she passed the test', 'Because she studied', 'the test', 'she studied'], 1),
      s('Connecting words: because, although, since, if, when, while.'), ff('Complex sentences show sophisticated thinking!'),
      tip('Dependent clauses often start with connecting words.')
    ]},
    { title: 'Parts of Speech Review', content: [
      h('Eight Parts of Speech'), p('Every word in English is one of eight parts of speech. Each has a job!'),
      ex('Noun: person, place, thing | Verb: action | Adjective: description'),
      d('🔤', 'Word types'), kt('Noun', 'A person, place, or thing.'), kt('Verb', 'An action word.'),
      q('Which word is a verb?', ['happy', 'run', 'beautiful', 'table'], 1),
      s('Parts: Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjunction, Interjection.'),
      ff('Every word has a specific job to help sentences make sense!'), tip('Practice identifying parts of speech in your reading.')
    ]},
    { title: 'Subject-Verb Agreement', content: [
      h('Matching Subjects and Verbs'), p('The subject and verb must agree in number (singular or plural).'),
      ex('Singular: "The cat runs." Plural: "The cats run."'),
      d('✔️', 'Subject match Verb'), kt('Agreement', 'Subject and verb must both be singular or both be plural.'),
      q('Which sentence is correct?', ['The dogs runs', 'The dog run', 'The dog runs', 'Dogs runs'], 2),
      s('Add "s" to verb when subject is singular (he/she/it). Remove for plural.'),
      ff('Subject-verb agreement is one of the most common grammar mistakes!'), tip('Ask "Does it sound right?" to check agreement.')
    ]},
    { title: 'Sentence Variety', content: [
      h('Different Sentence Types'), p('Sentences can tell facts (declarative), ask questions (interrogative), give commands (imperative), or show emotion (exclamatory).'),
      ex('Declarative: "I like reading." | Interrogative: "Do you like reading?" | Imperative: "Read this book!" | Exclamatory: "What a great book!"'),
      d('❓❕', 'Four sentence types'), kt('Declarative', 'A sentence stating a fact.'), kt('Interrogative', 'A sentence asking a question.'),
      q('Which is an interrogative sentence?', ['I like reading', 'Read this book', 'What do you like?', 'Reading is fun'], 2),
      s('Varying sentence types makes writing more interesting.'), ff('Good writers use all four sentence types!'), tip('Mix sentence types in your writing.')
    ]},
    { title: 'Parallel Structure', content: [
      h('Balancing Ideas'), p('When listing ideas, they should have the same grammatical form.'),
      ex('Correct: "I like running, swimming, and playing." Incorrect: "I like running, swim, and play."'),
      d('⚖️', 'Match structure'), kt('Parallel Structure', 'Using the same grammatical form for similar ideas.'),
      q('Which sentence has parallel structure?', ['I like to run and swimming', 'I like running and swimming', 'I like to run and to swim and swim', 'I like running and to swim'], 1),
      s('Parallel structure makes sentences sound better and are easier to read.'),
      ff('Professional writers use parallel structure to make their writing flow smoothly!'), tip('List items using the same form.')
    ]},
    { title: 'Modifiers and Placement', content: [
      h('Describing with Modifiers'), p('Modifiers describe other words. Place them close to the word they describe!'),
      ex('Misplaced: "Running quickly, the tree stood in the park." (tree wasn\'t running!) Correct: "Running quickly, she reached the tree in the park."'),
      d('🎯', 'Modifier → Right word'), kt('Modifier', 'A word or phrase that describes another word.'),
      kt('Misplaced Modifier', 'A modifier in the wrong location causing confusion.'),
      q('Which has correct modifier placement?', ['Sleeping soundly, the alarm scared me.', 'The alarm scared me sleeping soundly.', 'Soundly sleeping, I scared the alarm.', 'The sleeping alarm scared me.'], 0),
      s('Modifiers should be right next to the word they describe.'), ff('Misplaced modifiers often create funny sentences!'),
      tip('Place modifiers as close as possible to the word they describe.')
    ]},
    { title: 'Sentence Fragments and Run-ons', content: [
      h('Complete vs Incomplete Sentences'), p('Fragments are incomplete. Run-ons join too many ideas without proper punctuation.'),
      ex('Fragment: "Running to the store." (incomplete thought) Run-on: "I went to the store and I bought milk and I came home." (too long)'),
      d('❌', 'Fragments & Run-ons'), kt('Fragment', 'An incomplete sentence missing a subject or predicate.'),
      kt('Run-on Sentence', 'Two or more ideas joined incorrectly without punctuation.'),
      q('Which is a fragment?', ['I ran fast.', 'Running down the street.', 'She ran.', 'The dog runs.'], 1),
      s('Fix fragments by adding missing parts. Fix run-ons by separating or punctuating correctly.'),
      ff('Run-on sentences are very common in speaking but should be avoided in writing!'),
      tip('Read your sentences aloud. Do they sound complete?')
    ]},
    { title: 'Noun and Verb Phrases', content: [
      h('Words That Work Together'), p('Phrases are groups of related words. Noun phrases describe nouns. Verb phrases include the main verb and helpers.'),
      ex('Noun phrase: "the big red ball" | Verb phrase: "will have been playing"'),
      d('🔗', 'Groups of words'), kt('Noun Phrase', 'A noun with words that describe it.'), kt('Verb Phrase', 'A verb with helper verbs.'),
      q('Which is a noun phrase?', ['running', 'the tall building', 'will go', 'quickly'], 1),
      s('Prepositional phrases: "on the table", "under the bridge", "in the classroom".'),
      ff('A single noun phrase can have 5+ words describing just one thing!'), tip('Phrases make our sentences more detailed and interesting.')
    ]}
  ]),
];

// Create subjects for all education levels with rich content
const createEnglishSubject = (): TextbookSubject => ({
  id: 'english',
  name: 'English Language Arts (MAPEH)',
  emoji: '📚',
  color: 'from-blue-500 to-indigo-600',
  chapters: englishChapters,
});

// Math subject
const mathChapters = [
  makeChapter('math-1', 'Bilang at Pagbibilang', '1️⃣', [
    { title: 'Understanding Numbers', content: [
      h('Numbers Around Us'), p('Numbers help us count, measure, and organize everything.'),
      ex('We use numbers for: age (10), house address (25), phone numbers.'),
      d('🔢', 'Numbers are everywhere'), kt('Number', 'A value that represents quantity.'),
      kt('Digit', 'The symbols 0-9 that make up numbers.'),
      q('How many digits make up the number 345?', ['1', '2', '3', '4'], 2),
      s('We use 10 digits (0-9) to write all numbers.'), ff('The oldest number system used was base-60!'),
      tip('Practice writing numbers in words and figures.')
    ]},
    { title: 'Counting Systems', content: [
      h('How We Count'), p('Different cultures have different ways of counting.'),
      ex('English: 1, 2, 3... | Filipino: isa, dalawa, tatlo... | Binary (computers): 0, 1, 10, 11...'),
      d('🌍', 'Different counting systems'), kt('Decimal System', 'Number system using base-10 (0-9).'),
      kt('Base-10', 'Our most common number system.'),
      q('In base-10, how many digits are there?', ['5', '8', '10', '12'], 2),
      s('Base-10 system: ones, tens, hundreds, thousands.'), ff('Ancient Egyptians used tally marks to count!'),
      tip('Learn to count in Filipino alongside English.')
    ]},
    { title: 'Place Value', content: [
      h('The Value of Position'), p('In the number 357, the "5" is not just 5 - its position makes it worth 50.'),
      ex('357 = 3 hundreds + 5 tens + 7 ones = 300 + 50 + 7'),
      d('🏠', 'Position matters!'), kt('Place Value', 'The value given to a digit by its position.'),
      kt('Hundreds', '100s place'), q('What is the place value of 4 in 342?', ['4', '40', '400', '4000'], 1),
      s('Each position is 10 times the one to its right.'), ff('Understanding place value is key to all math!'),
      tip('Use blocks or drawings to show place value.')
    ]},
    { title: 'Comparing Numbers', content: [
      h('Which is Bigger?'), p('We use symbols to compare numbers: > (greater than), < (less than), = (equal).'),
      ex('5 > 3 means 5 is greater than 3. 2 < 8 means 2 is less than 8.'),
      d('⚖️', 'Comparing quantities'), kt('Greater Than', '> symbol'), kt('Less Than', '< symbol'),
      q('Which is true?', ['3 > 5', '5 < 3', '5 > 3', '5 = 6'], 2),
      s('Tip: The open side of > and < points to the bigger number.'), ff('The = sign was invented in 1557!'),
      tip('Remember: the hungry alligator eats the bigger number!')
    ]},
  ]),
];

// Science subject  
const scienceChapters = [
  makeChapter('sci-1', 'Buhay at Kalikasan', '🌿', [
    { title: 'Living and Nonliving Things', content: [
      h('What is Alive?'), p('Living things eat, grow, move, and change. Nonliving things do not.'),
      ex('Living: plants, animals, people | Nonliving: rocks, water, air, metal'),
      d('🌍', 'Living vs Nonliving'), kt('Living Thing', 'Something that grows, eats, moves, and reproduces.'),
      kt('Nonliving Thing', 'Something that does not have life.'),
      q('Which is a living thing?', ['rock', 'tree', 'water', 'sand'], 1),
      s('Living things need food, water, and air.'), ff('Some organisms are so small we can\'t see them!'),
      tip('Observe things around you and classify them.')
    ]},
  ]),
];

// Helper to create all subjects for all levels
const createAllSubjects = (): TextbookSubject[] => [
  createEnglishSubject(),
  {
    id: 'mathematics',
    name: 'Pangkalahatang Matematika',
    emoji: '🔢',
    color: 'from-green-500 to-teal-600',
    chapters: mathChapters,
  },
  {
    id: 'science',
    name: 'Agham at Teknolohiya',
    emoji: '🔬',
    color: 'from-emerald-500 to-teal-700',
    chapters: scienceChapters,
  },
  {
    id: 'social-studies',
    name: 'Araling Panlipunan',
    emoji: '🌍',
    color: 'from-orange-500 to-red-600',
    chapters: [
      makeChapter('soc-1', 'Komunidad at Tao', '👥', [
        { title: 'Understanding Community', content: [
          h('What is a Community?'), p('A community is a group of people living in one place who share things.'),
          ex('Your barangay is a community. Your school is a community.'),
          d('👨‍👩‍👧‍👦', 'Communities'), kt('Community', 'A group of people in one location.'),
          q('Which is an example of a community?', ['your family', 'a barangay', 'a school', 'all of these'], 3),
          s('Communities have shared rules, helpers, and activities.'), ff('The Philippines has over 42,000 barangays!'),
          tip('Learn about your local barangay.')
        ]},
      ]),
    ],
  },
  {
    id: 'arts',
    name: 'Sining at Musika',
    emoji: '🎨',
    color: 'from-pink-500 to-rose-600',
    chapters: [
      makeChapter('art-1', 'Kulay at Disenyo', '🎨', [
        { title: 'Understanding Colors', content: [
          h('The Rainbow'), p('Colors help us express feelings and describe the world.'),
          ex('Red = energetic, Blue = calm, Green = nature'),
          d('🌈', 'Primary Colors: Red, Yellow, Blue'), kt('Color', 'Light we see as different hues.'),
          q('Which is a primary color?', ['orange', 'green', 'red', 'purple'], 2),
          s('Primary colors mix to make all other colors.'), ff('Humans can see about 10 million colors!'),
          tip('Use colors to express your feelings in art.')
        ]},
      ]),
    ],
  },
  {
    id: 'physical-education',
    name: 'Pisikal na Edukasyon',
    emoji: '⚽',
    color: 'from-cyan-500 to-blue-600',
    chapters: [
      makeChapter('pe-1', 'Kalusugan at Fitness', '💪', [
        { title: 'Staying Healthy', content: [
          h('Health is Wealth'), p('Our body needs exercise, good food, and rest to be healthy.'),
          ex('Exercise: running, playing, dancing | Food: vegetables, fruits, protein'),
          d('❤️', 'Healthy habits'), kt('Health', 'The state of being physically and mentally well.'),
          kt('Exercise', 'Physical activity that makes our body strong.'),
          q('Which is healthy?', ['staying active', 'eating vegetables', 'sleeping enough', 'all of these'], 3),
          s('Healthy people: exercise, eat right, sleep well, smile.'), ff('Exercise helps your brain work better in school!'),
          tip('Play and move your body every day.')
        ]},
      ]),
    ],
  },
  {
    id: 'technology',
    name: 'Teknolohiya at Inobasyon',
    emoji: '💻',
    color: 'from-purple-500 to-indigo-600',
    chapters: [
      makeChapter('tech-1', 'Mga Gadget at Device', '📱', [
        { title: 'Everyday Technology', content: [
          h('Technology Helps Us'), p('Gadgets and devices help us learn, communicate, and create.'),
          ex('Phone, computer, TV, watch - all are technology.'),
          d('🤖', 'Technology around us'), kt('Technology', 'Tools and machines that solve problems.'),
          kt('Device', 'A machine or tool.'),
          q('Which is a technology?', ['computer', 'phone', 'TV', 'all of these'], 3),
          s('Technology makes life easier and helps us learn.'), ff('The first computer was as big as a room!'),
          tip('Use technology wisely and safely.')
        ]},
      ]),
    ],
  },
  {
    id: 'critical-thinking',
    name: 'Pagkamalikhain at Malikhaing Isip',
    emoji: '🧠',
    color: 'from-yellow-500 to-orange-600',
    chapters: [
      makeChapter('ct-1', 'Pag-iisip at Paglutas', '💡', [
        { title: 'Problem Solving', content: [
          h('Solving Problems'), p('When we face a problem, we think of ways to solve it.'),
          ex('Problem: "I can\'t reach the book." Solution: "I can get a stool."'),
          d('🧩', 'Think → Solve'), kt('Problem', 'Something we need to fix or figure out.'),
          kt('Solution', 'A way to fix or solve a problem.'),
          q('How do you solve a problem?', ['give up', 'think of solutions', 'ignore it', 'ask friend'], 1),
          s('Steps: Understand → Think → Try → Check.'), ff('Great minds solve problems creatively!'),
          tip('Don\'t be afraid to try different solutions.')
        ]},
      ]),
    ],
  },
];

export const TEXTBOOK_LEVELS: TextbookLevel[] = [
  {
    id: 'preschool',
    name: 'Preschool (Nursery & Kinder)',
    emoji: '🌈',
    color: 'from-pink-400 to-purple-500',
    subjects: createAllSubjects(),
  },
  {
    id: 'elementary',
    name: 'Elementary School (Grade 1-6)',
    emoji: '📘',
    color: 'from-blue-400 to-cyan-500',
    subjects: createAllSubjects(),
  },
  {
    id: 'junior-high',
    name: 'Junior High School (Grade 7-8)',
    emoji: '🎓',
    color: 'from-indigo-500 to-purple-600',
    subjects: createAllSubjects(),
  },
  {
    id: 'senior-high',
    name: 'Senior High School (Grade 11-12)',
    emoji: '🏫',
    color: 'from-green-500 to-teal-700',
    subjects: createAllSubjects(),
  },
  {
    id: 'senior-specialized',
    name: 'Senior High Specialized (TVL, STEM, ABM, HUMSS)',
    emoji: '🔬',
    color: 'from-purple-700 to-indigo-900',
    subjects: createAllSubjects(),
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
