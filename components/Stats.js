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

          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            
            {/* Impact 1: 만족도 */}
            <div className="value-card-premium impact-card-glow" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative"
            }}>
              <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>남한 생활 정착 만족도</span>
              <div style={{ position: "relative", width: "120px", height: "120px", marginBottom: "1.8rem" }}>
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(220, 20, 20, 0.04)" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="var(--color-primary)" strokeWidth="8" fill="none"
                    style={{ 
                      transform: "rotate(-90deg)", 
                      transformOrigin: "50% 50%", 
                      strokeDasharray: "251.327", 
                      strokeDashoffset: "52.02",
                      transition: "stroke-dashoffset 1.5s ease"
                    }} 
                  />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: 900, fontSize: "1.45rem", color: "var(--color-primary)" }}>79.3%</div>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.75", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                스스로 미래를 설계하고 삶을 개척하는 <strong>자립(Grow)</strong>의 기반이 확립되면서, 남한 생활 만족도는 매년 새로운 최고치를 기록하고 있습니다.
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 500, marginTop: "auto", borderTop: "1px solid var(--color-border)", width: "100%", paddingTop: "1rem" }}>
                *출처: 통일부 남북하나재단 정착실태조사
              </span>
            </div>

            {/* Impact 2: 소통 */}
            <div className="value-card-premium impact-card-glow" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative"
            }}>
              <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>만남 후 긍정 인식 변화</span>
              <div style={{ position: "relative", width: "120px", height: "120px", marginBottom: "1.8rem" }}>
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(220, 20, 20, 0.04)" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="var(--color-primary)" strokeWidth="8" fill="none"
                    style={{ 
                      transform: "rotate(-90deg)", 
                      transformOrigin: "50% 50%", 
                      strokeDasharray: "251.327", 
                      strokeDashoffset: "18.85",
                      transition: "stroke-dashoffset 1.5s ease"
                    }} 
                  />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: 900, fontSize: "1.45rem", color: "var(--color-primary)" }}>92.5%</div>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.75", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                함께 운동장을 뛰는 축구와 통일포차 등 일상적 <strong>소통(Connect)</strong> 활동 참여를 통해, 남북 청년 상호 신뢰와 통합 의지가 극대화되었습니다.
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 500, marginTop: "auto", borderTop: "1px solid var(--color-border)", width: "100%", paddingTop: "1rem" }}>
                *출처: 서울대 통일평화연구원 상호인식조사
              </span>
            </div>

            {/* Impact 3: 디자인 */}
            <div className="value-card-premium impact-card-glow" style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "3.5rem 2rem 3rem",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative"
            }}>
              <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>한반도 평화/통합 기여 의지</span>
              <div style={{ position: "relative", width: "120px", height: "120px", marginBottom: "1.8rem" }}>
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(220, 20, 20, 0.04)" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="var(--color-primary)" strokeWidth="8" fill="none"
                    style={{ 
                      transform: "rotate(-90deg)", 
                      transformOrigin: "50% 50%", 
                      strokeDasharray: "251.327", 
                      strokeDashoffset: "44.23",
                      transition: "stroke-dashoffset 1.5s ease"
                    }} 
                  />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: 900, fontSize: "1.45rem", color: "var(--color-primary)" }}>82.4%</div>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.75", flexGrow: 1, marginBottom: "2.2rem", wordBreak: "keep-all" }}>
                탈북 청년들은 단순 수혜 대상을 탈피해, 한반도 미래의 핵심 연사이자 리더로서 사회적 가치를 주도적으로 <strong>디자인(Design)</strong>합니다.
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 500, marginTop: "auto", borderTop: "1px solid var(--color-border)", width: "100%", paddingTop: "1rem" }}>
                *출처: 통일연구원 KINU 통일의식조사
              </span>
            </div>

          </div>
        </div>
      </div>
      <style jsx>{`
        .impact-card-glow {
          position: relative;
          overflow: hidden;
        }
        .impact-card-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--color-primary);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .impact-card-glow:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg) !important;
          border-color: rgba(220, 20, 20, 0.25) !important;
        }
        .impact-card-glow:hover::before {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
