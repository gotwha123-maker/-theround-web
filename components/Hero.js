"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "한반도 통일 미래의 주역을 모으고",
    subtitle: "그 소중한 가치를 세계와 연결하는 가교가 됩니다",
    lead: "더라운드는 통일 미래를 준비하는 주역들을 발굴하고 조직화하며,\n커뮤니티를 강화하여 보편적 가치에 대한 인식을 전 세계로 확산합니다.",
    btnText: "미션과 비전 보기",
    link: "#about",
    bg: "url('https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2000&auto=format&fit=crop')"
  },
  {
    id: 2,
    title: "데이터가 가리키는",
    subtitle: "한반도 통합의 좌표",
    lead: "객관적인 지표와 데이터를 통해 우리 사회의 현실을 직시하고,\n실질적인 통합의 길을 찾아가는 근거를 제시합니다.",
    btnText: "통계 데이터 확인하기",
    link: "#stats",
    bg: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop')"
  },
  {
    id: 3,
    title: "한반도 통합을 위한",
    subtitle: "디자이너를 소개합니다",
    lead: "다양한 경험을 바탕으로 우리 사회의 인식을 새롭게 디자인하는\n더라운드의 핵심 전문가 그룹을 만나보세요.",
    btnText: "디자이너 프로필 보기",
    link: "#designers",
    bg: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop')"
  },
  {
    id: 4,
    title: "이야기가 이어지는 공간",
    subtitle: "설문조사 및 프로젝트 의뢰",
    lead: "학술 연구 및 정책 제안을 위한 설문조사 대상자 모집 및\n더라운드와의 협업 프로젝트를 지금 제안해 주세요.",
    btnText: "조사 의뢰하기",
    link: "#talktalk",
    bg: "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop')"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-section slider-mode" style={{ padding: 0, minHeight: "100vh", position: "relative" }}>
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), ${slide.bg}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: index === current ? 1 : 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white"
          }}
        >
          {/* Peninsula Map Overlay (Only show if necessary, or keep standard) */}
          <div className="map-overlay" style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Korea_map_modern.svg/800px-Korea_map_modern.svg.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "40% auto",
            opacity: 0.15,
            filter: "invert(1) brightness(2)",
            pointerEvents: "none"
          }}></div>

          <div className="hero-container" style={{ position: "relative", zIndex: 10 }}>
            <div className={`hero-content ${index === current ? 'animate-up' : ''}`}>
              <h1 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>
                {slide.title}<br />
                <span className="highlight-text" style={{ color: "var(--color-primary-light, #3dd1c0)" }}>{slide.subtitle}</span>
              </h1>
              <p className="hero-lead" style={{ fontSize: "1.25rem", whiteSpace: "pre-line", marginBottom: "3rem", opacity: 0.9 }}>
                {slide.lead}
              </p>
              <div className="hero-buttons">
                <a href={slide.link} className="btn btn-primary btn-lg">
                  {slide.btnText}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="slider-arrow prev" style={{
        position: "absolute",
        left: "30px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "white",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        transition: "all 0.3s"
      }} onMouseEnter={(e) => e.currentTarget.style.background="var(--color-primary)"} onMouseLeave={(e) => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
        &#10094;
      </button>
      <button onClick={nextSlide} className="slider-arrow next" style={{
        position: "absolute",
        right: "30px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "white",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        transition: "all 0.3s"
      }} onMouseEnter={(e) => e.currentTarget.style.background="var(--color-primary)"} onMouseLeave={(e) => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
        &#10095;
      </button>

      {/* Slide Indicators */}
      <div className="slider-dots" style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px",
        zIndex: 20
      }}>
        {slides.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setCurrent(i)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: i === current ? "var(--color-primary)" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}
