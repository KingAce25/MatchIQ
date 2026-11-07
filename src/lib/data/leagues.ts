import { leagues } from "@/data/leagues";

export function getAllLeagues() {
  return leagues;
}

export function getLeagueById(id: string) {
  return leagues.find((league) => String(league.id) === id) ?? null;
}

export function getLeagueBySlug(slug: string) {
  return leagues.find((league) => league.slug === slug) ?? null;
}

export function searchLeagues(query: string) {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return leagues;

  return leagues.filter(
    (league) =>
      league.name.toLowerCase().includes(searchTerm) ||
      league.country.toLowerCase().includes(searchTerm),
  );
}

export function getLeaguesByCountry(country: string) {
  return leagues.filter(
    (league) => league.country.toLowerCase() === country.toLowerCase(),
  );
}
