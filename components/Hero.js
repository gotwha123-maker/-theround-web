export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            한반도 통합을 위한 실천적 동행,<br />
            <span className="highlight-text">그 가치를 함께 디자인합니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 다양한 배경을 가진 구성원들이 함께 어우러져 한반도의 내일을 준비하며,<br />
            보편적 인권과 존엄에 대한 인식을 확산해 나가는 건강한 공동체입니다.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary btn-lg">
              비전과 미션
            </a>
            <a href="#solutions" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
              핵심 사업 보기
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
