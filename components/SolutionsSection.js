"use client";

export default function SolutionsSection({ onOpenModal }) {
  return (
    <section id="solutions" className="section solutions-section dark-bg">
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">CORE PROGRAMS</span>
          <h2>핵심 사업</h2>
          <p className="section-lead">
            더라운드는 탈북민이 주도적으로 역량을 발휘하고 우리 사회의 전문 인력으로 성장할 수 있는 실질적인 토대를 만듭니다.
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
                전문가 멘토링과 실무 중심의 교육을 통해 탈북민이 각자의 커리어와 비즈니스 모델을 스스로 설계하는 역량 강화 과정입니다.
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
                축구를 통해 남과 북의 사람들이 대등한 파트너로 어우러지는 역동적인 화합의 현장입니다. 스포츠를 매개로 건강한 공동체를 형성합니다.
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
                탈북민들의 생생한 삶의 기록을 가치 있는 자산으로 남기고, 학술적 논의를 통해 사회 통합의 새로운 담론을 선도합니다.
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
