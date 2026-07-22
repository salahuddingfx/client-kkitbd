"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Trash2, Star, Clock, Loader2 } from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { formatCurrency } from "@/utils";
import { coursesApi, authApi, Course } from "@/services/api";

export default function WishlistPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const profileRes = await authApi.getMe();
        const profile = profileRes.data;
        if (!profile?.wishlist?.length) { setCourses([]); setLoading(false); return; }
        const results = await Promise.all(
          profile.wishlist.map((id: string) => coursesApi.getById(id).then((r) => r.data).catch(() => null))
        );
        setCourses(results.filter(Boolean) as Course[]);
      } catch { setCourses([]); } finally { setLoading(false); }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
        <p className="text-muted-foreground mt-1">
          {courses.length} course{courses.length !== 1 ? "s" : ""} saved for later
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5 flex items-center gap-4">
                <Skeleton className="h-20 w-28 rounded-lg shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                  <div className="flex items-center gap-3 pt-1">
                    <Skeleton className="h-3.5 w-16" />
                    <Skeleton className="h-3.5 w-16" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Skeleton className="h-9 w-28 rounded-lg" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <FadeIn>
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">Browse our courses and save the ones you&apos;re interested in for later.</p>
              <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                Browse Courses
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      ) : (
        <div className="space-y-4">
          {courses.map((course, i) => (
            <FadeIn key={course._id} delay={i * 0.1}>
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Link href={`/courses/${course._id}`} className="relative w-full sm:w-48 h-32 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      {course.thumbnail?.url ? (
                        <img src={course.thumbnail.url} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                          <span className="text-xs font-medium text-primary">No Image</span>
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/courses/${course._id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{course.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.shortDescription || course.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          {course.rating?.average?.toFixed(1) || "N/A"} ({course.rating?.count || 0})
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.totalDuration}h</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{course.totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-xl font-bold text-foreground">{formatCurrency(course.discountPrice || course.price)}</span>
                        {course.discountPrice && <span className="text-sm text-muted-foreground line-through">{formatCurrency(course.price)}</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
