export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <span className="badge" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}>
            Global Advocate Community
          </span>
          <h1>
            한반도의 미래를 디자인하는 탈북 청년,<br />
            <span className="highlight-text" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: "8px", textDecorationColor: "var(--color-primary)" }}>
              그들이 쓰는 새로운 인권의 역사
            </span>
          </h1>
          <p className="hero-lead">
            더라운드는 탈북민이 단순 수혜자를 넘어 통합의 주역으로 우뚝 서고,<br />
            전 세계에 북한 인권의 가치를 확산하는 확장자가 되는 커뮤니티입니다.
          </p>
          <div className="hero-buttons">
            <a href="#designers" className="btn btn-primary btn-lg">
              디자이너 만나보기
            </a>
            <a href="#about" className="btn btn-outline btn-lg" style={{ color: "white", borderColor: "white" }}>
              더라운드 정체성
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <a href="#stats" aria-label="아래로 스크롤">
          <span className="mouse-icon">
            <span className="wheel"></span>
          </span>
        </a>
      </div>
    </section>
  );
}
