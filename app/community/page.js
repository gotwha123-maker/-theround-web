"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CommunityPage() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("/api/stories", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // Filter stories for community category
          const communityStories = data.filter((s) => s.category === "community");
          setStories(communityStories);
        }
      } catch (err) {
        console.error("Failed to fetch community stories:", err);
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
            <span className="section-subtitle" style={{ color: "var(--color-accent-secondary)", fontSize: "0.9rem", fontWeight: 800 }}>COMMUNITY & SOLIDARITY</span>
            <h1 style={{ fontSize: "3.2rem", fontWeight: 900, marginTop: "1rem", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
              커뮤니티 조성 <span className="accent-text">& 연대</span>
            </h1>
            <p className="hero-lead" style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", wordBreak: "keep-all", color: "rgba(255, 255, 255, 0.9)" }}>
              "그라운드 위의 열정부터 따뜻한 식탁의 환대까지"<br />
              고립과 소외를 해소하고 신뢰를 쌓아 누구도 소외되지 않는 정서적 울타리를 만듭니다.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
              <div>
                <span className="section-subtitle">OUR COMMUNITY</span>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>
                  함께 땀 흘리고 식사하며<br />보이지 않는 벽을 허뭅니다.
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "2rem" }}>
                  더라운드의 연대 활동은 남북 청년들이 하나의 목적을 공유하며 대등하게 어우러지는 건강한 스킨십을 통해 시작됩니다. 매주 스포츠 활동과 정기 소통 캠페인을 통해 사회 구성원 간의 다리를 직접 잇고 있습니다.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>⚽ 스포츠 소통</span>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>🍲 연말 정기 모임</span>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>💬 일상 네트워킹</span>
                </div>
              </div>
              <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "var(--shadow-lg)", aspectRatio: "4/3" }}>
                <img src="/assets/story_soccer_censored.png" alt="UniOne FC 축구 사진" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070";
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* Core Sub Programs */}
        <section className="section" style={{ backgroundColor: "var(--color-bg-secondary)", padding: "5rem 0" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">CORE PROGRAMS</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>주요 공동체 활동</h2>
              <p className="section-lead">일상 속에서 편견 없이 녹아드는 두 가지 핵심 통로입니다.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", marginTop: "3rem" }}>
              <div style={{ backgroundColor: "white", padding: "3rem", borderRadius: "24px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "inline-block", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--color-primary)", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 800, marginBottom: "1.5rem" }}>
                  SPORTS SOLIDARITY
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>유니원 FC (UniOne FC)</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                  축구라는 세계 보편의 언어로 남북 청년들이 매주 경기장에 모여 패스를 건네고 발을 맞춥니다. 잔디 위에서는 어떠한 정치적, 문화적 장벽도 없이 한 팀으로서 신뢰와 리더십을 체득합니다.
                </p>
                <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.8", color: "var(--color-text-muted)" }}>
                  <li>매주 토요일 정기 훈련 및 경기 조율</li>
                  <li>아마추어 리그 참가 및 교류 경기</li>
                  <li>체력 증진 및 정서적 지지 시너지 효과</li>
                </ul>
              </div>

              <div style={{ backgroundColor: "white", padding: "3rem", borderRadius: "24px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "inline-block", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--color-primary)", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 800, marginBottom: "1.5rem" }}>
                  SOCIAL SHARING
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>커뮤니티 연말 송년회</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                  정착 과정의 외로움과 소외를 극복할 수 있도록 연말 정기 송년회, 명절 맞이 모임을 개설하여 따뜻한 밥 한 끼의 정을 공유합니다. 누구도 홀로 남지 않는 가족 같은 안전망을 조성합니다.
                </p>
                <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.8", color: "var(--color-text-muted)" }}>
                  <li>정착 선배들의 진솔한 자립 노하우 전수</li>
                  <li>네트워킹 파티 및 문화 나눔 공연 개최</li>
                  <li>자발적인 멘토링 자매결연 형성 지원</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Community Stories Section */}
        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">COMMUNITY STORIES</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>커뮤니티 소식 & 스토리</h2>
              <p className="section-lead">그라운드와 식탁에서 피어나는 행복하고 진솔한 일상 이야기입니다.</p>
            </div>

            {stories.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "3rem" }}>
                커뮤니티 조성 및 연대 활동의 소식이 곧 업데이트됩니다.
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
                      background: "var(--color-bg-secondary)",
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
