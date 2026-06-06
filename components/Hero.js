export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay"></div>
      <div className="hero-container">
        <div className="hero-content reveal-on-scroll">
          <span className="badge">A Circular Table for All</span>
          <h1>
            하나의 한반도<br />
            <span className="highlight-text">새로운 상상을 시작할 시간</span>
          </h1>
          <p className="hero-lead">
            분단의 어제에 머물지 않습니다.<br />
            출신과 세대의 벽을 넘어, 우리가 먼저 하나 된 한반도의 오늘을 증명합니다.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary btn-lg">
              우리의 철학
            </a>
            <a href="#solutions" className="btn btn-outline btn-lg">
              더라운드 활동
            </a>
          </div>
        </div>
        <div className="hero-visual reveal-on-scroll delay-200">
          <div className="hero-visual-card">
            <img
              src="https://images.unsplash.com/photo-1526726533691-11889983905d?q=80&w=2000&auto=format&fit=crop"
              alt="한반도에 찾아온 평화를 기뻐하며 청년들이 탁 트인 들판에서 함께 환호하고 달리는 모습"
              className="hero-img"
              style={{
                borderRadius: "24px",
                boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                objectFit: "cover",
              }}
            />
            <div className="glass-tag">
              <span className="tag-dot"></span>
              <span>함께 그리는 내일</span>
            </div>
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
