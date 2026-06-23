"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// 유니원 FC 갤러리 데이터셋 (업로드 사진 10장)
const unionePhotos = [
  { src: "/assets/unione_1.jpg", title: "그라운드 위의 파이팅", desc: "나이와 배경을 넘어 축구공 하나로 함께 발을 맞추며 신뢰를 다지는 경기 현장" },
  { src: "/assets/unione_2.jpg", title: "열정적인 훈련 세션", desc: "푸른 잔디 위에서 굵은 땀방울을 흘리며 건강한 신체와 에너지를 채워가는 모습" },
  { src: "/assets/unione_3.jpg", title: "전술과 소통의 시간", desc: "경기 시작 전 서로의 생각을 조율하고 하나의 목표를 향해 함께 작전을 구상하는 순간" },
  { src: "/assets/unione_4.jpg", title: "함께 나누는 시원한 휴식", desc: "훈련 중간 골대 옆 그늘에 모여 앉아 시원한 음료와 함께 소소한 일상을 공유하는 시간" },
  { src: "/assets/unione_5.jpg", title: "둥글게 모여 몸 풀기", desc: "20대부터 40대까지 다양한 연령과 직업의 청년들이 하나로 어우러지기 위한 준비 단계" },
  { src: "/assets/unione_6.jpg", title: "경기를 준비하는 시간", desc: "경기 시작 전 벤치에 모여 축구화를 고쳐 신고 준비 운동을 하며 호흡을 가다듬는 선수들" },
  { src: "/assets/unione_7.jpg", title: "그라운드 위의 호흡", desc: "연두색 조끼를 맞춰 입고 푸른 인조잔디 위를 걸으며 서로 눈빛과 대화를 나누는 모습" },
  { src: "/assets/unione_8.jpg", title: "치열하고 즐거운 경기", desc: "남북 청년들이 편견 없이 공 하나를 두고 경합하며 그라운드 위에서 열정을 쏟아내는 순간" },
  { src: "/assets/unione_9.jpg", title: "경기 후 시원한 휴식", desc: "치열한 훈련 뒤 차양막 아래 옹기종기 모여 앉아 시원한 물을 마시며 담소를 나누는 시간" },
  { src: "/assets/unione_10.jpg", title: "열정을 다하는 순간", desc: "상대 골문을 향해 힘차게 달리며 서로의 패스를 맞춰가는 역동적인 경기 장면" }
];

export default function UnionePage() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  // ESC 및 방향키로 갤러리 모달 제어
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIdx === null) return;
      if (e.key === "Escape") setActivePhotoIdx(null);
      if (e.key === "ArrowLeft") {
        setActivePhotoIdx((prev) => (prev - 1 + unionePhotos.length) % unionePhotos.length);
      }
      if (e.key === "ArrowRight") {
        setActivePhotoIdx((prev) => (prev + 1) % unionePhotos.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIdx]);

  return (
    <>
      {/* 글로벌 디자인 시스템 밸런스를 고려한 반응형 스타일 주입 */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 스탯 카드 시스템 - 더라운드 디자인 규격 적용 */
        .unione-stat-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          padding: 2.2rem 2rem;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .unione-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: hsla(5, 75%, 48%, 0.25);
        }
        
        /* 갤러리 카드 - 더라운드 카드 규격 적용 */
        .unione-photo-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
          aspect-ratio: 4/3;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .unione-photo-card:hover {
          transform: scale(1.02) translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 768px) {
          .unione-hero {
            padding: 7rem 0 3.5rem 0 !important;
          }
          .unione-hero-title {
            font-size: 2.2rem !important;
            line-height: 1.35 !important;
          }
          .unione-hero-desc {
            font-size: 1rem !important;
            line-height: 1.7 !important;
            padding: 0 1rem;
          }
          .unione-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
            padding: 0 1rem;
          }
          .unione-content-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 0 1rem;
          }
          .unione-title {
            font-size: 1.8rem !important;
            margin-bottom: 1.5rem !important;
          }
          .unione-highlight-card {
            padding: 2rem 1.5rem !important;
          }
          .unione-highlight-card h3 {
            font-size: 1.35rem !important;
          }
          .unione-photo-grid {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
            padding: 0 1rem;
          }
          .unione-back-btn {
            padding: 0.8rem 2rem !important;
            font-size: 0.95rem !important;
          }
          
          /* 라이트박스 모바일 대응 */
          .unione-modal-prev {
            left: 0.5rem !important;
            width: 44px !important;
            height: 44px !important;
            font-size: 1.2rem !important;
          }
          .unione-modal-next {
            right: 0.5rem !important;
            width: 44px !important;
            height: 44px !important;
            font-size: 1.2rem !important;
          }
          .unione-modal-img-wrapper {
            height: 42vh !important;
            width: 92% !important;
          }
          .unione-modal-info {
            margin-top: 1rem !important;
            padding: 0 1rem !important;
          }
          .unione-modal-info h4 {
            font-size: 1.15rem !important;
          }
          .unione-modal-info p {
            font-size: 0.88rem !important;
          }
        }
      `}} />

      <Header forceSolid={true} />
      
      <main style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-primary)" }}>
        
        {/* Hero Section */}
        <section className="unione-hero" style={{
          position: "relative",
          padding: "10rem 0 6rem 0",
          background: "linear-gradient(180deg, hsla(5, 75%, 48%, 0.05) 0%, var(--color-bg-primary) 100%)",
          textAlign: "center",
          overflow: "hidden"
        }}>
          {/* Subtle background network pattern with brand colors */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "10%", left: "5%", width: "220px", height: "220px", borderRadius: "50%", background: "var(--color-primary)", filter: "blur(100px)" }}></div>
            <div style={{ position: "absolute", bottom: "10%", right: "8%", width: "250px", height: "250px", borderRadius: "50%", background: "var(--color-accent-secondary)", filter: "blur(120px)" }}></div>
          </div>

          <div className="container" style={{ position: "relative", zIndex: 10 }}>
            <span style={{
              display: "inline-block",
              backgroundColor: "hsla(5, 75%, 48%, 0.08)",
              border: "1px solid hsla(5, 75%, 48%, 0.18)",
              color: "var(--color-primary)",
              padding: "0.5rem 1.5rem",
              borderRadius: "30px",
              fontWeight: 800,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-display)"
            }}>
              COMMUNITY SOLIDARITY | UNIONE FC
            </span>
            
            <h1 className="unione-hero-title" style={{
              fontSize: "3.5rem",
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: "1.5rem",
              color: "var(--color-text-primary)",
              wordBreak: "keep-all"
            }}>
              그라운드 위에서 통하는 하나의 언어,<br />
              <span className="accent-text" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>유니원 FC</span>
            </h1>
            
            <p className="unione-hero-desc" style={{
              fontSize: "1.25rem",
              color: "var(--color-text-muted)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.8,
              wordBreak: "keep-all"
            }}>
              탈북청년과 남한청년이 함께 달리고 발을 맞추며 보이지 않는 장벽을 허뭅니다.<br />
              패스를 전하고 골문을 향해 뛰는 매 순간 속에, 서로를 향한 단단한 신뢰와 자립을 위한 든든한 연대가 움틉니다.
            </p>
          </div>
        </section>

        {/* Info Metrics Section */}
        <section className="section" style={{ padding: "3rem 0", backgroundColor: "var(--color-bg-primary)" }}>
          <div className="container">
            <div className="unione-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
              
              {/* Stat Card 1 */}
              <div className="unione-stat-card">
                <div style={{ color: "var(--color-primary)", fontSize: "2.8rem", fontWeight: 900, marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>2023 ~</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.3rem" }}>활동 시작</div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: 0 }}>꾸준하게 이어온 연대의 역사</p>
              </div>

              {/* Stat Card 2 */}
              <div className="unione-stat-card">
                <div style={{ color: "var(--color-primary)", fontSize: "2.8rem", fontWeight: 900, marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>30명 +</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.3rem" }}>참여 회원</div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: 0 }}>20대부터 40대까지 다양한 멤버들</p>
              </div>

              {/* Stat Card 3 */}
              <div className="unione-stat-card">
                <div style={{ color: "var(--color-primary)", fontSize: "2.8rem", fontWeight: 900, marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>2주에 1회</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.3rem" }}>정기 활동</div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: 0 }}>토요일 아침마다 피어나는 에너지</p>
              </div>

            </div>
          </div>
        </section>

        {/* Content Story Section */}
        <section className="section" style={{ padding: "6rem 0", backgroundColor: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container">
            <div className="unione-content-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "center" }}>
              
              {/* Highlight Card Left */}
              <div className="unione-highlight-card" style={{
                background: "linear-gradient(135deg, hsla(5, 75%, 48%, 0.05) 0%, hsla(5, 75%, 62%, 0.02) 100%)",
                border: "1px solid var(--color-border)",
                borderRadius: "28px",
                padding: "3.5rem 3rem",
                position: "relative",
                boxShadow: "var(--shadow-sm)"
              }}>
                <div style={{ fontSize: "3rem", color: "var(--color-primary)", marginBottom: "1.5rem", lineHeight: 1 }}>“</div>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: "1.4", color: "var(--color-text-primary)", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
                  운동장은 편견이 없는 가장 완벽한 대화의 장입니다.
                </h3>
                <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)", lineHeight: "1.8", wordBreak: "keep-all" }}>
                  이름도 나이도 다른 멤버들이 축구공 하나로 함께 부딪히고 뒹굴며 진정한 동료가 됩니다. 함께 땀 흘리고 식탁을 나눌 때 서로의 삶은 더욱 든든하게 이어집니다.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2.5rem" }}>
                  <div style={{ width: "40px", height: "2px", backgroundColor: "var(--color-primary)" }}></div>
                  <span style={{ fontSize: "0.95rem", color: "var(--color-primary)", fontWeight: 700 }}>유니원 FC 공동체</span>
                </div>
              </div>

              {/* Story Right */}
              <div>
                <span style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "var(--font-display)" }}>OUR VALUES</span>
                <h2 className="unione-title" style={{ fontSize: "2.5rem", fontWeight: 800, margin: "1rem 0 2rem 0", color: "var(--color-text-primary)", wordBreak: "keep-all" }}>
                  유니원 FC가 만들어내는 긍정적인 변화
                </h2>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  
                  {/* Point 1 */}
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{
                      backgroundColor: "hsla(5, 75%, 48%, 0.08)",
                      border: "1px solid hsla(5, 75%, 48%, 0.18)",
                      color: "var(--color-primary)",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      flexShrink: 0,
                      fontFamily: "var(--font-display)"
                    }}>1</div>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>탈북청년들의 정서적 지지와 스포츠 연대</h4>
                      <p style={{ color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: "0.95rem", wordBreak: "keep-all" }}>
                        한국 사회에서 새로운 터전을 다지는 과정의 낯설음과 외로움을 해소합니다. 축구라는 보편적인 언어를 통해 심리적 안정감을 찾고 서로에게 든든한 정서적 기둥이 되어줍니다.
                      </p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{
                      backgroundColor: "hsla(5, 75%, 48%, 0.08)",
                      border: "1px solid hsla(5, 75%, 48%, 0.18)",
                      color: "var(--color-primary)",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      flexShrink: 0,
                      fontFamily: "var(--font-display)"
                    }}>2</div>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>운동 후 든든한 식사까지가 진정한 활동의 코스</h4>
                      <p style={{ color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: "0.95rem", wordBreak: "keep-all" }}>
                        경기가 끝났다고 모임이 끝나는 것이 아닙니다. 운동장에서 다진 활력은 따뜻한 식탁으로 이어집니다. 둘러앉아 편안하게 한 끼 식사를 나누며 나누는 눈인사와 조언들은 청년들의 소외감을 극복하게 만드는 가장 큰 힘이자 일상의 원동력입니다.
                      </p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{
                      backgroundColor: "hsla(5, 75%, 48%, 0.08)",
                      border: "1px solid hsla(5, 75%, 48%, 0.18)",
                      color: "var(--color-primary)",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      flexShrink: 0,
                      fontFamily: "var(--font-display)"
                    }}>3</div>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>다양한 연령과 직업이 만들어내는 자원 공유</h4>
                      <p style={{ color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: "0.95rem", wordBreak: "keep-all" }}>
                        20대부터 40대까지 다양한 라이프 스테이지를 겪는 멤버들, 그리고 각양각색의 직업을 가진 이들이 만나 건강한 생태계를 이룹니다. 취업 정보, 사회생활 멘토링, 삶의 크고 작은 경험과 인적 자원들을 자연스럽게 나누며 상호 성장합니다.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="section" style={{ padding: "6rem 0", backgroundColor: "var(--color-bg-primary)" }}>
          <div className="container">
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-display)" }}>PHOTO GALLERY</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 800, color: "var(--color-text-primary)", marginTop: "0.5rem" }}>활동 현장 스케치</h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", marginTop: "0.8rem" }}>편견 없는 그라운드 위에서 남북 청년들이 함께 나눈 미소와 열정의 기록입니다.</p>
            </div>

            {/* Grid Photo Gallery */}
            <div className="unione-photo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {unionePhotos.map((p, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActivePhotoIdx(idx)}
                  id={`unione-img-card-${idx}`}
                  className="unione-photo-card"
                >
                  <img src={p.src} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  
                  {/* Hover Overlay with robust styling and white text */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(24, 12, 12, 0.95) 0%, rgba(24, 12, 12, 0.3) 60%, transparent 100%)",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    opacity: 0.95,
                    transition: "opacity 0.3s"
                  }}>
                    <strong style={{ fontSize: "1.15rem", color: "#ffffff", fontWeight: 700 }}>{p.title}</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-dim)", marginTop: "0.3rem", display: "block", lineHeight: "1.4" }}>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Back Link CTA Section */}
        <section style={{ padding: "5rem 0", background: "linear-gradient(180deg, var(--color-bg-primary) 0%, hsla(5, 75%, 48%, 0.05) 100%)", textAlign: "center", borderTop: "1px solid var(--color-border)" }}>
          <div className="container">
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>
              그라운드 위에서 내일로 함께 나아갈 청년들을 응원합니다
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2.5rem auto", lineHeight: "1.7", wordBreak: "keep-all" }}>
              유니원 FC는 축구공을 넘어서 서로의 꿈과 성장을 지지해주는 단단한 기둥이 되겠습니다.
            </p>
            <a 
              href="/community" 
              className="unione-back-btn"
              style={{
                display: "inline-block",
                border: "2px solid var(--color-primary)",
                color: "var(--color-primary)",
                padding: "1rem 2.5rem",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "var(--color-primary)";
              }}
            >
              커뮤니티 메인으로 돌아가기
            </a>
          </div>
        </section>

      </main>

      {/* Lightbox Modal Slider (Glassmorphic Light Mode) */}
      {activePhotoIdx !== null && (
        <div 
          onClick={() => setActivePhotoIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}
        >
          {/* Close Button */}
          <button 
            onClick={() => setActivePhotoIdx(null)}
            id="unione-modal-close-btn"
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "transparent",
              border: "none",
              color: "var(--color-text-primary)",
              fontSize: "3rem",
              cursor: "pointer",
              lineHeight: 1,
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            &times;
          </button>

          {/* Slider Content Wrapper */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="unione-modal-img-wrapper"
            style={{
              position: "relative",
              maxWidth: "960px",
              width: "90%",
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Prev Button */}
            <button 
              onClick={() => setActivePhotoIdx((prev) => (prev - 1 + unionePhotos.length) % unionePhotos.length)}
              className="unione-modal-prev"
              id="unione-modal-prev-btn"
              style={{
                position: "absolute",
                left: "-4rem",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.08)",
                color: "var(--color-text-primary)",
                borderRadius: "50%",
                width: "52px",
                height: "52px",
                cursor: "pointer",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(0,0,0,0.04)";
                e.target.style.color = "var(--color-text-primary)";
              }}
            >
              &#10094;
            </button>

            {/* Current Image */}
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)"
            }}>
              <img 
                src={unionePhotos[activePhotoIdx].src} 
                alt={unionePhotos[activePhotoIdx].title} 
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
              />
            </div>

            {/* Next Button */}
            <button 
              onClick={() => setActivePhotoIdx((prev) => (prev + 1) % unionePhotos.length)}
              className="unione-modal-next"
              id="unione-modal-next-btn"
              style={{
                position: "absolute",
                right: "-4rem",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.08)",
                color: "var(--color-text-primary)",
                borderRadius: "50%",
                width: "52px",
                height: "52px",
                cursor: "pointer",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(0,0,0,0.04)";
                e.target.style.color = "var(--color-text-primary)";
              }}
            >
              &#10095;
            </button>
          </div>

          {/* Image Metadata Info */}
          <div className="unione-modal-info" style={{ color: "var(--color-text-primary)", textAlign: "center", marginTop: "2rem", maxWidth: "600px", padding: "0 1rem" }}>
            <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--color-primary)", margin: "0 0 0.5rem 0" }}>{unionePhotos[activePhotoIdx].title}</h4>
            <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", margin: "0 0 1rem 0", lineHeight: "1.6" }}>{unionePhotos[activePhotoIdx].desc}</p>
            <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", backgroundColor: "rgba(0,0,0,0.05)", padding: "0.3rem 1rem", borderRadius: "20px" }}>
              {activePhotoIdx + 1} / {unionePhotos.length}
            </span>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
