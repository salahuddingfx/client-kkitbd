"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button, GlowCard } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { ScrollReveal, StaggerReveal } from "@/components/animations";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiAngular,
  SiVuedotjs,
  SiSvelte,
  SiAstro,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiFastapi,
  SiLaravel,
  SiPhp,
  SiGraphql,
  SiSpringboot,
  SiDotnet,
  SiRust,
  SiGo,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiRedis,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiNginx,
  SiApachekafka,
  SiRabbitmq,
  SiGit,
  SiVite,
  SiWebpack,
  SiNpm,
  SiYarn,
  SiTerraform,
  SiGooglecloud,
  SiNetlify,
  SiVercel,
  SiCloudflare,
  SiCypress,
  SiJest,
  SiVitest,
  SiPostman,
  SiFigma,
  SiSketch,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiRedux,
  SiStorybook,
  SiStrapi,
  SiWordpress,
} from "react-icons/si";

const markupStyles = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", desc: "Semantic markup language" },
  { name: "CSS3", icon: SiCss, color: "#1572B6", desc: "Styles & layouts" },
  { name: "Sass", icon: SiSass, color: "#CC6699", desc: "CSS preprocessor" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", desc: "Utility-first CSS" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", desc: "Component CSS framework" },
];

const frontendFrameworks = [
  { name: "React", icon: SiReact, color: "#61DAFB", desc: "Component-based UI library" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", desc: "Full-stack React framework" },
  { name: "Angular", icon: SiAngular, color: "#DD0031", desc: "Platform for web apps" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", desc: "Progressive JS framework" },
  { name: "Svelte", icon: SiSvelte, color: "#FF3E00", desc: "Compile-time framework" },
  { name: "Astro", icon: SiAstro, color: "#FF5D01", desc: "Content-focused web framework" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", desc: "Typed JavaScript superset" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", desc: "The language of the web" },
  { name: "Redux", icon: SiRedux, color: "#764ABC", desc: "Predictable state container" },
  { name: "Storybook", icon: SiStorybook, color: "#FF4785", desc: "UI component explorer" },
];

const backendFrameworks = [
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", desc: "Server-side JavaScript" },
  { name: "Python", icon: SiPython, color: "#3776AB", desc: "Versatile language" },
  { name: "Django", icon: SiDjango, color: "#092E20", desc: "High-level Python framework" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", desc: "Modern Python API framework" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", desc: "PHP web framework" },
  { name: "PHP", icon: SiPhp, color: "#777BB4", desc: "Server-side scripting language" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F", desc: "Java application framework" },
  { name: ".NET", icon: SiDotnet, color: "#512BD4", desc: "Microsoft dev platform" },
  { name: "Rust", icon: SiRust, color: "#CE422B", desc: "Systems programming language" },
  { name: "Go", icon: SiGo, color: "#00ADD8", desc: "Fast compiled language" },
];

const databases = [
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", desc: "NoSQL document database" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", desc: "Advanced SQL database" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", desc: "World's most popular SQL DB" },
  { name: "SQLite", icon: SiSqlite, color: "#003B57", desc: "Embedded SQL database" },
  { name: "Redis", icon: SiRedis, color: "#DC382D", desc: "In-memory data store" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748", desc: "Next-gen Node.js ORM" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", desc: "Open-source Firebase alt" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", desc: "Google app platform" },
];

const devopsCloud = [
  { name: "Docker", icon: SiDocker, color: "#2496ED", desc: "Container platform" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", desc: "Container orchestration" },
  { name: "Nginx", icon: SiNginx, color: "#009639", desc: "Web server & reverse proxy" },
  { name: "Kafka", icon: SiApachekafka, color: "#231F20", desc: "Event streaming platform" },
  { name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600", desc: "Message broker" },
  { name: "Terraform", icon: SiTerraform, color: "#7B42BC", desc: "Infrastructure as code" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4", desc: "Cloud infrastructure" },
  { name: "Vercel", icon: SiVercel, color: "#000000", desc: "Frontend cloud platform" },
  { name: "Netlify", icon: SiNetlify, color: "#00C7B7", desc: "Web hosting platform" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020", desc: "CDN & security" },
];

const toolsTesting = [
  { name: "Git", icon: SiGit, color: "#F05032", desc: "Version control" },
  { name: "Vite", icon: SiVite, color: "#646CFF", desc: "Next-gen build tool" },
  { name: "Webpack", icon: SiWebpack, color: "#8DD6F9", desc: "Module bundler" },
  { name: "NPM", icon: SiNpm, color: "#CB3837", desc: "Package manager" },
  { name: "Yarn", icon: SiYarn, color: "#2C8EBB", desc: "Fast package manager" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", desc: "API query language" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37", desc: "API development tool" },
  { name: "Cypress", icon: SiCypress, color: "#17202C", desc: "End-to-end testing" },
  { name: "Jest", icon: SiJest, color: "#C21325", desc: "JavaScript testing framework" },
  { name: "Vitest", icon: SiVitest, color: "#6E9F18", desc: "Blazing-fast test runner" },
];

const designMobile = [
  { name: "Figma", icon: SiFigma, color: "#F24E1E", desc: "Collaborative design" },
  { name: "Sketch", icon: SiSketch, color: "#F7B500", desc: "Vector design tool" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B", desc: "Cross-platform mobile" },
  { name: "Swift", icon: SiSwift, color: "#FA7343", desc: "Apple development" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF", desc: "Modern JVM language" },
];

const cmsBackend = [
  { name: "WordPress", icon: SiWordpress, color: "#21759B", desc: "World's #1 CMS" },
  { name: "Strapi", icon: SiStrapi, color: "#4945FF", desc: "Open-source headless CMS" },
  { name: "Storybook", icon: SiStorybook, color: "#FF4785", desc: "Component documentation" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", desc: "Responsive CSS framework" },
  { name: "Sass", icon: SiSass, color: "#CC6699", desc: "CSS extension language" },
];

const techCategories = [
  { title: "Markup & Styling", description: "The foundation of every web interface — HTML, CSS, and modern styling tools.", techs: markupStyles },
  { title: "Frontend Frameworks", description: "Powerful libraries and frameworks for building interactive user interfaces.", techs: frontendFrameworks },
  { title: "Backend & Languages", description: "Server-side frameworks and languages powering APIs, services, and business logic.", techs: backendFrameworks },
  { title: "Databases & ORM", description: "Data persistence, querying, and object-relational mapping for every use case.", techs: databases },
  { title: "DevOps & Cloud", description: "Containerization, orchestration, CI/CD, and cloud infrastructure at scale.", techs: devopsCloud },
  { title: "Tools & Testing", description: "Build tools, package managers, API tools, and testing frameworks.", techs: toolsTesting },
  { title: "Design & Mobile", description: "UI/UX design tools and cross-platform mobile development frameworks.", techs: designMobile },
  { title: "CMS & Backend Tools", description: "Content management systems, headless CMS, and backend utilities.", techs: cmsBackend },
];

const stats = [
  { number: "60+", label: "Technologies" },
  { number: "50+", label: "Expert Developers" },
  { number: "100+", label: "Projects Delivered" },
  { number: "99.9%", label: "Uptime SLA" },
];

const processSteps = [
  { step: "01", title: "Discovery & Analysis", description: "We analyze your requirements and recommend the optimal tech stack for your project." },
  { step: "02", title: "Architecture Design", description: "Our architects design a scalable, maintainable system using industry best practices." },
  { step: "03", title: "Development & Testing", description: "Agile development with continuous integration, code reviews, and automated testing." },
  { step: "04", title: "Deployment & Support", description: "CI/CD pipelines, monitoring, and 24/7 support to ensure peak performance." },
];

export default function TechnologiesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".tech-hero-badge", { opacity: 0, y: 20, duration: 0.5 })
        .from(".tech-hero-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(".tech-hero-desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from(".tech-hero-stat", { opacity: 0, y: 30, stagger: 0.08, duration: 0.5 }, "-=0.3");
    },
    [],
    heroRef
  );

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <span className="tech-hero-badge inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Our Tech Stack
            </span>
            <h1 className="tech-hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Technologies That <span className="text-primary">Power</span> Your Vision
            </h1>
            <p className="tech-hero-desc text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We leverage the latest and most powerful technologies to build scalable,
              performant, and future-proof solutions for your business.
            </p>
            <Breadcrumb items={[{ label: "Technologies" }]} className="justify-center mb-12" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="tech-hero-stat">
                  <GlowCard variant="neu" className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Tech Categories */}
      {techCategories.map((category, catIndex) => (
        <section key={category.title} className={`py-12 sm:py-20 ${catIndex % 2 === 1 ? "bg-background-secondary" : ""}`}>
          <Container>
            <ScrollReveal direction="up" distance={30}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-3">{category.title}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">{category.description}</p>
              </div>
            </ScrollReveal>

            <StaggerReveal
              childSelector=".tech-item"
              stagger={0.06}
              y={40}
              duration={0.6}
              from="center"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {category.techs.map((tech) => (
                  <div key={tech.name} className="tech-item">
                    <GlowCard variant="glow" className="p-5 text-center group cursor-default h-full">
                      <div
                        className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                        style={{
                          backgroundColor: `${tech.color}15`,
                          boxShadow: `0 0 0 1px ${tech.color}20`,
                        }}
                      >
                        <tech.icon
                          className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: tech.color }}
                        />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">{tech.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tech.desc}</p>
                    </GlowCard>
                  </div>
                ))}
              </div>
            </StaggerReveal>
          </Container>
        </section>
      ))}

      {/* Our Process */}
      <section className="py-12 sm:py-20">
        <Container>
          <SectionHeader
            subtitle="Our Process"
            title="How We Choose the Right Tech"
            description="A systematic approach to selecting and implementing the perfect technology stack for every project."
          />

          <StaggerReveal
            childSelector=".process-step"
            stagger={0.12}
            y={50}
            duration={0.7}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <div key={step.step} className="process-step">
                  <GlowCard variant="animated" className="p-4 sm:p-8 h-full relative overflow-hidden">
                    <div className="text-6xl font-black text-primary/10 absolute top-4 right-4">
                      {step.step}
                    </div>
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </Container>
      </section>

      {/* Why Our Stack */}
      <section className="py-12 sm:py-20 bg-background-secondary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="right" distance={60}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Why Our Technology Stack?
                </h2>
                <p className="text-muted-foreground">
                  We don&apos;t just follow trends. Every technology we adopt is carefully
                  evaluated for performance, scalability, developer experience, and long-term
                  viability.
                </p>
                <div className="space-y-4">
                  {[
                    "Battle-tested in production environments",
                    "Active communities and long-term support",
                    "Proven scalability for millions of users",
                    "Security-first approach at every layer",
                    "Seamless integration capabilities",
                    "Cost-effective infrastructure choices",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" distance={60}>
              <GlowCard variant="neu" className="p-4 sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <SiReact className="w-6 h-6 text-[#61DAFB]" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Modern Frontend</div>
                      <div className="text-sm text-muted-foreground">React + Next.js + TypeScript</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <SiNodedotjs className="w-6 h-6 text-[#339933]" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Robust Backend</div>
                      <div className="text-sm text-muted-foreground">Node.js + Python + Laravel</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <SiGooglecloud className="w-6 h-6 text-[#4285F4]" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Cloud Native</div>
                      <div className="text-sm text-muted-foreground">Docker + Kubernetes + Vercel</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <SiMongodb className="w-6 h-6 text-[#47A248]" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Flexible Data</div>
                      <div className="text-sm text-muted-foreground">MongoDB + PostgreSQL + MySQL</div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-primary">
        <Container>
          <ScrollReveal direction="up" distance={0} duration={0.8}>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Let our experts help you choose the perfect tech stack for your next project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" size="xl" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link href="/contact">
                    Start a Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
