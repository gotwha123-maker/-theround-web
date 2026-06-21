"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MentoringPage() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("/api/stories", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // Filter stories for legal mentoring
          const legalStories = data.filter((s) => s.category === "legal");
          setStories(legalStories);
        }
      } catch (err) {
        console.error("Failed to fetch legal stories:", err);
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
            <span className="section-subtitle" style={{ color: "var(--color-accent-secondary)", fontSize: "0.9rem", fontWeight: 800 }}>LEGAL 1:1 MENTORING</span>
            <h1 style={{ fontSize: "3.2rem", fontWeight: 900, marginTop: "1rem", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
              법률 <span className="accent-text">1:1 멘토링</span>
            </h1>
            <p className="hero-lead" style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", wordBreak: "keep-all", color: "rgba(255, 255, 255, 0.9)" }}>
              "법률적 장벽을 넘어, 남북 주민들의 실질적인 권리 보호와 권익 옹호를 향해"<br />
              대한민국 변호사 전문 멘토진이 일상의 크고 작은 법률적 자립과 권익을 지원합니다.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
              <div>
                <span className="section-subtitle">PROGRAM PURPOSE</span>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>
                  법의 문턱을 낮추고,<br />권리를 스스로 찾아갑니다.
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "2rem" }}>
                  정착 과정에서 겪는 생소한 법률 용어와 절차적 복잡성으로 인해 북한이탈주민과 소외 청년들이 부당한 피해를 입지 않도록, 더라운드의 전문 법률인들이 1:1 매칭을 통해 든든한 가이드이자 조력자가 되어 드립니다.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>⚖️ 1:1 매칭</span>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>📄 계약서 검토</span>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>🛡️ 권리 옹호</span>
                </div>
              </div>
              <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "var(--shadow-lg)", aspectRatio: "4/3" }}>
                <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070" alt="법률 자문 사진" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Mentoring Fields */}
        <section className="section" style={{ backgroundColor: "var(--color-bg-secondary)", padding: "5rem 0" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">SUPPORT FIELDS</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>주요 자문 분야</h2>
              <p className="section-lead">일상 정착 과정 전반에 걸친 종합 법률 컨설팅을 제공합니다.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
              <div style={{ padding: "2rem", backgroundColor: "white", borderRadius: "20px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🏠</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.8rem" }}>민사 & 주거</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>임대차 계약서 검토, 주거 이전 관련 권리 의무 자문 및 부동산 사기 방지 예방 교육</p>
              </div>
              <div style={{ padding: "2rem", backgroundColor: "white", borderRadius: "20px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💼</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.8rem" }}>노동 & 고용</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>근로계약서 확인, 임금 체불 해소 방법, 부당 해고 조율 및 근로 기준 권익 자문</p>
              </div>
              <div style={{ padding: "2rem", backgroundColor: "white", borderRadius: "20px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🏢</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.8rem" }}>행정 & 국적</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>정착지원금 수급 자격 검토, 행정 처분 이의 신청, 신분 회복 절차 및 국적 등록 행정 조력</p>
              </div>
              <div style={{ padding: "2rem", backgroundColor: "white", borderRadius: "20px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🛡️</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.8rem" }}>소비자 & 금융</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>보이스피싱 피해 구조 자문, 신용 관리 지원, 다단계/사기 대처 요령 예방 교육</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">PROCESS</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>멘토링 진행 절차</h2>
              <p className="section-lead">더라운드의 신속하고 체계적인 법률 지원 프로세스입니다.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginTop: "3rem", position: "relative" }}>
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{ width: "50px", height: "50px", backgroundColor: "var(--color-primary)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto", fontWeight: 800 }}>1</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem" }}>상담 신청 접수</h4>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>온라인 플랫폼 또는 연락처를 통해 일상의 법률 고민 접수</p>
              </div>
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{ width: "50px", height: "50px", backgroundColor: "var(--color-primary)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto", fontWeight: 800 }}>2</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem" }}>사전 인터뷰 및 검토</h4>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>접수된 서류와 요구사항을 토대로 상담 내용 정제 및 변호사 검토</p>
              </div>
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{ width: "50px", height: "50px", backgroundColor: "var(--color-primary)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto", fontWeight: 800 }}>3</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem" }}>전문 멘토 매칭</h4>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>해당 법률 부문의 베테랑 전문 변호사와 1:1 전담 매칭</p>
              </div>
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{ width: "50px", height: "50px", backgroundColor: "var(--color-primary)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto", fontWeight: 800 }}>4</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem" }}>심층 상담 및 솔루션</h4>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>대면/비대면 미팅을 통한 자문 보고서 검토 및 피해 예방 조율 실행</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Legal Stories Section */}
        <section className="section" style={{ padding: "5rem 0", backgroundColor: "var(--color-bg-secondary)" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">MENTORING STORIES</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>멘토링 소식 & 스토리</h2>
              <p className="section-lead">정착 과정의 실제 자문 사례와 긍정적 변화 사례들을 소개합니다.</p>
            </div>

            {stories.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "3rem" }}>
                법률 1:1 멘토링과 관련된 소식이 곧 갱신될 예정입니다.
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
                      background: "var(--color-bg-primary)",
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
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "white", marginBottom: "1.5rem" }}>법률 자문 및 1:1 멘토링이 필요하신가요?</h2>
            <p style={{ fontSize: "1.15rem", color: "rgba(255, 255, 255, 0.9)", maxWidth: "700px", margin: "0 auto 2.5rem auto", wordBreak: "keep-all" }}>
              임대차 사기 방지, 근로 조건 침해 등 권리를 침해당했거나 법적인 가이드가 필요한 모든 분야에 대해 더라운드가 비공개 무상 법률 파트너가 되어 드립니다.
            </p>
            <a href="/#contact" className="btn btn-outline btn-lg" style={{ borderColor: "white", color: "white", backgroundColor: "transparent" }}>1:1 법률 조력 신청하기</a>
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
                  활동 기록 | {selectedStory.date}
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
