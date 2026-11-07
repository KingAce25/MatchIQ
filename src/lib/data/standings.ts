import { standings } from "@/data/standings";

export function getStandingsByLeague(leagueSlug: string) {
  const leagueStandings = standings[leagueSlug] ?? [];

  return [...leagueStandings]
    .sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      const goalDifferenceA = a.goalsFor - a.goalsAgainst;
      const goalDifferenceB = b.goalsFor - b.goalsAgainst;

      if (goalDifferenceB !== goalDifferenceA) {
        return goalDifferenceB - goalDifferenceA;
      }

      return b.goalsFor - a.goalsFor;
    })
    .map((team, index) => ({
      ...team,
      position: index + 1,
      goalDifference: team.goalsFor - team.goalsAgainst,
    }));
}
