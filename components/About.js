export default function About() {
  return (
    <section id="about" className="section about-section reveal-on-scroll">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">ABOUT THE ROUND</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            더라운드 소개
          </h2>
        </div>
        <div className="about-brand-card reveal-on-scroll">
          <div className="about-mission text-center">
            <h2>
              The Round: <span className="highlight-text">함께 뜻을 잇다</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              <strong>더라운드(The Round)</strong>는 자유민주주의 가치를 중심으로<br />
              한반도 미래를 준비하는 '원형테이블'을 상징합니다.
            </p>
            <p className="mission-desc" style={{ marginTop: "1.5rem" }}>
              우리는 한반도 통합에 기여할 활동가 그룹을 형성하고,<br />
              지속 가능한 커뮤니티 기반을 강화하는 것을 미션으로 삼고 있습니다.
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
                한반도 통합의 현장에서 주체적으로 실천할 수 있는 활동가들을 발굴하고 전문성을 길러냅니다.
              </p>
            </div>

            <div className="value-card">
              <h4>스토리 기록</h4>
              <p>
                구성원들의 삶과 소중한 이야기를 기록하여 보편적 가치를 널리 알리고 공감대를 형성합니다.
              </p>
            </div>

            <div className="value-card">
              <h4>커뮤니티 강화</h4>
              <p>
                대등한 소통과 연대가 가능한 커뮤니티 기반을 강화하여 화합의 장을 견고하게 구축합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

