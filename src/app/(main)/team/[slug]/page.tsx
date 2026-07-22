"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Container, Breadcrumb } from "@/components/common";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { teamApi, TeamMember } from "@/services/api";
import TeamMemberClient from "./TeamMemberClient";

export default function TeamMemberPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await teamApi.getBySlug(slug);
        setMember(res.data || null);
      } catch {
        setMember(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 pb-16 min-h-screen">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8 py-10">
            <Skeleton className="h-4 w-40" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-5">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-6 w-36 mx-auto" />
                <Skeleton className="h-4 w-28 mx-auto" />
                <div className="flex justify-center gap-3 pt-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-6 w-40" />
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-sm shrink-0" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Team Member Not Found</h1>
            <Link href="/team" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return <TeamMemberClient member={member} />;
}
