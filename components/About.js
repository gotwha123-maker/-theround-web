export default function About() {
  return (
    <section id="about" className="section about-section reveal-on-scroll">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">VISION & MISSION</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            우리가 꿈꾸는 내일
          </h2>
        </div>
        <div className="about-brand-card reveal-on-scroll">
          <div className="about-mission text-center">
            <h2>
              소중한 가치를 잇는,<br />
              <span className="highlight-text">한반도 미래 준비의 시작</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              비영리 민간단체 <strong>더라운드(The Round)</strong>는 뜻을 같이하는 파트너들이 모여<br />
              한반도 통합을 위해 마음을 나누고 힘을 보태는 소중한 공간입니다.
            </p>
            <p className="mission-desc" style={{ marginTop: "1.5rem" }}>
              우리는 인권에 대한 소중한 인식을 전 세계와 연결하는 **브릿지(Bridge)**가 되고,<br />
              함께하는 커뮤니티를 통해 통합 한반도의 내일을 진정성 있게 준비합니다.
            </p>
          </div>
        </div>

        <div className="about-values-block" style={{ marginTop: "5rem" }}>
          <div className="values-header text-center">
            <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "3rem" }}>우리의 지향점</h3>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <h4>보편적 가치의 확산</h4>
              <p>
                인권과 존엄의 가치를 소중히 여기며, 이를 전 세계 이웃들과 연결하여 깊은 공감을 만들어냅니다.
              </p>
            </div>

            <div className="value-card">
              <h4>함께하는 사람들의 힘</h4>
              <p>
                통합의 내일을 함께할 소중한 인연들을 모으고, 그분들이 역량을 발휘할 수 있도록 지지하고 응원합니다.
              </p>
            </div>

            <div className="value-card">
              <h4>진심을 담은 커뮤니티</h4>
              <p>
                따뜻한 커뮤니티를 기반으로 통일에 대한 인식을 넓혀가며, 서로의 다름을 존중하는 화합의 장을 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

