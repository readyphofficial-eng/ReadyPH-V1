// ---------------------------------------------------------------------------
// Interactive Textbook data: levels → subjects → chapters → pages → blocks
// Covers Preschool, Elementary, Junior High, Senior High, Senior High Specialized
// Each page has interactive content blocks (text, key terms, diagrams, quizzes)
// ---------------------------------------------------------------------------

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

// ===================== PRESCHOOL ============================================

const preschoolSubjects: TextbookSubject[] = [
  {
    id: 'ps-letters', name: 'Letters', emoji: '🔤', color: 'from-red-400 to-orange-400',
    chapters: [
      {
        id: 'ps-let-1', title: 'The Alphabet', emoji: '🅰️',
        pages: [
          {
            title: 'Meet the Letters',
            blocks: [
              h('What is the Alphabet?'),
              p('The alphabet is a set of letters that we use to write words. The English alphabet has 26 letters from A to Z.'),
              d('🅰️🅱️🅲️🅳️🅴️', 'These are the first 5 letters of the alphabet'),
              kt('Vowels', 'The letters A, E, I, O, U are special letters called vowels.'),
              kt('Consonants', 'All the other letters that are not vowels are called consonants.'),
              q('How many letters are in the English alphabet?', ['25', '26', '28', '30'], 1),
            ],
          },
          {
            title: 'Vowels and Consonants',
            blocks: [
              h('The Five Vowels'),
              p('There are 5 vowels: A, E, I, O, U. Every word has at least one vowel in it!'),
              d('🅰️🅴️🅸️🅾️🆄', 'A, E, I, O, U — the five vowels'),
              ex('The word "CAT" has the vowel A. The word "DOG" has the vowel O.'),
              q('Which of these is a vowel?', ['B', 'E', 'K', 'T'], 1),
              q('How many vowels are there?', ['3', '4', '5', '6'], 2),
            ],
          },
          {
            title: 'Letter Sounds',
            blocks: [
              h('Letters Make Sounds'),
              p('Every letter makes a sound. When we put letters together, they make words!'),
              ex('A says "ah", B says "buh", C says "cuh"'),
              kt('Phonics', 'Phonics is learning the sounds that letters make.'),
              q('What sound does the letter B make?', ['"ah"', '"buh"', '"cuh"', '"duh"'], 1),
              s('Remember: 26 letters, 5 vowels (A,E,I,O,U), and every letter makes a sound!'),
            ],
          },
        ],
      },
      {
        id: 'ps-let-2', title: 'Writing Letters', emoji: '✏️',
        pages: [
          {
            title: 'Uppercase and Lowercase',
            blocks: [
              h('Big and Small Letters'),
              p('Every letter has two forms: UPPERCASE (big) and lowercase (small).'),
              d('🅰️🅰️', 'A (uppercase) and a (lowercase) are the same letter'),
              ex('APPLE starts with uppercase A. apple starts with lowercase a.'),
              q('What is the lowercase of "B"?', ['b', 'd', 'p', 'q'], 0),
            ],
          },
          {
            title: 'Writing Your Name',
            blocks: [
              h('Names Start with Capital Letters'),
              p('Your name is special! It always starts with an uppercase (capital) letter.'),
              ex('Maria, Juan, Ana — all names start with capital letters!'),
              kt('Capital Letter', 'A big letter used at the start of names and sentences.'),
              q('Which is written correctly?', ['maria', 'Maria', 'MARIA', 'mARIA'], 1),
              s('Always use a capital letter for the first letter of your name!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-numbers', name: 'Numbers', emoji: '🔢', color: 'from-green-400 to-emerald-400',
    chapters: [
      {
        id: 'ps-num-1', title: 'Counting 1-10', emoji: '1️⃣',
        pages: [
          {
            title: 'Numbers 1 to 5',
            blocks: [
              h('Let\'s Count!'),
              p('Numbers help us count things. Let\'s learn numbers 1 to 5!'),
              d('1️⃣2️⃣3️⃣4️⃣5️⃣', 'One, Two, Three, Four, Five'),
              ex('1 apple, 2 bananas, 3 oranges — we use numbers to count!'),
              kt('Counting', 'Counting means saying numbers in order: 1, 2, 3, 4, 5...'),
              q('What comes after 3?', ['2', '4', '5', '1'], 1),
              q('How many fingers on one hand?', ['3', '4', '5', '6'], 2),
            ],
          },
          {
            title: 'Numbers 6 to 10',
            blocks: [
              h('More Numbers!'),
              p('Now let\'s learn 6 to 10!'),
              d('6️⃣7️⃣8️⃣9️⃣🔟', 'Six, Seven, Eight, Nine, Ten'),
              ex('If you have 6 candies and get 1 more, you have 7!'),
              q('What comes after 7?', ['6', '8', '9', '10'], 1),
              q('What comes before 10?', ['8', '9', '7', '11'], 1),
            ],
          },
          {
            title: 'Counting Objects',
            blocks: [
              h('Count What You See'),
              p('We can count anything — toys, fruits, fingers, or stars!'),
              ex('🍎🍎🍎 = 3 apples. 🐱🐱🐱🐱 = 4 cats.'),
              q('How many stars? ⭐⭐⭐⭐⭐', ['3', '4', '5', '6'], 2),
              s('Counting is fun! Practice counting things around you every day!'),
            ],
          },
        ],
      },
      {
        id: 'ps-num-2', title: 'More and Less', emoji: '⚖️',
        pages: [
          {
            title: 'Comparing Numbers',
            blocks: [
              h('Which Has More?'),
              p('When we compare, we look at which group has more and which has less.'),
              d('🍎🍎🍎🍎 (4) vs 🍎🍎 (2)', '4 is MORE than 2'),
              kt('More', 'A bigger number means there are more things.'),
              kt('Less', 'A smaller number means there are fewer things.'),
              q('Which is more: 3 or 7?', ['3', '7', 'They are the same', 'I don\'t know'], 1),
              q('Which is less: 2 or 5?', ['2', '5', 'They are the same', 'I don\'t know'], 0),
              s('Remember: bigger numbers mean MORE, smaller numbers mean LESS!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-colors', name: 'Colors', emoji: '🌈', color: 'from-pink-400 to-rose-400',
    chapters: [
      {
        id: 'ps-col-1', title: 'Rainbow Colors', emoji: '🌈',
        pages: [
          {
            title: 'The Colors of the Rainbow',
            blocks: [
              h('What is a Rainbow?'),
              p('A rainbow has 7 beautiful colors! Let\'s learn them all.'),
              d('🌈', 'Red, Orange, Yellow, Green, Blue, Indigo, Violet'),
              kt('Rainbow', 'A colorful arc that appears in the sky after rain.'),
              ex('The sky is blue, the grass is green, the sun is yellow!'),
              q('How many colors are in a rainbow?', ['5', '6', '7', '8'], 2),
              q('What color is the sky on a sunny day?', ['Red', 'Green', 'Blue', 'Pink'], 2),
            ],
          },
          {
            title: 'Colors Around Us',
            blocks: [
              h('Colors Everywhere!'),
              p('Colors make our world beautiful. Everything has a color!'),
              ex('A banana is yellow, a leaf is green, an apple is red.'),
              d('🔴🟡🟢', 'Red, Yellow, Green — colors we see every day'),
              q('What color is a ripe banana?', ['Red', 'Blue', 'Yellow', 'Green'], 2),
              q('What color is grass?', ['Green', 'Purple', 'Black', 'Orange'], 0),
              s('Colors are everywhere! Look around and name the colors you see!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-shapes', name: 'Shapes', emoji: '🔷', color: 'from-blue-400 to-cyan-400',
    chapters: [
      {
        id: 'ps-shp-1', title: 'Basic Shapes', emoji: '⭐',
        pages: [
          {
            title: 'Circles and Squares',
            blocks: [
              h('Shapes All Around'),
              p('Shapes are everywhere! A ball is a circle, a box is a square.'),
              d('🔵⬜', 'Circle and Square'),
              kt('Circle', 'A round shape with no corners, like a ball.'),
              kt('Square', 'A shape with 4 equal sides and 4 corners, like a box.'),
              q('What shape is a ball?', ['Square', 'Circle', 'Triangle', 'Star'], 1),
              q('How many sides does a square have?', ['3', '4', '5', '6'], 1),
            ],
          },
          {
            title: 'Triangles and Stars',
            blocks: [
              h('More Shapes!'),
              p('A triangle has 3 sides and a star has 5 points!'),
              d('🔺⭐', 'Triangle and Star'),
              kt('Triangle', 'A shape with 3 sides and 3 corners.'),
              ex('A slice of pizza looks like a triangle!'),
              q('How many sides does a triangle have?', ['2', '3', '4', '5'], 1),
              q('What shape has 5 points?', ['Circle', 'Square', 'Star', 'Triangle'], 2),
              s('Shapes are fun! Look for shapes in things around you!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-animals', name: 'Animals', emoji: '🐾', color: 'from-amber-400 to-yellow-400',
    chapters: [
      {
        id: 'ps-ani-1', title: 'Farm Animals', emoji: '🐮',
        pages: [
          {
            title: 'Animals on the Farm',
            blocks: [
              h('Welcome to the Farm!'),
              p('Farms have many animals. Each animal makes a special sound!'),
              d('🐮🐷🐔🐴', 'Cow, Pig, Chicken, Horse'),
              ex('A cow says "Moo!", a pig says "Oink!", a chicken says "Cluck!"'),
              kt('Farm', 'A place where animals live and food is grown.'),
              q('What sound does a cow make?', ['Meow', 'Moo', 'Bark', 'Quack'], 1),
              q('What sound does a pig make?', ['Moo', 'Oink', 'Neigh', 'Baa'], 1),
            ],
          },
          {
            title: 'Animal Babies',
            blocks: [
              h('Baby Animals'),
              p('Just like humans, animals have babies too! Baby animals have special names.'),
              d('🐶🐱🐰', 'Puppy, Kitten, Bunny'),
              ex('A baby dog is a puppy. A baby cat is a kitten.'),
              q('What is a baby dog called?', ['Kitten', 'Puppy', 'Cub', 'Calf'], 1),
              q('What is a baby cat called?', ['Puppy', 'Kitten', 'Foal', 'Chick'], 1),
              s('Animals are our friends! Take care of them and be kind!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-body', name: 'Body', emoji: '👤', color: 'from-teal-400 to-cyan-400',
    chapters: [
      {
        id: 'ps-bod-1', title: 'My Body', emoji: '🧍',
        pages: [
          {
            title: 'Parts of My Body',
            blocks: [
              h('My Amazing Body'),
              p('Our body has many parts, and each part does something special!'),
              d('👀👃👄👂', 'Eyes, Nose, Mouth, Ears'),
              kt('Eyes', 'We use our eyes to see the world around us.'),
              kt('Ears', 'We use our ears to hear sounds.'),
              ex('I use my eyes to see, my ears to hear, my nose to smell, and my mouth to eat!'),
              q('What do we use to see?', ['Ears', 'Eyes', 'Nose', 'Hands'], 1),
              q('What do we use to hear?', ['Eyes', 'Ears', 'Mouth', 'Feet'], 1),
            ],
          },
          {
            title: 'Hands and Feet',
            blocks: [
              h('My Hands and Feet'),
              p('Our hands help us hold and touch things. Our feet help us walk and run!'),
              d('✋🦶', 'Hands have 5 fingers, feet have 5 toes'),
              ex('I have 5 fingers on each hand and 5 toes on each foot!'),
              q('How many fingers on one hand?', ['3', '4', '5', '10'], 2),
              s('Your body is amazing! Take care of it by eating healthy and exercising!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-weather', name: 'Weather', emoji: '☀️', color: 'from-sky-400 to-blue-400',
    chapters: [
      {
        id: 'ps-wea-1', title: 'Weather Words', emoji: '🌤️',
        pages: [
          {
            title: 'Kinds of Weather',
            blocks: [
              h('What is Weather?'),
              p('Weather is what the sky and air are like outside. It can be sunny, rainy, cloudy, or windy!'),
              d('☀️🌧️☁️🌬️', 'Sunny, Rainy, Cloudy, Windy'),
              kt('Sunny', 'When the sun is shining bright and the sky is clear.'),
              kt('Rainy', 'When water falls from the clouds.'),
              ex('On a sunny day, we can play outside. On a rainy day, we use an umbrella!'),
              q('What do we use when it rains?', ['Sunglasses', 'Umbrella', 'Fan', 'Sunscreen'], 1),
              q('What is it called when the sun is shining?', ['Rainy', 'Sunny', 'Cloudy', 'Windy'], 1),
              s('Weather changes every day! Look outside and see what the weather is like!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-days', name: 'Days', emoji: '📅', color: 'from-violet-400 to-purple-400',
    chapters: [
      {
        id: 'ps-day-1', title: 'Days of the Week', emoji: '📆',
        pages: [
          {
            title: 'The 7 Days',
            blocks: [
              h('Days of the Week'),
              p('There are 7 days in a week. Let\'s learn them all!'),
              d('📅', 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'),
              ex('Monday is the first day of the school week. Sunday is a rest day!'),
              kt('Week', 'A week has 7 days, from Monday to Sunday.'),
              q('How many days are in a week?', ['5', '6', '7', '8'], 2),
              q('What day comes after Monday?', ['Sunday', 'Tuesday', 'Friday', 'Wednesday'], 1),
            ],
          },
          {
            title: 'Weekdays and Weekends',
            blocks: [
              h('School Days and Rest Days'),
              p('Monday to Friday are weekdays — we go to school! Saturday and Sunday are weekends — we rest and play!'),
              d('🏫', 'Monday-Friday: School! Saturday-Sunday: Play!'),
              q('Which day is a weekend?', ['Monday', 'Wednesday', 'Saturday', 'Thursday'], 2),
              s('A week has 7 days. Monday to Friday are for school, Saturday and Sunday are for family and fun!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-fruits', name: 'Fruits', emoji: '🍎', color: 'from-red-400 to-pink-400',
    chapters: [
      {
        id: 'ps-fru-1', title: 'Yummy Fruits', emoji: '🍌',
        pages: [
          {
            title: 'Fruits We Eat',
            blocks: [
              h('Fruits are Healthy!'),
              p('Fruits are sweet and healthy. They give us vitamins to make us strong!'),
              d('🍎🍌🍇🍊🍓', 'Apple, Banana, Grapes, Orange, Strawberry'),
              ex('A banana is yellow and long. An apple is round and red or green.'),
              kt('Vitamins', 'Good things inside fruits that keep our body healthy.'),
              q('What color is a ripe banana?', ['Red', 'Yellow', 'Blue', 'Green'], 1),
              q('Which fruit is round and usually red?', ['Banana', 'Apple', 'Grapes', 'Corn'], 1),
              s('Eat fruits every day to stay healthy and strong!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-transport', name: 'Transport', emoji: '🚗', color: 'from-orange-400 to-red-400',
    chapters: [
      {
        id: 'ps-tra-1', title: 'Vehicles', emoji: '🚙',
        pages: [
          {
            title: 'Vehicles We Ride',
            blocks: [
              h('How We Travel'),
              p('Vehicles help us go places! Some go on roads, some fly in the sky, and some sail on water.'),
              d('🚗✈️⛵', 'Car (road), Airplane (sky), Boat (water)'),
              ex('A car drives on roads. An airplane flies in the sky. A boat sails on water.'),
              kt('Vehicle', 'A machine that carries people or things from one place to another.'),
              q('What flies in the sky?', ['Car', 'Airplane', 'Boat', 'Train'], 1),
              q('What sails on water?', ['Bus', 'Airplane', 'Boat', 'Bicycle'], 2),
              s('Vehicles help us travel! Cars on roads, planes in the sky, boats on water!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-nature', name: 'Nature', emoji: '🌳', color: 'from-green-400 to-teal-400',
    chapters: [
      {
        id: 'ps-nat-1', title: 'The World Around Us', emoji: '🌍',
        pages: [
          {
            title: 'Sun, Moon, and Stars',
            blocks: [
              h('Up in the Sky'),
              p('The sun gives us light during the day. The moon and stars come out at night!'),
              d('☀️🌙⭐', 'Sun (day), Moon and Stars (night)'),
              ex('The sun is bright and hot. The moon is soft and cool. Stars twinkle at night!'),
              kt('Sun', 'The big bright star that gives us light and heat during the day.'),
              kt('Moon', 'The round light we see in the sky at night.'),
              q('What gives us light during the day?', ['Moon', 'Sun', 'Stars', 'Clouds'], 1),
              q('What do we see in the sky at night?', ['Sun', 'Moon and Stars', 'Rainbow', 'Nothing'], 1),
            ],
          },
          {
            title: 'Trees and Flowers',
            blocks: [
              h('Plants Around Us'),
              p('Trees give us shade and clean air. Flowers are beautiful and smell nice!'),
              d('🌳🌸', 'Tree (big and tall) and Flower (small and pretty)'),
              ex('Trees give us fruits to eat and wood to build. Flowers make gardens beautiful!'),
              ff('Did you know? A tree can live for hundreds of years — some trees are older than your grandparents!'),
              q('What do trees give us?', ['Toys', 'Shade and clean air', 'Candy', 'Water'], 1),
              s('Nature is wonderful! The sun lights our day, the moon lights our night, and trees give us fresh air!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-manners', name: 'Good Manners', emoji: '🤝', color: 'from-rose-400 to-pink-400',
    chapters: [
      {
        id: 'ps-man-1', title: 'Being Polite', emoji: '😊',
        pages: [
          {
            title: 'Magic Words',
            blocks: [
              h('Words That Show Respect'),
              p('There are special words we use to show respect and kindness. These are called "magic words"!'),
              kt('Please', 'Say this when you ask for something nicely.'),
              kt('Thank You', 'Say this when someone helps you or gives you something.'),
              kt('Sorry', 'Say this when you make a mistake or hurt someone.'),
              ex('Can I borrow your pencil, please? Thank you!'),
              ff('Did you know? Saying "thank you" makes both you and the other person feel happy!'),
              tip('Practice saying please, thank you, and sorry every day!'),
              q('What do you say when someone gives you a gift?', ['Nothing', 'Thank you', 'Give it back', 'Walk away'], 1),
              q('What do you say when you make a mistake?', ['Nothing', 'Sorry', 'Bye', 'Yes'], 1),
              s('Magic words: Please (asking), Thank you (receiving), Sorry (mistakes). Use them every day!'),
            ],
          },
          {
            title: 'Sharing and Caring',
            blocks: [
              h('Sharing is Caring'),
              p('When we share with others, we show that we care. Sharing makes everyone happy!'),
              ex('You can share your toys, your snacks, or your time with friends.'),
              tip('When you see someone who has no one to play with, invite them to join you!'),
              ff('Did you know? When you share, your brain releases happy chemicals that make you feel good!'),
              q('What is a good thing to do with friends?', ['Take their toys', 'Share with them', 'Ignore them', 'Push them'], 1),
              s('Sharing and caring make you a good friend. Always be kind to others!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-health', name: 'Healthy Habits', emoji: '💪', color: 'from-teal-400 to-green-400',
    chapters: [
      {
        id: 'ps-hea-1', title: 'Taking Care of Myself', emoji: '🪥',
        pages: [
          {
            title: 'Washing Hands',
            blocks: [
              h('Why We Wash Hands'),
              p('Washing our hands keeps us healthy. Germs are tiny things we cannot see, and they can make us sick!'),
              d('🧼', 'Soap + Water = Clean Hands!'),
              kt('Germs', 'Tiny things that can make us sick. We cannot see them!'),
              ex('Wash your hands before eating, after playing, and after using the bathroom!'),
              tip('Wash for 20 seconds — sing the ABC song while you wash!'),
              ff('Did you know? A single sneeze can send germs flying up to 6 meters!'),
              q('When should you wash your hands?', ['Never', 'Before eating', 'Only at night', 'Once a week'], 1),
              q('What do you need to wash hands?', ['Nothing', 'Soap and water', 'Only water', 'Towel only'], 1),
              s('Wash hands with soap and water: before eating, after playing, after using the bathroom! Sing ABC for 20 seconds!'),
            ],
          },
          {
            title: 'Brushing Teeth',
            blocks: [
              h('Keep Your Teeth Clean'),
              p('Brushing your teeth keeps them strong and healthy. Brush twice a day — morning and night!'),
              d('🪥', 'Toothbrush + Toothpaste = Clean Teeth!'),
              kt('Cavity', 'A small hole in your tooth caused by not brushing!'),
              ex('Brush in the morning and before bed. Visit the dentist for check-ups!'),
              tip('Brush for 2 minutes — brush every tooth, front and back!'),
              q('How many times a day should you brush?', ['Never', 'Once', 'Twice', 'Ten'], 2),
              q('What causes holes in teeth?', ['Brushing', 'Not brushing', 'Water', 'Milk'], 1),
              s('Brush twice a day, morning and night. Visit the dentist. Clean teeth = happy smile!'),
            ],
          },
          {
            title: 'Healthy Food and Exercise',
            blocks: [
              h('Eat Healthy, Stay Active'),
              p('Eating healthy food and exercising makes our body strong and happy!'),
              d('🥗🏃', 'Healthy food + Exercise = Strong body!'),
              kt('Healthy Food', 'Food that gives us energy and vitamins — fruits, vegetables, rice, fish.'),
              kt('Exercise', 'Moving your body to stay strong — running, jumping, playing!'),
              ex('Eat fruits and vegetables every day. Play outside and run around!'),
              ff('Did you know? Your heart beats about 100,000 times every day! Exercise makes it stronger!'),
              tip('Drink 8 glasses of water every day to stay healthy!'),
              q('Which is healthy food?', ['Candy', 'Apple', 'Chips', 'Soda'], 1),
              q('What is good for your body?', ['Sitting all day', 'Exercise', 'Eating candy', 'Not sleeping'], 1),
              s('Eat healthy (fruits, vegetables), exercise every day, and drink water. Strong body = happy you!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-time', name: 'Time', emoji: '⏰', color: 'from-indigo-400 to-blue-400',
    chapters: [
      {
        id: 'ps-tim-1', title: 'Telling Time', emoji: '🕐',
        pages: [
          {
            title: 'Morning, Afternoon, and Night',
            blocks: [
              h('Parts of the Day'),
              p('The day has different parts! In the morning, the sun comes up. In the afternoon, the sun is high. At night, the moon and stars come out.'),
              d('🌅☀️🌙', 'Morning (wake up), Afternoon (play), Night (sleep)'),
              kt('Morning', 'The time when we wake up and the sun rises.'),
              kt('Night', 'The time when the moon and stars appear and we go to sleep.'),
              ex('We eat breakfast in the morning, lunch in the afternoon, and dinner at night!'),
              q('When does the sun rise?', ['Night', 'Morning', 'Afternoon', 'Never'], 1),
              q('When do we sleep?', ['Morning', 'Afternoon', 'Night', 'Noon'], 2),
              s('The day has parts: Morning (wake up), Afternoon (play), Night (sleep)!'),
            ],
          },
          {
            title: 'The Clock',
            blocks: [
              h('Reading a Clock'),
              p('A clock has two hands. The short hand tells the hour and the long hand tells the minutes.'),
              d('🕐', 'Short hand = hour, Long hand = minutes'),
              kt('Hour', 'The big number the short hand points to.'),
              kt('Minute', 'What the long hand tells us.'),
              ex('When the short hand is on 3 and the long hand is on 12, it is 3 o\'clock!'),
              q('Which hand tells the hour?', ['Long hand', 'Short hand', 'Both hands', 'Neither'], 1),
              q('What time is it when both hands are on 12?', ['6 o\'clock', '12 o\'clock', '3 o\'clock', '9 o\'clock'], 1),
              s('Clock: short hand = hour, long hand = minutes. When both are on 12, it\'s 12 o\'clock!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-family', name: 'Family', emoji: '👨‍👩‍👧‍👦', color: 'from-pink-400 to-fuchsia-400',
    chapters: [
      {
        id: 'ps-fam-1', title: 'My Family', emoji: '👪',
        pages: [
          {
            title: 'Family Members',
            blocks: [
              h('Who is in My Family?'),
              p('A family is a group of people who love and care for each other. Families can be big or small!'),
              d('👨👩👧👦', 'Father, Mother, Sister, Brother'),
              kt('Father', 'The male parent. Some families call him Papa or Daddy.'),
              kt('Mother', 'The female parent. Some families call her Mama or Mommy.'),
              kt('Siblings', 'Brothers and sisters.'),
              ex('My family has my father, mother, and my little brother!'),
              q('Who is the male parent?', ['Mother', 'Father', 'Sister', 'Grandma'], 1),
              q('What do we call brothers and sisters?', ['Cousins', 'Siblings', 'Friends', 'Parents'], 1),
              s('A family loves and cares for each other. Father, Mother, and Siblings are family members!'),
            ],
          },
          {
            title: 'Grandparents',
            blocks: [
              h('Grandma and Grandpa'),
              p('Grandparents are the parents of our parents. They are older and very wise!'),
              d('👴👵', 'Grandfather and Grandmother'),
              kt('Grandfather', 'The father of your father or mother. Also called Lolo or Grandpa.'),
              kt('Grandmother', 'The mother of your father or mother. Also called Lola or Grandma.'),
              ex('My Lolo tells great stories and my Lola makes delicious food!'),
              q('Who is the father of your parents?', ['Uncle', 'Grandfather', 'Brother', 'Cousin'], 1),
              q('What do we call a grandmother in Filipino?', ['Lolo', 'Lola', 'Tita', 'Tito'], 1),
              s('Grandparents are the parents of our parents. Grandfather = Lolo, Grandmother = Lola!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-opposites', name: 'Opposites', emoji: '🔄', color: 'from-cyan-400 to-teal-400',
    chapters: [
      {
        id: 'ps-opp-1', title: 'Big and Small', emoji: '📏',
        pages: [
          {
            title: 'Opposite Words',
            blocks: [
              h('What are Opposites?'),
              p('Opposites are words that mean the opposite of each other. Like hot and cold, or big and small!'),
              d('🐘🐜', 'Elephant is BIG, Ant is SMALL'),
              kt('Big', 'Something that is large in size.'),
              kt('Small', 'Something that is tiny in size.'),
              ex('An elephant is big, but an ant is small! A mountain is big, but a pebble is small!'),
              q('What is the opposite of "big"?', ['Large', 'Small', 'Tall', 'Wide'], 1),
              q('Which is small?', ['Elephant', 'Whale', 'Ant', 'Mountain'], 2),
              s('Opposites are words that mean the reverse: big ↔ small, hot ↔ cold, up ↔ down!'),
            ],
          },
          {
            title: 'More Opposite Pairs',
            blocks: [
              h('More Opposites!'),
              p('There are many opposite word pairs. Let\'s learn some more!'),
              kt('Hot / Cold', 'Hot feels like the sun. Cold feels like ice.'),
              kt('Up / Down', 'Up is toward the sky. Down is toward the ground.'),
              kt('Fast / Slow', 'Fast is quick like a cheetah. Slow is like a turtle.'),
              kt('Happy / Sad', 'Happy is when you smile. Sad is when you cry.'),
              d('⬆️⬇️', 'Up (sky) and Down (ground)'),
              ex('A cheetah is fast, but a turtle is slow! The sun is hot, but ice is cold!'),
              q('What is the opposite of "hot"?', ['Warm', 'Cold', 'Cool', 'Spicy'], 1),
              q('What is the opposite of "fast"?', ['Quick', 'Slow', 'Speed', 'Stop'], 1),
              q('What is the opposite of "happy"?', ['Glad', 'Sad', 'Angry', 'Tired'], 1),
              s('More opposites: hot↔cold, up↔down, fast↔slow, happy↔sad. Opposites are everywhere!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-music', name: 'Music', emoji: '🎵', color: 'from-fuchsia-400 to-purple-400',
    chapters: [
      {
        id: 'ps-mus-1', title: 'Sounds and Rhythm', emoji: '🥁',
        pages: [
          {
            title: 'Making Sounds',
            blocks: [
              h('What is Sound?'),
              p('Sound is what we hear with our ears! Everything around us makes sounds — birds singing, cars honking, and music playing.'),
              d('🎵🎶', 'Sounds can be loud, soft, high, or low'),
              kt('Sound', 'What we hear with our ears. Sounds can be loud or soft, high or low.'),
              ex('A drum goes "boom!" A bell goes "ding!" A whistle goes "tweet!"'),
              q('What do we use to hear sounds?', ['Eyes', 'Ears', 'Nose', 'Mouth'], 1),
              q('Which animal sings?', ['Fish', 'Bird', 'Rock', 'Table'], 1),
              s('Sounds are everywhere! We hear them with our ears. Sounds can be loud, soft, high, or low!'),
            ],
          },
          {
            title: 'Clapping and Tapping',
            blocks: [
              h('Make Music with Your Body'),
              p('You can make music using your body! Clap your hands, stomp your feet, or snap your fingers to make a beat.'),
              d('👏🦶', 'Clap hands, stomp feet, snap fingers — make a beat!'),
              kt('Beat', 'A steady sound that repeats — like the ticking of a clock.'),
              kt('Rhythm', 'A pattern of beats. Like clap-clap-stomp, clap-clap-stomp!'),
              ex('Try this: clap-clap-stomp, clap-clap-stomp! That is a rhythm pattern!'),
              ff('Did you know? Your heart makes a beat too — it goes "thump-thump" about 80 times every minute!'),
              q('What is a steady repeating sound called?', ['Color', 'Beat', 'Smell', 'Taste'], 1),
              q('What can you use to make music?', ['Your hands', 'A book', 'A shoe', 'Nothing'], 0),
              s('You can make music with your body! Clap, stomp, and snap to make beats and rhythms!'),
            ],
          },
        ],
      },
      {
        id: 'ps-mus-2', title: 'Musical Instruments', emoji: '🎹',
        pages: [
          {
            title: 'Instruments We Play',
            blocks: [
              h('What is a Musical Instrument?'),
              p('A musical instrument is a tool we use to make music. There are many kinds — some you hit, some you blow, and some you pluck!'),
              d('🥁🎹🎺', 'Drum (hit), Piano (press), Trumpet (blow)'),
              kt('Musical Instrument', 'A tool used to make music.'),
              kt('Drum', 'You hit it with your hands or sticks to make a loud sound.'),
              kt('Flute', 'You blow into it to make a soft, pretty sound.'),
              kt('Guitar', 'You pluck the strings with your fingers to make music.'),
              ex('A drum goes "boom!" A flute goes "toot!" A guitar goes "strum!"'),
              q('What do you do to play a drum?', ['Blow', 'Hit', 'Pluck', 'Squeeze'], 1),
              q('What do you do to play a flute?', ['Hit', 'Blow', 'Pluck', 'Kick'], 1),
              q('What do you do to play a guitar?', ['Hit', 'Blow', 'Pluck', 'Squeeze'], 2),
              s('Instruments make music! Drums (hit), Flutes (blow), Guitars (pluck). Music is fun to make!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-occupations', name: 'Jobs', emoji: '👷', color: 'from-orange-400 to-amber-400',
    chapters: [
      {
        id: 'ps-occ-1', title: 'People Who Help Us', emoji: '🧑‍⚕️',
        pages: [
          {
            title: 'Helpers in Our Community',
            blocks: [
              h('Community Helpers'),
              p('Many people in our community help us every day! Let\'s learn about some of them.'),
              d('🧑‍⚕️🧑‍🏫🚒👮', 'Doctor, Teacher, Firefighter, Police Officer'),
              kt('Doctor', 'A person who helps us when we are sick and keeps us healthy.'),
              kt('Teacher', 'A person who helps us learn new things at school.'),
              kt('Firefighter', 'A person who puts out fires and keeps us safe.'),
              kt('Police Officer', 'A person who keeps our community safe and follows the rules.'),
              ex('When you are sick, a doctor helps you feel better. When you are at school, a teacher helps you learn!'),
              q('Who helps you when you are sick?', ['Teacher', 'Doctor', 'Firefighter', 'Baker'], 1),
              q('Who helps you learn at school?', ['Doctor', 'Teacher', 'Police', 'Chef'], 1),
              q('Who puts out fires?', ['Police', 'Doctor', 'Firefighter', 'Teacher'], 2),
              s('Community helpers: Doctor (sick), Teacher (learn), Firefighter (fires), Police (safety). They help us every day!'),
            ],
          },
          {
            title: 'More Jobs',
            blocks: [
              h('Other Jobs People Do'),
              p('There are many jobs people do to help our community!'),
              kt('Chef', 'A person who cooks delicious food at restaurants.'),
              kt('Farmer', 'A person who grows fruits, vegetables, and rice for us to eat.'),
              kt('Driver', 'A person who drives buses, jeepneys, and taxis to take us places.'),
              kt('Nurse', 'A person who helps the doctor take care of sick people.'),
              d('👨‍🍳🧑‍🌾🚌', 'Chef (cooks), Farmer (grows food), Driver (drives)'),
              ex('A chef makes yummy food. A farmer grows the rice we eat. A driver takes us to school in the jeepney!'),
              ff('Did you know? Farmers wake up very early — sometimes before the sun rises — to take care of their crops and animals!'),
              q('Who cooks food at a restaurant?', ['Farmer', 'Chef', 'Driver', 'Nurse'], 1),
              q('Who grows the food we eat?', ['Chef', 'Farmer', 'Driver', 'Police'], 1),
              q('Who helps the doctor?', ['Teacher', 'Nurse', 'Farmer', 'Chef'], 1),
              s('More helpers: Chef (cooks), Farmer (grows food), Driver (drives), Nurse (helps doctor). Every job is important!'),
            ],
          },
        ],
      },
    ],
  },
];

const preschoolExtraSubjects: TextbookSubject[] = [
  {
    id: 'ps-emotions', name: 'Emotions', emoji: '😊', color: 'from-amber-400 to-orange-400',
    chapters: [
      {
        id: 'ps-emo-1', title: 'Feelings', emoji: '😄',
        pages: [
          {
            title: 'Happy, Sad, and Angry',
            blocks: [
              h('What Are Feelings?'),
              p('Feelings are how we feel inside. Sometimes we feel happy, sometimes sad, and sometimes angry. All feelings are okay!'),
              d('😄😢😠', 'Happy, Sad, Angry — all feelings are normal'),
              kt('Happy', 'Feeling good and joyful, like when you play with friends.'),
              kt('Sad', 'Feeling down or unhappy, like when you miss someone.'),
              kt('Angry', 'Feeling upset or mad, like when someone takes your toy.'),
              ex('You feel happy when you get a gift. You feel sad when you lose a toy. You feel angry when someone is mean.'),
              q('How do you feel when you get a gift?', ['Angry', 'Happy', 'Sad', 'Scared'], 1),
              q('Is it okay to feel sad sometimes?', ['No, never', 'Yes, all feelings are okay', 'Only happy is okay', 'Only angry is okay'], 1),
              s('All feelings are okay! Happy, sad, and angry are normal. Talk about your feelings with someone you trust!'),
            ],
          },
          {
            title: 'Scared and Surprised',
            blocks: [
              h('More Feelings'),
              p('There are many more feelings! Let\'s learn about being scared and surprised.'),
              kt('Scared', 'Feeling afraid, like when you hear a loud noise or see something new.'),
              kt('Surprised', 'Feeling amazed or shocked, like when you get an unexpected gift.'),
              d('😱😲', 'Scared (afraid) and Surprised (amazed)'),
              ex('You feel scared during a thunderstorm. You feel surprised at a birthday party!'),
              tip('When you feel scared, talk to a grown-up you trust. They can help you feel safe!'),
              q('How do you feel during a thunderstorm?', ['Happy', 'Scared', 'Bored', 'Angry'], 1),
              q('How do you feel at a surprise party?', ['Sad', 'Surprised', 'Angry', 'Tired'], 1),
              s('Scared (afraid) and Surprised (amazed) are normal feelings too. Talk to a grown-up when you feel scared!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ps-community', name: 'Community Places', emoji: '🏘️', color: 'from-sky-400 to-indigo-400',
    chapters: [
      {
        id: 'ps-com-1', title: 'Places in My Town', emoji: '🏥',
        pages: [
          {
            title: 'Important Places',
            blocks: [
              h('Places We Visit'),
              p('Our community has many important places. Each place helps us in a different way!'),
              d('🏥🏫🏪🚒', 'Hospital, School, Store, Fire Station'),
              kt('Hospital', 'A place where doctors and nurses help sick people get better.'),
              kt('School', 'A place where teachers help us learn new things.'),
              kt('Store', 'A place where we buy food, clothes, and things we need.'),
              kt('Fire Station', 'A place where firefighters wait to help put out fires.'),
              ex('When you are sick, you go to the hospital. When you want to learn, you go to school!'),
              q('Where do you go when you are sick?', ['Store', 'Hospital', 'School', 'Park'], 1),
              q('Where do you buy food?', ['Fire station', 'Store', 'Hospital', 'School'], 1),
              q('Where do firefighters work?', ['School', 'Store', 'Fire Station', 'Hospital'], 2),
              s('Community places: Hospital (sick people), School (learning), Store (buying), Fire Station (firefighters). Each place helps us!'),
            ],
          },
          {
            title: 'The Park and Library',
            blocks: [
              h('Fun and Learning Places'),
              p('Some places in our community are for fun and learning!'),
              d('🌳📚', 'Park (play and exercise) and Library (read and borrow books)'),
              kt('Park', 'A place with trees, grass, and playground equipment where we play and exercise.'),
              kt('Library', 'A place full of books we can read and borrow for free!'),
              ex('At the park, you can run, swing, and slide. At the library, you can read storybooks!'),
              ff('Did you know? The biggest library in the world has over 170 million books and items!'),
              tip('Always return library books on time so other children can read them too!'),
              q('Where can you play on swings and slides?', ['Library', 'Park', 'Store', 'Hospital'], 1),
              q('Where can you borrow books for free?', ['Park', 'Store', 'Library', 'Fire Station'], 2),
              s('Parks are for playing and exercising. Libraries are for reading and borrowing books. Both are free to use!'),
            ],
          },
        ],
      },
    ],
  },
];

const elementarySubjects: TextbookSubject[] = [
  {
    id: 'el-filipino', name: 'Filipino', emoji: '📖', color: 'from-red-400 to-orange-400',
    chapters: [
      {
        id: 'el-fil-1', title: 'Bahagi ng Pananalita', emoji: '📝',
        pages: [
          {
            title: 'Pangngalan at Pandiwa',
            blocks: [
              h('Ano ang Pangngalan?'),
              p('Ang pangngalan ay bahagi ng pananalita na tumutukoy sa ngalan ng tao, hayop, bagay, o lugar.'),
              ex('Halimbawa: bahay, tao, Maynila, aso, guro'),
              kt('Pangngalan', 'Ngalan ng tao, hayop, bagay, o lugar.'),
              h('Ano ang Pandiwa?'),
              p('Ang pandiwa ay tumutukoy sa kilos o galaw na ginagawa ng tao o bagay.'),
              ex('Halimbawa: tumakbo, kumain, sumulat, natulog'),
              kt('Pandiwa', 'Salitang nagpapahayag ng kilos o galaw.'),
              q('Alin ang halimbawa ng pangngalan?', ['Tumakbo', 'Bahay', 'Maganda', 'Mabilis'], 1),
              q('Alin ang halimbawa ng pandiwa?', ['Guro', 'Aklat', 'Sumulat', 'Paaralan'], 2),
            ],
          },
          {
            title: 'Pang-uri at Pang-abay',
            blocks: [
              h('Pang-uri'),
              p('Ang pang-uri ay naglalarawan sa pangngalan. Ito ay nagbibigay ng katangian.'),
              ex('Halimbawa: maganda, mabilis, malaki, masarap'),
              kt('Pang-uri', 'Salitang naglalarawan ng katangian ng pangngalan.'),
              h('Pang-abay'),
              p('Ang pang-abay ay naglalarawan sa pandiwa. Ito ay nagbibigay ng impormasyon kung paano ginawa ang kilos.'),
              ex('Halimbawa: mabilis (tumakbo nang mabilis), maingat (naglalaro nang maingat)'),
              kt('Pang-abay', 'Salitang naglalarawan ng pandiwa.'),
              q('Alin ang halimbawa ng pang-uri?', ['Bahay', 'Maganda', 'Tumakbo', 'Mabilis na'], 1),
              q('Ano ang tawag sa salitang naglalarawan ng pandiwa?', ['Pangngalan', 'Pang-uri', 'Pang-abay', 'Pandiwa'], 2),
              s('Tandaan: Pangngalan = ngalan, Pandiwa = kilos, Pang-uri = katangian, Pang-abay = paglalarawan sa kilos!'),
            ],
          },
        ],
      },
      {
        id: 'el-fil-2', title: 'Uri ng Pangungusap', emoji: '💬',
        pages: [
          {
            title: 'Apat na Uri ng Pangungusap',
            blocks: [
              h('Pasalaysay'),
              p('Ang pangungusap na pasalaysay ay nagpapahayag ng ideya o kwento. Ito ay nagbibigay ng impormasyon.'),
              ex('Halimbawa: Naglaro ang mga bata sa parke.'),
              h('Patanong'),
              p('Ang pangungusap na patanong ay nagtatanong ng something.'),
              ex('Halimbawa: Saan pupunta ang mga bata?'),
              h('Pautos'),
              p('Ang pangungusap na pautos ay nagpapahayag ng utos o kahilingan.'),
              ex('Halimbawa: Maglaro kayo nang maayos!'),
              h('Padamdam'),
              p('Ang pangungusap na padamdam ay nagpapahayag ng matinding damdamin.'),
              ex('Halimbawa: Ang ganda ng parke!'),
              q('Anong uri ng pangungusap ang "Saan ka pupunta?"', ['Pasalaysay', 'Patanong', 'Pautos', 'Padamdam'], 1),
              q('Anong uri ng pangungusap ang "Maglaro kayo!"', ['Pasalaysay', 'Patanong', 'Pautos', 'Padamdam'], 2),
              q('Anong uri ng pangungusap ang "Ang ganda ng bulaklak!"', ['Pasalaysay', 'Patanong', 'Pautos', 'Padamdam'], 3),
              s('Apat na uri: Pasalaysay (impormasyon), Patanong (tanong), Pautos (utos), Padamdam (damdamin)!'),
            ],
          },
        ],
      },
      {
        id: 'el-fil-3', title: 'Pambansang Simbolo', emoji: '🇵🇭',
        pages: [
          {
            title: 'Mga Simbolo ng Pilipinas',
            blocks: [
              h('Pambansang Wika'),
              p('Ang Filipino ang pambansang wika ng Pilipinas.'),
              h('Pambansang Awit'),
              p('Ang "Lupang Hinirang" ang pambansang awit ng Pilipinas.'),
              h('Pambansang Hayop'),
              p('Ang kalabaw ang pambansang hayop ng Pilipinas. Ito ay matibay at magsasaka na tumutulong sa pagbubungkal ng lupa.'),
              h('Pambansang Bulaklak'),
              p('Ang sampaguita ang pambansang bulaklak ng Pilipinas. Mabango at maliit ito.'),
              h('Pambansang Prutas'),
              p('Ang mangga ang pambansang prutas ng Pilipinas.'),
              d('🇵🇭', 'Pambansang wika: Filipino, Pambansang awit: Lupang Hinirang'),
              q('Ano ang pambansang wika ng Pilipinas?', ['English', 'Filipino', 'Cebuano', 'Ilocano'], 1),
              q('Ano ang pambansang hayop ng Pilipinas?', ['Aso', 'Kalabaw', 'Kabayo', 'Baka'], 1),
              q('Ano ang pambansang bulaklak ng Pilipinas?', ['Rosa', 'Sampaguita', 'Ilang-ilang', 'Waling-waling'], 1),
              s('Ang Pilipinas ay may sariling wika, awit, hayop, bulaklak, at prutas na nagpapakita ng ating kultura!'),
            ],
          },
        ],
      },
      {
        id: 'el-fil-4', title: 'Mga Sawikain', emoji: '💬',
        pages: [
          {
            title: 'Mga Kasabihan',
            blocks: [
              h('Ano ang Kasabihan?'),
              p('Ang kasabihan ay maikling sabi na nagbibigay ng aral o payo. Ito ay mula sa karanasan ng mga matatanda.'),
              kt('Kasabihan', 'Maikling sabi na nagbibigay ng aral o payo mula sa karanasan.'),
              ff('Alam mo ba? Ang mga kasabihan ay dumaan sa maraming henerasyon na nagpasa sa pamamagitan ng salita!'),
              h('Mga Halimbawa ng Kasabihan'),
              kt('Kapag may itinanim, may aanihin', 'Kung nagpursigi ka, magkakaroon ng resulta.'),
              kt('Ang hindi marunong lumingon sa pinanggalingan, hindi makakarating sa paroroonan', 'Mahalaga ang pagrespeto sa iyong nakaraan.'),
              kt('Walang mahirap na gawa kung may pagpupursigi', 'Ang pagpupursigi ang susi sa tagumpay.'),
              kt('Ang taong walang pinangarap, walang makakamtan', 'Kailangan ng pangarap para magtagumpay.'),
              kt('Pagsisisi ay laging nasa huli', 'Mag-isip muna bago gumawa ng desisyon.'),
              ex('Halimbawa: "Kapag may itinanim, may aanihin" — kung nag-aral ka ng mabuti, makakakuha ka ng magandang grado.'),
              q('Ano ang ibig sabihin ng "Kapag may itinanim, may aanihin"?', ['Libre lahat', 'Kung nagpursigi, may resulta', 'Magtanim ng halaman', 'Wala'], 1),
              q('Ano ang aral ng "Ang hindi marunong lumingon sa pinanggalingan"?', ['Lumingon ka lagi', 'Respeto sa nakaraan', 'Huwag lumingon', 'Takbo ka'], 1),
              q('Ano ang tawag sa maikling sabi na nagbibigay ng aral?', ['Pangungusap', 'Kasabihan', 'Pandiwa', 'Awit'], 1),
              s('Ang kasabihan ay nagbibigay ng aral mula sa karanasan. Halimbawa: "Kapag may itinanim, may aanihin" — kung nagpursigi, may resulta!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'el-english', name: 'English', emoji: '🔤', color: 'from-blue-400 to-cyan-400',
    chapters: [
      {
        id: 'el-eng-1', title: 'Parts of Speech', emoji: '📚',
        pages: [
          {
            title: 'Nouns and Verbs',
            blocks: [
              h('What is a Noun?'),
              p('A noun is a word that names a person, place, thing, or animal.'),
              ex('Examples: teacher (person), school (place), book (thing), dog (animal)'),
              kt('Noun', 'A word that names a person, place, thing, or animal.'),
              h('What is a Verb?'),
              p('A verb is an action word. It tells what someone or something does.'),
              ex('Examples: run, jump, eat, sleep, write, read'),
              kt('Verb', 'An action word that tells what someone or something does.'),
              q('Which is a noun?', ['Run', 'Apple', 'Quickly', 'Beautiful'], 1),
              q('Which is a verb?', ['Table', 'Jump', 'Red', 'Slowly'], 1),
            ],
          },
          {
            title: 'Adjectives and Adverbs',
            blocks: [
              h('Adjectives'),
              p('An adjective is a word that describes a noun. It tells us more about a person, place, or thing.'),
              ex('Examples: tall, beautiful, red, big, small, happy'),
              kt('Adjective', 'A describing word that tells us more about a noun.'),
              h('Adverbs'),
              p('An adverb is a word that describes a verb. It tells how, when, or where something happens.'),
              ex('Examples: quickly, slowly, yesterday, here, now'),
              kt('Adverb', 'A word that describes a verb — tells how, when, or where.'),
              q('Which is an adjective?', ['Run', 'Beautiful', 'Quickly', 'The'], 1),
              q('Which is an adverb?', ['Apple', 'Slowly', 'Big', 'Jump'], 1),
              s('Nouns name, Verbs do, Adjectives describe nouns, Adverbs describe verbs!'),
            ],
          },
          {
            title: 'Pronouns and Prepositions',
            blocks: [
              h('Pronouns'),
              p('A pronoun is a word that takes the place of a noun. Instead of saying "Maria" every time, we can say "she".'),
              ex('Examples: I, you, he, she, it, we, they'),
              kt('Pronoun', 'A word that replaces a noun.'),
              h('Prepositions'),
              p('A preposition is a word that shows where something is or when something happens.'),
              ex('Examples: in, on, under, behind, before, after'),
              kt('Preposition', 'A word that shows position or time.'),
              q('Which is a pronoun?', ['Table', 'She', 'Run', 'Big'], 1),
              q('Which is a preposition?', ['Under', 'Apple', 'Quickly', 'Red'], 0),
            ],
          },
        ],
      },
      {
        id: 'el-eng-2', title: 'Tenses', emoji: '⏰',
        pages: [
          {
            title: 'Past, Present, and Future',
            blocks: [
              h('Verb Tenses'),
              p('Verbs change form to show when something happens — in the past, present, or future.'),
              h('Past Tense'),
              p('Past tense tells us something already happened. Many verbs add "-ed" for past tense.'),
              ex('play → played, walk → walked, jump → jumped'),
              kt('Past Tense', 'Shows an action that already happened.'),
              h('Present Tense'),
              p('Present tense tells us something is happening now or happens regularly.'),
              ex('I play, I walk, I jump'),
              kt('Present Tense', 'Shows an action happening now or regularly.'),
              h('Future Tense'),
              p('Future tense tells us something will happen. We use "will" before the verb.'),
              ex('I will play, I will walk, I will jump'),
              kt('Future Tense', 'Shows an action that will happen later.'),
              q('What is the past tense of "go"?', ['Goed', 'Went', 'Going', 'Gone'], 1),
              q('What is the future tense of "eat"?', ['Ate', 'Eat', 'Will eat', 'Eaten'], 2),
              q('What is the past tense of "play"?', ['Plaied', 'Played', 'Plays', 'Playing'], 1),
              s('Past = already happened, Present = happening now, Future = will happen later!'),
            ],
          },
        ],
      },
      {
        id: 'el-eng-3', title: 'Sentences', emoji: '✍️',
        pages: [
          {
            title: 'Types of Sentences',
            blocks: [
              h('What is a Sentence?'),
              p('A sentence is a group of words that expresses a complete thought. It starts with a capital letter and ends with a punctuation mark.'),
              kt('Sentence', 'A group of words that expresses a complete thought.'),
              h('Declarative'),
              p('A declarative sentence makes a statement. It ends with a period (.).'),
              ex('The cat is sleeping on the mat.'),
              h('Interrogative'),
              p('An interrogative sentence asks a question. It ends with a question mark (?).'),
              ex('Where is the cat sleeping?'),
              h('Imperative'),
              p('An imperative sentence gives a command. It ends with a period (.) or exclamation mark (!).'),
              ex('Feed the cat!'),
              h('Exclamatory'),
              p('An exclamatory sentence shows strong emotion. It ends with an exclamation mark (!).'),
              ex('That cat is so cute!'),
              q('Which sentence is a question?', ['The cat is sleeping.', 'Where is the cat?', 'Feed the cat!', 'How cute the cat is!'], 1),
              q('What does a declarative sentence end with?', ['Question mark', 'Period', 'Exclamation mark', 'Comma'], 1),
              s('4 types: Declarative (statement), Interrogative (question), Imperative (command), Exclamatory (emotion)!'),
            ],
          },
        ],
      },
      {
        id: 'el-eng-4', title: 'Punctuation and Capitalization', emoji: '🔠',
        pages: [
          {
            title: 'Using Capital Letters',
            blocks: [
              h('When to Use Capital Letters'),
              p('Capital letters are used at the beginning of sentences, for names of people and places, and for the word "I".'),
              kt('Capital Letter', 'A big letter used at the start of sentences, names, and the word "I".'),
              h('Rules for Capitalization'),
              p('1. Start of a sentence: The dog is running. 2. Names of people: Maria, Juan, Jose. 3. Names of places: Manila, Cebu, Philippines. 4. Days and months: Monday, January. 5. The word "I": I am happy.'),
              ex('Wrong: maria lives in manila. Right: Maria lives in Manila.'),
              ex('Wrong: i like to read. Right: I like to read.'),
              q('Which is correct?', ['i am a student.', 'I am a student.', 'i Am a student.', 'I am A student.'], 1),
              q('Which is correct?', ['we go to school on monday.', 'We go to school on Monday.', 'We Go To School On Monday.', 'we go to school on Monday.'], 1),
              q('When do you use a capital letter?', ['Only at the end', 'At the start of sentences and for names', 'Never', 'Only for big words'], 1),
              s('Capital letters: start of sentences, names of people and places, days, months, and the word "I"!'),
            ],
          },
          {
            title: 'Punctuation Marks',
            blocks: [
              h('End Marks'),
              p('Every sentence ends with a punctuation mark. The three main end marks are period (.), question mark (?), and exclamation mark (!).'),
              kt('Period (.)', 'Ends a statement or command. Example: I like apples.'),
              kt('Question Mark (?)', 'Ends a question. Example: Do you like apples?'),
              kt('Exclamation Mark (!)', 'Ends a sentence with strong emotion. Example: I love apples!'),
              h('Commas'),
              p('Commas (,) are used to separate items in a list and to pause in a sentence.'),
              ex('I bought apples, bananas, grapes, and oranges.'),
              ex('After school, I will do my homework.'),
              q('What ends a question?', ['Period', 'Question mark', 'Comma', 'Exclamation mark'], 1),
              q('What ends a statement?', ['Question mark', 'Period', 'Exclamation mark', 'Comma'], 1),
              q('What separates items in a list?', ['Period', 'Comma', 'Question mark', 'No mark'], 1),
              s('End marks: Period (.) for statements, Question mark (?) for questions, Exclamation mark (!) for emotion. Commas separate list items!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'el-math', name: 'Math', emoji: '🔢', color: 'from-green-400 to-emerald-400',
    chapters: [
      {
        id: 'el-eng-5', title: 'Synonyms and Antonyms', emoji: '🔄',
        pages: [
          {
            title: 'Words with the Same Meaning',
            blocks: [
              h('What are Synonyms?'),
              p('Synonyms are words that have the same or almost the same meaning. Using synonyms makes your writing more interesting!'),
              kt('Synonym', 'A word that has the same or nearly the same meaning as another word.'),
              d('🔄', 'Happy = Joyful, Big = Large, Small = Tiny, Fast = Quick'),
              ex('Instead of saying "The dog is big," you can say "The dog is large" or "The dog is huge."'),
              h('Common Synonym Pairs'),
              kt('Happy / Joyful', 'Both mean feeling good or glad.'),
              kt('Sad / Unhappy', 'Both mean feeling down or not glad.'),
              kt('Big / Large', 'Both mean of great size.'),
              kt('Small / Tiny', 'Both mean of little size.'),
              kt('Fast / Quick', 'Both mean moving with speed.'),
              tip('Use a thesaurus to find synonyms when writing. It helps you avoid repeating the same word!'),
              q('What is a synonym for "happy"?', ['Sad', 'Joyful', 'Angry', 'Tired'], 1),
              q('What is a synonym for "big"?', ['Small', 'Tiny', 'Large', 'Slow'], 2),
              q('What is a synonym for "fast"?', ['Slow', 'Quick', 'Big', 'Sad'], 1),
              s('Synonyms = words with the same meaning. Happy/Joyful, Big/Large, Small/Tiny, Fast/Quick. Use them to make writing more interesting!'),
            ],
          },
          {
            title: 'Words with Opposite Meanings',
            blocks: [
              h('What are Antonyms?'),
              p('Antonyms are words that have opposite meanings. They help us describe differences.'),
              kt('Antonym', 'A word that has the opposite meaning of another word.'),
              d('🔄', 'Hot ↔ Cold, Up ↔ Down, Happy ↔ Sad, Big ↔ Small'),
              h('Common Antonym Pairs'),
              kt('Hot / Cold', 'Opposite temperatures.'),
              kt('Up / Down', 'Opposite directions.'),
              kt('Happy / Sad', 'Opposite feelings.'),
              kt('Big / Small', 'Opposite sizes.'),
              kt('Day / Night', 'Opposite times.'),
              ex('"The water is hot" vs "The water is cold." "The bird flies up" vs "The bird flies down."'),
              ff('Did you know? The word "antonym" comes from the Greek word "anti" meaning "against" or "opposite"!'),
              q('What is an antonym for "hot"?', ['Warm', 'Cold', 'Fire', 'Sun'], 1),
              q('What is an antonym for "happy"?', ['Joyful', 'Glad', 'Sad', 'Excited'], 2),
              q('What is an antonym for "up"?', ['Top', 'High', 'Down', 'Above'], 2),
              s('Antonyms = words with opposite meanings. Hot/Cold, Up/Down, Happy/Sad, Big/Small, Day/Night. They help describe differences!'),
            ],
          },
        ],
      },
      {
        id: 'el-mat-1', title: 'Addition and Subtraction', emoji: '➕',
        pages: [
          {
            title: 'Addition',
            blocks: [
              h('What is Addition?'),
              p('Addition is putting things together. When we add, we combine two or more numbers to find the total.'),
              d('➕', '3 + 2 = 5 (three plus two equals five)'),
              ex('If you have 3 apples and get 2 more, you have 5 apples!'),
              kt('Sum', 'The answer in addition is called the sum.'),
              kt('Addend', 'The numbers you add together are called addends.'),
              q('What is 5 + 3?', ['6', '7', '8', '9'], 2),
              q('What is 10 + 10?', ['15', '20', '25', '30'], 1),
            ],
          },
          {
            title: 'Subtraction',
            blocks: [
              h('What is Subtraction?'),
              p('Subtraction is taking away. When we subtract, we find the difference between two numbers.'),
              d('➖', '5 - 2 = 3 (five minus two equals three)'),
              ex('If you have 5 cookies and eat 2, you have 3 left!'),
              kt('Difference', 'The answer in subtraction is called the difference.'),
              q('What is 8 - 3?', ['4', '5', '6', '7'], 1),
              q('What is 10 - 4?', ['5', '6', '7', '8'], 1),
              s('Addition puts together (+), Subtraction takes away (-)!'),
            ],
          },
          {
            title: 'Word Problems',
            blocks: [
              h('Solving Word Problems'),
              p('Word problems are math problems told as stories. Read carefully to decide if you need to add or subtract!'),
              ex('Problem: Maria has 7 flowers. She gives 3 to her friend. How many flowers does Maria have left? Answer: 7 - 3 = 4'),
              ex('Problem: Juan has 4 marbles. His friend gives him 5 more. How many marbles does Juan have? Answer: 4 + 5 = 9'),
              q('Ana has 6 candies. She eats 2. How many are left?', ['2', '4', '6', '8'], 1),
              q('Pedro has 3 books. He buys 4 more. How many books total?', ['5', '6', '7', '8'], 2),
            ],
          },
        ],
      },
      {
        id: 'el-mat-2', title: 'Multiplication and Division', emoji: '✖️',
        pages: [
          {
            title: 'Multiplication',
            blocks: [
              h('What is Multiplication?'),
              p('Multiplication is repeated addition. When we multiply, we add the same number many times.'),
              d('✖️', '3 × 4 = 12 (three times four equals twelve, same as 3+3+3+3=12)'),
              ex('If you have 3 boxes with 4 candies each, you have 12 candies total!'),
              kt('Product', 'The answer in multiplication is called the product.'),
              kt('Factor', 'The numbers you multiply are called factors.'),
              q('What is 3 × 3?', ['6', '8', '9', '12'], 2),
              q('What is 5 × 2?', ['7', '10', '12', '15'], 1),
            ],
          },
          {
            title: 'Division',
            blocks: [
              h('What is Division?'),
              p('Division is sharing equally. When we divide, we split a number into equal groups.'),
              d('➗', '12 ÷ 3 = 4 (twelve divided by three equals four)'),
              ex('If you have 12 cookies and share them equally with 3 friends, each friend gets 4 cookies!'),
              kt('Quotient', 'The answer in division is called the quotient.'),
              kt('Dividend', 'The number being divided is called the dividend.'),
              q('What is 10 ÷ 2?', ['3', '4', '5', '6'], 2),
              q('What is 12 ÷ 4?', ['2', '3', '4', '5'], 1),
              s('Multiplication is repeated addition (×), Division is sharing equally (÷)!'),
            ],
          },
        ],
      },
      {
        id: 'el-mat-3', title: 'Fractions', emoji: '🍕',
        pages: [
          {
            title: 'Understanding Fractions',
            blocks: [
              h('What is a Fraction?'),
              p('A fraction is a part of a whole. When something is cut into equal parts, each part is a fraction.'),
              d('🍕', 'If a pizza is cut into 4 equal slices, each slice is 1/4 (one-fourth) of the pizza.'),
              kt('Numerator', 'The top number in a fraction. It tells how many parts you have.'),
              kt('Denominator', 'The bottom number in a fraction. It tells how many equal parts the whole is divided into.'),
              ex('In 3/4, the numerator is 3 (you have 3 parts) and the denominator is 4 (the whole is cut into 4 parts).'),
              q('In the fraction 1/2, what is the numerator?', ['1', '2', '3', '4'], 0),
              q('In the fraction 2/5, what is the denominator?', ['2', '3', '5', '10'], 2),
              s('A fraction shows part of a whole. Numerator (top) = parts you have, Denominator (bottom) = total equal parts!'),
            ],
          },
        ],
      },
      {
        id: 'el-mat-4', title: 'Decimals', emoji: '🔟',
        pages: [
          {
            title: 'Understanding Decimals',
            blocks: [
              h('What are Decimals?'),
              p('Decimals are another way to show parts of a whole, just like fractions. We use a dot called a "decimal point" to separate whole numbers from parts.'),
              d('🔟', '0.5 = one half, 0.25 = one quarter, 0.1 = one tenth'),
              kt('Decimal Point', 'The dot in a decimal number that separates the whole number from the parts.'),
              kt('Tenths', 'The first digit after the decimal point. 0.1 means one out of ten.'),
              kt('Hundredths', 'The second digit after the decimal point. 0.01 means one out of one hundred.'),
              ex('0.3 means 3 tenths. 0.07 means 7 hundredths. 1.5 means 1 whole and 5 tenths.'),
              ff('Did you know? Money uses decimals! ₱10.50 means 10 pesos and 50 centavos.'),
              tip('When adding decimals, always line up the decimal points!'),
              q('What is 0.5 as a fraction?', ['1/2', '1/4', '1/5', '1/10'], 0),
              q('What does the first digit after the decimal point represent?', ['Hundredths', 'Tenths', 'Whole numbers', 'Thousands'], 1),
              q('What is 0.25 as a fraction?', ['1/2', '1/4', '1/5', '1/25'], 1),
              s('Decimals show parts of a whole using a decimal point. First digit = tenths, second digit = hundredths!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'el-science', name: 'Science', emoji: '🔬', color: 'from-purple-400 to-indigo-400',
    chapters: [
      {
        id: 'el-sci-1', title: 'The Five Senses', emoji: '👀',
        pages: [
          {
            title: 'Our Five Senses',
            blocks: [
              h('How We Experience the World'),
              p('We use our five senses to learn about the world around us. Each sense helps us understand something different.'),
              d('👀👃👅👂✋', 'See, Smell, Taste, Hear, Touch'),
              h('Sight (Eyes)'),
              p('We use our eyes to see colors, shapes, and everything around us.'),
              h('Smell (Nose)'),
              p('We use our nose to smell. We can smell flowers, food, and many things.'),
              h('Taste (Tongue)'),
              p('We use our tongue to taste. We can taste sweet, sour, salty, and bitter.'),
              h('Hearing (Ears)'),
              p('We use our ears to hear sounds like music, voices, and birds.'),
              h('Touch (Skin)'),
              p('We use our skin to touch and feel. We can feel if something is hot, cold, soft, or hard.'),
              q('What do we use to see?', ['Ears', 'Eyes', 'Nose', 'Tongue'], 1),
              q('What do we use to hear?', ['Eyes', 'Ears', 'Nose', 'Skin'], 1),
              q('What do we use to taste?', ['Nose', 'Tongue', 'Ears', 'Eyes'], 1),
              s('Five senses: See (eyes), Smell (nose), Taste (tongue), Hear (ears), Touch (skin)!'),
            ],
          },
        ],
      },
      {
        id: 'el-sci-2', title: 'States of Matter', emoji: '💧',
        pages: [
          {
            title: 'Solid, Liquid, Gas',
            blocks: [
              h('What is Matter?'),
              p('Matter is everything around us! Everything you can see, touch, or feel is matter. Matter comes in three forms: solid, liquid, and gas.'),
              kt('Matter', 'Everything that takes up space and has weight.'),
              h('Solid'),
              p('A solid has a fixed shape. It does not flow. Examples: rock, book, ice, table.'),
              d('🧊', 'Ice is a solid — it keeps its shape'),
              h('Liquid'),
              p('A liquid takes the shape of its container. It can flow. Examples: water, milk, juice.'),
              d('💧', 'Water is a liquid — it takes the shape of the cup'),
              h('Gas'),
              p('A gas has no fixed shape or size. It spreads out. Examples: air, steam, oxygen.'),
              d('💨', 'Air is a gas — we cannot see it but it is everywhere'),
              q('What state of matter is a rock?', ['Liquid', 'Gas', 'Solid', 'All three'], 2),
              q('What state of matter is water?', ['Solid', 'Liquid', 'Gas', 'None'], 1),
              q('What state of matter is air?', ['Solid', 'Liquid', 'Gas', 'None'], 2),
              s('Three states of matter: Solid (keeps shape), Liquid (flows, takes container shape), Gas (spreads out)!'),
            ],
          },
        ],
      },
      {
        id: 'el-sci-3', title: 'Plants and Animals', emoji: '🌱',
        pages: [
          {
            title: 'Living Things',
            blocks: [
              h('What are Living Things?'),
              p('Living things are things that are alive. They grow, need food and water, and can have babies.'),
              ex('Plants, animals, and people are all living things.'),
              kt('Living Thing', 'Something that grows, needs food and water, and can reproduce.'),
              h('Parts of a Plant'),
              p('A plant has roots (underground), stem (holds it up), leaves (make food), and flowers (make seeds).'),
              d('🌱', 'Roots, Stem, Leaves, Flowers'),
              h('What Animals Need'),
              p('Animals need food, water, air, and shelter to live and grow.'),
              q('Which is a living thing?', ['Rock', 'Tree', 'Water', 'Book'], 1),
              q('What part of a plant makes food?', ['Roots', 'Leaves', 'Stem', 'Flowers'], 1),
              s('Living things grow, need food and water, and reproduce. Plants have roots, stem, leaves, and flowers!'),
            ],
          },
        ],
      },
      {
        id: 'el-sci-4', title: 'The Water Cycle', emoji: '💧',
        pages: [
          {
            title: 'How Water Moves',
            blocks: [
              h('The Water Cycle'),
              p('Water never disappears — it moves in a cycle! The same water you drink today has been on Earth for millions of years.'),
              d('💧☁️🌧️🌊', 'Evaporation → Condensation → Precipitation → Collection'),
              kt('Evaporation', 'When the sun heats water and it turns into vapor (gas) and rises up.'),
              kt('Condensation', 'When water vapor cools and forms clouds.'),
              kt('Precipitation', 'When water falls from clouds as rain, snow, or hail.'),
              kt('Collection', 'When water gathers in oceans, rivers, lakes, and underground.'),
              ff('Did you know? The water you drink today might be the same water that dinosaurs drank millions of years ago!'),
              tip('Save water at home — turn off the faucet while brushing your teeth!'),
              q('What is it called when water turns into vapor and rises?', ['Condensation', 'Evaporation', 'Precipitation', 'Collection'], 1),
              q('What is it called when water falls from clouds as rain?', ['Evaporation', 'Condensation', 'Precipitation', 'Collection'], 2),
              q('What forms when water vapor cools?', ['Rivers', 'Clouds', 'Ice', 'Nothing'], 1),
              s('The water cycle: Evaporation (water rises) → Condensation (clouds form) → Precipitation (rain falls) → Collection (water gathers)!'),
            ],
          },
        ],
      },
      {
        id: 'el-sci-5', title: 'The Solar System', emoji: '🌍',
        pages: [
          {
            title: 'Our Sun and Planets',
            blocks: [
              h('What is the Solar System?'),
              p('The solar system is the Sun and everything that goes around it. There are 8 planets that orbit the Sun.'),
              d('☀️🌍🔴', 'Sun + 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune'),
              kt('Sun', 'The big star at the center of our solar system. It gives us light and heat.'),
              kt('Planet', 'A large round object that goes around (orbits) the Sun.'),
              kt('Orbit', 'The path a planet takes around the Sun.'),
              h('The Eight Planets'),
              p('In order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Earth is the planet we live on!'),
              ex('Mercury is the closest to the Sun. Neptune is the farthest. Earth is the only planet we know has life!'),
              ff('Did you know? Jupiter is so big that more than 1,300 Earths could fit inside it!'),
              q('How many planets are in our solar system?', ['7', '8', '9', '10'], 1),
              q('Which planet do we live on?', ['Mars', 'Earth', 'Venus', 'Jupiter'], 1),
              q('What is at the center of our solar system?', ['Earth', 'Moon', 'Sun', 'Jupiter'], 2),
              s('Solar system: Sun + 8 planets. We live on Earth. Planets orbit the Sun. Jupiter is the biggest!'),
            ],
          },
          {
            title: 'Earth and the Moon',
            blocks: [
              h('Our Planet Earth'),
              p('Earth is the only planet we know that has life. It has water, air, and the right temperature for plants, animals, and people to live.'),
              d('🌍🌙', 'Earth (our home) and the Moon (goes around Earth)'),
              kt('Earth', 'The planet we live on. It has water, air, and life.'),
              kt('Moon', 'The round object that goes around Earth. It changes shape in the sky.'),
              h('Day and Night'),
              p('Earth spins around like a top. When one side faces the Sun, it is day. When it faces away, it is night.'),
              kt('Day', 'When your side of Earth faces the Sun and it is bright outside.'),
              kt('Night', 'When your side of Earth faces away from the Sun and it is dark.'),
              ex('When it is day in the Philippines, it is night on the other side of the world!'),
              ff('Did you know? The Moon does not make its own light. It looks bright because it reflects light from the Sun!'),
              q('What planet do we live on?', ['Mars', 'Earth', 'Venus', 'Saturn'], 1),
              q('Why do we have day and night?', ['Earth stops', 'Earth spins around', 'The Sun moves', 'The Moon blocks the Sun'], 1),
              q('What goes around Earth?', ['Sun', 'Moon', 'Mars', 'Stars'], 1),
              s('Earth is our home — it has water, air, and life! Day and night happen because Earth spins. The Moon goes around Earth!'),
            ],
          },
        ],
      },
      {
        id: 'el-sci-7', title: 'Weather and Seasons', emoji: '🌦️',
        pages: [
          {
            title: 'Types of Weather',
            blocks: [
              h('What is Weather?'),
              p('Weather is what the sky and air are like outside. It can be sunny, rainy, windy, cloudy, or stormy!'),
              kt('Weather', 'What the sky and air are like outside on a particular day.'),
              d('☀️🌧️💨☁️', 'Sunny, Rainy, Windy, Cloudy — different types of weather'),
              kt('Sunny', 'The sky is clear and the sun is shining brightly.'),
              kt('Rainy', 'Water falls from clouds as rain. You need an umbrella!'),
              kt('Windy', 'Air moves fast. Trees sway and flags flutter.'),
              kt('Cloudy', 'The sky is covered with clouds. It may rain soon.'),
              ex('On a sunny day, you can play outside. On a rainy day, you stay indoors or use an umbrella.'),
              q('What weather do you need an umbrella for?', ['Sunny', 'Rainy', 'Cloudy', 'Windy'], 1),
              q('What weather has the sun shining brightly?', ['Rainy', 'Cloudy', 'Sunny', 'Stormy'], 2),
              q('What weather makes trees sway?', ['Sunny', 'Windy', 'Cloudy', 'Rainy'], 1),
              s('Weather types: Sunny (clear sky), Rainy (water falls), Windy (air moves fast), Cloudy (clouds cover sky). Dress for the weather!'),
            ],
          },
          {
            title: 'The Four Seasons',
            blocks: [
              h('What are Seasons?'),
              p('Seasons are the four main parts of the year. Each season has different weather. Not all countries have four seasons — the Philippines has only two!'),
              kt('Season', 'One of the four main parts of the year with different weather patterns.'),
              d('🌸☀️🍂❄️', 'Spring, Summer, Autumn (Fall), Winter — the four seasons'),
              kt('Spring', 'Flowers bloom and baby animals are born. The weather gets warmer.'),
              kt('Summer', 'The hottest season. Days are long and sunny. School vacation time!'),
              kt('Autumn (Fall)', 'Leaves change color and fall from trees. The weather gets cooler.'),
              kt('Winter', 'The coldest season. Snow falls in many countries. Days are short.'),
              ex('In countries with four seasons: Spring (March-May), Summer (June-August), Autumn (September-November), Winter (December-February).'),
              ff('Did you know? The Philippines has only two seasons: the wet season (June-October) and the dry season (November-May)!'),
              q('In which season do flowers bloom?', ['Summer', 'Winter', 'Spring', 'Autumn'], 2),
              q('In which season does snow fall?', ['Spring', 'Summer', 'Autumn', 'Winter'], 3),
              q('How many seasons does the Philippines have?', ['2', '3', '4', '5'], 0),
              s('Four seasons: Spring (flowers bloom), Summer (hottest), Autumn (leaves fall), Winter (snow). The Philippines has only 2 seasons: wet and dry!'),
            ],
          },
        ],
      },
      {
        id: 'el-sci-6', title: 'Energy and Forces', emoji: '⚡',
        pages: [
          {
            title: 'Push and Pull',
            blocks: [
              h('What is a Force?'),
              p('A force is a push or a pull. You use force when you push a door open or pull a wagon.'),
              d('🚪🛒', 'Push (door open) and Pull (wagon toward you)'),
              kt('Force', 'A push or a pull that makes things move or change shape.'),
              kt('Push', 'When you push something away from you.'),
              kt('Pull', 'When you pull something toward you.'),
              ex('Pushing a swing makes it go forward. Pulling a rope in a tug-of-war brings it toward you!'),
              q('What is a push?', ['Moving something away from you', 'Moving something toward you', 'Stopping something', 'Nothing'], 0),
              q('What is a pull?', ['Moving something away', 'Moving something toward you', 'Stopping', 'Jumping'], 1),
              q('What do we call a push or pull?', ['Energy', 'Force', 'Speed', 'Light'], 1),
              s('A force is a push or a pull. Push = away from you. Pull = toward you. Forces make things move!'),
            ],
          },
          {
            title: 'Types of Energy',
            blocks: [
              h('What is Energy?'),
              p('Energy is what makes things happen. Without energy, nothing would move or work!'),
              d('☀️💡🔥', 'Light energy, electrical energy, heat energy'),
              kt('Energy', 'What makes things move, work, or happen.'),
              kt('Light Energy', 'Energy we can see — like sunlight or a light bulb.'),
              kt('Heat Energy', 'Energy we feel as warmth — like fire or the sun on your skin.'),
              kt('Sound Energy', 'Energy we hear — like music or talking.'),
              ex('The Sun gives us light and heat energy. A battery gives electrical energy to a toy. Your voice makes sound energy!'),
              ff('Did you know? Energy cannot be created or destroyed — it only changes from one type to another!'),
              q('What energy do we see?', ['Sound', 'Light', 'Heat', 'Push'], 1),
              q('What energy do we feel as warmth?', ['Light', 'Sound', 'Heat', 'Pull'], 2),
              q('What energy do we hear?', ['Sound', 'Light', 'Heat', 'Force'], 0),
              s('Energy makes things happen! Light (see), Heat (feel warm), Sound (hear). Energy changes from one type to another!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'el-ap', name: 'Aralin Panlipunan', emoji: '🗺️', color: 'from-amber-400 to-yellow-400',
    chapters: [
      {
        id: 'el-ap-1', title: 'Our Country', emoji: '🇵🇭',
        pages: [
          {
            title: 'The Philippines',
            blocks: [
              h('Our Country: The Philippines'),
              p('The Philippines is a country made up of many islands in Southeast Asia. It has more than 7,000 islands!'),
              d('🇵🇭', 'The flag of the Philippines has blue, red, yellow, and white'),
              kt('Archipelago', 'A country made up of many islands.'),
              h('Three Main Island Groups'),
              p('The Philippines has three main groups of islands: Luzon in the north, Visayas in the middle, and Mindanao in the south.'),
              ex('Luzon: Manila is here. Visayas: Cebu is here. Mindanao: Davao is here.'),
              kt('Luzon', 'The northernmost main island group, where Manila is located.'),
              kt('Visayas', 'The middle island group of the Philippines.'),
              kt('Mindanao', 'The southernmost main island group.'),
              q('How many main island groups does the Philippines have?', ['2', '3', '4', '5'], 1),
              q('Where is Manila located?', ['Visayas', 'Mindanao', 'Luzon', 'Palawan'], 2),
              s('The Philippines is an archipelago with 3 main island groups: Luzon, Visayas, and Mindanao!'),
            ],
          },
          {
            title: 'National Heroes',
            blocks: [
              h('Jose Rizal'),
              p('Jose Rizal is our national hero. He wrote the books "Noli Me Tangere" and "El Filibusterismo" to fight for freedom without violence.'),
              kt('National Hero', 'A person who fought for the freedom and rights of the country.'),
              h('Andres Bonifacio'),
              p('Andres Bonifacio founded the Katipunan, a group that fought for Philippine independence from Spain.'),
              h('Apolinario Mabini'),
              p('Apolinario Mabini is called the "Brains of the Revolution." He helped write the plans for the revolution.'),
              q('Who is the national hero of the Philippines?', ['Andres Bonifacio', 'Jose Rizal', 'Apolinario Mabini', 'Emilio Aguinaldo'], 1),
              q('Who founded the Katipunan?', ['Jose Rizal', 'Apolinario Mabini', 'Andres Bonifacio', 'Manuel Quezon'], 2),
              s('Our heroes fought for our freedom. Rizal wrote books, Bonifacio founded the Katipunan, Mabini was the brains of the revolution!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'el-geometry', name: 'Geometry', emoji: '📐', color: 'from-cyan-400 to-blue-400',
    chapters: [
      {
        id: 'el-geo-1', title: 'Lines and Angles', emoji: '📏',
        pages: [
          {
            title: 'Types of Lines',
            blocks: [
              h('Lines Everywhere!'),
              p('Lines are everywhere around us. There are different types of lines in geometry.'),
              kt('Line', 'A straight path that goes on forever in both directions.'),
              kt('Line Segment', 'A part of a line with two endpoints.'),
              kt('Ray', 'A part of a line that starts at one point and goes on forever in one direction.'),
              d('📏', 'Line → ← (goes forever both ways), Line Segment •—• (two endpoints), Ray •→ (one start, goes forever)'),
              h('Parallel and Perpendicular Lines'),
              kt('Parallel Lines', 'Lines that never cross and are always the same distance apart, like train tracks.'),
              kt('Perpendicular Lines', 'Lines that cross at a right angle (90 degrees), like a plus sign (+).'),
              ex('Parallel: the edges of a ruler. Perpendicular: the corner of a book.'),
              q('Which lines never cross?', ['Perpendicular', 'Parallel', 'Intersecting', 'Curved'], 1),
              q('Which lines cross at 90 degrees?', ['Parallel', 'Perpendicular', 'Diagonal', 'Horizontal'], 1),
              q('What has two endpoints?', ['Line', 'Ray', 'Line Segment', 'Curve'], 2),
              s('Lines: Line (forever both ways), Ray (one start, forever one way), Segment (two endpoints). Parallel = never cross, Perpendicular = 90°!'),
            ],
          },
          {
            title: 'Types of Angles',
            blocks: [
              h('What is an Angle?'),
              p('An angle is formed when two lines meet at a point. Angles are measured in degrees.'),
              kt('Angle', 'The space between two lines that meet at a point, measured in degrees.'),
              kt('Right Angle', 'Exactly 90 degrees, like the corner of a square.'),
              kt('Acute Angle', 'Less than 90 degrees — a small angle.'),
              kt('Obtuse Angle', 'More than 90 but less than 180 degrees — a wide angle.'),
              d('📐', 'Acute (< 90°), Right (90°), Obtuse (> 90° and < 180°)'),
              ex('A pizza slice has an acute angle. The corner of a book is a right angle. An open book forms an obtuse angle.'),
              q('What angle is exactly 90 degrees?', ['Acute', 'Right', 'Obtuse', 'Straight'], 1),
              q('An angle of 45° is what type?', ['Acute', 'Right', 'Obtuse', 'Straight'], 0),
              q('An angle of 120° is what type?', ['Acute', 'Right', 'Obtuse', 'Straight'], 2),
              s('Angles: Acute (< 90°), Right (90°), Obtuse (90-180°). Right angles are like corners of a square!'),
            ],
          },
        ],
      },
      {
        id: 'el-geo-2', title: 'Polygons', emoji: '⬠',
        pages: [
          {
            title: 'Shapes with Many Sides',
            blocks: [
              h('What is a Polygon?'),
              p('A polygon is a closed shape made of straight lines. The number of sides gives the polygon its name.'),
              kt('Polygon', 'A closed shape with straight sides.'),
              kt('Triangle', 'A polygon with 3 sides.'),
              kt('Quadrilateral', 'A polygon with 4 sides — like a square, rectangle, or parallelogram.'),
              kt('Pentagon', 'A polygon with 5 sides.'),
              kt('Hexagon', 'A polygon with 6 sides.'),
              d('⬠⬡', 'Pentagon (5 sides), Hexagon (6 sides)'),
              ex('A stop sign is an octagon (8 sides). A honeycomb cell is a hexagon (6 sides).'),
              ff('Did you know? A honeycomb is made of hexagons because hexagons use the least wax to cover the most space!'),
              q('How many sides does a triangle have?', ['2', '3', '4', '5'], 1),
              q('How many sides does a hexagon have?', ['4', '5', '6', '7'], 2),
              q('How many sides does a quadrilateral have?', ['3', '4', '5', '6'], 1),
              s('Polygons: Triangle (3), Quadrilateral (4), Pentagon (5), Hexagon (6). Straight sides, closed shape!'),
            ],
          },
        ],
      },
      {
        id: 'el-geo-3', title: 'Area and Perimeter', emoji: '📐',
        pages: [
          {
            title: 'What is Perimeter?',
            blocks: [
              h('Measuring the Outside'),
              p('Perimeter is the distance around the outside of a shape. You add up all the sides!'),
              d('📐', 'Perimeter = add all the sides together'),
              kt('Perimeter', 'The distance around the outside of a shape — add all sides.'),
              ex('A square has 4 sides of 5 cm each. Perimeter = 5 + 5 + 5 + 5 = 20 cm!'),
              h('Perimeter of a Rectangle'),
              p('A rectangle has two lengths (L) and two widths (W). Perimeter = L + L + W + W, or 2 × (L + W).'),
              ex('A rectangle is 6 cm long and 4 cm wide. Perimeter = 2 × (6 + 4) = 2 × 10 = 20 cm!'),
              q('A square has sides of 3 cm. What is the perimeter?', ['6 cm', '9 cm', '12 cm', '15 cm'], 2),
              q('A rectangle is 5 cm long and 3 cm wide. What is the perimeter?', ['8 cm', '13 cm', '15 cm', '16 cm'], 3),
              q('What is perimeter?', ['Inside of a shape', 'Distance around the outside', 'Space inside', 'Number of sides'], 1),
              s('Perimeter = distance around the outside. Add all sides! Rectangle: 2 × (L + W). Square: 4 × side!'),
            ],
          },
          {
            title: 'What is Area?',
            blocks: [
              h('Measuring the Inside'),
              p('Area is the space inside a shape. It is measured in square units, like square centimeters (cm²).'),
              d('📐', 'Area = the space inside a shape, measured in square units'),
              kt('Area', 'The space inside a shape, measured in square units (like cm²).'),
              h('Area of a Rectangle'),
              p('To find the area of a rectangle, multiply length × width. Area = L × W.'),
              ex('A rectangle is 6 cm long and 4 cm wide. Area = 6 × 4 = 24 cm²!'),
              h('Area of a Square'),
              p('A square has all sides equal. Area = side × side, or side².'),
              ex('A square has sides of 5 cm. Area = 5 × 5 = 25 cm²!'),
              q('A rectangle is 7 cm long and 3 cm wide. What is the area?', ['10 cm²', '21 cm²', '24 cm²', '30 cm²'], 1),
              q('A square has sides of 4 cm. What is the area?', ['8 cm²', '12 cm²', '16 cm²', '20 cm²'], 2),
              q('What is area?', ['Distance around', 'Space inside a shape', 'Number of sides', 'Height of a shape'], 1),
              s('Area = space inside a shape. Rectangle: L × W. Square: side × side. Measured in square units (cm²)!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'el-body', name: 'Human Body', emoji: '🫀', color: 'from-rose-400 to-red-400',
    chapters: [
      {
        id: 'el-bod-1', title: 'Body Systems', emoji: '🫁',
        pages: [
          {
            title: 'The Skeletal System',
            blocks: [
              h('Our Bones'),
              p('The skeletal system is made up of all the bones in our body. An adult human has 206 bones!'),
              kt('Skeletal System', 'All the bones in our body that give us shape and protect our organs.'),
              kt('Skeleton', 'The framework of bones that supports the body.'),
              d('🦴', 'An adult has 206 bones. Babies are born with about 300 bones that fuse together!'),
              ex('The skull protects the brain. The rib cage protects the heart and lungs.'),
              ff('Did you know? The smallest bone in your body is in your ear — it is called the stapes and is only 3 mm long!'),
              q('How many bones does an adult human have?', ['100', '206', '300', '500'], 1),
              q('What do the ribs protect?', ['Brain', 'Heart and lungs', 'Stomach', 'Legs'], 1),
              q('What protects the brain?', ['Ribs', 'Skull', 'Spine', 'Pelvis'], 1),
              s('Skeletal system: 206 bones in adults. Skull protects brain, ribs protect heart and lungs. Smallest bone = stapes (ear)!'),
            ],
          },
          {
            title: 'The Circulatory System',
            blocks: [
              h('Heart and Blood'),
              p('The circulatory system moves blood through our body. The heart pumps blood to deliver oxygen and nutrients.'),
              kt('Circulatory System', 'The system that moves blood, oxygen, and nutrients through the body.'),
              kt('Heart', 'The muscle that pumps blood through the body. It beats about 100,000 times a day!'),
              kt('Blood Vessels', 'Tubes that carry blood — arteries (away from heart), veins (to heart), capillaries (tiny).'),
              d('🫀', 'Heart pumps blood → Arteries carry it away → Veins bring it back'),
              ex('Your heart is about the size of your fist. It pumps blood to every part of your body!'),
              ff('Did you know? If you stretched out all the blood vessels in your body, they would circle the Earth about 2.5 times!'),
              q('What pumps blood through the body?', ['Lungs', 'Heart', 'Brain', 'Stomach'], 1),
              q('What carries blood away from the heart?', ['Veins', 'Arteries', 'Capillaries', 'Nerves'], 1),
              q('How big is your heart?', ['Size of your head', 'Size of your fist', 'Size of your foot', 'Size of a car'], 1),
              s('Circulatory system: Heart (pumps), Arteries (away), Veins (back), Capillaries (tiny). Heart = size of fist, beats 100,000x/day!'),
            ],
          },
          {
            title: 'The Respiratory System',
            blocks: [
              h('Breathing In and Out'),
              p('The respiratory system helps us breathe. We take in oxygen and release carbon dioxide.'),
              kt('Respiratory System', 'The system that helps us breathe — takes in oxygen and releases carbon dioxide.'),
              kt('Lungs', 'Two organs in the chest that take in oxygen from the air.'),
              kt('Trachea', 'The windpipe — a tube that carries air from the nose to the lungs.'),
              d('🫁', 'Nose → Trachea → Lungs (oxygen in, carbon dioxide out)'),
              ex('When you breathe in, your lungs fill with air. When you breathe out, you release carbon dioxide.'),
              tip('Exercise makes your lungs stronger! Running, swimming, and playing sports help your lungs work better.'),
              q('What do we breathe in?', ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Helium'], 1),
              q('What do we breathe out?', ['Oxygen', 'Carbon dioxide', 'Water only', 'Nothing'], 1),
              q('What carries air from the nose to the lungs?', ['Esophagus', 'Trachea', 'Vein', 'Artery'], 1),
              s('Respiratory system: Nose → Trachea → Lungs. Breathe in oxygen, breathe out carbon dioxide. Exercise makes lungs stronger!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'el-music', name: 'Music', emoji: '🎵', color: 'from-fuchsia-400 to-purple-400',
    chapters: [
      {
        id: 'el-mus-1', title: 'Rhythm and Beat', emoji: '🥁',
        pages: [
          {
            title: 'What is Rhythm?',
            blocks: [
              h('The Heart of Music'),
              p('Rhythm is the pattern of sounds and silences in music. It is what makes you want to tap your feet or clap your hands!'),
              kt('Rhythm', 'The pattern of sounds and silences in music.'),
              kt('Beat', 'The steady pulse in music, like a heartbeat. You can clap or tap to the beat.'),
              d('🥁', 'Beat = steady pulse (like a heartbeat). Rhythm = pattern of sounds and silences.'),
              ex('When you clap along to a song, you are clapping the beat! When you clap a pattern like "clap-clap-CLAP, clap-clap-CLAP," that is rhythm!'),
              h('Clapping Rhythms'),
              p('You can make rhythms by clapping, stomping, or tapping. Try this: clap-clap-rest-clap! The "rest" is a silence.'),
              kt('Rest', 'A silence in music where no sound is played for a beat.'),
              ff('Did you know? Your heartbeat is a natural rhythm! A healthy heart beats about 70-80 times per minute when resting.'),
              q('What is the steady pulse in music called?', ['Melody', 'Beat', 'Harmony', 'Tempo'], 1),
              q('What is a silence in music called?', ['Note', 'Rest', 'Beat', 'Rhythm'], 1),
              q('What is rhythm?', ['Only loud sounds', 'The pattern of sounds and silences', 'Only fast music', 'The words of a song'], 1),
              s('Beat = steady pulse (like heartbeat). Rhythm = pattern of sounds and silences. Rest = silence. Clap, stomp, or tap to make rhythms!'),
            ],
          },
          {
            title: 'Fast and Slow Tempo',
            blocks: [
              h('What is Tempo?'),
              p('Tempo is how fast or slow music is. Fast tempo makes you want to dance. Slow tempo makes you feel calm.'),
              kt('Tempo', 'The speed of music — how fast or slow it goes.'),
              kt('Fast Tempo', 'Music that moves quickly. Makes you feel excited or energetic.'),
              kt('Slow Tempo', 'Music that moves slowly. Makes you feel calm or relaxed.'),
              d('🎵', 'Fast tempo = exciting (like a race). Slow tempo = calm (like a lullaby).'),
              ex('A dance song has a fast tempo. A lullaby (sleep song) has a slow tempo. Try singing "Happy Birthday" fast and then slow!'),
              tip('Listen to different songs and try to clap the beat. Is the tempo fast or slow?'),
              q('What is tempo?', ['How loud music is', 'How fast or slow music is', 'The words of a song', 'The instruments'], 1),
              q('A lullaby usually has what tempo?', ['Fast', 'Slow', 'No tempo', 'Loud'], 1),
              q('A dance song usually has what tempo?', ['Slow', 'Fast', 'No tempo', 'Quiet'], 1),
              s('Tempo = speed of music. Fast tempo = exciting (dance songs). Slow tempo = calm (lullabies). Clap the beat to feel the tempo!'),
            ],
          },
        ],
      },
      {
        id: 'el-mus-2', title: 'Musical Instruments', emoji: '🎹',
        pages: [
          {
            title: 'Families of Instruments',
            blocks: [
              h('How Instruments are Grouped'),
              p('Musical instruments are grouped into families based on how they make sound. There are four main families!'),
              kt('Instrument Family', 'A group of instruments that make sound in a similar way.'),
              d('🎺🥁🎻🎹', 'Brass, Percussion, Strings, Woodwinds — the four instrument families'),
              h('The Four Families'),
              kt('Strings', 'Instruments with strings that you pluck or bow. Examples: guitar, violin, piano.'),
              kt('Woodwinds', 'Instruments you blow into. Examples: flute, clarinet, recorder.'),
              kt('Brass', 'Instruments made of brass that you buzz your lips into. Examples: trumpet, trombone.'),
              kt('Percussion', 'Instruments you hit or shake. Examples: drums, cymbals, tambourine.'),
              ex('You strum a guitar (strings), blow a flute (woodwinds), buzz a trumpet (brass), and beat a drum (percussion)!'),
              ff('Did you know? The piano has strings inside! When you press a key, a small hammer hits a string to make sound.'),
              q('Which family does the violin belong to?', ['Brass', 'Percussion', 'Strings', 'Woodwinds'], 2),
              q('Which family does the drum belong to?', ['Strings', 'Percussion', 'Brass', 'Woodwinds'], 1),
              q('Which family do you blow into?', ['Percussion', 'Strings', 'Woodwinds', 'Brass'], 2),
              s('Four instrument families: Strings (pluck/bow), Woodwinds (blow), Brass (buzz lips), Percussion (hit/shake). Piano = strings!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'el-esp', name: 'Edukasyon sa Pagpapakatao', emoji: '🤝', color: 'from-teal-400 to-green-400',
    chapters: [
      {
        id: 'el-esp-1', title: 'Mabuting Ugali', emoji: '😊',
        pages: [
          {
            title: 'Pagiging Mabuting Tao',
            blocks: [
              h('Ano ang Mabuting Ugali?'),
              p('Ang mabuting ugali ay ang pagiging mabuti sa sarili, sa kapwa, at sa paligid. Ito ay nagpapakita ng pagmamahal at pagrespeto.'),
              kt('Mabuting Ugali', 'Ang pagiging mabuti sa sarili, sa kapwa, at sa paligid.'),
              kt('Pagrespeto', 'Pagpapahalaga sa karapatan at damdamin ng iba.'),
              kt('Pagmamahal', 'Ang pag-aalaga at pagiging malambit sa kapwa.'),
              ex('Ang pagiging magalang, matulungin, at maaasahan ay mga halimbawa ng mabuting ugali.'),
              ff('Alam mo ba? Ang mga bata na may mabuting ugali ay mas masaya at mas maraming kaibigan!'),
              q('Ano ang tawag sa pagiging mabuti sa kapwa?', ['Pagiging makasarili', 'Mabuting ugali', 'Kawalan', 'Pag-asa'], 1),
              q('Ano ang pagrespeto?', ['Pabayaan ang lahat', 'Pagpapahalaga sa karapatan ng iba', 'Pagiging malupit', 'Pag-asa'], 1),
              q('Anong halimbawa ng mabuting ugali?', ['Pang-aaway', 'Pagiging magalang', 'Kawalan ng interes', 'Pagiging tamad'], 1),
              s('Mabuting ugali = mabuti sa sarili, kapwa, at paligid. Pagrespeto at pagmamahal sa iba!'),
            ],
          },
          {
            title: 'Pagsunod sa mga Patakaran',
            blocks: [
              h('Bakit May Patakaran?'),
              p('Ang mga patakaran ay ginawa upang panatilihing ligtas at maayos ang lahat. Ang pagsunod dito ay tanda ng pagrespeto.'),
              kt('Patakaran', 'Mga tuntunin o batayang sinusunod upang panatilihing maayos ang samahan o lugar.'),
              kt('Disiplina', 'Ang kakayahang sundin ang mga patakaran kahit walang nagbabantay.'),
              ex('Sa paaralan, may patakaran: dumating ng maaga, makinig sa guro, at huwag mang-away ng kaklase.'),
              tip('Ang pagsunod sa patakaran sa bahay at paaralan ay nagpapakita ng pagmamahal sa pamilya at guro!'),
              q('Bakit may mga patakaran?', ['Para makainis', 'Para panatilihing ligtas at maayos', 'Wala itong layunin', 'Para parusa'], 1),
              q('Ano ang disiplina?', ['Pagiging makasarili', 'Pagsunod sa patakaran kahit walang nagbabantay', 'Pagkakatiwalag', 'Kawalan'], 1),
              q('Ano ang dapat gawin sa paaralan?', ['Mang-away', 'Makinig sa guro', 'Huwag pumasok', 'Gumawa ng kalokohan'], 1),
              s('Patakaran = panatilihing ligtas at maayos. Disiplina = pagsunod kahit walang nagbabantay. Sundin ang patakaran sa bahay at paaralan!'),
            ],
          },
        ],
      },
    ],
  },
];

// ===================== JUNIOR HIGH =========================================

const juniorHighSubjects: TextbookSubject[] = [
  {
    id: 'jh-filipino', name: 'Filipino', emoji: '📖', color: 'from-red-400 to-orange-400',
    chapters: [
      {
        id: 'jh-fil-1', title: 'Panitikan', emoji: '📚',
        pages: [
          {
            title: 'Uri ng Panitikan',
            blocks: [
              h('Ano ang Panitikan?'),
              p('Ang panitikan ay koleksyon ng mga written works na nagpapahayag ng ideya, damdamin, at karanasan ng tao.'),
              kt('Panitikan', 'Koleksyon ng mga gawaing nakasulat na nagpapahayag ng ideya at damdamin.'),
              h('Awit at Korido'),
              p('Ang awit at korido ay dalawang uri ng tulang pasalaysay na nagmula sa Europa at dumating sa Pilipinas noong panahon ng Espanyol.'),
              kt('Awit', 'Tulang pasalaysay na may 12 pantig bawat linya. Halimbawa: Florante at Laura.'),
              kt('Korido', 'Tulang pasalaysay na may 8 pantig bawat linya. Halimbawa: Ibong Adarna.'),
              q('Ilang pantig bawat linya ang Awit?', ['8', '10', '12', '14'], 2),
              q('Ilang pantig bawat linya ang Korido?', ['6', '8', '10', '12'], 1),
            ],
          },
          {
            title: 'Maikling Kwento',
            blocks: [
              h('Ano ang Maikling Kwento?'),
              p('Ang maikling kwento isang maikling salaysay na mababasa sa isang upuan lamang. Ito ay may iisang pangunahing ideya o tema.'),
              kt('Maikling Kwento', 'Maikling salaysay na may iisang tema at mababasa sa isang upuan.'),
              h('Mga Bahagi ng Maikling Kwento'),
              p('Ang maikling kwento ay may tatlong bahagi: simula (panimula), gitna (kasukdulan), at wakas (kalutasan).'),
              ex('Simula: ipinapakilala ang mga tauhan at setting. Gitna: may tunggalian o problema. Wakas: kalutasan ng problema.'),
              kt('Tauhan', 'Mga tao o nilalang sa kwento na gumagalaw at nagsasalita.'),
              kt('Tema', 'Ang pangunahing mensahe o aral ng kwento.'),
              q('Ano ang tawag sa pangunahing mensahe ng kwento?', ['Tauhan', 'Tema', 'Setting', 'Pananaw'], 1),
              q('Ilang pangunahing bahagi ang maikling kwento?', ['2', '3', '4', '5'], 1),
              s('Panitikan: Awit (12 pantig), Korido (8 pantig), Maikling Kwento (simula-gitna-wakas, may tema at tauhan)!'),
            ],
          },
        ],
      },
      {
        id: 'jh-eng-4', title: 'Essay Writing', emoji: '✍️',
        pages: [
          {
            title: 'Types of Essays',
            blocks: [
              h('What is an Essay?'),
              p('An essay is a piece of writing that presents an argument, idea, or story. There are four main types of essays you should know.'),
              kt('Essay', 'A short piece of writing on a particular subject, presenting an argument or point of view.'),
              h('The Four Main Types'),
              kt('Narrative Essay', 'Tells a story or recounts an event. Has characters, setting, and plot. Example: "My Most Memorable Day."'),
              kt('Descriptive Essay', 'Describes a person, place, or thing using sensory details. Example: "A Day at the Beach."'),
              kt('Expository Essay', 'Explains or informs. Presents facts without opinions. Example: "How Photosynthesis Works."'),
              kt('Persuasive Essay', 'Convinces the reader to agree with your opinion. Uses evidence and arguments. Example: "Why We Should Recycle."'),
              d('✍️', 'Narrative (story), Descriptive (describe), Expository (explain), Persuasive (convince)'),
              ex('Narrative: tells a story. Descriptive: paints a picture with words. Expository: gives information. Persuasive: argues a point.'),
              q('Which essay type tells a story?', ['Descriptive', 'Narrative', 'Expository', 'Persuasive'], 1),
              q('Which essay type convinces the reader?', ['Narrative', 'Descriptive', 'Expository', 'Persuasive'], 3),
              q('Which essay type explains facts without opinions?', ['Narrative', 'Descriptive', 'Expository', 'Persuasive'], 2),
              s('Four essay types: Narrative (story), Descriptive (describe with senses), Expository (explain facts), Persuasive (convince with arguments)!'),
            ],
          },
          {
            title: 'Essay Structure',
            blocks: [
              h('The Five-Paragraph Essay'),
              p('A good essay has a clear structure: an introduction, body paragraphs, and a conclusion. The five-paragraph essay is the most common format.'),
              kt('Introduction', 'The first paragraph. It grabs the reader\'s attention and states the main idea (thesis statement).'),
              kt('Thesis Statement', 'The main argument of the essay, usually one sentence at the end of the introduction.'),
              kt('Body Paragraphs', 'The middle paragraphs (usually 3). Each one supports the thesis with evidence and examples.'),
              kt('Conclusion', 'The last paragraph. It restates the thesis and summarizes the main points. No new information!'),
              d('✍️', 'Introduction (hook + thesis) → Body 1 → Body 2 → Body 3 → Conclusion (restate + summarize)'),
              h('Writing a Good Introduction'),
              p('Start with a "hook" — a question, quote, or surprising fact. Then introduce your topic. End with your thesis statement.'),
              ex('Hook: "Did you know that plastic takes 450 years to decompose?" Thesis: "We must reduce plastic use to save our oceans."'),
              tip('Each body paragraph should start with a topic sentence that supports your thesis, followed by evidence and examples.'),
              q('What is the first paragraph of an essay called?', ['Body', 'Conclusion', 'Introduction', 'Thesis'], 2),
              q('What is the main argument of the essay called?', ['Hook', 'Thesis Statement', 'Topic Sentence', 'Conclusion'], 1),
              q('What should the conclusion do?', ['Introduce new ideas', 'Restate thesis and summarize', 'Start a new story', 'List references'], 1),
              s('Essay structure: Introduction (hook + thesis) → 3 Body Paragraphs (evidence) → Conclusion (restate + summarize). No new info in conclusion!'),
            ],
          },
        ],
      },
      {
        id: 'jh-fil-2', title: 'Wika at Komunikasyon', emoji: '🗣️',
        pages: [
          {
            title: 'Bahagi ng Pananalita',
            blocks: [
              h('Walong Bahagi ng Pananalita'),
              p('Ang wika ay may walong bahagi ng pananalita na ginagamit upang bumuo ng pangungusap.'),
              kt('Pangngalan', 'Ngalan ng tao, hayop, bagay, lugar, o konsepto.'),
              kt('Pandiwa', 'Salitang nagpapahayag ng kilos o galaw.'),
              kt('Pang-uri', 'Salitang naglalarawan ng katangian ng pangngalan.'),
              kt('Pang-abay', 'Salitang naglalarawan ng pandiwa.'),
              kt('Panghalip', 'Salitang pumapalit sa pangngalan.'),
              kt('Pangatnig', 'Salitang nag-uugnay ng dalawang salita o pangungusap.'),
              kt('Pantukoy', 'Salitang nagsisilbing pananda sa pangngalan (ang, ang mga, si, sina).'),
              kt('Pang-ugnay', 'Salitang nag-uugnay sa pangngalan sa ibang salita sa pangungusap.'),
              q('Ano ang tawag sa salitang nagpapahayag ng kilos?', ['Pangngalan', 'Pandiwa', 'Pang-uri', 'Pang-abay'], 1),
              q('Ano ang tawag sa salitang pumapalit sa pangngalan?', ['Panghalip', 'Pangatnig', 'Pantukoy', 'Pang-ugnay'], 0),
              s('Walong bahagi: Pangngalan, Pandiwa, Pang-uri, Pang-abay, Panghalip, Pangatnig, Pantukoy, Pang-ugnay!'),
            ],
          },
        ],
      },
      {
        id: 'jh-fil-3', title: 'Mga Idyoma', emoji: '💭',
        pages: [
          {
            title: 'Kahulugan ng Idyoma',
            blocks: [
              h('Ano ang Idyoma?'),
              p('Ang idyoma ay grupo ng mga salita na may ibang kahulugan kaysa sa literal na kahulugan nito. Hindi ito literal na sinusulat.'),
              kt('Idyoma', 'Salita o parirala na may ibang kahulugan kaysa sa literal na ibig sabihin nito.'),
              ff('Alam mo ba? Ang mga idyoma ay nagpapakulay sa ating wika at nagpapabuhay ng ating mga kwento!'),
              h('Mga Halimbawa ng Idyoma'),
              kt('Balat sibuyas', 'Madaling magalit o masaktan ang damdamin.'),
              kt('Maitim ang budhi', 'Masama ang loob o walang konsensya.'),
              kt('Isang kahig isang tuka', 'Pang-araw-araw na pamumuhay, bihirang makakain.'),
              kt('Nagbibilang ng poste', 'Walang ginagawa o walang trabaho.'),
              kt('Kapit sa patalim', 'Walang choice kundi gawin ang isang bagay dahil sa pangangailangan.'),
              ex('Literal: "balat ng sibuyas" = onion skin. Idyoma: "balat sibuyas" = madaling magalit!'),
              q('Ano ang ibig sabihin ng "balat sibuyas"?', ['Masipag', 'Madaling magalit', 'Matalino', 'Malakas'], 1),
              q('Ano ang ibig sabihin ng "nagbibilang ng poste"?', ['Mabilis maglakad', 'Walang ginagawa', 'Maraming poste', 'Matangkad'], 1),
              q('Ano ang ibig sabihin ng "isang kahig isang tuka"?', ['Mayaman', 'Pang-araw-araw na pamumuhay', 'Maraming manok', 'Masarap'], 1),
              s('Ang idyoma ay hindi literal — ang kahulugan nito ay nasa ibang salita. Halimbawa: "balat sibuyas" = madaling magalit!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-english', name: 'English', emoji: '🔤', color: 'from-blue-400 to-cyan-400',
    chapters: [
      {
        id: 'jh-eng-1', title: 'Literature', emoji: '📖',
        pages: [
          {
            title: 'Philippine Literature in English',
            blocks: [
              h('Philippine Literature'),
              p('Philippine literature in English began during the American colonial period. Filipino writers started writing stories, poems, and essays in English.'),
              kt('Literature', 'Written works that express ideas, emotions, and experiences.'),
              h('Notable Filipino Writers in English'),
              p('Nick Joaquin wrote "The Woman Who Had Two Navels." Manuel Arguilla wrote "How My Brother Leon Brought Home a Wife." Carlos Bulosan wrote "America Is in the Heart."'),
              kt('Nick Joaquin', 'Famous Filipino writer known for "The Woman Who Had Two Navels."'),
              kt('Manuel Arguilla', 'Famous Filipino writer known for "How My Brother Leon Brought Home a Wife."'),
              q('Who wrote "The Woman Who Had Two Navels"?', ['Manuel Arguilla', 'Nick Joaquin', 'Carlos Bulosan', 'Jose Rizal'], 1),
              q('Who wrote "How My Brother Leon Brought Home a Wife"?', ['Nick Joaquin', 'Manuel Arguilla', 'Carlos Bulosan', 'Paz Marquez Benitez'], 1),
            ],
          },
          {
            title: 'Elements of a Story',
            blocks: [
              h('Story Elements'),
              p('Every story has key elements that make it complete: setting, characters, plot, theme, and point of view.'),
              kt('Setting', 'The time and place where the story happens.'),
              kt('Character', 'The people, animals, or beings in the story.'),
              kt('Plot', 'The sequence of events in the story — beginning, middle, and end.'),
              kt('Theme', 'The main message or lesson of the story.'),
              kt('Point of View', 'The perspective from which the story is told (first person, second person, third person).'),
              ex('First person: "I went to the store." Third person: "She went to the store."'),
              q('What is the time and place of a story called?', ['Theme', 'Setting', 'Plot', 'Character'], 1),
              q('What is the main message of a story called?', ['Theme', 'Plot', 'Setting', 'Character'], 0),
              s('Story elements: Setting (time/place), Character (who), Plot (events), Theme (message), Point of View (perspective)!'),
            ],
          },
        ],
      },
      {
        id: 'jh-eng-2', title: 'Grammar and Usage', emoji: '✏️',
        pages: [
          {
            title: 'Subject-Verb Agreement',
            blocks: [
              h('What is Subject-Verb Agreement?'),
              p('Subject-verb agreement means the subject and verb in a sentence must match in number. If the subject is singular, the verb must be singular. If the subject is plural, the verb must be plural.'),
              kt('Subject-Verb Agreement', 'The rule that the subject and verb must match in number (singular or plural).'),
              ex('Singular: The cat runs. Plural: The cats run.'),
              h('Rules to Remember'),
              p('1. Singular subjects take singular verbs. 2. Plural subjects take plural verbs. 3. When two subjects are joined by "and," use a plural verb. 4. When two subjects are joined by "or," the verb agrees with the closer subject.'),
              ex('The dog and cat are friends. (plural) Either the dog or the cats are here. (plural, agrees with "cats")'),
              q('Which is correct?', ['The dogs runs fast.', 'The dogs run fast.', 'The dogs running fast.', 'The dogs runned fast.'], 1),
              q('Which is correct?', ['She walk to school.', 'She walks to school.', 'She walking to school.', 'She walkes to school.'], 1),
              s('Subject and verb must agree: singular subject = singular verb, plural subject = plural verb!'),
            ],
          },
        ],
      },
      {
        id: 'jh-eng-3', title: 'Reading Comprehension', emoji: '📖',
        pages: [
          {
            title: 'Understanding What You Read',
            blocks: [
              h('What is Reading Comprehension?'),
              p('Reading comprehension means understanding what you read. It is not just reading the words — it is understanding the meaning behind them.'),
              kt('Reading Comprehension', 'Understanding and interpreting what you read.'),
              h('Before You Read'),
              p('Before reading, look at the title and headings. Think about what you already know about the topic. This helps your brain prepare.'),
              tip('Before reading a text, ask yourself: "What do I already know about this topic?"'),
              h('While You Read'),
              p('While reading, ask questions: What is happening? Why? Who are the characters? What is the main idea?'),
              kt('Main Idea', 'The most important point of a text.'),
              kt('Supporting Details', 'Facts and information that explain the main idea.'),
              h('After You Read'),
              p('After reading, summarize what you read in your own words. Ask: What did I learn? What was the message?'),
              ff('Did you know? Good readers make pictures in their mind while reading — it helps them remember the story!'),
              q('What is the most important point of a text called?', ['Title', 'Main Idea', 'Detail', 'Summary'], 1),
              q('What should you do before reading?', ['Skip to the end', 'Look at the title and headings', 'Close the book', 'Nothing'], 1),
              q('What are facts that explain the main idea called?', ['Opinions', 'Supporting Details', 'Headings', 'Conclusions'], 1),
              s('Reading comprehension: Before (preview), While (ask questions, find main idea), After (summarize). Main Idea = most important point!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-math', name: 'Math', emoji: '🔢', color: 'from-green-400 to-emerald-400',
    chapters: [
      {
        id: 'jh-mat-1', title: 'Integers', emoji: '➕',
        pages: [
          {
            title: 'Positive and Negative Numbers',
            blocks: [
              h('What are Integers?'),
              p('Integers are whole numbers that can be positive, negative, or zero. They include numbers like -3, -2, -1, 0, 1, 2, 3.'),
              kt('Integer', 'A whole number that can be positive, negative, or zero.'),
              kt('Positive Number', 'A number greater than zero, like 1, 2, 3.'),
              kt('Negative Number', 'A number less than zero, like -1, -2, -3.'),
              d('➕➖', 'Positive numbers are right of 0, negative numbers are left of 0 on a number line'),
              h('Adding Integers'),
              p('Same signs: add the numbers and keep the sign. Different signs: subtract the smaller from the larger and keep the sign of the larger.'),
              ex('Same: 3 + 4 = 7, -3 + (-4) = -7. Different: 5 + (-2) = 3, -5 + 2 = -3'),
              q('What is 5 + (-3)?', ['2', '3', '8', '-8'], 0),
              q('What is -4 + (-2)?', ['-2', '-6', '2', '6'], 1),
              q('What is -7 + 3?', ['-4', '-10', '4', '10'], 0),
              s('Integers: positive (right of 0), negative (left of 0), zero. Same signs add, different signs subtract!'),
            ],
          },
          {
            title: 'Multiplying Integers',
            blocks: [
              h('Rules for Multiplication'),
              p('Same signs = positive answer. Different signs = negative answer.'),
              ex('Positive × Positive = Positive: 3 × 4 = 12. Negative × Negative = Positive: (-3) × (-4) = 12. Positive × Negative = Negative: 3 × (-4) = -12.'),
              q('What is (-3) × (-5)?', ['-15', '-8', '8', '15'], 3),
              q('What is 4 × (-6)?', ['24', '-24', '10', '-10'], 1),
              s('Multiplying integers: same signs = positive, different signs = negative!'),
            ],
          },
        ],
      },
      {
        id: 'jh-mat-2', title: 'Algebra Basics', emoji: '🔤',
        pages: [
          {
            title: 'Variables and Equations',
            blocks: [
              h('What is Algebra?'),
              p('Algebra uses letters (variables) to represent numbers we don\'t know yet. We solve equations to find the value of the variable.'),
              kt('Variable', 'A letter that represents an unknown number, like x or y.'),
              kt('Equation', 'A math sentence with an equals sign, like x + 3 = 7.'),
              kt('Constant', 'A number that does not change, like 3 or 7.'),
              h('Solving Equations'),
              p('To solve an equation, we find the value of the variable. We do the same operation on both sides to isolate the variable.'),
              ex('Solve x + 3 = 7: Subtract 3 from both sides. x = 7 - 3 = 4. So x = 4!'),
              ex('Solve 2x = 10: Divide both sides by 2. x = 10 ÷ 2 = 5. So x = 5!'),
              q('Solve: x + 5 = 12', ['5', '7', '12', '17'], 1),
              q('Solve: 3x = 15', ['3', '5', '12', '15'], 1),
              q('Solve: x - 4 = 10', ['6', '10', '14', '40'], 2),
              s('Algebra: variables = unknown numbers, equations have =, solve by doing the same operation on both sides!'),
            ],
          },
        ],
      },
      {
        id: 'jh-mat-3', title: 'Geometry', emoji: '📐',
        pages: [
          {
            title: 'Angles and Triangles',
            blocks: [
              h('Types of Angles'),
              p('An angle is formed when two lines meet at a point. Angles are measured in degrees.'),
              kt('Acute Angle', 'An angle less than 90 degrees.'),
              kt('Right Angle', 'An angle exactly 90 degrees, like the corner of a square.'),
              kt('Obtuse Angle', 'An angle greater than 90 but less than 180 degrees.'),
              kt('Straight Angle', 'An angle exactly 180 degrees, like a straight line.'),
              d('📐', 'Acute (< 90°), Right (90°), Obtuse (90-180°), Straight (180°)'),
              h('Types of Triangles'),
              p('Triangles can be classified by their angles or sides.'),
              kt('Equilateral Triangle', 'All three sides are equal, all angles are 60°.'),
              kt('Isosceles Triangle', 'Two sides are equal.'),
              kt('Scalene Triangle', 'No sides are equal.'),
              kt('Right Triangle', 'Has one right angle (90°).'),
              q('What angle is exactly 90 degrees?', ['Acute', 'Right', 'Obtuse', 'Straight'], 1),
              q('Which triangle has all equal sides?', ['Isosceles', 'Scalene', 'Equilateral', 'Right'], 2),
              q('An angle of 45° is what type?', ['Acute', 'Right', 'Obtuse', 'Straight'], 0),
              s('Angles: Acute (<90°), Right (90°), Obtuse (90-180°), Straight (180°). Triangles: Equilateral, Isosceles, Scalene, Right!'),
            ],
          },
        ],
      },
      {
        id: 'jh-mat-4', title: 'Ratios and Proportions', emoji: '⚖️',
        pages: [
          {
            title: 'Understanding Ratios',
            blocks: [
              h('What is a Ratio?'),
              p('A ratio compares two or more quantities. It shows how much of one thing there is compared to another.'),
              kt('Ratio', 'A comparison of two or more quantities.'),
              ex('In a class with 12 boys and 8 girls, the ratio of boys to girls is 12:8, which simplifies to 3:2.'),
              h('Writing Ratios'),
              p('Ratios can be written three ways: 3:2, 3/2, or "3 to 2". They all mean the same thing!'),
              ex('The ratio 6:4 can be simplified by dividing both by 2: 6 ÷ 2 = 3, 4 ÷ 2 = 2. So 6:4 = 3:2.'),
              kt('Simplifying Ratios', 'Divide both numbers by their greatest common factor (GCF).'),
              q('Simplify the ratio 10:5', ['2:1', '1:2', '5:10', '10:5'], 0),
              q('In a basket with 6 apples and 3 oranges, what is the ratio of apples to oranges?', ['2:1', '1:2', '3:6', '6:3'], 3),
              q('What does a ratio compare?', ['One thing', 'Two or more quantities', 'Only numbers', 'Only shapes'], 1),
              s('Ratios compare quantities. Write as 3:2, 3/2, or "3 to 2". Simplify by dividing both by their GCF!'),
            ],
          },
          {
            title: 'Proportions',
            blocks: [
              h('What is a Proportion?'),
              p('A proportion is an equation that says two ratios are equal. If a/b = c/d, then a:b and c:d are proportional.'),
              kt('Proportion', 'An equation stating that two ratios are equal.'),
              ex('2/4 = 3/6 is a proportion because both simplify to 1/2.'),
              h('Solving Proportions'),
              p('Use cross multiplication: if a/b = c/d, then a × d = b × c. Solve for the unknown.'),
              ex('Solve x/4 = 3/6. Cross multiply: 6x = 12. Divide: x = 2. So 2/4 = 3/6!'),
              ff('Did you know? Proportions are used in cooking, map-making, and even in art to scale images correctly!'),
              q('Solve: x/3 = 4/6', ['1', '2', '3', '4'], 1),
              q('Is 2/3 = 4/6 a proportion?', ['Yes', 'No', 'Maybe', 'Cannot tell'], 0),
              q('What is cross multiplication?', ['a/b = c/d means a×d = b×c', 'Adding both sides', 'Subtracting both sides', 'Dividing both sides'], 0),
              s('Proportion = two equal ratios. Cross multiply to solve: a/b = c/d → a×d = b×c. Used in cooking, maps, and art!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-science', name: 'Science', emoji: '🔬', color: 'from-purple-400 to-indigo-400',
    chapters: [
      {
        id: 'jh-sci-1', title: 'The Solar System', emoji: '🌍',
        pages: [
          {
            title: 'Planets and the Sun',
            blocks: [
              h('Our Solar System'),
              p('The solar system consists of the Sun and everything that orbits around it, including 8 planets, moons, asteroids, and comets.'),
              kt('Solar System', 'The Sun and all objects that orbit around it.'),
              h('The Eight Planets'),
              p('In order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.'),
              d('☀️🌍', 'Sun → Mercury → Venus → Earth → Mars → Jupiter → Saturn → Uranus → Neptune'),
              kt('Inner Planets', 'Mercury, Venus, Earth, Mars — rocky planets close to the Sun.'),
              kt('Outer Planets', 'Jupiter, Saturn, Uranus, Neptune — gas giants far from the Sun.'),
              h('The Sun'),
              p('The Sun is a star at the center of our solar system. It gives us light and heat. It is much bigger than all the planets combined.'),
              q('How many planets are in our solar system?', ['7', '8', '9', '10'], 1),
              q('Which planet is closest to the Sun?', ['Earth', 'Venus', 'Mercury', 'Mars'], 2),
              q('Which is the largest planet?', ['Earth', 'Mars', 'Jupiter', 'Saturn'], 2),
              s('Solar system: Sun + 8 planets. Inner (rocky): Mercury, Venus, Earth, Mars. Outer (gas): Jupiter, Saturn, Uranus, Neptune!'),
            ],
          },
        ],
      },
      {
        id: 'jh-sci-2', title: 'Cells and Life', emoji: '🧬',
        pages: [
          {
            title: 'The Cell',
            blocks: [
              h('What is a Cell?'),
              p('The cell is the basic unit of life. All living things are made of cells. Some organisms have one cell, while others have millions.'),
              kt('Cell', 'The basic building block of all living things.'),
              h('Parts of a Cell'),
              p('A cell has many parts, each with a special job.'),
              kt('Cell Membrane', 'The outer covering that protects the cell and controls what goes in and out.'),
              kt('Nucleus', 'The control center of the cell. It contains DNA.'),
              kt('Cytoplasm', 'The jelly-like substance inside the cell where everything floats.'),
              kt('Mitochondria', 'The "powerhouse" of the cell — it produces energy.'),
              d('🧬', 'Cell Membrane (outer), Nucleus (control center), Cytoplasm (jelly), Mitochondria (powerhouse)'),
              h('Two Types of Cells'),
              p('Prokaryotic cells have no nucleus (like bacteria). Eukaryotic cells have a nucleus (like plant and animal cells).'),
              q('What is the control center of the cell?', ['Cytoplasm', 'Nucleus', 'Membrane', 'Mitochondria'], 1),
              q('What is the powerhouse of the cell?', ['Nucleus', 'Mitochondria', 'Membrane', 'Cytoplasm'], 1),
              q('What is the basic unit of life?', ['Atom', 'Cell', 'Tissue', 'Organ'], 1),
              s('Cell = basic unit of life. Parts: Membrane (cover), Nucleus (control), Cytoplasm (jelly), Mitochondria (energy)!'),
            ],
          },
        ],
      },
      {
        id: 'jh-sci-3', title: 'Ecosystems', emoji: '🌳',
        pages: [
          {
            title: 'How Ecosystems Work',
            blocks: [
              h('What is an Ecosystem?'),
              p('An ecosystem is a community of living things (plants, animals, microbes) interacting with their non-living environment (soil, water, air, sunlight).'),
              kt('Ecosystem', 'A community of living things interacting with their non-living environment.'),
              kt('Biotic Factors', 'The living parts of an ecosystem — plants, animals, bacteria.'),
              kt('Abiotic Factors', 'The non-living parts of an ecosystem — sunlight, water, soil, air, temperature.'),
              h('Food Chains'),
              p('A food chain shows how energy flows from one organism to another. It starts with the Sun, then producers, then consumers.'),
              kt('Producer', 'Organisms that make their own food using sunlight — plants, algae.'),
              kt('Consumer', 'Organisms that eat other organisms — animals, humans.'),
              kt('Decomposer', 'Organisms that break down dead matter — fungi, bacteria.'),
              d('🌳', 'Sun → Producer (plant) → Consumer (herbivore) → Consumer (carnivore) → Decomposer'),
              ex('Grass (producer) → Grasshopper (consumer) → Frog (consumer) → Snake (consumer) → Fungi (decomposer).'),
              ff('Did you know? Only about 10% of the energy passes from one level of a food chain to the next. The rest is lost as heat!'),
              q('What organism makes its own food using sunlight?', ['Consumer', 'Producer', 'Decomposer', 'Predator'], 1),
              q('What breaks down dead matter in an ecosystem?', ['Producer', 'Consumer', 'Decomposer', 'Sun'], 2),
              q('Which is an abiotic factor?', ['Plants', 'Animals', 'Sunlight', 'Bacteria'], 2),
              s('Ecosystem = living (biotic) + non-living (abiotic). Food chain: Sun → Producer → Consumer → Decomposer. Only 10% energy passes each level!'),
            ],
          },
        ],
      },
      {
        id: 'jh-sci-4', title: 'Earthquakes and Volcanoes', emoji: '🌋',
        pages: [
          {
            title: 'Plate Tectonics',
            blocks: [
              h('What are Tectonic Plates?'),
              p('Earth\'s outer shell (the crust) is not one piece — it is made of large pieces called tectonic plates. These plates slowly move on top of the mantle.'),
              kt('Tectonic Plates', 'Large pieces of Earth\'s crust that slowly move on the mantle.'),
              kt('Mantle', 'The thick layer of hot rock below the crust where plates slide.'),
              d('🌋', 'Earth\'s crust = puzzle pieces (tectonic plates) that slowly move'),
              h('Plate Boundaries'),
              p('Where two plates meet is called a boundary. There are three main types.'),
              kt('Convergent Boundary', 'Two plates push together. This can form mountains or cause one plate to sink below the other.'),
              kt('Divergent Boundary', 'Two plates pull apart. Magma rises to fill the gap, creating new crust.'),
              kt('Transform Boundary', 'Two plates slide past each other. This causes earthquakes.'),
              ex('The Himalayas formed when India pushed into Asia (convergent). The Mid-Atlantic Ridge forms where plates pull apart (divergent).'),
              ff('Did you know? The tectonic plates move only a few centimeters per year — about as fast as your fingernails grow!'),
              q('What happens at a convergent boundary?', ['Plates pull apart', 'Plates push together', 'Plates slide past', 'Nothing'], 1),
              q('What happens at a transform boundary?', ['Plates push together', 'Plates pull apart', 'Plates slide past each other', 'Mountains form'], 2),
              q('How fast do tectonic plates move?', ['Meters per day', 'Centimeters per year', 'Kilometers per hour', 'They do not move'], 1),
              s('Tectonic plates: Convergent (push together → mountains), Divergent (pull apart → new crust), Transform (slide past → earthquakes). Move a few cm/year!'),
            ],
          },
          {
            title: 'Earthquakes',
            blocks: [
              h('What is an Earthquake?'),
              p('An earthquake is a sudden shaking of the ground caused when tectonic plates suddenly slip or break at a fault line.'),
              kt('Earthquake', 'Sudden shaking of the ground caused by plate movement at a fault.'),
              kt('Fault Line', 'A crack in the Earth\'s crust where plates meet and move.'),
              kt('Seismic Waves', 'Waves of energy that travel through the Earth during an earthquake.'),
              h('Measuring Earthquakes'),
              p('Earthquakes are measured using a seismograph. The magnitude (strength) is measured on the Richter scale or Moment Magnitude scale.'),
              kt('Seismograph', 'An instrument that measures and records earthquakes.'),
              kt('Richter Scale', 'A scale that measures the strength (magnitude) of an earthquake.'),
              d('🌋', 'Magnitude 1-3: barely felt. 4-5: noticeable. 6-7: damaging. 8+: catastrophic!'),
              ex('A magnitude 7 earthquake can cause serious damage to buildings. A magnitude 3 is barely felt by people.'),
              tip('During an earthquake: Drop, Cover, and Hold On! Get under a sturdy table and protect your head!'),
              ff('Did you know? The Philippines is in the Pacific Ring of Fire, an area with many earthquakes and volcanoes!'),
              q('What causes an earthquake?', ['Rain', 'Tectonic plate movement at a fault', 'Wind', 'Ocean waves'], 1),
              q('What instrument measures earthquakes?', ['Thermometer', 'Seismograph', 'Barometer', 'Telescope'], 1),
              q('What should you do during an earthquake?', ['Run outside', 'Drop, Cover, and Hold On', 'Stand still', 'Jump up and down'], 1),
              s('Earthquakes: caused by plate movement at faults. Measured by seismograph on Richter scale. Drop, Cover, Hold On during an earthquake!'),
            ],
          },
          {
            title: 'Volcanoes',
            blocks: [
              h('What is a Volcano?'),
              p('A volcano is an opening in the Earth\'s crust where molten rock (magma), gases, and ash escape from deep underground.'),
              kt('Volcano', 'An opening in Earth\'s crust where magma, gases, and ash escape.'),
              kt('Magma', 'Molten (melted) rock deep underground.'),
              kt('Lava', 'Magma that has erupted from a volcano onto the surface.'),
              kt('Ash', 'Fine particles of rock blown into the air during an eruption.'),
              h('Types of Volcanoes'),
              p('There are three main types of volcanoes, classified by their shape and how they erupt.'),
              kt('Shield Volcano', 'Broad, gentle slopes. Lava flows slowly and far. Example: Mauna Loa in Hawaii.'),
              kt('Composite Volcano (Stratovolcano)', 'Steep, tall, and explosive. Layers of lava and ash. Example: Mayon Volcano in Albay.'),
              kt('Cinder Cone Volcano', 'Small, steep, made of volcanic fragments. Example: Taal Volcano.'),
              d('🌋', 'Shield (broad, slow), Composite (steep, explosive), Cinder Cone (small, steep)'),
              ex('Mayon Volcano in Albay is famous for its perfect cone shape. It is an active composite volcano!'),
              ff('Did you know? Mayon Volcano in Albay has the world\'s most perfect cone shape! It is one of the most active volcanoes in the Philippines!'),
              q('What is magma called when it reaches the surface?', ['Ash', 'Lava', 'Rock', 'Smoke'], 1),
              q('Which type of volcano has broad, gentle slopes?', ['Composite', 'Cinder Cone', 'Shield', 'All three'], 2),
              q('Which Philippine volcano is famous for its perfect cone shape?', ['Taal', 'Pinatubo', 'Mayon', 'Hibok-Hibok'], 2),
              s('Volcanoes: Magma (underground) → Lava (surface). Types: Shield (broad), Composite (steep, explosive), Cinder Cone (small). Mayon = perfect cone!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-ap', name: 'Aralin Panlipunan', emoji: '🗺️', color: 'from-amber-400 to-yellow-400',
    chapters: [
      {
        id: 'jh-ap-1', title: 'Kasaysayan ng Pilipinas', emoji: '🏛️',
        pages: [
          {
            title: 'Mga Panahon ng Kasaysayan',
            blocks: [
              h('Panahon ng Espanyol'),
              p('Ang panahon ng Espanyol sa Pilipinas ay tumagal ng 333 taon, mula 1565 hanggang 1898. Dito ipinakilala ang Kristiyanismo at sentralisadong pamahalaan.'),
              kt('Panahon ng Espanyol', '333 taon ng kolonyalismo ng Espanya sa Pilipinas (1565-1898).'),
              h('Panahon ng Amerikano'),
              p('Ang panahon ng Amerikano ay mula 1898 hanggang 1946. Dito ipinakilala ang edukasyon sa Ingles at demokrasya.'),
              kt('Panahon ng Amerikano', 'Panahon ng kolonyalismo ng Amerika sa Pilipinas (1898-1946).'),
              h('Kalayaan ng Pilipinas'),
              p('Nakamit ng Pilipinas ang kalayaan noong Hulyo 4, 1946 mula sa Amerika.'),
              d('🇵🇭', 'Kalayaan ng Pilipinas: Hulyo 4, 1946'),
              q('Ilang taon tinagal ang panahon ng Espanyol?', ['200', '300', '333', '400'], 2),
              q('Kailan nakamit ang kalayaan mula sa Amerika?', ['Hulyo 4, 1946', 'Hunyo 12, 1898', 'Agosto 13, 1898', 'Disyembre 30, 1896'], 0),
              s('Panahon ng Espanyol (1565-1898, 333 taon), Panahon ng Amerikano (1898-1946), Kalayaan: Hulyo 4, 1946!'),
            ],
          },
        ],
      },
      {
        id: 'jh-ap-2', title: 'Heograpiya ng Pilipinas', emoji: '🗺️',
        pages: [
          {
            title: 'Lupain at Tubig ng Pilipinas',
            blocks: [
              h('Kinalalagyan ng Pilipinas'),
              p('Ang Pilipinas ay isang bansa sa Timog-Silangang Asya. Binubuo ito ng mahigit 7,600 na isla sa kanluran ng Karagatang Pasipiko.'),
              kt('Kapuluan', 'Grupo ng mga isla. Ang Pilipinas ay isang kapuluan na may 7,641 na isla.'),
              kt('Luzon', 'Ang pinakamalaking isla sa hilaga. Dito matatagpuan ang Maynila.'),
              kt('Visayas', 'Grupo ng mga isla sa gitna ng Pilipinas.'),
              kt('Mindanao', 'Ang pangalawang pinakamalaking isla sa timog.'),
              d('🗺️', 'Pilipinas = Luzon (hilaga) + Visayas (gitna) + Mindanao (timog)'),
              h('Klima'),
              p('May dalawang panahon ang Pilipinas: tag-ulan (Hunyo-Oktubre) at tag-araw (Nobyembre-Mayo). Mainit at mahalumigmig ang klima buong taon.'),
              kt('Tag-ulan', 'Panahon ng pag-ulan mula Hunyo hanggang Oktubre.'),
              kt('Tag-araw', 'Panahon ng walang ulan mula Nobyembre hanggang Mayo.'),
              ff('Alam mo ba? Ang Pilipinas ay nasa "Ring of Fire" — isang lugar kung saan maraming bulkan at lindol!'),
              q('Ilang isla ang bumubuo sa Pilipinas?', ['1,000', '3,000', '7,641', '10,000'], 2),
              q('Ano ang pinakamalaking isla sa hilaga?', ['Visayas', 'Mindanao', 'Luzon', 'Palawan'], 2),
              q('Ano ang panahon ng pag-ulan sa Pilipinas?', ['Nobyembre-Mayo', 'Hunyo-Oktubre', 'Lahat ng buwan', 'Wala'], 1),
              s('Pilipinas: 7,641 na isla sa 3 grupo — Luzon, Visayas, Mindanao. Klima: tag-ulan (Hunyo-Okt) at tag-araw (Nob-May). Nasa Ring of Fire!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-tle', name: 'TLE', emoji: '🔧', color: 'from-orange-400 to-red-400',
    chapters: [
      {
        id: 'jh-tle-1', title: 'Basic Cooking', emoji: '🍳',
        pages: [
          {
            title: 'Kitchen Safety and Tools',
            blocks: [
              h('Kitchen Safety'),
              p('Safety in the kitchen is very important. Always wash your hands, keep knives away from edges, and be careful with hot surfaces.'),
              kt('Kitchen Safety', 'Practices that prevent accidents and injuries in the kitchen.'),
              h('Basic Kitchen Tools'),
              p('Different tools are used for different cooking tasks.'),
              kt('Knife', 'Used for cutting and chopping food.'),
              kt('Cutting Board', 'A flat surface for cutting food safely.'),
              kt('Measuring Cup', 'Used to measure liquid and dry ingredients.'),
              kt('Mixing Bowl', 'A bowl used for mixing ingredients together.'),
              d('🍳', 'Knife, Cutting Board, Measuring Cup, Mixing Bowl'),
              q('What do you use to cut food?', ['Measuring Cup', 'Knife', 'Mixing Bowl', 'Plate'], 1),
              q('What do you use to measure ingredients?', ['Knife', 'Cutting Board', 'Measuring Cup', 'Fork'], 2),
              s('Kitchen safety first! Always wash hands, use tools properly, and be careful with hot surfaces!'),
            ],
          },
        ],
      },
      {
        id: 'jh-tle-2', title: 'Basic Sewing', emoji: '🧵',
        pages: [
          {
            title: 'Sewing Tools and Stitches',
            blocks: [
              h('Basic Sewing Tools'),
              p('Sewing is the art of joining fabric together using a needle and thread. It is a useful life skill!'),
              kt('Needle', 'A thin, sharp metal tool used to push thread through fabric.'),
              kt('Thread', 'A thin strand of cotton or polyester used to join fabric.'),
              kt('Pin', 'A small metal tool that holds fabric pieces together temporarily.'),
              kt('Scissors', 'Used to cut fabric and thread cleanly.'),
              d('🧵', 'Needle + Thread + Fabric = Sewing!'),
              h('Basic Stitches'),
              kt('Running Stitch', 'The simplest stitch — push the needle up and down through the fabric in a straight line.'),
              kt('Backstitch', 'A stronger stitch where you go back one stitch length each time for durability.'),
              kt('Hem Stitch', 'Used to fold and secure the edge of fabric so it does not fray.'),
              ex('Running stitch: in-out-in-out in a straight line. Backstitch: go forward, then back one stitch, then forward again.'),
              tip('Always use a thimble to protect your finger when pushing the needle through thick fabric!'),
              q('What tool do you use to push thread through fabric?', ['Pin', 'Needle', 'Scissors', 'Ruler'], 1),
              q('What is the simplest stitch called?', ['Backstitch', 'Running Stitch', 'Hem Stitch', 'Cross stitch'], 1),
              q('What holds fabric pieces together temporarily?', ['Thread', 'Needle', 'Pin', 'Thimble'], 2),
              s('Sewing tools: Needle, Thread, Pin, Scissors. Stitches: Running (simple), Backstitch (strong), Hem (edge). Use a thimble for safety!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-mapeh', name: 'MAPEH', emoji: '🎨', color: 'from-pink-400 to-rose-400',
    chapters: [
      {
        id: 'jh-mapeh-1', title: 'Music and Arts', emoji: '🎵',
        pages: [
          {
            title: 'Elements of Music',
            blocks: [
              h('What is Music?'),
              p('Music is the art of combining sounds to create something beautiful. It has several key elements.'),
              kt('Rhythm', 'The pattern of beats or timing in music.'),
              kt('Melody', 'The main tune — a series of notes that sound pleasant together.'),
              kt('Harmony', 'When two or more notes sound at the same time and blend well.'),
              kt('Tempo', 'The speed of the music — fast, slow, or medium.'),
              kt('Dynamics', 'The volume of music — loud, soft, or in between.'),
              d('🎵', 'Rhythm (beat), Melody (tune), Harmony (blend), Tempo (speed), Dynamics (volume)'),
              q('What is the speed of music called?', ['Rhythm', 'Melody', 'Tempo', 'Harmony'], 2),
              q('What is the main tune of music called?', ['Rhythm', 'Melody', 'Dynamics', 'Tempo'], 1),
              s('Music elements: Rhythm (beat), Melody (tune), Harmony (blend), Tempo (speed), Dynamics (volume)!'),
            ],
          },
        ],
      },
      {
        id: 'jh-mapeh-2', title: 'Physical Education', emoji: '⚽',
        pages: [
          {
            title: 'Physical Fitness',
            blocks: [
              h('What is Physical Fitness?'),
              p('Physical fitness means your body is healthy and strong enough to do daily activities without getting too tired.'),
              kt('Physical Fitness', 'The ability of your body to do daily activities with energy and without getting too tired.'),
              h('Components of Fitness'),
              kt('Cardiovascular Endurance', 'How well your heart and lungs work during long activities like running or swimming.'),
              kt('Muscular Strength', 'How strong your muscles are — lifting, pushing, pulling.'),
              kt('Flexibility', 'How far your joints can move — stretching, bending.'),
              kt('Body Composition', 'The ratio of fat to muscle, bone, and water in your body.'),
              d('🏃', 'Endurance (heart/lungs), Strength (muscles), Flexibility (joints), Body Composition (fat/muscle)'),
              h('Why Exercise Matters'),
              p('Regular exercise keeps your heart healthy, builds strong muscles, improves mood, and helps you sleep better.'),
              ex('30 minutes of exercise every day: jogging, dancing, playing basketball, or even walking!'),
              ff('Did you know? Exercise releases endorphins — chemicals in your brain that make you feel happy!'),
              tip('Warm up for 5 minutes before exercising and cool down for 5 minutes after to prevent injuries!'),
              q('Which fitness component involves heart and lungs?', ['Flexibility', 'Cardiovascular Endurance', 'Body Composition', 'Strength'], 1),
              q('What is flexibility?', ['How strong you are', 'How far your joints can move', 'How fast you run', 'Your weight'], 1),
              q('What should you do before exercising?', ['Eat a big meal', 'Warm up for 5 minutes', 'Skip it', 'Sleep'], 1),
              s('Fitness: Endurance (heart/lungs), Strength (muscles), Flexibility (joints), Body Composition. Exercise 30 min/day. Warm up and cool down!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-esp', name: 'Edukasyon sa Pagpapakatao', emoji: '🤝', color: 'from-teal-400 to-green-400',
    chapters: [
      {
        id: 'jh-esp-1', title: 'Pagpapakatao', emoji: '🌟',
        pages: [
          {
            title: 'Layunin ng Edukasyon sa Pagpapakatao',
            blocks: [
              h('Ano ang Pagpapakatao?'),
              p('Ang pagpapakatao ay ang paglinang ng kakayahang pumili at gumawa ng tama. Ito ay nakasalalay sa konsensya at pagmamahal.'),
              kt('Pagpapakatao', 'Ang paglinang ng kakayahang pumili at gumawa ng tama base sa konsensya.'),
              kt('Konsensya', 'Ang panloob na boses na nagtuturo kung ano ang tama at mali.'),
              kt('Pagmamahal', 'Ang pundasyon ng moral na pagpapasya — ang pag-aalaga sa kapwa.'),
              ex('Kung nakakita ka ng nawawalang pitaka, ang konsensya ay magsasabing ibalik ito sa may-ari.'),
              ff('Alam mo ba? Ang salitang "pagpapakatao" ay nagpapahayag na ang tao ay patuloy na nagbabago at lumalago bilang mabuting tao!'),
              q('Ano ang panloob na boses na nagtuturo ng tama at mali?', ['Pandinig', 'Konsensya', 'Pandama', 'Pang-amoy'], 1),
              q('Ano ang pundasyon ng moral na pagpapasya?', ['Pera', 'Pagmamahal', 'Takot', 'Kapangyarihan'], 1),
              q('Ano ang pagpapakatao?', ['Paghuhusga ng iba', 'Paglinang ng kakayahang gumawa ng tama', 'Pagiging makasarili', 'Pagsunod sa tao'], 1),
              s('Pagpapakatao = paglinang ng kakayahang pumili at gumawa ng tama. Konsensya = panloob na boses. Pagmamahal = pundasyon!'),
            ],
          },
          {
            title: 'Antas ng Pagpapahalaga',
            blocks: [
              h('Tatlong Antas ng Pagpapahalaga'),
              p('May tatlong antas ng pagpapahalaga sa pagpapakatao: pagpapahalaga sa sarili, sa kapwa, at sa Diyos.'),
              kt('Pagpapahalaga sa Sarili', 'Pangangalaga sa sariling buhay, kalusugan, at dignidad.'),
              kt('Pagpapahalaga sa Kapwa', 'Pagrespeto at pag-aalaga sa karapatan at damdamin ng iba.'),
              kt('Pagpapahalaga sa Diyos', 'Pagpapakita ng pasasalamat at pananampalataya sa Lumikha.'),
              ex('Pagpapahalaga sa sarili: pag-iwas sa masamang bisyo. Sa kapwa: pagtulong sa nangangailangan. Sa Diyos: panalangin at pasasalamat.'),
              q('Ano ang pagpapahalaga sa sarili?', ['Pabayaan ang sarili', 'Pangangalaga sa sariling buhay at dignidad', 'Pagiging makasarili', 'Pag-asa'], 1),
              q('Ano ang pagpapahalaga sa kapwa?', ['Pagrespeto at pag-aalaga sa iba', 'Pang-aaway', 'Kawalan ng interes', 'Pag-asa'], 0),
              q('Ilang antas ng pagpapahalaga ang mayroon?', ['2', '3', '4', '5'], 1),
              s('Tatlong antas: Pagpapahalaga sa Sarili, sa Kapwa, at sa Diyos. Ito ang pundasyon ng mabuting pagpapakatao!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-health', name: 'Health', emoji: '💪', color: 'from-rose-400 to-pink-400',
    chapters: [
      {
        id: 'jh-hea-1', title: 'Nutrition and Wellness', emoji: '🥗',
        pages: [
          {
            title: 'The Food Groups',
            blocks: [
              h('Eating for Health'),
              p('Eating a balanced diet means eating foods from all food groups. Each group gives your body different nutrients it needs to grow and stay healthy.'),
              kt('Nutrient', 'A substance in food that the body needs to grow, repair, and function properly.'),
              d('🥗', 'Go (energy), Grow (body-building), Glow (regulating) — the three food groups'),
              h('The Three Food Groups (Pinggang Pinoy)'),
              kt('Go Foods', 'Give you energy. Examples: rice, bread, pasta, oats, corn. Eat the most of these!'),
              kt('Grow Foods', 'Build and repair your body. Examples: meat, fish, eggs, milk, beans. Eat a moderate amount.'),
              kt('Glow Foods', 'Keep your skin and immune system healthy. Examples: fruits and vegetables. Eat plenty!'),
              ex('Breakfast: rice (Go) + egg (Grow) + banana (Glow). A balanced meal has all three!'),
              ff('Did you know? The Pinggang Pinoy (Filipino Plate) shows that half your plate should be fruits and vegetables (Glow), one-fourth rice (Go), and one-fourth protein (Grow)!'),
              tip('Drink 8 glasses of water every day. Water helps your body digest food, carry nutrients, and stay cool!'),
              q('Which food group gives you energy?', ['Glow', 'Go', 'Grow', 'None'], 1),
              q('Which food group builds and repairs your body?', ['Go', 'Glow', 'Grow', 'All three'], 2),
              q('What are fruits and vegetables?', ['Go foods', 'Grow foods', 'Glow foods', 'None'], 2),
              s('Three food groups: Go (energy: rice, bread), Grow (body-building: meat, eggs, milk), Glow (health: fruits, vegetables). Half your plate = Glow!'),
            ],
          },
          {
            title: 'Healthy Habits',
            blocks: [
              h('Staying Healthy Every Day'),
              p('Good health is not just about eating right. It also means exercising, sleeping well, and keeping clean.'),
              kt('Wellness', 'The state of being in good health, both physically and mentally.'),
              h('Healthy Habits to Practice'),
              kt('Exercise', 'Physical activity that keeps your heart, muscles, and bones strong. Aim for 30-60 minutes daily.'),
              kt('Sleep', 'Your body and brain rest and repair during sleep. Teens need 8-10 hours per night.'),
              kt('Hygiene', 'Keeping your body clean to prevent germs and illness. Wash hands, brush teeth, take a bath daily.'),
              kt('Hydration', 'Drinking enough water. Your body is about 60% water!'),
              d('💪', 'Exercise + Sleep + Hygiene + Hydration = Wellness!'),
              ex('Healthy day: 8 hours sleep, 60 minutes exercise, 8 glasses water, 3 balanced meals, brush teeth 2x, wash hands before eating.'),
              ff('Did you know? Washing your hands with soap for 20 seconds removes most germs. Sing "Happy Birthday" twice while washing!'),
              q('How many hours of sleep do teens need?', ['4-6', '6-8', '8-10', '10-12'], 2),
              q('How many glasses of water should you drink daily?', ['3', '5', '8', '12'], 2),
              q('How long should you wash your hands with soap?', ['5 seconds', '20 seconds', '1 minute', '5 minutes'], 1),
              s('Healthy habits: Exercise (30-60 min/day), Sleep (8-10 hours for teens), Hygiene (wash hands 20 sec, brush teeth 2x), Hydration (8 glasses water)!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jh-physics', name: 'Physics', emoji: '⚡', color: 'from-amber-400 to-orange-400',
    chapters: [
      {
        id: 'jh-phy-1', title: 'Force and Motion', emoji: '🏃',
        pages: [
          {
            title: 'What is Force?',
            blocks: [
              h('Understanding Force'),
              p('A force is a push or a pull that can change the motion of an object. Forces are everywhere — you use force when you open a door, kick a ball, or write with a pen.'),
              kt('Force', 'A push or pull that can change the speed, direction, or shape of an object.'),
              kt('Balanced Forces', 'When forces are equal and opposite, the object does not move or stays at constant speed.'),
              kt('Unbalanced Forces', 'When forces are not equal, the object accelerates (speeds up, slows down, or changes direction).'),
              d('⚡', 'Force = push or pull. Balanced = no change. Unbalanced = acceleration!'),
              ex('Pushing a box: if you push with 10 N and friction pushes back with 10 N, the box does not move (balanced). If you push with 15 N, the box moves (unbalanced).'),
              q('What is a force?', ['Only a push', 'A push or pull', 'Only a pull', 'Energy'], 1),
              q('What happens when forces are balanced?', ['Object accelerates', 'Object does not change motion', 'Object stops', 'Object speeds up'], 1),
              q('What happens when forces are unbalanced?', ['Nothing', 'Object accelerates', 'Object stays still', 'Object disappears'], 1),
              s('Force = push or pull. Balanced forces = no change in motion. Unbalanced forces = acceleration (speed up, slow down, or change direction)!'),
            ],
          },
          {
            title: 'Speed, Velocity, and Acceleration',
            blocks: [
              h('Motion in Physics'),
              p('Motion is when an object changes its position. We can describe motion using speed, velocity, and acceleration.'),
              kt('Speed', 'How fast an object moves — distance divided by time (e.g., 10 m/s).'),
              kt('Velocity', 'Speed in a specific direction (e.g., 10 m/s north). Velocity has both magnitude and direction.'),
              kt('Acceleration', 'The rate at which velocity changes — speeding up, slowing down, or changing direction.'),
              d('🏃', 'Speed = distance ÷ time. Velocity = speed + direction. Acceleration = change in velocity ÷ time.'),
              ex('A car going 60 km/h has speed. A car going 60 km/h north has velocity. A car that goes from 0 to 60 km/h in 10 seconds has acceleration.'),
              ff('Did you know? The fastest object ever made by humans is the Parker Solar Probe, which travels at about 430,000 km/h!'),
              q('What is speed?', ['Distance × time', 'Distance ÷ time', 'Time ÷ distance', 'Distance + time'], 1),
              q('What is the difference between speed and velocity?', ['No difference', 'Velocity has direction', 'Speed has direction', 'Velocity is faster'], 1),
              q('What is acceleration?', ['Change in speed only', 'Change in velocity over time', 'Constant speed', 'Distance traveled'], 1),
              s('Speed = distance ÷ time. Velocity = speed + direction. Acceleration = change in velocity ÷ time. Fastest human object: Parker Solar Probe!'),
            ],
          },
        ],
      },
    ],
  },
];

// ===================== SENIOR HIGH (Core) ==================================

const seniorHighSubjects: TextbookSubject[] = [
  {
    id: 'sh-oral', name: 'Oral Communication', emoji: '🗣️', color: 'from-cyan-400 to-blue-400',
    chapters: [
      {
        id: 'sh-oral-1', title: 'Communication Models', emoji: '📡',
        pages: [
          {
            title: 'Models of Communication',
            blocks: [
              h('What is Communication?'),
              p('Communication is the process of sharing information, ideas, or feelings between people. There are several models that explain how communication works.'),
              kt('Communication', 'The process of sharing information, ideas, or feelings between a sender and a receiver.'),
              h('Shannon-Weaver Model'),
              p('Created by Claude Shannon, this model shows communication as a linear process: Sender → Message → Channel → Receiver, with Noise that can interfere.'),
              kt('Shannon-Weaver Model', 'Linear model: Sender → Message → Channel → Receiver, with Noise.'),
              kt('Noise', 'Anything that interferes with the message being received correctly.'),
              h('Berlo\'s SMCR Model'),
              p('David Berlo created the SMCR model: Source → Message → Channel → Receiver. Each part has factors that affect communication.'),
              kt('SMCR Model', 'Source, Message, Channel, Receiver — Berlo\'s model of communication.'),
              h('Schramm\'s Transactional Model'),
              p('Wilbur Schramm showed that communication is a two-way process. Both people are senders and receivers at the same time, and they share a common field of experience.'),
              kt('Transactional Model', 'Communication where both parties are senders and receivers simultaneously.'),
              q('Who created the Shannon-Weaver model?', ['David Berlo', 'Claude Shannon', 'Wilbur Schramm', 'Aristotle'], 1),
              q('What does S stand for in the SMCR model?', ['Sender', 'Source', 'Signal', 'Speaker'], 1),
              q('What is noise in communication?', ['Loud sound only', 'Interference with the message', 'The channel', 'The receiver'], 1),
              s('Models: Shannon-Weaver (linear, Sender→Message→Channel→Receiver), SMCR (Source→Message→Channel→Receiver), Transactional (two-way)!'),
            ],
          },
          {
            title: 'Types of Speech',
            blocks: [
              h('Speech Delivery Types'),
              p('There are four main types of speech delivery, each used in different situations.'),
              kt('Impromptu Speech', 'Delivered with little or no preparation. You speak on the spot.'),
              kt('Manuscript Speech', 'Read word for word from a written text. Used by presidents and news anchors.'),
              kt('Memorized Speech', 'Delivered from memory without notes. Used by actors.'),
              kt('Extemporaneous Speech', 'Prepared in advance but delivered with only brief notes. Most common in debates.'),
              q('Which speech type has no preparation?', ['Manuscript', 'Memorized', 'Impromptu', 'Extemporaneous'], 2),
              q('Which speech type is read word for word?', ['Impromptu', 'Manuscript', 'Memorized', 'Extemporaneous'], 1),
              s('Speech types: Impromptu (no prep), Manuscript (read), Memorized (from memory), Extemporaneous (prepared with notes)!'),
            ],
          },
        ],
      },
      {
        id: 'sh-oral-2', title: 'Listening and Speaking', emoji: '👂',
        pages: [
          {
            title: 'Effective Communication Skills',
            blocks: [
              h('Active Listening'),
              p('Active listening means fully focusing on the speaker, understanding their message, and responding thoughtfully. It is more than just hearing.'),
              kt('Active Listening', 'Fully focusing on, understanding, and responding to a speaker.'),
              kt('Hearing', 'A physical process — sound waves entering your ears. Listening requires thinking.'),
              h('Barriers to Listening'),
              p('Common barriers include: noise (external), daydreaming (internal), bias, interrupting, and rehearsing your response instead of listening.'),
              kt('Noise Barrier', 'External sounds that distract you from hearing the speaker.'),
              h('Effective Speaking'),
              p('Good speakers are clear, organized, and confident. They know their audience and purpose.'),
              kt('Audience', 'The people who will listen to your speech or message.'),
              kt('Purpose', 'Why you are speaking — to inform, persuade, or entertain.'),
              kt('Informative Speech', 'A speech that teaches or shares information with the audience.'),
              kt('Persuasive Speech', 'A speech that tries to convince the audience to believe or do something.'),
              ex('Informative: "How photosynthesis works." Persuasive: "Why we should plant more trees."'),
              tip('Before speaking, ask: Who is my audience? What is my purpose? Then organize your ideas clearly!'),
              q('What is active listening?', ['Just hearing sounds', 'Fully focusing and responding to the speaker', 'Thinking about your response', 'Nodding only'], 1),
              q('Which speech type tries to convince the audience?', ['Informative', 'Persuasive', 'Entertainment', 'Impromptu'], 1),
              q('What is a common barrier to listening?', ['Good lighting', 'Noise', 'Speaking clearly', 'Eye contact'], 1),
              s('Active listening = focus + understand + respond. Barriers: noise, daydreaming, bias. Speaking: know audience + purpose (inform, persuade, entertain)!'),
            ],
          },
        ],
      },
      {
        id: 'sh-oral-3', title: 'Nonverbal Communication', emoji: '🤝',
        pages: [
          {
            title: 'Speaking Without Words',
            blocks: [
              h('What is Nonverbal Communication?'),
              p('Nonverbal communication is sending messages without using words. It includes body language, facial expressions, gestures, eye contact, and posture.'),
              kt('Nonverbal Communication', 'Sending messages without spoken or written words — using body language, gestures, and expressions.'),
              d('🤝', 'Body language, facial expressions, gestures, eye contact, posture, tone of voice'),
              h('Types of Nonverbal Communication'),
              kt('Facial Expression', 'Your face shows emotions — smile (happy), frown (sad), raised eyebrows (surprised).'),
              kt('Gesture', 'Hand and arm movements that add meaning. Example: waving, pointing, thumbs up.'),
              kt('Eye Contact', 'Looking at someone\'s eyes while speaking or listening. Shows attention and honesty.'),
              kt('Posture', 'How you sit or stand. Upright = confident. Slouched = bored or tired. Leaning in = interested.'),
              kt('Proxemics', 'The use of personal space. Standing close = intimate or friendly. Standing far = formal or distant.'),
              kt('Paralanguage', 'How you say words — tone, pitch, speed, volume. Not what you say, but HOW you say it.'),
              ex('Saying "I\'m fine" with a smile and upright posture = believable. Saying "I\'m fine" with a frown and slouched posture = not believable!'),
              ff('Did you know? About 55% of communication is body language, 38% is tone of voice, and only 7% is the actual words — according to researcher Albert Mehrabian!'),
              q('What percentage of communication is body language?', ['7%', '38%', '55%', '90%'], 2),
              q('What is proxemics?', ['Hand gestures', 'Use of personal space', 'Tone of voice', 'Eye contact'], 1),
              q('What does leaning in during a conversation show?', ['Boredom', 'Interest', 'Anger', 'Disrespect'], 1),
              s('Nonverbal communication: Facial expressions, gestures, eye contact, posture, proxemics (space), paralanguage (tone). 55% body language, 38% tone, 7% words!'),
            ],
          },
          {
            title: 'Improving Your Nonverbal Skills',
            blocks: [
              h('Reading Body Language'),
              p('Learning to read body language helps you understand what people really mean — even when they don\'t say it.'),
              kt('Congruent', 'When your words and body language match. Example: saying "I\'m happy" with a genuine smile.'),
              kt('Incongruent', 'When your words and body language don\'t match. Example: saying "I\'m fine" while crying.'),
              h('Tips for Better Nonverbal Communication'),
              p('1. Maintain eye contact (but don\'t stare). 2. Use open posture (don\'t cross arms). 3. Nod to show you\'re listening. 4. Match your tone to your message. 5. Respect personal space.'),
              tip('In a speech or presentation, your body language should support your words, not contradict them. Practice in front of a mirror!'),
              q('What does it mean when words and body language match?', ['Incongruent', 'Congruent', 'Proxemics', 'Paralanguage'], 1),
              q('What should you do to show you are listening?', ['Look away', 'Cross your arms', 'Nod', 'Stand very far'], 2),
              q('What does crossing your arms usually suggest?', ['Openness', 'Defensiveness or closed-off', 'Happiness', 'Excitement'], 1),
              s('Congruent = words + body language match. Tips: eye contact, open posture, nod, match tone, respect space. Practice in front of a mirror!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-mil', name: 'Media and Information Literacy', emoji: '📰', color: 'from-sky-400 to-cyan-400',
    chapters: [
      {
        id: 'sh-mil-1', title: 'Understanding Media', emoji: '📱',
        pages: [
          {
            title: 'What is Media Literacy?',
            blocks: [
              h('Media in Our Lives'),
              p('Media is everywhere — TV, radio, newspapers, social media, websites. Media literacy means understanding how media works and thinking critically about what we see and hear.'),
              kt('Media', 'The means of mass communication — TV, radio, newspapers, internet, social media.'),
              kt('Media Literacy', 'The ability to access, analyze, evaluate, and create media responsibly.'),
              kt('Information Literacy', 'The ability to find, evaluate, and use information effectively and ethically.'),
              d('📱', 'Media Literacy = understand media. Information Literacy = find and use information wisely.'),
              h('Types of Media'),
              kt('Print Media', 'Information on paper — newspapers, magazines, books, brochures.'),
              kt('Broadcast Media', 'Information sent through airwaves — TV and radio.'),
              kt('Digital/New Media', 'Information on the internet — websites, social media, blogs, YouTube, podcasts.'),
              ex('Print: Manila Bulletin. Broadcast: ABS-CBN, GMA. Digital: Facebook, YouTube, TikTok, news websites.'),
              ff('Did you know? The average Filipino spends about 10 hours per day on the internet — one of the highest in the world!'),
              q('What is media literacy?', ['Only watching TV', 'The ability to access, analyze, evaluate, and create media', 'Only using social media', 'Making videos'], 1),
              q('Which is an example of print media?', ['Facebook', 'Newspaper', 'Radio', 'YouTube'], 1),
              q('Which is an example of digital media?', ['Newspaper', 'Magazine', 'Social media', 'Radio'], 2),
              s('Media literacy = understand and evaluate media. Types: Print (newspapers), Broadcast (TV/radio), Digital (internet/social media). Think critically!'),
            ],
          },
          {
            title: 'Evaluating Information',
            blocks: [
              h('Is It True? Spotting Fake News'),
              p('Not everything on the internet is true. We must evaluate information before believing or sharing it.'),
              kt('Fake News', 'False information presented as real news. Can be deliberate lies or honest mistakes.'),
              kt('Misinformation', 'False information shared by someone who believes it is true (no intent to deceive).'),
              kt('Disinformation', 'False information shared deliberately to deceive people.'),
              h('How to Evaluate Information (CRAAP Test)'),
              p('Use the CRAAP test to check if information is reliable:'),
              kt('Currency', 'Is the information up-to-date? When was it published or updated?'),
              kt('Relevance', 'Does it answer your question? Is it the right level for your needs?'),
              kt('Authority', 'Who wrote it? Are they an expert? What is their reputation?'),
              kt('Accuracy', 'Is the information correct? Can you verify it with other sources?'),
              kt('Purpose', 'Why was it written? To inform, sell, persuade, or entertain? Watch for bias!'),
              d('🔍', 'CRAAP = Currency, Relevance, Authority, Accuracy, Purpose'),
              ex('A blog post with no author, no date, and no sources = unreliable. A university website with a named expert and recent date = reliable.'),
              tip('Before sharing news on social media, check: Who wrote it? When? Can you find the same story on trusted news sites?'),
              q('What is fake news?', ['True information', 'False information presented as real news', 'Only on TV', 'Old news'], 1),
              q('What does the "A" in CRAAP stand for?', ['Accuracy', 'Advertising', 'Author', 'Article'], 0),
              q('What is disinformation?', ['Honest mistakes', 'False info shared deliberately to deceive', 'True news', 'Old news'], 1),
              s('Evaluate info with CRAAP: Currency (date), Relevance (fits need), Authority (who wrote it), Accuracy (correct?), Purpose (why?). Check before sharing!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-kom', name: 'Komunikasyon at Pananaliksik', emoji: '📝', color: 'from-indigo-400 to-purple-400',
    chapters: [
      {
        id: 'sh-kom-1', title: 'Pananaliksik', emoji: '🔍',
        pages: [
          {
            title: 'Mga Hakbang sa Pananaliksik',
            blocks: [
              h('Ano ang Pananaliksik?'),
              p('Ang pananaliksik ay sistematikong pag-aaral upang makahanap ng sagot sa isang problema o tanong.'),
              kt('Pananaliksik', 'Sistematikong pag-aaral upang makahanap ng sagot sa isang problema.'),
              h('Mga Hakbang'),
              p('May anim na pangunahing hakbang sa pananaliksik.'),
              kt('1. Pagtukoy ng Problema', 'Pagkilala sa problema o tanong na gusto sagutin.'),
              kt('2. Pagsusuri ng Literatura', 'Pagbabasa ng mga naunang pag-aaral tungkol sa problema.'),
              kt('3. Pagbuo ng Hypothesis', 'Sinuring sagot o hula sa problema.'),
              kt('4. Pagkokolekta ng Datos', 'Paggawa ng survey, interview, o observation.'),
              kt('5. Pagsusuri ng Datos', 'Pagsusuri at pag-aaral ng nakolektang datos.'),
              kt('6. Pagbuo ng Konklusyon', 'Pagbuo ng sagot base sa pagsusuri ng datos.'),
              q('Ano ang unang hakbang sa pananaliksik?', ['Pagbuo ng konklusyon', 'Pagtukoy ng problema', 'Pagkokolekta ng datos', 'Pagsusuri ng literatura'], 1),
              q('Ano ang hypothesis?', ['Random na sagot', 'Sinuring sagot sa problema', 'Resulta ng pananaliksik', 'Datos'], 1),
              s('Anim na hakbang: Problema → Literatura → Hypothesis → Datos → Pagsusuri → Konklusyon!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-math', name: 'General Mathematics', emoji: '📊', color: 'from-green-400 to-teal-400',
    chapters: [
      {
        id: 'sh-math-1', title: 'Functions', emoji: '📈',
        pages: [
          {
            title: 'Understanding Functions',
            blocks: [
              h('What is a Function?'),
              p('A function is a relation where each input (x-value) has exactly one output (y-value). Think of it like a machine: you put something in, and you get one thing out.'),
              kt('Function', 'A relation where each input has exactly one output.'),
              kt('Domain', 'The set of all possible input values (x-values).'),
              kt('Range', 'The set of all possible output values (y-values).'),
              h('Function Notation'),
              p('We write functions as f(x), read as "f of x." For example, f(x) = 2x + 3 means multiply x by 2 and add 3.'),
              ex('If f(x) = 2x + 3, then f(2) = 2(2) + 3 = 7. f(0) = 2(0) + 3 = 3. f(5) = 2(5) + 3 = 13.'),
              h('Types of Functions'),
              p('Linear functions make straight lines: f(x) = mx + b. Quadratic functions make curves (parabolas): f(x) = ax² + bx + c.'),
              kt('Linear Function', 'A function whose graph is a straight line: f(x) = mx + b.'),
              kt('Quadratic Function', 'A function whose graph is a U-shaped curve (parabola): f(x) = ax² + bx + c.'),
              q('If f(x) = 2x + 3, what is f(2)?', ['5', '7', '8', '10'], 1),
              q('If f(x) = x² - 1, what is f(3)?', ['6', '8', '9', '10'], 1),
              q('In f(x) = mx + b, what does m represent?', ['Y-intercept', 'Slope', 'Domain', 'Range'], 1),
              s('Functions: each input has one output. f(x) notation. Linear (straight line), Quadratic (parabola). Domain = inputs, Range = outputs!'),
            ],
          },
        ],
      },
      {
        id: 'sh-math-2', title: 'Simple and Compound Interest', emoji: '💰',
        pages: [
          {
            title: 'Interest Calculations',
            blocks: [
              h('Simple Interest'),
              p('Simple interest is calculated only on the principal amount. The formula is I = Prt, where P is principal, r is rate, and t is time.'),
              kt('Simple Interest', 'Interest calculated only on the principal: I = Prt'),
              ex('Simple interest on ₱1000 at 5% for 2 years: I = 1000 × 0.05 × 2 = ₱100'),
              h('Compound Interest'),
              p('Compound interest is calculated on the principal AND the accumulated interest. The formula is FV = P(1 + r)^t.'),
              kt('Compound Interest', 'Interest calculated on principal plus accumulated interest: FV = P(1 + r)^t'),
              ex('Compound interest on ₱1000 at 5% for 2 years: FV = 1000(1.05)² = ₱1102.50'),
              h('Comparing the Two'),
              p('Compound interest grows faster than simple interest because you earn interest on your interest!'),
              q('What is the simple interest formula?', ['I = Prt', 'I = P + rt', 'I = P/r', 'I = Pr/t'], 0),
              q('What is the compound interest formula?', ['FV = P(1 + rt)', 'FV = P(1 + r)^t', 'FV = P + r^t', 'FV = P × r^t'], 1),
              q('Simple interest on ₱2000 at 3% for 2 years?', ['₱60', '₱120', '₱200', '₱2120'], 1),
              s('Simple Interest: I = Prt (principal only). Compound Interest: FV = P(1+r)^t (principal + interest on interest)!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-stat', name: 'Statistics and Probability', emoji: '📈', color: 'from-emerald-400 to-green-400',
    chapters: [
      {
        id: 'sh-stat-1', title: 'Basic Statistics', emoji: '📊',
        pages: [
          {
            title: 'Measures of Central Tendency',
            blocks: [
              h('What is Statistics?'),
              p('Statistics is the science of collecting, organizing, analyzing, and interpreting data. It helps us understand information and make decisions.'),
              kt('Statistics', 'The science of collecting, organizing, analyzing, and interpreting data.'),
              h('Mean'),
              p('The mean is the average. Add all values and divide by the number of values.'),
              ex('Mean of 2, 4, 6, 8: (2+4+6+8) ÷ 4 = 20 ÷ 4 = 5'),
              kt('Mean', 'The average — sum of all values divided by the count.'),
              h('Median'),
              p('The median is the middle value when data is arranged in order. If there are two middle values, average them.'),
              ex('Median of 2, 4, 6, 8, 10: the middle value is 6. Median of 2, 4, 6, 8: average of 4 and 6 = 5'),
              kt('Median', 'The middle value when data is arranged in order.'),
              h('Mode'),
              p('The mode is the value that appears most often. There can be more than one mode, or no mode at all.'),
              ex('Mode of 2, 3, 3, 4, 5: the mode is 3 (appears twice). Mode of 1, 2, 3, 4: no mode (all appear once).'),
              kt('Mode', 'The value that appears most frequently in a data set.'),
              q('What is the mean of 4, 6, 8?', ['5', '6', '7', '8'], 1),
              q('What is the median of 3, 5, 7, 9, 11?', ['5', '7', '9', '11'], 1),
              q('What is the mode of 2, 4, 4, 6, 8?', ['2', '4', '6', '8'], 1),
              s('Mean = average, Median = middle, Mode = most frequent! These are measures of central tendency!'),
            ],
          },
        ],
      },
      {
        id: 'sh-stat-2', title: 'Probability Basics', emoji: '🎲',
        pages: [
          {
            title: 'Understanding Probability',
            blocks: [
              h('What is Probability?'),
              p('Probability is the study of how likely something is to happen. It measures the chance of an event occurring, from 0 (impossible) to 1 (certain).'),
              kt('Probability', 'A measure of how likely an event is to happen, from 0 (impossible) to 1 (certain).'),
              h('Basic Formula'),
              p('Probability = Number of favorable outcomes ÷ Total number of possible outcomes.'),
              kt('Favorable Outcome', 'The result you want to happen.'),
              kt('Possible Outcomes', 'All the things that could possibly happen.'),
              ex('Rolling a die: 6 possible outcomes (1-6). Probability of rolling a 3 = 1/6. Probability of rolling an even number = 3/6 = 1/2.'),
              h('Types of Events'),
              kt('Independent Events', 'Events where one does not affect the other — like flipping a coin twice.'),
              kt('Dependent Events', 'Events where one affects the other — like drawing cards without replacing them.'),
              ff('Did you know? The probability of being struck by lightning in your lifetime is about 1 in 15,300 — very unlikely!'),
              q('What is the probability of flipping heads on a coin?', ['1/4', '1/2', '1', '0'], 1),
              q('What is the probability of rolling a 6 on a standard die?', ['1/2', '1/3', '1/6', '6/6'], 2),
              q('What is the probability of an impossible event?', ['1', '0', '0.5', 'Cannot tell'], 1),
              s('Probability = favorable ÷ possible outcomes. Range: 0 (impossible) to 1 (certain). Coin flip = 1/2, die roll = 1/6. Independent vs dependent events!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-earth', name: 'Earth and Life Science', emoji: '🌍', color: 'from-teal-400 to-cyan-400',
    chapters: [
      {
        id: 'sh-earth-1', title: 'Earth Systems', emoji: '🌎',
        pages: [
          {
            title: 'The Four Earth Systems',
            blocks: [
              h('Earth\'s Systems'),
              p('Earth has four major systems that interact with each other to make our planet work.'),
              kt('Atmosphere', 'The layer of gases surrounding Earth — the air we breathe, weather, and climate.'),
              kt('Hydrosphere', 'All the water on Earth — oceans, rivers, lakes, and groundwater.'),
              kt('Geosphere', 'The solid parts of Earth — rocks, soil, mountains, and the Earth\'s core.'),
              kt('Biosphere', 'All living things on Earth — plants, animals, and microorganisms.'),
              d('🌍', 'Atmosphere (air), Hydrosphere (water), Geosphere (land), Biosphere (life)'),
              h('How They Interact'),
              p('The systems are connected. For example, rain (hydrosphere) falls on soil (geosphere) and helps plants grow (biosphere) in the air (atmosphere).'),
              ex('A volcano erupting (geosphere) releases ash into the air (atmosphere), which can affect weather and living things.'),
              q('Which system includes all living things?', ['Atmosphere', 'Hydrosphere', 'Geosphere', 'Biosphere'], 3),
              q('Which system includes all water on Earth?', ['Atmosphere', 'Hydrosphere', 'Geosphere', 'Biosphere'], 1),
              q('Which system is the air around Earth?', ['Atmosphere', 'Hydrosphere', 'Geosphere', 'Biosphere'], 0),
              s('Four Earth systems: Atmosphere (air), Hydrosphere (water), Geosphere (land), Biosphere (life) — all interact!'),
            ],
          },
        ],
      },
      {
        id: 'sh-earth-2', title: 'Natural Disasters', emoji: '🌋',
        pages: [
          {
            title: 'Earth\'s Powerful Forces',
            blocks: [
              h('Volcanic Eruptions'),
              p('A volcano is an opening in the Earth\'s crust where molten rock (magma), gases, and ash escape from deep underground.'),
              kt('Volcano', 'An opening in Earth\'s crust where magma, gases, and ash escape.'),
              kt('Magma', 'Molten rock deep underground. When it reaches the surface, it is called lava.'),
              kt('Lava', 'Molten rock that has erupted from a volcano onto the surface.'),
              h('Earthquakes'),
              p('An earthquake is a sudden shaking of the ground caused by movements of tectonic plates deep underground.'),
              kt('Earthquake', 'A sudden shaking of the ground caused by tectonic plate movements.'),
              kt('Tectonic Plates', 'Large pieces of Earth\'s crust that slowly move and interact, causing earthquakes and volcanoes.'),
              kt('Fault Line', 'A crack in the Earth\'s crust where tectonic plates meet and move.'),
              h('Typhoons'),
              p('A typhoon is a powerful tropical storm with strong winds and heavy rain. In the Philippines, we call them bagyo.'),
              kt('Typhoon', 'A powerful tropical storm with winds over 118 km/h. Called "bagyo" in the Philippines.'),
              kt('Storm Surge', 'A rise in sea level caused by a typhoon pushing water toward the coast.'),
              d('🌋', 'Volcano (magma/lava), Earthquake (tectonic plates), Typhoon (strong winds + rain)'),
              ff('Did you know? The Philippines experiences about 20 typhoons every year because of its location in the Pacific typhoon belt!'),
              tip('During a typhoon or earthquake, have an emergency kit ready: water, food, flashlight, first aid, and a radio!'),
              q('What is molten rock called when it is underground?', ['Lava', 'Magma', 'Ash', 'Sediment'], 1),
              q('What causes earthquakes?', ['Rain', 'Tectonic plate movements', 'Volcanoes only', 'Wind'], 1),
              q('How many typhoons does the Philippines experience per year?', ['5', '10', '20', '50'], 2),
              s('Natural disasters: Volcano (magma → lava), Earthquake (tectonic plates), Typhoon (bagyo, strong winds + rain). Philippines gets ~20 typhoons/year!'),
            ],
          },
        ],
      },
      {
        id: 'sh-earth-3', title: 'Weather and Climate', emoji: '🌦️',
        pages: [
          {
            title: 'Weather vs Climate',
            blocks: [
              h('What is Weather?'),
              p('Weather is the condition of the atmosphere at a particular place and time. It changes daily — today might be sunny, tomorrow rainy.'),
              kt('Weather', 'The condition of the atmosphere at a specific place and time. Changes daily.'),
              h('What is Climate?'),
              p('Climate is the average weather of a place over a long period (usually 30 years or more). It does not change day to day.'),
              kt('Climate', 'The average weather pattern of a place over many years.'),
              ex('Weather: "It is raining today in Manila." Climate: "The Philippines has a tropical climate with wet and dry seasons."'),
              h('Factors Affecting Climate'),
              p('Climate is influenced by latitude (distance from the equator), altitude (height above sea level), ocean currents, and wind patterns.'),
              kt('Latitude', 'Distance from the equator. Places near the equator are hotter; places far away are colder.'),
              kt('Altitude', 'Height above sea level. Higher places like Baguio are cooler than lowland areas.'),
              ex('Baguio City has a cooler climate than Manila because it is at a higher altitude (about 1,500 meters above sea level).'),
              ff('Did you know? The Philippines has a tropical climate with only two seasons: wet (June-October) and dry (November-May)!'),
              q('What is the difference between weather and climate?', ['They are the same', 'Weather is short-term, climate is long-term average', 'Climate changes daily', 'Weather lasts for years'], 1),
              q('What makes Baguio cooler than Manila?', ['Latitude', 'Altitude', 'Ocean currents', 'Wind'], 1),
              q('What is climate?', ['Today\'s temperature', 'Average weather over many years', 'A single storm', 'A weather forecast'], 1),
              s('Weather = short-term atmospheric condition. Climate = long-term average weather. Factors: latitude (equator), altitude (height), ocean currents, wind!'),
            ],
          },
          {
            title: 'The Atmosphere',
            blocks: [
              h('Layers of the Atmosphere'),
              p('The atmosphere is the layer of gases surrounding Earth. It has five main layers, each with different properties.'),
              kt('Atmosphere', 'The layer of gases surrounding Earth that protects us and gives us air to breathe.'),
              kt('Troposphere', 'The lowest layer where we live and where weather happens. Contains most of the air and water vapor.'),
              kt('Stratosphere', 'The second layer, contains the ozone layer that protects us from harmful UV rays.'),
              kt('Mesosphere', 'The third layer where meteors burn up, creating shooting stars.'),
              kt('Thermosphere', 'The fourth layer, very hot, where the aurora (northern lights) occurs.'),
              d('🌍', 'Troposphere (weather) → Stratosphere (ozone) → Mesosphere (meteors) → Thermosphere (auroras) → Exosphere (outer)'),
              kt('Ozone Layer', 'A layer in the stratosphere that blocks harmful ultraviolet (UV) radiation from the Sun.'),
              ex('Without the ozone layer, the Sun\'s UV rays would be too strong for life on Earth. That is why we protect it!'),
              ff('Did you know? The ozone hole over Antarctica was discovered in 1985. Thanks to global action, it is slowly healing!'),
              q('In which layer does weather happen?', ['Stratosphere', 'Troposphere', 'Mesosphere', 'Thermosphere'], 1),
              q('Which layer contains the ozone layer?', ['Troposphere', 'Stratosphere', 'Mesosphere', 'Exosphere'], 1),
              q('What does the ozone layer protect us from?', ['Rain', 'UV radiation', 'Wind', 'Earthquakes'], 1),
              s('Atmosphere layers: Troposphere (weather, we live here), Stratosphere (ozone layer), Mesosphere (meteors burn), Thermosphere (auroras). Ozone blocks UV!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-physci', name: 'Physical Science', emoji: '⚗️', color: 'from-violet-400 to-purple-400',
    chapters: [
      {
        id: 'sh-physci-1', title: 'Atoms and Elements', emoji: '⚛️',
        pages: [
          {
            title: 'The Atom',
            blocks: [
              h('What is an Atom?'),
              p('An atom is the smallest unit of matter that keeps the properties of an element. Everything around you is made of atoms!'),
              kt('Atom', 'The smallest unit of matter that retains the properties of an element.'),
              h('Parts of an Atom'),
              p('An atom has three main particles: protons, neutrons, and electrons.'),
              kt('Proton', 'Positively charged particle in the nucleus. The number of protons determines the element.'),
              kt('Neutron', 'Particle with no charge (neutral) in the nucleus. It adds mass to the atom.'),
              kt('Electron', 'Negatively charged particle that orbits around the nucleus.'),
              d('⚛️', 'Nucleus = Protons (+) + Neutrons (0). Electrons (-) orbit around the nucleus.'),
              h('Elements'),
              p('An element is a substance made of only one type of atom. The Periodic Table lists all known elements.'),
              kt('Element', 'A substance made of only one type of atom, like gold, oxygen, or carbon.'),
              kt('Atomic Number', 'The number of protons in an atom. It identifies the element.'),
              q('What particle has a positive charge?', ['Electron', 'Neutron', 'Proton', 'Photon'], 2),
              q('What particle has no charge?', ['Proton', 'Electron', 'Neutron', 'Ion'], 2),
              q('What determines the identity of an element?', ['Number of neutrons', 'Number of protons', 'Number of electrons', 'Atomic mass'], 1),
              s('Atom: Protons (+), Neutrons (0) in nucleus, Electrons (-) orbit. Atomic number = protons. Element = one type of atom!'),
            ],
          },
        ],
      },
      {
        id: 'sh-physci-2', title: 'Chemical Bonds and Reactions', emoji: '🔗',
        pages: [
          {
            title: 'How Atoms Connect',
            blocks: [
              h('Chemical Bonds'),
              p('Atoms join together through chemical bonds to form molecules and compounds. There are three main types of bonds.'),
              kt('Chemical Bond', 'A force that holds atoms together in a molecule or compound.'),
              kt('Ionic Bond', 'A bond where one atom gives an electron to another. Forms between a metal and a non-metal.'),
              kt('Covalent Bond', 'A bond where atoms share electrons. Forms between two non-metals.'),
              kt('Metallic Bond', 'A bond where electrons flow freely among metal atoms. Gives metals their conductivity.'),
              d('🔗', 'Ionic (give/take), Covalent (share), Metallic (free-flowing electrons)'),
              ex('Ionic: NaCl (table salt) — sodium gives an electron to chlorine. Covalent: H₂O (water) — hydrogen and oxygen share electrons.'),
              h('Chemical Reactions'),
              p('A chemical reaction is when substances change into new substances. Bonds break and new bonds form.'),
              kt('Chemical Reaction', 'A process where substances (reactants) change into new substances (products).'),
              kt('Reactant', 'The starting substances in a chemical reaction.'),
              kt('Product', 'The new substances formed by a chemical reaction.'),
              ex('Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Reactants: CO₂ and H₂O. Products: glucose and oxygen.'),
              ff('Did you know? A single drop of water contains about 1.5 sextillion (1.5 × 10²¹) molecules of H₂O!'),
              q('Which bond involves sharing electrons?', ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], 1),
              q('Which bond involves giving/taking electrons?', ['Covalent', 'Ionic', 'Metallic', 'Van der Waals'], 1),
              q('In a reaction, what are the starting substances called?', ['Products', 'Reactants', 'Catalysts', 'Bonds'], 1),
              s('Bonds: Ionic (give/take, metal+non-metal), Covalent (share, non-metals), Metallic (free electrons). Reactions: Reactants → Products!'),
            ],
          },
        ],
      },
      {
        id: 'sh-physci-3', title: 'Energy and Waves', emoji: '🌊',
        pages: [
          {
            title: 'Types of Energy',
            blocks: [
              h('What is Energy?'),
              p('Energy is the ability to do work or cause change. It exists in many forms and can be converted from one form to another.'),
              kt('Energy', 'The ability to do work or cause change. It cannot be created or destroyed, only transformed.'),
              kt('Kinetic Energy', 'Energy of motion. A moving car, a rolling ball, or flowing water all have kinetic energy.'),
              kt('Potential Energy', 'Stored energy. A book on a shelf, a stretched rubber band, or water behind a dam all have potential energy.'),
              h('Other Forms of Energy'),
              kt('Thermal Energy', 'Heat energy — the total kinetic energy of particles in a substance.'),
              kt('Chemical Energy', 'Energy stored in chemical bonds, like in food, fuel, and batteries.'),
              kt('Electrical Energy', 'Energy from moving electrons — powers lights, appliances, and gadgets.'),
              kt('Electromagnetic Energy', 'Energy from light and other electromagnetic waves — includes visible light, radio waves, X-rays.'),
              d('⚡', 'Kinetic (motion), Potential (stored), Thermal (heat), Chemical (bonds), Electrical (electrons), Electromagnetic (light)'),
              ex('A battery converts chemical energy to electrical energy. A light bulb converts electrical energy to light and heat energy.'),
              ff('Did you know? The Law of Conservation of Energy says energy cannot be created or destroyed — it only changes forms!'),
              q('What type of energy does a moving car have?', ['Potential', 'Kinetic', 'Chemical', 'Nuclear'], 1),
              q('What type of energy is stored in a battery?', ['Kinetic', 'Chemical', 'Thermal', 'Electromagnetic'], 1),
              q('What law says energy cannot be created or destroyed?', ['Law of Gravity', 'Law of Conservation of Energy', 'Newton\'s Law', 'Ohm\'s Law'], 1),
              s('Energy types: Kinetic (motion), Potential (stored), Thermal (heat), Chemical (bonds), Electrical (electrons), Electromagnetic (light). Conservation: only transforms!'),
            ],
          },
          {
            title: 'Waves',
            blocks: [
              h('What is a Wave?'),
              p('A wave is a disturbance that carries energy from one place to another without carrying matter. Waves are everywhere — sound, light, and water waves.'),
              kt('Wave', 'A disturbance that transfers energy from one place to another without transferring matter.'),
              h('Types of Waves'),
              p('There are two main types of waves: transverse and longitudinal.'),
              kt('Transverse Wave', 'The wave moves up and down (perpendicular to direction). Example: light waves, water waves.'),
              kt('Longitudinal Wave', 'The wave compresses and expands (parallel to direction). Example: sound waves.'),
              d('🌊', 'Transverse (up-down, like water waves), Longitudinal (push-pull, like sound)'),
              h('Wave Properties'),
              kt('Wavelength', 'The distance between two corresponding points on a wave (like crest to crest).'),
              kt('Amplitude', 'The height of the wave — measures the energy. Higher amplitude = more energy.'),
              kt('Frequency', 'How many waves pass a point per second. Measured in Hertz (Hz).'),
              ex('A high-frequency sound has a high pitch (like a whistle). A low-frequency sound has a low pitch (like a drum).'),
              ff('Did you know? Light travels at about 300,000 km per second — the fastest speed in the universe! Sound only travels at about 343 m/s in air.'),
              q('Which type of wave is sound?', ['Transverse', 'Longitudinal', 'Both', 'Neither'], 1),
              q('What measures how many waves pass per second?', ['Wavelength', 'Amplitude', 'Frequency', 'Speed'], 2),
              q('What is the fastest thing in the universe?', ['Sound', 'Light', 'A rocket', 'Wind'], 1),
              s('Waves: Transverse (up-down, light), Longitudinal (push-pull, sound). Properties: Wavelength, Amplitude (energy), Frequency (Hz). Light = fastest!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-lit', name: '21st Century Literature', emoji: '📚', color: 'from-rose-400 to-pink-400',
    chapters: [
      {
        id: 'sh-lit-1', title: 'Philippine Literature Today', emoji: '📖',
        pages: [
          {
            title: '21st Century Philippine Literature',
            blocks: [
              h('What is 21st Century Literature?'),
              p('21st century literature refers to literary works created from 2001 to the present. In the Philippines, this includes works in Filipino, English, and regional languages.'),
              kt('21st Century Literature', 'Literary works created from 2001 onwards.'),
              h('Characteristics'),
              p('21st century literature often uses digital media, explores diverse themes, and breaks traditional forms. Writers use social media, blogs, and online platforms.'),
              kt('Digital Literature', 'Literary works created and shared through digital platforms.'),
              h('Notable Filipino Writers'),
              p('Contemporary Filipino writers explore themes of identity, migration, social issues, and technology.'),
              ex('Many Filipino writers today publish online, use mixed languages (Taglish), and write about modern Filipino life.'),
              q('When did 21st century literature begin?', ['1990', '2000', '2001', '2010'], 2),
              q('What is a key feature of 21st century literature?', ['Only printed books', 'Digital media and online platforms', 'Only traditional forms', 'Only in English'], 1),
              s('21st century literature (2001+): digital media, diverse themes, mixed languages, online platforms!'),
            ],
          },
        ],
      },
      {
        id: 'sh-lit-2', title: 'Creative Writing', emoji: '✍️',
        pages: [
          {
            title: 'Elements of Creative Writing',
            blocks: [
              h('What is Creative Writing?'),
              p('Creative writing is writing that goes beyond normal professional, journalistic, or technical forms. It includes poetry, fiction, drama, and creative nonfiction.'),
              kt('Creative Writing', 'Writing that uses imagination and creativity — poetry, fiction, drama, and creative nonfiction.'),
              h('Types of Creative Writing'),
              kt('Poetry', 'Writing that uses rhythm, imagery, and emotion. It does not need to rhyme.'),
              kt('Fiction', 'Made-up stories — novels, short stories, flash fiction.'),
              kt('Creative Nonfiction', 'True stories written creatively — memoirs, personal essays.'),
              kt('Drama', 'Writing meant to be performed — plays, screenplays.'),
              h('Key Elements'),
              kt('Character', 'The people in your story. Good characters have personality, goals, and flaws.'),
              kt('Setting', 'The time and place of your story. Good settings make readers feel they are there.'),
              kt('Plot', 'The events of your story. A good plot has a beginning, middle, and end.'),
              kt('Dialogue', 'The words characters say. Good dialogue sounds natural and reveals personality.'),
              ff('Did you know? The best creative writing comes from real emotions and experiences — even in fiction!'),
              tip('Read widely! The more you read, the better you write. Try different genres and styles.'),
              q('Which is a type of creative writing?', ['Bank report', 'Poetry', 'Tax form', 'Grocery list'], 1),
              q('What are made-up stories called?', ['Nonfiction', 'Fiction', 'Essay', 'Manual'], 1),
              q('What is the time and place of a story called?', ['Character', 'Setting', 'Plot', 'Theme'], 1),
              s('Creative writing: Poetry, Fiction, Creative Nonfiction, Drama. Elements: Character, Setting, Plot, Dialogue. Read widely to write better!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-arts', name: 'Contemporary Philippine Arts', emoji: '🎭', color: 'from-fuchsia-400 to-pink-400',
    chapters: [
      {
        id: 'sh-arts-1', title: 'Filipino Art Forms', emoji: '🎨',
        pages: [
          {
            title: 'Contemporary Arts in the Philippines',
            blocks: [
              h('What is Contemporary Art?'),
              p('Contemporary art is art created in the present time. In the Philippines, it blends traditional Filipino art forms with modern techniques and themes.'),
              kt('Contemporary Art', 'Art created in the present time, reflecting current issues and ideas.'),
              h('Art Forms in the Philippines'),
              p('Filipino artists work in many forms: painting, sculpture, music, dance, theater, film, and digital art.'),
              kt('Visual Arts', 'Art you can see — painting, drawing, sculpture, photography.'),
              kt('Performing Arts', 'Art performed live — dance, music, theater.'),
              kt('Digital Arts', 'Art created using technology — digital painting, animation, video art.'),
              h('National Artists'),
              p('The Philippines honors its best artists with the National Artist Award. This is the highest recognition for Filipino artists.'),
              kt('National Artist', 'The highest award given to Filipino artists who have made significant contributions to Philippine art.'),
              q('What is contemporary art?', ['Art from ancient times', 'Art created in the present time', 'Only paintings', 'Only traditional art'], 1),
              q('What is the highest award for Filipino artists?', ['Nobel Prize', 'National Artist Award', 'Oscar', 'Grammy'], 1),
              s('Contemporary Philippine Arts: blends traditional and modern. Visual, Performing, Digital arts. National Artist Award = highest honor!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-rational', name: 'Rational Functions', emoji: '➗', color: 'from-lime-400 to-green-400',
    chapters: [
      {
        id: 'sh-rat-1', title: 'Rational Expressions', emoji: '📊',
        pages: [
          {
            title: 'What is a Rational Function?',
            blocks: [
              h('Rational Functions'),
              p('A rational function is a fraction where both the numerator and denominator are polynomials. It looks like f(x) = P(x) / Q(x), where Q(x) is not zero.'),
              kt('Rational Function', 'A function of the form f(x) = P(x)/Q(x), where P and Q are polynomials and Q(x) ≠ 0.'),
              kt('Polynomial', 'An expression with variables and coefficients, like 2x² + 3x + 1.'),
              kt('Domain Restriction', 'Values of x that make the denominator zero — these are excluded from the domain.'),
              ex('f(x) = 1/x is a rational function. The domain is all real numbers except x = 0 (because dividing by zero is undefined).'),
              ex('f(x) = (x² - 4)/(x - 2) simplifies to f(x) = x + 2 when x ≠ 2.'),
              ff('Did you know? Rational functions are used in physics to describe things like electrical resistance and the motion of planets!'),
              q('What is a rational function?', ['A function with only addition', 'A fraction of two polynomials', 'A function with no variables', 'A polynomial only'], 1),
              q('What values are excluded from the domain of f(x) = 1/x?', ['x = 1', 'x = 0', 'x = -1', 'All values'], 1),
              q('f(x) = (x² - 9)/(x + 3) simplifies to?', ['x - 3', 'x + 3', 'x² + 3', 'x - 9'], 0),
              s('Rational function = P(x)/Q(x). Domain excludes values where Q(x) = 0. Simplify by factoring numerator and denominator!'),
            ],
          },
          {
            title: 'Asymptotes and Graphs',
            blocks: [
              h('Vertical Asymptotes'),
              p('A vertical asymptote is a vertical line where the function goes toward infinity. It occurs where the denominator is zero (but the numerator is not).'),
              kt('Vertical Asymptote', 'A vertical line x = a where f(x) goes to ±∞. Found where the denominator = 0.'),
              h('Horizontal Asymptotes'),
              p('A horizontal asymptote is a horizontal line that the function approaches as x goes to ±∞.'),
              kt('Horizontal Asymptote', 'A horizontal line y = b that the function approaches as x → ±∞.'),
              ex('f(x) = 1/x has a vertical asymptote at x = 0 and a horizontal asymptote at y = 0. The graph never touches these lines but gets very close!'),
              d('📊', 'Vertical asymptote: x = a (denominator = 0). Horizontal asymptote: y = b (as x → ±∞)'),
              q('Where does a vertical asymptote occur?', ['Where numerator = 0', 'Where denominator = 0', 'At x = 0 always', 'At y = 0 always'], 1),
              q('What is the horizontal asymptote of f(x) = 1/x?', ['y = 1', 'y = 0', 'x = 0', 'y = x'], 1),
              q('What does the function do near a vertical asymptote?', ['Stops', 'Goes toward infinity', 'Becomes zero', 'Stays constant'], 1),
              s('Vertical asymptote: denominator = 0. Horizontal asymptote: y = b as x → ±∞. The graph approaches but never touches asymptotes!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-rocks', name: 'Earth Materials', emoji: '🪨', color: 'from-stone-400 to-amber-400',
    chapters: [
      {
        id: 'sh-rock-1', title: 'Rocks and Minerals', emoji: '🪨',
        pages: [
          {
            title: 'Three Types of Rocks',
            blocks: [
              h('How Rocks Form'),
              p('Rocks are solid materials that make up the Earth\'s crust. There are three main types of rocks, classified by how they form.'),
              kt('Rock', 'A naturally occurring solid made of minerals that makes up the Earth\'s crust.'),
              kt('Igneous Rock', 'Formed from cooled magma or lava. Examples: basalt, granite, obsidian.'),
              kt('Sedimentary Rock', 'Formed from layers of sediment (sand, mud, shells) pressed together over time. Examples: sandstone, limestone, shale.'),
              kt('Metamorphic Rock', 'Formed when existing rocks are changed by heat and pressure. Examples: marble (from limestone), slate (from shale).'),
              d('🪨', 'Igneous (cooling magma), Sedimentary (layers of sediment), Metamorphic (heat + pressure)'),
              ex('The Rock Cycle: Magma cools → Igneous rock → Weathering → Sediment → Sedimentary rock → Heat/Pressure → Metamorphic rock → Melting → Magma.'),
              ff('Did you know? Diamonds are metamorphic rocks formed from carbon under extreme heat and pressure deep underground!'),
              q('Which rock forms from cooled lava?', ['Sedimentary', 'Igneous', 'Metamorphic', 'All three'], 1),
              q('Which rock forms from layers of sediment?', ['Igneous', 'Sedimentary', 'Metamorphic', 'None'], 1),
              q('What rock forms from limestone under heat and pressure?', ['Granite', 'Marble', 'Sandstone', 'Obsidian'], 1),
              s('Three rock types: Igneous (cooling magma/lava), Sedimentary (pressed sediment layers), Metamorphic (heat + pressure). Rock cycle connects them!'),
            ],
          },
          {
            title: 'Minerals',
            blocks: [
              h('What is a Mineral?'),
              p('A mineral is a naturally occurring, non-living solid with a specific chemical composition and crystal structure.'),
              kt('Mineral', 'A naturally occurring solid with a definite chemical composition and crystal structure.'),
              kt('Crystal Structure', 'The orderly, repeating arrangement of atoms in a mineral.'),
              kt('Hardness', 'How resistant a mineral is to being scratched, measured on the Mohs scale (1-10).'),
              d('💎', 'Mineral properties: Color, hardness, crystal shape, luster (shininess), streak (powder color)'),
              ex('Quartz is one of the most common minerals. Diamond is the hardest mineral (Mohs hardness 10). Talc is the softest (Mohs hardness 1).'),
              ff('Did you know? The Mohs hardness scale goes from 1 (talc, very soft) to 10 (diamond, the hardest natural mineral)!'),
              q('What is a mineral?', ['Any rock', 'A naturally occurring solid with a specific composition and crystal structure', 'A liquid', 'A gas'], 1),
              q('What is the hardest mineral on the Mohs scale?', ['Quartz', 'Diamond', 'Talc', 'Gold'], 1),
              q('What measures a mineral\'s resistance to scratching?', ['Color', 'Hardness', 'Luster', 'Streak'], 1),
              s('Minerals: naturally occurring, solid, specific composition, crystal structure. Properties: hardness (Mohs 1-10), color, luster, streak. Diamond = hardest!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sh-genres', name: 'Literary Genres', emoji: '🎭', color: 'from-fuchsia-400 to-purple-400',
    chapters: [
      {
        id: 'sh-gen-1', title: 'Types of Literature', emoji: '📚',
        pages: [
          {
            title: 'Major Literary Genres',
            blocks: [
              h('What is a Genre?'),
              p('A genre is a category of literature characterized by a particular style, form, or content. There are four main literary genres.'),
              kt('Genre', 'A category of literature with a specific style, form, or content.'),
              kt('Poetry', 'Writing that uses rhythm, imagery, and emotion. It may or may not rhyme. Examples: haiku, sonnet, free verse.'),
              kt('Prose', 'Writing in ordinary language without a regular meter. Includes fiction and nonfiction.'),
              kt('Drama', 'Writing meant to be performed by actors on stage or screen. Examples: plays, scripts, screenplays.'),
              kt('Creative Nonfiction', 'True stories written with literary techniques — memoirs, essays, journals.'),
              d('🎭', 'Poetry (rhythm/imagery), Prose (ordinary language), Drama (performed), Creative Nonfiction (true stories)'),
              ex('Poetry: "The Raven" by Edgar Allan Poe. Prose: "Noli Me Tangere" by Jose Rizal. Drama: "Romeo and Juliet" by Shakespeare.'),
              q('Which genre is meant to be performed by actors?', ['Poetry', 'Prose', 'Drama', 'Nonfiction'], 2),
              q('Which genre uses rhythm and imagery?', ['Prose', 'Poetry', 'Drama', 'Essay'], 1),
              q('What genre is "Noli Me Tangere"?', ['Poetry', 'Drama', 'Prose (fiction)', 'Creative Nonfiction'], 2),
              s('Four genres: Poetry (rhythm/imagery), Prose (ordinary language), Drama (performed), Creative Nonfiction (true stories with literary style)!'),
            ],
          },
          {
            title: 'Sub-genres of Fiction',
            blocks: [
              h('Types of Fiction'),
              p('Fiction is prose writing about imaginary events. There are many sub-genres of fiction, each with unique features.'),
              kt('Realistic Fiction', 'Stories that could happen in real life, with realistic characters and settings.'),
              kt('Fantasy', 'Stories with magic, mythical creatures, or impossible events. Examples: Harry Potter, Lord of the Rings.'),
              kt('Science Fiction', 'Stories about advanced technology, space, or the future. Examples: Star Wars, Dune.'),
              kt('Mystery', 'Stories about solving a crime or puzzle. The reader tries to figure out the answer along with the detective.'),
              kt('Historical Fiction', 'Stories set in the past with real historical events mixed with fictional characters.'),
              ex('Realistic: "To Kill a Mockingbird." Fantasy: "The Hobbit." Sci-Fi: "The Hunger Games." Mystery: "Sherlock Holmes." Historical: "The Book Thief."'),
              ff('Did you know? The oldest known story in the world is the Epic of Gilgamesh, written about 4,000 years ago in ancient Mesopotamia!'),
              q('Which genre features magic and mythical creatures?', ['Realistic Fiction', 'Fantasy', 'Mystery', 'Historical Fiction'], 1),
              q('Which genre is about solving crimes?', ['Fantasy', 'Science Fiction', 'Mystery', 'Historical Fiction'], 2),
              q('Which genre is set in the past with real events?', ['Fantasy', 'Science Fiction', 'Mystery', 'Historical Fiction'], 3),
              s('Fiction sub-genres: Realistic (could happen), Fantasy (magic), Sci-Fi (technology/future), Mystery (crime solving), Historical (past + real events)!'),
            ],
          },
        ],
      },
    ],
  },
];

// ===================== SENIOR HIGH (Specialized) ===========================

const specializedSubjects: TextbookSubject[] = [
  {
    id: 'sp-stem', name: 'STEM', emoji: '🔬', color: 'from-blue-500 to-indigo-500',
    chapters: [
      {
        id: 'sp-stem-1', title: 'Calculus Basics', emoji: '∫',
        pages: [
          {
            title: 'Derivatives',
            blocks: [
              h('What is a Derivative?'),
              p('A derivative measures how fast something changes. It tells us the rate of change of a function at any point.'),
              kt('Derivative', 'The rate of change of a function at a given point.'),
              h('Basic Rules'),
              p('The power rule: if f(x) = x^n, then f\'(x) = nx^(n-1).'),
              ex('d/dx(x²) = 2x. d/dx(x³) = 3x². d/dx(5) = 0 (constants have zero derivative). d/dx(3x) = 3.'),
              kt('Power Rule', 'If f(x) = x^n, then f\'(x) = nx^(n-1).'),
              h('Derivatives of Common Functions'),
              p('d/dx(sin x) = cos x. d/dx(cos x) = -sin x. d/dx(e^x) = e^x. d/dx(ln x) = 1/x.'),
              ex('The derivative of position is velocity. The derivative of velocity is acceleration.'),
              q('What is the derivative of x²?', ['x', '2x', 'x³', '2'], 1),
              q('What is the derivative of 5?', ['0', '5', '1', 'undefined'], 0),
              q('What is the derivative of sin(x)?', ['-sin(x)', 'cos(x)', '-cos(x)', 'sin(x)'], 1),
              s('Derivatives measure rate of change. Power rule: d/dx(x^n) = nx^(n-1). Constants = 0!'),
            ],
          },
          {
            title: 'Integrals',
            blocks: [
              h('What is an Integral?'),
              p('An integral is the opposite of a derivative. It finds the total amount or area under a curve.'),
              kt('Integral', 'The reverse of a derivative — finds area under a curve or total accumulation.'),
              h('Basic Integration Rules'),
              p('The power rule for integration: ∫x^n dx = x^(n+1)/(n+1) + C, where C is the constant of integration.'),
              ex('∫2x dx = x² + C. ∫3x² dx = x³ + C. ∫1 dx = x + C. ∫0 dx = C.'),
              kt('Constant of Integration (C)', 'An unknown constant added to every indefinite integral because the derivative of a constant is zero.'),
              h('Definite vs Indefinite Integrals'),
              p('Indefinite integrals give a general formula (+ C). Definite integrals give a specific number (the area between two points).'),
              q('What is the integral of 2x?', ['x² + C', '2', 'x²', '2x²'], 0),
              q('What is the integral of 1?', ['0', 'x + C', '1', 'C'], 1),
              q('What does C represent in integration?', ['A variable', 'Constant of integration', 'A coefficient', 'A constant only'], 1),
              s('Integrals are the reverse of derivatives. ∫x^n dx = x^(n+1)/(n+1) + C. Definite = number, Indefinite = formula + C!'),
            ],
          },
        ],
      },
      {
        id: 'sp-stem-2', title: 'Physics: Forces and Motion', emoji: '⚡',
        pages: [
          {
            title: "Newton's Laws of Motion",
            blocks: [
              h("Newton's Three Laws"),
              p('Isaac Newton described three laws that explain how objects move.'),
              h('First Law: Inertia'),
              p('An object at rest stays at rest, and an object in motion stays in motion, unless acted on by a force.'),
              kt('Inertia', 'The tendency of an object to resist changes in its motion.'),
              h('Second Law: F = ma'),
              p('Force equals mass times acceleration. The bigger the mass or acceleration, the bigger the force needed.'),
              kt("Newton's Second Law", 'Force = mass × acceleration (F = ma).'),
              ex('If mass = 2 kg and acceleration = 3 m/s², then Force = 2 × 3 = 6 Newtons.'),
              h('Third Law: Action-Reaction'),
              p('For every action, there is an equal and opposite reaction. When you push something, it pushes back with the same force.'),
              kt("Newton's Third Law", 'Every action has an equal and opposite reaction.'),
              ex('When you walk, you push the ground back, and the ground pushes you forward!'),
              q('What is the formula for Newton\'s second law?', ['F = mv', 'F = ma', 'F = m/a', 'F = a/m'], 1),
              q('What does the first law describe?', ['Force', 'Inertia', 'Action-reaction', 'Energy'], 1),
              q('If mass = 5 kg and a = 2 m/s², what is F?', ['5 N', '7 N', '10 N', '15 N'], 2),
              s("Newton's Laws: 1st (inertia), 2nd (F=ma), 3rd (action=reaction)!"),
            ],
          },
        ],
      },
      {
        id: 'sp-stem-4', title: 'Organic Chemistry', emoji: '🧪',
        pages: [
          {
            title: 'Carbon and Hydrocarbons',
            blocks: [
              h('What is Organic Chemistry?'),
              p('Organic chemistry is the study of carbon-containing compounds. Carbon is special because it can form four bonds, making chains, rings, and complex structures.'),
              kt('Organic Chemistry', 'The study of carbon-containing compounds.'),
              kt('Hydrocarbon', 'A compound made of only hydrogen and carbon atoms. Examples: methane (CH₄), ethane (C₂H₆).'),
              d('🧪', 'Carbon (C) forms 4 bonds. Hydrocarbons = only C and H.'),
              h('Types of Hydrocarbons'),
              kt('Alkane', 'Single bonds only. Formula: CₙH₂ₙ₊₂. Saturated (no more H can be added). Example: methane CH₄, ethane C₂H₆.'),
              kt('Alkene', 'Contains at least one double bond (C=C). Formula: CₙH₂ₙ. Example: ethene C₂H₄.'),
              kt('Alkyne', 'Contains at least one triple bond (C≡C). Formula: CₙH₂ₙ₋₂. Example: ethyne (acetylene) C₂H₂.'),
              ex('Alkane (single): CH₄ methane. Alkene (double): C₂H₄ ethene. Alkyne (triple): C₂H₂ ethyne. More bonds = fewer H atoms.'),
              kt('Saturated', 'Has only single bonds. Cannot add more hydrogen. All alkanes are saturated.'),
              kt('Unsaturated', 'Has double or triple bonds. Can add more hydrogen. Alkenes and alkynes are unsaturated.'),
              ff('Did you know? The word "organic" in chemistry does not mean "natural" or "pesticide-free" — it means "containing carbon"!'),
              q('What element is the basis of organic chemistry?', ['Oxygen', 'Carbon', 'Nitrogen', 'Hydrogen'], 1),
              q('Which hydrocarbon has only single bonds?', ['Alkene', 'Alkyne', 'Alkane', 'Aromatic'], 2),
              q('What is the formula for alkanes?', ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], 1),
              s('Organic chemistry = study of carbon compounds. Hydrocarbons: Alkane (single, CₙH₂ₙ₊₂), Alkene (double, CₙH₂ₙ), Alkyne (triple, CₙH₂ₙ₋₂). Saturated vs unsaturated!'),
            ],
          },
          {
            title: 'Functional Groups',
            blocks: [
              h('What are Functional Groups?'),
              p('Functional groups are specific groups of atoms within molecules that give the molecule its chemical properties. They determine how a compound reacts.'),
              kt('Functional Group', 'A specific group of atoms in a molecule that determines its chemical properties and reactions.'),
              h('Common Functional Groups'),
              kt('Hydroxyl (-OH)', 'Found in alcohols. Makes compounds soluble in water. Example: ethanol (C₂H₅OH).'),
              kt('Carboxyl (-COOH)', 'Found in carboxylic acids. Acidic properties. Example: acetic acid (vinegar, CH₃COOH).'),
              kt('Amino (-NH₂)', 'Found in amino acids and proteins. Basic properties. Essential for life!'),
              kt('Carbonyl (C=O)', 'Found in aldehydes and ketones. Example: formaldehyde, acetone.'),
              d('🧪', '-OH (alcohol), -COOH (acid), -NH₂ (amino), C=O (aldehyde/ketone)'),
              ex('Ethanol (drinking alcohol) has a hydroxyl group. Vinegar has a carboxyl group. Amino acids (building blocks of proteins) have both amino and carboxyl groups!'),
              ff('Did you know? All amino acids — the building blocks of proteins and life — contain both an amino group (-NH₂) and a carboxyl group (-COOH)!'),
              q('Which functional group is found in alcohols?', ['Carboxyl', 'Hydroxyl', 'Amino', 'Carbonyl'], 1),
              q('Which functional group makes vinegar acidic?', ['Hydroxyl', 'Amino', 'Carboxyl', 'Carbonyl'], 2),
              q('Which two groups do amino acids contain?', ['Only hydroxyl', 'Amino and carboxyl', 'Only carbonyl', 'Only carboxyl'], 1),
              s('Functional groups: Hydroxyl -OH (alcohols), Carboxyl -COOH (acids), Amino -NH₂ (amino acids), Carbonyl C=O (aldehydes/ketones). They determine chemical properties!'),
            ],
          },
        ],
      },
      {
        id: 'sp-stem-3', title: 'Biology: Genetics', emoji: '🧬',
        pages: [
          {
            title: 'DNA and Heredity',
            blocks: [
              h('What is Genetics?'),
              p('Genetics is the study of how traits are passed from parents to offspring. It explains why you look like your parents but are not exactly the same.'),
              kt('Genetics', 'The study of how traits are passed from parents to offspring.'),
              kt('DNA', 'Deoxyribonucleic acid — the molecule that carries genetic instructions for all living things.'),
              kt('Gene', 'A section of DNA that codes for a specific trait, like eye color or height.'),
              kt('Chromosome', 'A structure in the cell nucleus that contains DNA. Humans have 46 chromosomes (23 pairs).'),
              d('🧬', 'DNA → Gene (trait) → Chromosome (46 in humans, 23 pairs)'),
              h('Heredity Patterns'),
              kt('Dominant Trait', 'A trait that appears if at least one dominant gene is present. Shown with a capital letter (e.g., T for tall).'),
              kt('Recessive Trait', 'A trait that only appears if both genes are recessive. Shown with a lowercase letter (e.g., t for short).'),
              kt('Genotype', 'The genetic makeup of an organism — the combination of genes (e.g., TT, Tt, tt).'),
              kt('Phenotype', 'The physical appearance of an organism — what you can see (e.g., tall or short).'),
              ex('If T = tall (dominant) and t = short (recessive): TT = tall, Tt = tall, tt = short. Two parents with Tt can have a tt child (25% chance).'),
              ff('Did you know? Humans share about 98.8% of their DNA with chimpanzees — our closest living relatives!'),
              q('What molecule carries genetic instructions?', ['Protein', 'DNA', 'RNA', 'Carbohydrate'], 1),
              q('How many chromosomes do humans have?', ['23', '46', '48', '92'], 1),
              q('Which trait appears only when both genes are recessive?', ['Dominant', 'Recessive', 'Co-dominant', 'Mixed'], 1),
              s('Genetics: DNA → Gene → Chromosome (46 in humans). Dominant (capital, appears with one gene), Recessive (lowercase, needs two). Genotype = genes, Phenotype = appearance!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sp-humss', name: 'HUMSS', emoji: '🏛️', color: 'from-amber-500 to-orange-500',
    chapters: [
      {
        id: 'sp-humss-1', title: 'Psychology Basics', emoji: '🧠',
        pages: [
          {
            title: 'Introduction to Psychology',
            blocks: [
              h('What is Psychology?'),
              p('Psychology is the scientific study of the mind and behavior. It helps us understand how people think, feel, and act.'),
              kt('Psychology', 'The scientific study of the mind and behavior.'),
              h('Father of Psychology'),
              p('Wilhelm Wundt is considered the father of psychology. He opened the first psychology laboratory in 1879 in Germany.'),
              kt('Wilhelm Wundt', 'The father of psychology who opened the first psychology lab in 1879.'),
              h('Sigmund Freud'),
              p('Sigmund Freud founded psychoanalysis, a theory that unconscious thoughts and feelings influence our behavior.'),
              kt('Psychoanalysis', 'Freud\'s theory that unconscious thoughts and childhood experiences influence behavior.'),
              h('Major Branches'),
              p('Psychology has many branches: cognitive (thinking), behavioral (actions), developmental (growth), social (interactions), and abnormal (disorders).'),
              q('Who is the father of psychology?', ['Sigmund Freud', 'Wilhelm Wundt', 'B.F. Skinner', 'Ivan Pavlov'], 1),
              q('Who founded psychoanalysis?', ['Wilhelm Wundt', 'Sigmund Freud', 'Carl Jung', 'John Watson'], 1),
              q('What does psychology study?', ['Only the brain', 'The mind and behavior', 'Only animals', 'Only society'], 1),
              s('Psychology = study of mind and behavior. Wundt = father. Freud = psychoanalysis. Branches: cognitive, behavioral, developmental, social, abnormal!'),
            ],
          },
        ],
      },
      {
        id: 'sp-humss-2', title: 'Philosophy', emoji: '💭',
        pages: [
          {
            title: 'What is Philosophy?',
            blocks: [
              h('Definition of Philosophy'),
              p('Philosophy literally means "love of wisdom." It is the study of fundamental questions about existence, knowledge, values, reason, and language.'),
              kt('Philosophy', 'The study of fundamental questions about existence, knowledge, values, and reason.'),
              h('Branches of Philosophy'),
              p('Philosophy has several main branches, each asking different questions.'),
              kt('Metaphysics', 'The study of reality and what exists.'),
              kt('Epistemology', 'The study of knowledge — how we know what we know.'),
              kt('Ethics', 'The study of right and wrong, good and bad.'),
              kt('Logic', 'The study of reasoning and valid arguments.'),
              kt('Aesthetics', 'The study of beauty and art.'),
              h('Famous Philosophers'),
              p('Socrates, Plato, and Aristotle are the most famous ancient Greek philosophers. Socrates said "I think, therefore I am" — actually that was Descartes! Socrates is known for the Socratic method of asking questions.'),
              q('What does philosophy mean?', ['Love of money', 'Love of wisdom', 'Study of nature', 'Study of art'], 1),
              q('Which branch studies right and wrong?', ['Metaphysics', 'Epistemology', 'Ethics', 'Logic'], 2),
              q('Who said "I think, therefore I am"?', ['Socrates', 'Plato', 'Aristotle', 'René Descartes'], 3),
              s('Philosophy = love of wisdom. Branches: Metaphysics (reality), Epistemology (knowledge), Ethics (right/wrong), Logic (reasoning), Aesthetics (beauty)!'),
            ],
          },
        ],
      },
      {
        id: 'sp-humss-3', title: 'Political Science', emoji: '🏛️',
        pages: [
          {
            title: 'Government and Power',
            blocks: [
              h('What is Political Science?'),
              p('Political science is the study of government, power, and how societies make decisions. It examines how leaders are chosen and how laws are made.'),
              kt('Political Science', 'The study of government, power, and political behavior.'),
              h('Forms of Government'),
              kt('Democracy', 'Government by the people. Citizens vote for their leaders. The Philippines is a democracy.'),
              kt('Monarchy', 'Government by a king or queen. Power passes through a family (e.g., United Kingdom).'),
              kt('Dictatorship', 'Government by one person or a small group with total power. Citizens have no say.'),
              kt('Republic', 'A democracy where citizens elect representatives to make decisions for them.'),
              d('🏛️', 'Democracy (people vote), Monarchy (king/queen), Dictatorship (one ruler), Republic (elected representatives)'),
              h('The Philippine Government'),
              p('The Philippines is a democratic republic with three branches of government that balance each other.'),
              kt('Executive Branch', 'Enforces the laws. Led by the President.'),
              kt('Legislative Branch', 'Makes the laws. Led by Congress (Senate + House of Representatives).'),
              kt('Judicial Branch', 'Interprets the laws. Led by the Supreme Court.'),
              ex('The President (executive) enforces laws passed by Congress (legislative). The Supreme Court (judicial) checks if laws are constitutional.'),
              ff('Did you know? The Philippines was the first democratic republic in Asia, established in 1899!'),
              q('Which government is ruled by the people?', ['Monarchy', 'Democracy', 'Dictatorship', 'Oligarchy'], 1),
              q('Which branch makes the laws?', ['Executive', 'Legislative', 'Judicial', 'Military'], 1),
              q('Which branch enforces the laws?', ['Executive', 'Legislative', 'Judicial', 'Senate'], 0),
              s('Government types: Democracy (people), Monarchy (king/queen), Dictatorship (one ruler), Republic (representatives). Philippines: Executive (President), Legislative (Congress), Judicial (Supreme Court)!'),
            ],
          },
        ],
      },
      {
        id: 'sp-humss-5', title: 'Globalization', emoji: '🌐',
        pages: [
          {
            title: 'What is Globalization?',
            blocks: [
              h('A Connected World'),
              p('Globalization is the process by which countries become more connected through trade, communication, technology, and culture. The world is more linked now than ever before.'),
              kt('Globalization', 'The process by which countries and people become increasingly connected through trade, communication, technology, and cultural exchange.'),
              d('🌐', 'Trade + Communication + Technology + Culture = Globalization'),
              h('Drivers of Globalization'),
              kt('International Trade', 'Countries buying and selling goods across borders. Example: Philippines exports electronics and agricultural products.'),
              kt('Multinational Corporations', 'Companies that operate in many countries. Examples: Coca-Cola, McDonald\'s, Samsung, Toyota.'),
              kt('Internet and Technology', 'The internet connects people instantly worldwide. Social media, video calls, and online shopping.'),
              kt('Transportation', 'Faster ships and airplanes move goods and people across the world quickly.'),
              ex('You can eat sushi in Manila, watch a Korean drama on Netflix, and chat with a friend in Canada — all in one day. That\'s globalization!'),
              ff('Did you know? The word "globalization" became popular in the 1990s, but the process started centuries ago with ancient trade routes like the Silk Road!'),
              q('What is globalization?', ['Countries becoming less connected', 'Countries becoming more connected through trade and technology', 'Only about the internet', 'Only about war'], 1),
              q('Which is a driver of globalization?', ['Isolation', 'International trade', 'Closing borders', 'Banning technology'], 1),
              q('What ancient trade route connected East and West?', ['Amazon River', 'Silk Road', 'Panama Canal', 'Suez Canal'], 1),
              s('Globalization = countries connected through trade, technology, communication, culture. Drivers: trade, multinational corps, internet, transportation. Started with Silk Road!'),
            ],
          },
          {
            title: 'Pros and Cons of Globalization',
            blocks: [
              h('Two Sides of Globalization'),
              p('Globalization has both positive and negative effects. Understanding both helps us make informed decisions.'),
              h('Advantages'),
              kt('Economic Growth', 'Countries can sell goods to more markets, creating jobs and wealth.'),
              kt('Cultural Exchange', 'People learn about other cultures — food, music, art, languages. Example: Korean pop (K-Pop) worldwide.'),
              kt('Access to Technology', 'New technologies spread faster. Developing countries can access modern medicine, phones, and education.'),
              kt('Lower Prices', 'Goods produced in countries with lower costs can be sold cheaper worldwide.'),
              h('Disadvantages'),
              kt('Loss of Local Culture', 'Global brands and media can overshadow local traditions and languages.'),
              kt('Environmental Impact', 'More production and transportation means more pollution and resource use.'),
              kt('Inequality', 'Wealthy countries and corporations benefit more than poor countries. Gap between rich and poor can widen.'),
              kt('Job Loss', 'Local industries may close when cheaper goods arrive from other countries.'),
              d('🌐', 'Pros: Growth, Culture, Technology, Lower prices. Cons: Culture loss, Environment, Inequality, Job loss.'),
              ex('Positive: Filipino nurses working abroad send money home (OFW remittances boost the economy). Negative: Local sari-sari stores may close when big foreign chains open nearby.'),
              tip('As a student, you can enjoy globalization\'s benefits while preserving your culture — learn about other countries but also celebrate Filipino traditions!'),
              q('Which is an advantage of globalization?', ['Job loss', 'Cultural exchange', 'Environmental damage', 'Inequality'], 1),
              q('Which is a disadvantage of globalization?', ['Economic growth', 'Access to technology', 'Loss of local culture', 'Lower prices'], 2),
              q('What is a positive effect of Filipino workers abroad?', ['Brain drain only', 'OFW remittances boost the economy', 'No effect', 'Less trade'], 1),
              s('Globalization pros: Economic growth, cultural exchange, technology access, lower prices. Cons: Culture loss, environment, inequality, job loss. Balance is key!'),
            ],
          },
        ],
      },
      {
        id: 'sp-humss-4', title: 'World History', emoji: '🌍',
        pages: [
          {
            title: 'Major Events in World History',
            blocks: [
              h('Ancient Civilizations'),
              p('Some of the earliest civilizations began around major rivers. They developed writing, farming, and government.'),
              kt('Civilization', 'A complex society with cities, government, writing, and culture.'),
              kt('Mesopotamia', 'The earliest known civilization, between the Tigris and Euphrates rivers (modern Iraq). Invented writing (cuneiform).'),
              kt('Ancient Egypt', 'Civilization along the Nile River. Built pyramids and developed hieroglyphic writing.'),
              kt('Indus Valley', 'Civilization in modern-day Pakistan and India. Known for planned cities and drainage systems.'),
              d('🌍', 'Mesopotamia (Iraq), Egypt (Nile), Indus Valley (Pakistan/India), Ancient China (Yellow River)'),
              ex('The Great Pyramid of Giza in Egypt was built about 4,500 years ago and is one of the Seven Wonders of the Ancient World!'),
              ff('Did you know? The wheel was invented in Mesopotamia around 3500 BC — one of the most important inventions in history!'),
              q('Where did the earliest known civilization develop?', ['Egypt', 'Mesopotamia', 'China', 'Greece'], 1),
              q('Which civilization built the pyramids?', ['Mesopotamia', 'Egypt', 'Indus Valley', 'Rome'], 1),
              q('What was invented in Mesopotamia around 3500 BC?', ['The wheel', 'The computer', 'The airplane', 'The telephone'], 0),
              s('Ancient civilizations: Mesopotamia (writing, wheel), Egypt (pyramids), Indus Valley (planned cities), China (Yellow River). Started near rivers!'),
            ],
          },
          {
            title: 'World Wars',
            blocks: [
              h('World War I (1914-1918)'),
              p('World War I was a global war centered in Europe. It involved more than 30 countries and was one of the deadliest conflicts in history.'),
              kt('World War I', 'A global war from 1914 to 1918 involving more than 30 countries.'),
              kt('Allied Powers', 'The side that won WWI — included France, UK, Russia, and later the USA.'),
              kt('Central Powers', 'The side that lost WWI — included Germany, Austria-Hungary, and the Ottoman Empire.'),
              h('World War II (1939-1945)'),
              p('World War II was even larger than WWI. It involved more than 50 countries and was the deadliest conflict in human history.'),
              kt('World War II', 'A global war from 1939 to 1945 — the deadliest conflict in history.'),
              kt('Allies', 'The side that won WWII — included the UK, USA, Soviet Union, China, and the Philippines.'),
              kt('Axis Powers', 'The side that lost WWII — included Germany, Italy, and Japan.'),
              d('🌍', 'WWI (1914-1918): Allied vs Central. WWII (1939-1945): Allies vs Axis'),
              h('The Philippines in WWII'),
              p('The Philippines was occupied by Japan during WWII from 1942 to 1945. Filipino and American forces fought together to liberate the country.'),
              ex('General Douglas MacArthur famously promised "I shall return" — and he did, returning to the Philippines in 1944 to help liberate it.'),
              ff('Did you know? The United Nations was created after WWII in 1945 to prevent future world wars and promote peace!'),
              q('When was World War I?', ['1914-1918', '1939-1945', '1900-1910', '1920-1930'], 0),
              q('Which side won World War II?', ['Axis Powers', 'Allies', 'Central Powers', 'No one'], 1),
              q('What organization was created after WWII to promote peace?', ['NATO', 'United Nations', 'EU', 'ASEAN'], 1),
              s('WWI (1914-1918): Allied vs Central. WWII (1939-1945): Allies vs Axis. Philippines occupied by Japan 1942-1945. UN created 1945 for peace!'),
            ],
          },
          {
            title: 'The Cold War and Decolonization',
            blocks: [
              h('The Cold War (1947-1991)'),
              p('After WWII, the world was divided between two superpowers: the USA (capitalist/democratic) and the Soviet Union (communist). They never fought directly but competed in an "arms race" and a "space race."'),
              kt('Cold War', 'A period of tension (1947-1991) between the USA and the Soviet Union. No direct war but intense competition.'),
              kt('Capitalism', 'An economic system where businesses and property are privately owned. Used by the USA and its allies.'),
              kt('Communism', 'An economic system where the government owns businesses and property. Used by the Soviet Union and its allies.'),
              d('🌍', 'Cold War: USA (capitalism) vs Soviet Union (communism). No direct war — just tension and competition!'),
              h('Decolonization'),
              p('After WWII, many countries in Asia and Africa gained independence from European colonial powers. The Philippines gained independence from the USA on July 4, 1946.'),
              kt('Decolonization', 'The process of colonies gaining independence from colonial powers, mainly after WWII.'),
              ex('India gained independence from Britain in 1947. Indonesia from the Netherlands in 1945. The Philippines from the USA in 1946.'),
              ff('Did you know? The Cold War "Space Race" led to the Moon landing in 1969, when Neil Armstrong became the first human to walk on the Moon!'),
              q('What was the Cold War?', ['A hot war', 'Tension between USA and Soviet Union', 'A war about weather', 'A trade agreement'], 1),
              q('When did the Philippines gain independence from the USA?', ['July 4, 1946', 'June 12, 1898', 'August 13, 1898', 'September 2, 1945'], 0),
              q('Who was the first person to walk on the Moon?', ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'John Glenn'], 1),
              s('Cold War (1947-1991): USA (capitalism) vs Soviet Union (communism). Decolonization: colonies gained independence. Philippines: July 4, 1946. Moon landing: 1969!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sp-abm', name: 'ABM', emoji: '💼', color: 'from-green-500 to-emerald-500',
    chapters: [
      {
        id: 'sp-abm-1', title: 'Accounting Basics', emoji: '📒',
        pages: [
          {
            title: 'The Accounting Equation',
            blocks: [
              h('What is Accounting?'),
              p('Accounting is the process of recording, classifying, and summarizing financial transactions of a business.'),
              kt('Accounting', 'The process of recording and reporting financial information of a business.'),
              h('The Accounting Equation'),
              p('The fundamental accounting equation is: Assets = Liabilities + Equity. This must always balance!'),
              kt('Assets', 'What a business owns — cash, equipment, buildings, inventory.'),
              kt('Liabilities', 'What a business owes — loans, unpaid bills, debts.'),
              kt('Equity', 'The owner\'s interest in the business — what\'s left after paying all debts.'),
              ex('If a business has ₱100,000 in assets and ₱40,000 in liabilities, the equity is ₱60,000 (100,000 - 40,000).'),
              d('📒', 'Assets = Liabilities + Equity (must always balance!)'),
              q('What is the accounting equation?', ['Assets = Liabilities + Equity', 'Assets + Liabilities = Equity', 'Assets = Equity - Liabilities', 'Liabilities = Assets + Equity'], 0),
              q('What are assets?', ['What a business owes', 'What a business owns', 'What a business earns', 'What a business spends'], 1),
              q('If Assets = ₱50,000 and Liabilities = ₱20,000, what is Equity?', ['₱20,000', '₱30,000', '₱50,000', '₱70,000'], 1),
              s('Accounting equation: Assets = Liabilities + Equity. Assets = what you own, Liabilities = what you owe, Equity = owner\'s share!'),
            ],
          },
        ],
      },
      {
        id: 'sp-abm-2', title: 'Business and Economics', emoji: '📈',
        pages: [
          {
            title: 'Supply and Demand',
            blocks: [
              h('What is Economics?'),
              p('Economics is the study of how people, businesses, and governments use resources to produce and distribute goods and services.'),
              kt('Economics', 'The study of how resources are used to produce and distribute goods and services.'),
              h('The Law of Demand'),
              p('When the price of a product goes up, the quantity demanded goes down. When price goes down, demand goes up.'),
              kt('Law of Demand', 'As price increases, quantity demanded decreases (and vice versa).'),
              h('The Law of Supply'),
              p('When the price of a product goes up, producers want to sell more of it. When price goes down, supply goes down.'),
              kt('Law of Supply', 'As price increases, quantity supplied increases (and vice versa).'),
              h('Market Equilibrium'),
              p('When supply equals demand, the market is in equilibrium. This is where the supply and demand curves cross.'),
              kt('Equilibrium', 'The point where supply equals demand — the market price where buyers and sellers agree.'),
              d('📈', 'Supply goes up with price, Demand goes down with price. They meet at equilibrium!'),
              q('What happens to demand when price increases?', ['Demand increases', 'Demand decreases', 'Demand stays the same', 'Demand disappears'], 1),
              q('What happens to supply when price increases?', ['Supply increases', 'Supply decreases', 'Supply stays the same', 'Supply disappears'], 0),
              q('What is equilibrium?', ['When supply = demand', 'When supply > demand', 'When demand > supply', 'When price = 0'], 0),
              s('Economics: Demand (price↑ = demand↓), Supply (price↑ = supply↑), Equilibrium (supply = demand)!'),
            ],
          },
        ],
      },
      {
        id: 'sp-abm-3', title: 'Marketing Basics', emoji: '📢',
        pages: [
          {
            title: 'The Marketing Mix',
            blocks: [
              h('What is Marketing?'),
              p('Marketing is the process of promoting and selling products or services. It helps businesses reach customers and convince them to buy.'),
              kt('Marketing', 'The process of promoting and selling products or services to customers.'),
              h('The 4 Ps of Marketing'),
              p('The marketing mix consists of four key elements, all starting with the letter P.'),
              kt('Product', 'What you are selling — the good or service that meets a customer\'s need.'),
              kt('Price', 'How much the customer pays. Must be competitive but profitable.'),
              kt('Place', 'Where the product is sold — a store, online, or through distributors.'),
              kt('Promotion', 'How customers learn about the product — advertising, social media, sales, events.'),
              d('📢', 'Product (what) + Price (how much) + Place (where) + Promotion (how they learn)'),
              ex('A new phone: Product = smartphone with great camera. Price = ₱15,000. Place = online store + retail shops. Promotion = TV ads + social media influencers.'),
              h('Target Market'),
              p('A target market is the specific group of customers a business wants to reach.'),
              kt('Target Market', 'The specific group of customers a business aims to sell to.'),
              ex('A toy company\'s target market: parents with children ages 3-10. A gym\'s target market: adults ages 18-45 who want to get fit.'),
              ff('Did you know? The average person sees about 6,000 to 10,000 ads every day — from billboards, TV, social media, and more!'),
              q('What are the 4 Ps of marketing?', ['Product, Price, Place, Promotion', 'People, Process, Profit, Plan', 'Plan, Produce, Push, Profit', 'Product, People, Profit, Place'], 0),
              q('What is "Place" in the marketing mix?', ['Where the product is sold', 'How much it costs', 'What the product is', 'How it is advertised'], 0),
              q('What is a target market?', ['All people everywhere', 'The specific group of customers a business aims to reach', 'Only rich customers', 'The competition'], 1),
              s('Marketing 4 Ps: Product (what), Price (how much), Place (where), Promotion (how they learn). Target Market = the specific customers you aim to reach!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sp-gas', name: 'GAS', emoji: '📋', color: 'from-cyan-500 to-blue-500',
    chapters: [
      {
        id: 'sp-gas-1', title: 'Organization and Management', emoji: '🏢',
        pages: [
          {
            title: 'Principles of Management',
            blocks: [
              h('What is Management?'),
              p('Management is the process of planning, organizing, leading, and controlling resources to achieve organizational goals.'),
              kt('Management', 'The process of planning, organizing, leading, and controlling to achieve goals.'),
              h('Four Functions of Management'),
              p('There are four main functions of management.'),
              kt('Planning', 'Setting goals and deciding how to achieve them.'),
              kt('Organizing', 'Arranging resources and tasks to achieve goals.'),
              kt('Leading', 'Motivating and guiding employees to work toward goals.'),
              kt('Controlling', 'Monitoring performance and making corrections as needed.'),
              h('Henri Fayol\'s 14 Principles'),
              p('Henri Fayol identified 14 principles of management, including division of work, authority and responsibility, unity of command, and discipline.'),
              q('What is the first function of management?', ['Organizing', 'Planning', 'Leading', 'Controlling'], 1),
              q('How many main functions of management are there?', ['3', '4', '5', '6'], 1),
              q('Which function involves motivating employees?', ['Planning', 'Organizing', 'Leading', 'Controlling'], 2),
              s('Management: Planning (set goals), Organizing (arrange resources), Leading (motivate), Controlling (monitor)!'),
            ],
          },
        ],
      },
      {
        id: 'sp-gas-2', title: 'Disaster Readiness', emoji: '🚨',
        pages: [
          {
            title: 'Preparing for Emergencies',
            blocks: [
              h('What is Disaster Readiness?'),
              p('Disaster readiness means being prepared before, during, and after natural disasters like typhoons, earthquakes, and floods.'),
              kt('Disaster Readiness', 'Being prepared for natural disasters to protect lives and property.'),
              h('Before a Disaster'),
              p('Prepare an emergency kit and a family plan. Know the evacuation routes and emergency contacts.'),
              kt('Emergency Kit', 'A bag with essentials: water, food, flashlight, first aid, radio, batteries, clothes.'),
              kt('Evacuation Plan', 'A plan for where to go and how to get there safely during a disaster.'),
              tip('Keep important documents (IDs, birth certificates) in a waterproof bag inside your emergency kit!'),
              h('During a Disaster'),
              p('Stay calm. Follow instructions from authorities. Do not go outside during a typhoon. During an earthquake, drop, cover, and hold on.'),
              kt('Drop, Cover, Hold On', 'The earthquake safety rule: drop to the floor, take cover under a sturdy table, and hold on until the shaking stops.'),
              h('After a Disaster'),
              p('Check for injuries. Stay away from damaged buildings and downed power lines. Listen to the radio for updates.'),
              ff('Did you know? The Philippines is one of the most disaster-prone countries in the world due to typhoons, earthquakes, and volcanic eruptions!'),
              q('What should be in an emergency kit?', ['Toys only', 'Water, food, flashlight, first aid', 'Money only', 'Nothing'], 1),
              q('What is the earthquake safety rule?', ['Run outside', 'Drop, Cover, Hold On', 'Stand still', 'Hide under a bed'], 1),
              q('What should you do after a disaster?', ['Go swimming', 'Check for injuries and stay away from damaged buildings', 'Ignore it', 'Use candles near gas leaks'], 1),
              s('Disaster readiness: Before (emergency kit + evacuation plan), During (stay calm, drop/cover/hold on for earthquakes), After (check injuries, avoid damaged buildings, listen to radio)!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sp-tvl', name: 'TVL', emoji: '🛠️', color: 'from-orange-500 to-amber-500',
    chapters: [
      {
        id: 'sp-tvl-1', title: 'ICT Basics', emoji: '💻',
        pages: [
          {
            title: 'Information and Communication Technology',
            blocks: [
              h('What is ICT?'),
              p('ICT stands for Information and Communication Technology. It includes all technologies used to communicate, create, manage, and share information.'),
              kt('ICT', 'Information and Communication Technology — technologies for communication and information management.'),
              h('Components of ICT'),
              p('ICT includes hardware (computers, phones), software (programs, apps), networks (internet), and data (information).'),
              kt('Hardware', 'Physical parts of a computer — keyboard, monitor, processor.'),
              kt('Software', 'Programs and applications that run on hardware — Windows, Word, games.'),
              kt('Network', 'A system that connects computers to share information — like the internet.'),
              h('Types of Networks'),
              p('LAN (Local Area Network) connects computers in a small area. WAN (Wide Area Network) connects computers across large distances. The internet is the largest WAN.'),
              kt('LAN', 'Local Area Network — connects computers in a small area like an office.'),
              kt('WAN', 'Wide Area Network — connects computers across large distances.'),
              q('What does ICT stand for?', ['Internet Communication Technology', 'Information and Communication Technology', 'Internal Computer Technology', 'International Communication Tech'], 1),
              q('What is software?', ['Physical parts of a computer', 'Programs that run on hardware', 'A type of network', 'A type of data'], 1),
              q('What does LAN stand for?', ['Large Area Network', 'Local Area Network', 'Long Access Network', 'Limited Area Network'], 1),
              s('ICT = Information and Communication Technology. Hardware (physical), Software (programs), Network (connections). LAN = local, WAN = wide!'),
            ],
          },
        ],
      },
      {
        id: 'sp-tvl-2', title: 'Web Development Basics', emoji: '🌐',
        pages: [
          {
            title: 'Building Websites',
            blocks: [
              h('What is Web Development?'),
              p('Web development is the process of creating websites. It involves designing how a website looks and programming how it works.'),
              kt('Web Development', 'The process of creating and maintaining websites.'),
              h('The Three Layers of Web Development'),
              kt('HTML', 'HyperText Markup Language — the structure of a website. It defines headings, paragraphs, images, and links.'),
              kt('CSS', 'Cascading Style Sheets — the design of a website. It controls colors, fonts, spacing, and layout.'),
              kt('JavaScript', 'The behavior of a website. It makes pages interactive — buttons, animations, forms.'),
              d('🌐', 'HTML (structure) + CSS (design) + JavaScript (behavior) = Website!'),
              ex('HTML: <h1>My Page</h1> creates a heading. CSS: h1 { color: blue; } makes it blue. JavaScript: button.onClick = showMessage makes it interactive.'),
              h('Frontend vs Backend'),
              kt('Frontend', 'The part of a website users see and interact with — the visual design and buttons.'),
              kt('Backend', 'The part behind the scenes — databases, servers, and logic that powers the website.'),
              ff('Did you know? The first website was created in 1991 by Tim Berners-Lee. It was just text with links — no images or colors!'),
              tip('Start learning HTML first, then CSS, then JavaScript. Practice by building a simple personal webpage!'),
              q('Which language defines the structure of a website?', ['CSS', 'HTML', 'JavaScript', 'Python'], 1),
              q('Which language controls the design and colors?', ['HTML', 'CSS', 'JavaScript', 'SQL'], 1),
              q('What is the backend of a website?', ['What users see', 'Servers and databases behind the scenes', 'The colors', 'The images'], 1),
              s('Web dev: HTML (structure), CSS (design), JavaScript (behavior). Frontend (what users see) + Backend (servers/databases). Start with HTML!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sp-arts', name: 'Arts and Design', emoji: '🎨', color: 'from-pink-500 to-rose-500',
    chapters: [
      {
        id: 'sp-arts-1', title: 'Elements of Art', emoji: '🖌️',
        pages: [
          {
            title: 'The Seven Elements of Art',
            blocks: [
              h('What are the Elements of Art?'),
              p('The elements of art are the basic building blocks that artists use to create works of art. There are seven main elements.'),
              kt('Line', 'A mark with length and direction. Lines can be straight, curved, thick, or thin.'),
              kt('Shape', 'A flat area with boundaries — circles, squares, triangles, or free-form shapes.'),
              kt('Form', 'A three-dimensional shape — like a cube, sphere, or cylinder.'),
              kt('Color', 'The visual sensation produced by light. Colors have hue (name), value (lightness), and intensity (brightness).'),
              kt('Value', 'The lightness or darkness of a color.'),
              kt('Space', 'The area around, between, and within objects. Can be positive (filled) or negative (empty).'),
              kt('Texture', 'How something feels or looks like it would feel — smooth, rough, soft, hard.'),
              d('🎨', 'Line, Shape, Form, Color, Value, Space, Texture — the 7 elements of art'),
              q('How many elements of art are there?', ['5', '6', '7', '8'], 2),
              q('Which element is about lightness or darkness?', ['Color', 'Value', 'Space', 'Texture'], 1),
              q('Which element is a mark with length and direction?', ['Shape', 'Line', 'Form', 'Color'], 1),
              s('Seven elements of art: Line, Shape, Form, Color, Value, Space, Texture! These are the building blocks of all art!'),
            ],
          },
        ],
      },
      {
        id: 'sp-arts-2', title: 'Principles of Design', emoji: '📐',
        pages: [
          {
            title: 'How Artists Organize Art',
            blocks: [
              h('What are the Principles of Design?'),
              p('The principles of design are the rules artists use to organize the elements of art (line, shape, color, etc.) into a pleasing composition.'),
              kt('Principles of Design', 'Rules that guide how artists arrange the elements of art.'),
              h('Key Principles'),
              kt('Balance', 'How elements are arranged to create visual stability — symmetrical (equal sides) or asymmetrical (unequal but still balanced).'),
              kt('Contrast', 'Differences between elements — light vs dark, large vs small, rough vs smooth. Creates interest.'),
              kt('Emphasis', 'Making one element stand out to draw the viewer\'s attention to the most important part.'),
              kt('Pattern', 'Repeating elements — lines, shapes, or colors — to create rhythm and unity.'),
              kt('Rhythm', 'A feeling of movement created by repeating elements, like a beat in music.'),
              kt('Unity', 'When all elements work together to create a sense of completeness and harmony.'),
              d('📐', 'Balance, Contrast, Emphasis, Pattern, Rhythm, Unity — 6 principles of design'),
              ex('Balance: a painting with a large tree on the left and two smaller trees on the right. Contrast: a bright yellow sun against a dark blue sky. Emphasis: a portrait where the eyes are the sharpest, brightest part.'),
              ff('Did you know? The Golden Ratio (1:1.618) is a mathematical proportion used by artists for centuries to create naturally pleasing balance — from the Parthenon to the Mona Lisa!'),
              q('Which principle creates visual stability?', ['Contrast', 'Balance', 'Rhythm', 'Pattern'], 1),
              q('Which principle makes one element stand out?', ['Emphasis', 'Unity', 'Balance', 'Rhythm'], 0),
              q('Which principle involves repeating elements?', ['Pattern', 'Contrast', 'Emphasis', 'Balance'], 0),
              s('Principles of design: Balance (stability), Contrast (differences), Emphasis (stand out), Pattern (repetition), Rhythm (movement), Unity (harmony)!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sp-chem', name: 'Chemistry', emoji: '🧪', color: 'from-purple-500 to-violet-500',
    chapters: [
      {
        id: 'sp-chem-1', title: 'The Periodic Table', emoji: '⚛️',
        pages: [
          {
            title: 'Organizing the Elements',
            blocks: [
              h('What is the Periodic Table?'),
              p('The Periodic Table is a chart that organizes all known elements by their atomic number. It was created by Dmitri Mendeleev in 1869.'),
              kt('Periodic Table', 'A chart organizing all elements by atomic number, showing patterns in their properties.'),
              kt('Atomic Number', 'The number of protons in an atom — this determines the element\'s identity.'),
              kt('Period', 'A horizontal row in the Periodic Table. Elements in the same period have the same number of electron shells.'),
              kt('Group', 'A vertical column in the Periodic Table. Elements in the same group have similar chemical properties.'),
              d('⚛️', 'Periods = rows (left to right), Groups = columns (top to bottom)'),
              h('Categories of Elements'),
              kt('Metal', 'Shiny, conducts electricity and heat, malleable. Examples: iron, copper, gold.'),
              kt('Nonmetal', 'Dull, does not conduct electricity well, brittle. Examples: oxygen, carbon, sulfur.'),
              kt('Metalloid', 'Has properties of both metals and nonmetals. Examples: silicon, boron.'),
              ex('Group 1 (alkali metals) are very reactive. Group 18 (noble gases) are very unreactive. This pattern repeats every period!'),
              ff('Did you know? The Periodic Table has 118 confirmed elements. The newest, Oganesson (Og, element 118), was added in 2016!'),
              q('Who created the Periodic Table?', ['Albert Einstein', 'Dmitri Mendeleev', 'Niels Bohr', 'Marie Curie'], 1),
              q('What does the atomic number represent?', ['Number of neutrons', 'Number of protons', 'Number of electrons', 'Atomic mass'], 1),
              q('What are horizontal rows called?', ['Groups', 'Periods', 'Families', 'Blocks'], 1),
              s('Periodic Table: organized by atomic number. Periods = rows, Groups = columns. Metals (shiny), Nonmetals (dull), Metalloids (both). 118 elements!'),
            ],
          },
        ],
      },
      {
        id: 'sp-chem-2', title: 'Acids and Bases', emoji: '🧪',
        pages: [
          {
            title: 'The pH Scale',
            blocks: [
              h('What are Acids and Bases?'),
              p('Acids and bases are two important types of chemicals. Acids taste sour and bases taste bitter. They can be identified using the pH scale.'),
              kt('Acid', 'A substance that donates hydrogen ions (H⁺). Tastes sour, turns blue litmus red. pH below 7.'),
              kt('Base', 'A substance that accepts hydrogen ions (H⁺). Tastes bitter, turns red litmus blue. pH above 7.'),
              kt('pH Scale', 'A scale from 0 to 14 that measures how acidic or basic a solution is. 7 is neutral.'),
              d('🧪', 'pH 0-6 = acid, pH 7 = neutral (water), pH 8-14 = base'),
              ex('Lemon juice is an acid (pH ~2). Pure water is neutral (pH 7). Bleach is a base (pH ~13).'),
              h('Neutralization'),
              p('When an acid and a base react, they neutralize each other, forming water and a salt.'),
              kt('Neutralization', 'A reaction between an acid and a base that produces water and a salt.'),
              ex('HCl (acid) + NaOH (base) → H₂O (water) + NaCl (salt, table salt).'),
              ff('Did you know? Your stomach uses hydrochloric acid (HCl) to digest food — it has a pH of about 1.5 to 3.5!'),
              q('What pH is neutral?', ['0', '7', '14', '1'], 1),
              q('What does an acid turn blue litmus paper?', ['Blue', 'Red', 'Green', 'Yellow'], 1),
              q('What forms when an acid reacts with a base?', ['Only water', 'Water and a salt', 'Only a salt', 'Gas only'], 1),
              s('Acids: pH < 7, sour, donate H⁺. Bases: pH > 7, bitter, accept H⁺. pH 7 = neutral. Neutralization: acid + base → water + salt!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sp-soc', name: 'Sociology', emoji: '👥', color: 'from-rose-500 to-pink-500',
    chapters: [
      {
        id: 'sp-soc-1', title: 'Understanding Society', emoji: '🌍',
        pages: [
          {
            title: 'What is Sociology?',
            blocks: [
              h('The Study of Society'),
              p('Sociology is the scientific study of society, human social behavior, and the groups and institutions that make up society.'),
              kt('Sociology', 'The scientific study of society and human social behavior.'),
              kt('Society', 'A group of people living together in a community with shared rules and culture.'),
              kt('Social Institution', 'A major structure in society — family, education, religion, government, economy.'),
              h('Key Sociological Concepts'),
              kt('Socialization', 'The process of learning the norms, values, and culture of society.'),
              kt('Norms', 'Unwritten rules that guide behavior in society — like saying "thank you."'),
              kt('Culture', 'The shared beliefs, values, traditions, and customs of a group.'),
              kt('Social Stratification', 'The division of society into layers (classes) based on wealth, power, and status.'),
              ex('Family is the first social institution. It teaches children the basic norms and values of their culture.'),
              ff('Did you know? The word "sociology" was coined by French philosopher Auguste Comte in 1838!'),
              q('What does sociology study?', ['Only individuals', 'Society and human social behavior', 'Only government', 'Only economics'], 1),
              q('What is the process of learning society\'s norms and values?', ['Socialization', 'Stratification', 'Institution', 'Culture'], 0),
              q('What are unwritten rules that guide behavior?', ['Laws', 'Norms', 'Taxes', 'Policies'], 1),
              s('Sociology = study of society. Key concepts: socialization (learning norms), norms (unwritten rules), culture (shared beliefs), social stratification (class layers)!'),
            ],
          },
          {
            title: 'Types of Societies',
            blocks: [
              h('How Societies Evolved'),
              p('Societies have changed over time, from simple hunting and gathering groups to complex modern societies.'),
              kt('Hunting and Gathering Society', 'The oldest type — people hunt animals and gather plants for food. Small, nomadic groups.'),
              kt('Agricultural Society', 'People farm and grow crops. Larger, settled communities with more food surplus.'),
              kt('Industrial Society', 'Factories and machines produce goods. People move to cities for work.'),
              kt('Post-Industrial Society', 'A society based on information, technology, and services rather than manufacturing.'),
              d('🌍', 'Hunting/Gathering → Agricultural → Industrial → Post-Industrial (information age)'),
              ex('Before farming, humans were hunter-gatherers. The Industrial Revolution brought factories. Today, we live in a post-industrial society driven by technology and information.'),
              ff('Did you know? The first agricultural revolution happened about 10,000 years ago, completely changing how humans lived!'),
              q('What is the oldest type of society?', ['Industrial', 'Agricultural', 'Hunting and Gathering', 'Post-Industrial'], 2),
              q('What society is based on factories and machines?', ['Hunting and Gathering', 'Agricultural', 'Industrial', 'Post-Industrial'], 2),
              q('What society is based on information and technology?', ['Agricultural', 'Industrial', 'Post-Industrial', 'Hunting and Gathering'], 2),
              s('Society types: Hunting/Gathering (oldest) → Agricultural (farming) → Industrial (factories) → Post-Industrial (information/technology)!'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sp-prog', name: 'Programming', emoji: '💻', color: 'from-blue-500 to-cyan-500',
    chapters: [
      {
        id: 'sp-prog-1', title: 'Programming Basics', emoji: '⌨️',
        pages: [
          {
            title: 'What is Programming?',
            blocks: [
              h('Introduction to Programming'),
              p('Programming is the process of giving instructions to a computer to perform a task. Computers only understand specific languages called programming languages.'),
              kt('Programming', 'The process of writing instructions for a computer to perform tasks.'),
              kt('Programming Language', 'A language used to write instructions for computers, like Python, JavaScript, or Java.'),
              kt('Algorithm', 'A step-by-step set of instructions to solve a problem.'),
              kt('Syntax', 'The rules for how to write code correctly in a programming language.'),
              d('💻', 'Program = instructions. Algorithm = steps. Syntax = grammar rules. Language = Python, JavaScript, Java, etc.'),
              ex('An algorithm for making a sandwich: 1. Get bread. 2. Put filling on bread. 3. Put another slice on top. 4. Eat!'),
              ff('Did you know? The first computer programmer was Ada Lovelace, who wrote the first algorithm for a computer in the 1840s!'),
              q('What is a step-by-step set of instructions called?', ['Syntax', 'Algorithm', 'Program', 'Language'], 1),
              q('What are the rules for writing code called?', ['Algorithm', 'Syntax', 'Program', 'Bug'], 1),
              q('Who was the first computer programmer?', ['Ada Lovelace', 'Bill Gates', 'Steve Jobs', 'Alan Turing'], 0),
              s('Programming = giving computer instructions. Algorithm = steps. Syntax = grammar rules. First programmer = Ada Lovelace!'),
            ],
          },
          {
            title: 'Variables and Data Types',
            blocks: [
              h('Storing Data'),
              p('Variables are containers that store data. Each variable has a name and a data type that tells the computer what kind of data it holds.'),
              kt('Variable', 'A named container that stores data in a program.'),
              kt('Integer', 'A whole number, like 5, -3, or 42.'),
              kt('Float', 'A number with a decimal point, like 3.14 or -0.5.'),
              kt('String', 'Text data, like "Hello" or "Juan". Always in quotes.'),
              kt('Boolean', 'A value that is either True or False.'),
              d('💻', 'Integer (5), Float (3.14), String ("Hello"), Boolean (True/False)'),
              ex('In Python: age = 15 (integer), height = 5.6 (float), name = "Ana" (string), is_student = True (boolean).'),
              h('Control Structures'),
              kt('If Statement', 'Runs code only if a condition is true.'),
              kt('Loop', 'Repeats code multiple times — like "for" and "while" loops.'),
              ex('If age >= 18: print("You can vote!") — This only runs if age is 18 or more.'),
              ff('Did you know? The word "bug" for a computer error comes from 1947 when a real moth caused a malfunction in an early computer!'),
              q('What data type is "Hello"?', ['Integer', 'Float', 'String', 'Boolean'], 2),
              q('What data type is 3.14?', ['Integer', 'Float', 'String', 'Boolean'], 1),
              q('What does an if statement do?', ['Repeats code', 'Runs code if a condition is true', 'Stores data', 'Prints text'], 1),
              s('Variables store data. Types: Integer (whole), Float (decimal), String (text), Boolean (True/False). If = conditional. Loop = repetition!'),
            ],
          },
        ],
      },
      {
        id: 'sp-prog-2', title: 'Functions and Loops', emoji: '🔄',
        pages: [
          {
            title: 'Functions',
            blocks: [
              h('What is a Function?'),
              p('A function is a reusable block of code that does a specific task. Instead of writing the same code over and over, you write it once as a function and call it when needed.'),
              kt('Function', 'A reusable block of code that performs a specific task.'),
              kt('Parameter', 'A value you give to a function when you call it. Functions can have zero, one, or many parameters.'),
              kt('Return Value', 'The result a function gives back after running.'),
              d('💻', 'Function = reusable code. Input (parameters) → Process → Output (return value)'),
              ex('In Python: def greet(name): return "Hello, " + name. Calling greet("Maria") returns "Hello, Maria"!'),
              h('Why Use Functions?'),
              p('Functions make code easier to read, easier to fix, and reusable. If you need to change something, you only change it in one place.'),
              ex('Instead of writing "print the total" in 10 places, write a function once and call it 10 times!'),
              ff('Did you know? In programming, the principle of DRY means "Don\'t Repeat Yourself" — functions help you follow this rule!'),
              q('What is a function?', ['A variable', 'A reusable block of code', 'A data type', 'A loop'], 1),
              q('What is a parameter?', ['The output of a function', 'A value you give to a function', 'A type of variable', 'A loop counter'], 1),
              q('What does DRY stand for?', ['Do Run Yourself', 'Don\'t Repeat Yourself', 'Data Run Yearly', 'Direct Read Yourself'], 1),
              s('Functions = reusable code blocks. Parameters = inputs. Return = output. DRY = Don\'t Repeat Yourself. Write once, use many times!'),
            ],
          },
          {
            title: 'Loops',
            blocks: [
              h('What is a Loop?'),
              p('A loop is a way to repeat code multiple times without writing it over and over. There are two main types: for loops and while loops.'),
              kt('Loop', 'A structure that repeats code multiple times.'),
              h('For Loop'),
              p('A for loop repeats a specific number of times. You set how many times it should run.'),
              kt('For Loop', 'A loop that repeats a known number of times.'),
              ex('In Python: for i in range(5): print(i). This prints 0, 1, 2, 3, 4 — five times!'),
              h('While Loop'),
              p('A while loop repeats as long as a condition is true. It stops when the condition becomes false.'),
              kt('While Loop', 'A loop that repeats as long as a condition is true.'),
              ex('In Python: count = 0; while count < 3: print(count); count = count + 1. This prints 0, 1, 2 — three times!'),
              h('Infinite Loops'),
              p('An infinite loop never stops because the condition is always true. This is usually a bug — your program will freeze!'),
              kt('Infinite Loop', 'A loop that never stops because the condition never becomes false. Usually a bug!'),
              ff('Did you know? The first computer "loop" was used by Ada Lovelace to describe calculating numbers in a sequence!'),
              q('Which loop repeats a known number of times?', ['While loop', 'For loop', 'Infinite loop', 'If loop'], 1),
              q('Which loop repeats while a condition is true?', ['For loop', 'While loop', 'Function', 'Variable'], 1),
              q('What is an infinite loop?', ['A loop that runs 100 times', 'A loop that never stops', 'A loop with no code', 'A fast loop'], 1),
              s('Loops: For (known count), While (condition true). Infinite loop = never stops (usually a bug). Loops save you from writing repetitive code!'),
            ],
          },
        ],
      },
    ],
  },
];

// ===================== EXPORT ==============================================

export const TEXTBOOK_LEVELS: TextbookLevel[] = [
  {
    id: 'preschool', name: 'Preschool', emoji: '👶', color: 'from-candy-yellow to-candy-green',
    subjects: [...preschoolSubjects, ...preschoolExtraSubjects],
  },
  {
    id: 'elementary', name: 'Elementary', emoji: '🏫', color: 'from-candy-blue to-candy-purple',
    subjects: elementarySubjects,
  },
  {
    id: 'juniorhigh', name: 'Junior High', emoji: '📚', color: 'from-green-500 to-teal-600',
    subjects: juniorHighSubjects,
  },
  {
    id: 'seniorhigh', name: 'Senior High', emoji: '🎓', color: 'from-indigo-500 to-purple-600',
    subjects: seniorHighSubjects,
  },
  {
    id: 'specialized', name: 'Specialized', emoji: '⚗️', color: 'from-rose-500 to-red-600',
    subjects: specializedSubjects,
  },
];

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
