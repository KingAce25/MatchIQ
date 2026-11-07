"use client";

import { useEffect, useState, Suspense, type ReactNode } from "react";
import Link from "next/link";
import GlobalSearch from "@/components/search/global-search";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  CalendarDays,
  ArrowLeftRight,
  ChevronDown,
  CircleUserRound,
  Home,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  Sun,
  Trophy,
  Users,
  X,
  BrainCircuit,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Fixtures", href: "/fixtures", icon: CalendarDays },
  { name: "Predictions", href: "/predictions", icon: BrainCircuit },
  { name: "Leagues", href: "/leagues", icon: Trophy },
  { name: "Teams", href: "/teams", icon: Shield },
  { name: "Statistics", href: "/statistics", icon: BarChart3 },
  { name: "Compare Teams", href: "/compare", icon: ArrowLeftRight },
  { name: "Players", href: "/players", icon: Users },
];

function AppShellContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const dark = theme === "dark";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const panel = dark
    ? "bg-[#111C2E] border-[#26364D]"
    : "bg-white border-slate-200";

  const text = dark ? "text-slate-100" : "text-slate-900";
  const muted = dark ? "text-slate-400" : "text-slate-500";

  return (
    <div
      className={`min-h-screen ${
        dark ? "bg-[#0B1220]" : "bg-[#F5F7FB]"
      } ${text}`}
    >
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden w-62.5 border-r p-5 lg:flex lg:flex-col ${panel}`}
      >
        <Link href="/" className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
            <Activity className="h-6 w-6 text-[#052E23]" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            Match<span className="text-emerald-500">IQ</span>
          </span>
        </Link>

        <p
          className={`mb-3 px-3 text-xs font-semibold uppercase tracking-widest ${muted}`}
        >
          Workspace
        </p>

        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-500/10 text-emerald-500"
                    : dark
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                {item.name}
                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className={`mb-4 rounded-2xl border p-4 ${panel}`}>
            <div className="mb-2 flex items-center gap-2 text-emerald-500">
              <BrainCircuit size={19} />
              <span className="text-sm font-semibold">MatchIQ Insights</span>
            </div>
            <p className={`text-xs leading-5 ${muted}`}>
              Understand football through statistics and intelligent analysis.
            </p>
          </div>

          <Link
            href="/account"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${muted} hover:text-emerald-500`}
          >
            <Settings size={19} />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-62.5">
        {/* Top header */}
        <header
          className={`sticky top-0 z-20 flex h-18 items-center justify-between border-b px-4 backdrop-blur-xl sm:px-7 ${panel} ${
            dark ? "bg-[#111C2E]/90" : "bg-white/90"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenu(!mobileMenu);
                setMobileSearch(false);
              }}
              className="rounded-lg p-2 lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="lg:hidden">
              <span className="text-xl font-extrabold">
                Match<span className="text-emerald-500">IQ</span>
              </span>
            </div>

            {/* Desktop / tablet search */}
            <div className="hidden w-72 sm:block lg:w-96">
              <GlobalSearch />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile search toggle */}
            <button
              onClick={() => {
                setMobileSearch(true);
                setMobileMenu(false);
              }}
              className={`rounded-xl border p-2.5 transition hover:text-emerald-500 sm:hidden ${panel}`}
              aria-label="Open search"
              title="Search"
            >
              <Search size={19} />
            </button>

            <button
              onClick={() => setTheme(dark ? "light" : "dark")}
              className={`rounded-xl border p-2.5 transition hover:text-emerald-500 ${panel}`}
              aria-label="Switch theme"
              title="Switch theme"
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              className={`hidden items-center gap-2 rounded-xl border px-3 py-2 sm:flex ${panel}`}
            >
              <CircleUserRound size={19} />
              <span className="text-sm">Guest</span>
              <ChevronDown size={15} className={muted} />
            </button>
          </div>

          {/* Mobile search bar (replaces the header content while open) */}
          {mobileSearch && (
            <div
              className={`absolute inset-0 flex items-center gap-2 px-4 sm:hidden ${
                dark ? "bg-[#111C2E]" : "bg-white"
              }`}
            >
              <div className="min-w-0 flex-1">
                <GlobalSearch
                  autoFocus
                  onNavigate={() => setMobileSearch(false)}
                />
              </div>

              <button
                onClick={() => setMobileSearch(false)}
                className={`shrink-0 rounded-xl border p-2.5 transition hover:text-emerald-500 ${panel}`}
                aria-label="Close search"
              >
                <X size={19} />
              </button>
            </div>
          )}
        </header>

        {/* Mobile navigation drawer */}
        {mobileMenu && (
          <div
            className={`fixed inset-0 top-18 z-40 p-4 lg:hidden ${
              dark ? "bg-[#0B1220]" : "bg-[#F5F7FB]"
            }`}
          >
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className={`flex items-center gap-3 rounded-xl p-4 ${
                      isActive(item.href)
                        ? "bg-emerald-500/10 text-emerald-500"
                        : muted
                    }`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        <main className="mx-auto max-w-[1600px] p-4 pb-24 sm:p-7 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        className={`fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t px-2 py-2 lg:hidden ${panel}`}
      >
        {navigation.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              href={item.href}
              key={item.name}
              className={`flex flex-col items-center gap-1 py-1 text-[11px] ${
                active ? "text-emerald-500" : muted
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1220]" />}>
      <AppShellContent>{children}</AppShellContent>
    </Suspense>
  );
}
