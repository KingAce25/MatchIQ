"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Shield, ArrowUpRight } from "lucide-react";
import { getAllTeams } from "@/lib/data/teams";

// Lowercase and strip accents so "atletico" finds "Atlético"
function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function TeamsPage() {
  const [search, setSearch] = useState("");

  const teams = useMemo(() => getAllTeams(), []);

  const filteredTeams = useMemo(() => {
    const terms = normalize(search).split(/\s+/).filter(Boolean);

    if (terms.length === 0) return teams;

    return teams.filter((team) => {
      const haystack = normalize(
        `${team.name} ${team.shortName} ${team.country} ${team.league}`,
      );
      return terms.every((term) => haystack.includes(term));
    });
  }, [teams, search]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-emerald-500">
          FOOTBALL DIRECTORY
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Teams</h1>

        <p className="mt-2 text-sm text-slate-500">
          Explore clubs, team profiles and performance statistics.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search teams, countries or leagues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-[#26364D] dark:bg-[#111C2E] dark:text-white"
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Teams</h2>

        <span className="text-sm text-slate-500">
          {filteredTeams.length} teams
        </span>
      </div>

      {filteredTeams.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-16">
          {filteredTeams.map((team) => (
            <Link
              key={team.id}
              href={`/teams/${team.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg dark:border-[#26364D] dark:bg-[#111C2E]"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${team.primaryColor}20` }}
                >
                  <Shield size={28} style={{ color: team.primaryColor }} />
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-slate-400 transition group-hover:text-emerald-500"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold">{team.name}</h3>

              <p className="mt-1 text-sm text-slate-500">
                {team.country} · {team.league}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-[#26364D]">
                <span className="text-xs text-slate-500">{team.stadium}</span>

                <span className="text-xs font-semibold text-emerald-500">
                  View Profile
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700">
          <p className="font-medium">No teams found</p>
          <p className="mt-2 text-sm text-slate-500">
            Try searching with another team name.
          </p>
        </div>
      )}
    </div>
  );
}
