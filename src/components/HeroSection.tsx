

"use client";

import { useEffect, useRef, useState } from "react";
import NavBar, { NavMenuItem } from "./NavBar";
import { normalizeUrl } from "@/lib/normalizeUrl";

       

export type MenuItem = {
  label: string;
  url: string;
  newtab?: boolean;
  tooltiphtml?: string;
};

type LandingHeroProps = {
  backgroundUrl?: string;
  overlayOpacity?: number;
  title: string;
  logoUrl?: string;
  menuitems: MenuItem[];
};

export default function HeroSection({
  backgroundUrl,
  overlayOpacity = 45,
  title,
  logoUrl,
  menuitems,
}: LandingHeroProps) {
  const [isSticky, setIsSticky] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateSticky = () => {
      const heroEl = heroRef.current;
      const threshold = heroEl ? Math.max(0, heroEl.offsetHeight - 60) : 300;
      setIsSticky(window.scrollY > threshold);
    };
    updateSticky();
    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);
    return () => {
      window.removeEventListener('scroll', updateSticky);
      window.removeEventListener('resize', updateSticky);
    };
  }, []);
  // Ensure a "Newsletters" link is always present in the hero navbar
  const newslettersItem: MenuItem = {
    label: "Newsletters",
    url: "/newsletters",
    newtab: false,
  };
  const hasNewsletters = Array.isArray(menuitems)
    && menuitems.some((item) => {
      const label = (item.label || "").trim().toLowerCase();
      const url = normalizeUrl((item.url || "").trim());
      return label === "newsletters" || url === "/newsletters";
    });
  const resolvedMenuItems: NavMenuItem[] = hasNewsletters ? menuitems : [...(menuitems || []), newslettersItem];

  return (
    <>
    <header
      id="home"
      className="position-relative text-white"
      style={{
        height: 500,
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={heroRef as any}
    >
      <div
        className="h-100 w-100"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity / 100})` }}
      >
        <div className="container h-100 d-flex flex-column align-items-center">
          <NavBar logoUrl={logoUrl} menuitems={resolvedMenuItems} variant="hero" />

          {/* HERO CONTENT */}
          <div className="w-100 mb-3 d-flex flex-column align-items-center justify-content-center text-center">
            <h1 className="display-4 fw-bold">{title}</h1>
          </div>
        </div>
      </div>
    </header>

  
    {isSticky && (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1040 }}>
        <NavBar logoUrl={logoUrl} menuitems={resolvedMenuItems} variant="sticky" />
      </div>
    )}
    </>
  )
}
