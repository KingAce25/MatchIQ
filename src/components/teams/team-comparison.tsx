"use client";

import { useId, useMemo, useState } from "react";
import { ArrowLeftRight, Trophy, Target, ShieldCheck } from "lucide-react";
import type { Team } from "@/data/teams";
import { getAllTeams, getTeamBySlug } from "@/lib/data/teams";
import { getTeamComparisonData } from "@/lib/data/team-comparison";
import SectionHeading from "@/components/ui/section-heading";

// Near-black team colors are invisible on the dark theme, so lighten them
function visibleColor(hex: string) {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) return hex;

  const value = parseInt(match[1], 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance < 0.2 ? "#94A3B8" : hex;
}

type TeamSelectProps = {
  label: string;
  value: string;
  groups: [string, Team[]][];
  onChange: (slug: string) => void;
};

function TeamSelect({ label, value, groups, onChange }: TeamSelectProps) {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-[#26364D] dark:bg-[#111C2E] dark:text-white dark:scheme:dark"
      >
        {groups.map(([league, leagueTeams]) => (
          <optgroup
            key={league}
            label={league}
            className="bg-white text-slate-900 dark:bg-[#111C2E] dark:text-white"
          >
            {leagueTeams.map((team) => (
              <option
                key={team.slug}
                value={team.slug}
                className="bg-white text-slate-900 dark:bg-[#111C2E] dark:text-white"
              >
                {team.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default function TeamComparison() {
  const teams = useMemo(() => getAllTeams(), []);

  const groups = useMemo(() => {
    const byLeague = new Map<string, Team[]>();

    teams.forEach((team) => {
      byLeague.set(team.league, [...(byLeague.get(team.league) ?? []), team]);
    });

    return Array.from(byLeague.entries());
  }, [teams]);

  const [firstTeamSlug, setFirstTeamSlug] = useState(teams[0]?.slug ?? "");
  const [secondTeamSlug, setSecondTeamSlug] = useState(teams[1]?.slug ?? "");

  // Choosing the team that's already on the other side swaps them
  const handleFirstChange = (slug: string) => {
    if (slug === secondTeamSlug) setSecondTeamSlug(firstTeamSlug);
    setFirstTeamSlug(slug);
  };

  const handleSecondChange = (slug: string) => {
    if (slug === firstTeamSlug) setFirstTeamSlug(secondTeamSlug);
    setSecondTeamSlug(slug);
  };

  const swapTeams = () => {
    setFirstTeamSlug(secondTeamSlug);
    setSecondTeamSlug(firstTeamSlug);
  };

  const comparison = useMemo(
    () => getTeamComparisonData(firstTeamSlug, secondTeamSlug),
    [firstTeamSlug, secondTeamSlug],
  );

  const firstTeam = getTeamBySlug(firstTeamSlug);
  const secondTeam = getTeamBySlug(secondTeamSlug);

  const first = comparison?.firstTeam;
  const second = comparison?.secondTeam;

  const metrics = [
    {
      label: "Points",
      first: first ? first.wins * 3 + first.draws : 0,
      second: second ? second.wins * 3 + second.draws : 0,
      icon: Trophy,
    },
    {
      label: "Wins",
      first: first?.wins ?? 0,
      second: second?.wins ?? 0,
      icon: Trophy,
    },
    {
      label: "Goals Scored",
      first: first?.goalsScored ?? 0,
      second: second?.goalsScored ?? 0,
      icon: Target,
    },
    {
      label: "Goals Conceded",
      first: first?.goalsConceded ?? 0,
      second: second?.goalsConceded ?? 0,
      icon: ShieldCheck,
      lowerIsBetter: true,
    },
    {
      label: "Clean Sheets",
      first: first?.cleanSheets ?? 0,
      second: second?.cleanSheets ?? 0,
      icon: ShieldCheck,
    },
  ];

  const formColor = (result: string) => {
    if (result === "W") return "bg-emerald-500";
    if (result === "D") return "bg-amber-500";
    if (result === "L") return "bg-red-500";
    return "bg-slate-500";
  };

  return (
    <div className="mb-16 space-y-8">
      <section>
        <p className="text-sm font-semibold text-emerald-500">TEAM ANALYTICS</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          Team Comparison
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Compare club performance, results and statistics side by side.
        </p>
      </section>

      {/* Team Selectors */}
      <section className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
        <TeamSelect
          label="First Team"
          value={firstTeamSlug}
          groups={groups}
          onChange={handleFirstChange}
        />

        <div className="flex justify-center pb-1">
          <button
            type="button"
            onClick={swapTeams}
            aria-label="Swap teams"
            title="Swap teams"
            className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500 transition hover:bg-emerald-500/20"
          >
            <ArrowLeftRight size={22} />
          </button>
        </div>

        <TeamSelect
          label="Second Team"
          value={secondTeamSlug}
          groups={groups}
          onChange={handleSecondChange}
        />
      </section>

      {!comparison || !firstTeam || !secondTeam ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-[#111C2E]">
          <p className="font-semibold text-slate-900 dark:text-white">
            Select two different teams to compare.
          </p>
        </div>
      ) : (
        <>
          {/* Team Identity */}
          <section className="grid gap-4 md:grid-cols-2">
            {[firstTeam, secondTeam].map((team) => (
              <div
                key={team.slug}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl text-base font-bold"
                    style={{
                      backgroundColor: `${team.primaryColor}20`,
                      color: visibleColor(team.primaryColor),
                    }}
                  >
                    {team.shortName}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {team.name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {team.country} · {team.league}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Statistical Comparison */}
          <section>
            <SectionHeading
              title="Statistical Comparison"
              subtitle="Side-by-side performance metrics."
            />

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]">
              {metrics.map((metric) => {
                const max = Math.max(metric.first, metric.second, 1);

                const firstBetter = metric.lowerIsBetter
                  ? metric.first < metric.second
                  : metric.first > metric.second;

                const secondBetter = metric.lowerIsBetter
                  ? metric.second < metric.first
                  : metric.second > metric.first;

                return (
                  <div
                    key={metric.label}
                    className="border-b border-slate-100 py-5 last:border-0 dark:border-slate-800"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span
                        className={`text-sm font-bold ${
                          firstBetter ? "text-emerald-500" : "text-slate-500"
                        }`}
                      >
                        {metric.first}
                      </span>

                      <span className="flex items-center gap-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <metric.icon size={16} />
                        {metric.label}
                      </span>

                      <span
                        className={`text-sm font-bold ${
                          secondBetter ? "text-emerald-500" : "text-slate-500"
                        }`}
                      >
                        {metric.second}
                      </span>
                    </div>

                    <div className="flex h-2 gap-1">
                      <div className="flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-[#1B2940]">
                        <div
                          className="ml-auto h-full rounded-full"
                          style={{
                            width: `${(metric.first / max) * 100}%`,
                            backgroundColor: visibleColor(
                              firstTeam.primaryColor,
                            ),
                          }}
                        />
                      </div>

                      <div className="flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-[#1B2940]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(metric.second / max) * 100}%`,
                            backgroundColor: visibleColor(
                              secondTeam.primaryColor,
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Form */}
          <section>
            <SectionHeading
              title="Recent Form"
              subtitle="Recent results represented by W, D and L."
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                { team: firstTeam, form: comparison.firstTeam.form },
                { team: secondTeam, form: comparison.secondTeam.form },
              ].map(({ team, form }) => (
                <div
                  key={team.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {team.name}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {form.map((result, index) => (
                      <span
                        key={`${team.slug}-${index}`}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white ${formColor(result)}`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Sample Data Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-amber-500" />

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Illustrative comparison data
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            These figures are sample frontend data, not verified current club
            statistics. They will be replaced when live football data
            integration is implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
