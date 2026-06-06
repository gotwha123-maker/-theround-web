export default function About() {
  return (
    <section id="about" className="section about-section reveal-on-scroll">
      <div className="container">
        <div className="about-brand-card reveal-on-scroll">
          <div className="about-mission text-center">
            <span className="section-subtitle">VISION & IDENTITY</span>
            <h2>
              경계를 허물고<br />
              <span className="highlight-text">내일을 디자인하는 더라운드</span>
            </h2>
            <div className="mission-divider"></div>
            <p className="mission-lead">
              비영리 민간단체 <strong className="text-highlight">더라운드(The Round)</strong>는 세대와 배경을 넘어<br />
              모두가 대등한 파트너로 마주 앉는 <strong className="text-highlight-neutral">원형 테이블</strong>입니다.
            </p>
            <p className="mission-desc" style={{ marginTop: "1.5rem" }}>
              남북의 경험을 품은 선구자들이 단순한 수혜의 대상을 넘어,<br />
              우리 사회의 <strong className="text-highlight-neutral">주체적인 구성원</strong>이자 <strong className="text-highlight">한반도 통합의 미래</strong>를 직접 설계하는<br />
              <strong>'디자이너'</strong>로 도약하도록 돕는 실천적 연대망입니다.
            </p>
          </div>
        </div>

        <div id="about-impact" className="about-impact-block">
          <div className="impact-header text-center">
            <h3>이미 시작된 한반도의 오늘<br />우리가 나란히 서야 할 세 가지 필연</h3>
            <p className="impact-lead-sub">
              먼저 온 미래의 파트너들과 함께하는 과정은 우리 사회의 포용력을 증명하고 통합의 기술을 완성해가는 공동의 창조 과정입니다.
            </p>
          </div>
          <div className="impact-grid">
            <div className="impact-item">
              <div className="impact-num-badge">01</div>
              <div className="impact-info">
                <h4>두 세계를 관통하는 통합의 지성</h4>
                <p>
                  남과 북, 서로 다른 두 체제의 삶을 온몸으로 겪어낸 선구자들의 경험은 그 무엇과도 바꿀 수 없는 통합의 현장 교과서입니다. 이들의 통찰은 문화적 충돌을 예방하고, 마음의 거리를 좁히는 가장 정교한 설계도가 됩니다.
                </p>
              </div>
            </div>
            <div className="impact-item">
              <div className="impact-num-badge">02</div>
              <div className="impact-info">
                <h4>보이지 않는 선을 넘는 평화의 공명</h4>
                <p>
                  북녘의 가족들과 이어지는 이들의 삶은 외부 세계의 가치를 실어나르는 가장 따뜻하고 강력한 평화의 통로입니다. 아래로부터 시작되는 이 자발적인 울림은 닫힌 마음의 빗장을 여는 결정적인 열쇠가 됩니다.
                </p>
              </div>
            </div>
            <div className="impact-item">
              <div className="impact-num-badge">03</div>
              <div className="impact-info">
                <h4>성숙한 다원주의 사회의 완성</h4>
                <p>
                  먼저 온 파트너들과 대등하게 어우러지는 과정은 대한민국이 배경과 출신에 상관없이 구성원의 존엄을 지키는 성숙한 국가로 나아가는 시금석입니다. 우리는 서로를 통해 배우며, 더 큰 민주주의의 미래를 함께 완성합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-values-block">
          <div className="values-header text-center">
            <h3>더라운드의 3대 핵심 가치</h3>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L2 22M22 2H10M22 2V14" />
                  <path d="M12 6c4.4 0 8 3.6 8 8a8 8 0 0 1-8 8M6 12a6 6 0 0 0 6 6" />
                </svg>
              </div>
              <h4>북한의 자유와 존엄</h4>
              <span className="value-eng">Freedom & Dignity</span>
              <p>
                탈북 이웃들이 대한민국에서 당당하고 안전한 삶을 영위하도록 돕는 것은, 북한 주민들의 보편적 자유와 인권적 존엄성을 수호하는 가장 첫번째 실천입니다.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  <circle cx="12" cy="10" r="3" strokeWidth="1.5" />
                </svg>
              </div>
              <h4>사람 중심의 한반도 통합</h4>
              <span className="value-eng">Human-Centered Integration</span>
              <p>
                단순한 지리적 경계의 허묾이나 기계적인 제도 통합을 넘어, 남북의 경험을 품은 청년들과 모든 세대가 마음으로 연대하고 소통하는 통합을 이룹니다.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <h4>미래 세대의 리더십</h4>
              <span className="value-eng">Future Leadership</span>
              <p>
                남북 청년들이 단순한 보조원이나 조력자가 아닌, 통합 한반도의 다채로운 비전을 스스로 이끄는 혁신적 리더이자 사회 전문가로 성장하도록 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
