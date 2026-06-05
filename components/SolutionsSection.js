"use client";

export default function SolutionsSection({ onOpenModal }) {
  return (
    <section id="solutions" className="section solutions-section dark-bg">
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">OUR SOLUTIONS & ACTIVITIES</span>
          <h2>
            분단의 문턱을 넘어<br />
            <span className="highlight-text">공동체의 주역으로 나아가는 통로</span>
          </h2>
          <p className="section-lead">
            더라운드는 우리 곁의 선구자들이 잠재력을 발휘하여 통합 한반도의 새로운 리더로 도약할 수 있도록 실질적인 성장 기반을 구축합니다.
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
              <h3>
                청년 리더십 스쿨 <span className="sub-title">(Youth Leadership School)</span>
              </h3>
              <p>
                단순 지원을 넘어 청년들이 스스로의 커리어와 경제적 자립을 설계하는 역량 강화 무대입니다. 1:1 전문가 멘토링과 실무 중심 코칭으로 미래의 핵심 인재를 양성합니다.
              </p>
            </div>
            <button 
              className="btn btn-icon-only open-modal-btn" 
              aria-label="청년 리더십 스쿨 상세 정보 보기"
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
              <h3>
                스포츠 연대 유니원 FC <span className="sub-title">(UniOne FC Sports Solidarity)</span>
              </h3>
              <p>
                그라운드 위에서 땀을 흘리며 대등한 파트너로서 우정을 쌓습니다. 스포츠를 매개로 남북 청년과 시민들이 편견 없이 어우러지는 가장 역동적인 화합의 현장입니다.
              </p>
            </div>
            <button 
              className="btn btn-icon-only open-modal-btn" 
              aria-label="유니원 FC 스포츠 교류 상세 정보 보기"
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
              <h3>
                평화 포럼 및 아카이빙 <span className="sub-title">(Peace Forum & Archiving)</span>
              </h3>
              <p>
                학술적 논의와 생생한 삶의 기록을 통해 사회 통합의 새로운 패러다임을 제시합니다. 선구자들의 서사를 가치 있는 기록으로 남겨 시민들과 공유하며 인식의 지평을 넓힙니다.
              </p>
            </div>
            <button 
              className="btn btn-icon-only open-modal-btn" 
              aria-label="평화 포럼 및 아카이빙 상세 정보 보기"
              onClick={() => onOpenModal("forum")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
