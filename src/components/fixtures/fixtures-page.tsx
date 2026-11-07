"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Search,
  SlidersHorizontal,
  Clock3,
  Shield,
} from "lucide-react";

import { getAllMatches } from "@/lib/data/matches";
import SectionHeading from "@/components/ui/section-heading";
import StatusBadge from "@/components/ui/status-badge";

export default function FixturesPage() {
  const matches = useMemo(() => getAllMatches(), []);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [search, setSearch] = useState("");

  const leagues = useMemo(
    () => ["All", ...Array.from(new Set(matches.map((match) => match.league)))],
    [matches],
  );

  const filteredMatches = useMemo(() => {
    const term = search.toLowerCase().trim();

    return matches.filter((match) => {
      const dateMatch = selectedDate === "All" || match.date === selectedDate;

      const leagueMatch =
        selectedLeague === "All" || match.league === selectedLeague;

      const searchMatch =
        match.home.toLowerCase().includes(term) ||
        match.away.toLowerCase().includes(term);

      return dateMatch && leagueMatch && searchMatch;
    });
  }, [matches, selectedDate, selectedLeague, search]);

  return (
    <div className="space-y-7">
      <section>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
            <CalendarDays size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Football Fixtures
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Browse matches and upcoming football action.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {["Yesterday", "Today", "Tomorrow"].map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`rounded-xl border p-4 text-sm font-semibold transition ${
              selectedDate === date
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                : "border-slate-200 bg-white text-slate-600 dark:border-[#26364D] dark:bg-[#111C2E] dark:text-slate-300"
            }`}
          >
            {date}
          </button>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#26364D] dark:bg-[#111C2E] sm:p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 dark:border-[#26364D]">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams..."
              className="w-full bg-transparent py-3 text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 dark:border-[#26364D]">
            <SlidersHorizontal size={17} className="text-slate-400" />

            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none dark:text-white dark:scheme:dark"
            >
              {leagues.map((league) => (
                <option
                  key={league}
                  value={league}
                  className="bg-white text-slate-900 dark:bg-[#111C2E] dark:text-white"
                >
                  {league}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          title="Match schedule"
          subtitle={`${filteredMatches.length} demonstration matches`}
        />

        <div className="space-y-3">
          {filteredMatches.map((match) => (
            <Link
              key={match.id}
              href={`/matches/${match.slug}`}
              className="block"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#26364D] dark:bg-[#111C2E] sm:p-5">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {match.league}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {match.country}
                    </p>
                  </div>

                  <StatusBadge status={match.status} />
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${match.homeColor} text-white`}
                    >
                      <Shield size={20} />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 sm:text-sm">
                      {match.home}
                    </span>
                  </div>

                  <div className="text-center">
                    {match.status !== "Upcoming" ? (
                      <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {match.homeScore} - {match.awayScore}
                      </p>
                    ) : (
                      <p className="text-sm font-bold text-slate-400">VS</p>
                    )}

                    <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-slate-500">
                      <Clock3 size={11} />
                      {match.time}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 sm:gap-3">
                    <span className="text-right text-xs font-semibold text-slate-800 dark:text-slate-200 sm:text-sm">
                      {match.away}
                    </span>
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${match.awayColor} text-white`}
                    >
                      <Shield size={20} />
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 dark:border-[#26364D]">
                  <p className="text-xs text-slate-500">
                    Match analysis and prediction data will appear here.
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {filteredMatches.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
              <CalendarDays className="mx-auto mb-3 text-slate-400" />
              <p className="font-semibold">No matches found</p>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your filters or search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
