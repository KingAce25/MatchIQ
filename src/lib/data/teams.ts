import { teams } from "@/data/teams";

export function getAllTeams() {
  return teams;
}

export function getTeamById(id: string) {
  return teams.find((team) => String(team.id) === id) ?? null;
}

export function getTeamBySlug(slug: string) {
  return teams.find((team) => team.slug === slug) ?? null;
}

export function searchTeams(query: string) {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return teams;

  return teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm) ||
      team.country.toLowerCase().includes(searchTerm) ||
      team.league.toLowerCase().includes(searchTerm),
  );
}

export function getTeamsByLeague(league: string) {
  return teams.filter((team) => team.league === league);
}
