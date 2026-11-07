"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Target,
  TrendingUp,
  ChartNoAxesCombined,
} from "lucide-react";

import { getAllMatches } from "@/lib/data/matches";
import SectionHeading from "@/components/ui/section-heading";
import Link from "next/link";

const markets = ["1X2", "Over 2.5", "GG"];

export default function PredictionsPage() {
  const matches = getAllMatches();
  const [selectedMarket, setSelectedMarket] = useState("1X2");

  return (
    <div className="space-y-7">
      <section>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
            <BrainCircuit size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Prediction Centre
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Explore statistical football predictions and insights.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <BrainCircuit className="mt-1 shrink-0 text-emerald-500" />

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              How MatchIQ predictions work
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              MatchIQ is designed to combine statistical models, historical
              performance and AI-assisted explanations. Probabilities represent
              estimated likelihoods, not guarantees.
            </p>
          </div>
        </div>
      </div>

      <section>
        <SectionHeading
          title="Prediction markets"
          subtitle="Select a market to explore its predictions"
        />

        <div className="flex flex-wrap gap-2">
          {markets.map((market) => (
            <button
              key={market}
              onClick={() => setSelectedMarket(market)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                selectedMarket === market
                  ? "bg-emerald-500 text-[#052E23]"
                  : "border border-slate-200 bg-white text-slate-600 dark:border-[#26364D] dark:bg-[#111C2E] dark:text-slate-300"
              }`}
            >
              {market}
            </button>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title="Available predictions"
          subtitle="Illustrative sample data"
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {matches
            .filter((match) => match.status === "Upcoming")
            .map((match) => {
              let prediction = "";

              if (selectedMarket === "1X2") {
                const { home, draw, away } = match.prediction;

                const highest = Math.max(home, draw, away);

                prediction =
                  highest === home
                    ? `Home win · ${home}%`
                    : highest === draw
                      ? `Draw · ${draw}%`
                      : `Away win · ${away}%`;
              } else if (selectedMarket === "Over 2.5") {
                prediction = `Over 2.5 goals · ${match.over25}%`;
              } else {
                prediction = `Both teams to score · ${match.gg}%`;
              }

              return (
                <Link
                  key={match.id}
                  href={`/matches/${match.slug}`}
                  className=" block"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#26364D] dark:bg-[#111C2E]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-500">
                        {match.league}
                      </span>

                      <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-600">
                        SAMPLE
                      </span>
                    </div>

                    <div className="my-5 flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {match.home}
                      </span>

                      <span className="text-xs font-bold text-slate-400">
                        VS
                      </span>

                      <span className="text-right text-sm font-bold text-slate-800 dark:text-slate-200">
                        {match.away}
                      </span>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#1B2940]">
                      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Target size={15} />
                        {selectedMarket} prediction
                      </div>

                      <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                        {prediction}
                      </p>
                    </div>

                    {selectedMarket === "1X2" && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {[
                          { label: "Home", value: match.prediction.home },
                          { label: "Draw", value: match.prediction.draw },
                          { label: "Away", value: match.prediction.away },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-lg bg-slate-50 p-2 text-center dark:bg-[#1B2940]"
                          >
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {item.value}%
                            </p>
                            <p className="mt-1 text-[10px] text-slate-500">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-[#26364D]">
                      <ChartNoAxesCombined size={15} />
                      <span>Statistical insight demonstration</span>
                      <TrendingUp
                        size={14}
                        className="ml-auto text-emerald-500"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}
