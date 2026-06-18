import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';
import Account from '@/pages/Account';
import { toast } from 'sonner';

const navLinks = [
  { label: 'Главная', href: '#home' },
  { label: 'Лаунчер', href: '#launcher' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Кабинет', href: '#account' },
  { label: 'API', href: '#api' },
];

const plans = [
  { period: '30 дней', price: '150', popular: false, note: 'Попробовать', color: 'from-slate-700 to-slate-800' },
  { period: '90 дней', price: '250', popular: true, note: 'Оптимально', color: 'from-violet-700 to-indigo-700' },
  { period: '365 дней', price: '350', popular: false, note: 'Выгода 70%', color: 'from-slate-700 to-slate-800' },
  { period: 'Навсегда', price: '500', popular: false, note: 'Разовая', color: 'from-amber-700 to-orange-700' },
];

const planPerks = [
  'Все модули клиента',
  'Авто-обновления через лаунчер',
  'Синхронизация настроек',
  'Приоритетная поддержка',
];

const features = [
  { icon: 'RefreshCw', title: 'Авто-обновления', desc: 'Лаунчер и модули обновляются автоматически через REST API.' },
  { icon: 'ShieldCheck', title: 'HWID-защита', desc: 'Лицензия привязана к железу. Защита от кряков и переноса.' },
  { icon: 'KeyRound', title: 'Единая авторизация', desc: 'JWT-токены связывают сайт, лаунчер и клиент в одну систему.' },
  { icon: 'Activity', title: 'Логирование', desc: 'Действия фиксируются с IP и временной меткой.' },
  { icon: 'Gauge', title: 'Rate Limiting', desc: 'API защищён от перегрузок и DDoS ограничением запросов.' },
  { icon: 'Lock', title: 'HTTPS везде', desc: 'Все коммуникации шифруются на каждом уровне.' },
];

const PARTICLE_COUNT = 28;

function Particles() {
  const particles = useRef(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.4,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary animate-bounce"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(target / 60);
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(t); } else setVal(start);
      }, 24);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{val.toLocaleString('ru')}{suffix}</div>;
}

const Index = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<null | 'login' | 'register'>(null);
  const [showAccount, setShowAccount] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  if (showAccount && user) {
    return <Account onGoHome={() => setShowAccount(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden selection:bg-primary/30">
      {authModal && <AuthModal defaultTab={authModal} onClose={() => setAuthModal(null)} />}

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl">
        <div className="container flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="size-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
              <Icon name="Zap" size={18} className="text-white" />
            </div>
            <span className="font-heading font-bold tracking-widest text-xl uppercase text-white">Syntex</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href === '#account' ? undefined : l.href}
                onClick={l.href === '#account' ? () => user ? setShowAccount(true) : setAuthModal('login') : undefined}
                className="text-[13px] font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button
                onClick={() => setShowAccount(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 transition-all text-sm text-white"
              >
                <div className="size-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                  {user.username[0].toUpperCase()}
                </div>
                {user.username}
              </button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white" onClick={() => setAuthModal('login')}>Войти</Button>
                <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-500/25 font-medium" onClick={() => setAuthModal('register')}>
                  Регистрация
                </Button>
              </>
            )}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white w-full rounded-xl" onClick={() => setAuthModal('login')}>Войти</Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-40 pb-32 overflow-hidden">
        <Particles />
        {/* big glow blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,hsl(258,90%,66%,0.22),transparent_65%)] pointer-events-none" />
        <div className="absolute top-40 -left-32 size-[500px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
        <div className="absolute top-20 -right-32 size-[500px] rounded-full bg-violet-600/10 blur-[140px] pointer-events-none" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-mono text-violet-300 mb-8">
                <span className="size-1.5 rounded-full bg-violet-400 animate-pulse" />
                Сезон 2026 · Fabric 1.21 · Онлайн: 843
              </div>
              <h1 className="font-heading text-[3.5rem] md:text-[4.5rem] font-bold leading-[0.95] tracking-tight mb-6 uppercase">
                <span className="text-white">Приватный</span><br />
                <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>Minecraft</span><br />
                <span className="text-white">Клиент</span>
              </h1>
              <p className="text-[15px] text-slate-400 max-w-md mb-10 leading-relaxed">
                Сайт, лаунчер и клиент — единая система. Купил доступ — все модули открыты, настройки синхронизируются сами.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <Button
                  size="lg"
                  onClick={() => toast.info('Лаунчер скоро выйдет — следи за обновлениями!')}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white h-13 px-8 rounded-xl shadow-xl shadow-violet-500/30 font-semibold text-base transition-all hover:shadow-violet-500/50 hover:-translate-y-0.5"
                >
                  <Icon name="Download" size={19} className="mr-2" /> Скачать лаунчер
                </Button>
                <a href="#pricing">
                  <Button size="lg" variant="outline" className="h-13 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl text-base">
                    Тарифы →
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-8">
                {[
                  { val: 12400, suffix: '+', label: 'игроков' },
                  { val: 99, suffix: '.9%', label: 'аптайм' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-heading text-2xl font-bold text-white">
                      <CountUp target={s.val} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>
                ))}
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-400 font-mono">API online</span>
                </div>
              </div>
            </div>

            {/* launcher mock */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl border border-white/10 bg-[#0f0f1a]/95 backdrop-blur overflow-hidden shadow-2xl">
                <div className="flex items-center gap-1.5 px-4 h-10 border-b border-white/8 bg-white/3 select-none">
                  <span className="size-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                  <span className="size-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                  <span className="size-3 rounded-full bg-violet-500/80 hover:bg-violet-500 transition-colors cursor-pointer" />
                  <span className="ml-3 font-mono text-[11px] text-white/30">syntex-launcher.exe</span>
                  <span className="ml-auto font-mono text-[10px] text-violet-400">v2.4.1</span>
                </div>
                <div className="flex">
                  <div className="w-12 bg-white/2 border-r border-white/6 flex flex-col items-center py-4 gap-3">
                    {['Home', 'Package', 'Settings'].map((ic, i) => (
                      <div key={ic} className={`size-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-violet-600/25 text-violet-300' : 'text-white/25'}`}>
                        <Icon name={ic} size={16} />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[11px] text-white/40">Авторизован</p>
                        <p className="text-sm font-semibold text-white">IIpoteka</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-violet-500/15 text-violet-300 border border-violet-500/25">НАВСЕГДА</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {[
                        { name: 'AutoSell', on: true },
                        { name: 'KillAura', on: false },
                        { name: 'ESP', on: true },
                        { name: 'Scaffold', on: true },
                      ].map((m) => (
                        <div key={m.name} className="flex items-center justify-between rounded-lg bg-white/4 border border-white/6 px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className={`size-1.5 rounded-full ${m.on ? 'bg-violet-400' : 'bg-white/15'}`} />
                            <span className="text-[13px] font-medium text-white/80">{m.name}</span>
                          </div>
                          <span className={`relative inline-flex h-4 w-7 items-center rounded-full ${m.on ? 'bg-violet-600' : 'bg-white/10'}`}>
                            <span className={`inline-block size-3 rounded-full bg-white transition-transform ${m.on ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                          </span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                      <Icon name="Play" size={14} /> Запустить Minecraft
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-2 border-t border-white/6 bg-white/2">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-white/30">connected</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/30">Fabric 1.21 · 38ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCHER */}
      <section id="launcher" className="py-24 border-t border-white/6">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-3">Лаунчер</p>
              <h2 className="font-heading text-4xl font-bold tracking-tight uppercase mb-5 text-white">
                Скачай и запускай<br />
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">за 2 минуты</span>
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Лаунчер сам ставит Fabric, инжектит мод и синхронизирует настройки с аккаунтом. Просто нажми «Запустить».
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: 'MonitorDown', text: 'Windows 10 / 11 (x64)' },
                  { icon: 'Zap', text: 'Автоустановка Fabric 1.21' },
                  { icon: 'RefreshCw', text: 'Авто-обновление модулей' },
                  { icon: 'ShieldCheck', text: 'Проверка HWID и лицензии' },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                      <Icon name={f.icon} size={15} className="text-violet-400" />
                    </div>
                    <span className="text-sm text-slate-300">{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={() => toast.info('Лаунчер в разработке — скоро!')}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white h-12 px-7 rounded-xl shadow-lg shadow-violet-500/25 font-semibold"
                >
                  <Icon name="Download" size={18} className="mr-2" /> Скачать .exe
                  <span className="ml-2 text-xs opacity-60">v2.4.1</span>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-6 border-white/10 bg-white/4 hover:bg-white/8 text-white rounded-xl">
                  <Icon name="FileText" size={16} className="mr-2" /> Changelog
                </Button>
              </div>
              <p className="text-xs text-slate-600 mt-3">~18 МБ · Java 17+</p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-[#0f0f1a] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <Icon name="GitBranch" size={14} className="text-violet-400" />
                  <span className="font-heading text-sm uppercase tracking-wide text-white">Changelog</span>
                </div>
                <span className="font-mono text-xs text-violet-400 border border-violet-500/30 rounded px-2 py-0.5">v2.4.1</span>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { version: 'v2.4.1', date: '15 июн 2026', tag: 'latest', items: ['Исправлена синхронизация ESP', 'Оптимизирован AutoSell под 1.21.4', 'RAM −12%'] },
                  { version: 'v2.4.0', date: '2 июн 2026', tag: 'stable', items: ['Добавлен Scaffold', 'Новый UI лаунчера', 'Fabric 1.21'] },
                  { version: 'v2.3.8', date: '18 мая 2026', tag: null, items: ['Патч обхода анти-чита', 'Фикс Fly на Paper'] },
                ].map((rel) => (
                  <div key={rel.version} className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm font-semibold text-white">{rel.version}</span>
                      {rel.tag && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${rel.tag === 'latest' ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                          {rel.tag}
                        </span>
                      )}
                      <span className="text-xs text-white/30 ml-auto">{rel.date}</span>
                    </div>
                    <ul className="space-y-1">
                      {rel.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-xs text-slate-500">
                          <span className="text-violet-500 mt-0.5">—</span>{it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 border-t border-white/6">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-3">Тарифы</p>
            <h2 className="font-heading text-4xl font-bold tracking-tight mb-4 uppercase text-white">Выбери доступ</h2>
            <p className="text-slate-500">Любой тариф открывает весь функционал. Чем дольше — тем выгоднее.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {plans.map((p, i) => (
              <div
                key={p.period}
                onMouseEnter={() => setHoveredPlan(i)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                  p.popular
                    ? 'border-violet-500/60 shadow-2xl shadow-violet-500/20 scale-[1.02]'
                    : hoveredPlan === i
                    ? 'border-violet-500/30 -translate-y-1 shadow-xl shadow-violet-500/10'
                    : 'border-white/8'
                }`}
              >
                {p.popular && (
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.popular ? 'from-violet-900/60 to-indigo-900/60' : 'from-white/3 to-transparent'}`} />
                <div className="relative p-6">
                  {p.popular && (
                    <div className="absolute top-3 right-3 text-[10px] font-mono bg-violet-500 text-white px-2 py-0.5 rounded-full">ХИТ</div>
                  )}
                  <p className="font-heading text-lg font-bold uppercase text-white mb-1">{p.period}</p>
                  <p className="text-xs text-slate-500 mb-5">{p.note}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="font-heading text-5xl font-bold text-white">{p.price}</span>
                    <span className="text-slate-500 mb-2 text-lg">₽</span>
                  </div>
                  <Button
                    className={`w-full rounded-xl h-11 font-semibold transition-all ${
                      p.popular
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/30'
                        : 'bg-white/8 text-white hover:bg-white/14 border border-white/10'
                    }`}
                    onClick={() => !user && setAuthModal('register')}
                  >
                    Купить доступ
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/3 p-7">
              <p className="font-heading text-xs uppercase tracking-widest text-slate-500 mb-5">Включено в любой тариф</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {planPerks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2.5">
                    <div className="size-5 rounded-full bg-violet-500/15 flex items-center justify-center shrink-0">
                      <Icon name="Check" size={12} className="text-violet-400" />
                    </div>
                    <span className="text-sm text-slate-300">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/8 to-transparent p-7 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Cpu" size={17} className="text-amber-400" />
                <p className="font-heading text-sm uppercase tracking-wide text-white">Сброс HWID</p>
              </div>
              <p className="text-sm text-slate-500 mb-5 flex-1">Сменил железо? Перепривяжи лицензию.</p>
              <div className="flex items-end justify-between">
                <span className="font-heading text-3xl font-bold text-white">100 ₽</span>
                <Button size="sm" className="bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 rounded-xl"
                  onClick={() => !user && setAuthModal('login')}>
                  Сбросить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="api" className="py-24 border-t border-white/6">
        <div className="container">
          <div className="mb-14">
            <p className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-3">Технологии</p>
            <h2 className="font-heading text-4xl font-bold tracking-tight uppercase text-white">Под капотом</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-violet-500/25 p-7 transition-all duration-300">
                <div className="size-11 rounded-xl bg-violet-500/10 group-hover:bg-violet-500/20 flex items-center justify-center mb-5 transition-colors">
                  <Icon name={f.icon} size={20} className="text-violet-400" />
                </div>
                <h3 className="font-heading text-base font-semibold uppercase mb-2 text-white">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/6">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden border border-violet-500/20 bg-[#0d0d1a] p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(258,80%,30%,0.3),transparent_70%)]" />
            <Particles />
            <div className="relative">
              <h2 className="font-heading text-5xl font-bold tracking-tight mb-4 uppercase text-white">Залетай</h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8">Регистрация, лаунчер, лицензия — пара минут.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white h-13 px-10 rounded-xl shadow-xl shadow-violet-500/30 font-semibold text-base"
                  onClick={() => setAuthModal('register')}
                >
                  Создать аккаунт
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/6 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Icon name="Zap" size={15} className="text-white" />
            </div>
            <span className="font-heading font-bold uppercase tracking-widest text-white">Syntex</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 Syntex Client. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
