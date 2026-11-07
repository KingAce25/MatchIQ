import { getAllMatches } from "@/lib/data/matches";
import { getAllTeams } from "@/lib/data/teams";
import { getAllLeagues } from "@/lib/data/leagues";

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  type: "Match" | "Team" | "League";
  href: string;
};

const MAX_MATCH_RESULTS = 8;

// Lowercase and strip accents so "atletico" finds "Atlético"
function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Every word typed must appear somewhere in the text
function matchesTerms(text: string, terms: string[]) {
  const haystack = normalize(text);
  return terms.every((term) => haystack.includes(term));
}

export function globalSearch(query: string): SearchResult[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);

  if (terms.length === 0) return [];

  const leagueResults: SearchResult[] = getAllLeagues()
    .filter((league) => matchesTerms(`${league.name} ${league.country}`, terms))
    .map((league) => ({
      id: `league-${league.id}`,
      title: league.name,
      subtitle: `${league.country} · ${league.season}`,
      type: "League",
      href: `/leagues/${league.slug}`,
    }));

  const teamResults: SearchResult[] = getAllTeams()
    .filter((team) =>
      matchesTerms(
        `${team.name} ${team.shortName} ${team.country} ${team.league}`,
        terms,
      ),
    )
    .map((team) => ({
      id: `team-${team.id}`,
      title: team.name,
      subtitle: `${team.country} · ${team.league}`,
      type: "Team",
      href: `/teams/${team.slug}`,
    }));

  const matchResults: SearchResult[] = getAllMatches()
    .filter((match) =>
      matchesTerms(`${match.home} ${match.away} ${match.league}`, terms),
    )
    .slice(0, MAX_MATCH_RESULTS)
    .map((match) => ({
      id: `match-${match.id}`,
      title: `${match.home} vs ${match.away}`,
      subtitle: `${match.league} · ${match.date} · ${match.status}`,
      type: "Match",
      href: `/matches/${match.slug}`,
    }));

  return [...leagueResults, ...teamResults, ...matchResults];
}
