"use client";

export default function SolutionsSection({ onOpenModal }) {
  return (
    <section id="solutions" className="section solutions-section dark-bg">
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">CORE PROGRAMS</span>
          <h2>핵심 사업</h2>
          <p className="section-lead">
            더라운드는 우리 사회의 파트너들이 전문성을 발휘하고 함께 성장할 수 있는 실질적인 토대를 만듭니다.
          </p>
        </div>

        <div className="programs-grid">
          <div className="program-card reveal-on-scroll" data-program="school" id="program-school">
            <div className="program-num">01</div>
            <div className="program-main-info">
              <span
                className="solution-badge"
                style={{
                  marginBottom: "0.8rem",
                  background: "var(--gradient-accent)",
                  color: "white",
                  display: "inline-block",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                주체적 역량 설계
              </span>
              <h3>리더십 스쿨</h3>
              <p>
                전문가 멘토링과 교육을 통해 각자의 커리어와 비전을 스스로 설계하는 역량 강화 과정입니다.
              </p>
            </div>
            <button 
              className="btn btn-icon-only open-modal-btn" 
              aria-label="리더십 스쿨 상세 정보 보기"
              onClick={() => onOpenModal("school")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div className="program-card reveal-on-scroll delay-100" data-program="sports" id="program-sports">
            <div className="program-num">02</div>
            <div className="program-main-info">
              <span
                className="solution-badge"
                style={{
                  marginBottom: "0.8rem",
                  background: "var(--gradient-accent)",
                  color: "white",
                  display: "inline-block",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                수평적 연대와 교류
              </span>
              <h3>유니원 FC (스포츠 연대)</h3>
              <p>
                스포츠를 통해 다양한 배경을 가진 사람들이 대등한 파트너로 어우러지는 역동적인 화합의 장입니다.
              </p>
            </div>
            <button 
              className="btn btn-icon-only open-modal-btn" 
              aria-label="유니원 FC 상세 정보 보기"
              onClick={() => onOpenModal("sports")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div className="program-card reveal-on-scroll delay-200" data-program="forum" id="program-forum">
            <div className="program-num">03</div>
            <div className="program-main-info">
              <span
                className="solution-badge"
                style={{
                  marginBottom: "0.8rem",
                  background: "var(--gradient-accent)",
                  color: "white",
                  display: "inline-block",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                통합 담론의 선도
              </span>
              <h3>평화 포럼 및 아카이빙</h3>
              <p>
                생생한 삶의 기록을 보존하고, 심도 있는 토론을 통해 사회 통합의 새로운 패러다임을 제시합니다.
              </p>
            </div>
            <button 
              className="btn btn-icon-only open-modal-btn" 
              aria-label="평화 포럼 상세 정보 보기"
              onClick={() => onOpenModal("forum")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
