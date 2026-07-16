"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatCurrency } from "@/utils";
import { mockWishlist } from "@/services/dashboard-data";

export default function WishlistPage() {
  const wishlist = mockWishlist;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
        <p className="text-muted-foreground mt-1">
          {wishlist.length} course{wishlist.length !== 1 ? "s" : ""} saved for later
        </p>
      </div>

      {wishlist.length === 0 ? (
        <FadeIn>
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Browse our courses and save the ones you&apos;re interested in for later.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Browse Courses
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.1}>
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-48 h-32 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <span className="text-xs font-medium text-muted-foreground">Course Image</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.course.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {item.course.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          {item.course.rating} ({item.course.reviewCount.toLocaleString()})
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{item.course.duration}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{item.course.lectures} lectures</span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-foreground">
                            {formatCurrency(item.course.discountPrice || item.course.price)}
                          </span>
                          {item.course.discountPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatCurrency(item.course.price)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-red-500 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                          </button>
                        </div>
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
