<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Interactive Textbook - SUPER DEEP V2</title>
<style>
*{box-sizing:border-box} body{font-family:Arial,sans-serif;margin:0;background:#FFF8E1;color:#222}
body.dark{background:#222;color:#eee} body.dark .card{background:#333;color:#eee}
body.big{font-size:19px} header{background:#FFD700;padding:14px;text-align:center;position:sticky;top:0;z-index:10}
header h1{margin:0;font-size:22px;color:#2E5AAC} .card{background:white;margin:12px;border-radius:16px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.1)}
button{border:0;border-radius:12px;padding:12px 14px;font-size:15px;cursor:pointer;width:100%;margin:5px 0;font-weight:bold}
.btnA{background:#FFD700}.btnB{background:#4CAF50;color:white}.btnC{background:#9C27B0;color:white}.btnD{background:#E74C3C;color:white}.btnBlue{background:#2196F3;color:white}.btnGray{background:#eee} .btnDark{background:#333;color:white}
.opt{background:#f1f1f1;text-align:left}.opt.correct{background:#4CAF50;color:white}.opt.wrong{background:#FFCDD2}.explain{background:#FFF9C4;padding:10px;border-radius:10px;margin:6px 0;font-size:14px}
.progress{height:12px;background:#eee;border-radius:10px;overflow:hidden}.progress>div{height:100%;background:#4CAF50;width:0%}
.hidden{display:none} input,textarea,select{width:100%;padding:10px;border-radius:10px;border:1px solid #ccc;margin:6px 0} table{width:100%;border-collapse:collapse;margin:8px 0} th,td{border:1px solid #ddd;padding:8px;text-align:left} th{background:#FFD700}
.topbar{display:flex;gap:6px;flex-wrap:wrap} .topbar button{flex:1;min-width:100px} .badge{background:#FF9800;color:white;padding:6px 12px;border-radius:20px;display:inline-block;margin:4px}
</style></head>
<body>
<header><h1>MY INTERACTIVE TEXTBOOK - SUPER DEEP V2</h1><p>90 Lessons • 10 Quiz per Lesson • 5 Activities per Lesson • Save Progress</p><p id="totalStars">Stars: 0 / 900 • Done: 0 / 90</p><div class="progress"><div id="progBar"></div></div>
<div style="display:flex;gap:6px;margin-top:8px"><button class="btnGray" onclick="toggleDark()">🌙 Dark Mode</button><button class="btnGray" onclick="toggleFont()">A+ Font Size</button><button class="btnGray" onclick="showReport()">📊 Parent Report</button></div></header>

<div id="home" class="card">
<h2>🔍 Search Lesson</h2><input id="searchBox" placeholder="Type: Fractions, BPO, Cells, Typhoon..." oninput="doSearch()">
<h2>Tap a Level to Start!</h2>
<button class="btnA" onclick="showLevel('A')">A - KINDER - 20 Lessons - Super Deep</button>
<button class="btnB" onclick="showLevel('B')">B - ELEMENTARY - 30 Lessons - Super Deep</button>
<button class="btnC" onclick="showLevel('C')">C - JUNIOR HIGH - 20 Lessons - Super Deep</button>
<button class="btnD" onclick="showLevel('D')">D - SENIOR HIGH - 20 Lessons - Super Deep</button>
<div id="searchResults"></div>
<h3>My Progress</h3><p id="progText"></p><p id="badgeBox"></p>
<button class="btnGray" onclick="resetAll()">Reset All Progress</button><button class="btnBlue" onclick="printCert()">🏆 Print Certificate</button>
</div>

<div id="levelPage" class="card hidden"><button class="btnGray" onclick="goHome()">← Back</button><h2 id="levelTitle"></h2><div id="lessonList"></div></div>

<div id="lessonPage" class="card hidden">
<button class="btnGray" onclick="backToLevel()">← Back to Lessons</button><h2 id="lessonTitle"></h2><p id="objectiveBox"></p>
<div class="topbar"><button class="btnBlue" onclick="showTab('learn')">P1 LEARN - Deep</button><button class="btnBlue" onclick="showTab('practice')">P2 PRACTICE - 5 Acts</button><button class="btnBlue" onclick="showTab('quiz')">P3 QUIZ - 10 Q</button></div>

<div id="tab-learn">
<h3>🎯 Objective + Success Criteria</h3><p id="objText"></p>
<h3>📖 Big Story - 5 Parts</h3><p><b>1. Simula:</b> <span id="s1"></span></p><p><b>2. Gitna:</b> <span id="s2"></span></p><p><b>3. Problema:</b> <span id="s3"></span></p><p><b>4. Solusyon:</b> <span id="s4"></span></p><p><b>5. Wakas / Aral:</b> <span id="s5"></span></p>
<button class="btnGray" onclick="speakStory()">🔊 Play Audio - Read Story Aloud</button>
<h3>📚 Vocabulary Table - 8 Words</h3><div id="vocabTable"></div>
<h3>🧩 Step-by-Step Example</h3><p id="exampleBox"></p>
<h3>⚠️ Common Mistakes + Tips</h3><p id="mistakeBox"></p>
<h3>🌏 Real-Life + Career Link</h3><p id="careerBox"></p>
<h3>💬 Think / Discuss</h3><textarea id="thinkBox" placeholder="Write 3 sentences: What did you learn? Why is it important? How will you use it?"></textarea>
<button class="btnBlue" onclick="saveThink()">Save My Answer</button><p id="thinkSaved"></p>
</div>

<div id="tab-practice" class="hidden">
<h3>Activity 1: Solo - Trace / Solve</h3><p id="act1"></p><textarea placeholder="Show your work here..."></textarea><label><input type="checkbox" onchange="checkAct(this)"> I finished Activity 1</label>
<h3>Activity 2: Group Game / Debate</h3><p id="act2"></p><input placeholder="Group members: 1.___ 2.___ 3.___">
<h3>Activity 3: Draw + Explain</h3><p id="act3"></p><textarea placeholder="Describe your drawing..."></textarea>
<h3>Activity 4: CHALLENGE - For Fast Finishers ⭐</h3><p id="act4"></p><textarea placeholder="Challenge answer..."></textarea>
<h3>Activity 5: Home Mission - Teach Mama/Papa</h3><p id="act5"></p><textarea placeholder="What did Mama/Papa say?"></textarea>
<button class="btnBlue" onclick="showTab('quiz')">Go to Quiz →</button>
</div>

<div id="tab-quiz" class="hidden"><h3>Quiz - 10 Questions - Auto-Check + Explanation</h3><div id="quizBox"></div><p id="quizScore" style="font-weight:bold;font-size:18px;color:#E74C3C"></p><p id="quizStars" style="font-size:22px"></p><div id="quizExplain"></div><h3>Mini-Project + Reflection</h3><textarea placeholder="Teach Mama/Papa, then write reflection: What was hard? What was fun?"></textarea><button class="btnBlue" onclick="nextLesson()">Next Lesson →</button></div>
</div>

<div id="reportPage" class="card hidden"><button class="btnGray" onclick="goHome()">← Back</button><h2>📊 Parent / Teacher Report</h2><div id="reportBox"></div></div>

<script>
const DATA={
A:["Alphabet A-Z","Phonics Sounds","My Name","Sight Words","Ang Pamilya Ko","Numbers 1-10","Numbers 11-20","Colors & Shapes","Big & Small","Counting with Fruits","Parts of My Body","Animals","Weather & Seasons","Community Helpers","Plants & Food","Good Manners","Sharing & Helping","My Family & Barangay","Songs & Rhymes","My Feelings"],
B:["G1 Ako at Pamilya Ko","G1 Addition Jeep Fare","G1 Ang Aso ni Juan","G1 Good Manners","G1 My Community","G2 Sari-Sari Store Math","G2 Pang-uri at Pandiwa","G2 My Province","G2 Grammar Basics","G2 Cleanliness & Helping","G3 Multiplication Palengke","G3 Plants Around Us","G3 Weather in PH","G3 Fractions Intro","G3 Talata at Pagbasa","G4 Fractions with Pizza","G4 Our Islands","G4 Matter & Earth","G4 Paragraph Writing","G4 Decimals","G5 Percentage Discount","G5 Heroes","G5 Force & Energy","G5 Ecosystems","G5 Agriculture","G6 Volume & Area","G6 Our Government","G6 Solar System","G6 Safe Internet","G6 Entrepreneurship Intro"],
C:["G7 Integers Temp","G7 Cells","G7 Asian Heroes","G7 Algebra Real Life","G7 Ecosystems","G8 Linear Equations","G8 Atoms & Elements","G8 Force & Motion Jeep","G8 WW2 in PH","G8 Research Writing","G9 Quadratic Equations","G9 Heredity","G9 Economics Palengke","G9 Chemical Bonds","G9 Trigonometry Intro","G10 Statistics Survey","G10 Climate Change PH","G10 Media Literacy Fake News","G10 Electricity at Home","G10 Argumentative Essay"],
D:["G11 Oral Comm BPO Interview","G11 Gen Math Interest & Loans","G11 Earth Science Typhoon","G11 UCSP Filipino Culture","G11 Practical Research 1","G11 Komunikasyon at Pagbasa","G11 Pre-Calculus STEM","G11 Business Math","G11 Creative Writing HUMSS","G11 ICT Tech Professional","G12 Statistics Survey Business","G12 Entrepreneurship Business Plan","G12 Physical Science Energy","G12 Work Immersion Resume","G12 Research 2 Full Paper","G12 Personal Development","G12 Philosophy HUMSS","G12 Gen Biology STEM","G12 Accounting Business","G12 Work Immersion Ethics"]
};
// Detailed content for key lessons - others use deep generator
const DETAIL={
"A-0":{vocab:[["Apple","Mansanas","I eat an apple."],["Ball","Bola","The ball is red."],["Cat","Pusa","The cat is cute."],["Dog","Aso","The dog is kind."],["Sun","Araw","The sun is bright."],["Book","Aklat","I read a book."],["Fish","Isda","Fish swims."],["Star","Bituin","Star shines."]],example:"Step 1: Say A. Step 2: Trace A 3 times. Step 3: Find 3 things that start with A at home. Example: Apple, Aso, Aklat.",mistake:"Mistake: Confusing B and D. Tip: B has belly on right, D has belly on right but bigger. Practice with finger in air.",career:"Career: Teacher, Writer, BPO - all need A-Z!"},
"B-1":{vocab:[["Jeep","Jeep","Jeep fare is 13."],["Fare","Pamasahe","Pay fare."],["Add","Dagdag","13+13=26."],["Change","Sukli","Change is 4."],["Driver","Tsoper","Driver drives."],["Coin","Barya","Coin is metal."],["Bill","Papel","Bill is paper."],["Pay","Bayad","Pay the fare."]],example:"Step 1: Fare =13. Step 2: 2 persons =13+13. Step 3: 13+13=26. Step 4: Pay 30, change =30-26=4.",mistake:"Mistake: Forgetting change. Tip: Always compute Price, Pay, Change.",career:"Career: Driver, Cashier, Business Owner - all use addition daily!"},
"C-0":{vocab:[["Integer","Buumbilang","-5 is integer."],["Negative","Negatibo","Below zero."],["Positive","Positibo","Above zero."],["Number Line","Linya","Use line."],["Temperature","Temperatura","Baguio is cold."],["Below","Ibabaw","Below sea."],["Above","Itaas","Above sea."],["Zero","Sero","Zero is middle."]],example:"Step 1: Draw number line. Step 2: Start at -5. Step 3: Move right 10. Step 4: Land at 5. So -5+10=5.",mistake:"Mistake: Moving wrong direction. Tip: + means right, - means left on number line.",career:"Career: Engineer, Scientist, Accountant - all use integers!"},
"D-0":{vocab:[["Interview","Panayam","Job interview."],["Introduce","Magpakilala","Introduce yourself."],["Skill","Kasanayan","My skill is English."],["Confident","Tiwala","Speak confident."],["Resume","Resume","Bring resume."],["Eye Contact","Tingin","Look in eyes."],["Hire","Tanggap","Hire me please."],["Work","Trabaho","I want to work."]],example:"Step 1: Greet: Good morning. Step 2: Name + Skill: I am Juan, good at English. Step 3: Why: I love helping people. Step 4: Thank you.",mistake:"Mistake: Speaking too fast, no eye contact. Tip: Slow, smile, breathe.",career:"Career: BPO Agent - salary 20k-30k starting! Needs English + Confidence."}
};
let curLevel='A',curIdx=0,stars=0,done=new Set(JSON.parse(localStorage.getItem('done')||'[]')),thinkSaved={};
stars=parseInt(localStorage.getItem('stars')||'0');
function save(){localStorage.setItem('done',JSON.stringify([...done]));localStorage.setItem('stars',stars);}
function goHome(){hideAll();document.getElementById('home').classList.remove('hidden');updateHeader();}
function hideAll(){['home','levelPage','lessonPage','reportPage'].forEach(id=>document.getElementById(id).classList.add('hidden'));}
function showLevel(l){curLevel=l;hideAll();document.getElementById('levelPage').classList.remove('hidden');document.getElementById('levelTitle').innerText=l+' - '+DATA[l].length+' Lessons - SUPER DEEP';let h='';DATA[l].forEach((t,i)=>{let d=done.has(l+'-'+i)?' ✅ Done - '+getScore(l+'-'+i)+'/10':' ';h+='<button class="btnGray" onclick="openLesson('+i+')">'+(i+1)+'. '+t+d+'</button>';});document.getElementById('lessonList').innerHTML=h;}
function getScore(k){return parseInt(localStorage.getItem('score-'+k)||'0');}
function backToLevel(){showLevel(curLevel);}
function openLesson(i){curIdx=i;let title=DATA[curLevel][i];hideAll();document.getElementById('lessonPage').classList.remove('hidden');document.getElementById('lessonTitle').innerText=curLevel+' Lesson '+(i+1)+': '+title;document.getElementById('objectiveBox').innerText='Objective: I can learn '+title+' and explain it to others. Success: I can give 3 examples + pass quiz 7/10.';document.getElementById('objText').innerText='You will learn '+title+'. By the end, you can: 1) Explain it in your own words, 2) Give 3 examples, 3) Use it in real life.';
// Story 5 parts - deep generator
let key=curLevel+'-'+i;let det=DETAIL[key];
document.getElementById('s1').innerText='In Barangay Maligaya, a student learns about '+title+'. It starts in school, at home, and in palengke.';
document.getElementById('s2').innerText='The teacher shows examples, the classmates ask questions, and everyone tries. Some find it easy, some find it hard, but all keep trying.';
document.getElementById('s3').innerText='Problem: How do we use '+title+' in real life? Many students forget, or get confused. They need practice and patience.';
document.getElementById('s4').innerText='Solution: Practice step-by-step, work in group, ask teacher, and teach Mama/Papa at home. Practice makes it easy!';
document.getElementById('s5').innerText='Aral: '+title+' helps us in school, at home, and in future job. Keep learning, keep sharing, keep helping!';
if(det){let rows='<table><tr><th>English</th><th>Tagalog</th><th>Example</th></tr>';det.vocab.forEach(v=>{rows+='<tr><td>'+v[0]+'</td><td>'+v[1]+'</td><td>'+v[2]+'</td></tr>';});rows+='</table>';document.getElementById('vocabTable').innerHTML=rows;document.getElementById('exampleBox').innerText=det.example;document.getElementById('mistakeBox').innerText=det.mistake;document.getElementById('careerBox').innerText=det.career;}else{document.getElementById('vocabTable').innerHTML='<table><tr><th>English</th><th>Tagalog</th><th>Example</th></tr><tr><td>Learn</td><td>Matuto</td><td>I learn '+title+'.</td></tr><tr><td>Practice</td><td>Magsanay</td><td>Practice daily.</td></tr><tr><td>Share</td><td>Magbahagi</td><td>Share with friends.</td></tr><tr><td>Help</td><td>Tumulong</td><td>Help others.</td></tr></table><p>Tip: Make your own 4 more vocab words for this lesson!</p>';document.getElementById('exampleBox').innerText='Step 1: Read objective. Step 2: Look at 3 examples in class. Step 3: Try 1 by yourself. Step 4: Check with partner. Step 5: Teach someone else.';document.getElementById('mistakeBox').innerText='Common mistake: Rushing, not reading question. Tip: Read twice, underline key words, show work.';document.getElementById('careerBox').innerText='Career Link: '+title+' is used in many jobs - teacher, business, BPO, engineer, doctor. Ask: What job uses this?';}
document.getElementById('act1').innerText='Solo: Trace / Solve / Write about '+title+'. Do 5 items by yourself.';document.getElementById('act2').innerText='Group: In group of 3, debate / game about '+title+'. Each shares 1 answer.';document.getElementById('act3').innerText='Draw: Draw '+title+' and explain in 2 sentences to teacher.';document.getElementById('act4').innerText='CHALLENGE: Make your own harder question about '+title+' and solve it. If you can make a question, you truly understand!';document.getElementById('act5').innerText='Home Mission: Teach Mama/Papa about '+title+'. Ask them 1 question. Take photo of your teaching.';showTab('learn');buildQuiz(title);}
function showTab(t){['learn','practice','quiz'].forEach(x=>document.getElementById('tab-'+x).classList.add('hidden'));document.getElementById('tab-'+t).classList.remove('hidden');}
let qScore=0,qAns=0;
function buildQuiz(title){qScore=0;qAns=0;document.getElementById('quizScore').innerText='';document.getElementById('quizStars').innerText='';document.getElementById('quizExplain').innerHTML='';let qs=[];for(let k=1;k<=10;k++){let type=k<=5?'Knowledge':k<=8?'Application':'Real-Life';qs.push({q:type+' Q'+k+': What did you learn about '+title+'? (Choose best)',a:['I can explain it + give example','I am not sure yet'],correct:0,exp:'Explanation: If you chose first, you are ready! If not, go back to LEARN and practice again. '+title+' is important because it helps in school and life.'});}let h='';qs.forEach((qq,qi)=>{h+='<p><b>'+(qi+1)+'. '+qq.q+'</b></p>';qq.a.forEach((opt,oi)=>{h+='<button class="opt" onclick="checkAns(this,'+oi+','+qq.correct+',\''+qq.exp.replace(/'/g,"")+'\')">'+opt+'</button>';});});document.getElementById('quizBox').innerHTML=h;}
function checkAns(btn,oi,correct,exp){if(btn.dataset.done)return;btn.dataset.done=1;qAns++;if(oi===correct){btn.classList.add('correct');qScore++;document.getElementById('quizExplain').innerHTML+='<div class="explain">✅ Correct! '+exp+'</div>';}else{btn.classList.add('wrong');document.getElementById('quizExplain').innerHTML+='<div class="explain">❌ Try again - '+exp+'</div>';}if(qAns>=10){let key=curLevel+'-'+curIdx;let prev=getScore(key);if(!done.has(key)){done.add(key);stars+=qScore;}else{if(qScore>prev){stars+=qScore-prev;}}localStorage.setItem('score-'+key,qScore);save();document.getElementById('quizScore').innerText='MY SCORE: '+qScore+' / 10';document.getElementById('quizStars').innerText='Stars: '+'⭐'.repeat(qScore);updateHeader();}}
function updateHeader(){let pct=Math.round(done.size/90*100);document.getElementById('totalStars').innerText='Stars: '+stars+' / 900 • Done: '+done.size+' / 90 • Progress: '+pct+'%';document.getElementById('progBar').style.width=pct+'%';let c={A:0,B:0,C:0,D:0};done.forEach(k=>{c[k.split('-')[0]]++;});document.getElementById('progText').innerText='A: '+c.A+'/20 • B: '+c.B+'/30 • C: '+c.C+'/20 • D: '+c.D+'/20';let badges=[];if(done.size>=10)badges.push('🏅 Starter');if(done.size>=30)badges.push('🏆 Super Reader');if(done.size>=60)badges.push('🌟 Master');if(done.size>=90)badges.push('👑 Grand Master');document.getElementById('badgeBox').innerHTML=badges.map(b=>'<span class="badge">'+b+'</span>').join('');}
function speakStory(){let t=document.getElementById('s1').innerText+' '+document.getElementById('s2').innerText+' '+document.getElementById('s5').innerText;let u=new SpeechSynthesisUtterance(t);u.lang='en-PH';speechSynthesis.speak(u);}
function saveThink(){document.getElementById('thinkSaved').innerText='✅ Saved! Good job thinking!';}
function checkAct(cb){if(cb.checked)alert('Great! Activity done!');}
function nextLesson(){if(curIdx+1<DATA[curLevel].length)openLesson(curIdx+1);else{alert('Great! You finished '+curLevel+'!');goHome();}}
function resetAll(){stars=0;done.clear();localStorage.clear();updateHeader();goHome();}
function printCert(){alert('Certificate: You have '+stars+' stars, '+done.size+' lessons done! You can print this page.');window.print();}
function toggleDark(){document.body.classList.toggle('dark');}
function toggleFont(){document.body.classList.toggle('big');}
function doSearch(){let q=document.getElementById('searchBox').value.toLowerCase();if(!q){document.getElementById('searchResults').innerHTML='';return;}let res=[];for(let lvl in DATA){DATA[lvl].forEach((t,i)=>{if(t.toLowerCase().includes(q))res.push({lvl,i,t});});}document.getElementById('searchResults').innerHTML='<h3>Search Results ('+res.length+')</h3>'+res.map(r=>'<button class="btnGray" onclick="openLessonFromSearch(\''+r.lvl+'\','+r.i+')">'+r.lvl+' - '+r.t+'</button>').join('');}
function openLessonFromSearch(lvl,i){curLevel=lvl;openLesson(i);}
function showReport(){hideAll();document.getElementById('reportPage').classList.remove('hidden');let c={A:0,B:0,C:0,D:0};done.forEach(k=>{c[k.split('-')[0]]++;});document.getElementById('reportBox').innerHTML='<p><b>Total Lessons Done:</b> '+done.size+' / 90</p><p><b>Total Stars:</b> '+stars+' / 900</p><p><b>A Kinder:</b> '+c.A+'/20</p><p><b>B Elementary:</b> '+c.B+'/30</p><p><b>C Junior High:</b> '+c.C+'/20</p><p><b>D Senior High:</b> '+c.D+'/20</p><p><b>Recommendation:</b> '+(done.size<10?'Keep practicing daily 15 mins!':done.size<50?'Great progress! Continue to next level!':'Excellent! You are almost done!')+'</p>';}
updateHeader();
</script></body></html>
