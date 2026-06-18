import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const modules = ['AutoSell', 'KillAura', 'ESP', 'Fly', 'Scaffold', 'Speed'];

const Account = ({ onGoHome }: { onGoHome: () => void }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'settings'>('overview');
  const [moduleStates, setModuleStates] = useState<Record<string, boolean>>({
    AutoSell: true, KillAura: false, ESP: true, Fly: false, Scaffold: false, Speed: true,
  });

  if (!user) return null;

  const toggle = (m: string) => setModuleStates((s) => ({ ...s, [m]: !s[m] }));

  const tabs = [
    { key: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
    { key: 'modules', label: 'Модули', icon: 'Package' },
    { key: 'settings', label: 'Настройки', icon: 'Settings' },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* top bar */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <button onClick={onGoHome} className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="Box" size={18} className="text-white" />
            </div>
            <span className="font-heading font-bold tracking-wide text-xl uppercase">Syntex</span>
          </button>
          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-accent/15 text-accent border border-accent/30 uppercase">Admin</span>
            )}
            <button
              onClick={() => { logout(); onGoHome(); }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="LogOut" size={16} /> Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="container py-10">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* sidebar */}
          <aside className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === t.key
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                }`}
              >
                <Icon name={t.icon} size={17} />
                {t.label}
              </button>
            ))}
          </aside>

          {/* content */}
          <main>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-card/60 p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-heading font-bold text-2xl">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-heading font-bold uppercase">{user.username}</h2>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-secondary/50 p-4">
                      <p className="text-xs text-muted-foreground mb-1">Тариф</p>
                      <p className="font-heading font-semibold">{user.license?.plan ?? 'Нет лицензии'}</p>
                    </div>
                    <div className="rounded-xl bg-secondary/50 p-4">
                      <p className="text-xs text-muted-foreground mb-1">Истекает</p>
                      <p className="font-heading font-semibold">{user.license?.expiresAt ?? '∞'}</p>
                    </div>
                    <div className="rounded-xl bg-secondary/50 p-4">
                      <p className="text-xs text-muted-foreground mb-1">HWID</p>
                      <p className="font-mono text-xs truncate">{user.hwid || '—'}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card/60 p-6">
                  <h3 className="font-heading uppercase text-sm text-muted-foreground mb-4">Статус лицензии</h3>
                  <div className={`flex items-center gap-3 rounded-xl p-4 ${user.license ? 'bg-primary/10 border border-primary/25' : 'bg-destructive/10 border border-destructive/25'}`}>
                    <Icon name={user.license ? 'ShieldCheck' : 'ShieldX'} size={22} className={user.license ? 'text-primary' : 'text-destructive'} />
                    <div>
                      <p className="font-medium text-sm">{user.license ? 'Лицензия активна' : 'Нет активной лицензии'}</p>
                      <p className="text-xs text-muted-foreground">{user.license ? `Тариф: ${user.license.plan}` : 'Купи доступ в магазине'}</p>
                    </div>
                    {!user.license && (
                      <Button size="sm" className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">Купить</Button>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading uppercase text-sm mb-1">Сброс HWID</h3>
                      <p className="text-xs text-muted-foreground">Смени привязку лицензии к новому железу</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 rounded-lg">
                      100 ₽ — Сбросить
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'modules' && (
              <div className="rounded-2xl border border-border bg-card/60 p-6">
                <h3 className="font-heading uppercase text-sm text-muted-foreground mb-5">Управление модулями</h3>
                <div className="space-y-2.5">
                  {modules.map((m) => (
                    <div key={m} className="flex items-center justify-between rounded-xl bg-secondary/40 border border-border/50 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Package" size={17} className="text-muted-foreground" />
                        <span className="text-sm font-medium">{m}</span>
                        {moduleStates[m] && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-primary">ON</span>
                        )}
                      </div>
                      <button
                        onClick={() => toggle(m)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${moduleStates[m] ? 'bg-primary' : 'bg-muted'}`}
                      >
                        <span className={`inline-block size-3.5 rounded-full bg-white transition-transform ${moduleStates[m] ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-4">
                  <h3 className="font-heading uppercase text-sm text-muted-foreground">Смена пароля</h3>
                  {['Текущий пароль', 'Новый пароль', 'Повторите пароль'].map((lbl) => (
                    <div key={lbl}>
                      <label className="block text-xs text-muted-foreground mb-1.5">{lbl}</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-11 rounded-lg border border-border bg-secondary/40 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  ))}
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-11 font-medium">Сохранить</Button>
                </div>

                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                  <h3 className="font-heading uppercase text-sm text-destructive mb-2">Удаление аккаунта</h3>
                  <p className="text-xs text-muted-foreground mb-4">Удаление необратимо. Все данные будут потеряны.</p>
                  <Button variant="destructive" size="sm" className="rounded-lg">Удалить аккаунт</Button>
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
