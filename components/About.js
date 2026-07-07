export default function About({ onOpenModal = () => {} }) {
  return (
    <>
      <section id="about" className="section about-section reveal-on-scroll" style={{ scrollMarginTop: "80px", backgroundColor: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", padding: "8rem 0" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="section-header text-center" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-subtitle" style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-primary)", letterSpacing: "0.15em", display: "block", marginBottom: "0.8rem" }}>WHO WE ARE</span>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "1.0rem", color: "var(--color-text-primary)", letterSpacing: "-1.5px" }}>
            더라운드 소개
          </h2>
          <p className="section-lead" style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7", wordBreak: "keep-all" }}>
            더라운드가 그리는 한반도의 수평적 화합과 통합의 철학을 소개합니다.
          </p>
        </div>
        <div className="about-brand-card reveal-on-scroll" style={{ textAlign: "center", maxWidth: "850px", margin: "0 auto" }}>
          <span className="brand-badge" style={{ margin: "0 auto 2rem auto", display: "inline-block", fontSize: "0.75rem", fontWeight: 800, color: "var(--color-primary)", background: "hsla(354, 85%, 48%, 0.06)", padding: "0.4rem 1rem", borderRadius: "30px", border: "1px solid hsla(354, 85%, 48%, 0.1)" }}>MISSION STATEMENT</span>
          <h2 className="brand-slogan" style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "2rem", lineHeight: 1.4, color: "var(--color-text-primary)", letterSpacing: "-1px" }}>
            The Round: <span className="highlight-text">함께 뜻을 잇다</span>
          </h2>
          <div className="mission-divider" style={{ width: "60px", height: "4px", background: "var(--gradient-accent)", margin: "2rem auto", borderRadius: "2px" }}></div>
          <p className="mission-lead" style={{ fontSize: "1.25rem", lineHeight: "1.9", fontWeight: "700", color: "var(--color-text-primary)", wordBreak: "keep-all", margin: "0 0 1.5rem 0" }}>
            더라운드(The Round)는 자유민주주의 가치를 중심으로<br />한반도 미래를 준비하는 '원형테이블'을 상징합니다.
          </p>
          <p className="mission-desc" style={{ fontSize: "1.08rem", lineHeight: "1.8", color: "var(--color-text-muted)", wordBreak: "keep-all", margin: "0" }}>
            우리는 한반도 통합에 기여할 활동가 그룹을 형성하고,<br />지속 가능한 커뮤니티 기반을 강화하는 것을 미션으로 삼고 있습니다.
          </p>
        </div>
      </div>
    </section>

    <section id="values" className="section values-section reveal-on-scroll" style={{ scrollMarginTop: "80px", backgroundColor: "var(--color-bg-primary)", borderBottom: "1px solid var(--color-border)", padding: "8rem 0" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div id="about-values" className="about-values-block">
          <div className="values-header text-center" style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <span className="section-subtitle" style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-primary)", letterSpacing: "0.15em", display: "block", marginBottom: "0.8rem" }}>WHAT WE DO</span>
            <h3 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "1.0rem", color: "var(--color-text-primary)", letterSpacing: "-1px" }}>
              더라운드 핵심 활동
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", marginBottom: "0", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7", wordBreak: "keep-all" }}>
              자유민주주의 가치를 안고 한반도의 미래를 만들어가는 더라운드의 세 가지 활동입니다.
            </p>
          </div>
          
          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
            
            {/* Value Card 1: 활동전문가 양성 */}
            <div className="value-card-premium grow-card" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
                background: "hsla(354, 85%, 48%, 0.06)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.8rem",
                boxShadow: "0 8px 20px rgba(220, 20, 20, 0.02)",
                border: "1px solid hsla(354, 85%, 48%, 0.05)"
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
              <h4 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>활동전문가 양성</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 800, backgroundColor: "hsla(354, 85%, 48%, 0.06)", padding: "0.25rem 0.8rem", borderRadius: "30px", marginBottom: "1.5rem", border: "1px solid hsla(354, 85%, 48%, 0.08)" }}>
                리더십 스쿨 &middot; 법률 멘토링
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.8", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                한반도 통합의 현장에서 주체적으로 실천할 수 있는 활동가들을 발굴하고 전문성을 길러냅니다.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%", marginTop: "auto", alignItems: "center" }}>
                <button 
                  onClick={() => onOpenModal("school")}
                  className="btn-action-more"
                >
                  자세히 보기 &rarr;
                </button>
              </div>
            </div>

            {/* Value Card 2: 스토리 기록 */}
            <div className="value-card-premium design-card" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
                background: "hsla(354, 85%, 48%, 0.06)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.8rem",
                boxShadow: "0 8px 20px rgba(220, 20, 20, 0.02)",
                border: "1px solid hsla(354, 85%, 48%, 0.05)"
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <h4 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>스토리 기록</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 800, backgroundColor: "hsla(354, 85%, 48%, 0.06)", padding: "0.25rem 0.8rem", borderRadius: "30px", marginBottom: "1.5rem", border: "1px solid hsla(354, 85%, 48%, 0.08)" }}>
                디지털 아카이빙 &middot; 도서 출판
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.8", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                구성원들의 삶과 소중한 이야기를 기록하여 보편적 가치를 널리 알리고 공감대를 형성합니다.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%", marginTop: "auto", alignItems: "center" }}>
                <button 
                  onClick={() => onOpenModal("forum")}
                  className="btn-action-more"
                >
                  자세히 보기 &rarr;
                </button>
              </div>
            </div>

            {/* Value Card 3: 커뮤니티 강화 */}
            <div className="value-card-premium connect-card" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
                background: "hsla(354, 85%, 48%, 0.06)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.8rem",
                boxShadow: "0 8px 20px rgba(220, 20, 20, 0.02)",
                border: "1px solid hsla(354, 85%, 48%, 0.05)"
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>커뮤니티 강화</h4>
              <span style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 800, backgroundColor: "hsla(354, 85%, 48%, 0.06)", padding: "0.25rem 0.8rem", borderRadius: "30px", marginBottom: "1.5rem", border: "1px solid hsla(354, 85%, 48%, 0.08)" }}>
                유니원 FC &middot; 통일포차
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.8", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                대등한 소통과 연대가 가능한 커뮤니티 기반을 강화하여 화합의 장을 견고하게 구축합니다.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%", marginTop: "auto", alignItems: "center" }}>
                <button 
                  onClick={() => onOpenModal("sports")}
                  className="btn-action-more"
                >
                  자세히 보기 &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
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
          background: var(--color-text-primary);
        }
        .value-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05) !important;
          border-color: var(--color-text-primary) !important;
        }
        .value-card-premium:hover::before {
          opacity: 1;
        }
        .brand-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-primary);
          background: hsla(354, 85%, 48%, 0.06);
          padding: 0.3rem 0.8rem;
          border-radius: 30px;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }
        .brand-slogan {
          font-size: 2.2rem;
          font-weight: 900;
          line-height: 1.35;
          color: var(--color-text-primary);
          letter-spacing: -1px;
          word-break: keep-all;
          margin: 0;
        }
        .brand-slogan .highlight-text {
          background: linear-gradient(120deg, var(--color-primary) 0%, hsl(354, 100%, 65%) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (max-width: 768px) {
          .about-section,
          .values-section {
            padding: 5rem 1rem !important;
          }
        }
        @media (max-width: 576px) {
          .brand-slogan {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </>
  );
}
