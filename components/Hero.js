"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hero-split-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-bg-dark);
          position: relative;
          padding: 8rem 2rem 6rem 2rem;
          overflow: hidden;
        }

        /* Subtle background glow for modern aesthetic */
        .hero-split-section::before {
          content: '';
          position: absolute;
          top: 10%;
          right: 5%;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, hsla(354, 85%, 48%, 0.12) 0%, transparent 70%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-split-container {
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: 1.10fr 1.15fr;
          gap: 5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero-split-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--color-primary);
          background: hsla(354, 85%, 48%, 0.1);
          padding: 0.4rem 1.2rem;
          border-radius: 30px;
          letter-spacing: 0.15em;
          margin-bottom: 1.5rem;
          border: 1px solid hsla(354, 85%, 48%, 0.25);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .hero-split-title {
          font-size: 3.4rem;
          font-weight: 900;
          line-height: 1.3;
          color: var(--color-text-light);
          letter-spacing: -2px;
          margin-bottom: 1.5rem;
          word-break: keep-all;
        }

        .hero-split-title .highlight {
          background: linear-gradient(135deg, var(--color-primary) 0%, hsl(354, 100%, 65%) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-split-description {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--color-text-dim);
          font-weight: 500;
          margin-bottom: 3.0rem;
          word-break: keep-all;
        }

        .btn-explore {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--gradient-accent);
          color: white !important;
          padding: 1.0rem 2.4rem;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: var(--shadow-accent);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }

        .btn-explore:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(220, 20, 20, 0.35);
          filter: brightness(1.1);
        }

        .arrow-icon {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .btn-explore:hover .arrow-icon {
          transform: translateX(5px);
        }

        /* Right side image & overlap effect */
        .hero-split-right {
          position: relative;
          animation: fadeInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          z-index: 2;
        }

        .hero-image-wrapper {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
          border: 1px solid var(--color-border-dark);
          aspect-ratio: 4.2 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-card-dark);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-image-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .hero-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-image-wrapper:hover .hero-main-img {
          transform: scale(1.05);
        }

        .hero-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(0, 0, 0, 0.25) 100%
          );
          pointer-events: none;
        }

        /* Scroll Mouse */
        .scroll-indicator {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .scroll-mouse {
          width: 24px;
          height: 40px;
          border: 2px solid var(--color-text-dim);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .scroll-mouse:hover {
          border-color: var(--color-primary);
          opacity: 1;
        }

        .scroll-wheel {
          width: 4px;
          height: 8px;
          background-color: var(--color-text-dim);
          border-radius: 2px;
          animation: scrollMove 1.8s infinite;
        }

        .scroll-mouse:hover .scroll-wheel {
          background-color: var(--color-primary);
        }

        @keyframes scrollMove {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-split-container {
            gap: 3rem;
            grid-template-columns: 1fr 1fr;
          }
          .hero-split-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 768px) {
          .hero-split-section {
            padding: 7rem 1.5rem 5rem 1.5rem;
            min-height: auto;
          }
          .hero-split-container {
            grid-template-columns: 1fr;
            gap: 3.5rem;
            text-align: center;
          }
          .hero-split-left {
            align-items: center;
            text-align: center;
          }
          .hero-split-title {
            font-size: 2.6rem;
          }
          .hero-split-description {
            font-size: 1.05rem;
            margin-bottom: 2rem;
          }
          .hero-image-wrapper {
            max-width: 520px;
            margin: 0 auto;
          }
          .scroll-indicator {
            display: none;
          }
        }

        @media (max-width: 576px) {
          .hero-split-title {
            font-size: 2.2rem;
          }
        }
      `}} />

      <section className="hero-split-section">
        <div className="hero-split-container">
          {/* Left Side: Content */}
          <div className="hero-split-left">
            <span className="hero-badge">THE ROUND</span>
            <h1 className="hero-split-title">
              한반도의 내일을<br />
              <span className="highlight">디자인하다</span>
            </h1>
            <p className="hero-split-description">
              남북 주민이 일상에서 함께 대안을 만들고 증명하며,<br />
              상생과 도약의 미래를 열어가는 혁신적인 행동주의 플랫폼
            </p>
            <div className="hero-action-area">
              <Link href="#about" className="btn-explore">
                자세히 알아보기
                <span className="arrow-icon">→</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Key Visual with Overlap effect */}
          <div className="hero-split-right">
            <div className="hero-image-wrapper">
              <img 
                src="/assets/selected_hero_visual.png" 
                alt="백두산 천지 일출" 
                className="hero-main-img" 
              />
              <div className="hero-image-overlay"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator pointing to the next section (About) */}
        <Link href="#about" className="scroll-indicator" aria-label="더라운드 소개로 스크롤">
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
        </Link>
      </section>
    </>
  );
}
