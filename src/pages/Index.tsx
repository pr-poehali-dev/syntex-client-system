import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';
import Account from '@/pages/Account';

const navLinks = [
  { label: 'Главная', href: '#home' },
  { label: 'Лаунчер', href: '#launcher' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Кабинет', href: '#account' },
  { label: 'Поддержка', href: '#support' },
  { label: 'API', href: '#api' },
];

const plans = [
  { period: '30 дней', price: '150', popular: false, note: 'Попробовать клиент' },
  { period: '90 дней', price: '250', popular: true, note: 'Оптимально' },
  { period: '365 дней', price: '350', popular: false, note: 'Выгода 70%' },
  { period: 'Навсегда', price: '500', popular: false, note: 'Разовая оплата' },
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


const Index = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<null | 'login' | 'register'>(null);
  const [showAccount, setShowAccount] = useState(false);

  if (showAccount && user) {
    return <Account onGoHome={() => setShowAccount(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden selection:bg-primary/30">
      {authModal && (
        <AuthModal defaultTab={authModal} onClose={() => setAuthModal(null)} />
      )}

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="Box" size={18} className="text-white" />
            </div>
            <span className="font-heading font-bold tracking-wide text-xl uppercase">Syntex</span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href === '#account' ? undefined : l.href}
                onClick={l.href === '#account' ? () => user ? setShowAccount(true) : setAuthModal('login') : undefined}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button
                onClick={() => setShowAccount(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary/60 transition-colors text-sm"
              >
                <div className="size-5 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[10px] font-bold">
                  {user.username[0].toUpperCase()}
                </div>
                {user.username}
              </button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => setAuthModal('login')}>
                  Войти
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg" onClick={() => setAuthModal('register')}>
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
          <div className="md:hidden border-t border-border/60 bg-background px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <Button size="sm" className="bg-primary text-primary-foreground w-full rounded-lg" onClick={() => setAuthModal('login')}>
              Войти
            </Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-36 pb-28">
        <div className="absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,hsl(var(--primary)/0.18),transparent_70%)]" />
        <div className="absolute top-32 -left-20 size-[400px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-20 -right-20 size-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs font-mono text-muted-foreground mb-7">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Сезон 2026 · Fabric 1.21
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight leading-[1.02] mb-6 uppercase">
                Лучший приватный<br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Minecraft клиент</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-md mb-9 leading-relaxed">
                Сайт, лаунчер и клиент работают как одно целое. Покупаешь доступ — и все модули открыты, настройки летят между устройствами сами.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-12 px-7 rounded-lg">
                  <Icon name="Download" size={18} className="mr-2" /> Скачать лаунчер
                </Button>
                <a href="#pricing">
                  <Button size="lg" variant="outline" className="h-12 px-7 border-border bg-card/40 hover:bg-card rounded-lg">
                    Смотреть тарифы
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-7 mt-10">
                <div>
                  <div className="font-heading text-2xl font-bold">12 400+</div>
                  <div className="text-xs text-muted-foreground">игроков с нами</div>
                </div>
                <div className="h-9 w-px bg-border" />
                <div>
                  <div className="font-heading text-2xl font-bold">99.9%</div>
                  <div className="text-xs text-muted-foreground">аптайм серверов</div>
                </div>
                <div className="h-9 w-px bg-border" />
                <div>
                  <div className="font-heading text-2xl font-bold">24/7</div>
                  <div className="text-xs text-muted-foreground">поддержка</div>
                </div>
              </div>
            </div>

            {/* launcher mock */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card/90 backdrop-blur overflow-hidden shadow-2xl shadow-primary/10">
                {/* title bar */}
                <div className="flex items-center gap-2 px-4 h-10 border-b border-border bg-secondary/50 select-none">
                  <span className="size-2.5 rounded-full bg-red-500/70" />
                  <span className="size-2.5 rounded-full bg-yellow-500/70" />
                  <span className="size-2.5 rounded-full bg-primary/70" />
                  <span className="ml-3 font-mono text-xs text-muted-foreground">syntex-launcher.exe</span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">v2.4.1</span>
                </div>
                {/* sidebar + content */}
                <div className="flex">
                  {/* left sidebar */}
                  <div className="w-14 bg-secondary/30 border-r border-border/60 flex flex-col items-center py-4 gap-3">
                    {['Home', 'Package', 'Settings', 'HelpCircle'].map((ic, i) => (
                      <div key={ic} className={`size-8 rounded-lg flex items-center justify-center transition-colors ${i === 0 ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-secondary/60'}`}>
                        <Icon name={ic} size={16} />
                      </div>
                    ))}
                  </div>
                  {/* main area */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Вошёл как</p>
                        <p className="font-semibold text-sm">IIpoteka</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-primary/15 text-primary border border-primary/30">НАВСЕГДА</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {[
                        { name: 'AutoSell', on: true },
                        { name: 'KillAura', on: false },
                        { name: 'ESP', on: true },
                        { name: 'Fly', on: false },
                      ].map((m) => (
                        <div key={m.name} className="flex items-center justify-between rounded-lg bg-secondary/40 border border-border/50 px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className={`size-1.5 rounded-full ${m.on ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                            <span className="text-sm font-medium">{m.name}</span>
                          </div>
                          <span className={`relative inline-flex h-4 w-7 items-center rounded-full ${m.on ? 'bg-primary' : 'bg-muted'}`}>
                            <span className={`inline-block size-3 rounded-full bg-white transition-transform ${m.on ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-lg text-sm font-medium">
                      <Icon name="Play" size={14} className="mr-1.5" /> Запустить Minecraft
                    </Button>
                  </div>
                </div>
                {/* status bar */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-border/60 bg-secondary/20">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    API connected
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">Fabric 1.21 · 38ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCHER DOWNLOAD */}
      <section id="launcher" className="py-24 border-t border-border/60">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Лаунчер</p>
              <h2 className="font-heading text-4xl font-bold tracking-tight uppercase mb-4">
                Скачай и запускай<br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">за 2 минуты</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Лаунчер автоматически скачивает нужную версию Fabric, инжектит мод и синхронизирует настройки с твоим аккаунтом. Просто нажми «Запустить».
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: 'MonitorDown', text: 'Поддерживает Windows 10 / 11' },
                  { icon: 'Zap', text: 'Автоустановка Fabric 1.21' },
                  { icon: 'RefreshCw', text: 'Авто-обновление модулей при запуске' },
                  { icon: 'ShieldCheck', text: 'Проверка HWID и лицензии' },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name={f.icon} size={15} className="text-primary" />
                    </div>
                    <span className="text-sm">{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7 rounded-lg font-medium">
                  <Icon name="Download" size={18} className="mr-2" /> Скачать .exe
                  <span className="ml-2 text-xs opacity-70">v2.4.1</span>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-7 border-border bg-card/40 hover:bg-card rounded-lg">
                  <Icon name="FileText" size={18} className="mr-2" /> Changelog
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Размер: ~18 МБ · Требуется Java 17+</p>
            </div>

            {/* changelog card */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-secondary/30">
                <div className="flex items-center gap-2">
                  <Icon name="GitBranch" size={15} className="text-primary" />
                  <span className="font-heading text-sm uppercase tracking-wide">Changelog</span>
                </div>
                <span className="font-mono text-xs text-primary border border-primary/30 rounded px-2 py-0.5">v2.4.1</span>
              </div>
              <div className="divide-y divide-border/40">
                {[
                  { version: 'v2.4.1', date: '15 июн 2026', tag: 'latest', items: ['Исправлена синхронизация настроек ESP', 'Оптимизирован AutoSell под 1.21.4', 'Снижено потребление RAM на 12%'] },
                  { version: 'v2.4.0', date: '2 июн 2026', tag: 'stable', items: ['Добавлен модуль Scaffold', 'Новый UI лаунчера', 'Поддержка Fabric 1.21'] },
                  { version: 'v2.3.8', date: '18 мая 2026', tag: null, items: ['Патч обхода анти-чита', 'Фикс Fly на серверах Paper'] },
                ].map((rel) => (
                  <div key={rel.version} className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm font-semibold">{rel.version}</span>
                      {rel.tag && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${rel.tag === 'latest' ? 'bg-primary/15 text-primary border border-primary/30' : 'bg-secondary text-muted-foreground border border-border'}`}>
                          {rel.tag}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">{rel.date}</span>
                    </div>
                    <ul className="space-y-1">
                      {rel.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5">—</span>
                          {it}
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
      <section id="pricing" className="py-24 border-t border-border/60">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Тарифы</p>
            <h2 className="font-heading text-4xl font-bold tracking-tight mb-4 uppercase">Выбери свой доступ</h2>
            <p className="text-muted-foreground">Любой тариф открывает весь функционал клиента. Чем дольше — тем выгоднее.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {plans.map((p) => (
              <div
                key={p.period}
                className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  p.popular ? 'border-primary bg-card shadow-xl shadow-primary/15' : 'border-border bg-card/60 hover:border-primary/40'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-primary text-primary-foreground">
                    Хит продаж
                  </span>
                )}
                <p className="font-heading text-lg font-semibold uppercase mb-1">{p.period}</p>
                <p className="text-xs text-muted-foreground mb-5">{p.note}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="font-heading text-4xl font-bold">{p.price}</span>
                  <span className="text-muted-foreground mb-1.5">₽</span>
                </div>
                <Button
                  className={`w-full rounded-lg h-11 font-medium ${p.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-foreground hover:bg-secondary/70'}`}
                  onClick={() => !user && setAuthModal('register')}
                >
                  Купить доступ
                </Button>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card/40 p-7">
              <p className="font-heading text-sm uppercase tracking-wide text-muted-foreground mb-4">В любой тариф входит</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {planPerks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2.5">
                    <Icon name="Check" size={18} className="text-primary shrink-0" />
                    <span className="text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-7 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Cpu" size={18} className="text-accent" />
                <p className="font-heading text-sm uppercase tracking-wide">Сброс HWID</p>
              </div>
              <p className="text-sm text-muted-foreground mb-5 flex-1">Сменил компьютер или комплектующие? Отвяжи лицензию от старого железа.</p>
              <div className="flex items-end justify-between">
                <span className="font-heading text-3xl font-bold">100 ₽</span>
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg"
                  onClick={() => !user && setAuthModal('login')}>
                  Сбросить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="api" className="py-24 border-t border-border/60">
        <div className="container">
          <div className="max-w-xl mb-14">
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Технологии</p>
            <h2 className="font-heading text-4xl font-bold tracking-tight uppercase">Безопасно и синхронно</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card/50 p-7 hover:border-primary/40 transition-colors">
                <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon name={f.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold uppercase mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="support" className="py-24 border-t border-border/60">
        <div className="container">
          <div className="relative rounded-3xl border border-border bg-card overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]" />
            <div className="relative">
              <h2 className="font-heading text-4xl font-bold tracking-tight mb-4 uppercase">Залетай в игру</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">Регистрация, лаунчер и активация лицензии — пара минут, и ты в деле.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-lg font-medium"
                  onClick={() => setAuthModal('register')}>
                  Создать аккаунт
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 border-border bg-background/40 rounded-lg">
                  Написать в поддержку
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="Box" size={16} className="text-white" />
            </div>
            <span className="font-heading font-bold uppercase tracking-wide">Syntex Client</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Syntex. Все коммуникации защищены HTTPS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;