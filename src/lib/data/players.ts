import { players } from "@/data/players";

export function getAllPlayers() {
  return players;
}

export function getPlayerById(id: number) {
  return players.find((player) => player.id === id) ?? null;
}

export function getPlayerBySlug(slug: string) {
  return players.find((player) => player.slug === slug) ?? null;
}

export function searchPlayers(query: string) {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return players;

  return players.filter((player) =>
    [player.name, player.teamName, player.nationality, player.position]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm),
  );
}

export function getPlayersByTeam(teamSlug: string) {
  return players.filter((player) => player.teamSlug === teamSlug);
}
