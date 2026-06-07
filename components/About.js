export default function About() {
  return (
    <section id="about" className="section about-section reveal-on-scroll">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">VISION & MISSION</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            비전과 미션
          </h2>
        </div>
        <div className="about-brand-card reveal-on-scroll">
          <div className="about-mission text-center">
            <h2>
              한반도의 미래,<br />
              <span className="highlight-text">함께 디자인하는 통합의 장</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              비영리 민간단체 <strong>더라운드(The Round)</strong>는 우리 사회의 다양한 파트너들이<br />
              대등한 위치에서 소통하며 통합의 내일을 설계하는 열린 커뮤니티입니다.
            </p>
            <p className="mission-desc" style={{ marginTop: "1.5rem" }}>
              우리는 각자의 경험과 지성을 결합하여 한반도의 평화로운 미래를 준비하며,<br />
              보편적 가치로서의 인권을 널리 알리고 실천하는 연대의 힘을 믿습니다.
            </p>
          </div>
        </div>

        <div className="about-values-block" style={{ marginTop: "5rem" }}>
          <div className="values-header text-center">
            <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "3rem" }}>핵심 가치</h3>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <h4>자유와 존엄</h4>
              <p>
                구성원들이 대한민국에서 안전하고 당당하게 정착하도록 돕고, 보편적 인권을 수호합니다.
              </p>
            </div>

            <div className="value-card">
              <h4>사람 중심의 통합</h4>
              <p>
                제도적 통합을 넘어, 남과 북의 사람들이 서로의 경험을 존중하며 마음으로 연결되는 화합을 꿈꿉니다.
              </p>
            </div>

            <div className="value-card">
              <h4>주체적 리더십</h4>
              <p>
                구성원이 사회 전문가로 성장하여 한반도의 다양한 비전을 스스로 이끌어갈 수 있도록 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
