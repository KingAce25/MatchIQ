import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Clock3,
  Flame,
  Shield,
  Trophy,
  Activity,
  Target,
} from "lucide-react";

const matches = [
  {
    league: "Premier League",
    time: "17:30",
    home: "North City",
    away: "United FC",
    status: "Upcoming",
    homeColor: "bg-sky-500",
    awayColor: "bg-red-500",
  },
  {
    league: "La Liga",
    time: "19:00",
    home: "Madrid Stars",
    away: "Barcelona FC",
    status: "Upcoming",
    homeColor: "bg-amber-500",
    awayColor: "bg-blue-500",
  },
  {
    league: "Serie A",
    time: "20:45",
    home: "Milan Red",
    away: "Turin Blue",
    status: "Upcoming",
    homeColor: "bg-red-600",
    awayColor: "bg-sky-700",
  },
];

const competitions = [
  { name: "Premier League", country: "England", icon: "🏴" },
  { name: "La Liga", country: "Spain", icon: "🇪🇸" },
  { name: "Bundesliga", country: "Germany", icon: "🇩🇪" },
  { name: "Serie A", country: "Italy", icon: "🇮🇹" },
  { name: "Champions League", country: "Europe", icon: "🏆" },
];

function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <button className="flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-500">
          {action}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#26364D] dark:bg-[#111C2E] sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`rounded-xl p-2 ${iconColor}`}>
          <Icon size={19} />
        </div>
      </div>

      <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {value}
      </div>

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function MatchCard({ match }: { match: (typeof matches)[number] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-500/50 dark:border-[#26364D] dark:bg-[#111C2E]">
      <div className="mb-5 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {match.league}
        </span>

        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          {match.status}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex flex-col items-center gap-2 text-center">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full ${match.homeColor} text-white`}
          >
            <Shield size={22} />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {match.home}
          </span>
        </div>

        <div className="text-center">
          <div className="text-lg font-extrabold text-slate-400">VS</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
            <Clock3 size={12} />
            {match.time}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full ${match.awayColor} text-white`}
          >
            <Shield size={22} />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {match.away}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-3 dark:border-[#26364D]">
        <button className="flex w-full items-center justify-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-500">
          View match analysis
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#102D35] via-[#123D3B] to-[#0B1727] p-6 text-white sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-35 border-emerald-400/10" />
        <div className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full border-30 border-emerald-400/10" />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            <Activity size={14} />
            Football intelligence platform
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            See the game
            <br />
            <span className="text-emerald-400">differently.</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
            Explore football fixtures, understand team performance and discover
            data-driven match predictions.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/predictions"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-[#052E23] transition hover:bg-emerald-400"
            >
              Explore predictions
              <ArrowRight size={16} />
            </a>

            <a
              href="/fixtures"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View fixtures
            </a>
          </div>
        </div>
      </section>

      {/* Statistics overview */}
      <section>
        <SectionHeading
          title="Today's overview"
          subtitle="A snapshot of the football action"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total fixtures"
            value="24"
            description="Across selected competitions"
            icon={CalendarDays}
            iconColor="bg-blue-500/10 text-blue-500"
          />

          <StatCard
            title="Live matches"
            value="06"
            description="Currently in progress"
            icon={Activity}
            iconColor="bg-rose-500/10 text-rose-500"
          />

          <StatCard
            title="Analysed matches"
            value="18"
            description="Statistical analysis available"
            icon={BrainCircuit}
            iconColor="bg-emerald-500/10 text-emerald-500"
          />

          <StatCard
            title="Competitions"
            value="12"
            description="Featured competitions"
            icon={Trophy}
            iconColor="bg-amber-500/10 text-amber-500"
          />
        </div>
      </section>

      {/* Match and competition columns */}
      <section className="grid grid-cols-1 gap-7 xl:grid-cols-[1.7fr_1fr]">
        <div>
          <SectionHeading
            title="Featured matches"
            subtitle="Explore upcoming football fixtures"
            action="All fixtures"
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={match.home} match={match} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            title="Popular competitions"
            subtitle="Explore competitions around the world"
            action="View all"
          />

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#26364D] dark:bg-[#111C2E]">
            {competitions.map((competition, index) => (
              <div
                key={competition.name}
                className={`flex items-center gap-3 px-4 py-4 ${
                  index !== competitions.length - 1
                    ? "border-b border-slate-100 dark:border-[#26364D]"
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-[#1B2940]">
                  {competition.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {competition.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {competition.country}
                  </p>
                </div>

                <ArrowRight size={16} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prediction spotlight */}
      <section>
        <SectionHeading
          title="Prediction spotlight"
          subtitle="An example of how MatchIQ will present model probabilities"
          action="Prediction centre"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#26364D] dark:bg-[#111C2E] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
                  <BrainCircuit size={19} />
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  North City vs United FC
                </span>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                SAMPLE PREDICTION
              </span>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Home win", value: 56 },
                { label: "Draw", value: 25 },
                { label: "Away win", value: 19 },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    className={`text-2xl font-extrabold ${
                      item.label === "Home win"
                        ? "text-emerald-500"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {item.value}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-[#26364D]">
              <div className="bg-emerald-500" style={{ width: "56%" }} />
              <div className="bg-slate-400" style={{ width: "25%" }} />
              <div className="bg-blue-500" style={{ width: "19%" }} />
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
              These sample probabilities demonstrate the intended interface.
              They are not real match predictions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#26364D] dark:bg-[#111C2E]">
            <div className="flex items-center gap-2">
              <Target className="text-emerald-500" size={20} />
              <h3 className="font-bold text-slate-900 dark:text-white">
                Our approach
              </h3>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
              MatchIQ combines statistical models and AI-assisted explanations
              to help users understand football matches.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Team performance and form",
                "Historical match statistics",
                "Probability-based predictions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <ArrowUpRight size={12} />
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <Flame size={15} />
              Analysis first. Predictions second.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
