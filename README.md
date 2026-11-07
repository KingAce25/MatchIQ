# MatchIQ ⚽

### Football Intelligence & Analytics Platform

MatchIQ is a football intelligence platform designed to provide football fans with match statistics, team and player insights, league information, performance analysis, and data-driven predictions.

The platform focuses on **football analysis first and predictions second**, helping users understand matches through statistics, trends, and analytical insights.

> **Development Status:** Frontend development in progress. Current football records and statistics are illustrative sample data, not verified live football data.

---

## 1. Project Overview

**Project Name:** MatchIQ

**Platform Type:** Football Analytics and Intelligence Platform

**Primary Goal:** Build a modern football analytics platform that combines match information, statistical analysis, team and player profiles, league standings, and prediction insights.

### Core Objectives

- Provide access to football fixtures and match information.
- Display detailed match statistics and analysis.
- Provide data-driven match predictions.
- Allow users to explore teams, players, and competitions.
- Present football statistics through interactive visualizations.
- Support team comparisons.
- Eventually provide personalized features through user accounts.
- Integrate reliable live football data sources.

---

## 2. Technology Stack

| Technology   | Purpose                             |
| ------------ | ----------------------------------- |
| Next.js      | Frontend framework and routing      |
| React        | Component-based user interface      |
| TypeScript   | Type safety                         |
| Tailwind CSS | Styling foundation                  |
| Lucide React | Icons                               |
| Supabase     | Planned database and authentication |
| API-Football | Planned football data provider      |

### Current Development Approach

The project follows a frontend-first development strategy:

1. Plan the user interface and experience.
2. Build the core pages and components.
3. Implement navigation and routing.
4. Build reusable data-access functions.
5. Complete responsive design and frontend testing.
6. Integrate Supabase.
7. Connect live football data.
8. Implement the prediction and analysis engine.

---

## 3. Design System

MatchIQ uses a hybrid design approach combining professional sports analytics interfaces with modern sports-inspired visual elements.

Both dark and light themes are supported.

### Brand Colors

| Color   | Hex Code  | Purpose                   |
| ------- | --------- | ------------------------- |
| Navy    | `#0F172A` | Primary brand color       |
| Emerald | `#10B981` | Primary accent            |
| Blue    | `#3B82F6` | Secondary accent          |
| Amber   | `#F59E0B` | Highlights and indicators |

### Dark Theme

| Element           | Color     |
| ----------------- | --------- |
| Main background   | `#0B1220` |
| Surface           | `#111C2E` |
| Secondary surface | `#1B2940` |

### Light Theme

| Element         | Color     |
| --------------- | --------- |
| Main background | `#F5F7FB` |
| Surface         | `#FFFFFF` |
| Borders         | `#E2E8F0` |

### Interface Principles

- Clean and professional dashboard layout.
- Consistent spacing and typography.
- Reusable cards and UI components.
- Responsive desktop and mobile navigation.
- Clear statistical visualizations.
- Consistent dark and light theme behavior.
- Subtle interactions and transitions.

---

## 4. Project Structure

The current project follows this general structure:

```text
matchiq/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── src/
│   │
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   │
│   │   ├── fixtures/
│   │   │   └── page.tsx
│   │   │
│   │   ├── predictions/
│   │   │   └── page.tsx
│   │   │
│   │   ├── matches/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── teams/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── leagues/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── statistics/
│   │   │   └── page.tsx
│   │   │
│   │   ├── compare/
│   │   │   └── page.tsx
│   │   │
│   │   └── players/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── app-shell.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── dashboard.tsx
│   │   │
│   │   ├── fixtures/
│   │   │   └── fixtures-page.tsx
│   │   │
│   │   ├── predictions/
│   │   │   └── predictions-page.tsx
│   │   │
│   │   ├── matches/
│   │   │   └── match-centre.tsx
│   │   │
│   │   ├── teams/
│   │   │   ├── teams-page.tsx
│   │   │   ├── team-profile.tsx
│   │   │   └── team-comparison.tsx
│   │   │
│   │   ├── leagues/
│   │   │   ├── leagues-page.tsx
│   │   │   └── league-centre.tsx
│   │   │
│   │   ├── statistics/
│   │   │   └── statistics-page.tsx
│   │   │
│   │   ├── players/
│   │   │   ├── players-page.tsx
│   │   │   └── player-profile.tsx
│   │   │
│   │   ├── search/
│   │   │   └── global-search.tsx
│   │   │
│   │   └── ui/
│   │       ├── section-heading.tsx
│   │       └── status-badge.tsx
│   │
│   ├── data/
│   │   ├── matches.ts
│   │   ├── teams.ts
│   │   ├── leagues.ts
│   │   ├── standings.ts
│   │   ├── players.ts
│   │   └── statistics.ts
│   │
│   └── lib/
│       └── data/
│           ├── matches.ts
│           ├── teams.ts
│           ├── leagues.ts
│           ├── standings.ts
│           ├── players.ts
│           ├── statistics.ts
│           ├── team-comparison.ts
│           └── search.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

_This is the intended/current working structure based on the implemented stages. Some folders may contain additional files as development progresses._

---

## 5. Implemented Features

### 5.1 Dashboard

Route: `/`

The main dashboard provides the initial overview of the platform.

Includes:

- Main application layout.
- Dashboard interface.
- Sidebar navigation.
- Theme switching.
- Responsive navigation.
- Dashboard statistics and match-related sections.

### 5.2 Fixtures

Route: `/fixtures`

Provides a fixture listing interface.

Features:

- Match listings.
- Today, Tomorrow, and Yesterday filters.
- Search by team or league.
- Match status indicators.
- Links to individual match centres.

### 5.3 Predictions

Route: `/predictions`

Provides a prediction overview interface.

Supported market categories:

- 1X2.
- Over 2.5 Goals.
- Both Teams To Score (BTTS).

Includes market selection and match-based prediction information.

### 5.4 Match Centre

Route: `/matches/[slug]`

Provides detailed information about an individual match.

Includes:

- Match overview.
- Home, draw, and away probability bars.
- Recent team form.
- Additional prediction markets.
- Head-to-head placeholder section.

Uses internal match slugs for dynamic routing.

### 5.5 Teams Directory

Route: `/teams`

Provides a searchable directory of teams.

Includes:

- Team listings.
- Team search.
- Country and league information.
- Links to individual team profiles.

### 5.6 Team Profiles

Route: `/teams/[slug]`

Includes:

- Team identity and information.
- Stadium details.
- Team statistics.
- Recent form.
- Goals scored and conceded.
- Clean sheets.
- Upcoming fixture information.

### 5.7 League Directory

Route: `/leagues`

Provides a searchable league discovery interface.

Includes:

- League listings.
- Country information.
- Season information.
- Links to league centres.

### 5.8 League Centre

Route: `/leagues/[slug]`

Includes:

- League overview.
- League standings.
- Participating teams.
- Recent results.
- Upcoming fixtures.

### 5.9 Global Search

Integrated into the application shell.

Search categories:

- Matches.
- Teams.
- Leagues.

Includes:

- Search suggestions.
- Result categories.
- Keyboard navigation.
- Arrow key selection.
- Enter to navigate.
- Escape to close.

### 5.10 Statistics

Route: `/statistics`

Includes:

- Overview statistic cards.
- Average goals.
- Home-win percentage.
- BTTS rate.
- Goals trend visualization.
- Performance breakdown.
- Time-period selection.

The current period views use illustrative data rather than verified historical date filtering.

### 5.11 Team Comparison

Route: `/compare`

Allows users to compare two teams.

Includes:

- Team selection.
- Matches played.
- Wins, draws, and losses.
- Goals scored and conceded.
- Clean sheets.
- Recent form.
- Comparative statistical bars.

### 5.12 Player Centre

Routes:

- `/players`
- `/players/bukayo-saka`
- `/players/cole-palmer`
- `/players/erling-haaland`
- `/players/mohamed-salah`
  and 384 more

Includes:

- Player directory.
- Player search.
- Position filtering.
- Player profile pages.
- Club information.
- Appearances.
- Goals.
- Assists.
- Average rating.
- Goals-per-appearance calculation.

---

## 6. Current Sample Data

The frontend currently uses locally defined sample data.

### Teams

- Arsenal.
- Chelsea.
- Manchester City.
- Liverpool.
  and a lot more

### Players

- Bukayo Saka.
- Cole Palmer.
- Erling Haaland.
- Mohamed Salah.
- and 384 more

### League

- Premier League.
- and 6 other

These records are currently used to test the interface, navigation, and data relationships.

**Important:** Player ages, team statistics, league standings, fixture details, match probabilities, and performance values must not be treated as current real-world football information.

They will be replaced or populated through reliable football data integration.

---

## 7. Data Architecture

MatchIQ uses a separation between sample data and data-access functions.

### Sample Data

Located in:

```text
src/data/
```

These files currently hold the locally defined records used by the frontend.

### Data Access Layer

Located in:

```text
src/lib/data/
```

These files provide reusable functions for retrieving and searching records.

Examples:

```ts
getAllMatches();
getMatchBySlug(slug);

getAllTeams();
getTeamBySlug(slug);

getAllLeagues();
getLeagueBySlug(slug);

getAllPlayers();
getPlayerBySlug(slug);

getStandingsByLeague(leagueSlug);
getTeamComparisonData(firstTeamSlug, secondTeamSlug);
```

### Architectural Principle

Page components should retrieve information through the shared data-access layer rather than directly accessing external football APIs.

This will make it easier to replace sample data with Supabase and live football data without rebuilding the entire interface.

---

## 8. Routing Strategy

MatchIQ uses the Next.js App Router.

The main routes are:

| Route             | Purpose           |
| ----------------- | ----------------- |
| `/`               | Dashboard         |
| `/fixtures`       | Fixtures          |
| `/predictions`    | Predictions       |
| `/matches/[slug]` | Match Centre      |
| `/teams`          | Teams Directory   |
| `/teams/[slug]`   | Team Profile      |
| `/leagues`        | Leagues Directory |
| `/leagues/[slug]` | League Centre     |
| `/statistics`     | Statistics        |
| `/compare`        | Team Comparison   |
| `/players`        | Players Directory |
| `/players/[slug]` | Player Profile    |

Dynamic pages use stable internal slugs instead of exposing external provider IDs in URLs.

Invalid records should return a Next.js not-found page.

---

## 9. Planned Database Architecture

The planned database will use Supabase.

Proposed tables:

| Table              | Purpose                       |
| ------------------ | ----------------------------- |
| profiles           | User profile information      |
| competitions       | Football competitions         |
| seasons            | Competition seasons           |
| teams              | Team information              |
| players            | Player information            |
| fixtures           | Match records                 |
| fixture_statistics | Match statistics              |
| team_form          | Team performance history      |
| head_to_head       | Historical team meetings      |
| predictions        | Prediction records            |
| prediction_markets | Individual prediction markets |
| prediction_results | Prediction outcomes           |
| saved_matches      | User-saved matches            |
| favourite_teams    | User favourite teams          |
| model_versions     | Prediction model versions     |
| data_sync_logs     | Data synchronization history  |

### Database Principles

- Use stable internal IDs.
- Store external provider IDs separately.
- Maintain relationships between teams, players, competitions, and fixtures.
- Track data update timestamps.
- Keep prediction records linked to model versions.
- Support future user-specific saved content.

---

## 10. Planned Football Data Integration

The initial planned provider is **API-Football**.

Integration will be evaluated based on:

- Competition coverage.
- Fixture availability.
- Historical statistics.
- Team and player data.
- Rate limits.
- Pricing and usage restrictions.

The integration should use a centralized server-side data layer rather than exposing provider credentials in frontend code.

---

## 11. Planned Prediction System

MatchIQ will use statistical analysis supported by AI-assisted explanations.

### Planned Prediction Markets

- Match Result (1X2).
- Over/Under Goals.
- Both Teams To Score.
- Correct Score.
- Half-Time/Full-Time.
- Corners.
- Cards.

### Planned Analytical Factors

- Recent team form.
- Home and away performance.
- Goals scored and conceded.
- Head-to-head records.
- Player availability, where reliable data exists.
- Competition performance.
- Historical statistical trends.

### Prediction Transparency

Predictions should display:

- Estimated probabilities.
- Confidence indicators.
- Supporting statistical factors.
- Explanation of the prediction.
- Model version or relevant methodology information.

MatchIQ will communicate uncertainty clearly. Predictions must never be presented as guaranteed outcomes.

---

## 12. User Features Planned

The following features are planned for later development:

- User registration.
- User login.
- Personalized dashboard.
- Saved matches.
- Favourite teams.
- Personalized match recommendations.
- User profile management.
- Prediction history.

Public browsing should remain available without requiring registration. Accounts will unlock personalized features.

---

## 13. Development Roadmap

### Completed or Implemented Frontend Stages

- [x] Project initialization.
- [x] Initial dashboard.
- [x] Application shell.
- [x] Dark and light themes.
- [x] Fixtures page.
- [x] Predictions page.
- [x] Match Centre.
- [x] Shared match data layer.
- [x] Team directory.
- [x] Team profiles.
- [x] League directory.
- [x] League Centre.
- [x] Global search.
- [x] Statistics page.
- [x] Team comparison.
- [x] Player directory.
- [x] Player profiles.

### Current Navigation Task

- [ ] Add Players to the sidebar navigation.
- [ ] Verify the Players navigation link.

### Upcoming Frontend Stages

- [ ] Prediction Analysis.
- [ ] User Dashboard and Profile.
- [ ] Login and Registration interfaces.
- [ ] Saved Matches.
- [ ] Favourite Teams.
- [ ] Final responsive design improvements.
- [ ] Frontend-wide testing and cleanup.

### Backend and Integration Stages

- [ ] Supabase project setup.
- [ ] Database schema implementation.
- [ ] Authentication.
- [ ] User profile integration.
- [ ] Live football data integration.
- [ ] Data synchronization.
- [ ] Replace sample data with real records.
- [ ] Prediction engine development.
- [ ] Prediction result tracking.
- [ ] AI-assisted analytical explanations.

---

## 14. Running the Project Locally

### Requirements

Install the following:

- Node.js.
- npm.
- Visual Studio Code or another code editor.

### Installation

Clone the repository or open the existing project folder.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

### Useful Commands

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the application for production.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs the configured linting command, if available in the project scripts.

---

## 15. Development Guidelines

To maintain a clean and scalable project:

1. Use reusable React components.
2. Keep page-specific UI inside appropriate component folders.
3. Keep sample records inside `src/data/`.
4. Keep reusable data-access functions inside `src/lib/data/`.
5. Avoid putting API requests directly inside page components.
6. Use TypeScript types for data structures.
7. Use internal slugs for dynamic routes.
8. Maintain consistent styling across pages.
9. Ensure dark and light themes remain functional.
10. Test each feature before moving to the next development stage.
11. Clearly distinguish sample data from live football information.
12. Protect private API keys and backend credentials.

---

## 16. Project Vision

The long-term goal is to make MatchIQ a comprehensive football intelligence platform where users can:

- Discover football fixtures.
- Explore teams and players.
- Understand league performance.
- Analyze individual matches.
- Compare teams statistically.
- Explore football trends.
- View transparent data-driven predictions.
- Save matches and personalize their experience.

**MatchIQ — Understand the Game Beyond the Score.**
**Developer - King Ace**
