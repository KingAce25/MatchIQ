export type League = {
  id: number;
  slug: string;
  name: string;
  country: string;
  season: string;
  tier: string;
  description: string;
  teamSlugs: string[];
};

export const leagues: League[] = [
  {
    id: 1,
    slug: "premier-league",
    name: "Premier League",
    country: "England",
    season: "2026/27",
    tier: "First Division",
    description:
      "Explore Premier League standings, fixtures, team performance and statistical insights.",
    teamSlugs: [
      "arsenal",
      "aston-villa",
      "bournemouth",
      "brentford",
      "brighton",
      "burnley",
      "chelsea",
      "crystal-palace",
      "everton",
      "fulham",
      "leeds-united",
      "liverpool",
      "manchester-city",
      "manchester-united",
      "newcastle-united",
      "nottingham-forest",
      "sunderland",
      "tottenham-hotspur",
      "west-ham-united",
      "wolverhampton-wanderers",
    ],
  },
  {
    id: 2,
    slug: "la-liga",
    name: "La Liga",
    country: "Spain",
    season: "2026/27",
    tier: "First Division",
    description:
      "Explore La Liga standings, fixtures, team performance and statistical insights.",
    teamSlugs: [
      "alaves",
      "athletic-club",
      "atletico-madrid",
      "barcelona",
      "celta-vigo",
      "elche",
      "espanyol",
      "getafe",
      "girona",
      "levante",
      "mallorca",
      "osasuna",
      "rayo-vallecano",
      "real-betis",
      "real-madrid",
      "real-oviedo",
      "real-sociedad",
      "sevilla",
      "valencia",
      "villarreal",
    ],
  },
  {
    id: 3,
    slug: "serie-a",
    name: "Serie A",
    country: "Italy",
    season: "2026/27",
    tier: "First Division",
    description:
      "Explore Serie A standings, fixtures, team performance and statistical insights.",
    teamSlugs: [
      "atalanta",
      "bologna",
      "cagliari",
      "como",
      "cremonese",
      "fiorentina",
      "genoa",
      "hellas-verona",
      "inter",
      "juventus",
      "lazio",
      "lecce",
      "ac-milan",
      "napoli",
      "parma",
      "pisa",
      "roma",
      "sassuolo",
      "torino",
      "udinese",
    ],
  },
  {
    id: 4,
    slug: "bundesliga",
    name: "Bundesliga",
    country: "Germany",
    season: "2026/27",
    tier: "First Division",
    description:
      "Explore Bundesliga standings, fixtures, team performance and statistical insights.",
    teamSlugs: [
      "augsburg",
      "bayer-leverkusen",
      "bayern-munich",
      "borussia-dortmund",
      "borussia-monchengladbach",
      "eintracht-frankfurt",
      "freiburg",
      "hamburger-sv",
      "heidenheim",
      "hoffenheim",
      "koln",
      "mainz-05",
      "rb-leipzig",
      "st-pauli",
      "stuttgart",
      "union-berlin",
      "werder-bremen",
      "wolfsburg",
    ],
  },
  {
    id: 5,
    slug: "ligue-1",
    name: "Ligue 1",
    country: "France",
    season: "2026/27",
    tier: "First Division",
    description:
      "Explore Ligue 1 standings, fixtures, team performance and statistical insights.",
    teamSlugs: [
      "angers",
      "auxerre",
      "brest",
      "le-havre",
      "lens",
      "lille",
      "lorient",
      "lyon",
      "marseille",
      "metz",
      "monaco",
      "nantes",
      "nice",
      "paris-fc",
      "paris-saint-germain",
      "rennes",
      "strasbourg",
      "toulouse",
    ],
  },
];

// export function getAllLeagues() {
//   return leagues;
// }

// export function getLeagueBySlug(slug: string) {
//   return leagues.find((league) => league.slug === slug) ?? null;
// }
