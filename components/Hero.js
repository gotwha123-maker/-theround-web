export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            한반도 통합의 비전,<br />
            <span className="highlight-text">우리가 함께 그리는 내일입니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 먼저 온 미래의 파트너들이 통합의 주역으로 서고,<br />
            보편적 인권과 존엄의 가치를 전 세계로 확산하는 실천적 커뮤니티입니다.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary btn-lg">
              우리의 지향점
            </a>
            <a href="#solutions" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
              핵심 활동 보기
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <a href="#about" aria-label="아래로 스크롤">
          <span className="mouse-icon">
            <span className="wheel"></span>
          </span>
        </a>
      </div>
    </section>
  );
}
