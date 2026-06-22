"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// 발표와 순서를 맡아 준 사람들 데이터셋 (6인)
const members = [
  { src: "/assets/yearend_member_1.png", role: "사회자", name: "이정혁", title: "유니원 FC 감독", desc: "재치 넘치는 입담과 매끄러운 진행으로 송년 축제의 밤을 하나로 따뜻하게 엮어 주었습니다." },
  { src: "/assets/yearend_member_2.png", role: "대표 스피치", name: "김은철", title: "더라운드 대표", desc: "\"스스로 서는 청년들, 함께 걷는 공동체\" 비전을 제시하며, 서로 연대하고 의지하는 안전망의 가치를 전했습니다." },
  { src: "/assets/yearend_member_shim.png", role: "스토리 콘서트", name: "심서환 대표", title: "YS F&B 대표이사", desc: "양각도 평양냉면 성공 스토리를 전하며, 주체적이고 도전적인 청년 창업의 비전과 노하우를 나눴습니다." },
  { src: "/assets/yearend_member_5.png", role: "스토리 콘서트", name: "김옥심 박사", title: "통일간호의 징검다리 대표", desc: "연세대학교 간호대학 박사후 연구원으로서 \"역경을 이겨내는 힘, 회복탄력성\"을 주제로 가슴 깊은 위로와 용기를 선물했습니다." },
  { src: "/assets/yearend_member_3.jpg", role: "축하 공연", name: "김소연", title: "가수 겸 배우", desc: "TV 조선 미스트롯3에 출연한 아름다운 목소리로 송년회의 분위기를 한층 돋우며 감동적인 무대를 선물했습니다." },
  { src: "/assets/yearend_member_4.jpg", role: "소해금 연주", name: "최리나", title: "소해금 연주가", desc: "바티칸 오케스트라 협연 등 세계적 무대에서 다져진 선율로 남북 청년들의 심금을 따뜻하게 감싸 안았습니다." }
];

// 현장 스케치 포토 갤러리 데이터셋
const yearendPhotos = [
  { src: "/assets/yearend_1.jpg", title: "따뜻한 만찬과 대화", desc: "남북 청년들과 멘토들이 함께 어우러져 맛있는 음식을 나누며 깊은 대화를 나누는 시간" },
  { src: "/assets/yearend_2.jpg", title: "서로를 알아가는 식탁", desc: "한자리에 둘러앉아 따뜻한 미소와 격려를 주고받는 대화의 현장" },
  { src: "/assets/yearend_3.jpg", title: "경청과 스피치", desc: "자립과 공동체를 향한 마음을 진솔하게 전하며 공감대를 넓혀가는 순서" },
  { src: "/assets/yearend_4.jpg", title: "그대 함께 걷는다면", desc: "송년의 밤을 마치며 참가자 전원이 함께 모여 약속하는 연대와 동행의 단체 사진" },
  { src: "/assets/yearend_5.jpg", title: "행사장을 가득 채운 온기", desc: "웃음꽃이 피어나는 테이블마다 서로가 서로에게 든든한 가족이자 친구가 되어주는 순간" }
];

export default function YearendPage() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  // ESC 키로 갤러리 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIdx === null) return;
      if (e.key === "Escape") setActivePhotoIdx(null);
      if (e.key === "ArrowLeft") setActivePhotoIdx((prev) => (prev - 1 + yearendPhotos.length) % yearendPhotos.length);
      if (e.key === "ArrowRight") setActivePhotoIdx((prev) => (prev + 1) % yearendPhotos.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIdx]);

  return (
    <>
      <Header forceSolid={true} />
      <main style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
        
        {/* Hero Section */}
        <section style={{
          position: "relative",
          padding: "10rem 0 7rem 0",
          background: "radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)",
          textAlign: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          {/* Decorative subtle bokeh particles */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "20%", left: "10%", width: "150px", height: "150px", borderRadius: "50%", background: "#fbbf24", filter: "blur(80px)" }}></div>
            <div style={{ position: "absolute", bottom: "10%", right: "15%", width: "200px", height: "200px", borderRadius: "50%", background: "#6366f1", filter: "blur(100px)" }}></div>
          </div>

          <div className="container" style={{ position: "relative", zIndex: 10 }}>
            <span style={{
              display: "inline-block",
              backgroundColor: "rgba(251, 191, 36, 0.1)",
              border: "1px solid rgba(251, 191, 36, 0.2)",
              color: "#fbbf24",
              padding: "0.5rem 1.5rem",
              borderRadius: "30px",
              fontWeight: 800,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              SPECIAL STORY | 2025 YEAR-END PARTY
            </span>
            <h1 style={{
              fontSize: "3.5rem",
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: "1.5rem",
              wordBreak: "keep-all",
              background: "linear-gradient(to right, #ffffff, #fbbf24, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              한 해를 닫으며 나누는<br />따뜻한 위로와 기쁨
            </h1>
            <p style={{
              fontSize: "1.25rem",
              color: "#94a3b8",
              maxWidth: "750px",
              margin: "0 auto",
              lineHeight: 1.8,
              wordBreak: "keep-all"
            }}>
              도망치듯 찾아온 낯선 땅에서 겪는 외로움과 고립감을 지우고, 서로가 서로에게 따뜻한 가족이 되어주는 시간.<br />
              남북 청년 및 멘토단 등 총 80여 명의 참가자가 한자리에 모여 서로의 발자취를 돌아보고 따뜻한 격려와 즐거움을 나눈 축제였습니다.
            </p>
          </div>
        </section>

        {/* Core Purpose & Background Section */}
        <section className="section" style={{ padding: "6rem 0", backgroundColor: "#0f172a" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "center" }}>
              
              {/* Left Highlight Box */}
              <div style={{
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "28px",
                padding: "3.5rem 3rem",
                position: "relative",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}>
                <div style={{ fontSize: "3rem", color: "#fbbf24", marginBottom: "1.5rem", lineHeight: 1 }}>“</div>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: "1.4", color: "#ffffff", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
                  이곳에 모인 우리는 더 이상 혼자가 아닙니다.
                </h3>
                <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: "1.8", wordBreak: "keep-all" }}>
                  서로가 서로의 가족이자 든든한 멘토가 되어, 함께 웃고 걸어갈 따뜻한 공동체를 만듭니다.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2.5rem" }}>
                  <div style={{ width: "40px", height: "2px", backgroundColor: "#fbbf24" }}></div>
                  <span style={{ fontSize: "0.95rem", color: "#fbbf24", fontWeight: 700 }}>더라운드 커뮤니티</span>
                </div>
              </div>

              {/* Right Story Paragraphs */}
              <div>
                <span style={{ color: "#fbbf24", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>THE PURPOSE</span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: 800, margin: "1rem 0 2rem 0", color: "#ffffff", wordBreak: "keep-all" }}>
                  우리가 함께 모인 목적과 취지
                </h2>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                      color: "#818cf8",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      flexShrink: 0
                    }}>1</div>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>외로움을 지우고 온기를 나누는 시간</h4>
                      <p style={{ color: "#94a3b8", lineHeight: "1.7", fontSize: "0.95rem", wordBreak: "keep-all" }}>
                        고향을 떠나 홀로 정착을 시작한 청년들에게 연말은 유독 쓸쓸한 시기입니다. 송년회는 이러한 고립과 소외를 해소하고, 서로 손을 맞잡으며 정서적인 안정을 찾는 따뜻한 울타리가 되어줍니다.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                      color: "#818cf8",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      flexShrink: 0
                    }}>2</div>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>80여 명이 함께 웃고 즐기는 축제의 현장</h4>
                      <p style={{ color: "#94a3b8", lineHeight: "1.7", fontSize: "0.95rem", wordBreak: "keep-all" }}>
                        단순히 밥을 먹는 자리를 넘어 총 80여 명의 남북 청년들과 멘토들이 함께 어우러져 다채로운 레크리에이션, 축하 공연, 바이올린과 소해금의 아름다운 선율을 나누며 모두가 하나 되어 활기차게 웃고 즐긴 살아있는 축제였습니다.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                      color: "#818cf8",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      flexShrink: 0
                    }}>3</div>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>서로의 손을 잡는 연대와 격려</h4>
                      <p style={{ color: "#94a3b8", lineHeight: "1.7", fontSize: "0.95rem", wordBreak: "keep-all" }}>
                        자립의 길을 걷고 있는 청년들과 이들을 지지하는 멘토들이 평등하게 둘러앉아 서로의 고민을 경청하고 격려하며, 다가올 새해를 용기 있게 마주할 힘을 얻습니다.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Member Profile Cards Section */}
        <section className="section" style={{ padding: "6rem 0", backgroundColor: "#1e293b", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container">
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ color: "#fbbf24", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>CONTRIBUTORS</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#ffffff", marginTop: "0.5rem" }}>발표와 공연을 맡은 사람들</h2>
              <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginTop: "0.8rem" }}>격려사, 성공 스토리, 회복탄력성 명강연부터 가슴을 울리는 선율까지 축제의 순서를 채워준 주역들입니다.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
              {members.map((m, idx) => (
                <div key={idx} style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  flexDirection: "column"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
                }}>
                  {/* Image Container with natural aspect ratio to show full slide without crop */}
                  <div style={{ position: "relative", width: "100%", overflow: "hidden", backgroundColor: "#0f172a" }}>
                    <img 
                      src={m.src} 
                      alt={m.name} 
                      style={{ width: "100%", height: "auto", display: "block" }} 
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200";
                      }}
                    />
                  </div>

                  {/* Text Details */}
                  <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.2rem" }}>
                      {m.name}
                    </h4>
                    <span style={{ fontSize: "0.85rem", color: "#fbbf24", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
                      {m.title}
                    </span>
                    <p style={{ fontSize: "0.88rem", color: "#cbd5e1", lineHeight: "1.6", marginTop: "auto", wordBreak: "keep-all" }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Photo Sketch Section */}
        <section className="section" style={{ padding: "6rem 0", backgroundColor: "#0f172a" }}>
          <div className="container">
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ color: "#fbbf24", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>PHOTO SKETCH</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 800, color: "#ffffff", marginTop: "0.5rem" }}>송년회 현장 스케치</h2>
              <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginTop: "0.8rem" }}>남북 청년이 경계 없이 마주하며 나눈 따뜻한 밥상과 미소의 흔적들입니다.</p>
            </div>

            {/* Masonry or Grid Photo Gallery */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              {yearendPhotos.map((p, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActivePhotoIdx(idx)}
                  style={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    aspectRatio: "4/3",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
                  }}
                >
                  <img src={p.src} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  
                  {/* Subtle Dark Overlay on Hover */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    transition: "opacity 0.3s",
                    opacity: 0.95
                  }}>
                    <strong style={{ fontSize: "1.1rem", color: "#ffffff", fontWeight: 700 }}>{p.title}</strong>
                    <span style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "0.3rem", display: "block" }}>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Back Link Section */}
        <section className="section" style={{ padding: "5rem 0", background: "radial-gradient(circle, #1e293b 0%, #0f172a 100%)", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem", wordBreak: "keep-all" }}>
              내년에도 스스로 일구어낼 청년들의 도전을 응원해 주세요
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2.5rem auto", lineHeight: "1.7" }}>
              더라운드 커뮤니티는 계속해서 장벽을 허물고 자립과 연대의 정서적 울타리를 굳건히 지켜나가겠습니다.
            </p>
            <a 
              href="/community" 
              style={{
                display: "inline-block",
                border: "1px solid #fbbf24",
                color: "#fbbf24",
                padding: "1rem 2.5rem",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#fbbf24";
                e.target.style.color = "#0f172a";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#fbbf24";
              }}
            >
              커뮤니티 메인으로 돌아가기
            </a>
          </div>
        </section>

      </main>

      {/* Lightbox Modal Slider */}
      {activePhotoIdx !== null && (
        <div 
          onClick={() => setActivePhotoIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}
        >
          <button 
            onClick={() => setActivePhotoIdx(null)}
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: "3rem",
              cursor: "pointer",
              lineHeight: 1
            }}
          >
            &times;
          </button>

          {/* Slider Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
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
              onClick={() => setActivePhotoIdx((prev) => (prev - 1 + yearendPhotos.length) % yearendPhotos.length)}
              style={{
                position: "absolute",
                left: "-4rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
                borderRadius: "50%",
                width: "52px",
                height: "52px",
                cursor: "pointer",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10
              }}
            >
              &#10094;
            </button>

            {/* Active Image */}
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              overflow: "hidden"
            }}>
              <img 
                src={yearendPhotos[activePhotoIdx].src} 
                alt={yearendPhotos[activePhotoIdx].title} 
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </div>

            {/* Next Button */}
            <button 
              onClick={() => setActivePhotoIdx((prev) => (prev + 1) % yearendPhotos.length)}
              style={{
                position: "absolute",
                right: "-4rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
                borderRadius: "50%",
                width: "52px",
                height: "52px",
                cursor: "pointer",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10
              }}
            >
              &#10095;
            </button>
          </div>

          {/* Info Metadata */}
          <div style={{ color: "#ffffff", textAlign: "center", marginTop: "2rem", maxWidth: "600px", padding: "0 1rem" }}>
            <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fbbf24", margin: "0 0 0.5rem 0" }}>{yearendPhotos[activePhotoIdx].title}</h4>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", margin: "0 0 1rem 0", lineHeight: "1.6" }}>{yearendPhotos[activePhotoIdx].desc}</p>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8", backgroundColor: "rgba(255,255,255,0.1)", padding: "0.3rem 1rem", borderRadius: "20px" }}>
              {activePhotoIdx + 1} / {yearendPhotos.length}
            </span>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
