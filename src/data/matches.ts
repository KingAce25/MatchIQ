import { leagues } from "@/data/leagues";
import { standings } from "@/data/standings";
import { teams } from "@/data/teams";

export type Match = {
  id: number;
  slug: string;
  league: string;
  country: string;
  time: string;
  date: string;
  home: string;
  away: string;
  homeColor: string;
  awayColor: string;
  status: "Upcoming" | "Live" | "Completed";
  homeScore?: number;
  awayScore?: number;
  prediction: {
    home: number;
    draw: number;
    away: number;
  };
  over25: number;
  gg: number;
};

// Full class names so Tailwind can detect them
const colorClasses = [
  "bg-sky-500",
  "bg-red-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-red-600",
  "bg-sky-700",
  "bg-yellow-600",
  "bg-red-700",
  "bg-emerald-600",
  "bg-purple-600",
  "bg-orange-500",
  "bg-slate-700",
];

const kickoffTimes = ["12:30", "15:00", "16:00", "17:30", "19:45", "20:45"];
const days = ["Yesterday", "Today", "Tomorrow"] as const;

// Deterministic pseudo-random number in [0, 1)
function rnd(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// Circle method: every team plays exactly once per round
function getRound(slugs: string[], round: number): [string, string][] {
  const [fixed, ...rest] = slugs;
  const rotated = rest.map((_, i) => rest[(i + round) % rest.length]);
  const order = [fixed, ...rotated];
  const half = order.length / 2;

  return Array.from({ length: half }, (_, i) => {
    const pair: [string, string] = [order[i], order[order.length - 1 - i]];
    return i === 0 && round % 2 === 1 ? [pair[1], pair[0]] : pair;
  });
}

function buildPrediction(
  leagueSlug: string,
  homeSlug: string,
  awaySlug: string,
) {
  const table = standings[leagueSlug] ?? [];
  const h = table.find((row) => row.teamSlug === homeSlug);
  const a = table.find((row) => row.teamSlug === awaySlug);

  if (!h || !a) {
    return { prediction: { home: 40, draw: 28, away: 32 }, over25: 55, gg: 52 };
  }

  const homeStrength = h.points + 3; // home advantage
  const awayStrength = a.points;
  const draw = 24 + Math.round(rnd(h.points * 31 + a.points) * 6);
  const home = Math.round(
    ((100 - draw) * homeStrength) / (homeStrength + awayStrength),
  );

  const expectedGoals =
    (h.goalsFor / h.played +
      a.goalsAgainst / a.played +
      a.goalsFor / a.played +
      h.goalsAgainst / h.played) /
    2;

  const bothScore =
    (Math.min(h.goalsFor / h.played, a.goalsAgainst / a.played + 0.5) +
      Math.min(a.goalsFor / a.played, h.goalsAgainst / h.played + 0.5)) /
    2;

  return {
    prediction: { home, draw, away: 100 - home - draw },
    over25: clamp(Math.round(50 + (expectedGoals - 2.7) * 25), 35, 85),
    gg: clamp(Math.round(40 + (bothScore - 0.9) * 40), 35, 80),
  };
}

let nextId = 1;

export const matches: Match[] = days.flatMap((date, round) =>
  leagues.flatMap((league) =>
    getRound(league.teamSlugs, round).flatMap(([homeSlug, awaySlug], index) => {
      const home = teams.find((team) => team.slug === homeSlug);
      const away = teams.find((team) => team.slug === awaySlug);

      if (!home || !away) return [];

      const id = nextId++;

      const status: Match["status"] =
        date === "Yesterday"
          ? "Completed"
          : date === "Today" && index % 4 === 0
            ? "Live"
            : "Upcoming";

      const hasScore = status !== "Upcoming";
      const { prediction, over25, gg } = buildPrediction(
        league.slug,
        homeSlug,
        awaySlug,
      );

      return [
        {
          id,
          slug: `${homeSlug}-vs-${awaySlug}-${id}`,
          league: league.name,
          country: league.country,
          time: kickoffTimes[(index + round) % kickoffTimes.length],
          date,
          home: home.name,
          away: away.name,
          homeColor: colorClasses[(home.id * 3) % colorClasses.length],
          awayColor: colorClasses[(away.id * 5 + 1) % colorClasses.length],
          status,
          ...(hasScore && {
            homeScore: Math.floor(rnd(id) * 4),
            awayScore: Math.floor(rnd(id + 1000) * 3.5),
          }),
          prediction,
          over25,
          gg,
        },
      ];
    }),
  ),
);
