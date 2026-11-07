import Link from "next/link";
import {
  ArrowLeft,
  Target,
  Footprints,
  Trophy,
  Star,
  Shield,
  UserRound,
} from "lucide-react";

import type { Player } from "@/data/players";
import { getTeamBySlug } from "@/lib/data/teams";

type PlayerProfileProps = {
  player: Player;
};

export default function PlayerProfile({ player }: PlayerProfileProps) {
  const team = getTeamBySlug(player.teamSlug);

  const statistics = [
    {
      label: "Appearances",
      value: player.appearances,
      icon: Footprints,
    },
    {
      label: "Goals",
      value: player.goals,
      icon: Target,
    },
    {
      label: "Assists",
      value: player.assists,
      icon: Trophy,
    },
    {
      label: "Player Rating",
      value: player.rating.toFixed(1),
      icon: Star,
    },
  ];

  return (
    <div className="mb-16 space-y-8">
      {/* Back Navigation */}
      <Link
        href="/players"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-500"
      >
        <ArrowLeft size={17} />
        Back to Players
      </Link>

      {/* Player Header */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111C2E]">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500" />

        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-3xl font-bold text-emerald-500">
              {player.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-500">
                Player Profile
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                {player.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span>{player.position}</span>
                <span>·</span>
                <span>{player.nationality}</span>
                <span>·</span>
                <span>{player.age} years old</span>
              </div>

              {team && (
                <Link
                  href={`/teams/${team.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:underline"
                >
                  <Shield size={16} />
                  {team.name}
                </Link>
              )}
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-bold text-slate-700 dark:bg-[#1B2940] dark:text-white">
              {player.shirtNumber}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Season Statistics
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Individual performance metrics.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>

                <stat.icon size={19} className="text-emerald-500" />
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Player Information */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111C2E]">
          <div className="flex items-center gap-3">
            <UserRound className="text-emerald-500" size={21} />

            <h2 className="font-bold text-slate-900 dark:text-white">
              Player Information
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            {[
              ["Full Name", player.name],
              ["Age", `${player.age} years`],
              ["Nationality", player.nationality],
              ["Position", player.position],
              ["Shirt Number", `#${player.shirtNumber}`],
              ["Club", player.teamName],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 dark:border-slate-800"
              >
                <span className="text-sm text-slate-500">{label}</span>

                <span className="text-right text-sm font-semibold text-slate-900 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111C2E]">
          <div className="flex items-center gap-3">
            <Target className="text-emerald-500" size={21} />

            <h2 className="font-bold text-slate-900 dark:text-white">
              Player Overview
            </h2>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
            {player.description}
          </p>

          <div className="mt-6 rounded-xl bg-emerald-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
              Goals per appearance
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {player.appearances > 0
                ? (player.goals / player.appearances).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>
      </section>

      {/* Sample Data Notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="flex items-center gap-2">
          <Star size={17} className="text-amber-500" />

          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Illustrative player statistics
          </p>
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
          The information displayed is sample frontend data and should not be
          treated as verified current-season performance.
        </p>
      </div>
    </div>
  );
}
