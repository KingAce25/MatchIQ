import { getTeamBySlug } from "@/lib/data/teams";

export type TeamComparisonStats = {
  teamSlug: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  form: ("W" | "D" | "L")[];
};

export function getTeamComparisonStats(
  teamSlug: string,
): TeamComparisonStats | null {
  const team = getTeamBySlug(teamSlug);

  if (!team) return null;

  return {
    teamSlug: team.slug,
    played: team.stats.played,
    wins: team.stats.wins,
    draws: team.stats.draws,
    losses: team.stats.losses,
    goalsScored: team.stats.goalsScored,
    goalsConceded: team.stats.goalsConceded,
    cleanSheets: team.stats.cleanSheets,
    form: team.form,
  };
}

export function getTeamComparisonData(
  firstTeamSlug: string,
  secondTeamSlug: string,
) {
  if (firstTeamSlug === secondTeamSlug) return null;

  const firstTeam = getTeamComparisonStats(firstTeamSlug);
  const secondTeam = getTeamComparisonStats(secondTeamSlug);

  if (!firstTeam || !secondTeam) return null;

  return { firstTeam, secondTeam };
}
