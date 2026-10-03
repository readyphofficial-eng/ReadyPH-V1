import { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingBasket, X, Coins, Star, Lock, Sprout, Zap, Trophy, Gift, Tractor, Trees, Egg, Home as HomeIcon, Hammer, Store, Palette, Gem, Sparkles, Bot, BarChart3 } from 'lucide-react';
import { addStar, getStars, lsGet, lsSet } from '@/lib/storage';
import {
  CROPS, TREES, ANIMALS, QUESTS, ACHIEVEMENTS, RECIPES, DECORATIONS, STALL_ORDERS,
  POWERUPS, FARM_HANDS, EXPANDS, STAGES, SEASONS, FERTILIZER_PRICE, FERTILIZER_SPEED,
  WEATHER_EVENTS, xpNeeded, getCurrentSeason,
  type QuestData,
} from '@/lib/farmData';

interface Plot {
  crop: string | null;
  plantedAt: number | null;
  ready: boolean;
  fertilized: boolean;
  withered: boolean;
}

interface TreeState {
  id: string;
  plantedAt: number;
  ready: boolean;
}

interface AnimalState {
  id: string;
  count: number;
  lastCollect: number;
}

interface CraftState {
  recipeId: string;
  startedAt: number;
  ready: boolean;
}

interface FarmData {
  plots: Plot[];
  trees: TreeState[];
  coins: number;
  gems: number;
  level: number;
  xp: number;
  seeds: Record<string, number>;
  animals: AnimalState[];
  harvested: Record<string, number>;
  gridSize: number;
  questData: QuestData;
  questDone: string[];
  achievementsDone: string[];
  lastDailyBonus: number;
  mastery: Record<string, number>;
  decorations: string[];
  crafts: CraftState[];
  stallOrderIdx: number;
  stallOrdersDone: number;
  weather: string;
  weatherUntil: number;
  farmHands: string[];
  activePowerups: Record<string, number>;
  season: string;
}

function defaultData(): FarmData {
  return {
    plots: Array.from({ length: 25 }, () => ({ crop: null, plantedAt: null, ready: false, fertilized: false, withered: false })),
    trees: [],
    coins: 200,
    gems: 10,
    level: 1,
    xp: 0,
    seeds: { carrot: 5, corn: 2, tomato: 1 },
    animals: [{ id: 'chicken', count: 1, lastCollect: Date.now() }],
    harvested: {},
    gridSize: 5,
    questData: { totalHarvested: 0, totalCoinsEarned: 0, animalCollects: 0, treesHarvested: 0, expansions: 0, uniqueCrops: 0, recipesCrafted: 0, ordersCompleted: 0, decorationsOwned: 0, highestLevel: 1, powerupsUsed: 0, gemsSpent: 0 },
    questDone: [],
    achievementsDone: [],
    lastDailyBonus: 0,
    mastery: {},
    decorations: [],
    crafts: [],
    stallOrderIdx: 0,
    stallOrdersDone: 0,
    weather: 'sunny',
    weatherUntil: Date.now() + 300000,
    farmHands: [],
    activePowerups: {},
    season: getCurrentSeason(),
  };
}

function loadData(): FarmData {
  const d = lsGet<FarmData>('readyFarmData', defaultData());
  const def = defaultData();
  if (!d.plots || d.plots.length === 0) d.plots = def.plots;
  d.plots = d.plots.map(p => ({ ...p, fertilized: p.fertilized ?? false, withered: p.withered ?? false }));
  if (!d.seeds) d.seeds = def.seeds;
  if (!d.animals) d.animals = def.animals;
  if (!d.harvested) d.harvested = {};
  if (!d.gridSize) d.gridSize = 5;
  if (!d.trees) d.trees = [];
  if (!d.questData) d.questData = def.questData;
  if (!d.questDone) d.questDone = [];
  if (!d.achievementsDone) d.achievementsDone = [];
  if (!d.mastery) d.mastery = {};
  if (d.lastDailyBonus === undefined) d.lastDailyBonus = 0;
  if (!d.decorations) d.decorations = [];
  if (!d.crafts) d.crafts = [];
  if (d.stallOrderIdx === undefined) d.stallOrderIdx = 0;
  if (d.stallOrdersDone === undefined) d.stallOrdersDone = 0;
  if (!d.weather) d.weather = 'sunny';
  if (!d.weatherUntil) d.weatherUntil = Date.now() + 300000;
  if (d.gems === undefined) d.gems = 10;
  if (!d.farmHands) d.farmHands = [];
  if (!d.activePowerups) d.activePowerups = {};
  if (!d.season) d.season = getCurrentSeason();
  return d;
}

function saveData(d: FarmData) {
  lsSet('readyFarmData', d);
}

function pickWeather(level: number): string {
  const available = WEATHER_EVENTS.filter(w => level >= w.unlock);
  return available[Math.floor(Math.random() * available.length)].id;
}

export function ReadyFarm() {
  const [data, setData] = useState<FarmData>(() => loadData());
  const [shopTab, setShopTab] = useState<'seeds' | 'animals' | 'trees' | 'decor' | 'expand'>('seeds');
  const [showShop, setShowShop] = useState(false);
  const [showPowerups, setShowPowerups] = useState(false);
  const [showFarmHands, setShowFarmHands] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [plantPlot, setPlantPlot] = useState<number | null>(null);
  const [floats, setFloats] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [levelUp, setLevelUp] = useState<number | null>(null);
  const [stars, setStars] = useState(() => getStars());
  const [questPopup, setQuestPopup] = useState<string | null>(null);
  const [achPopup, setAchPopup] = useState<string | null>(null);
  const [dailyAvailable, setDailyAvailable] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [showStall, setShowStall] = useState(false);
  const [showCraft, setShowCraft] = useState(false);
  const floatId = useRef(0);

  const addFloat = useCallback((text: string) => {
    const id = ++floatId.current;
    setFloats(f => [...f, { id, text, x: 35 + Math.random() * 30, y: 25 + Math.random() * 30 }]);
    setTimeout(() => setFloats(f => f.filter(fl => fl.id !== id)), 1500);
  }, []);

  const updateData = useCallback((updater: (d: FarmData) => FarmData) => {
    setData(prev => {
      const next = updater(structuredClone(prev));
      saveData(next);
      return next;
    });
  }, []);

  const getWeather = () => WEATHER_EVENTS.find(w => w.id === data.weather) ?? WEATHER_EVENTS[0];
  const getSeason = () => SEASONS.find(s => s.id === data.season) ?? SEASONS[0];
  const weatherSpeed = getWeather().speed;
  const isRainbow = data.weather === 'rainbow';
  const isStorm = data.weather === 'storm';
  const isBreeze = data.weather === 'breeze';
  const hasDoubleCoins = (data.activePowerups['double'] ?? 0) > Date.now();
  const hasNoWither = (data.activePowerups['nowither'] ?? 0) > Date.now();
  const hasAutoHarvest = (data.activePowerups['autoharvest'] ?? 0) > Date.now();

  useEffect(() => {
    const today = new Date().toDateString();
    setDailyAvailable(data.lastDailyBonus !== Date.parse(today));
  }, [data.lastDailyBonus]);

  const getEffGrowTime = (crop: { grow: number }, fertilized: boolean) => {
    let time = fertilized ? crop.grow / FERTILIZER_SPEED : crop.grow;
    time /= weatherSpeed;
    if (isBreeze) time /= 1; // breeze affects trees not crops
    const seasonBonus = getSeason().speedBonus;
    return time / seasonBonus;
  };

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        let changed = false;
        const now = Date.now();
        const wSpeed = WEATHER_EVENTS.find(w => w.id === prev.weather)?.speed ?? 1;
        const storm = prev.weather === 'storm';
        const noWither = (prev.activePowerups['nowither'] ?? 0) > now;
        const autoHarvest = (prev.activePowerups['autoharvest'] ?? 0) > now;
        const season = SEASONS.find(s => s.id === prev.season) ?? SEASONS[0];
        const seasonBonus = season.speedBonus;

        let autoHarvested = 0;
        let autoCoins = 0;
        let autoXP = 0;

        const plots = prev.plots.map(p => {
          if (p.crop && p.plantedAt && !p.ready && !p.withered) {
            const crop = CROPS[p.crop];
            let growTime = (p.fertilized ? crop.grow / FERTILIZER_SPEED : crop.grow) / wSpeed / seasonBonus;
            const elapsed = (now - p.plantedAt) / 1000;
            if (elapsed >= growTime) {
              if (autoHarvest) {
                const mb = 1 + Math.floor((prev.mastery[p.crop] ?? 0) / 10) * 0.1;
                let gain = Math.floor(crop.price * mb);
                if (prev.weather === 'rainbow') gain *= 2;
                if ((prev.activePowerups['double'] ?? 0) > now) gain *= 2;
                autoCoins += gain;
                autoXP += crop.xp;
                autoHarvested++;
                changed = true;
                return { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
              }
              changed = true;
              return { ...p, ready: true };
            }
            const witherT = storm ? crop.witherTime / 2 : crop.witherTime;
            if (!noWither && elapsed >= growTime + witherT) {
              changed = true;
              return { ...p, withered: true, ready: false };
            }
          }
          return p;
        });

        const breeze = prev.weather === 'breeze';
        const trees = prev.trees.map(t => {
          if (!t.ready) {
            const tree = TREES[t.id];
            let growTime = tree.grow;
            if (breeze) growTime /= 1.5;
            const elapsed = (now - t.plantedAt) / 1000;
            if (elapsed >= growTime) {
              changed = true;
              return { ...t, ready: true };
            }
          }
          return t;
        });

        const crafts = prev.crafts.map(c => {
          if (!c.ready) {
            const recipe = RECIPES.find(r => r.id === c.recipeId);
            if (recipe) {
              const elapsed = (now - c.startedAt) / 1000;
              if (elapsed >= recipe.craftTime) {
                changed = true;
                return { ...c, ready: true };
              }
            }
          }
          return c;
        });

        let weather = prev.weather;
        let weatherUntil = prev.weatherUntil;
        if (now >= weatherUntil) {
          weather = pickWeather(prev.level);
          weatherUntil = now + 300000 + Math.random() * 300000;
          changed = true;
        }

        // Farm hand auto actions
        let fhCoins = 0;
        let fhXP = 0;
        let fhHarvested = 0;
        let fhAnimalCollects = 0;
        if (prev.farmHands.includes('h1')) {
          // auto harvest every ~30s — just harvest all ready
          const newPlots = plots.map(p => {
            if (p.crop && p.ready) {
              const crop = CROPS[p.crop];
              const mb = 1 + Math.floor((prev.mastery[p.crop] ?? 0) / 10) * 0.1;
              let gain = Math.floor(crop.price * mb);
              if (prev.weather === 'rainbow') gain *= 2;
              if ((prev.activePowerups['double'] ?? 0) > now) gain *= 2;
              fhCoins += gain; fhXP += crop.xp; fhHarvested++;
              return { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
            }
            return p;
          });
          if (fhHarvested > 0) {
            plots.splice(0, plots.length, ...newPlots);
            changed = true;
          }
        }
        if (prev.farmHands.includes('h2')) {
          const wSpeedA = prev.weather === 'rainy' ? 0.5 : 1;
          const animals = prev.animals.map(a => {
            const def = ANIMALS[a.id];
            const effTime = def.productTime * wSpeedA;
            if ((now - a.lastCollect) / 1000 >= effTime) {
              fhCoins += def.sell * a.count;
              fhAnimalCollects++;
              return { ...a, lastCollect: now };
            }
            return a;
          });
          if (fhAnimalCollects > 0) {
            prev.animals = animals;
            changed = true;
          }
        }
        if (prev.farmHands.includes('h3')) {
          // Master Gardener: auto-plant empty plots with the best available seed
          const owned = prev.seeds;
          const sortedCrops = Object.entries(CROPS)
            .filter(([k, c]) => prev.level >= c.unlock && (owned[k] ?? 0) > 0)
            .sort((a, b) => b[1].price - a[1].price);
          if (sortedCrops.length > 0) {
            const [bestKey, bestCrop] = sortedCrops[0];
            let seeds = owned[bestKey] ?? 0;
            let planted = 0;
            const newPlots = plots.map(p => {
              if (!p.crop && seeds > 0) {
                seeds--;
                planted++;
                return { crop: bestKey, plantedAt: now, ready: false, fertilized: false, withered: false };
              }
              return p;
            });
            if (planted > 0) {
              plots.splice(0, plots.length, ...newPlots);
              prev.seeds = { ...owned, [bestKey]: seeds };
              changed = true;
            }
          }
        }

        const totalCoins = autoCoins + fhCoins;
        const totalXP = autoXP + fhXP;
        const totalHarvested = autoHarvested + fhHarvested;

        if (changed) {
          const harvested = { ...prev.harvested };
          if (totalHarvested > 0) {
            for (const p of plots) { /* already cleared */ }
            // Track harvested crops from auto-harvest
            for (const p of prev.plots) {
              if (p.crop && p.ready && !plots.includes(p)) {
                harvested[p.crop] = (harvested[p.crop] ?? 0) + 1;
              }
            }
          }
          const questData = {
            ...prev.questData,
            totalHarvested: prev.questData.totalHarvested + totalHarvested,
            totalCoinsEarned: prev.questData.totalCoinsEarned + totalCoins,
            animalCollects: prev.questData.animalCollects + fhAnimalCollects,
            uniqueCrops: Object.keys(harvested).length,
            highestLevel: Math.max(prev.questData.highestLevel, prev.level),
          };
          const next = {
            ...prev,
            plots,
            trees,
            crafts,
            weather,
            weatherUntil,
            animals: prev.animals,
            harvested,
            questData,
            coins: prev.coins + totalCoins,
            xp: prev.xp + totalXP,
          };
          saveData(next);
          return next;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkLevelUp = (d: FarmData, oldLevel: number): FarmData => {
    let { coins, xp, level, gems } = d;
    let leveledUp = false;
    while (xp >= xpNeeded(level)) {
      xp -= xpNeeded(level);
      level++;
      coins += 50;
      gems += 1;
      addStar(10);
      leveledUp = true;
    }
    if (leveledUp) {
      setStars(s => s + 10 * (level - oldLevel));
      setTimeout(() => setLevelUp(level), 200);
    }
    const questData = { ...d.questData, highestLevel: Math.max(d.questData.highestLevel, level) };
    return { ...d, coins, xp, level, gems, questData };
  };

  const checkQuestsAndAchievements = (d: FarmData): FarmData => {
    const newQuests: string[] = [];
    for (const q of QUESTS) {
      if (!d.questDone.includes(q.id) && q.check(d.questData)) newQuests.push(q.id);
    }
    const newAchs: string[] = [];
    for (const a of ACHIEVEMENTS) {
      if (!d.achievementsDone.includes(a.id) && a.check(d.questData)) newAchs.push(a.id);
    }
    if (newQuests.length === 0 && newAchs.length === 0) return d;

    let { coins, xp } = d;
    let starGain = 0;
    const questDone = [...d.questDone, ...newQuests];
    for (const id of newQuests) {
      const q = QUESTS.find(qq => qq.id === id)!;
      coins += q.reward; xp += q.xp; starGain += q.starReward;
      addStar(q.starReward);
      addFloat(`Quest! +${q.reward}🪙`);
    }
    const achievementsDone = [...d.achievementsDone, ...newAchs];
    for (const id of newAchs) {
      const a = ACHIEVEMENTS.find(aa => aa.id === id)!;
      coins += a.reward;
      addFloat(`Achievement! +${a.reward}🪙`);
      setTimeout(() => setAchPopup(id), 500);
    }
    setStars(s => s + starGain);
    if (newQuests.length > 0) setTimeout(() => setQuestPopup(newQuests[0]), 300);
    return checkLevelUp({ ...d, questDone, achievementsDone, coins, xp }, d.level);
  };

  const plant = (plotIdx: number, cropKey: string) => {
    updateData(d => {
      if ((d.seeds[cropKey] ?? 0) <= 0) return d;
      const plots = [...d.plots];
      plots[plotIdx] = { crop: cropKey, plantedAt: Date.now(), ready: false, fertilized: false, withered: false };
      return { ...d, plots, seeds: { ...d.seeds, [cropKey]: d.seeds[cropKey] - 1 } };
    });
    setPlantPlot(null);
  };

  const plantAll = (cropKey: string) => {
    updateData(d => {
      const crop = CROPS[cropKey];
      if (d.level < crop.unlock) return d;
      const plots = [...d.plots];
      let seeds = d.seeds[cropKey] ?? 0;
      let planted = 0;
      for (let i = 0; i < plots.length && seeds > 0; i++) {
        if (!plots[i].crop) {
          plots[i] = { crop: cropKey, plantedAt: Date.now(), ready: false, fertilized: false, withered: false };
          seeds--;
          planted++;
        }
      }
      if (planted === 0) return d;
      addFloat(`Planted ${planted} ${crop.name}!`);
      return { ...d, plots, seeds: { ...d.seeds, [cropKey]: seeds } };
    });
  };

  const fertilize = (plotIdx: number) => {
    updateData(d => {
      if (d.coins < FERTILIZER_PRICE) return d;
      const plots = [...d.plots];
      if (!plots[plotIdx].crop || plots[plotIdx].ready || plots[plotIdx].withered) return d;
      plots[plotIdx] = { ...plots[plotIdx], fertilized: true };
      addFloat('⚡ Fertilized!');
      return { ...d, plots, coins: d.coins - FERTILIZER_PRICE };
    });
  };

  const clearWithered = (plotIdx: number) => {
    updateData(d => {
      const plots = [...d.plots];
      plots[plotIdx] = { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
      addFloat('🧹 Cleared');
      return { ...d, plots };
    });
  };

  const harvest = (plotIdx: number) => {
    const plot = data.plots[plotIdx];
    if (!plot.crop || !plot.ready) return;
    const crop = CROPS[plot.crop];
    const masteryBonus = 1 + Math.floor((data.mastery[plot.crop] ?? 0) / 10) * 0.1;
    let coinGain = Math.floor(crop.price * masteryBonus);
    if (isRainbow) coinGain *= 2;
    if (hasDoubleCoins) coinGain *= 2;
    if ((data.activePowerups['triple'] ?? 0) > Date.now()) coinGain *= 3;
    const xpGain = crop.xp;
    const starGain = Math.floor(crop.price / 3);

    addFloat(`+${coinGain} 🪙`);
    addStar(starGain);
    setStars(s => s + starGain);

    const cropKey = plot.crop;
    updateData(d => {
      const plots = [...d.plots];
      plots[plotIdx] = { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
      const harvested = { ...d.harvested, [cropKey]: (d.harvested[cropKey] ?? 0) + 1 };
      const mastery = { ...d.mastery, [cropKey]: (d.mastery[cropKey] ?? 0) + 1 };
      const questData = {
        ...d.questData,
        totalHarvested: d.questData.totalHarvested + 1,
        totalCoinsEarned: d.questData.totalCoinsEarned + coinGain,
        uniqueCrops: Object.keys(harvested).length,
      };
      let next: FarmData = { ...d, plots, harvested, mastery, questData, coins: d.coins + coinGain, xp: d.xp + xpGain };
      next = checkLevelUp(next, d.level);
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const harvestAll = () => {
    let totalCoins = 0, totalXP = 0, totalStars = 0, count = 0;
    updateData(d => {
      const rainbow = d.weather === 'rainbow';
      const dbl = (d.activePowerups['double'] ?? 0) > Date.now();
      const plots = d.plots.map(p => {
        if (p.crop && p.ready) {
          const crop = CROPS[p.crop];
          const mb = 1 + Math.floor((d.mastery[p.crop] ?? 0) / 10) * 0.1;
          let gain = Math.floor(crop.price * mb);
          if (rainbow) gain *= 2;
          if (dbl) gain *= 2;
          totalCoins += gain; totalXP += crop.xp; totalStars += Math.floor(crop.price / 3); count++;
          return { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
        }
        return p;
      });
      if (count === 0) return d;
      addFloat(`Harvested ${count}! +${totalCoins}🪙`);
      addStar(totalStars);
      setStars(s => s + totalStars);
      const harvested = { ...d.harvested };
      for (const p of d.plots) { if (p.crop && p.ready) harvested[p.crop] = (harvested[p.crop] ?? 0) + 1; }
      
