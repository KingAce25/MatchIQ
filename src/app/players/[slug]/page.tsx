import { Suspense } from "react";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import PlayerProfile from "@/components/players/player-profile";
import { getAllPlayers, getPlayerBySlug } from "@/lib/data/players";

type PlayerPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPlayers().map((player) => ({ slug: player.slug }));
}

export default function PlayerPage({ params }: PlayerPageProps) {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="p-6 text-sm text-slate-500">Loading player...</div>
        }
      >
        <PlayerContent params={params} />
      </Suspense>
    </AppShell>
  );
}

async function PlayerContent({ params }: PlayerPageProps) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  return <PlayerProfile player={player} />;
}
