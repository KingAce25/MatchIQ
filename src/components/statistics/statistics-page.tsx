"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Target,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Goal,
  CalendarDays,
} from "lucide-react";

import {
  getOverviewStats,
  getGoalsTrend,
  getPerformanceStats,
} from "@/lib/data/statistics";

import SectionHeading from "@/components/ui/section-heading";

const icons = [Activity, Goal, TrendingUp, Target];

const periods = ["All Time", "Last 30 Days", "Last 7 Days"];

export default function StatisticsPage() {
  const [period, setPeriod] = useState("All Time");

  const overviewStats = getOverviewStats();
  const goalsTrend = getGoalsTrend();
  const performanceStats = getPerformanceStats();

  // The current dataset has no dates, so these are illustrative
  // views rather than actual date-based filtering.
  const visibleGoals = useMemo(() => {
    if (period === "Last 7 Days") return goalsTrend.slice(-2);
    if (period === "Last 30 Days") return goalsTrend.slice(-4);
    return goalsTrend;
  }, [period, goalsTrend]);

  const maxGoals = Math.max(...visibleGoals.map((item) => item.goals), 1);

  const totalGoals = visibleGoals.reduce(
    (total, item) => total + item.goals,
    0,
  );

  const averageGoals = visibleGoals.length
    ? (totalGoals / visibleGoals.length).toFixed(1)
    : "0.0";

  const highestWeek = visibleGoals.reduce(
    (highest, item) => (item.goals > highest.goals ? item : highest),
    visibleGoals[0],
  );

  return (
    <div className="mb-16 space-y-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <BarChart3 size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
              Statistics
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Football performance and statistical insights.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-[#111C2E] sm:self-auto">
          <CalendarDays size={16} className="text-emerald-500" />

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
          >
            {periods.map((item) => (
              <option
                key={item}
                value={item}
                className="bg-white text-slate-900"
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Overview Cards */}
      <section>
        <SectionHeading
          title="Performance Overview"
          subtitle="Key football metrics from the sample dataset"
        />

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((stat, index) => {
            const Icon = icons[index] ?? Activity;

            return (
              <div
                key={stat.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>

                  <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
                    <Icon size={19} />
                  </div>
                </div>

                <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                  {stat.suffix}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Goals Analysis */}
      <section>
        <SectionHeading
          title="Goals Analysis"
          subtitle="Goals scored across the selected sample matchweeks."
        />

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total goals
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                {totalGoals}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Average per week
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                {averageGoals}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Highest scoring week
              </p>

              <p className="mt-1 text-3xl font-bold text-emerald-500">
                {highestWeek?.week ?? "—"}
              </p>
            </div>
          </div>

          <div className="mt-8 flex h-56 items-end justify-between gap-3 border-b border-slate-100 pb-2 dark:border-slate-800">
            {visibleGoals.map((item) => (
              <div
                key={item.week}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {item.goals}
                </span>

                <div className="flex min-h-0 w-full flex-1 items-end justify-center">
                  <div
                    title={`${item.goals} goals`}
                    className="w-full max-w-14 rounded-t-lg bg-emerald-500 transition-all duration-500 hover:bg-emerald-400"
                    style={{
                      height: `${(item.goals / maxGoals) * 100}%`,
                    }}
                  />
                </div>

                <span className="text-xs text-slate-500">{item.week}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Breakdown */}
      <section>
        <SectionHeading
          title="Performance Breakdown"
          subtitle="Distribution of selected match outcomes."
        />

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {performanceStats.map((stat, index) => (
            <div
              key={stat.category}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111C2E]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {stat.category}
                </p>

                <p className="text-lg font-bold text-emerald-500">
                  {stat.percentage}%
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#1B2940]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 1
                      ? "bg-blue-500"
                      : index === 3
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                  style={{
                    width: `${stat.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-amber-500" />

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Sample statistics
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            All figures currently displayed are illustrative frontend data. The
            period selector changes the sample chart view, not a verified date
            range. These figures will be replaced with verified football
            statistics when live data integration is implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
