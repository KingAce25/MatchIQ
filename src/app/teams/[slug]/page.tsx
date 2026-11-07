import { Suspense } from "react";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import TeamProfile from "@/components/teams/team-profile";
import { getAllTeams, getTeamBySlug } from "@/lib/data/teams";

type TeamPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllTeams().map((team) => ({ slug: team.slug }));
}

export default function TeamPage({ params }: TeamPageProps) {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="p-6 text-sm text-slate-500">Loading team...</div>
        }
      >
        <TeamContent params={params} />
      </Suspense>
    </AppShell>
  );
}

async function TeamContent({ params }: TeamPageProps) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);

  if (!team) {
    notFound();
  }

  return <TeamProfile team={team} />;
}
