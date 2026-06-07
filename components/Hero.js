export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            한반도의 미래를 디자인하는 네트워크,<br />
            <span className="highlight-text">전 세계를 잇는 가치의 브릿지가 됩니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 한반도 통합의 내일을 설계할 인재들을 조직화하고,<br />
            보편적 가치에 대한 인식을 글로벌 네트워크로 확산하는 실천적 플랫폼입니다.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary btn-lg">
              비전과 전략
            </a>
            <a href="#solutions" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
              핵심 프로젝트
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
