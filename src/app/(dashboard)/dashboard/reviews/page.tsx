"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, Calendar, BookOpen, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";
import { reviewsApi, Review, enrollmentsApi, Enrollment } from "@/services/api";
import { toast } from "sonner";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [formRating, setFormRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      reviewsApi.getAll({ status: "approved" }),
      enrollmentsApi.getAll(),
    ])
      .then(([reviewsRes, enrollRes]) => {
        if (reviewsRes.success) setReviews(reviewsRes.data || []);
        if (enrollRes.success) setEnrollments(enrollRes.data || []);
      })
      .catch(() => {
        setReviews([]);
        setEnrollments([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const completedCourses = enrollments.filter(
    (e) => e.status === "completed" || e.progress?.percentage === 100
  );

  const handleSubmitReview = async () => {
    if (!selectedCourse || !formRating) return;
    setSubmitting(true);
    try {
      await reviewsApi.create({
        course: selectedCourse,
        rating: formRating,
        title: formTitle,
        comment: formText,
      });
      toast.success("Review submitted successfully!");
      setShowForm(false);
      setSelectedCourse(null);
      setFormRating(0);
      setFormTitle("");
      setFormText("");
      const res = await reviewsApi.getAll({ status: "approved" });
      if (res.success) setReviews(res.data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>
          <p className="text-muted-foreground mt-1">Loading...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Share your experience and help other learners.
        </p>
      </div>

      {completedCourses.length > 0 && !showForm && (
        <FadeIn>
          <Card className="border-primary/20">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-3">Courses Awaiting Your Review</h3>
              <div className="space-y-3">
                {completedCourses.map((enrollment) => (
                  <div key={enrollment._id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {enrollment.course?.title || "Course"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Completed {formatDate(enrollment.updatedAt || enrollment.enrolledAt)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCourse(enrollment.course?._id || null);
                        setShowForm(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      Write Review
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {showForm && (
        <FadeIn>
          <Card className="border-primary/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">
                Write a Review
              </h3>

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
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Summarize your experience"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Review</label>
                <textarea
                  rows={4}
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Tell others about your experience with this course..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={submitting || !formRating}
                  className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Reviews Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Complete a course and share your experience to help other learners.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <FadeIn key={review._id} delay={i * 0.1}>
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{review.title || "Review"}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {review.course?.title || "Course"}
                        </p>
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
                      {review.comment}
                    </p>

                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
