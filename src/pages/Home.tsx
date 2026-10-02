import { useState, useEffect } from 'react';
import { Flame, BookOpen, GraduationCap, Gamepad2, Trophy, User, Settings, MessageSquare, Heart, Gift, Star, Sparkles, Egg, Brain, FileText, Library, Smartphone, BarChart3, Download } from 'lucide-react';
import { getGreeting, getStreak, getStars, getStickers, lsGet, lsSet, getShopItems, getPartners, getAppLogo } from '@/lib/storage';
import { t } from '@/lib/i18n';
import { promptInstall, canInstall, isInstalled } from '@/lib/pwa';
import { Confetti } from '@/components/Confetti';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [streak] = useState(() => getStreak());
  const [stars] = useState(() => getStars());
  const [stickers] = useState(() => getStickers());
  const [videosWatched, setVideosWatched] = useState(0);
  const [showEgg, setShowEgg] = useState(false);
  const [eggOpened, setEggOpened] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [parentalPopup, setParentalPopup] = useState<'elementary' | 'highschool' | null>(null);
  const [parentalAnswer, setParentalAnswer] = useState('');
  const [parentalError, setParentalError] = useState(false);
  const [shopItems, setShopItems] = useState(() => getShopItems());
  const [partners, setPartners] = useState(() => getPartners());
  const [appLogo, setAppLogo] = useState(() => getAppLogo());
  const [installable, setInstallable] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const recent = lsGet<string[]>('recentWatched', []);
    setVideosWatched(recent.length);
    setShowEgg(recent.length >= 3);
    const handler = () => {
      setAppLogo(getAppLogo());
      setShopItems(getShopItems());
      setPartners(getPartners());
    };
    window.addEventListener('appLogoChanged', handler);
    window.addEventListener('cloudSynced', handler);
    
    // Check PWA installation status
    setInstallable(canInstall());
    setInstalled(isInstalled());
    
    return () => {
      window.removeEventListener('appLogoChanged', handler);
      window.removeEventListener('cloudSynced', handler);
    };
  }, []);

  const handleParentalSubmit = () => {
    if (parseInt(parentalAnswer) === 15) {
      setParentalPopup(null);
      setParentalAnswer('');
      setParentalError(false);
      if (parentalPopup === 'elementary') onNavigate('elementary');
      else onNavigate('highschool');
    } else {
      setParentalError(true);
    }
  };

  const openEgg = () => {
    setEggOpened(true);
    setConfetti(c => c + 1);
    const bonus = Math.floor(Math.random() * 3) + 1;
    const cur = parseInt(localStorage.getItem('stars') ?? '0');
    localStorage.setItem('stars', String(cur + bonus));
    setTimeout(() => {
      setEggOpened(false);
      setShowEgg(false);
    }, 3000);
  };

  const handleInstall = () => {
    promptInstall();
    setInstallable(false);
  };

  return (
    <div className="min-h-screen pb-28">
      <Confetti trigger={confetti} />

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-400 via-candy-pink to-candy-purple px-5 pt-10 pb-8 rounded-b-[2.5rem] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-[72px] h-[72px] shrink-0 rounded-2xl bg-white shadow-lg overflow-hidden flex items-center justify-center">
              {appLogo
                ? <img src={appLogo} alt="Ready PH logo" className="block w-full h-full object-contain" />
                : <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] font-bold text-center px-1 leading-tight">Ready PH</div>}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-white leading-tight">Ready PH</h1>
              <p className="text-white/80 text-sm">{t('app.tagline')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/25 backdrop-blur rounded-full px-3 py-1.5">
            <Flame size={18} className="text-yellow-300" />
            <span className="text-white font-bold text-sm">{streak.current} {t('home.streak_days')}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 text-sm">{getGreeting()},</p>
            <p className="text-white text-xl font-bold">{t('home.greeting')}! 👋</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/25 backdrop-blur rounded-full px-3 py-1.5">
            <Star size={18} className="text-yellow-300 fill-yellow-300" />
            <span className="text-white font-bold">{stars}</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Install Banner - Only show if not installed and installable */}
        {!installed && installable && (
          <div className="bg-gradient-to-r from-candy-blue to-candy-purple rounded-2xl p-4 shadow-lg mb-4 animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
                <Download size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{t('pwa.install')}</p>
                <p className="text-white/80 text-xs">{t('pwa.install_desc')}</p>
              </div>
              <button
                onClick={handleInstall}
                className="bg-white rounded-full px-4 py-2 text-candy-purple font-bold text-xs whitespace-nowrap active:scale-95 transition flex-shrink-0"
              >
                {t('install.btn')}
              </button>
            </div>
          </div>
        )}

        {/* Top Row - 3 buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onNavigate('kinder')}
            className="flex-1 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-3 shadow-lg active:scale-95 transition transform hover:shadow-xl"
          >
            <div className="text-2xl mb-1">🎨</div>
            <p className="text-white font-bold text-xs leading-tight">{t('home.kinder_ready')}</p>
          </button>
          <button
            onClick={() => setParentalPopup('elementary')}
            className="flex-1 bg-gray-300 rounded-2xl p-3 shadow active:scale-95 transition"
          >
            <div className="text-2xl mb-1">📖</div>
            <p className="text-gray-500 font-bold text-xs leading-tight">{t('home.elementary')}</p>
            <p className="text-gray-400 text-[10px]">🔒 {t('home.locked')}</p>
          </button>
          <button
            onClick={() => setParentalPopup('highschool')}
            className="flex-1 bg-gray-300 rounded-2xl p-3 shadow active:scale-95 transition"
          >
            <div className="text-2xl mb-1">🎓</div>
            <p className="text-gray-500 font-bold text-xs leading-tight">{t('home.highschool')}</p>
            <p className="text-gray-400 text-[10px]">🔒 {t('home.locked')}</p>
          </button>
        </div>

        {/* Daily Challenge + Surprise Egg */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-gradient-to-br from-candy-blue to-candy-purple rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} className="text-white" />
              <p className="text-white font-bold text-sm">{t('home.daily_challenge')}</p>
            </div>
            <p className="text-white/80 text-xs mb-2">{t('home.daily_challenge_desc')}</p>
            <button
              onClick={() => onNavigate('kinder')}
              className="bg-white/30 backdrop-blur rounded-full px-3 py-1 text-white text-xs font-bold"
            >
              {t('home.start')} →
            </button>
          </div>

          {showEgg && (
            <button
              onClick={openEgg}
              className="w-28 bg-gradient-to-br from-candy-yellow to-candy-pink rounded-2xl p-3 shadow-lg active:scale-95 transition animate-bounce-in relative overflow-hidden"
            >
              {eggOpened ? (
                <div className="text-center animate-pop">
                  <div className="text-3xl">🎉</div>
                  <p className="text-white font-bold text-[10px] mt-1">{t('home.bonus_stars')}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-3xl animate-float">🥚</div>
                  <p className="text-white font-bold text-[10px] mt-1">{t('home.surprise_egg')}</p>
                </div>
              )}
            </button>
          )}
        </div>

        {/* Partners */}
        <div className="bg-white rounded-2xl p-4 shadow mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤝</span>
              <p className="font-bold text-gray-700">{t('partners.title')}</p>
            </div>
            <button
              onClick={() => onNavigate('partners')}
              className="bg-gray-100 rounded-full px-3 py-1 text-xs font-bold text-gray-500 active:scale-95 transition"
            >
              {t('shop.view_all')} ›
            </button>
          </div>
          {partners.length === 0 ? (
            <p className="text-xs text-gray-400">{t('partners.empty')}</p>
          ) : (
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {partners.map((p, i) => (
                <div key={i} className="flex-shrink-0 min-w-[80px] bg-gray-50 rounded-2xl p-2 flex flex-col items-center gap-1.5">
                  <div className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                    {p.logoImg ? <img src={p.logoImg} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-xl">{p.logo || '🤝'}</span>}
                  </div>
                  <p className="text-[11px] font-bold text-gray-600 text-center leading-tight max-w-[76px] truncate">{p.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Online Shop preview */}
        <div className="bg-white rounded-2xl p-4 shadow mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <p className="font-bold text-gray-700">{t('shop.title')}</p>
            </div>
            <button
              onClick={() => onNavigate('freebies')}
              className="bg-gray-100 rounded-full px-3 py-1 text-xs font-bold text-gray-500 active:scale-95 transition"
            >
              {t('shop.view_all')} ›
            </button>
          </div>
          {shopItems.length === 0 ? (
            <p className="text-xs text-gray-400">{t('shop.empty')}</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {shopItems.slice(0, 3).map((item, i) => (
                <button
                  key={i}
                  onClick={() => window.open(item.link, '_blank')}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2.5 text-left active:scale-95 transition w-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.logoImg ? <img src={item.logoImg} alt={item.title} className="w-full h-full object-cover" /> : <span className="text-2xl">{item.logo || '🛒'}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-700 text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 truncate" style={{ fontSize: 12 }}>{item.desc}</p>
                    {item.subDesc && <span className="inline-block bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 mt-0.5 text-[11px] font-bold">{item.subDesc}</span>}
                  </div>
                  <span className="bg-gradient-to-r from-candy-green to-candy-mint rounded-full px-3 py-1.5 text-white text-xs font-bold flex-shrink-0">Buy ↗</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Vertical Button List */}
        <div className="flex flex-col gap-2.5 mb-4">
          <NavButton icon={<Brain size={24} />} label="Quiz Time!" color="from-candy-blue to-candy-mint" onClick={() => onNavigate('quiz')} />
          <NavButton icon={<FileText size={24} />} label="Worksheets" color="from-candy-green to-candy-mint" onClick={() => onNavigate('worksheets')} />
          <NavButton icon={<Library size={24} />} label="Textbooks" color="from-candy-purple to-candy-blue" onClick={() => onNavigate('textbooks')} />
          <NavButton icon={<Gamepad2 size={24} />} label={t('home.mini_games')} color="from-candy-pink to-candy-purple" onClick={() => onNavigate('games')} />
          <NavButton icon={<span className="text-2xl">🌾</span>} label="Ready Farm" color="from-green-500 to-green-600" onClick={() => onNavigate('readyfarm')} />
          <NavButton icon={<Trophy size={24} />} label={t('home.achievements')} color="from-candy-yellow to-candy-green" onClick={() => onNavigate('achievements')} />
          <NavButton icon={<BarChart3 size={24} />} label={t('parents.title')} color="from-candy-purple to-candy-blue" onClick={() => onNavigate('parents')} />
          <NavButton icon={<Smartphone size={24} />} label={t('install.title')} color="from-candy-blue to-candy-mint" onClick={() => onNavigate('install')} />
          <NavButton icon={<User size={24} />} label={t('home.profile_id')} color="from-candy-blue to-candy-mint" onClick={() => onNavigate('profile')} />
          <NavButton icon={<Heart size={24} />} label={t('home.support')} color="from-candy-pink to-red-400" onClick={() => onNavigate('support')} />
          <NavButton icon={<Gift size={24} />} label={t('home.freebies')} color="from-candy-green to-candy-mint" onClick={() => onNavigate('freebies')} />
          <NavButton icon={<MessageSquare size={24} />} label={t('home.message_dev')} color="from-candy-purple to-candy-blue" onClick={() => onNavigate('message')} />
          <NavButton icon={<Settings size={24} />} label={t('home.settings')} color="from-gray-400 to-gray-500" onClick={() => onNavigate('settings')} />
        </div>

        {/* Sticker Book */}
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 shadow">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📒</span>
            <p className="font-bold text-orange-700">{t('home.sticker_book')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Letters', 'Numbers', 'Colors', 'Shapes', 'Animals'].map(cat => {
              const has = stickers.includes(cat);
              return (
                <div
                  key={cat}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                    has
                      ? 'bg-gradient-to-br from-candy-yellow to-candy-pink text-white shadow animate-pop'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {has ? getStickerEmoji(cat) : '🔒'} {cat}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Parental Gate Popup */}
      {parentalPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-pop">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-bold text-lg text-gray-800">
                {parentalPopup === 'elementary' ? t('home.coming_elementary') : t('home.coming_highschool')}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{t('home.parental_gate')}</p>
            </div>
            <input
              type="number"
              value={parentalAnswer}
              onChange={e => { setParentalAnswer(e.target.value); setParentalError(false); }}
              className="w-full text-center text-xl font-bold border-2 border-gray-200 rounded-2xl py-3 mb-2 focus:border-primary-400 outline-none"
              placeholder="?"
            />
            {parentalError && <p className="text-red-500 text-sm text-center mb-2">{t('home.parental_wrong')}</p>}
            <div className="flex gap-2">
              <button onClick={() => { setParentalPopup(null); setParentalAnswer(''); setParentalError(false); }} className="flex-1 bg-gray-200 rounded-full py-2.5 font-bold text-gray-600">{t('home.cancel')}</button>
              <button onClick={handleParentalSubmit} className="flex-1 bg-primary-500 rounded-full py-2.5 font-bold text-white">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 bg-gradient-to-r ${color} rounded-2xl p-3.5 shadow-lg active:scale-95 transition transform hover:shadow-xl w-full text-left`}
    >
      <div className="bg-white/30 backdrop-blur rounded-xl p-2">{icon}</div>
      <span className="text-white font-bold flex-1">{label}</span>
      <span className="text-white/70 text-xl">›</span>
    </button>
  );
}

function getStickerEmoji(cat: string): string {
  const map: Record<string, string> = { Letters: '🔤', Numbers: '🔢', Colors: '🌈', Shapes: '🔷', Animals: '🐾' };
  return map[cat] ?? '⭐';
}
