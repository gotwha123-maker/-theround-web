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
      <section id="programs" className="section py-20 px-4 md:py-32 md:px-8 bg-[var(--color-bg-dark)] relative border-b border-[var(--color-border-dark)]">
        {/* Subtle background mesh element */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[var(--gradient-mesh)]"></div>
        
        <div className="container max-w-6xl mx-auto relative z-10 px-4 md:px-8">
          <div className="section-header text-center mb-16 md:mb-20">
            <span className="section-subtitle text-sm font-extrabold text-[var(--color-primary)] tracking-wide block mb-3">The Round Identity</span>
            <h2 className="text-2xl font-black mb-4 md:text-4xl lg:text-5xl text-[var(--color-text-light)] tracking-[-1.5px]">더라운드만의 고유한 발걸음</h2>
            <p className="section-lead text-base md:text-lg text-[var(--color-text-dim)] max-w-2xl mx-auto leading-relaxed [word-break:keep-all]">
              남북 주민들이 삶의 주체가 되어 서로를 지지하고 연대하며 만들어가는 더라운드만의 시그니처 활동을 만나보세요.
            </p>
          </div>

          <div className="programs-list flex flex-col gap-20 mt-14 lg:gap-28 lg:mt-20">
            {programs.map((p) => (
              <article className="program-row group flex flex-col items-center gap-8 bg-transparent relative px-4 md:flex-row md:gap-20 md:p-0" key={p.id} aria-label={p.title}>
                <div className="program-img-box flex-1 w-full relative rounded-[32px] overflow-hidden shadow-2xl shadow-black/30 border border-[var(--color-border-dark)] aspect-[16/10] bg-[var(--color-card-dark)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-4px] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] group-hover:border-[rgba(255,255,255,0.2)] md:flex-[1.25]">
                  <span className="program-badge absolute top-[1.8rem] left-[1.8rem] bg-neutral-900/85 backdrop-blur-sm border border-white/10 text-[var(--color-primary)] px-3 py-2 rounded-full text-xs font-extrabold tracking-wider shadow-md shadow-black/30 z-20">
                    {p.badge}
                  </span>
                  <img
                    className="program-img w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    src={p.img}
                    alt={`${p.title} 대표 이미지`}
                    onError={(e) => {
                      e.currentTarget.src = p.fallbackImg;
                    }}
                  />
                  <div className="program-img-overlay absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>

                </div>

                <div className="program-text-box flex-1 flex flex-col text-center w-full md:text-left">
                  <h3 className="program-title-h3 text-2xl font-black mb-2 md:text-3xl lg:text-[2.1rem] text-[var(--color-text-light)] tracking-tight">
                    {p.title}
                  </h3>
                  <p className="program-subtitle text-base md:text-lg text-[var(--color-primary)] font-extrabold mb-6 md:mb-[1.5rem]">
                    {p.subtitle}
                  </p>
                  <p className="program-desc text-sm md:text-base text-[var(--color-text-dim)] leading-loose mb-8 md:mb-10 [word-break:keep-all]">
                    {p.description}
                  </p>
                  
                  <div className="program-btn-wrapper flex justify-center md:justify-start">
                    <Link href={p.link} className="btn-action-more dark-theme" aria-label={`${p.title} 상세 보기`}>
                      자세히 보기 &rarr;
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
