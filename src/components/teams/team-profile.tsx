import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Shield,
  Target,
  Trophy,
  TrendingUp,
} from "lucide-react";
import type { Team } from "@/data/teams";
import { getAllMatches } from "@/lib/data/matches";

type TeamProfileProps = {
  team: Team;
};

function FormBadges({ form }: { form: Team["form"] }) {
  return (
    <div className="flex gap-2">
      {form.map((result, index) => (
        <span
          key={index}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${
            result === "W"
              ? "bg-emerald-500/15 text-emerald-500"
              : result === "D"
                ? "bg-amber-500/15 text-amber-500"
                : "bg-red-500/15 text-red-500"
          }`}
        >
          {result}
        </span>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111c2e]">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-slate-500">{label}</p>
        <Icon size={17} className="text-emerald-500" />
      </div>
      <p className="text-2xl font-black text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default function TeamProfile({ team }: TeamProfileProps) {
  const allMatches = getAllMatches();

  const teamMatches = allMatches.filter(
    (match) =>
      match.home.toLowerCase() === team.name.toLowerCase() ||
      match.away.toLowerCase() === team.name.toLowerCase(),
  );

  const upcomingMatches = teamMatches.filter(
    (match) => match.status === "Upcoming",
  );

  const stats = team.stats;

  return (
    <div className="space-y-6 pb-10">
      <Link
        href="/fixtures"
        className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-500"
      >
        <ArrowLeft size={17} />
        Back to fixtures
      </Link>

      {/* Team identity */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111c2e]">
        <div className="h-2" style={{ backgroundColor: team.primaryColor }} />

        <div className="p-5 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `${team.primaryColor}18`,
              }}
            >
              <Shield size={52} style={{ color: team.primaryColor }} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                {team.league} · {team.country}
              </p>

              <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
                {team.name}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                {team.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                <span>Founded {team.founded}</span>
                <span>{team.stadium}</span>
                <span>Capacity: {team.stadiumCapacity.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance statistics */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Season overview
          </h2>
          <p className="text-xs text-slate-500">
            Illustrative team performance statistics
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Matches played"
            value={stats.played}
            icon={CalendarDays}
          />
          <StatCard label="Wins" value={stats.wins} icon={Trophy} />
          <StatCard
            label="Goals scored"
            value={stats.goalsScored}
            icon={Target}
          />
          <StatCard
            label="Clean sheets"
            value={stats.cleanSheets}
            icon={TrendingUp}
          />
        </div>
      </section>

      {/* Results breakdown */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111c2e]">
          <h2 className="mb-5 font-bold text-slate-900 dark:text-white">
            Recent form
          </h2>

          <FormBadges form={team.form} />

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-slate-500">Wins</p>
              <p className="mt-1 text-xl font-bold text-emerald-500">
                {stats.wins}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Draws</p>
              <p className="mt-1 text-xl font-bold text-amber-500">
                {stats.draws}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Losses</p>
              <p className="mt-1 text-xl font-bold text-red-500">
                {stats.losses}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111c2e]">
          <h2 className="mb-5 font-bold text-slate-900 dark:text-white">
            Goal statistics
          </h2>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Goals scored</span>
                <strong className="text-slate-900 dark:text-white">
                  {stats.goalsScored}
                </strong>
              </div>

              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (stats.goalsScored /
                        Math.max(1, stats.goalsScored + stats.goalsConceded)) *
                        100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Goals conceded</span>
                <strong className="text-slate-900 dark:text-white">
                  {stats.goalsConceded}
                </strong>
              </div>

              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-red-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (stats.goalsConceded /
                        Math.max(1, stats.goalsScored + stats.goalsConceded)) *
                        100,
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming matches */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111c2e]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Upcoming fixtures
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Matches involving {team.name}
            </p>
          </div>

          <Link
            href="/fixtures"
            className="flex items-center gap-1 text-xs font-semibold text-emerald-500"
          >
            All fixtures <ArrowUpRight size={14} />
          </Link>
        </div>

        {upcomingMatches.length > 0 ? (
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <Link
                key={match.id}
                href={`/matches/${match.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {match.home} vs {match.away}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {match.league} · {match.date} · {match.time}
                  </p>
                </div>

                <ArrowUpRight size={17} className="shrink-0 text-emerald-500" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500 dark:bg-slate-800/60">
            No upcoming sample fixtures are currently available for this team.
          </p>
        )}
      </section>
    </div>
  );
}
