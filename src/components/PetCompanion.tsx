import { useCallback, useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import './PetCompanion.css';

type PetLanguage = 'en' | 'tl';
type PetAction = 'idle' | 'walk' | 'run' | 'play' | 'sleep' | 'roll' | 'jump' | 'talking';
type PetPosition = { x: number; y: number };

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

const CLIP_MATCH: Record<PetAction, RegExp> = {
  idle: /idle|stand|rest|wait/i,
  walk: /walk|walking/i,
  run: /run|running/i,
  play: /play|fetch|happy|excited/i,
  sleep: /sleep|lie|lay|nap/i,
  roll: /roll|rolling/i,
  jump: /jump|hop/i,
  talking: /talk|speak|bark/i,
};

function storedLanguage(): PetLanguage {
  return localStorage.getItem(LANGUAGE_KEY) === 'tl' ? 'tl' : 'en';
}

function findSafePosition(): PetPosition {
  const maxX = Math.max(12, window.innerWidth - PET_SIZE - 8);
  const maxY = Math.max(24, window.innerHeight - PET_SIZE - NAV_CLEARANCE);
  const controls = 'button, a, input, textarea, select, [role="button"], nav';

  for (let attempt = 0; attempt < 30; attempt += 1) {
    const candidate = {
      x: 8 + Math.random() * Math.max(1, maxX - 8),
      y: 8 + Math.random() * Math.max(1, maxY - 8),
    };
    const points = [
      [candidate.x + PET_SIZE / 2, candidate.y + PET_SIZE / 2],
      [candidate.x + PET_SIZE * 0.25, candidate.y + PET_SIZE * 0.75],
      [candidate.x + PET_SIZE * 0.75, candidate.y + PET_SIZE * 0.75],
    ];
    const blocked = points.some(([x, y]) =>
      document.elementsFromPoint(x, y).some((element) => element.matches(controls) || element.closest(controls)),
    );
    if (!blocked) return candidate;
  }

  return { x: maxX, y: maxY };
}

export function PetCompanion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Partial<Record<PetAction, THREE.AnimationAction>>>({});
  const currentActionRef = useRef<PetAction>('idle');
  const mouthTargetsRef = useRef<Array<{ mesh: THREE.Mesh; index: number }>>([]);
  const jawBoneRef = useRef<THREE.Bone | null>(null);
  const busyUntilRef = useRef(0);
  const speechTimerRef = useRef<number | undefined>(undefined);
  const movementTimerRef = useRef<number | undefined>(undefined);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number; moved: boolean } | null>(null);

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

  const setPetAction = useCallback((next: PetAction, duration = 0) => {
    currentActionRef.current = next;
    setAction(next);
    if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
    if (duration > 0) {
      busyUntilRef.current = Date.now() + duration;
      speechTimerRef.current = window.setTimeout(() => {
        currentActionRef.current = 'idle';
        setAction('idle');
        busyUntilRef.current = 0;
      }, duration);
    }
  }, []);

  const say = useCallback((line: string) => {
    const resolved = line.replaceAll('{name}', name.trim() || 'Ready');
    setSpeech(resolved);
    setShowBubble(true);
    setPetAction('talking');
    window.speechSynthesis?.cancel();
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      setPetAction('talking', Math.max(1800, resolved.length * 55));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(resolved);
    utterance.lang = language === 'tl' ? 'fil-PH' : 'en-US';
    utterance.rate = 0.92;
    utterance.pitch = 1.12;
    utterance.onend = () => {
      currentActionRef.current = 'idle';
      setAction('idle');
      busyUntilRef.current = 0;
    };
    utterance.onerror = () => {
      currentActionRef.current = 'idle';
      setAction('idle');
      busyUntilRef.current = 0;
    };
    busyUntilRef.current = Date.now() + Math.max(2500, resolved.length * 90);
    window.speechSynthesis.speak(utterance);
  }, [language, name, setPetAction]);

  const sayRandom = useCallback((kind: keyof typeof LINES[PetLanguage]) => {
    const options = LINES[language][kind];
    say(options[Math.floor(Math.random() * options.length)]);
  }, [language, say]);

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
    rootRef.current = petRoot;
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
          if (!mapped[petAction] && CLIP_MATCH[petAction].test(clip.name)) {
            mapped[petAction] = mixer.clipAction(clip);
          }
        }
      }
      actionsRef.current = mapped;

      model.traverse((object) => {
        if (object instanceof THREE.Mesh && object.morphTargetDictionary && object.morphTargetInfluences) {
          for (const [morphName, index] of Object.entries(object.morphTargetDictionary)) {
            if (/jaw.?open|mouth.?open|viseme.?aa|lip.?open/i.test(morphName)) {
              mouthTargetsRef.current.push({ mesh: object, index });
            }
          }
        }
        if ((object as THREE.Bone).isBone && /jaw|mandible/i.test(object.name)) jawBoneRef.current = object as THREE.Bone;
      });

      const initialAction = mapped[currentActionRef.current] || mapped.idle;
      if (initialAction) initialAction.reset().fadeIn(0.25).play();
      setLoaded(true);
    }, undefined, (error) => {
      console.error('Unable to load public/dog_puppy.glb', error);
      setSpeech('I could not load my puppy model. Please check the model file.');
      setShowBubble(true);
    });

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      if (disposed) return;
      frame = window.requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      mixerRef.current?.update(delta);

      const current = currentActionRef.current;
      const elapsed = clock.elapsedTime;
      if (petRoot.children.length && !actionsRef.current[current]) {
        petRoot.position.y = current === 'sleep' ? -0.12 : Math.sin(elapsed * (current === 'run' ? 13 : 4)) * (current === 'idle' ? 0.025 : 0.07);
        petRoot.rotation.z = current === 'roll' ? Math.sin(elapsed * 8) * 0.8 : Math.sin(elapsed * 5) * (current === 'play' ? 0.11 : 0.025);
        if (current === 'jump') petRoot.position.y = Math.abs(Math.sin(elapsed * 7)) * 0.38;
      }

      const speaking = current === 'talking';
      const mouthOpen = speaking ? (0.18 + Math.max(0, Math.sin(elapsed * 19)) * 0.75) : 0;
      for (const { mesh, index } of mouthTargetsRef.current) {
        if (mesh.morphTargetInfluences) mesh.morphTargetInfluences[index] = mouthOpen;
      }
      if (jawBoneRef.current) jawBoneRef.current.rotation.x = speaking ? -mouthOpen * 0.22 : 0;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      setPosition((previous) => ({
        x: Math.min(previous.x, Math.max(8, window.innerWidth - PET_SIZE - 8)),
        y: Math.min(previous.y, Math.max(8, window.innerHeight - PET_SIZE - NAV_CLEARANCE)),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.speechSynthesis?.cancel();
      if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
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
      rootRef.current = null;
      actionsRef.current = {};
      mouthTargetsRef.current = [];
      jawBoneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const next = actionsRef.current[action];
    const mixer = mixerRef.current;
    if (!mixer || !next) return;
    for (const existing of Object.values(actionsRef.current)) {
      if (existing && existing !== next && existing.isRunning()) existing.fadeOut(0.2);
    }
    next.reset().fadeIn(0.2).play();
  }, [action, loaded]);

  useEffect(() => {
    let active = true;
    const wander = () => {
      if (!active) return;
      if (Date.now() >= busyUntilRef.current && !dragRef.current) {
        const destination = findSafePosition();
        setFacingLeft(destination.x < position.x);
        setPosition(destination);
        const movement: PetAction = Math.random() < 0.2 ? 'run' : 'walk';
        setPetAction(movement, 2500 + Math.random() * 900);
      }
      movementTimerRef.current = window.setTimeout(wander, 4800 + Math.random() * 2600);
    };
    movementTimerRef.current = window.setTimeout(wander, 3500);
    return () => {
      active = false;
      if (movementTimerRef.current) window.clearTimeout(movementTimerRef.current);
    };
  }, [position, setPetAction]);

  useEffect(() => {
    localStorage.setItem(NAME_KEY, name.trim() || 'Ready');
  }, [name]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: position.x, originY: position.y, moved: false };
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
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const wasDragged = drag.moved;
    dragRef.current = null;
    setIsDragging(false);
    if (!wasDragged) sayRandom('pet');
  };

  const feed = () => {
    setPetAction('play', 1800);
    sayRandom('feed');
  };

  const play = () => {
    setPetAction('play', 4500);
    sayRandom('play');
  };

  const sleep = () => {
    window.speechSynthesis?.cancel();
    setSpeech(language === 'tl' ? 'Idlip muna ako...' : 'Taking a little nap...');
    setShowBubble(true);
    setPetAction('sleep', 8000);
  };

  const talk = () => sayRandom('talk');

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
        aria-label={`Pet ${name || 'Ready'}. Drag to move.`}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') sayRandom('pet'); }}
      >
        {showBubble && <div className={`pet-speech-bubble ${facingLeft ? 'bubble-flip' : ''}`} dir="auto">{speech}</div>}
        <canvas ref={canvasRef} className="pet-model-canvas" aria-label="Animated puppy" />
        {!loaded && <span className="pet-loading" aria-hidden="true">🐾</span>}
        <span className="pet-name-tag">{name.trim() || 'Ready'}</span>
      </div>

      <button
        type="button"
        className="pet-menu-toggle"
        aria-label={showControls ? 'Close pet controls' : 'Open pet controls'}
        aria-expanded={showControls}
        onClick={() => setShowControls((open) => !open)}
      >🐾</button>

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
            <option value="en">English (default)</option>
            <option value="tl">Tagalog</option>
          </select>
          <div className="pet-action-buttons">
            <button type="button" onClick={feed}>🍖 Feed</button>
            <button type="button" onClick={play}>🎾 Play</button>
            <button type="button" onClick={sleep}>🌙 Sleep</button>
            <button type="button" onClick={talk}>💬 Talk</button>
          </div>
        </section>
      )}
    </div>
  );
}
