"use client";

import Link from "next/link";

const programs = [
  {
    id: "academy",
    title: "남북청년 리더십 아카데미",
    subtitle: "한반도 미래를 디자인하는 청년 리더 육성",
    description: "남북 청년들이 단순한 수혜자에 머물지 않고 사회 문제 해결에 주도적으로 참여하는 리더로 성장합니다. 비즈니스 멘토링과 실무 역량 강화를 거쳐 실제 사회적 프로젝트를 실행합니다.",
    img: "/assets/activity_censored_8.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    link: "/academy",
    badge: "EDUCATION & LEADERSHIP",
  },
  {
    id: "unione",
    title: "스포츠 연대 유니원 FC",
    subtitle: "축구공으로 하나 되는 남북 청년의 공동체",
    description: "축구라는 만국 공통의 언어를 통해 남북 청년들이 함께 땀 흘리고 장벽을 허물어 갑니다. 경기장을 넘어 서로의 삶과 성장을 격려하는 단단한 정서적 울타리를 만듭니다.",
    img: "/assets/unione_10.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200",
    link: "/community/unione",
    badge: "SPORTS SOLIDARITY",
  },
  {
    id: "yearend",
    title: "더라운드 송년 축제",
    subtitle: "서로에게 든든한 가족이자 안전망이 되는 밤",
    description: "낯선 정착 과정에서 오는 외로움과 고립감을 지우고, 남북 청년들과 멘토진이 한자리에 모여 따뜻한 위로와 기쁨을 나눕니다. 서로의 발자취를 돌아보고 새해의 동행을 약속합니다.",
    img: "/assets/yearend_14.png",
    fallbackImg: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200",
    link: "/community/yearend",
    badge: "COMMUNITY FESTIVAL",
  }
];

export default function CorePrograms() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .programs-list {
          display: flex;
          flex-direction: column;
          gap: 7rem;
          margin-top: 5rem;
        }

        .program-row {
          display: flex;
          align-items: center;
          gap: 5rem;
          background: transparent;
          position: relative;
        }

        .program-row:nth-child(even) {
          flex-direction: row-reverse;
        }

        .program-img-box {
          flex: 1.25;
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--color-border-dark);
          aspect-ratio: 16/10;
          background-color: var(--color-card-dark);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .program-img-box::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 32px;
          padding: 1px;
          background: linear-gradient(135deg, transparent 60%, var(--color-primary) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 5;
        }

        .program-row:hover .program-img-box {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), var(--shadow-accent);
          border-color: hsla(354, 85%, 48%, 0.3);
        }

        .program-row:hover .program-img-box::before {
          opacity: 1;
        }

        .program-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .program-row:hover .program-img {
          transform: scale(1.05);
        }

        .program-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100%);
          z-index: 2;
        }

        .program-badge {
          position: absolute;
          top: 1.8rem;
          left: 1.8rem;
          background: rgba(20, 20, 20, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-primary);
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          z-index: 3;
        }

        .program-text-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .program-title-h3 {
          font-size: 2.1rem;
          font-weight: 900;
          color: var(--color-text-light);
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
        }

        .program-subtitle {
          font-size: 1.1rem;
          color: var(--color-primary);
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .program-desc {
          font-size: 1rem;
          color: var(--color-text-dim);
          line-height: 1.85;
          margin-bottom: 2.5rem;
          word-break: keep-all;
        }

        .program-btn-wrapper {
          display: flex;
        }

        .program-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--color-text-light);
          font-weight: 800;
          font-size: 1.05rem;
          transition: color 0.3s ease;
        }

        .program-link span {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .program-row:hover .program-link {
          color: var(--color-primary);
        }

        .program-row:hover .program-link span {
          transform: translateX(6px);
        }

        @media (max-width: 1024px) {
          .program-row {
            gap: 3rem;
          }
          .program-title-h3 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          #programs {
            padding: 5rem 1rem !important;
          }
          .programs-list {
            gap: 5rem;
            margin-top: 3.5rem;
          }
          .program-row,
          .program-row:nth-child(even) {
            flex-direction: column;
            gap: 2rem;
            padding: 0 1rem;
          }
          .program-img-box {
            width: 100%;
          }
          .program-text-box {
            width: 100%;
            text-align: center;
          }
          .program-btn-wrapper {
            justify-content: center;
          }
          .program-title-h3 {
            font-size: 1.6rem;
          }
          .program-subtitle {
            font-size: 1rem;
            margin-bottom: 1.2rem;
          }
          .program-desc {
            font-size: 0.95rem;
            line-height: 1.75;
            margin-bottom: 2rem;
          }
        }
      `}} />
      
      <section className="section" id="programs" style={{ padding: "8rem 0", backgroundColor: "var(--color-bg-dark)", position: "relative", borderBottom: "1px solid var(--color-border-dark)" }}>
        {/* Subtle background mesh element */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none", backgroundImage: "var(--gradient-mesh)" }}></div>
        
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>
          <div className="section-header text-center" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-subtitle" style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-primary)", letterSpacing: "0.15em", display: "block", marginBottom: "0.8rem" }}>The Round Identity</span>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "1.2rem", color: "var(--color-text-light)", letterSpacing: "-1.5px" }}>더라운드만의 고유한 발걸음</h2>
            <p className="section-lead" style={{ fontSize: "1.1rem", color: "var(--color-text-dim)", maxWidth: "700px", margin: "0 auto", lineHeight: "1.7", wordBreak: "keep-all" }}>
              남북 주민들이 삶의 주체가 되어 서로를 지지하고 연대하며 만들어가는 더라운드만의 시그니처 활동을 만나보세요.
            </p>
          </div>

          <div className="programs-list">
            {programs.map((p) => (
              <article className="program-row" key={p.id} aria-label={p.title}>
                <div className="program-img-box">
                  <span className="program-badge">{p.badge}</span>
                  <img
                    className="program-img"
                    src={p.img}
                    alt={`${p.title} 대표 이미지`}
                    onError={(e) => {
                      e.currentTarget.src = p.fallbackImg;
                    }}
                  />
                  <div className="program-img-overlay"></div>
                </div>

                <div className="program-text-box">
                  <h3 className="program-title-h3">{p.title}</h3>
                  <p className="program-subtitle">{p.subtitle}</p>
                  <p className="program-desc">{p.description}</p>
                  
                  <div className="program-btn-wrapper">
                    <Link href={p.link} className="program-link" aria-label={`${p.title} 상세 보기`}>
                      자세히 보기 <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
