export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            탈북청년과 함께 여는<br />
            <span className="highlight-text">한반도 통합의 미래를 준비합니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 경험과 역량을 가진 이들이 주역으로 서는 무대를 만들고,<br />
            보편적 가치에 대한 인식을 세계와 연결하는 가교가 되고자 합니다.
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
