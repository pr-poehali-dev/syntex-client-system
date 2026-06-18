import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Главная', href: '#home' },
  { label: 'Магазин', href: '#shop' },
  { label: 'Кабинет', href: '#account' },
  { label: 'Поддержка', href: '#support' },
  { label: 'API', href: '#api' },
];

const modules = [
  { name: 'AutoSell', tag: 'AUTOMATION', desc: 'Автопродажа предметов по настраиваемым правилам. Команда .autosell toggle.', price: 'Free', premium: false, icon: 'Coins' },
  { name: 'KillAura', tag: 'COMBAT', desc: 'Автоматическая атака по целям в радиусе. Тонкая настройка приоритетов.', price: '299₽', premium: true, icon: 'Swords' },
  { name: 'ESP', tag: 'RENDER', desc: 'Подсветка игроков, мобов и предметов сквозь стены. Цветовые фильтры.', price: '199₽', premium: true, icon: 'Eye' },
  { name: 'Fly', tag: 'MOVEMENT', desc: 'Контролируемый полёт с регулировкой скорости и обходом анти-чита.', price: '349₽', premium: true, icon: 'Wind' },
];

const features = [
  { icon: 'RefreshCw', title: 'Авто-обновления', desc: 'Лаунчер и модули обновляются через REST API без участия пользователя.' },
  { icon: 'ShieldCheck', title: 'HWID-защита', desc: 'Лицензия привязана к железу. Защита от кряков и переноса.' },
  { icon: 'KeyRound', title: 'Единая авторизация', desc: 'JWT-токены связывают сайт, лаунчер и клиент в одну систему.' },
  { icon: 'Activity', title: 'Логирование', desc: 'Все действия пользователей фиксируются с IP и временной меткой.' },
  { icon: 'Gauge', title: 'Rate Limiting', desc: 'API защищён от перегрузок и DDoS ограничением запросов.' },
  { icon: 'Lock', title: 'HTTPS везде', desc: 'Все коммуникации шифруются. Безопасность на каждом уровне.' },
];

const stats = [
  { value: '12K+', label: 'Активных лицензий' },
  { value: '99.9%', label: 'Аптайм API' },
  { value: '24', label: 'Модуля в магазине' },
  { value: '<40ms', label: 'Отклик сервера' },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-primary flex items-center justify-center">
              <Icon name="Hexagon" size={18} className="text-primary-foreground" />
            </div>
            <span className="font-mono font-bold tracking-tight text-lg">SYNTEX</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Войти</Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
              <Icon name="Download" size={16} className="mr-1.5" /> Скачать
            </Button>
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
            <Button size="sm" className="bg-primary text-primary-foreground w-full">Скачать</Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-40 pb-32">
        <div className="absolute inset-0 grid-bg opacity-40 animate-grid-pulse" />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs font-mono text-muted-foreground mb-8 animate-fade-in">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              v2.4.1 — Fabric 1.21 ready
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
              Премиум-утилита<br />
              <span className="text-primary glow-text">нового поколения</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Сайт, лаунчер и Minecraft-клиент в единой экосистеме. Синхронизация настроек, лицензии и обновлений через защищённый API.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium glow-border h-12 px-8">
                <Icon name="Download" size={18} className="mr-2" /> Скачать лаунчер
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 border-border bg-card/40 hover:bg-card">
                <Icon name="BookOpen" size={18} className="mr-2" /> Документация API
              </Button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-24 max-w-4xl mx-auto bg-border rounded-xl overflow-hidden border border-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-card p-6 text-center">
                <div className="text-3xl font-bold font-mono text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-24 border-t border-border/60">
        <div className="container">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">// Магазин</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Модули клиента</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">Настройки синхронизируются между устройствами автоматически через API.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m) => (
              <div key={m.name} className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-5">
                  <div className="size-11 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon name={m.icon} size={22} className="text-primary" />
                  </div>
                  {m.premium ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-primary/40 text-primary">PREMIUM</span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border text-muted-foreground">FREE</span>
                  )}
                </div>
                <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-1">{m.tag}</p>
                <h3 className="text-lg font-semibold mb-2">{m.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{m.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-foreground">{m.price}</span>
                  <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 -mr-2">
                    Подключить <Icon name="ArrowRight" size={15} className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="api" className="py-24 border-t border-border/60">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">// Безопасность и синхронизация</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Технологии под капотом</h2>
            <p className="text-muted-foreground">Единая архитектура: сайт → лаунчер → клиент. Всё связано защищённым REST API.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {features.map((f) => (
              <div key={f.title} className="bg-card p-8 hover:bg-secondary/40 transition-colors">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Icon name={f.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="support" className="py-24 border-t border-border/60">
        <div className="container">
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Готовы начать?</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">Создайте аккаунт, скачайте лаунчер и активируйте лицензию за пару минут.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 glow-border">Создать аккаунт</Button>
                <Button size="lg" variant="outline" className="h-12 px-8 border-border bg-background/40">Связаться с поддержкой</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-primary flex items-center justify-center">
              <Icon name="Hexagon" size={15} className="text-primary-foreground" />
            </div>
            <span className="font-mono font-bold text-sm">SYNTEX CLIENT</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">© 2026 Syntex. Все коммуникации защищены HTTPS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
