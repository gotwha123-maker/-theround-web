export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <h1>
            탈북민이 이끄는 한반도 통일의 미래,<br />
            <span className="highlight-text">그 새로운 역사를 디자인합니다</span>
          </h1>
          <p className="hero-lead">
            더라운드는 탈북민이 한반도 통일 미래의 주역으로 우뚝 서고,<br />
            북한 인권 문제에 대한 인식을 전 세계로 확산하는 커뮤니티입니다.
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
