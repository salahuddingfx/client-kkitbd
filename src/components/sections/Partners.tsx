"use client";

import { useState, useEffect } from "react";
import { Container, SectionHeader } from "@/components/common";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ScrollReveal } from "@/components/animations";
import { partnersApi, Partner } from "@/services/api";
import {
  SiGoogle,
  SiSamsung,
  SiCisco,
  SiApple,
  SiMeta,
  SiNetflix,
  SiGithub,
  SiTesla,
  SiSpotify,
  SiShopify,
  SiNvidia,
  SiIntel,
  SiNotion,
  SiFigma,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiKubernetes,
  SiLinux,
  SiPython,
  SiUber,
  SiAirbnb,
  SiZoom,
} from "react-icons/si";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  SiGoogle, SiSamsung, SiCisco, SiApple, SiMeta, SiNetflix,
  SiGithub, SiTesla, SiSpotify, SiShopify, SiNvidia, SiIntel,
  SiNotion, SiFigma, SiVercel, SiNetlify, SiDocker, SiKubernetes,
  SiLinux, SiPython, SiUber, SiAirbnb, SiZoom,
};

function PartnerLogo({
  name,
  icon,
  color,
  logo,
}: {
  name: string;
  icon?: string;
  color?: string;
  logo?: { url: string };
}) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div className="flex items-center justify-center px-6 py-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group">
      {logo?.url ? (
        <img
          src={logo.url}
          alt={name}
          className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
        />
      ) : Icon ? (
        <Icon
          className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110"
          style={{ color: color || "#6366f1" }}
        />
      ) : (
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-lg font-bold transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: (color || "#6366f1") + "20", color: color || "#6366f1" }}
        >
          {name.substring(0, 2)}
        </div>
      )}
      <span className="ml-3 text-lg md:text-xl font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-500">
        {name}
      </span>
    </div>
  );
}

export function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await partnersApi.getAll({ isActive: "true" });
        setPartners(res.data || []);
      } catch {
        setPartners([]);
      }
    };
    fetchPartners();
  }, []);

  if (partners.length === 0) return null;

  const half = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, half);
  const row2 = partners.slice(half);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <Container>
        <ScrollReveal direction="up" distance={40}>
          <SectionHeader
            subtitle="Partnerships"
            title="Trusted By Industry Leaders"
            description="Our graduates work at the world's most innovative companies. We're proud to be connected with these industry pioneers."
          />
        </ScrollReveal>
      </Container>

      <ScrollReveal direction="up" distance={30} delay={0.2}>
        <div className="mt-12">
          <InfiniteSlider gap={40} duration={30} durationOnHover={120} className="py-4">
            {row1.map((p) => (
              <PartnerLogo key={p._id} name={p.name} icon={p.icon} color={p.color} logo={p.logo} />
            ))}
          </InfiniteSlider>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" distance={30} delay={0.3}>
        <div className="mt-4">
          <InfiniteSlider gap={40} duration={35} durationOnHover={140} reverse className="py-4">
            {row2.map((p) => (
              <PartnerLogo key={p._id} name={p.name} icon={p.icon} color={p.color} logo={p.logo} />
            ))}
          </InfiniteSlider>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" distance={30} delay={0.4}>
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to partner with us?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Become a Partner
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
