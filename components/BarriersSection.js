export default function BarriersSection() {
  return (
    <section id="barriers" className="section barriers-section">
      <div className="container">
        <div className="barriers-intro text-center reveal-on-scroll">
          <span className="barriers-subtitle">CHALLENGES</span>
          <h2>우리의 과제</h2>
          <p>
            더라운드는 통합의 과정에서 마주하는 구체적인 장벽들을 포착하고 해결책을 설계합니다.
          </p>
        </div>

        <div className="barriers-grid">
          <div className="barrier-card reveal-on-scroll">
            <div className="barrier-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h3>
              [경제적 자립 설계]<br />경험의 단절에서 전문적 도약으로
            </h3>
            <p className="barrier-text">
              서로 다른 경제 체제에서 오는 경험의 간극은 성장을 가로막는 첫 번째 과제입니다. 더라운드는 이 간극을 메우는 것을 넘어, 선구자들이 자본주의 시장의 핵심 인재로 거듭나도록 자립의 로드맵을 디자인합니다.
            </p>
            <div className="barrier-solution">
              <span className="solution-badge">Design Solution</span>
              <p className="solution-text">1:1 직무 멘토링, 기초 금융 자립 교육, 커리어 로드맵 설계를 지원합니다.</p>
              <a href="#solutions" className="solution-link">자립 설계 솔루션 확인하기 &rarr;</a>
            </div>
          </div>

          <div className="barrier-card reveal-on-scroll delay-100">
            <div className="barrier-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h3>
              [정서적 연대 설계]<br />심리적 거리에서 대등한 공동체로
            </h3>
            <p className="barrier-text">
              연고 없는 낯선 환경에서 느끼는 거리감은 개인이 아닌 우리 사회 공동체가 함께 풀어야 할 과제입니다. 스포츠와 문화를 매개로 높낮이 없는 관계를 형성하여, 고립을 건강한 연대의 에너지로 전환합니다.
            </p>
            <div className="barrier-solution">
              <span className="solution-badge">Design Solution</span>
              <p className="solution-text">남북 청년이 어우러지는 스포츠단과 문화 교류를 통해 주체적인 유대를 형성합니다.</p>
              <a href="#solutions" className="solution-link">연대 네트워크 확인하기 &rarr;</a>
            </div>
          </div>

          <div className="barrier-card reveal-on-scroll delay-200">
            <div className="barrier-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>
              [사회적 인식 설계]<br />편견의 언어에서 공존의 담론으로
            </h3>
            <p className="barrier-text">
              특유의 말투와 문화 차이가 '장벽'이 되는 현실은 우리 사회의 포용력을 시험하는 잣대입니다. 기록과 토론을 통해 보이지 않는 편견의 벽을 허물고, 다름이 자부심이 되는 성숙한 통합의 담론을 이끌어냅니다.
            </p>
            <div className="barrier-solution">
              <span className="solution-badge">Design Solution</span>
              <p className="solution-text">평화 포럼과 삶의 궤적을 엮는 아카이빙을 통해 시민들의 인식 변화를 주도합니다.</p>
              <a href="#solutions" className="solution-link">인식 변화 프로젝트 보기 &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
