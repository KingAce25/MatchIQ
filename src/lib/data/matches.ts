import { matches } from "@/data/matches";

export function getAllMatches() {
  return matches;
}

export function getMatchesByStatus(status: "Upcoming" | "Live" | "Completed") {
  return matches.filter((match) => match.status === status);
}

export function getMatchBySlug(slug: string) {
  return matches.find((match) => match.slug === slug) ?? null;
}

export function searchMatches(query: string) {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return matches;

  return matches.filter(
    (match) =>
      match.home.toLowerCase().includes(searchTerm) ||
      match.away.toLowerCase().includes(searchTerm) ||
      match.league.toLowerCase().includes(searchTerm),
  );
}
