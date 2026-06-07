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
              한반도 통합을 향한 연결,<br />
              <span className="highlight-text">함께 열어가는 상생의 미래</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              비영리 민간단체 <strong>더라운드(The Round)</strong>는 통일 미래를 준비하는 사람들이 모여<br />
              우리 사회의 통합과 상생의 가치를 실현하는 전문 커뮤니티입니다.
            </p>
            <p className="mission-desc" style={{ marginTop: "1.5rem" }}>
              우리는 보편적 인권과 가치에 대한 인식을 전 세계로 확산하는 **가교(Bridge)** 역할을 수행하며,<br />
              통합 한반도의 주역들이 역량을 발휘할 수 있는 실천적 토대를 구축합니다.
            </p>
          </div>
        </div>

        <div className="about-values-block" style={{ marginTop: "5rem" }}>
          <div className="values-header text-center">
            <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "3rem" }}>핵심 가치</h3>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <h4>인권과 존엄의 가치</h4>
              <p>
                보편적 인권과 존엄성을 최우선으로 하며, 국제 사회와 협력하여 한반도 평화에 대한 공감대를 넓힙니다.
              </p>
            </div>

            <div className="value-card">
              <h4>주체적 역량 강화</h4>
              <p>
                사회 통합을 이끌어갈 인재들을 조직화하고, 전문성을 바탕으로 우리 사회의 주도적인 구성원으로 성장하도록 돕습니다.
              </p>
            </div>

            <div className="value-card">
              <h4>상생과 공존의 연대</h4>
              <p>
                다양한 배경을 가진 사람들이 소통하며 상호 존중하는 문화를 만들고, 통합 한반도를 위한 실질적인 준비를 이어갑니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

