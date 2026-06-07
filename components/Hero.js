export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            한반도의 내일을 함께 준비하는 사람들,<br />
            <span className="highlight-text">그 소중한 가치를 세계와 연결합니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 통일 미래의 주역들이 모여 서로를 지원하고 조직하며,<br />
            보편적 인권에 대한 인식을 전 세계로 확산해 나가는 진정성 있는 공동체입니다.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary btn-lg">
              우리의 지향점
            </a>
            <a href="#solutions" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
              주요 활동 보기
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
