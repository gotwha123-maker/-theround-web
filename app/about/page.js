"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
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
              WHO WE ARE
            </span>
            <h1 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              더라운드 소개
            </h1>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6", wordBreak: "keep-all" }}>
              더라운드가 그리는 한반도의 수평적 화합과 통합의 철학을 소개합니다.
            </p>
          </div>
        </div>

        {/* Brand Mission Section */}
        <section className="section reveal-on-scroll" style={{ padding: "5rem 0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "4rem 2.5rem",
              boxShadow: "var(--shadow-sm)",
              textAlign: "center"
            }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>
                The Round: <span className="highlight-text" style={{ color: "var(--color-primary)" }}>함께 뜻을 잇다</span>
              </h2>
              <div style={{
                width: "50px",
                height: "3px",
                backgroundColor: "var(--color-primary)",
                margin: "0 auto 2.5rem auto",
                borderRadius: "2px"
              }}></div>
              
              <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "var(--color-text-primary)", marginBottom: "2rem", wordBreak: "keep-all" }}>
                <strong>더라운드(The Round)</strong>는 자유민주주의 가치를 중심으로<br />
                한반도 미래를 준비하는 '원형테이블'을 상징합니다.
              </p>
              
              <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--color-text-muted)", wordBreak: "keep-all" }}>
                우리는 한반도 통합에 기여할 활동가 그룹을 형성하고,<br />
                지속 가능한 커뮤니티 기반을 강화하는 것을 미션으로 삼고 있습니다.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
