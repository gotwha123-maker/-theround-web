"use client";

import { useEffect, useState, useRef } from "react";

function Counter({ target, decimals = 0, duration = 2000 }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress); // Ease out
            const currentVal = easeProgress * target;
            setValue(currentVal);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setValue(target);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [target, duration]);

  const formattedValue = decimals > 0 
    ? value.toFixed(decimals) 
    : Math.floor(value).toLocaleString();

  return (
    <span ref={elementRef} className="counter-value">
      {formattedValue}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="section stats-section reveal-on-scroll">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">THE REALITY & DATA</span>
          <h2>
            데이터가 가리키는 한반도 통합의 좌표
          </h2>
        </div>

        <div className="stats-counters-grid">
          <div className="counter-card">
            <span className="counter-label">누적 입국 탈북민</span>
            <div className="counter-value-wrap">
              <Counter target={34537} />
              <span className="counter-unit">명</span>
            </div>
            <p className="counter-desc">1997년 집계 이후 국내에 정착한 북한이탈주민 수 (통일부 통계)</p>
          </div>

          <div className="counter-card">
            <span className="counter-label">여성 입국 비율</span>
            <div className="counter-value-wrap">
              <Counter target={72.2} decimals={1} />
              <span className="counter-unit">%</span>
            </div>
            <p className="counter-desc">누적 입국자 중 여성 비율 (총 24,944명)</p>
          </div>

          <div className="counter-card">
            <span className="counter-label">최근 입국자 수 (2025년)</span>
            <div className="counter-value-wrap">
              <Counter target={223} />
              <span className="counter-unit">명</span>
            </div>
            <p className="counter-desc">팬데믹 국경 봉쇄 이후 소폭 반등하는 최근 1년간 입국 추이</p>
          </div>
        </div>

        <div className="stats-charts-grid">
          <div className="chart-container-card">
            <h3>연도별 입국 추이 (2015 - 2025)</h3>
            <p className="chart-subtitle">코로나19 영향으로 급감했던 입국자 수가 최근 점진적으로 회복되고 있습니다.</p>
            <div className="bar-chart-wrapper">
              <div className="chart-y-axis">
                <span>1,500</span>
                <span>1,000</span>
                <span>500</span>
                <span>0</span>
              </div>
              <div className="bar-chart">
                <div className="bar-item" style={{ "--bar-val": "85%" }}>
                  <div className="bar-tooltip">2015년: 1,275명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">15</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "95%" }}>
                  <div className="bar-tooltip">2016년: 1,418명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">16</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "75%" }}>
                  <div className="bar-tooltip">2017년: 1,127명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">17</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "75%" }}>
                  <div className="bar-tooltip">2018년: 1,137명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">18</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "70%" }}>
                  <div className="bar-tooltip">2019년: 1,047명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">19</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "15%" }}>
                  <div className="bar-tooltip">2020년: 229명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">20</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "5%" }}>
                  <div className="bar-tooltip">2021년: 63명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">21</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "5%" }}>
                  <div className="bar-tooltip">2022년: 67명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">22</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "12%" }}>
                  <div className="bar-tooltip">2023년: 196명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">23</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "13%" }}>
                  <div className="bar-tooltip">2024년: 210명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">24</span>
                </div>
                <div className="bar-item" style={{ "--bar-val": "15%" }}>
                  <div className="bar-tooltip">2025년: 223명</div>
                  <div className="bar-fill"></div>
                  <span className="bar-year">25</span>
                </div>
              </div>
            </div>
            <span className="chart-source">*자료출처: 통일부 북한이탈주민 입국 현황</span>
          </div>

          <div className="chart-container-card">
            <h3>누적 성별 구성 비율</h3>
            <p className="chart-subtitle">성별 생존 조건과 경로상 입국자 대다수가 여성을 구성하고 있습니다.</p>

            <div className="gender-visual-wrapper">
              <div className="gender-svg-container">
                <svg width="180" height="180" viewBox="0 0 100 100">
                  <circle
                    className="gender-bg-circle"
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                    fill="none"
                  ></circle>
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gender-grad)"
                    strokeWidth="8"
                    fill="none"
                    style={{ 
                      transform: "rotate(-90deg)", 
                      transformOrigin: "50% 50%", 
                      strokeDasharray: "251.327", 
                      strokeDashoffset: "69.869",
                      transition: "stroke-dashoffset 1.5s ease" 
                    }}
                  ></circle>
                  <defs>
                    <linearGradient id="gender-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-accent)"></stop>
                      <stop offset="100%" stopColor="var(--color-accent-secondary)"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="gender-center-text">
                  <span className="gender-number" style={{ color: "#ff4d4d" }}>72.2%</span>
                  <span className="gender-label-sub" style={{ color: "#ff4d4d" }}>여성 비율</span>
                </div>
              </div>

              <div className="gender-legend">
                <div className="legend-item">
                  <span className="legend-dot female" style={{ backgroundColor: "#ff4d4d" }}></span>
                  <span className="legend-text" style={{ color: "#ff4d4d" }}>여성: 24,944명 (72.2%)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot male" style={{ backgroundColor: "#cbd5e1" }}></span>
                  <span className="legend-text" style={{ color: "#6b7280" }}>남성: 9,593명 (27.8%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Positive Impact & Vision Section */}
        <div className="stats-impact-block" style={{ marginTop: "6.5rem" }}>
          <div className="values-header text-center reveal-on-scroll" style={{ marginBottom: "3.5rem" }}>
            <span className="section-subtitle">POSITIVE IMPACT</span>
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1.0rem", color: "var(--color-text-primary)" }}>
              수치로 증명하는 긍정적 변화
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6", wordBreak: "keep-all" }}>
              더라운드는 한계가 아닌 가능성에 초점을 맞추며, 남북 주민이 함께 만들어가는 내일의 성과를 신뢰합니다.
            </p>
          </div>

          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
            
            {/* Impact 1: 만족도 */}
            <div className="impact-card-premium reveal-on-scroll">
              <div className="impact-fact-zone">
                <div className="fact-header">
                  <span className="fact-title">남한 생활 정착 만족도</span>
                  <div className="fact-circle-wrap">
                    <svg width="80" height="80" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="rgba(220, 20, 20, 0.04)" strokeWidth="9" fill="none" />
                      <circle cx="50" cy="50" r="40" stroke="var(--color-primary)" strokeWidth="9" fill="none"
                        style={{ 
                          transform: "rotate(-90deg)", 
                          transformOrigin: "50% 50%", 
                          strokeDasharray: "251.327", 
                          strokeDashoffset: "52.02",
                          transition: "stroke-dashoffset 1.5s ease"
                        }} 
                      />
                    </svg>
                    <div className="fact-number">79.3%</div>
                  </div>
                </div>
                <p className="fact-desc">
                  안정적인 경제 활동 참여와 주거 정착 만족도는 점차 높아지고 있지만, 역설적으로 <strong>남은 20.7%의 북한이탈주민들은 낯선 정착 환경 속에서 깊은 외로움과 사회적 고립감</strong>을 호소하고 있습니다.
                </p>
                <span className="fact-source">*출처: 남북하나재단 북한이탈주민 정착실태조사</span>
              </div>
            </div>

            {/* Impact 2: 소통 */}
            <div className="impact-card-premium reveal-on-scroll">
              <div className="impact-fact-zone">
                <div className="fact-header">
                  <span className="fact-title">만남 후 긍정 인식 변화</span>
                  <div className="fact-circle-wrap">
                    <svg width="80" height="80" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="rgba(220, 20, 20, 0.04)" strokeWidth="9" fill="none" />
                      <circle cx="50" cy="50" r="40" stroke="var(--color-primary)" strokeWidth="9" fill="none"
                        style={{ 
                          transform: "rotate(-90deg)", 
                          transformOrigin: "50% 50%", 
                          strokeDasharray: "251.327", 
                          strokeDashoffset: "18.85",
                          transition: "stroke-dashoffset 1.5s ease"
                        }} 
                      />
                    </svg>
                    <div className="fact-number">92.5%</div>
                  </div>
                </div>
                <p className="fact-desc">
                  서로 다른 문화적 배경을 지닌 남북 주민이 <strong>일방적 매체를 통하지 않고 일상에서 마주하여 대면 교류를 가질 때, 상대방에 대한 긍정적 인식과 상호 신뢰도는 압도적으로 상승</strong>합니다.
                </p>
                <span className="fact-source">*출처: 서울대 통일평화연구원 통일의식조사</span>
              </div>
            </div>

            {/* Impact 3: 디자인 */}
            <div className="impact-card-premium reveal-on-scroll">
              <div className="impact-fact-zone">
                <div className="fact-header">
                  <span className="fact-title">한반도 평화/통합 기여 의지</span>
                  <div className="fact-circle-wrap">
                    <svg width="80" height="80" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="rgba(220, 20, 20, 0.04)" strokeWidth="9" fill="none" />
                      <circle cx="50" cy="50" r="40" stroke="var(--color-primary)" strokeWidth="9" fill="none"
                        style={{ 
                          transform: "rotate(-90deg)", 
                          transformOrigin: "50% 50%", 
                          strokeDasharray: "251.327", 
                          strokeDashoffset: "44.23",
                          transition: "stroke-dashoffset 1.5s ease"
                        }} 
                      />
                    </svg>
                    <div className="fact-number">82.4%</div>
                  </div>
                </div>
                <p className="fact-desc">
                  남한 사회에 진입한 북한이탈주민들은 단순히 주어지는 복지 혜택에 안주하기보다, <strong>자신이 가진 잠재력을 살려 통일 한반도 미래의 주도적 기여자로 서고자 하는 의지</strong>가 매우 뚜렷합니다.
                </p>
                <span className="fact-source">*출처: 통일연구원(KINU) 신통일의식조사</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <style jsx>{`
        .impact-card-premium {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 28px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .impact-card-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-accent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .impact-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg), var(--shadow-accent);
          border-color: hsla(5, 75%, 48%, 0.15);
        }
        .impact-card-premium:hover::before {
          opacity: 1;
        }
        .impact-fact-zone {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .fact-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }
        .fact-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-text-primary);
          line-height: 1.3;
          text-align: left;
        }
        .fact-circle-wrap {
          position: relative;
          width: 80px;
          height: 80px;
          flex-shrink: 0;
        }
        .fact-number {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: 900;
          font-size: 1.05rem;
          color: var(--color-primary);
        }
        .fact-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.8;
          margin-bottom: 2rem;
          text-align: left;
          word-break: keep-all;
        }
        .fact-desc strong {
          color: var(--color-text-primary);
        }
        .fact-source {
          font-size: 0.75rem;
          color: var(--color-text-dim);
          font-weight: 500;
          text-align: left;
          margin-top: auto;
        }
      `}</style>
    </section>
  );
}
