export default function About({ onOpenModal = () => {} }) {
  return (
    <section id="about" className="section about-section reveal-on-scroll" style={{ scrollMarginTop: "80px" }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">ABOUT THE ROUND</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            더라운드 소개
          </h2>
        </div>
        <div className="about-brand-card reveal-on-scroll">
          <div className="about-mission text-center">
            <h2>
              The Round: <span className="highlight-text">함께 뜻을 잇다</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              <strong>더라운드(The Round)</strong>는 자유민주주의 가치를 중심으로<br />
              한반도 미래를 준비하는 '원형테이블'을 상징합니다.
            </p>
            <p className="mission-desc" style={{ marginTop: "1.5rem" }}>
              우리는 한반도 통합에 기여할 활동가 그룹을 형성하고,<br />
              지속 가능한 커뮤니티 기반을 강화하는 것을 미션으로 삼고 있습니다.
            </p>
          </div>
        </div>

        <div id="about-values" className="about-values-block" style={{ marginTop: "6rem" }}>
          <div className="values-header text-center">
            <span className="section-subtitle">OUR CORE VALUES</span>
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1.0rem", color: "var(--color-text-primary)" }}>
              더라운드 3대 핵심 가치
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", marginBottom: "3.5rem", maxWidth: "600px", margin: "0 auto 3.5rem auto", lineHeight: "1.6", wordBreak: "keep-all" }}>
              더라운드의 실제 현장 활동에서 증명하고 있는 세 가지 가치를 소개합니다.
            </p>
          </div>
          
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
                  onClick={() => onOpenModal("school")}
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
                  onClick={() => onOpenModal("sports")}
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
                  onClick={() => onOpenModal("forum")}
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
      </div>
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
    </section>
  );
}
