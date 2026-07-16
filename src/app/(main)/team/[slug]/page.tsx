import { notFound } from "next/navigation";
import { team, getTeamMemberBySlug } from "@/data/team";
import TeamMemberClient from "./TeamMemberClient";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return <TeamMemberClient member={member} />;
}
