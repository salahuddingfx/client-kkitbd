"use client";

import { useState } from "react";
import { Star, MessageSquare, Edit3, Calendar, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";

interface Review {
  id: string;
  courseName: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  helpful: number;
}

const myReviews: Review[] = [
  {
    id: "r1",
    courseName: "Advanced TypeScript Masterclass",
    rating: 5,
    title: "Best TypeScript course out there",
    text: "Sarah explains complex type system concepts in a way that just clicks. The projects are practical and the type challenges really solidified my understanding. Highly recommend for anyone serious about TypeScript.",
    date: "2026-06-28",
    helpful: 47,
  },
  {
    id: "r2",
    courseName: "Complete Web Development Bootcamp",
    rating: 4,
    title: "Great for beginners, solid foundation",
    text: "Covers everything you need to get started. The projects are well-designed and the community is supportive. Could use more advanced Node.js content but overall an excellent course.",
    date: "2026-06-15",
    helpful: 32,
  },
];

const coursesToReview = [
  { id: "c1", name: "React & Next.js Masterclass", completedAt: "2026-07-10", hasReview: false },
  { id: "c2", name: "Python for Data Science", completedAt: "2026-05-20", hasReview: false },
];

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [formRating, setFormRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Share your experience and help other learners.
        </p>
      </div>

      {/* Pending Reviews */}
      {coursesToReview.length > 0 && (
        <FadeIn>
          <Card className="border-primary/20">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-3">Courses Awaiting Your Review</h3>
              <div className="space-y-3">
                {coursesToReview.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{course.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Completed {formatDate(course.completedAt)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCourse(course.id);
                        setShowForm(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Edit3 className="h-3 w-3" />
                      Write Review
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Review Form */}
      {showForm && (
        <FadeIn>
          <Card className="border-primary/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">
                Write a Review for {coursesToReview.find((c) => c.id === selectedCourse)?.name}
              </h3>

              {/* Star Rating */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormRating(star)}
                    >
                      <Star
                        className={cn(
                          "h-7 w-7 transition-colors",
                          star <= (hoverRating || formRating)
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Title</label>
                <input
                  type="text"
                  placeholder="Summarize your experience"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Review</label>
                <textarea
                  rows={4}
                  placeholder="Tell others about your experience with this course..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                  Submit Review
                </button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* My Reviews */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Reviews ({myReviews.length})</h2>
        <div className="space-y-4">
          {myReviews.map((review, i) => (
            <FadeIn key={review.id} delay={i * 0.1}>
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{review.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{review.courseName}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={cn(
                            "h-4 w-4",
                            si < review.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {review.text}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(review.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {review.helpful} found this helpful
                      </span>
                    </div>
                    <button className="text-primary hover:underline font-medium">
                      Edit
                    </button>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
