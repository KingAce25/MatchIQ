"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Trophy, ArrowUpRight, Globe2 } from "lucide-react";
import { getAllLeagues } from "@/lib/data/leagues";
import SectionHeading from "@/components/ui/section-heading";

export default function LeaguesPage() {
  const leagues = getAllLeagues();
  const [search, setSearch] = useState("");

  const filteredLeagues = leagues.filter((league) =>
    `${league.name} ${league.country}`
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <Trophy size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
              Competitions
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Explore football leagues and competitions around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search leagues or countries..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-800 dark:bg-[#111C2E] dark:text-white"
        />
      </div>

      {/* Competition List */}
      <section>
        <SectionHeading
          title="Available Competitions"
          subtitle={`${filteredLeagues.length} competitions found`}
        />

        {filteredLeagues.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredLeagues.map((league) => (
              <Link
                key={league.slug}
                href={`/leagues/${league.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-[#111C2E]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Trophy size={24} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-400 transition group-hover:text-emerald-500"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {league.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Globe2 size={15} />
                  {league.country}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-500">Season</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {league.season}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">Teams</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {league.teamSlugs.length}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <Trophy size={30} className="mx-auto text-slate-400" />

            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
              No competitions found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try another league name or country.
            </p>
          </div>
        )}
      </section>

      <p className="text-xs text-slate-500">
        Competition information currently uses MatchIQ sample data.
      </p>
    </div>
  );
}
