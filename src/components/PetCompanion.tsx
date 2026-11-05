import { useCallback, useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import './PetCompanion.css';

type PetLanguage = 'en' | 'tl';
type PetAction = 'idle' | 'walk' | 'run' | 'sit' | 'play' | 'eat' | 'sleep' | 'roll' | 'jump' | 'talking' | 'petting';
type PetPosition = { x: number; y: number };
type TourPage = 'home' | 'kinder' | 'games' | 'readyfarm' | 'quiz' | 'worksheets' | 'textbooks' | 'achievements' | 'parents' | 'install' | 'profile' | 'settings' | 'message' | 'support' | 'freebies' | 'partners' | 'owner' | 'elementary' | 'highschool';
type ProceduralBone = {
  bone: THREE.Bone;
  base: THREE.Quaternion;
  kind: 'leg' | 'tail' | 'head' | 'ear' | 'spine';
  phase: number;
  amplitude: number;
};

const NAME_KEY = 'readyph-pet-name';
const LANGUAGE_KEY = 'readyph-pet-language';
const PET_SIZE = 112;
const NAV_CLEARANCE = 112;

const LINES: Record<PetLanguage, Record<'hello' | 'feed' | 'play' | 'sleep' | 'talk' | 'pet', string[]>> = {
  en: {
    hello: ["Hi! I'm {name}. Let's learn together!", 'I love exploring ReadyPH with you!'],
    feed: ['Yum, thank you for the treat!', 'That was delicious! You are the best!'],
    play: ['Yay! Let us play!', 'That was so much fun!'],
    sleep: ['Good night! I will take a little nap.', 'Wake me when you are ready to play!'],
    talk: ['What would you like to learn today?', 'You are doing a great job. Keep going!'],
    pet: ['That feels nice!', 'I love my pats, thank you!'],
  },
  tl: {
    hello: ['Hi! Ako si {name}. Mag-aral tayo!'],
    feed: ['Salamat sa pagkain! Ang sarap!', 'Busog na ako. Salamat, kaibigan!'],
    play: ['Yehey! Laro tayo!', 'Ang saya naman nating maglaro!'],
    sleep: ['Good night! Idlip muna ako sandali.', 'Gisingin mo ako kapag gusto mo nang maglaro!'],
    talk: ['Ano ang gusto mong matutunan ngayon?', 'Ang galing mo! Ipagpatuloy mo lang!'],
    pet: ['Ang sarap ng haplos mo!', 'Salamat sa pag-pet sa akin!'],
  },
};

const PAGE_GUIDES: Record<TourPage, string[]> = {
  home: ['Welcome to ReadyPH! Scroll the home page to explore learning shortcuts and featured activities.', 'Tap a colorful activity card to open it. You can also use the bottom navigation to switch sections.', 'Choose Kinder for early learning, Games to play, or a learning tool from the navigation.'],
  kinder: ['This is Kinder, with learning videos and activities for young learners.', 'Use the category tabs and search to find a topic. Tap a video or activity card to open it.', 'Use favorites or review options to revisit content you want to practice.'],
  games: ['Welcome to Games! Choose a game card to see its stage map.', 'On the map, select an available stage to start. The game shows your current stage and difficulty.', 'Play the round and follow its on-screen instructions. Use Stage Map to return and choose another stage.'],
  readyfarm: ['Ready Farm is your playful growing and learning space.', 'Explore the farm items and tap the available activities to interact with them.', 'Check the page for progress or prompts, then return here whenever you want to continue.'],
  quiz: ['This is the Quiz area. Choose a topic or quiz activity to begin.', 'Read each question and tap the answer you think is correct.', 'Continue through the questions and review your result at the end.'],
  worksheets: ['Worksheets lets you find printable learning practice.', 'Browse the available worksheet topics and select one that matches what you want to practice.', 'Use the worksheet page controls to view or print the material when available.'],
  textbooks: ['Textbooks contains lessons organized by level, subject, and chapter.', 'Choose a level and subject, then open a chapter to view its lesson pages.', 'Read the examples and key terms, try the questions, and use the page navigation to continue.'],
  achievements: ['This is your Awards page for learning milestones.', 'Review the stars, medals, and achievements you have collected.', 'Keep learning and completing activities to earn more progress rewards.'],
  parents: ['The Parents page helps families review learning activity and progress.', 'Browse the summaries and tools shown here to understand recent learning.', 'Use the bottom navigation to return to a learner activity at any time.'],
  install: ['This page explains how to install ReadyPH on a supported device.', 'Follow the instructions for your browser or device. The install prompt may also appear automatically.', 'After installation, open ReadyPH from your home screen or app list.'],
  profile: ['Your Profile page contains your learner details.', 'Review or update the profile information shown on the page.', 'Keep your details current so your learning space is personalized.'],
  settings: ['Settings lets you adjust available app preferences.', 'Review each setting and choose the option that works best for you.', 'Your choices are saved by the app when you change them.'],
  message: ['Use Message Dev to send feedback to the ReadyPH team.', 'Enter your name if you want, write your message, then tap Send.', 'A confirmation appears when your message has been submitted.'],
  support: ['The Support page shares support information and content.', 'Scroll through the page to view the available materials.', 'Use the bottom navigation to return to lessons and activities.'],
  freebies: ['Welcome to the Shop. Browse the items and learning resources listed here.', 'Search or use category filters to narrow the list. Tap the heart to save a favorite.', 'Open an item with its action button to visit the linked offer. Check details before proceeding.'],
  partners: ['This page introduces ReadyPH partners.', 'Browse the partner cards to learn who supports the learning platform.', 'Use the bottom navigation to explore learning activities again.'],
  owner: ['This is the owner dashboard for authorized administrators.', 'Scroll through the management sections to update app content and settings.', 'Use the controls within each section carefully; changes may be saved or synced.'],
  elementary: ['This section is coming soon.', 'Use the Home button to return to ReadyPH activities.', 'Explore Kinder, Games, or Textbooks from the navigation instead.'],
  highschool: ['This section is coming soon.', 'Use the Home button to return to ReadyPH activities.', 'Explore Kinder, Games, or Textbooks from the navigation instead.'],
};

const PAGE_TITLES: Record<TourPage, string> = {
  home: 'Home', kinder: 'Kinder', games: 'Games', readyfarm: 'Ready Farm', quiz: 'Quiz', worksheets: 'Worksheets',
  textbooks: 'Textbooks', achievements: 'Awards', parents: 'Parents', install: 'Install', profile: 'Profile',
  settings: 'Settings', message: 'Message Dev', support: 'Support', freebies: 'Shop', partners: 'Partners',
  owner: 'Owner Dashboard', elementary: 'Elementary', highschool: 'High School',
};

const CLIP_MATCH: Record<PetAction, RegExp> = {
  idle: /idle|stand|rest|wait/i,
  walk: /walk|walking/i,
  run: /run|running/i,
  sit: /sit|sitting/i,
  play: /play|fetch|happy|excited/i,
  eat: /eat|eating|chew|drink|feed/i,
  sleep: /sleep|lie|lay|nap/i,
  roll: /roll|rolling/i,
  jump: /jump|hop/i,
  talking: /talk|speak|bark/i,
  petting: /pet|stroke|cuddle/i,
};

function storedLanguage(): PetLanguage {
  return localStorage.getItem(LANGUAGE_KEY) === 'tl' ? 'tl' : 'en';
}

function findSafePosition(): PetPosition {
  const maxX = Math.max(12, window.innerWidth - PET_SIZE - 8);
  const maxY = Math.max(24, window.innerHeight - PET_SIZE - NAV_CLEARANCE);
  const controls = 'button, a, input, textarea, select, [role="button"], nav';
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const candidate = { x: 8 + Math.random() * Math.max(1, maxX - 8), y: 8 + Math.random() * Math.max(1, maxY - 8) };
    const points = [
      [candidate.x + PET_SIZE / 2, candidate.y + PET_SIZE / 2],
      [candidate.x + PET_SIZE * 0.25, candidate.y + PET_SIZE * 0.75],
      [candidate.x + PET_SIZE * 0.75, candidate.y + PET_SIZE * 0.75],
    ];
    const blocked = points.some(([x, y]) => document.elementsFromPoint(x, y).some((element) => element.matches(controls) || element.closest(controls)));
    if (!blocked) return candidate;
  }
  return { x: maxX, y: maxY };
}

function getCurrentPage(): TourPage {
  const page = document.body.dataset.readyphPage as TourPage | undefined;
  return page && page in PAGE_GUIDES ? page : 'home';
}

export function PetCompanion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Partial<Record<PetAction, THREE.AnimationAction>>>({});
  const currentActionRef = useRef<PetAction>('idle');
  const proceduralBonesRef = useRef<ProceduralBone[]>([]);
  const mouthTargetsRef = useRef<Array<{ mesh: THREE.Mesh; index: number }>>([]);
  const jawBoneRef = useRef<THREE.Bone | null>(null);
  const busyUntilRef = useRef(0);
  const actionTimerRef = useRef<number | undefined>(undefined);
  const bubbleTimerRef = useRef<number | undefined>(undefined);
  const movementTimerRef = useRef<number | undefined>(undefined);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number; moved: boolean; headTap: boolean } | null>(null);

  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || 'Ready');
  const [language, setLanguage] = useState<PetLanguage>(storedLanguage);
  const [position, setPosition] = useState<PetPosition>({ x: 20, y: 160 });
  const [action, setAction] = useState<PetAction>('idle');
  const [speech, setSpeech] = useState('Hi! I\'m Ready. Let\'s learn together!');
  const [showBubble, setShowBubble] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState<TourPage>(getCurrentPage);
  const [tourStep, setTourStep] = useState<number | null>(null);

  const setPetAction = useCallback((next: PetAction, duration = 0) => {
    currentActionRef.current = next;
    setAction(next);
    if (actionTimerRef.current) window.clearTimeout(actionTimerRef.current);
    if (duration > 0) {
      busyUntilRef.current = Date.now() + duration;
      actionTimerRef.current = window.setTimeout(() => {
        currentActionRef.current = 'idle';
        setAction('idle');
        busyUntilRef.current = 0;
      }, duration);
    }
  }, []);

  const showMessage = useCallback((line: string, nextAction: PetAction = 'talking', duration = 5000) => {
    const resolved = line.replaceAll('{name}', name.trim() || 'Ready');
    setSpeech(resolved);
    setShowBubble(true);
    setPetAction(nextAction, duration);
    if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(() => {
      if (tourStep === null) setShowBubble(false);
    }, duration);
  }, [name, setPetAction, tourStep]);

  const sayRandom = useCallback((kind: keyof typeof LINES[PetLanguage], nextAction: PetAction = 'talking') => {
    const options = LINES[language][kind];
    showMessage(options[Math.floor(Math.random() * options.length)], nextAction, 4200);
  }, [language, showMessage]);

  const startTour = useCallback(() => {
    setShowControls(false);
    setTourStep(0);
    setSpeech(PAGE_GUIDES[currentPage][0]);
    setShowBubble(true);
    setPetAction('talking', 5000);
  }, [currentPage, setPetAction]);

  const advanceTour = useCallback((direction: -1 | 1) => {
    setTourStep((step) => {
      if (step === null) return null;
      const next = step + direction;
      if (next < 0) return 0;
      if (next >= PAGE_GUIDES[currentPage].length) {
        setShowBubble(false);
        setPetAction('idle');
        return null;
      }
      setSpeech(PAGE_GUIDES[currentPage][next]);
      setShowBubble(true);
      setPetAction('talking', 5000);
      return next;
    });
  }, [currentPage, setPetAction]);

  useEffect(() => {
    const onPageChange = (event: Event) => {
      const page = (event as CustomEvent<{ page?: string }>).detail?.page as TourPage | undefined;
      const nextPage = page && page in PAGE_GUIDES ? page : getCurrentPage();
      setCurrentPage(nextPage);
      setTourStep(null);
      setSpeech(`Nasa ${PAGE_TITLES[nextPage]} ka. Buksan ang controls at piliin ang “Tour this page” para sa gabay.`);
      setShowBubble(true);
      if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = window.setTimeout(() => setShowBubble(false), 5200);
    };
    window.addEventListener('readyph:page-change', onPageChange);
    return () => window.removeEventListener('readyph:page-change', onPageChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.15, 3.8);
    camera.lookAt(0, 0.78, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(PET_SIZE, PET_SIZE, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8c7664, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffd5a5, 0.8);
    fillLight.position.set(-3, 1, -2);
    scene.add(fillLight);

    const petRoot = new THREE.Group();
    scene.add(petRoot);
    const loader = new GLTFLoader();
    let disposed = false;
    loader.load('/dog_puppy.glb', (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const scale = 1.45 / Math.max(size.y, 0.001);
      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
      petRoot.add(model);

      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;
      const mapped: Partial<Record<PetAction, THREE.AnimationAction>> = {};
      for (const clip of gltf.animations) {
        for (const petAction of Object.keys(CLIP_MATCH) as PetAction[]) {
          if (!mapped[petAction] && CLIP_MATCH[petAction].test(clip.name)) mapped[petAction] = mixer.clipAction(clip);
        }
      }
      actionsRef.current = mapped;

      const bones: ProceduralBone[] = [];
      let legIndex = 0;
      model.traverse((object) => {
        if (object instanceof THREE.Mesh && object.morphTargetDictionary && object.morphTargetInfluences) {
          for (const [morphName, index] of Object.entries(object.morphTargetDictionary)) {
            if (/jaw.?open|mouth.?open|viseme.?aa|lip.?open/i.test(morphName)) mouthTargetsRef.current.push({ mesh: object, index });
          }
        }
        if (!(object as THREE.Bone).isBone) return;
        const bone = object as THREE.Bone;
        const boneName = bone.name.toLowerCase();
        let kind: ProceduralBone['kind'] | undefined;
        let phase = 0;
        let amplitude = 1;
        if (/jaw|mandible/i.test(boneName)) jawBoneRef.current = bone;
        if (/tail/i.test(boneName)) kind = 'tail';
        else if (/ear/i.test(boneName)) kind = 'ear';
        else if (/head|neck/i.test(boneName)) kind = 'head';
        else if (/spine|chest|torso|pelvis/i.test(boneName)) kind = 'spine';
        else if (/leg|paw|foot|thigh|calf|shin|knee|hock|shoulder|forearm/i.test(boneName)) {
          kind = 'leg';
          const rear = /hind|rear|back.?leg|thigh|hip|hock/i.test(boneName);
          const right = /right|\.r\b|_r\b/i.test(boneName);
          const left = /left|\.l\b|_l\b/i.test(boneName);
          phase = right ? Math.PI : left ? 0 : (legIndex % 2) * Math.PI;
          if (rear) phase += Math.PI;
          if (/lower|knee|shin|calf|foot|paw|hock/i.test(boneName)) amplitude = 0.65;
          legIndex += 1;
        }
        if (kind) bones.push({ bone, base: bone.quaternion.clone(), kind, phase, amplitude });
      });
      proceduralBonesRef.current = bones;
      const initialAction = mapped[currentActionRef.current] || mapped.idle;
      if (initialAction) initialAction.reset().fadeIn(0.25).play();
      setLoaded(true);
    }, undefined, (error) => {
      console.error('Unable to load public/dog_puppy.glb', error);
      setSpeech('Hindi ma-load ang puppy model. Pakitingnan ang model file.');
      setShowBubble(true);
    });

    const clock = new THREE.Clock();
    const euler = new THREE.Euler();
    const offsetQuaternion = new THREE.Quaternion();
    let frame = 0;
    const animate = () => {
      if (disposed) return;
      frame = window.requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      mixerRef.current?.update(delta);
      const current = currentActionRef.current;
      const elapsed = clock.elapsedTime;
      const moving = current === 'walk' || current === 'run';
      const running = current === 'run';
      const gaitRate = running ? 12 : 7;
      const hasCurrentClip = Boolean(actionsRef.current[current]);

      // Camera is static. Pose and secondary motion are applied to the dog model only.
      const bob = current === 'sleep' ? -0.1 : current === 'sit' ? -0.035 : current === 'jump' ? Math.abs(Math.sin(elapsed * 7)) * 0.36 : moving ? Math.abs(Math.sin(elapsed * gaitRate)) * (running ? 0.09 : 0.045) : Math.sin(elapsed * 1.8) * 0.012;
      const roll = current === 'roll' ? Math.sin(elapsed * 8) * 0.75 : moving ? Math.sin(elapsed * gaitRate * 0.5) * 0.04 : current === 'play' ? Math.sin(elapsed * 5) * 0.09 : 0;
      petRoot.position.y = THREE.MathUtils.damp(petRoot.position.y, bob, 8, delta);
      petRoot.rotation.z = THREE.MathUtils.damp(petRoot.rotation.z, roll, 6, delta);
      petRoot.rotation.x = THREE.MathUtils.damp(petRoot.rotation.x, current === 'sleep' ? -0.08 : moving ? 0.035 : 0, 5, delta);
      const facing = facingLeft ? -1 : 1;
      petRoot.rotation.y = THREE.MathUtils.damp(petRoot.rotation.y, moving ? facing * 0.55 : 0, 3.5, delta);
      petRoot.scale.setScalar(current === 'jump' ? 1 + Math.max(0, Math.sin(elapsed * 7)) * 0.035 : 1);

      // Use model clips when available; otherwise make simple gestures by posing the rig.
      // For active walk/run clips, leave leg joints alone to avoid fighting the authored animation.
      for (const rig of proceduralBonesRef.current) {
        let x = 0; let y = 0; let z = 0;
        if (!hasCurrentClip && rig.kind === 'leg') {
          if (moving) {
            const gait = Math.sin(elapsed * gaitRate + rig.phase);
            x = gait * (running ? 0.62 : 0.42) * rig.amplitude;
            z = Math.max(0, Math.cos(elapsed * gaitRate + rig.phase)) * 0.12 * rig.amplitude;
          } else if (current === 'sit') {
            const rearLeg = /hind|rear|thigh|hip|hock/i.test(rig.bone.name);
            x = rearLeg ? -0.65 * rig.amplitude : 0.12 * rig.amplitude;
          } else if (current === 'jump') {
            x = Math.sin(elapsed * 7 + rig.phase) * 0.28 * rig.amplitude;
          } else if (current === 'roll') {
            x = Math.sin(elapsed * 8 + rig.phase) * 0.4 * rig.amplitude;
          } else if (current === 'eat') {
            x = Math.sin(elapsed * 10 + rig.phase) * 0.08 * rig.amplitude;
          } else if (current === 'petting') {
            x = Math.sin(elapsed * 9 + rig.phase) * 0.06 * rig.amplitude;
          }
        }
        if (!hasCurrentClip && rig.kind === 'spine') {
          if (current === 'sit') x = -0.12;
          else if (current === 'sleep') x = 0.16 + Math.sin(elapsed * 1.5) * 0.018;
          else if (moving) z = Math.sin(elapsed * gaitRate * 0.5) * 0.045;
          else if (current === 'eat') x = -0.08 + Math.sin(elapsed * 10) * 0.025;
          else if (current === 'petting') z = Math.sin(elapsed * 7) * 0.025;
        }
        if (!hasCurrentClip && rig.kind === 'head') {
          if (current === 'talking') { x = -0.12; y = Math.sin(elapsed * 2) * 0.07; }
          else if (current === 'sleep') x = 0.22;
          else if (current === 'eat') x = -0.28 + Math.sin(elapsed * 10) * 0.06;
          else if (current === 'petting') { x = -0.2 + Math.sin(elapsed * 4) * 0.08; z = Math.sin(elapsed * 3) * 0.15; }
          else if (moving) x = Math.sin(elapsed * gaitRate) * 0.055;
          else if (current === 'sit') x = -0.06;
        }
        if (!hasCurrentClip && rig.kind === 'tail') {
          z = current === 'sleep' ? -0.3 : moving ? Math.sin(elapsed * gaitRate * 0.8) * 0.7 : current === 'play' || current === 'petting' ? Math.sin(elapsed * 8) * 1.05 : Math.sin(elapsed * 2.4) * 0.2;
        }
        if (!hasCurrentClip && rig.kind === 'ear') {
          z = current === 'sleep' ? 0.2 : Math.sin(elapsed * (running ? 15 : 8) + rig.phase) * (moving ? 0.12 : current === 'petting' ? 0.16 : 0.04);
        }
        euler.set(x, y, z);
        offsetQuaternion.setFromEuler(euler);
        rig.bone.quaternion.copy(rig.base).multiply(offsetQuaternion);
      }

      const eatingOrTalking = current === 'talking' || current === 'eat';
      const mouthOpen = eatingOrTalking ? (0.18 + Math.max(0, Math.sin(elapsed * (current === 'eat' ? 12 : 19))) * 0.75) : 0;
      for (const { mesh, index } of mouthTargetsRef.current) {
        if (mesh.morphTargetInfluences) mesh.morphTargetInfluences[index] = mouthOpen;
      }
      if (jawBoneRef.current && !actionsRef.current.talking && !actionsRef.current.eat) jawBoneRef.current.rotation.x = eatingOrTalking ? -mouthOpen * 0.22 : 0;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => setPosition((previous) => ({
      x: Math.min(previous.x, Math.max(8, window.innerWidth - PET_SIZE - 8)),
      y: Math.min(previous.y, Math.max(8, window.innerHeight - PET_SIZE - NAV_CLEARANCE)),
    }));
    window.addEventListener('resize', onResize);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      if (actionTimerRef.current) window.clearTimeout(actionTimerRef.current);
      if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
      mixerRef.current?.stopAllAction();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      mixerRef.current = null;
      actionsRef.current = {};
      proceduralBonesRef.current = [];
      mouthTargetsRef.current = [];
      jawBoneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const next = actionsRef.current[action] || actionsRef.current.idle;
    const mixer = mixerRef.current;
    if (!mixer || !next) return;
    for (const existing of Object.values(actionsRef.current)) {
      if (existing && existing !== next && existing.isRunning()) existing.fadeOut(0.25);
    }
    next.reset().fadeIn(0.25).play();
  }, [action, loaded]);

  useEffect(() => {
    let active = true;
    const wander = () => {
      if (!active) return;
      if (Date.now() >= busyUntilRef.current && !dragRef.current) {
        const destination = findSafePosition();
        setFacingLeft(destination.x < position.x);
        setPosition(destination);
        setPetAction(Math.random() < 0.2 ? 'run' : 'walk', 2500 + Math.random() * 900);
      }
      movementTimerRef.current = window.setTimeout(wander, 4800 + Math.random() * 2600);
    };
    movementTimerRef.current = window.setTimeout(wander, 3500);
    return () => {
      active = false;
      if (movementTimerRef.current) window.clearTimeout(movementTimerRef.current);
    };
  }, [position, setPetAction]);

  useEffect(() => { localStorage.setItem(NAME_KEY, name.trim() || 'Ready'); }, [name]);
  useEffect(() => { localStorage.setItem(LANGUAGE_KEY, language); }, [language]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const canvas = canvasRef.current;
    const bounds = canvas?.getBoundingClientRect();
    const headTap = event.target === canvas && !!bounds && event.clientY - bounds.top < bounds.height * 0.58;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: position.x, originY: position.y, moved: false, headTap };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true;
    if (!drag.moved) return;
    setFacingLeft(dx < 0);
    setPosition({
      x: Math.max(4, Math.min(window.innerWidth - PET_SIZE - 4, drag.originX + dx)),
      y: Math.max(4, Math.min(window.innerHeight - PET_SIZE - NAV_CLEARANCE, drag.originY + dy)),
    });
    busyUntilRef.current = Date.now() + 1800;
    currentActionRef.current = 'play';
    setAction('play');
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const { moved, headTap } = drag;
    dragRef.current = null;
    setIsDragging(false);
    if (moved) {
      setPetAction('idle');
      busyUntilRef.current = Date.now() + 1800;
    } else if (headTap) {
      sayRandom('pet', 'petting');
    }
  };

  const doAction = (next: PetAction, line: string, duration = 4500) => showMessage(line, next, duration);
  const feed = () => doAction('eat', language === 'tl' ? 'Kakain na ako. Salamat sa pagkain!' : 'Time for a tasty treat!', 5000);
  const play = () => doAction('play', language === 'tl' ? 'Yehey! Laro tayo!' : 'Yay! Let us play!', 4500);
  const sit = () => doAction('sit', language === 'tl' ? 'Uupo muna ako.' : 'I will sit for a little while.', 5000);
  const jump = () => doAction('jump', language === 'tl' ? 'Talon tayo!' : 'Watch me jump!', 1400);
  const roll = () => doAction('roll', language === 'tl' ? 'Gulong-gulong muna!' : 'Look at me roll!', 2200);
  const sleep = () => doAction('sleep', language === 'tl' ? 'Idlip muna ako...' : 'Taking a little nap...', 8000);
  const talk = () => sayRandom('talk');
  const closeTour = () => { setTourStep(null); setShowBubble(false); setPetAction('idle'); };

  return (
    <div className="pet-companion-layer" aria-label={`${name || 'Ready'} the pet companion`}>
      <div
        className={`pet-wanderer ${isDragging ? 'pet-dragging' : ''}`}
        style={{ left: position.x, top: position.y, transform: `scaleX(${facingLeft ? -1 : 1})` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="button"
        tabIndex={0}
        aria-label={`Pet ${name || 'Ready'}. Drag to move or gently pet the head.`}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') sayRandom('pet', 'petting'); }}
      >
        {showBubble && <div className={`pet-speech-bubble ${facingLeft ? 'bubble-flip' : ''}`} dir="auto">{speech}</div>}
        <canvas ref={canvasRef} className="pet-model-canvas" aria-label="Animated puppy" />
        {!loaded && <span className="pet-loading" aria-hidden="true">🐾</span>}
        <span className="pet-name-tag">{name.trim() || 'Ready'}</span>
      </div>

      <button type="button" className="pet-menu-toggle" aria-label={showControls ? 'Close pet controls' : 'Open pet controls'} aria-expanded={showControls} onClick={() => setShowControls((open) => !open)}>🐾</button>
      {showControls && (
        <section className="pet-control-card" aria-label="Pet companion controls">
          <header className="pet-control-heading">
            <span>🐶 {name.trim() || 'Ready'}</span>
            <button type="button" className="pet-close-button" onClick={() => setShowControls(false)} aria-label="Close">×</button>
          </header>
          <label className="pet-field-label" htmlFor="pet-name">Pet name</label>
          <input id="pet-name" className="pet-name-input" value={name} maxLength={18} onChange={(event) => setName(event.target.value)} placeholder="Ready" />
          <label className="pet-field-label" htmlFor="pet-language">Pet language</label>
          <select id="pet-language" className="pet-language-select" value={language} onChange={(event) => setLanguage(event.target.value as PetLanguage)}>
            <option value="en">English</option><option value="tl">Tagalog</option>
          </select>
          <button type="button" className="pet-tour-button" onClick={startTour}>🧭 Tour this page: {PAGE_TITLES[currentPage]}</button>
          <div className="pet-action-buttons">
            <button type="button" onClick={sit}>🪑 Sit</button>
            <button type="button" onClick={jump}>⬆️ Jump</button>
            <button type="button" onClick={roll}>🐾 Roll</button>
            <button type="button" onClick={feed}>🍖 Eat</button>
            <button type="button" onClick={play}>🎾 Play</button>
            <button type="button" onClick={sleep}>🌙 Nap</button>
            <button type="button" onClick={talk}>💬 Chat</button>
          </div>
        </section>
      )}
      {tourStep !== null && (
        <section className="pet-tour-controls" aria-label="Page guide controls">
          <span>{PAGE_TITLES[currentPage]} · {tourStep + 1}/{PAGE_GUIDES[currentPage].length}</span>
          <button type="button" onClick={() => advanceTour(-1)} disabled={tourStep === 0}>Back</button>
          <button type="button" onClick={() => advanceTour(1)}>{tourStep === PAGE_GUIDES[currentPage].length - 1 ? 'Finish' : 'Next'}</button>
          <button type="button" onClick={closeTour} aria-label="Close tour">×</button>
        </section>
      )}
    </div>
  );
}
