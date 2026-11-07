"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Users, Target, Star, ArrowUpRight } from "lucide-react";

import { getAllPlayers } from "@/lib/data/players";
import SectionHeading from "@/components/ui/section-heading";

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All Positions");

  const players = getAllPlayers();

  const positions = [
    "All Positions",
    ...Array.from(new Set(players.map((player) => player.position))),
  ];

  const filteredPlayers = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return players.filter((player) => {
      const matchesSearch = [
        player.name,
        player.teamName,
        player.nationality,
        player.position,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm);

      const matchesPosition =
        position === "All Positions" || player.position === position;

      return matchesSearch && matchesPosition;
    });
  }, [players, search, position]);

  return (
    <div className="mb-16 space-y-8">
      {/* Header */}
      <section>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <Users size={25} />
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald-500">
              PLAYER INTELLIGENCE
            </p>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
              Players
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Explore player profiles and performance statistics.
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]">
          <div className="flex items-center gap-3">
            <Users className="text-emerald-500" size={22} />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Players in directory
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {players.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]">
          <div className="flex items-center gap-3">
            <Target className="text-emerald-500" size={22} />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Total goals recorded
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {players.reduce((total, player) => total + player.goals, 0)}
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section>
        <SectionHeading
          title="Player Directory"
          subtitle="Search players by name, club, nationality or position."
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search players..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-[#111C2E] dark:text-white"
            />
          </div>

          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-[#111C2E] dark:text-white"
          >
            {positions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Player Cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Available Players
          </h2>

          <span className="text-sm text-slate-500">
            {filteredPlayers.length} results
          </span>
        </div>

        {filteredPlayers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPlayers.map((player) => (
              <Link
                key={player.id}
                href={`/players/${player.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-[#111C2E]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-lg font-bold text-emerald-500">
                    {player.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-slate-400 transition group-hover:text-emerald-500"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {player.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {player.teamName} · {player.position}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {player.goals}
                    </p>
                    <p className="text-xs text-slate-500">Goals</p>
                  </div>

                  <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {player.assists}
                    </p>
                    <p className="text-xs text-slate-500">Assists</p>
                  </div>

                  <div>
                    <p className="flex items-center gap-1 text-lg font-bold text-amber-500">
                      <Star size={14} />
                      {player.rating}
                    </p>
                    <p className="text-xs text-slate-500">Rating</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700">
            <Users size={30} className="mx-auto text-slate-400" />

            <p className="mt-3 font-semibold text-slate-900 dark:text-white">
              No players found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try another name or position.
            </p>
          </div>
        )}
      </section>

      {/* Sample Data Notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Sample player data
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          Player information and statistics are illustrative frontend data.
          Verified player records will be added during live data integration.
        </p>
      </div>
    </div>
  );
}
