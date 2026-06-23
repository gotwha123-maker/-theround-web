"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";

export default function ContactPage() {
  useEffect(() => {
    // Reveal on scroll logic
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
      <Header forceSolid={true} />
      <main style={{ minHeight: "80vh", paddingTop: "80px", backgroundColor: "var(--color-bg-primary)" }}>
        {/* Page Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #311010 100%)",
          color: "white",
          padding: "5rem 1rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(220, 20, 20, 0.08) 0%, transparent 60%)",
            pointerEvents: "none"
          }}></div>

          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <span style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "var(--color-primary)",
              textTransform: "uppercase",
              backgroundColor: "rgba(220, 20, 20, 0.08)",
              padding: "0.4rem 1.2rem",
              borderRadius: "30px",
              border: "1px solid rgba(220, 20, 20, 0.15)",
              display: "inline-block",
              marginBottom: "1.2rem"
            }}>
              GET IN TOUCH
            </span>
            <h1 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              문의하기 & 위치 안내
            </h1>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6", wordBreak: "keep-all" }}>
              더라운드 광명 본부로 찾아오시는 길과 1:1 문의 채널을 통해 소통하실 수 있습니다.
            </p>
          </div>
        </div>

        {/* ContactSection Component */}
        <div style={{ padding: "1rem 0 4rem 0" }}>
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
