"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function AcademySeason2Page() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("/api/stories", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // Filter stories for academy season 2
          const season2Stories = data.filter((s) => s.category === "academy-season2");
          setStories(season2Stories);
        }
      } catch (err) {
        console.error("Failed to fetch season 2 stories:", err);
      }
    }
    fetchStories();
  }, []);

  const openDetail = (s) => {
    setSelectedStory(s);
    document.body.style.overflow = "hidden";
  };

  const closeDetail = () => {
    setSelectedStory(null);
    document.body.style.overflow = "";
  };

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
            <span className="section-subtitle" style={{ color: "var(--color-accent-secondary)", fontSize: "0.9rem", fontWeight: 800 }}>LEADERS ACADEMY - SEASON 2</span>
            <h1 style={{ fontSize: "3.2rem", fontWeight: 900, marginTop: "1rem", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
              아카데미 <span className="accent-text">시즌 2</span>
              <span style={{ 
                fontSize: "1.2rem", 
                verticalAlign: "middle", 
                marginLeft: "1rem", 
                backgroundColor: "var(--color-accent-secondary)", 
                color: "var(--color-bg-primary)", 
                padding: "0.3rem 0.9rem", 
                borderRadius: "50px",
                fontWeight: 700,
                display: "inline-block"
              }}>
                7월 오픈 예정
              </span>
            </h1>
            <p className="hero-lead" style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", wordBreak: "keep-all", color: "rgba(255, 255, 255, 0.9)" }}>
              "실질적 임팩트 프로젝트 (2026년 7월 런칭 예정)"<br />
              이해와 연대를 넘어, 구체적인 비즈니스 협력과 사회 변화 아이디어를 현실화하는 무대입니다.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
              <div>
                <span className="section-subtitle">SEASON 2 VISION</span>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>
                  아이디어를 세상의 임팩트로<br />디자인하는 과정입니다.
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "2rem" }}>
                  시즌 2에서는 남북 청년들이 각자의 지적 자산과 배경을 결합하여 가치 있는 공동 비즈니스 모델을 구체화합니다. 전문가 심층 멘토링, 시드 머니 지원, 투자 피칭 기회가 결합된 고도화된 실무 교육 과정입니다.
                </p>
              </div>
              <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "var(--shadow-lg)", aspectRatio: "4/3" }}>
                <img src="/assets/story_academy_censored.png" alt="아카데미 시즌 2 사진" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070";
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="section" style={{ backgroundColor: "var(--color-bg-secondary)", padding: "5rem 0" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">CURRICULUM</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>시즌 2 핵심 교육과정</h2>
              <p className="section-lead">사회 변화와 자립을 위한 3단계 실천 프로세스입니다.</p>
            </div>

            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", listStyle: "none", padding: 0, marginTop: "3rem" }}>
              <li style={{ padding: "2rem", backgroundColor: "white", borderRadius: "20px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "1.2rem", marginBottom: "0.8rem", fontWeight: 800 }}>01. 비즈니스 아이디어 구체화</strong>
                <span style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>사회 혁신가 및 스타트업 대표 멘토진이 협력하여 비즈니스 및 사회 혁신 프로젝트 기획</span>
              </li>
              <li style={{ padding: "2rem", backgroundColor: "white", borderRadius: "20px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "1.2rem", marginBottom: "0.8rem", fontWeight: 800 }}>02. 실전 정책/비즈니스 제안</strong>
                <span style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>기획안을 실제로 공공 영역이나 투자 시장에 피칭하여 현실적인 가능성을 실현하고 가치 확장</span>
              </li>
              <li style={{ padding: "2rem", backgroundColor: "white", borderRadius: "20px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "1.2rem", marginBottom: "0.8rem", fontWeight: 800 }}>03. 창업 시뮬레이션 및 상용화</strong>
                <span style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>초기 사업비 지원 및 법률 조언, 비즈니스 성장을 위한 후속 창업 매칭 네트워크 기회 확보</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Dynamic Stories */}
        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">SEASON 2 ARCHIVES</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>시즌 2 소식 & 스토리</h2>
              <p className="section-lead">런칭 전후로 일어나는 의미 있는 현장 소식들을 빠르게 중계합니다.</p>
            </div>

            {stories.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "3rem" }}>
                시즌 2의 최신 소식이 7월 공식 런칭 후 순차적으로 갱신될 예정입니다.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
                {stories.map((s) => (
                  <article 
                    className="story-card" 
                    key={s.id}
                    onClick={() => openDetail(s)}
                    style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      height: "100%",
                      background: "white",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: "var(--shadow-sm)",
                      border: "1px solid var(--color-border)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ position: "relative", paddingTop: "60%", overflow: "hidden" }}>
                      <img 
                        src={s.img} 
                        alt={s.title} 
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070";
                        }}
                      />
                    </div>
                    <div style={{ padding: "1.8rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 800, marginBottom: "0.8rem", display: "block" }}>{s.date}</span>
                      <h3 style={{ fontSize: "1.25rem", lineHeight: 1.5, marginBottom: "1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{s.title}</h3>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--color-text-muted)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginTop: "auto" }}>{s.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Application Call to Action */}
        <section className="section" style={{ background: "var(--gradient-accent)", color: "white", padding: "5rem 0", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "white", marginBottom: "1.5rem" }}>시즌 2 사전 모집에 참여해 보세요</h2>
            <p style={{ fontSize: "1.15rem", color: "rgba(255, 255, 255, 0.9)", maxWidth: "700px", margin: "0 auto 2.5rem auto", wordBreak: "keep-all" }}>
              2026년 7월에 출발하는 리더십 아카데미 시즌 2에 함께하여, 통일 비즈니스의 아이디어를 실천하고 성장을 도모할 남북 청년들을 환영합니다.
            </p>
            <a href="/#contact" className="btn btn-outline btn-lg" style={{ borderColor: "white", color: "white", backgroundColor: "transparent" }}>시즌 2 사전 상담 문의하기</a>
          </div>
        </section>

      </main>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeDetail}></div>
          <div className="modal-container" style={{ maxWidth: "800px", width: "95%" }}>
            <button className="modal-close" onClick={closeDetail}>&times;</button>
            <div className="modal-body" style={{ maxHeight: "80vh", overflowY: "auto", padding: "2rem" }}>
              <header style={{ marginBottom: "2rem", borderBottom: "2px solid var(--color-primary)", paddingBottom: "1.5rem" }}>
                <div style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  시즌 2 기록 | {selectedStory.date}
                </div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-text-primary)", lineHeight: "1.35" }}>{selectedStory.title}</h2>
              </header>
              <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "2.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                <img 
                  src={selectedStory.img} 
                  alt={selectedStory.title} 
                  style={{ width: "100%", height: "auto", maxHeight: "450px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070";
                  }}
                />
              </div>
              <div 
                style={{ fontSize: "1.1rem", lineHeight: "1.9", color: "var(--color-text-primary)" }}
                dangerouslySetInnerHTML={{ __html: selectedStory.content }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
