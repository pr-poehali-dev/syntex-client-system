import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const REEL_ITEMS = [
  { label: '7 дней', icon: '🎉', color: 'text-violet-400', win: true },
  { label: 'Пусто', icon: '💀', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '❌', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '💀', color: 'text-slate-500', win: false },
  { label: '7 дней', icon: '🎉', color: 'text-violet-400', win: true },
  { label: 'Пусто', icon: '❌', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '💀', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '❌', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '💀', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '❌', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '💀', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '❌', color: 'text-slate-500', win: false },
  { label: 'Пусто', icon: '💀', color: 'text-slate-500', win: false },
];

const ITEM_W = 96;
const WIN_CHANCE = 0.08;

function buildStrip(landIndex: number): typeof REEL_ITEMS {
  const prefix = Array.from({ length: 20 }, (_, i) => REEL_ITEMS[i % REEL_ITEMS.length]);
  const suffix = Array.from({ length: 5 }, (_, i) => REEL_ITEMS[(landIndex + i + 1) % REEL_ITEMS.length]);
  return [...prefix, REEL_ITEMS[landIndex], ...suffix];
}

const Roulette = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<null | { win: boolean; label: string }>(null);
  const [cooldown, setCooldown] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const reelRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (spinning || cooldown || spinsLeft <= 0) return;
    setResult(null);
    setSpinning(true);
    setSpinsLeft((s) => s - 1);

    const isWin = Math.random() < WIN_CHANCE;
    const winIndices = REEL_ITEMS.map((it, i) => it.win ? i : -1).filter((i) => i >= 0);
    const loseIndices = REEL_ITEMS.map((it, i) => !it.win ? i : -1).filter((i) => i >= 0);
    const landIndex = isWin
      ? winIndices[Math.floor(Math.random() * winIndices.length)]
      : loseIndices[Math.floor(Math.random() * loseIndices.length)];

    const strip = buildStrip(landIndex);

    if (stripRef.current) {
      stripRef.current.style.transition = 'none';
      stripRef.current.style.transform = 'translateX(0)';
      stripRef.current.innerHTML = '';
      strip.forEach((it) => {
        const el = document.createElement('div');
        el.className = `inline-flex flex-col items-center justify-center w-24 h-20 shrink-0 rounded-xl border border-white/8 bg-white/4 mx-1`;
        el.innerHTML = `<span style="font-size:1.75rem">${it.icon}</span><span class="text-xs font-mono mt-1 ${it.color}">${it.label}</span>`;
        stripRef.current!.appendChild(el);
      });
    }

    const containerW = reelRef.current?.offsetWidth ?? 320;
    const centerOffset = Math.floor(containerW / 2) - ITEM_W / 2;
    const landPos = 20 * (ITEM_W + 8) - centerOffset;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (stripRef.current) {
          stripRef.current.style.transition = 'transform 4s cubic-bezier(0.25,1,0.5,1)';
          stripRef.current.style.transform = `translateX(-${landPos}px)`;
        }
      });
    });

    setTimeout(() => {
      setSpinning(false);
      setResult({ win: isWin, label: REEL_ITEMS[landIndex].label });
      if (isWin) toast.success('Поздравляем! +7 дней подписки!');
      else toast.error('Не повезло. Попробуй ещё раз!');
      if (spinsLeft - 1 <= 0) {
        setCooldown(true);
        setTimeout(() => { setCooldown(false); setSpinsLeft(3); }, 60000);
      }
    }, 4200);
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0f0f1a] p-7">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-heading uppercase text-sm text-white tracking-wide">Рулетка</h3>
          <p className="text-xs text-slate-500 mt-0.5">Малый шанс выиграть 7 дней подписки</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Попыток</p>
          <p className="font-heading font-bold text-white">{spinsLeft} / 3</p>
        </div>
      </div>

      <div className="flex items-center gap-2 my-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <span className="text-[10px] font-mono text-violet-500/50 uppercase tracking-widest">шанс ~8%</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>

      {/* reel */}
      <div
        ref={reelRef}
        className="relative overflow-hidden rounded-xl border border-white/8 bg-black/30 h-24 mb-5"
      >
        {/* pointer */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-violet-500/70 z-10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-violet-500 z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-violet-500 z-10" />
        {/* left/right fade */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/70 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center h-full px-2">
          <div ref={stripRef} className="flex items-center will-change-transform">
            {REEL_ITEMS.slice(0, 7).map((it, i) => (
              <div key={i} className="inline-flex flex-col items-center justify-center w-24 h-20 shrink-0 rounded-xl border border-white/8 bg-white/4 mx-1">
                <span style={{ fontSize: '1.75rem' }}>{it.icon}</span>
                <span className={`text-xs font-mono mt-1 ${it.color}`}>{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <div className={`rounded-xl border px-4 py-3 mb-4 flex items-center gap-3 ${result.win ? 'border-violet-500/40 bg-violet-500/10' : 'border-white/8 bg-white/4'}`}>
          <Icon name={result.win ? 'Gift' : 'X'} size={18} className={result.win ? 'text-violet-400' : 'text-slate-500'} />
          <p className={`text-sm font-medium ${result.win ? 'text-violet-300' : 'text-slate-500'}`}>
            {result.win ? '🎉 +7 дней подписки начислено!' : 'Не повезло — попробуй ещё раз'}
          </p>
        </div>
      )}

      <Button
        onClick={spin}
        disabled={spinning || cooldown || spinsLeft <= 0}
        className="w-full h-12 rounded-xl font-semibold text-base bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {spinning ? (
          <><Icon name="Loader2" size={18} className="mr-2 animate-spin" /> Крутится...</>
        ) : cooldown ? (
          <><Icon name="Clock" size={18} className="mr-2" /> Перезарядка 60с</>
        ) : spinsLeft <= 0 ? (
          'Попытки закончились'
        ) : (
          <><Icon name="Dices" size={18} className="mr-2" /> Крутить ({spinsLeft} попытки)</>
        )}
      </Button>
    </div>
  );
};

const Account = ({ onGoHome }: { onGoHome: () => void }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'roulette' | 'settings'>('overview');

  if (!user) return null;

  const tabs = [
    { key: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
    { key: 'roulette', label: 'Рулетка', icon: 'Dices' },
    { key: 'settings', label: 'Настройки', icon: 'Settings' },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="border-b border-white/6 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <button onClick={onGoHome} className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Icon name="Zap" size={17} className="text-white" />
            </div>
            <span className="font-heading font-bold tracking-widest text-xl uppercase text-white">Syntex</span>
          </button>
          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase">Admin</span>
            )}
            <button onClick={() => { logout(); onGoHome(); }} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors">
              <Icon name="LogOut" size={16} /> Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="container py-10">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          <aside className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === t.key
                    ? 'bg-violet-500/15 text-violet-300 border border-violet-500/25'
                    : 'text-slate-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon name={t.icon} size={16} />
                {t.label}
              </button>
            ))}
          </aside>

          <main>
            {activeTab === 'overview' && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/8 bg-[#0f0f1a] p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-heading font-bold text-2xl shadow-lg shadow-violet-500/30">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-heading font-bold uppercase text-white">{user.username}</h2>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Тариф', value: user.license?.plan ?? '—' },
                      { label: 'Истекает', value: user.license?.expiresAt ?? '∞' },
                      { label: 'HWID', value: user.hwid || '—', mono: true },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-white/4 border border-white/6 p-4">
                        <p className="text-xs text-slate-600 mb-1">{s.label}</p>
                        <p className={`font-semibold text-white truncate ${s.mono ? 'font-mono text-xs' : ''}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#0f0f1a] p-6">
                  <h3 className="font-heading uppercase text-xs text-slate-600 mb-4 tracking-widest">Статус лицензии</h3>
                  <div className={`flex items-center gap-3 rounded-xl p-4 ${user.license ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <Icon name={user.license ? 'ShieldCheck' : 'ShieldX'} size={22} className={user.license ? 'text-violet-400' : 'text-red-400'} />
                    <div>
                      <p className="font-medium text-sm text-white">{user.license ? 'Лицензия активна' : 'Нет активной лицензии'}</p>
                      <p className="text-xs text-slate-500">{user.license ? `Тариф: ${user.license.plan}` : 'Купи доступ'}</p>
                    </div>
                    {!user.license && (
                      <Button size="sm" className="ml-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl">Купить</Button>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading uppercase text-sm text-white mb-1">Сброс HWID</h3>
                      <p className="text-xs text-slate-500">Перепривяжи лицензию к новому железу</p>
                    </div>
                    <Button size="sm" className="bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 rounded-xl">
                      100 ₽ — Сбросить
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roulette' && <Roulette />}

            {activeTab === 'settings' && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/8 bg-[#0f0f1a] p-6 space-y-4">
                  <h3 className="font-heading uppercase text-xs text-slate-600 tracking-widest">Смена пароля</h3>
                  {['Текущий пароль', 'Новый пароль', 'Повторите пароль'].map((lbl) => (
                    <div key={lbl}>
                      <label className="block text-xs text-slate-500 mb-1.5">{lbl}</label>
                      <input type="password" placeholder="••••••••"
                        className="w-full h-11 rounded-xl border border-white/8 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all" />
                    </div>
                  ))}
                  <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl h-11 font-semibold">Сохранить</Button>
                </div>
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                  <h3 className="font-heading uppercase text-sm text-red-400 mb-2">Удаление аккаунта</h3>
                  <p className="text-xs text-slate-500 mb-4">Необратимо. Все данные будут потеряны.</p>
                  <Button variant="destructive" size="sm" className="rounded-xl">Удалить аккаунт</Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
