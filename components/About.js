export default function About() {
  return (
    <section id="about" className="section about-section reveal-on-scroll">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">WHAT WE DO</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            미션과 비전
          </h2>
        </div>
        <div className="about-brand-card reveal-on-scroll">
          <div className="about-mission text-center">
            <h2>
              통합의 주역과 함께하는,<br />
              <span className="highlight-text">한반도 미래를 위한 준비</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              비영리 민간단체 <strong>더라운드(The Round)</strong>는 탈북청년을 통합의 주체로 세우고,<br />
              그들의 소중한 경험과 이야기를 통해 한반도의 내일을 진정성 있게 준비합니다.
            </p>
          </div>
        </div>

        <div className="about-values-block" style={{ marginTop: "5rem" }}>
          <div className="values-header text-center">
            <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "3rem" }}>우리의 실천</h3>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <h4>활동전문가 양성</h4>
              <p>
                우리는 각자의 자리에서 통합을 실천할 수 있도록 실무 교육과 멘토링을 통해 활동전문가를 양성합니다.
              </p>
            </div>

            <div className="value-card">
              <h4>스토리 기록</h4>
              <p>
                우리는 선구자들의 소중한 삶의 궤적과 스토리를 기록하여 보편적 인권과 가치를 널리 알립니다.
              </p>
            </div>

            <div className="value-card">
              <h4>커뮤니티 강화</h4>
              <p>
                우리는 남과 북의 사람들이 대등하게 마주 앉아 소통할 수 있는 커뮤니티를 강화하여 화합의 장을 넓혀갑니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

