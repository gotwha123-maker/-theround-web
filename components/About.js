export default function About() {
  return (
    <section id="about" className="section about-section reveal-on-scroll">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">VISION & STRATEGY</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            비전과 전략
          </h2>
        </div>
        <div className="about-brand-card reveal-on-scroll">
          <div className="about-mission text-center">
            <h2>
              글로벌 가치를 잇는,<br />
              <span className="highlight-text">한반도 미래 설계의 중심</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              비영리 민간단체 <strong>더라운드(The Round)</strong>는 한반도 통합의 비전을 전 세계로 확장하고,<br />
              실질적인 변화를 이끌어낼 미래 세대를 발굴하고 조직화하는 전문 플랫폼입니다.
            </p>
            <p className="mission-desc" style={{ marginTop: "1.5rem" }}>
              우리는 보편적 인권과 가치에 대한 인식을 글로벌 네트워크와 연결하는 **브릿지(Bridge)** 역할을 수행하며,<br />
              강력한 커뮤니티 기반의 활동을 통해 통합 한반도의 구체적인 청사진을 완성해 나갑니다.
            </p>
          </div>
        </div>

        <div className="about-values-block" style={{ marginTop: "5rem" }}>
          <div className="values-header text-center">
            <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "3rem" }}>핵심 가치</h3>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <h4>Global Advocacy</h4>
              <p>
                보편적 인권과 존엄의 가치를 국제 사회에 전달하고, 한반도 문제에 대한 글로벌 공감대를 형성합니다.
              </p>
            </div>

            <div className="value-card">
              <h4>Strategic Organization</h4>
              <p>
                통합의 내일을 디자인할 인재들을 발굴하여 체계적으로 조직화하고, 실천적인 리더십을 강화합니다.
              </p>
            </div>

            <div className="value-card">
              <h4>Active Community</h4>
              <p>
                강력한 커뮤니티를 기반으로 통일 인식을 확산하며, 사회적 담론을 주도하는 역동적인 무대를 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
