"use client";

import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import DesignersSection from "../components/DesignersSection";
import StoriesSection from "../components/StoriesSection";
import DonationSection from "../components/DonationSection";
import Footer from "../components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* 한반도 디자이너 (상단 노출) */}
        <div id="designers"><DesignersSection /></div>

        {/* 뉴스 및 활동 */}
        <div id="stories"><StoriesSection /></div>

        <DonationSection />
      </main>
      <Footer />
    </>
  );
}
