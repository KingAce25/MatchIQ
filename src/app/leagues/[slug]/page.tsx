import { Suspense } from "react";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import LeagueCentre from "@/components/leagues/league-centre";
import { getAllLeagues, getLeagueBySlug } from "@/lib/data/leagues";

type LeaguePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllLeagues().map((league) => ({ slug: league.slug }));
}

export default function LeaguePage({ params }: LeaguePageProps) {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="p-6 text-sm text-slate-500">Loading league...</div>
        }
      >
        <LeagueContent params={params} />
      </Suspense>
    </AppShell>
  );
}

async function LeagueContent({ params }: LeaguePageProps) {
  const { slug } = await params;
  const league = getLeagueBySlug(slug);

  if (!league) {
    notFound();
  }

  return <LeagueCentre league={league} />;
}
