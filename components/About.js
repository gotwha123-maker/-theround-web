export default function About() {
  return (
    <section id="about" className="section about-section reveal-on-scroll">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">VISION & MISSION</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            미션과 비전
          </h2>
        </div>
        <div className="about-brand-card reveal-on-scroll">
          <div className="about-mission text-center">
            <h2>
              글로벌 가치를 잇는,<br />
              <span className="highlight-text">한반도 미래를 위한 준비</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              비영리 민간단체 <strong>더라운드(The Round)</strong>는 한반도 통일 미래를 열어갈 사람들을 모으고 조직하여,<br />
              보편적 가치에 대한 인식을 세계와 연결하는 든든한 가교가 되고자 합니다.
            </p>
            <p className="mission-desc" style={{ marginTop: "1.5rem" }}>
              우리는 커뮤니티를 강화하여 한반도 문제에 대한 인식을 확산하며,<br />
              통일 시대를 실질적으로 이끌어갈 주역들과 함께 건강한 변화를 만들어갑니다.
            </p>
          </div>
        </div>

        <div className="about-values-block" style={{ marginTop: "5rem" }}>
          <div className="values-header text-center">
            <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "3rem" }}>핵심 가치</h3>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <h4>인식의 글로벌 확산</h4>
              <p>
                보편적 인권과 가치에 대한 인식을 국제 사회에 전달하고, 한반도 평화에 대한 글로벌 공감대를 넓힙니다.
              </p>
            </div>

            <div className="value-card">
              <h4>사람 중심의 조직화</h4>
              <p>
                통일 미래를 준비할 인재들을 발굴하여 조직하고, 그들이 역량을 발휘할 수 있는 실천적 토대를 마련합니다.
              </p>
            </div>

            <div className="value-card">
              <h4>커뮤니티 기반의 실천</h4>
              <p>
                강화된 커뮤니티를 통해 통일에 대한 인식을 넓히고, 상호 존중과 화합을 위한 구체적인 활동을 이어갑니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

