"use client";

import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AcademyLandingPage() {
  return (
    <>
      <Header forceSolid={true} />
      <main style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}>
        
        {/* Hero Section */}
        <section style={{ 
          background: "var(--gradient-hero)", 
          color: "white", 
          padding: "8rem 0 6rem 0", 
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Overlay Map Effect */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            height: "100%",
            transform: "translate(-50%, -50%)",
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Korea_map_modern.svg/800px-Korea_map_modern.svg.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            opacity: 0.08,
            filter: "invert(1) brightness(2)",
            pointerEvents: "none"
          }}></div>

          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <span className="section-subtitle" style={{ color: "var(--color-accent-secondary)", fontSize: "0.9rem", fontWeight: 800 }}>LEADERS ACADEMY Portal</span>
            <h1 style={{ fontSize: "3.2rem", fontWeight: 900, marginTop: "1rem", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
              남북청년 <span className="accent-text">리더십 아카데미</span>
            </h1>
            <p className="hero-lead" style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", wordBreak: "keep-all", color: "rgba(255, 255, 255, 0.9)" }}>
              &quot;서로 다른 시작점에서 만나, 내일의 한반도를 설계하고 자립하다&quot;<br />
              시즌별 상세 소개 및 청년 리더들의 생생한 기록을 만나보세요.
            </p>
          </div>
        </section>

        {/* Portal Selection Section */}
        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", marginTop: "2rem" }}>
              
              {/* Card 1: Season 1 */}
              <Link 
                href="/academy/season1"
                className="reveal-on-scroll active"
                style={{ 
                  backgroundColor: "white", 
                  borderRadius: "28px", 
                  padding: "3.5rem 2.5rem", 
                  border: "1px solid var(--color-border)", 
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                  cursor: "pointer",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                <div>
                  <span className="section-subtitle" style={{ color: "var(--color-text-muted)" }}>COMPLETED IN 2025</span>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "1rem 0", color: "var(--color-text-primary)" }}>아카데미 시즌 1<br />관계와 공감의 시작</h2>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "2rem" }}>
                    남북 청년들이 마음을 나누고 신뢰 네트워크를 돈독히 하며, 통일을 위한 깊은 정서적 공감대를 확인한 첫 번째 여정의 기록입니다.
                  </p>
                </div>
                <div 
                  className="btn btn-outline" 
                  style={{ 
                    alignSelf: "flex-start",
                    color: "var(--color-primary)",
                    borderColor: "var(--color-primary)",
                    backgroundColor: "transparent",
                    width: "100%",
                    fontWeight: 700,
                    textAlign: "center"
                  }}
                >
                  시즌 1 아카이브 입장하기 &rarr;
                </div>
              </Link>

              {/* Card 2: Season 2 */}
              <Link 
                href="/academy/season2"
                className="reveal-on-scroll active"
                style={{ 
                  backgroundColor: "white", 
                  borderRadius: "28px", 
                  padding: "3.5rem 2.5rem", 
                  border: "1px solid var(--color-border)", 
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                  cursor: "pointer",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                <div>
                  <span className="section-subtitle" style={{ color: "var(--color-primary)" }}>LAUNCHING IN JULY 2026</span>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "1rem 0", color: "var(--color-text-primary)" }}>아카데미 시즌 2<br />실질적 임팩트 프로젝트</h2>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "2rem" }}>
                    이해와 연대를 넘어 구체적인 소셜 임팩트 프로젝트와 협력 비즈니스를 기획하여 세상에 실질적인 변화를 제안하는 두 번째 도정입니다.
                  </p>
                </div>
                <div 
                  className="btn btn-primary" 
                  style={{ 
                    alignSelf: "flex-start",
                    width: "100%",
                    fontWeight: 700,
                    textAlign: "center"
                  }}
                >
                  시즌 2 둘러보기 &rarr;
                </div>
              </Link>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
