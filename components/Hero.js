"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="hero-split-section min-h-fit md:min-h-screen flex items-start md:items-center justify-center bg-[var(--color-bg-dark)] relative pt-28 pb-16 px-4 overflow-hidden sm:px-5 md:py-28 md:px-6 lg:py-32 lg:px-8">
        {/* Subtle background glow for modern aesthetic */}
        <div className="before:content-[''] before:absolute before:top-[10%] before:right-[5%] before:w-[450px] before:h-[450px] before:bg-[radial-gradient(circle,hsla(354,85%,48%,0.12)_0%,transparent_70%)] before:z-10 before:pointer-events-none"></div>

        <div className="hero-split-container w-full max-w-none grid grid-cols-1 gap-10 items-center relative z-20 text-center sm:gap-12 md:max-w-6xl md:grid-cols-[1.10fr_1.15fr] md:gap-16 md:text-left lg:gap-20">
          {/* Left Side: Content */}
          <div className="hero-split-left flex flex-col items-center text-center animate-fadeInUp md:items-start md:text-left">
            <span className="hero-badge inline-block text-sm font-extrabold text-[var(--color-primary)] bg-[hsla(354,85%,48%,0.1)] px-5 py-2 rounded-full tracking-wide mb-6 border border-[hsla(354,85%,48%,0.25)] shadow-md shadow-black/15">
              THE ROUND
            </span>
            <h1 className="hero-split-title text-[2rem] sm:text-4xl md:text-[2.85rem] lg:text-5xl font-black leading-tight text-[var(--color-text-light)] tracking-tight mb-5 sm:mb-6 [word-break:keep-all]">
              한반도의 내일을<br />
              <span className="highlight bg-gradient-to-br from-[var(--color-primary)] to-[hsl(354,100%,65%)] bg-clip-text text-transparent">디자인하다</span>
            </h1>
            <p className="hero-split-description text-[0.95rem] sm:text-base md:text-lg text-[var(--color-text-dim)] font-medium mb-8 md:mb-12 [word-break:keep-all]">
              남북 주민이 일상에서 함께 대안을 만들고 증명하며,<br />
              상생과 도약의 미래를 열어가는 혁신적인 행동주의 플랫폼
            </p>
            <div className="hero-action-area">
              <Link href="#about" className="btn-explore inline-flex items-center justify-center gap-3 bg-[var(--gradient-accent)] text-white w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-[var(--shadow-accent)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-3px] hover:shadow-[0_12px_30px_rgba(220,20,20,0.35)] hover:brightness-110 no-underline">
                자세히 알아보기
                <span className="arrow-icon text-lg transition-transform duration-300 ease-in-out group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Key Visual with Overlap effect */}
          <div className="hero-split-right relative animate-fadeInRight z-20">
            <div className="hero-image-wrapper relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/35 border border-[var(--color-border-dark)] aspect-[4/3] sm:aspect-[4.2/3] flex items-center justify-center bg-[var(--color-card-dark)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-5px] hover:shadow-3xl hover:shadow-black/50 hover:border-white/15 w-full max-w-[520px] mx-auto">
              <img 
                src="/assets/selected_hero_visual.png" 
                alt="백두산 천지 일출" 
                className="hero-main-img w-full h-full object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105" 
              />
              <div className="hero-image-overlay absolute inset-0 bg-gradient-to-br from-white/5 to-black/25 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator pointing to the next section (About) */}
        <Link href="#about" className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block" aria-label="더라운드 소개로 스크롤">
          <span className="scroll-mouse w-6 h-10 border-2 border-[var(--color-text-dim)] rounded-xl flex justify-center pt-1.5 opacity-70 transition-all duration-300 ease-in-out hover:border-[var(--color-primary)] hover:opacity-100">
            <span className="scroll-wheel w-1 h-2 bg-[var(--color-text-dim)] rounded-sm animate-[scrollMove_1.8s_infinite] hover:bg-[var(--color-primary)]"></span>
          </span>
        </Link>
      </section>
    </>
  );
}
