import { Suspense } from "react";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import MatchCentre from "@/components/matches/match-centre";
import { getAllMatches, getMatchBySlug } from "@/lib/data/matches";

type MatchPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllMatches().map((match) => ({ slug: match.slug }));
}

export default function MatchPage({ params }: MatchPageProps) {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="p-6 text-sm text-slate-500">Loading match...</div>
        }
      >
        <MatchContent params={params} />
      </Suspense>
    </AppShell>
  );
}

async function MatchContent({ params }: MatchPageProps) {
  const { slug } = await params;
  const match = getMatchBySlug(slug);

  if (!match) {
    notFound();
  }

  return <MatchCentre match={match} />;
}
