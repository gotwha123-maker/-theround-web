export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            한반도 통일 미래를 준비하며,<br />
            <span className="highlight-text">그 보편적 가치를 세계와 연결합니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 통합의 내일을 향한 공감대를 형성하고,<br />
            사람 중심의 실천을 통해 한반도의 평화로운 미래를 여는 가교가 됩니다.
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
