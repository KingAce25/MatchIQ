import { teams } from "@/data/teams";

export type Player = {
  id: number;
  slug: string;
  name: string;
  age: number;
  nationality: string;
  position: string;
  teamSlug: string;
  teamName: string;
  shirtNumber: number;
  appearances: number;
  goals: number;
  assists: number;
  rating: number;
  image?: string;
  description: string;
};

type PositionCode =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "DM"
  | "CM"
  | "AM"
  | "LW"
  | "RW"
  | "ST";

// [name, nationality, position, shirt number, birth year]
type Seed = [string, string, PositionCode, number, number];

const positionNames: Record<PositionCode, string> = {
  GK: "Goalkeeper",
  CB: "Centre-Back",
  LB: "Left-Back",
  RB: "Right-Back",
  DM: "Defensive Midfielder",
  CM: "Central Midfielder",
  AM: "Attacking Midfielder",
  LW: "Left Winger",
  RW: "Right Winger",
  ST: "Striker",
};

const group = (code: PositionCode) =>
  code === "GK"
    ? "GK"
    : ["CB", "LB", "RB"].includes(code)
      ? "DF"
      : ["DM", "CM", "AM"].includes(code)
        ? "MF"
        : "FW";

const SEASON_YEAR = 2026;

// Your original four players, kept exactly as they were
const originalPlayers: Player[] = [
  {
    id: 1,
    slug: "bukayo-saka",
    name: "Bukayo Saka",
    age: 25,
    nationality: "England",
    position: "Right Winger",
    teamSlug: "arsenal",
    teamName: "Arsenal",
    shirtNumber: 7,
    appearances: 28,
    goals: 12,
    assists: 9,
    rating: 8.2,
    description:
      "An attacking player known for creativity, pace and chance creation.",
  },
  {
    id: 2,
    slug: "cole-palmer",
    name: "Cole Palmer",
    age: 24,
    nationality: "England",
    position: "Attacking Midfielder",
    teamSlug: "chelsea",
    teamName: "Chelsea",
    shirtNumber: 10,
    appearances: 27,
    goals: 16,
    assists: 8,
    rating: 8.5,
    description:
      "An attacking midfielder known for technical quality and goal contributions.",
  },
  {
    id: 3,
    slug: "erling-haaland",
    name: "Erling Haaland",
    age: 26,
    nationality: "Norway",
    position: "Striker",
    teamSlug: "manchester-city",
    teamName: "Manchester City",
    shirtNumber: 9,
    appearances: 26,
    goals: 21,
    assists: 4,
    rating: 8.7,
    description:
      "A powerful striker known for movement, finishing and goal scoring.",
  },
  {
    id: 4,
    slug: "mohamed-salah",
    name: "Mohamed Salah",
    age: 34,
    nationality: "Egypt",
    position: "Right Winger",
    teamSlug: "liverpool",
    teamName: "Liverpool",
    shirtNumber: 11,
    appearances: 25,
    goals: 15,
    assists: 7,
    rating: 8.4,
    description:
      "An experienced forward known for pace, movement and finishing.",
  },
];

const seeds: Record<string, Seed[]> = {
  // ---------- Premier League ----------
  arsenal: [
    ["Martin Ødegaard", "Norway", "AM", 8, 1998],
    ["William Saliba", "France", "CB", 2, 2001],
    ["David Raya", "Spain", "GK", 22, 1995],
  ],
  chelsea: [
    ["Enzo Fernández", "Argentina", "CM", 8, 2001],
    ["Reece James", "England", "RB", 24, 2000],
    ["Robert Sánchez", "Spain", "GK", 1, 1997],
  ],
  "manchester-city": [
    ["Phil Foden", "England", "AM", 47, 2000],
    ["Rodri", "Spain", "DM", 16, 1996],
    ["Rúben Dias", "Portugal", "CB", 3, 1997],
  ],
  liverpool: [
    ["Virgil van Dijk", "Netherlands", "CB", 4, 1991],
    ["Alexis Mac Allister", "Argentina", "CM", 10, 1998],
    ["Alisson Becker", "Brazil", "GK", 1, 1992],
  ],
  "aston-villa": [
    ["Ollie Watkins", "England", "ST", 11, 1995],
    ["Morgan Rogers", "England", "AM", 27, 2002],
    ["Youri Tielemans", "Belgium", "CM", 8, 1997],
    ["Emiliano Martínez", "Argentina", "GK", 23, 1992],
  ],
  bournemouth: [
    ["Antoine Semenyo", "Ghana", "RW", 24, 2000],
    ["Evanilson", "Brazil", "ST", 9, 1999],
    ["Justin Kluivert", "Netherlands", "AM", 19, 1999],
    ["Illia Zabarnyi", "Ukraine", "CB", 27, 2002],
  ],
  brentford: [
    ["Igor Thiago", "Brazil", "ST", 9, 2001],
    ["Mikkel Damsgaard", "Denmark", "AM", 24, 2000],
    ["Nathan Collins", "Ireland", "CB", 22, 2001],
    ["Caoimhín Kelleher", "Ireland", "GK", 1, 1998],
  ],
  brighton: [
    ["Kaoru Mitoma", "Japan", "LW", 22, 1997],
    ["Georginio Rutter", "France", "AM", 10, 2002],
    ["Jan Paul van Hecke", "Netherlands", "CB", 29, 2000],
    ["Bart Verbruggen", "Netherlands", "GK", 1, 2002],
  ],
  burnley: [
    ["Lyle Foster", "South Africa", "ST", 17, 2000],
    ["Josh Cullen", "Ireland", "CM", 24, 1996],
    ["Maxime Estève", "France", "CB", 5, 2002],
    ["Martin Dúbravka", "Slovakia", "GK", 1, 1989],
  ],
  "crystal-palace": [
    ["Jean-Philippe Mateta", "France", "ST", 14, 1997],
    ["Adam Wharton", "England", "CM", 20, 2004],
    ["Marc Guéhi", "England", "CB", 6, 2000],
    ["Dean Henderson", "England", "GK", 1, 1997],
  ],
  everton: [
    ["Iliman Ndiaye", "Senegal", "RW", 10, 2000],
    ["Idrissa Gueye", "Senegal", "CM", 27, 1989],
    ["Jarrad Branthwaite", "England", "CB", 32, 2002],
    ["Jordan Pickford", "England", "GK", 1, 1994],
  ],
  fulham: [
    ["Raúl Jiménez", "Mexico", "ST", 7, 1991],
    ["Emile Smith Rowe", "England", "AM", 32, 2000],
    ["Antonee Robinson", "United States", "LB", 33, 1997],
    ["Bernd Leno", "Germany", "GK", 17, 1992],
  ],
  "leeds-united": [
    ["Dominic Calvert-Lewin", "England", "ST", 9, 1997],
    ["Daniel James", "Wales", "RW", 7, 1997],
    ["Ethan Ampadu", "Wales", "DM", 4, 2000],
    ["Joe Rodon", "Wales", "CB", 6, 1997],
  ],
  "manchester-united": [
    ["Bruno Fernandes", "Portugal", "AM", 8, 1994],
    ["Bryan Mbeumo", "Cameroon", "RW", 19, 1999],
    ["Matheus Cunha", "Brazil", "AM", 10, 1999],
    ["Lisandro Martínez", "Argentina", "CB", 6, 1998],
  ],
  "newcastle-united": [
    ["Anthony Gordon", "England", "LW", 10, 2001],
    ["Bruno Guimarães", "Brazil", "CM", 39, 1997],
    ["Sven Botman", "Netherlands", "CB", 4, 2000],
    ["Nick Pope", "England", "GK", 22, 1992],
  ],
  "nottingham-forest": [
    ["Morgan Gibbs-White", "England", "AM", 10, 2000],
    ["Chris Wood", "New Zealand", "ST", 11, 1991],
    ["Murillo", "Brazil", "CB", 5, 2002],
    ["Matz Sels", "Belgium", "GK", 26, 1992],
  ],
  sunderland: [
    ["Granit Xhaka", "Switzerland", "CM", 34, 1992],
    ["Wilson Isidor", "France", "ST", 18, 2000],
    ["Habib Diarra", "Senegal", "CM", 19, 2003],
    ["Robin Roefs", "Netherlands", "GK", 22, 2003],
  ],
  "tottenham-hotspur": [
    ["Dominic Solanke", "England", "ST", 19, 1997],
    ["James Maddison", "England", "AM", 10, 1996],
    ["Cristian Romero", "Argentina", "CB", 17, 1998],
    ["Guglielmo Vicario", "Italy", "GK", 1, 1996],
  ],
  "west-ham-united": [
    ["Jarrod Bowen", "England", "RW", 20, 1996],
    ["Lucas Paquetá", "Brazil", "AM", 10, 1997],
    ["Konstantinos Mavropanos", "Greece", "CB", 15, 1997],
    ["Alphonse Areola", "France", "GK", 23, 1993],
  ],
  "wolverhampton-wanderers": [
    ["João Gomes", "Brazil", "CM", 8, 2001],
    ["Hwang Hee-chan", "South Korea", "RW", 11, 1996],
    ["Toti Gomes", "Portugal", "CB", 24, 1999],
    ["José Sá", "Portugal", "GK", 1, 1993],
  ],

  // ---------- La Liga ----------
  alaves: [
    ["Carlos Vicente", "Spain", "RW", 21, 1999],
    ["Antonio Blanco", "Spain", "DM", 6, 2000],
    ["Abdel Abqar", "Morocco", "CB", 15, 1999],
    ["Antonio Sivera", "Spain", "GK", 1, 1996],
  ],
  "athletic-club": [
    ["Nico Williams", "Spain", "LW", 10, 2002],
    ["Iñaki Williams", "Ghana", "RW", 9, 1994],
    ["Oihan Sancet", "Spain", "AM", 8, 2000],
    ["Unai Simón", "Spain", "GK", 1, 1997],
  ],
  "atletico-madrid": [
    ["Antoine Griezmann", "France", "ST", 7, 1991],
    ["Julián Álvarez", "Argentina", "ST", 19, 2000],
    ["Koke", "Spain", "CM", 6, 1992],
    ["Jan Oblak", "Slovenia", "GK", 13, 1993],
  ],
  barcelona: [
    ["Lamine Yamal", "Spain", "RW", 10, 2007],
    ["Pedri", "Spain", "CM", 8, 2002],
    ["Robert Lewandowski", "Poland", "ST", 9, 1988],
    ["Raphinha", "Brazil", "LW", 11, 1996],
  ],
  "celta-vigo": [
    ["Iago Aspas", "Spain", "ST", 10, 1987],
    ["Borja Iglesias", "Spain", "ST", 7, 1993],
    ["Ilaix Moriba", "Guinea", "CM", 6, 2003],
    ["Marcos Alonso", "Spain", "LB", 20, 1990],
  ],
  elche: [
    ["Álvaro Rodríguez", "Uruguay", "ST", 9, 2004],
    ["Aleix Febas", "Spain", "AM", 10, 1996],
    ["Pedro Bigas", "Spain", "CB", 6, 1990],
    ["Matías Dituro", "Argentina", "GK", 13, 1987],
  ],
  espanyol: [
    ["Javi Puado", "Spain", "LW", 7, 1998],
    ["Pol Lozano", "Spain", "CM", 4, 1999],
    ["Fernando Calero", "Spain", "CB", 5, 1995],
    ["Marko Dmitrović", "Serbia", "GK", 1, 1992],
  ],
  getafe: [
    ["Borja Mayoral", "Spain", "ST", 19, 1997],
    ["Mauro Arambarri", "Uruguay", "CM", 8, 1995],
    ["Djené Dakonam", "Togo", "CB", 2, 1991],
    ["David Soria", "Spain", "GK", 13, 1993],
  ],
  girona: [
    ["Viktor Tsygankov", "Ukraine", "RW", 8, 1997],
    ["Donny van de Beek", "Netherlands", "CM", 6, 1997],
    ["Arnau Martínez", "Spain", "RB", 4, 2003],
    ["Paulo Gazzaniga", "Argentina", "GK", 13, 1992],
  ],
  levante: [
    ["Iván Romero", "Spain", "ST", 9, 2000],
    ["José Luis Morales", "Spain", "RW", 11, 1987],
    ["Unai Elgezabal", "Spain", "CB", 6, 1993],
    ["Karl Hein", "Estonia", "GK", 1, 2002],
  ],
  mallorca: [
    ["Vedat Muriqi", "Kosovo", "ST", 7, 1994],
    ["Dani Rodríguez", "Spain", "AM", 14, 1988],
    ["Antonio Raíllo", "Spain", "CB", 21, 1991],
    ["Leo Román", "Spain", "GK", 13, 1999],
  ],
  osasuna: [
    ["Ante Budimir", "Croatia", "ST", 17, 1991],
    ["Aimar Oroz", "Spain", "AM", 10, 2001],
    ["Alejandro Catena", "Spain", "CB", 24, 1994],
    ["Sergio Herrera", "Spain", "GK", 1, 1993],
  ],
  "rayo-vallecano": [
    ["Isi Palazón", "Spain", "RW", 7, 1994],
    ["Unai López", "Spain", "CM", 17, 1995],
    ["Florian Lejeune", "France", "CB", 24, 1991],
    ["Augusto Batalla", "Argentina", "GK", 13, 1996],
  ],
  "real-betis": [
    ["Antony", "Brazil", "RW", 7, 2000],
    ["Isco", "Spain", "AM", 22, 1992],
    ["Pablo Fornals", "Spain", "AM", 8, 1996],
    ["Marc Bartra", "Spain", "CB", 5, 1991],
  ],
  "real-madrid": [
    ["Kylian Mbappé", "France", "ST", 10, 1998],
    ["Vinícius Júnior", "Brazil", "LW", 7, 2000],
    ["Jude Bellingham", "England", "AM", 5, 2003],
    ["Thibaut Courtois", "Belgium", "GK", 1, 1992],
  ],
  "real-oviedo": [
    ["Santi Cazorla", "Spain", "AM", 8, 1984],
    ["Salomón Rondón", "Venezuela", "ST", 23, 1989],
    ["David Costas", "Spain", "CB", 5, 1995],
    ["Aarón Escandell", "Spain", "GK", 13, 1995],
  ],
  "real-sociedad": [
    ["Mikel Oyarzabal", "Spain", "LW", 10, 1997],
    ["Takefusa Kubo", "Japan", "RW", 14, 2001],
    ["Brais Méndez", "Spain", "AM", 23, 1997],
    ["Álex Remiro", "Spain", "GK", 1, 1995],
  ],
  sevilla: [
    ["Isaac Romero", "Spain", "ST", 7, 2000],
    ["Dodi Lukébakio", "Belgium", "RW", 11, 1997],
    ["Nemanja Gudelj", "Serbia", "DM", 6, 1991],
    ["Ørjan Nyland", "Norway", "GK", 13, 1990],
  ],
  valencia: [
    ["Hugo Duro", "Spain", "ST", 9, 1999],
    ["Diego López", "Spain", "RW", 16, 2002],
    ["Dimitri Foulquier", "France", "RB", 20, 1993],
    ["Stole Dimitrievski", "North Macedonia", "GK", 1, 1993],
  ],
  villarreal: [
    ["Alexander Sørloth", "Norway", "ST", 9, 1995],
    ["Ayoze Pérez", "Spain", "AM", 22, 1993],
    ["Santi Comesaña", "Spain", "CM", 14, 1996],
    ["Luiz Júnior", "Brazil", "GK", 1, 2001],
  ],

  // ---------- Serie A ----------
  atalanta: [
    ["Ademola Lookman", "Nigeria", "LW", 11, 1997],
    ["Charles De Ketelaere", "Belgium", "AM", 17, 2001],
    ["Marten de Roon", "Netherlands", "DM", 15, 1991],
    ["Marco Carnesecchi", "Italy", "GK", 29, 2000],
  ],
  bologna: [
    ["Riccardo Orsolini", "Italy", "RW", 7, 1997],
    ["Lewis Ferguson", "Scotland", "CM", 19, 1999],
    ["Jhon Lucumí", "Colombia", "CB", 26, 1998],
    ["Łukasz Skorupski", "Poland", "GK", 28, 1991],
  ],
  cagliari: [
    ["Sebastiano Esposito", "Italy", "ST", 94, 2002],
    ["Gianluca Gaetano", "Italy", "AM", 70, 2000],
    ["Yerry Mina", "Colombia", "CB", 26, 1994],
    ["Elia Caprile", "Italy", "GK", 1, 2001],
  ],
  como: [
    ["Nico Paz", "Argentina", "AM", 10, 2004],
    ["Assane Diao", "Spain", "RW", 17, 2005],
    ["Lucas Da Cunha", "France", "CM", 33, 2001],
    ["Jean Butez", "France", "GK", 1, 1994],
  ],
  cremonese: [
    ["Jamie Vardy", "England", "ST", 10, 1987],
    ["Federico Bonazzoli", "Italy", "ST", 90, 1997],
    ["Jari Vandeputte", "Belgium", "RW", 7, 1996],
    ["Emil Audero", "Italy", "GK", 1, 1997],
  ],
  fiorentina: [
    ["Moise Kean", "Italy", "ST", 20, 2000],
    ["Albert Guðmundsson", "Iceland", "AM", 10, 1997],
    ["Dodô", "Brazil", "RB", 2, 1998],
    ["David de Gea", "Spain", "GK", 43, 1990],
  ],
  genoa: [
    ["Vitinha", "Portugal", "ST", 9, 2000],
    ["Morten Frendrup", "Denmark", "CM", 32, 2001],
    ["Koni De Winter", "Belgium", "CB", 4, 2002],
    ["Justin Bijlow", "Netherlands", "GK", 1, 1998],
  ],
  "hellas-verona": [
    ["Daniel Mosquera", "Colombia", "ST", 19, 2001],
    ["Suat Serdar", "Germany", "CM", 8, 1997],
    ["Paweł Dawidowicz", "Poland", "CB", 27, 1995],
    ["Lorenzo Montipò", "Italy", "GK", 1, 1996],
  ],
  inter: [
    ["Lautaro Martínez", "Argentina", "ST", 10, 1997],
    ["Nicolò Barella", "Italy", "CM", 23, 1997],
    ["Alessandro Bastoni", "Italy", "CB", 95, 1999],
    ["Yann Sommer", "Switzerland", "GK", 1, 1988],
  ],
  juventus: [
    ["Dušan Vlahović", "Serbia", "ST", 9, 2000],
    ["Kenan Yıldız", "Turkey", "LW", 10, 2005],
    ["Manuel Locatelli", "Italy", "DM", 5, 1998],
    ["Gleison Bremer", "Brazil", "CB", 3, 1997],
  ],
  lazio: [
    ["Mattia Zaccagni", "Italy", "LW", 20, 1995],
    ["Pedro", "Spain", "RW", 9, 1987],
    ["Nicolò Rovella", "Italy", "DM", 6, 2001],
    ["Ivan Provedel", "Italy", "GK", 94, 1994],
  ],
  lecce: [
    ["Nikola Krstović", "Montenegro", "ST", 9, 2000],
    ["Lameck Banda", "Zambia", "RW", 22, 2001],
    ["Federico Baschirotto", "Italy", "CB", 6, 1996],
    ["Wladimiro Falcone", "Italy", "GK", 30, 1995],
  ],
  "ac-milan": [
    ["Rafael Leão", "Portugal", "LW", 10, 1999],
    ["Christian Pulisic", "United States", "RW", 11, 1998],
    ["Luka Modrić", "Croatia", "CM", 14, 1985],
    ["Mike Maignan", "France", "GK", 16, 1995],
  ],
  napoli: [
    ["Kevin De Bruyne", "Belgium", "AM", 11, 1991],
    ["Scott McTominay", "Scotland", "CM", 8, 1996],
    ["Alessandro Buongiorno", "Italy", "CB", 4, 1999],
    ["Alex Meret", "Italy", "GK", 1, 1997],
  ],
  parma: [
    ["Mateo Pellegrino", "Argentina", "ST", 32, 2001],
    ["Adrián Bernabé", "Spain", "CM", 8, 2001],
    ["Matteo Cancellieri", "Italy", "RW", 22, 2002],
    ["Zion Suzuki", "Japan", "GK", 31, 2002],
  ],
  pisa: [
    ["Stefano Moreo", "Italy", "ST", 32, 1993],
    ["Marius Marin", "Romania", "CM", 6, 1998],
    ["Arturo Calabresi", "Italy", "CB", 28, 1996],
    ["Simone Scuffet", "Italy", "GK", 1, 1996],
  ],
  roma: [
    ["Paulo Dybala", "Argentina", "AM", 21, 1993],
    ["Lorenzo Pellegrini", "Italy", "AM", 7, 1996],
    ["Gianluca Mancini", "Italy", "CB", 23, 1996],
    ["Mile Svilar", "Serbia", "GK", 99, 1999],
  ],
  sassuolo: [
    ["Domenico Berardi", "Italy", "RW", 10, 1994],
    ["Armand Laurienté", "France", "LW", 45, 1998],
    ["Kristian Thorstvedt", "Norway", "CM", 42, 1999],
    ["Andrea Consigli", "Italy", "GK", 47, 1987],
  ],
  torino: [
    ["Duván Zapata", "Colombia", "ST", 91, 1991],
    ["Che Adams", "Scotland", "ST", 9, 1996],
    ["Ivan Ilić", "Serbia", "CM", 8, 2001],
    ["Vanja Milinković-Savić", "Serbia", "GK", 32, 1997],
  ],
  udinese: [
    ["Lorenzo Lucca", "Italy", "ST", 17, 2000],
    ["Florian Thauvin", "France", "AM", 10, 1993],
    ["Jesper Karlström", "Sweden", "CM", 8, 1995],
    ["Maduka Okoye", "Nigeria", "GK", 40, 1999],
  ],

  // ---------- Bundesliga ----------
  augsburg: [
    ["Phillip Tietz", "Germany", "ST", 21, 1997],
    ["Arne Maier", "Germany", "CM", 10, 1999],
    ["Jeffrey Gouweleeuw", "Netherlands", "CB", 6, 1991],
    ["Finn Dahmen", "Germany", "GK", 1, 1998],
  ],
  "bayer-leverkusen": [
    ["Patrik Schick", "Czech Republic", "ST", 14, 1996],
    ["Alejandro Grimaldo", "Spain", "LB", 20, 1995],
    ["Exequiel Palacios", "Argentina", "CM", 25, 1998],
    ["Jarell Quansah", "England", "CB", 4, 2003],
  ],
  "bayern-munich": [
    ["Harry Kane", "England", "ST", 9, 1993],
    ["Jamal Musiala", "Germany", "AM", 42, 2003],
    ["Joshua Kimmich", "Germany", "DM", 6, 1995],
    ["Manuel Neuer", "Germany", "GK", 1, 1986],
  ],
  "borussia-dortmund": [
    ["Serhou Guirassy", "Guinea", "ST", 9, 1996],
    ["Julian Brandt", "Germany", "AM", 10, 1996],
    ["Nico Schlotterbeck", "Germany", "CB", 4, 1999],
    ["Gregor Kobel", "Switzerland", "GK", 1, 1997],
  ],
  "borussia-monchengladbach": [
    ["Tim Kleindienst", "Germany", "ST", 11, 1995],
    ["Franck Honorat", "France", "RW", 9, 1996],
    ["Rocco Reitz", "Germany", "CM", 27, 2002],
    ["Moritz Nicolas", "Germany", "GK", 33, 1997],
  ],
  "eintracht-frankfurt": [
    ["Jonathan Burkardt", "Germany", "ST", 9, 2000],
    ["Mario Götze", "Germany", "AM", 27, 1992],
    ["Robin Koch", "Germany", "CB", 4, 1996],
    ["Kevin Trapp", "Germany", "GK", 1, 1990],
  ],
  freiburg: [
    ["Vincenzo Grifo", "Italy", "RW", 32, 1993],
    ["Maximilian Eggestein", "Germany", "CM", 8, 1996],
    ["Matthias Ginter", "Germany", "CB", 28, 1994],
    ["Noah Atubolu", "Germany", "GK", 1, 2002],
  ],
  "hamburger-sv": [
    ["Robert Glatzel", "Germany", "ST", 9, 1994],
    ["Fábio Vieira", "Portugal", "AM", 20, 2000],
    ["Miro Muheim", "Switzerland", "LB", 28, 1998],
    ["Daniel Heuer Fernandes", "Germany", "GK", 1, 1992],
  ],
  heidenheim: [
    ["Marvin Pieringer", "Germany", "ST", 11, 1999],
    ["Jan-Niklas Beste", "Germany", "LB", 37, 1999],
    ["Patrick Mainka", "Germany", "CB", 6, 1994],
    ["Kevin Müller", "Germany", "GK", 1, 1991],
  ],
  hoffenheim: [
    ["Andrej Kramarić", "Croatia", "ST", 27, 1991],
    ["Wout Weghorst", "Netherlands", "ST", 9, 1992],
    ["Grischa Prömel", "Germany", "CM", 6, 1995],
    ["Oliver Baumann", "Germany", "GK", 1, 1990],
  ],
  koln: [
    ["Said El Mala", "Germany", "LW", 11, 2006],
    ["Ragnar Ache", "Germany", "ST", 9, 1998],
    ["Eric Martel", "Germany", "DM", 6, 2002],
    ["Marvin Schwäbe", "Germany", "GK", 1, 1995],
  ],
  "mainz-05": [
    ["Nadiem Amiri", "Germany", "AM", 7, 1996],
    ["Armindo Sieb", "Germany", "ST", 11, 2003],
    ["Stefan Bell", "Germany", "CB", 16, 1991],
    ["Robin Zentner", "Germany", "GK", 27, 1994],
  ],
  "rb-leipzig": [
    ["Yan Diomande", "Ivory Coast", "RW", 49, 2006],
    ["Christoph Baumgartner", "Austria", "AM", 14, 1999],
    ["Willi Orbán", "Hungary", "CB", 4, 1992],
    ["Péter Gulácsi", "Hungary", "GK", 1, 1990],
  ],
  "st-pauli": [
    ["Danel Sinani", "Luxembourg", "AM", 10, 1997],
    ["Johannes Eggestein", "Germany", "ST", 7, 1998],
    ["Hauke Wahl", "Germany", "CB", 5, 1994],
    ["Nikola Vasilj", "Bosnia and Herzegovina", "GK", 22, 1995],
  ],
  stuttgart: [
    ["Deniz Undav", "Germany", "ST", 26, 1996],
    ["Chris Führich", "Germany", "LW", 27, 1998],
    ["Angelo Stiller", "Germany", "DM", 6, 2001],
    ["Alexander Nübel", "Germany", "GK", 33, 1996],
  ],
  "union-berlin": [
    ["Rani Khedira", "Germany", "DM", 8, 1994],
    ["Robin Gosens", "Germany", "LB", 21, 1994],
    ["Danilho Doekhi", "Netherlands", "CB", 5, 1998],
    ["Frederik Rønnow", "Denmark", "GK", 1, 1992],
  ],
  "werder-bremen": [
    ["Marco Grüll", "Austria", "RW", 17, 1998],
    ["Marvin Ducksch", "Germany", "ST", 7, 1994],
    ["Jens Stage", "Denmark", "CM", 6, 1996],
    ["Michael Zetterer", "Germany", "GK", 18, 1995],
  ],
  wolfsburg: [
    ["Jonas Wind", "Denmark", "ST", 23, 1999],
    ["Mattias Svanberg", "Sweden", "CM", 5, 1999],
    ["Maximilian Arnold", "Germany", "CM", 27, 1994],
    ["Kamil Grabara", "Poland", "GK", 1, 1999],
  ],

  // ---------- Ligue 1 ----------
  angers: [
    ["Sidiki Chérif", "France", "ST", 11, 2005],
    ["Himad Abdelli", "Algeria", "AM", 10, 1999],
    ["Ousmane Camara", "France", "CB", 8, 2002],
    ["Yahia Fofana", "France", "GK", 1, 2000],
  ],
  auxerre: [
    ["Lassine Sinayoko", "Mali", "RW", 13, 1999],
    ["Gauthier Hein", "France", "AM", 10, 1996],
    ["Sinaly Diomandé", "Ivory Coast", "CB", 4, 2001],
    ["Donovan Léon", "France", "GK", 1, 1992],
  ],
  brest: [
    ["Ludovic Ajorque", "France", "ST", 9, 1994],
    ["Romain Del Castillo", "France", "RW", 14, 1996],
    ["Brendan Chardonnet", "France", "CB", 5, 1994],
    ["Marco Bizot", "Netherlands", "GK", 40, 1991],
  ],
  "le-havre": [
    ["Issa Soumaré", "France", "RW", 7, 2000],
    ["Antoine Joujou", "France", "AM", 11, 1998],
    ["Christopher Operi", "Italy", "CB", 3, 1997],
    ["Mathieu Gorgelin", "France", "GK", 1, 1990],
  ],
  lens: [
    ["Wesley Saïd", "France", "ST", 9, 1995],
    ["Adrien Thomasson", "France", "CM", 28, 1993],
    ["Facundo Medina", "Argentina", "CB", 14, 1999],
    ["Robin Risser", "France", "GK", 16, 2004],
  ],
  lille: [
    ["Hákon Arnar Haraldsson", "Iceland", "AM", 10, 2003],
    ["Nabil Bentaleb", "Algeria", "CM", 6, 1994],
    ["Bafodé Diakité", "France", "CB", 18, 2001],
    ["Berke Özer", "Turkey", "GK", 1, 2000],
  ],
  lorient: [
    ["Pablo Pagis", "France", "RW", 9, 2000],
    ["Laurent Abergel", "France", "CM", 8, 1993],
    ["Montassar Talbi", "Tunisia", "CB", 5, 1998],
    ["Yvon Mvogo", "Switzerland", "GK", 16, 1994],
  ],
  lyon: [
    ["Alexandre Lacazette", "France", "ST", 10, 1991],
    ["Corentin Tolisso", "France", "CM", 8, 1994],
    ["Malick Fofana", "Belgium", "LW", 11, 2005],
    ["Lucas Perri", "Brazil", "GK", 1, 1997],
  ],
  marseille: [
    ["Mason Greenwood", "England", "RW", 10, 2001],
    ["Pierre-Emerick Aubameyang", "Gabon", "ST", 97, 1989],
    ["Adrien Rabiot", "France", "CM", 25, 1995],
    ["Gerónimo Rulli", "Argentina", "GK", 1, 1992],
  ],
  metz: [
    ["Habib Diallo", "Senegal", "ST", 9, 1995],
    ["Jessy Deminguet", "France", "CM", 8, 1996],
    ["Matthieu Udol", "France", "LB", 3, 1995],
    ["Alexandre Oukidja", "Algeria", "GK", 16, 1988],
  ],
  monaco: [
    ["Takumi Minamino", "Japan", "AM", 18, 1995],
    ["Maghnes Akliouche", "France", "AM", 11, 2002],
    ["Wilfried Singo", "Ivory Coast", "RB", 17, 2000],
    ["Philipp Köhn", "Switzerland", "GK", 16, 1998],
  ],
  nantes: [
    ["Mostafa Mohamed", "Egypt", "ST", 14, 1997],
    ["Matthis Abline", "France", "ST", 9, 2003],
    ["Nicolas Pallois", "France", "CB", 4, 1987],
    ["Anthony Lopes", "Portugal", "GK", 1, 1990],
  ],
  nice: [
    ["Evann Guessand", "France", "ST", 29, 2001],
    ["Morgan Sanson", "France", "CM", 10, 1994],
    ["Jonathan Clauss", "France", "RB", 92, 1992],
    ["Marcin Bułka", "Poland", "GK", 1, 1999],
  ],
  "paris-fc": [
    ["Willem Geubbels", "France", "ST", 9, 2001],
    ["Jonathan Ikoné", "France", "RW", 11, 1998],
    ["Pierre Lees-Melou", "France", "CM", 8, 1993],
    ["Rémy Descamps", "France", "GK", 1, 1996],
  ],
  "paris-saint-germain": [
    ["Ousmane Dembélé", "France", "RW", 10, 1997],
    ["Vitinha", "Portugal", "CM", 17, 2000],
    ["Marquinhos", "Brazil", "CB", 5, 1994],
    ["Lucas Chevalier", "France", "GK", 30, 2001],
  ],
  rennes: [
    ["Esteban Lepaul", "France", "ST", 9, 2000],
    ["Ludovic Blas", "France", "AM", 10, 1997],
    ["Jérémy Jacquet", "France", "CB", 4, 2005],
    ["Brice Samba", "France", "GK", 30, 1994],
  ],
  strasbourg: [
    ["Emanuel Emegha", "Netherlands", "ST", 10, 2003],
    ["Sebastian Nanasi", "Sweden", "LW", 7, 2002],
    ["Joaquín Panichelli", "Argentina", "ST", 9, 2002],
    ["Mike Penders", "Belgium", "GK", 1, 2005],
  ],
  toulouse: [
    ["Frank Magri", "Cameroon", "ST", 9, 1999],
    ["Zakaria Aboukhlal", "Morocco", "RW", 11, 2000],
    ["Charlie Cresswell", "England", "CB", 5, 2002],
    ["Guillaume Restes", "France", "GK", 1, 2005],
  ],
};

// Deterministic pseudo-random number in [0, 1), same on server and client
function rnd(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const usedSlugs = new Set(originalPlayers.map((player) => player.slug));
let nextId = originalPlayers.length + 1;

const generatedPlayers: Player[] = Object.entries(seeds).flatMap(
  ([teamSlug, teamSeeds]) => {
    const team = teams.find((item) => item.slug === teamSlug);
    if (!team) return [];

    return teamSeeds.map(
      ([name, nationality, code, shirtNumber, birthYear]): Player => {
        const id = nextId++;
        const type = group(code);

        const maxGoals = { GK: 0, DF: 2, MF: 4, FW: 8 }[type];
        const maxAssists = { GK: 1, DF: 3, MF: 5, FW: 4 }[type];

        const appearances = 8 + Math.floor(rnd(id * 3) * 3); // 8 to 10
        const goals = Math.floor(rnd(id * 5 + 1) * (maxGoals + 1));
        const assists = Math.floor(rnd(id * 7 + 2) * (maxAssists + 1));
        const rating = Math.min(
          9,
          Number(
            (6.4 + rnd(id * 11 + 3) * 0.9 + (goals + assists) * 0.07).toFixed(
              1,
            ),
          ),
        );

        let slug = slugify(name);
        if (usedSlugs.has(slug)) slug = `${slug}-${teamSlug}`;
        usedSlugs.add(slug);

        return {
          id,
          slug,
          name,
          age: SEASON_YEAR - birthYear,
          nationality,
          position: positionNames[code],
          teamSlug: team.slug,
          teamName: team.name,
          shirtNumber,
          appearances,
          goals,
          assists,
          rating,
          description: `${positionNames[code]} for ${team.name}, representing ${nationality}.`,
        };
      },
    );
  },
);

export const players: Player[] = [...originalPlayers, ...generatedPlayers];
