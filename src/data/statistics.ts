import { matches } from "@/data/matches";

export type Statistic = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
};

// Only finished matches with a recorded score
const played = matches.flatMap((match) =>
  match.status === "Completed" &&
  match.homeScore !== undefined &&
  match.awayScore !== undefined
    ? [{ home: match.homeScore, away: match.awayScore }]
    : [],
);

const total = played.length || 1;
const pct = (count: number) => Math.round((count / total) * 100);

const totalGoals = played.reduce((sum, m) => sum + m.home + m.away, 0);
const homeWins = played.filter((m) => m.home > m.away).length;
const gg = played.filter((m) => m.home > 0 && m.away > 0).length;
const over25 = played.filter((m) => m.home + m.away >= 3).length;
const cleanSheets = played.filter((m) => m.home === 0 || m.away === 0).length;

export const overviewStats: Statistic[] = [
  {
    id: "matches",
    label: "Matches Analysed",
    value: played.length,
    suffix: "",
    description: "Completed matches in the sample dataset",
  },
  {
    id: "goals",
    label: "Average Goals",
    value: Number((totalGoals / total).toFixed(2)),
    suffix: "",
    description: "Average goals per match",
  },
  {
    id: "home-wins",
    label: "Home Wins",
    value: pct(homeWins),
    suffix: "%",
    description: "Percentage of home victories",
  },
  {
    id: "gg",
    label: "gg Rate",
    value: pct(gg),
    suffix: "%",
    description: "Both teams scored",
  },
];

// Kept as demo data: the fixtures only cover three days
export const goalsTrend = [
  { week: "W1", goals: 24 },
  { week: "W2", goals: 31 },
  { week: "W3", goals: 27 },
  { week: "W4", goals: 35 },
  { week: "W5", goals: 29 },
  { week: "W6", goals: 38 },
];

export const performanceStats = [
  { category: "Over 2.5 Goals", percentage: pct(over25) },
  { category: "Under 2.5 Goals", percentage: 100 - pct(over25) },
  { category: "Both Teams Scored", percentage: pct(gg) },
  { category: "Clean Sheets", percentage: pct(cleanSheets) },
];
