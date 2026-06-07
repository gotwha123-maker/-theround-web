export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            한반도 통일 미래를 위한 사람들을 모으고,<br />
            <span className="highlight-text">그 가치를 세계와 연결하는 가교가 됩니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 통일 미래를 준비하는 주역들을 발굴하여 조직화하고,<br />
            커뮤니티를 강화하여 보편적 가치에 대한 인식을 전 세계로 확산합니다.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary btn-lg">
              미션과 비전
            </a>
            <a href="#solutions" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
              주요 활동
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
