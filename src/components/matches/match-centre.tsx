import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  Clock3,
  Shield,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import type { Match } from "@/data/matches";

type MatchCentreProps = {
  match: Match;
};

const teamForm = {
  home: ["W", "W", "D", "W", "L"],
  away: ["W", "D", "W", "L", "W"],
};

function FormBadges({ results }: { results: string[] }) {
  return (
    <div className="flex gap-2">
      {results.map((result, index) => (
        <span
          key={index}
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
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

function ProbabilityBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">{label}</span>
        <span className="font-bold text-slate-900 dark:text-white">
          {value}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function MatchCentre({ match }: MatchCentreProps) {
  const isCompleted = match.status === "Completed";
  const hasScore =
    match.homeScore !== undefined && match.awayScore !== undefined;

  return (
    <div className="space-y-6 pb-10">
      <Link
        href="/fixtures"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-500"
      >
        <ArrowLeft size={17} />
        Back to fixtures
      </Link>

      {/* Match overview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111c2e] sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-emerald-500">
              {match.league}
            </p>
            <p className="mt-1 text-xs text-slate-500">{match.country}</p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {match.status}
          </span>
        </div>

        <div className="grid grid-cols-3 items-center gap-3">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Shield size={30} className="text-emerald-500" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white sm:text-lg">
              {match.home}
            </h2>
            <p className="mt-1 text-xs text-slate-500">Home</p>
          </div>

          <div className="text-center">
            {hasScore ? (
              <p className="text-3xl font-black text-slate-900 dark:text-white sm:text-5xl">
                {match.homeScore} - {match.awayScore}
              </p>
            ) : (
              <p className="text-2xl font-black text-slate-400 sm:text-4xl">
                VS
              </p>
            )}

            <p className="mt-3 text-xs font-semibold text-slate-500">
              {isCompleted ? "Full time" : match.time}
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Shield size={30} className="text-blue-500" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white sm:text-lg">
              {match.away}
            </h2>
            <p className="mt-1 text-xs text-slate-500">Away</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-5 border-t border-slate-100 pt-5 text-xs text-slate-500 dark:border-slate-800">
          <span className="flex items-center gap-2">
            <CalendarDays size={15} />
            {match.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock3 size={15} />
            {match.time}
          </span>
        </div>
      </section>

      {/* Prediction and form */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111c2e]">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-500">
              <Target size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                1X2 prediction
              </h3>
              <p className="text-xs text-slate-500">
                Estimated match outcome probabilities
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <ProbabilityBar
              label={`${match.home} win`}
              value={match.prediction.home}
            />
            <ProbabilityBar label="Draw" value={match.prediction.draw} />
            <ProbabilityBar
              label={`${match.away} win`}
              value={match.prediction.away}
            />
          </div>

          <p className="mt-6 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500 dark:bg-slate-800/60">
            These are illustrative sample probabilities, not verified
            predictions from a live statistical model.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111c2e]">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-500">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Recent form
              </h3>
              <p className="text-xs text-slate-500">Last five matches</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                {match.home}
              </p>
              <FormBadges results={teamForm.home} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                {match.away}
              </p>
              <FormBadges results={teamForm.away} />
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Sample form indicators. Real historical results will be connected
            later.
          </p>
        </section>
      </div>

      {/* Other markets */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111c2e]">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-500">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Other prediction markets
            </h3>
            <p className="text-xs text-slate-500">
              Additional match indicators
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500">Over 2.5 goals</p>
            <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              {match.over25}%
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500">Both teams to score</p>
            <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              {match.gg}%
            </p>
          </div>
        </div>
      </section>

      {/* Head to head placeholder */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111c2e]">
        <div className="mb-3 flex items-center gap-3">
          <Trophy size={20} className="text-amber-500" />
          <h3 className="font-bold text-slate-900 dark:text-white">
            Head-to-head analysis
          </h3>
        </div>
        <p className="text-sm leading-6 text-slate-500">
          Historical meetings between {match.home} and {match.away} will appear
          here once real match history is connected.
        </p>
      </section>
    </div>
  );
}
