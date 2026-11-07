"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowUpRight,
  Trophy,
  Shield,
  CalendarDays,
} from "lucide-react";
import { globalSearch } from "@/lib/data/search";

type GlobalSearchProps = {
  autoFocus?: boolean;
  onNavigate?: () => void;
};

export default function GlobalSearch({
  autoFocus = false,
  onNavigate,
}: GlobalSearchProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = useMemo(() => globalSearch(query), [query]);
  const showResults = isOpen && query.trim().length > 0;
  const optionId = (index: number) => `${resultsId}-option-${index}`;

  const closeAndReset = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
    onNavigate?.();
  };

  // Close when clicking anywhere outside the search
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  // Keep the highlighted result visible while using the arrow keys
  useEffect(() => {
    if (!showResults) return;
    document
      .getElementById(optionId(selectedIndex))
      ?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, showResults]);

  const getIcon = (type: string) => {
    switch (type) {
      case "Match":
        return <CalendarDays size={18} />;
      case "Team":
        return <Shield size={18} />;
      case "League":
        return <Trophy size={18} />;
      default:
        return <Search size={18} />;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(0);
      return;
    }

    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setSelectedIndex((current) =>
        current < results.length - 1 ? current + 1 : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setSelectedIndex((current) =>
        current > 0 ? current - 1 : results.length - 1,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const selectedResult = results[selectedIndex] ?? results[0];

      if (selectedResult) {
        router.push(selectedResult.href);
        closeAndReset();
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Search
          size={19}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          autoFocus={autoFocus}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-label="Search MatchIQ"
          aria-expanded={showResults}
          aria-controls={resultsId}
          aria-activedescendant={
            showResults && results.length > 0
              ? optionId(selectedIndex)
              : undefined
          }
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelectedIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search teams, matches, leagues..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-[#26364D] dark:bg-[#111C2E] dark:text-white"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedIndex(0);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showResults && (
        <div
          id={resultsId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(420px,55vh)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-[#111C2E]"
        >
          {results.length > 0 ? (
            <>
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Search Results ({results.length})
              </p>

              <div className="space-y-1">
                {results.map((result, index) => (
                  <Link
                    key={result.id}
                    id={optionId(index)}
                    role="option"
                    aria-selected={selectedIndex === index}
                    href={result.href}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={closeAndReset}
                    className={`flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition ${
                      selectedIndex === index
                        ? "bg-emerald-500/10"
                        : "hover:bg-slate-100 dark:hover:bg-[#1B2940]"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                        {getIcon(result.type)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {result.title}
                        </p>

                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {result.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="hidden rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500 dark:bg-[#1B2940] dark:text-slate-400 sm:inline-block">
                        {result.type}
                      </span>

                      <ArrowUpRight size={16} className="text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-2 hidden border-t border-slate-100 px-3 pt-3 pb-1 text-xs text-slate-400 dark:border-slate-800 sm:block">
                Use ↑ ↓ to navigate · Enter to open · Esc to close
              </div>
            </>
          ) : (
            <div className="px-4 py-10 text-center">
              <Search size={28} className="mx-auto text-slate-400" />

              <p className="mt-3 font-semibold text-slate-900 dark:text-white">
                No results found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try searching for another team, match or league.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
