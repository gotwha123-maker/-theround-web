"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutValuesPage() {
  const [modalType, setModalType] = useState(null);

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

  const openModal = (type) => {
    setModalType(type);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalType(null);
    document.body.style.overflow = "";
  };

  const getModalContent = () => {
    if (modalType === "school") {
      return {
        title: "리더십 스쿨",
        content: (
          <div>
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
              탈북민이 우리 사회의 전문가로 성장할 수 있도록 1:1 멘토링과 실무 비즈니스 교육을 제공합니다.
            </p>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "2" }}>
              <li>전문가 1:1 진로 매칭</li>
              <li>사회적 창업 및 실무 세미나</li>
              <li>수료자 네트워크 지원</li>
            </ul>
          </div>
        )
      };
    }
    if (modalType === "sports") {
      return {
        title: "통일인식 확산",
        content: (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>1) 유니원 FC (UniOne FC)</h4>
              <p style={{ lineHeight: "1.8" }}>스포츠를 통해 남과 북의 사람들이 대등한 파트너로 어우러지는 역동적인 화합의 현장입니다. 매주 정기 훈련과 경기를 통해 건강한 공동체를 형성합니다.</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>2) 통일포차 (Unification Pocha)</h4>
              <p style={{ lineHeight: "1.8" }}>맛있는 음식과 문화적 요소를 융합하여 시민들과 함께 경직된 통일 이야기를 일상 속 축제처럼 가볍게 풀어내는 쌍방향 소통 무대입니다.</p>
            </div>
          </div>
        )
      };
    }
    if (modalType === "forum") {
      return {
        title: "평화 포럼 및 아카이빙",
        content: (
          <div>
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
              선구자들의 삶의 기록을 보존하고, 학술 토론을 통해 사회 통합의 새로운 패러다임을 제시합니다.
            </p>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "2" }}>
              <li>시민 개방형 토크 콘서트</li>
              <li>탈북 서사 도서 출판 및 기록</li>
              <li>다국어 디지털 아카이빙</li>
            </ul>
          </div>
        )
      };
    }
    return null;
  };

  const modalData = getModalContent();

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
              OUR BRAND VALUES
            </span>
            <h1 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              더라운드 3대 핵심 가치
            </h1>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6", wordBreak: "keep-all" }}>
              더라운드가 실제 현장의 활동을 통해 증명해 보이는 성장, 소통, 디자인의 핵심 가치를 보여드립니다.
            </p>
          </div>
        </div>

        {/* Values Block */}
        <div className="container" style={{ padding: "5rem 1.5rem" }}>
          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            
            {/* Value Card 1: 성장 */}
            <div className="value-card-premium grow-card" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative"
            }}>
              <div className="icon-wrapper" style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: "rgba(220, 20, 20, 0.06)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.8rem",
                boxShadow: "0 8px 20px rgba(220, 20, 20, 0.04)"
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 22h20" />
                  <path d="M12 22V10" />
                  <path d="m12 14 4-4" />
                  <path d="m12 18-4-4" />
                  <path d="M12 10a4 4 0 0 1 8-4H12Z" />
                  <path d="M12 10a4 4 0 0 0-8-4H12Z" />
                </svg>
              </div>
              <h4 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem", color: "var(--color-text-primary)" }}>성장 (Grow)</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 800, backgroundColor: "rgba(220, 20, 20, 0.05)", padding: "0.25rem 0.8rem", borderRadius: "30px", marginBottom: "1.5rem" }}>
                리더십 스쿨 &middot; 법률 멘토링
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.75", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                <strong>혜택을 받는 대상에서 스스로 서는 리더로.</strong> 리더십 스쿨과 전문가 멘토링을 통해 탈북 청년들이 스스로 삶의 전문성을 개척하고 미래의 주역으로 우뚝 서는 성장의 과정을 지원합니다.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%", marginTop: "auto", alignItems: "center" }}>
                <button 
                  onClick={() => openModal("school")}
                  style={{
                    background: "none",
                    border: "1.5px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    padding: "0.6rem 2rem",
                    borderRadius: "30px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  className="value-detail-btn"
                >
                  자세히 보기 &rarr;
                </button>
              </div>
            </div>

            {/* Value Card 2: 소통 */}
            <div className="value-card-premium connect-card" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative"
            }}>
              <div className="icon-wrapper" style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: "rgba(220, 20, 20, 0.06)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.8rem",
                boxShadow: "0 8px 20px rgba(220, 20, 20, 0.04)"
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem", color: "var(--color-text-primary)" }}>소통 (Connect)</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 800, backgroundColor: "rgba(220, 20, 20, 0.05)", padding: "0.25rem 0.8rem", borderRadius: "30px", marginBottom: "1.5rem" }}>
                유니원 FC &middot; 통일포차
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.75", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                <strong>장벽 없는 운동장과 식탁에서 피어나는 우정.</strong> 매주 함께 땀 흘리는 축구 경기와 일상 속 통일포차를 통해 남북 청년이 어떠한 격식도 없이 친구가 되는 자연스러운 소통의 장을 만듭니다.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%", marginTop: "auto", alignItems: "center" }}>
                <button 
                  onClick={() => openModal("sports")}
                  style={{
                    background: "none",
                    border: "1.5px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    padding: "0.6rem 2rem",
                    borderRadius: "30px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  className="value-detail-btn"
                >
                  자세히 보기 &rarr;
                </button>
              </div>
            </div>

            {/* Value Card 3: 디자인 */}
            <div className="value-card-premium design-card" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative"
            }}>
              <div className="icon-wrapper" style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: "rgba(220, 20, 20, 0.06)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.8rem",
                boxShadow: "0 8px 20px rgba(220, 20, 20, 0.04)"
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <h4 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem", color: "var(--color-text-primary)" }}>디자인 (Design)</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 800, backgroundColor: "rgba(220, 20, 20, 0.05)", padding: "0.25rem 0.8rem", borderRadius: "30px", marginBottom: "1.5rem" }}>
                한반도 디자이너 &middot; 아카이빙
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.75", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                <strong>과거의 증언을 넘어 한반도의 내일을 그리다.</strong> 각 분야의 리더들이 모인 '한반도 디자이너' 활동과 포럼, 아카이빙을 통해 남북의 이야기를 역사적 자산으로 기록하고 한반도의 새로운 가치를 주도적으로 디자인합니다.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%", marginTop: "auto", alignItems: "center" }}>
                <button 
                  onClick={() => openModal("forum")}
                  style={{
                    background: "none",
                    border: "1.5px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    padding: "0.6rem 2rem",
                    borderRadius: "30px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  className="value-detail-btn"
                >
                  자세히 보기 &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Program Details Modal */}
        {modalType && modalData && (
          <div className="modal open" style={{ display: "flex", zIndex: 3000 }}>
            <div className="modal-overlay" onClick={closeModal} style={{ opacity: 1, pointerEvents: "auto" }}></div>
            <div className="modal-container" style={{ maxWidth: "600px", width: "90%", zIndex: 3001 }}>
              <button className="modal-close" onClick={closeModal}>&times;</button>
              <div className="modal-body" style={{ padding: "2.5rem" }}>
                <h3 style={{ marginBottom: "1.5rem", color: "var(--color-primary)", fontSize: "1.6rem", fontWeight: 800 }}>{modalData.title}</h3>
                {modalData.content}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <style jsx>{`
        .value-card-premium {
          position: relative;
          overflow: hidden;
        }
        .value-card-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .value-card-premium::before {
          background: var(--color-primary);
        }
        .value-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg) !important;
        }
        .value-card-premium:hover::before {
          opacity: 1;
        }
        .value-card-premium:hover {
          border-color: rgba(220, 20, 20, 0.25) !important;
        }
        .value-detail-btn {
          transition: all 0.2s ease-in-out !important;
        }
        .value-detail-btn:hover {
          background-color: var(--color-primary) !important;
          color: white !important;
        }
      `}</style>
    </>
  );
}
