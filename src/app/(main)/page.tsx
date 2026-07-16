import { Hero } from "@/components/sections/Hero";
import { TrustedCompanies } from "@/components/sections/TrustedCompanies";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { FeaturedCourses } from "@/components/sections/FeaturedCourses";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <FeaturedServices />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </>
  );
}
