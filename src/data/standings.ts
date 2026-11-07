export type LeagueStanding = {
  teamSlug: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: ("W" | "D" | "L")[];
};

function row(
  teamSlug: string,
  wins: number,
  draws: number,
  losses: number,
  goalsFor: number,
  goalsAgainst: number,
  form: string,
): LeagueStanding {
  return {
    teamSlug,
    played: wins + draws + losses,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    points: wins * 3 + draws,
    form: form.split("") as ("W" | "D" | "L")[],
  };
}

export const standings: Record<string, LeagueStanding[]> = {
  "premier-league": [
    row("arsenal", 8, 1, 1, 24, 8, "WWDWW"),
    row("manchester-city", 7, 2, 1, 22, 10, "WDWWW"),
    row("liverpool", 6, 2, 2, 20, 11, "WLWDW"),
    row("chelsea", 5, 2, 3, 18, 13, "DWLWW"),
    row("newcastle-united", 5, 2, 3, 16, 12, "WDWLW"),
    row("tottenham-hotspur", 5, 1, 4, 17, 14, "LWWLW"),
    row("aston-villa", 4, 3, 3, 14, 12, "DWDLW"),
    row("brighton", 4, 3, 3, 15, 14, "WDDWL"),
    row("crystal-palace", 4, 2, 4, 12, 12, "LWDWL"),
    row("bournemouth", 4, 2, 4, 14, 15, "WLLWD"),
    row("brentford", 4, 1, 5, 15, 17, "LWLWL"),
    row("everton", 3, 4, 3, 11, 12, "DDWLD"),
    row("manchester-united", 3, 3, 4, 13, 16, "LDWLD"),
    row("fulham", 3, 3, 4, 12, 15, "DLWDL"),
    row("sunderland", 3, 2, 5, 10, 15, "LLWDL"),
    row("west-ham-united", 3, 1, 6, 11, 19, "LLWLL"),
    row("nottingham-forest", 2, 3, 5, 9, 16, "DLLWL"),
    row("leeds-united", 2, 2, 6, 10, 20, "LLDLW"),
    row("wolverhampton-wanderers", 1, 3, 6, 8, 20, "LDLLD"),
    row("burnley", 1, 2, 7, 7, 22, "LLLDL"),
  ],

  "la-liga": [
    row("barcelona", 8, 1, 1, 28, 9, "WWWDW"),
    row("real-madrid", 7, 2, 1, 24, 10, "WDWWW"),
    row("villarreal", 6, 2, 2, 19, 11, "WWDLW"),
    row("atletico-madrid", 6, 2, 2, 18, 10, "WDWWD"),
    row("real-betis", 5, 3, 2, 17, 12, "DWWDL"),
    row("athletic-club", 5, 2, 3, 15, 11, "WLWDW"),
    row("real-sociedad", 5, 1, 4, 16, 14, "LWWLW"),
    row("sevilla", 4, 3, 3, 14, 13, "DWLDW"),
    row("celta-vigo", 4, 2, 4, 15, 15, "WLDWL"),
    row("osasuna", 4, 2, 4, 11, 12, "LWDLW"),
    row("getafe", 4, 1, 5, 10, 12, "LWLWL"),
    row("valencia", 3, 4, 3, 12, 13, "DDLWD"),
    row("rayo-vallecano", 3, 3, 4, 11, 13, "DLWDL"),
    row("girona", 3, 3, 4, 12, 16, "LDWLD"),
    row("mallorca", 3, 2, 5, 11, 15, "LLWDL"),
    row("espanyol", 3, 2, 5, 10, 15, "WLLDL"),
    row("alaves", 2, 4, 4, 9, 13, "DLDLD"),
    row("elche", 2, 3, 5, 9, 16, "LDLWL"),
    row("levante", 2, 2, 6, 10, 19, "LLDLW"),
    row("real-oviedo", 1, 3, 6, 6, 18, "LDLLD"),
  ],

  "serie-a": [
    row("inter", 8, 1, 1, 25, 8, "WWWDW"),
    row("napoli", 7, 1, 2, 19, 9, "WWLWW"),
    row("juventus", 6, 3, 1, 18, 9, "DWWDW"),
    row("ac-milan", 6, 2, 2, 17, 10, "WDWLW"),
    row("roma", 6, 1, 3, 15, 9, "WWLWL"),
    row("atalanta", 5, 3, 2, 18, 12, "DWWDW"),
    row("bologna", 5, 2, 3, 16, 12, "WLDWW"),
    row("como", 4, 4, 2, 15, 11, "DDWDW"),
    row("lazio", 4, 3, 3, 14, 12, "WDLDW"),
    row("fiorentina", 4, 2, 4, 14, 15, "LWDWL"),
    row("torino", 3, 4, 3, 11, 12, "DDWLD"),
    row("udinese", 3, 4, 3, 10, 13, "DLDWD"),
    row("genoa", 3, 3, 4, 10, 13, "LDWDL"),
    row("sassuolo", 3, 3, 4, 13, 16, "WLDLD"),
    row("cagliari", 3, 2, 5, 10, 15, "LLWDL"),
    row("parma", 2, 4, 4, 9, 14, "DLDLD"),
    row("lecce", 2, 3, 5, 7, 14, "LDLWL"),
    row("cremonese", 2, 2, 6, 9, 18, "LLDLW"),
    row("hellas-verona", 1, 3, 6, 7, 17, "LDLLD"),
    row("pisa", 1, 2, 7, 6, 19, "LLLDL"),
  ],

  bundesliga: [
    row("bayern-munich", 9, 1, 0, 34, 7, "WWWWD"),
    row("borussia-dortmund", 7, 2, 1, 22, 9, "WDWWW"),
    row("rb-leipzig", 6, 2, 2, 20, 12, "WWDLW"),
    row("bayer-leverkusen", 6, 1, 3, 19, 13, "WLWWD"),
    row("stuttgart", 5, 3, 2, 17, 12, "DWWDL"),
    row("eintracht-frankfurt", 5, 2, 3, 20, 16, "WLWDW"),
    row("hoffenheim", 5, 1, 4, 17, 15, "LWWLW"),
    row("freiburg", 4, 3, 3, 13, 12, "DWLDW"),
    row("union-berlin", 4, 2, 4, 12, 13, "WLDWL"),
    row("werder-bremen", 3, 4, 3, 12, 14, "DDLWD"),
    row("mainz-05", 3, 3, 4, 11, 14, "LDWDL"),
    row("borussia-monchengladbach", 3, 3, 4, 13, 17, "DLWLD"),
    row("augsburg", 3, 2, 5, 11, 17, "LLWDL"),
    row("wolfsburg", 2, 4, 4, 12, 16, "DLDLD"),
    row("koln", 2, 3, 5, 10, 17, "LDLWL"),
    row("hamburger-sv", 2, 3, 5, 9, 16, "DLLDW"),
    row("st-pauli", 2, 2, 6, 8, 17, "LLDLW"),
    row("heidenheim", 1, 2, 7, 7, 21, "LLLDL"),
  ],

  "ligue-1": [
    row("paris-saint-germain", 8, 2, 0, 26, 7, "WWDWW"),
    row("marseille", 7, 1, 2, 21, 10, "WWLWW"),
    row("monaco", 6, 2, 2, 20, 12, "WDWLW"),
    row("lyon", 6, 1, 3, 18, 12, "WLWWD"),
    row("lille", 5, 3, 2, 16, 10, "DWWDL"),
    row("lens", 5, 2, 3, 15, 11, "WLWDW"),
    row("nice", 4, 4, 2, 14, 11, "DDWDW"),
    row("strasbourg", 4, 3, 3, 15, 14, "WDLDW"),
    row("rennes", 4, 2, 4, 15, 16, "LWDWL"),
    row("toulouse", 3, 4, 3, 12, 13, "DDWLD"),
    row("brest", 3, 3, 4, 11, 14, "LDWDL"),
    row("lorient", 3, 3, 4, 12, 16, "DLWLD"),
    row("paris-fc", 3, 2, 5, 10, 14, "LLWDL"),
    row("nantes", 2, 4, 4, 9, 14, "DLDLD"),
    row("auxerre", 2, 3, 5, 8, 15, "LDLWL"),
    row("le-havre", 2, 2, 6, 7, 16, "LLDLW"),
    row("angers", 1, 3, 6, 6, 17, "LDLLD"),
    row("metz", 1, 2, 7, 7, 21, "LLLDL"),
  ],
};

// export function getStandingsByLeague(leagueSlug: string) {
//   return standings[leagueSlug] ?? [];
// }
