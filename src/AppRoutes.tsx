import React, { Suspense, lazy } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { PageLoader } from "@/components/loaders/Loader";

// Lazy load main pages
const HomePage = lazy(() => import("@/app/(main)/page"));
const AboutPage = lazy(() => import("@/app/(main)/about/page"));
const AccessibilityPage = lazy(() => import("@/app/(main)/accessibility/page"));
const ApiDocsPage = lazy(() => import("@/app/(main)/api-docs/page"));
const BlogPage = lazy(() => import("@/app/(main)/blog/page"));
const BlogPostPage = lazy(() => import("@/app/(main)/blog/[id]/page"));
const CareersPage = lazy(() => import("@/app/(main)/careers/page"));
const SingleCareerPage = lazy(() => import("@/app/(main)/careers/[id]/page"));
const ChangelogPage = lazy(() => import("@/app/(main)/changelog/page"));
const CheckoutPage = lazy(() => import("@/app/(main)/checkout/[id]/page"));
const CommunityGuidelinesPage = lazy(() => import("@/app/(main)/community-guidelines/page"));
const ContactPage = lazy(() => import("@/app/(main)/contact/page"));
const CookiesPolicyPage = lazy(() => import("@/app/(main)/cookies-policy/page"));
const CoursesPage = lazy(() => import("@/app/(main)/courses/page"));
const CourseDetailPage = lazy(() => import("@/app/(main)/courses/[id]/page"));
const DevelopersPage = lazy(() => import("@/app/(main)/developers/page"));
const DeveloperDetailPage = lazy(() => import("@/app/(main)/developers/[id]/page"));
const DisclaimerPage = lazy(() => import("@/app/(main)/disclaimer/page"));
const DiscussionsPage = lazy(() => import("@/app/(main)/discussions/page"));
const FAQPage = lazy(() => import("@/app/(main)/faq/page"));
const LearningPathsPage = lazy(() => import("@/app/(main)/learning-paths/page"));
const LiveClassesPage = lazy(() => import("@/app/(main)/live-classes/page"));
const OffersPage = lazy(() => import("@/app/(main)/offers/page"));
const OfflinePage = lazy(() => import("@/app/(main)/offline/page"));
const PortfolioPage = lazy(() => import("@/app/(main)/portfolio/page"));
const PortfolioDetailPage = lazy(() => import("@/app/(main)/portfolio/[id]/page"));
const PricingPage = lazy(() => import("@/app/(main)/pricing/page"));
const PrivacyPolicyPage = lazy(() => import("@/app/(main)/privacy-policy/page"));
const RefundPolicyPage = lazy(() => import("@/app/(main)/refund-policy/page"));
const ResourcesPage = lazy(() => import("@/app/(main)/resources/page"));
const ServicesPage = lazy(() => import("@/app/(main)/services/page"));
const ServiceDetailPage = lazy(() => import("@/app/(main)/services/[id]/page"));
const ShippingPolicyPage = lazy(() => import("@/app/(main)/shipping-policy/page"));
const StatusPage = lazy(() => import("@/app/(main)/status/page"));
const TeamPage = lazy(() => import("@/app/(main)/team/page"));
const TeamMemberPage = lazy(() => import("@/app/(main)/team/[slug]/page"));
const TechnologiesPage = lazy(() => import("@/app/(main)/technologies/page"));
const TermsConditionsPage = lazy(() => import("@/app/(main)/terms-conditions/page"));
const UnderConstructionPage = lazy(() => import("@/app/(main)/under-construction/page"));

// Auth pages
const LoginPage = lazy(() => import("@/app/(auth)/login/page"));
const RegisterPage = lazy(() => import("@/app/(auth)/register/page"));

// Dashboard layout and pages
const DashboardLayout = lazy(() => import("@/app/(dashboard)/layout"));
const DashboardOverviewPage = lazy(() => import("@/app/(dashboard)/dashboard/page"));
const DashboardCoursesPage = lazy(() => import("@/app/(dashboard)/dashboard/courses/page"));
const DashboardCourseViewerPage = lazy(() => import("@/app/(dashboard)/dashboard/courses/[id]/page"));
const AssignmentsPage = lazy(() => import("@/app/(dashboard)/dashboard/assignments/page"));
const BillingPage = lazy(() => import("@/app/(dashboard)/dashboard/billing/page"));
const StudentBlogsPage = lazy(() => import("@/app/(dashboard)/dashboard/blogs/page"));
const CertificatesPage = lazy(() => import("@/app/(dashboard)/dashboard/certificates/page"));
const GamificationPage = lazy(() => import("@/app/(dashboard)/dashboard/gamification/page"));
const GradesPage = lazy(() => import("@/app/(dashboard)/dashboard/grades/page"));
const LeaderboardPage = lazy(() => import("@/app/(dashboard)/dashboard/leaderboard/page"));
const NoticesPage = lazy(() => import("@/app/(dashboard)/dashboard/notices/page"));
const ProfilePage = lazy(() => import("@/app/(dashboard)/dashboard/profile/page"));
const ProjectsPage = lazy(() => import("@/app/(dashboard)/dashboard/projects/page"));
const ReviewsPage = lazy(() => import("@/app/(dashboard)/dashboard/reviews/page"));
const MyServiceOrdersPage = lazy(() => import("@/app/(dashboard)/dashboard/services/page"));
const SettingsPage = lazy(() => import("@/app/(dashboard)/dashboard/settings/page"));
const WishlistPage = lazy(() => import("@/app/(dashboard)/dashboard/wishlist/page"));

// 404
const NotFoundPage = lazy(() => import("@/app/not-found"));

// Route wrapper helper to bridge Next.js params (both synchronous and async Promise)
function DynamicWrapper({ Component }: { Component: React.ComponentType<any> }) {
  const params = useParams();
  return <Component params={Promise.resolve(params)} {...params} />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/accessibility" element={<MainLayout><AccessibilityPage /></MainLayout>} />
        <Route path="/api-docs" element={<MainLayout><ApiDocsPage /></MainLayout>} />
        <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
        <Route path="/blog/:id" element={<MainLayout><DynamicWrapper Component={BlogPostPage} /></MainLayout>} />
        <Route path="/careers" element={<MainLayout><CareersPage /></MainLayout>} />
        <Route path="/careers/:id" element={<MainLayout><DynamicWrapper Component={SingleCareerPage} /></MainLayout>} />
        <Route path="/changelog" element={<MainLayout><ChangelogPage /></MainLayout>} />
        <Route path="/checkout/:id" element={<MainLayout><DynamicWrapper Component={CheckoutPage} /></MainLayout>} />
        <Route path="/community-guidelines" element={<MainLayout><CommunityGuidelinesPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
        <Route path="/cookies-policy" element={<MainLayout><CookiesPolicyPage /></MainLayout>} />
        <Route path="/courses" element={<MainLayout><CoursesPage /></MainLayout>} />
        <Route path="/courses/:id" element={<MainLayout><DynamicWrapper Component={CourseDetailPage} /></MainLayout>} />
        <Route path="/developers" element={<MainLayout><DevelopersPage /></MainLayout>} />
        <Route path="/developers/:id" element={<MainLayout><DynamicWrapper Component={DeveloperDetailPage} /></MainLayout>} />
        <Route path="/disclaimer" element={<MainLayout><DisclaimerPage /></MainLayout>} />
        <Route path="/discussions" element={<MainLayout><DiscussionsPage /></MainLayout>} />
        <Route path="/faq" element={<MainLayout><FAQPage /></MainLayout>} />
        <Route path="/learning-paths" element={<MainLayout><LearningPathsPage /></MainLayout>} />
        <Route path="/live-classes" element={<MainLayout><LiveClassesPage /></MainLayout>} />
        <Route path="/offers" element={<MainLayout><OffersPage /></MainLayout>} />
        <Route path="/offline" element={<MainLayout><OfflinePage /></MainLayout>} />
        <Route path="/portfolio" element={<MainLayout><PortfolioPage /></MainLayout>} />
        <Route path="/portfolio/:id" element={<MainLayout><DynamicWrapper Component={PortfolioDetailPage} /></MainLayout>} />
        <Route path="/pricing" element={<MainLayout><PricingPage /></MainLayout>} />
        <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicyPage /></MainLayout>} />
        <Route path="/refund-policy" element={<MainLayout><RefundPolicyPage /></MainLayout>} />
        <Route path="/resources" element={<MainLayout><ResourcesPage /></MainLayout>} />
        <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
        <Route path="/services/:id" element={<MainLayout><DynamicWrapper Component={ServiceDetailPage} /></MainLayout>} />
        <Route path="/shipping-policy" element={<MainLayout><ShippingPolicyPage /></MainLayout>} />
        <Route path="/status" element={<MainLayout><StatusPage /></MainLayout>} />
        <Route path="/team" element={<MainLayout><TeamPage /></MainLayout>} />
        <Route path="/team/:slug" element={<MainLayout><DynamicWrapper Component={TeamMemberPage} /></MainLayout>} />
        <Route path="/technologies" element={<MainLayout><TechnologiesPage /></MainLayout>} />
        <Route path="/terms-conditions" element={<MainLayout><TermsConditionsPage /></MainLayout>} />
        <Route path="/under-construction" element={<MainLayout><UnderConstructionPage /></MainLayout>} />

        {/* Auth Pages */}
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/register" element={<MainLayout><RegisterPage /></MainLayout>} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardOverviewPage /></DashboardLayout>} />
        <Route path="/dashboard/courses" element={<DashboardLayout><DashboardCoursesPage /></DashboardLayout>} />
        <Route path="/dashboard/courses/:id" element={<DashboardLayout><DynamicWrapper Component={DashboardCourseViewerPage} /></DashboardLayout>} />
        <Route path="/dashboard/assignments" element={<DashboardLayout><AssignmentsPage /></DashboardLayout>} />
        <Route path="/dashboard/billing" element={<DashboardLayout><BillingPage /></DashboardLayout>} />
        <Route path="/dashboard/blogs" element={<DashboardLayout><StudentBlogsPage /></DashboardLayout>} />
        <Route path="/dashboard/certificates" element={<DashboardLayout><CertificatesPage /></DashboardLayout>} />
        <Route path="/dashboard/gamification" element={<DashboardLayout><GamificationPage /></DashboardLayout>} />
        <Route path="/dashboard/grades" element={<DashboardLayout><GradesPage /></DashboardLayout>} />
        <Route path="/dashboard/leaderboard" element={<DashboardLayout><LeaderboardPage /></DashboardLayout>} />
        <Route path="/dashboard/notices" element={<DashboardLayout><NoticesPage /></DashboardLayout>} />
        <Route path="/dashboard/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
        <Route path="/dashboard/projects" element={<DashboardLayout><ProjectsPage /></DashboardLayout>} />
        <Route path="/dashboard/reviews" element={<DashboardLayout><ReviewsPage /></DashboardLayout>} />
        <Route path="/dashboard/services" element={<DashboardLayout><MyServiceOrdersPage /></DashboardLayout>} />
        <Route path="/dashboard/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
        <Route path="/dashboard/wishlist" element={<DashboardLayout><WishlistPage /></DashboardLayout>} />

        {/* Catch-all 404 */}
        <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
