import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Coins, Egg, Apple, ChefHat, Store, Clock, Sprout, Hammer } from 'lucide-react';
import { addStar, getStars, lsGet, lsSet } from '@/lib/storage';
import { CROPS, TREES, ANIMALS, xpNeeded, getCurrentSeason, SEASONS, WEATHER_EVENTS, FERTILIZER_SPEED, FERTILIZER_PRICE } from '@/lib/farmData';

interface Plot { crop: string | null; plantedAt: number | null; ready: boolean; fertilized: boolean; withered: boolean; }
interface FarmData { plots: Plot[]; coins: number; gems: number; level: number; xp: number; seeds: Record<string,number>; harvested: Record<string,number>; lastDailyBonus: number; weather: string; weatherUntil: number; activePowerups: Record<string,number>; mastery: Record<string,number>; season: string; animals: any[]; }

function defaultData(): FarmData {
  return {
    plots: Array.from({ length: 25 }, () => ({ crop: null, plantedAt: null, ready: false, fertilized: false, withered: false })),
    coins: 200, gems: 10, level: 1, xp: 0, seeds: { carrot: 5, corn: 3, tomato: 2 },
    harvested: {}, lastDailyBonus: 0, weather: 'sunny', weatherUntil: Date.now()+300000, activePowerups: {}, mastery: {}, season: getCurrentSeason(), animals: [{id:'chicken',count:1,lastCollect:Date.now()}]
  };
}
function loadData(): FarmData {
  const d = lsGet<FarmData>('readyFarmData', defaultData()); const def = defaultData();
  return {...def,...d, plots: (d.plots?.length? d.plots : def.plots).map((p:any)=>({fertilized:false,withered:false,...p})), seeds: d.seeds||def.seeds, harvested: d.harvested||{} };
}
function saveData(d: FarmData){ lsSet('readyFarmData', d); }

export function ReadyFarm() {
  const [data, setData] = useState<FarmData>(()=>loadData());
  const [area, setArea] = useState<'farm'|'barn'|'orchard'|'kitchen'|'stall'>('farm');
  const [plantPlot, setPlantPlot] = useState<number|null>(null);
  const [floats, setFloats] = useState<{id:number;text:string;x:number;y:number}[]>([]);
  const floatId = useRef(0);
  const addFloat = useCallback((text:string)=>{ const id=++floatId.current; setFloats(f=>[...f,{id,text,x:20+Math.random()*60,y:15+Math.random()*50}]); setTimeout(()=>setFloats(f=>f.filter(fl=>fl.id!==id)),1200); },[]);
  const updateData = useCallback((updater:(d:FarmData)=>FarmData)=>{ setData(prev=>{ const next=updater({...prev,plots:[...prev.plots]}); saveData(next); return next; }); },[]);

  // FARM LOOP
  useEffect(()=>{
    const iv=setInterval(()=>{ setData(prev=>{
      let changed=false; const now=Date.now(); const plots=prev.plots.map(p=>{
        if(p.crop && p.plantedAt &&!p.ready &&!p.withered){
          const crop=CROPS[p.crop]; const gt=(p.fertilized?crop.grow/FERTILIZER_SPEED:crop.grow);
          if((now-p.plantedAt)/1000>=gt){ changed=true; return {...p,ready:true}; }
        }
        return p;
      });
      if(changed){ const n={...prev,plots}; saveData(n); return n; }
      return prev;
    }); },1200); return()=>clearInterval(iv);
  },[]);

  const plant = (idx:number,key:string)=>{
    updateData(d=>{
      if((d.seeds[key]||0)<=0) return d;
      const plots=[...d.plots]; plots[idx]={crop:key,plantedAt:Date.now(),ready:false,fertilized:false,withered:false};
      return {...d,plots,seeds:{...d.seeds,[key]:d.seeds[key]-1}};
    }); setPlantPlot(null);
  }
  const harvest = (idx:number)=>{
    const p=data.plots[idx]; if(!p.crop||!p.ready) return;
    const crop=CROPS[p.crop]; const gain=crop.price;
    addFloat(`+${gain}🪙`); addStar(2);
    updateData(d=>{
      const plots=[...d.plots]; plots[idx]={crop:null,plantedAt:null,ready:false,fertilized:false,withered:false};
      return {...d,plots,coins:d.coins+gain,harvested:{...d.harvested,[p.crop!]: (d.harvested[p.crop!]||0)+1}, xp:d.xp+crop.xp };
    });
  }

  // MINI GAMES STATE
  const [feed, setFeed] = useState(5); const [eggs, setEggs] = useState(0);
  const [fruits, setFruits] = useState<{id:number,x:number,y:number}[]>([]);
  const [order, setOrder] = useState({item:'carrot',qty:3,reward:60,time:20}); const [timeLeft,setTimeLeft]=useState(20);

  useEffect(()=>{ // barn
    const i=setInterval(()=>{ if(area==='barn' && feed>0){ setEggs(e=>e+1); setFeed(f=>f-1); } },2500); return()=>clearInterval(i);
  },[feed,area]);
  useEffect(()=>{ // orchard
    if(area!=='orchard') return; const i=setInterval(()=>{ setFruits(f=>[...f,{id:Date.now(),x:10+Math.random()*70,y:10+Math.random()*60}].slice(-6)); },1800); return()=>clearInterval(i);
  },[area]);
  useEffect(()=>{ // stall timer
    if(area!=='stall') return; const i=setInterval(()=>{ setTimeLeft(t=>{ if(t<=1){ const it=['carrot','corn','tomato']; setOrder({item:it[Math.floor(Math.random()*3)],qty:2+Math.floor(Math.random()*3),reward:40+Math.random()*30|0,time:20}); return 20; } return t-1; }); },1000); return()=>clearInterval(i);
  },[area]);

  const tabs = [
    {id:'farm',label:'🌾 Farm'},{id:'barn',label:'🐔 Barn'},{id:'orchard',label:'🍎 Orchard'},{id:'kitchen',label:'🍳 Kitchen'},{id:'stall',label:'🏪 Stall'},
  ] as const;

  return (
    <div className="min-h-screen bg-[#0f1a0f] text-white p-2 pb-20 relative overflow-hidden">
      {/* FLOATS */}
      {floats.map(f=><div key={f.id} style={{left:`${f.x}%`,top:`${f.y}%`}} className="absolute pointer-events-none animate-[bounce_1.2s_ease] font-bold text-yellow-300 z-50">{f.text}</div>)}

      {/* HEADER */}
      <div className="flex justify-between items-center bg-black/40 p-3 rounded-2xl mb-2">
        <div className="flex gap-3 text-sm"><span className="flex items-center gap-1"><Coins size={14} className="text-yellow-400"/>{data.coins}</span><span className="flex items-center gap-1">⭐{getStars()}</span><span>Lv{data.level}</span></div>
        <div className="text-xs opacity-70">ReadyFarm V1</div>
      </div>

      {/* TABS */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {tabs.map(t=><button key={t.id} onClick={()=>setArea(t.id)} className={`px-3.5 py-2 rounded-full text-[13px] font-bold whitespace-nowrap ${area===t.id?'bg-yellow-400 text-black':'bg-white/10'}`}>{t.label}</button>)}
      </div>

      {/* FARM AREA */}
      {area==='farm' && (
        <>
          <div className="grid grid-cols-5 gap-1.5 bg-[#1a2e1a] p-2 rounded-2xl">
            {data.plots.map((p,i)=>(
              <button key={i} onClick={()=> p.ready? harvest(i) :!p.crop? setPlantPlot(i) : null} className={`aspect-square rounded-xl flex items-center justify-center text-xl ${p.ready?'bg-yellow-600 animate-pulse':p.crop?'bg-green-800':'bg-[#2a4a2a] border border-white/10'} ${p.withered?'bg-red-900':''}`}>
                {!p.crop? <Sprout size={16} className="opacity-30"/> : p.withered? '🥀' : p.ready? CROPS[p.crop]?.emoji || '🌾' : '🌱'}
              </button>
            ))}
          </div>
          {plantPlot!==null && (
            <div className="fixed inset-0 bg-black/60 z-40 flex items-end justify-center p-2">
              <div className="bg-[#1e3a1e] w-full max-w-sm rounded-t-[24px] p-4">
                <div className="flex justify-between mb-3"><b>Plant Seeds</b><button onClick={()=>setPlantPlot(null)}>✕</button></div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(CROPS).map(([k,c])=>(
                    <button key={k} disabled={(data.seeds[k]||0)<=0} onClick={()=>plant(plantPlot,k)} className="bg-white/10 disabled:opacity-20 p-3 rounded-xl text-xs">
                      <div className="text-xl">{(c as any).emoji}</div><div>{c.name}</div><div className="opacity-60">{data.seeds[k]||0} seeds</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="mt-2 text-[11px] opacity-60 text-center">Tap empty plot to plant • Tap ready crop to harvest</div>
        </>
      )}

      {area==='barn' && (
        <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800">
          <h3 className="font-bold flex gap-2"><Egg/> Barn - Auto Eggs</h3><p className="text-xs opacity-60">Feed chickens, they lay eggs every 2.5s. Eggs sell for 5🪙</p>
          <div className="mt-3 bg-black/30 p-3 rounded-xl flex justify-between"><span>Feed: {feed}</span><span>Eggs: {eggs} 🥚</span></div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button onClick={()=>{ if(data.coins>=10){ updateData(d=>({...d,coins:d.coins-10})); setFeed(f=>f+5); addFloat('Feed +5'); }}} className="bg-amber-600 py-3 rounded-xl text-sm font-bold">Buy Feed 5x -10🪙</button>
            <button onClick={()=>{ if(eggs>0){ updateData(d=>({...d,coins:d.coins+eggs*5})); addFloat(`+${eggs*5}🪙 eggs`); setEggs(0); }}} className="bg-green-600 py-3 rounded-xl text-sm font-bold">Sell Eggs</button>
          </div>
        </div>
      )}

      {area==='orchard' && (
        <div className="p-4 bg-green-950/30 rounded-2xl border border-green-800">
          <h3 className="font-bold flex gap-2"><Apple/> Orchard - Tap Game</h3><p className="text-xs opacity-60">Tap fruits before they vanish! 8🪙 each</p>
          <div className="relative h-[220px] bg-black/40 rounded-xl mt-3 overflow-hidden">
            {fruits.map(f=>(
              <button key={f.id} onClick={()=>{ setFruits(fl=>fl.filter(x=>x.id!==f.id)); updateData(d=>({...d,coins:d.coins+8})); addFloat('+8🪙 🍎'); }} style={{left:`${f.x}%`,top:`${f.y}%`}} className="absolute text-3xl">🍎</button>
            ))}
            {fruits.length===0 && <div className="absolute inset-0 flex items-center justify-center opacity-30 text-sm">Wait for fruits...</div>}
          </div>
        </div>
      )}

      {area==='kitchen' && (
        <div className="p-4 bg-orange-950/30 rounded-2xl border border-orange-800">
          <h3 className="font-bold flex gap-2"><ChefHat/> Kitchen - Cooking</h3>
          {[
            {id:'salad', need:{carrot:2,tomato:1}, reward:50, emoji:'🥗', name:'Veg Salad'},
            {id:'soup', need:{corn:3}, reward:70, emoji:'🍲', name:'Corn Soup'},
            {id:'cake', need:{carrot:3,corn:2}, reward:120, emoji:'🎂', name:'Farm Cake'},
          ].map(r=>{
            const can = Object.entries(r.need).every(([k,v])=>(data.harvested[k]||0)>=v);
            return (
              <div key={r.id} className="bg-black/30 p-3 rounded-xl mt-2 flex justify-between items-center">
                <div><div className="font-bold text-sm">{r.emoji} {r.name}</div><div className="text-[11px] opacity-70">{Object.entries(r.need).map(([k,v])=>`${k} x${v}`).join(' + ')} → {r.reward}🪙</div></div>
                <button disabled={!can} onClick={()=>{ updateData(d=>{ const h={...d.harvested}; for(const [k,v] of Object.entries(r.need)) h[k]=Math.max(0,(h[k]||0)-v); return {...d,harvested:h,coins:d.coins+r.reward}; }); addFloat(`Cooked ${r.name}! +${r.reward}🪙`); }} className="bg-orange-600 disabled:opacity-30 px-3 py-2 rounded-xl text-xs font-bold">Cook</button>
              </div>
            )
          })}
          <div className="text-[11px] mt-2 opacity-50">Inventory: {Object.entries(data.harvested).map(([k,v])=>`${k}:${v}`).join(' • ')||'none'}</div>
        </div>
      )}

      {area==='stall' && (
        <div className="p-4 bg-blue-950/30 rounded-2xl border border-blue-800">
          <h3 className="font-bold flex gap-2"><Store/> Farm Stall - Orders</h3>
          <div className="bg-black/40 p-4 rounded-xl mt-3">
            <div className="flex justify-between"><b>Customer wants:</b><span className="flex items-center gap-1 text-xs"><Clock size={12}/>{timeLeft}s</span></div>
            <div className="text-2xl mt-2">{order.qty}x {order.item==='carrot'?'🥕':order.item==='corn'?'🌽':'🍅'} {order.item}</div>
            <div className="text-sm opacity-70">Reward: {order.reward}🪙 • You have: {data.harvested[order.item]||0}</div>
            <button disabled={(data.harvested[order.item]||0)<order.qty} onClick={()=>{ updateData(d=>({...d,harvested:{...d.harvested,[order.item]: (d.harvested[order.item]||0)-order.qty},coins:d.coins+order.reward})); addFloat(`+${order.reward}🪙 Order!`); const it=['carrot','corn','tomato']; setOrder({item:it[Math.floor(Math.random()*3)],qty:2+Math.floor(Math.random()*3),reward:40+Math.random()*40|0,time:20}); setTimeLeft(20); }} className="w-full mt-3 bg-blue-600 disabled:opacity-30 py-3 rounded-xl font-bold">Deliver Order</button>
          </div>
        </div>
      )}

      <div className="text-center text-[10px] opacity-30 mt-6">All areas share same coins & crops • Phone optimized</div>
    </div>
  );
      }
