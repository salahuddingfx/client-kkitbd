import { Hero } from "@/components/sections/Hero";
import { TrustedCompanies } from "@/components/sections/TrustedCompanies";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { FeaturedCourses } from "@/components/sections/FeaturedCourses";
import { AllCourses } from "@/components/sections/AllCourses";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Partners } from "@/components/sections/Partners";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <FeaturedServices />
      <FeaturedCourses />
      <AllCourses />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <FAQ />
      <Partners />
      <CallToAction />
    </>
  );
}
