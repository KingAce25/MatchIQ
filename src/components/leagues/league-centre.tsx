import Link from "next/link";
import { Trophy, ArrowUpRight, CalendarDays, BarChart3 } from "lucide-react";
import type { League } from "@/data/leagues";
import { getStandingsByLeague } from "@/lib/data/standings";
import { getAllTeams } from "@/lib/data/teams";
import { getAllMatches } from "@/lib/data/matches";
import SectionHeading from "@/components/ui/section-heading";

type LeagueCentreProps = {
  league: League;
};

export default function LeagueCentre({ league }: LeagueCentreProps) {
  const standings = getStandingsByLeague(league.slug);
  const teams = getAllTeams();
  const matches = getAllMatches();

  const leagueTeams = league.teamSlugs
    .map((slug) => teams.find((team) => team.slug === slug))
    .filter((team): team is NonNullable<typeof team> => Boolean(team));

  const leagueTeamNames = new Set(leagueTeams.map((team) => team.name));

  const leagueMatches = matches.filter(
    (match) =>
      leagueTeamNames.has(match.home) && leagueTeamNames.has(match.away),
  );

  const recentMatches = leagueMatches
    .filter((match) => match.status === "Completed")
    .slice(0, 4);

  const upcomingMatches = leagueMatches
    .filter((match) => match.status === "Upcoming")
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* League Header */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111C2E] md:p-8">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <Trophy size={32} />
            </div>

            <div>
              <p className="text-sm font-medium text-emerald-500">
                {league.country} · {league.tier}
              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                {league.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Season {league.season}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Participating teams
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {league.teamSlugs.length}
            </p>
          </div>
        </div>

        <p className="relative mt-6 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          {league.description}
        </p>
      </section>

      {/* Standings */}
      <section>
        <SectionHeading
          title="League Standings"
          subtitle="Current sample league rankings and team performance."
        />

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111C2E]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5 text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-[#1B2940] dark:text-slate-400">
                <tr>
                  <th className="px-4 py-4">#</th>
                  <th className="px-4 py-4">Club</th>
                  <th className="px-3 py-4 text-center">P</th>
                  <th className="px-3 py-4 text-center">W</th>
                  <th className="px-3 py-4 text-center">D</th>
                  <th className="px-3 py-4 text-center">L</th>
                  <th className="px-3 py-4 text-center">GD</th>
                  <th className="px-3 py-4 text-center">Pts</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {standings.map((standing) => {
                  const team = teams.find(
                    (item) => item.slug === standing.teamSlug,
                  );

                  if (!team) return null;

                  return (
                    <tr
                      key={standing.teamSlug}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-[#1B2940]/70"
                    >
                      <td className="px-4 py-4 font-semibold text-slate-500">
                        {standing.position}
                      </td>

                      <td className="px-4 py-4">
                        <Link
                          href={`/teams/${team.slug}`}
                          className="flex items-center gap-3 font-semibold text-slate-900 hover:text-emerald-500 dark:text-white"
                        >
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: team.primaryColor,
                              color: "#ffffff",
                            }}
                          >
                            {team.shortName.slice(0, 3)}
                          </span>
                          {team.name}
                        </Link>
                      </td>

                      <td className="px-3 py-4 text-center text-slate-600 dark:text-slate-300">
                        {standing.played}
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600 dark:text-slate-300">
                        {standing.wins}
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600 dark:text-slate-300">
                        {standing.draws}
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600 dark:text-slate-300">
                        {standing.losses}
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600 dark:text-slate-300">
                        {standing.goalDifference > 0 ? "+" : ""}
                        {standing.goalDifference}
                      </td>
                      <td className="px-3 py-4 text-center font-bold text-emerald-500">
                        {standing.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            P: Played · W: Won · D: Drawn · L: Lost · GD: Goal Difference · Pts:
            Points
          </div>
        </div>
      </section>

      {/* Team and match overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionHeading
            title="Participating Teams"
            subtitle="Teams currently registered in this sample league."
          />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {leagueTeams.map((team) => (
              <Link
                key={team.slug}
                href={`/teams/${team.slug}`}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-500/50 dark:border-slate-800 dark:bg-[#111C2E]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: team.primaryColor }}
                  >
                    {team.shortName.slice(0, 3)}
                  </span>

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {team.name}
                    </p>
                    <p className="text-xs text-slate-500">{team.country}</p>
                  </div>
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-slate-400 transition group-hover:text-emerald-500"
                />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            title="League Overview"
            subtitle="A quick look at the available league data."
          />

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111C2E]">
              <BarChart3 className="text-emerald-500" size={22} />
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {standings.length}
              </p>
              <p className="text-xs text-slate-500">Ranked teams</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111C2E]">
              <CalendarDays className="text-blue-500" size={22} />
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {leagueMatches.length}
              </p>
              <p className="text-xs text-slate-500">Available fixtures</p>
            </div>
          </div>
        </section>
      </div>

      {/* Recent Results */}
      <section>
        <SectionHeading
          title="Recent Results"
          subtitle="Completed sample fixtures involving participating teams."
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {recentMatches.length > 0 ? (
            recentMatches.map((match) => (
              <Link
                key={match.id}
                href={`/matches/${match.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-500/50 dark:border-slate-800 dark:bg-[#111C2E]"
              >
                <p className="text-xs text-slate-500">{match.league}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {match.home}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {match.homeScore} - {match.awayScore}
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {match.away}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No completed fixtures available yet.
            </p>
          )}
        </div>
      </section>

      {/* Upcoming Fixtures */}
      <section>
        <SectionHeading
          title="Upcoming Fixtures"
          subtitle="Scheduled sample matches involving participating teams."
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <Link
                key={match.id}
                href={`/matches/${match.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-500/50 dark:border-slate-800 dark:bg-[#111C2E]"
              >
                <p className="text-xs text-slate-500">
                  {match.league} · {match.time}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {match.home}
                  </span>
                  <span className="text-xs font-bold text-emerald-500">VS</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {match.away}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No upcoming fixtures available yet.
            </p>
          )}
        </div>
      </section>

      <p className="text-xs text-slate-500">
        MatchIQ demonstration data. Standings, statistics and fixtures are
        illustrative and are not live football data.
      </p>
    </div>
  );
}
