export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            한반도 통일 미래의 주역을 모으고,<br />
            <span className="highlight-text">보편적 가치를 세계와 연결합니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 통합의 시대를 이끌어갈 파트너들을 조직하고,<br />
            인권 인식을 확산하여 한반도의 새로운 내일을 준비하는 실천적 커뮤니티입니다.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary btn-lg">
              미션과 비전
            </a>
            <a href="#solutions" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
              주요 사업 보기
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
