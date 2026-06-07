"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "한반도 통일은 누군가의 일이 아닌,",
    subtitle: "우리 모두의 책임입니다",
    lead: "더라운드는 한반도 통합에 기여할 시민의 역할을 함께 만들어가고자 합니다.\n탈북청년을 통합의 주체로 세우고, 그들의 이야기를 연결하여 한반도의 통합을 준비합니다.",
    btnText: "더라운드 소개",
    link: "#about",
    bg: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')", // Mountain landscape
    type: "default"
  },
  {
    id: 2,
    title: "데이터가 가리키는",
    subtitle: "한반도 통합의 좌표",
    lead: "객관적인 지표를 통해 우리 사회의 현실을 마주하고,\n실질적인 통합의 길을 찾아가는 근거를 제시합니다.",
    btnText: "자세히 보기",
    link: "#stats",
    bg: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')", // Data/Global
    type: "default"
  },
  {
    id: 3,
    title: "한반도 통합을 위한",
    subtitle: "디자이너를 소개합니다",
    lead: "우리 사회의 인식을 새롭게 디자인하는\n더라운드 전문가 그룹의 얼굴을 확인하세요.",
    btnText: "자세히 보기",
    link: "#designers",
    bg: "none", // Will use a special overlay for designer faces
    type: "designers"
  },
  {
    id: 4,
    title: "톡톡(TalkTalk): 이야기가 이어지는 공간",
    subtitle: "설문조사 및 제안 요청",
    lead: "스토리는 사람을 연결합니다. 연결은 공감을 만들고, 공감은 한반도의 미래를 바꿉니다.\n더라운드와 함께하는 새로운 소통을 시작해 보세요.",
    btnText: "자세히 보기",
    link: "#talktalk",
    bg: "url('https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2000&auto=format&fit=crop')", // People landscape
    type: "default"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-section slider-mode" style={{ padding: 0, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: slide.type === "default" ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), ${slide.bg}` : "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85))",
            backgroundColor: "#0a0a0a",
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
          {/* Background Layer 1: Korean Peninsula Map (Shown for default slides) */}
          {slide.type === "default" && (
            <div className="map-overlay" style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Korea_map_modern.svg/800px-Korea_map_modern.svg.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "45% auto",
              opacity: 0.25,
              filter: "invert(1) brightness(1.5) drop-shadow(0 0 20px rgba(255,255,255,0.2))",
              pointerEvents: "none",
              zIndex: 1
            }}></div>
          )}

          {/* Background Layer 2: Designer Portrait Fusion (Only for Designer Slide) */}
          {slide.type === "designers" && (
            <div className="designer-fusion-bg" style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              opacity: 0.3,
              filter: "grayscale(50%) contrast(120%)",
              zIndex: 1
            }}>
              <div style={{ backgroundImage: "url('/assets/김소연.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
              <div style={{ backgroundImage: "url('/assets/김은주.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
              <div style={{ backgroundImage: "url('/assets/이영현.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
              <div style={{ backgroundImage: "url('/assets/박유성.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
              <div style={{ backgroundImage: "url('/assets/김아라.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
          )}

          <div className="hero-container" style={{ position: "relative", zIndex: 10 }}>
            <div className={`hero-content ${index === current ? 'animate-up' : ''}`}>
              <h1 style={{ fontSize: "3.2rem", fontWeight: 900, marginBottom: "1.5rem", wordBreak: "keep-all" }}>
                {slide.title}<br />
                <span className="highlight-text" style={{ color: "var(--color-primary-light, #3dd1c0)" }}>{slide.subtitle}</span>
              </h1>
              <p className="hero-lead" style={{ fontSize: "1.25rem", whiteSpace: "pre-line", marginBottom: "3rem", opacity: 0.9, lineHeight: "1.8" }}>
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
        left: "40px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "white",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.8rem",
        transition: "all 0.3s",
        backdropFilter: "blur(5px)"
      }} onMouseEnter={(e) => {e.currentTarget.style.background="var(--color-primary)"; e.currentTarget.style.opacity="1";}} onMouseLeave={(e) => {e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.opacity="0.6";}}>
        &#10094;
      </button>
      <button onClick={nextSlide} className="slider-arrow next" style={{
        position: "absolute",
        right: "40px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "white",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.8rem",
        transition: "all 0.3s",
        backdropFilter: "blur(5px)"
      }} onMouseEnter={(e) => {e.currentTarget.style.background="var(--color-primary)"; e.currentTarget.style.opacity="1";}} onMouseLeave={(e) => {e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.opacity="0.6";}}>
        &#10095;
      </button>

      {/* Slide Indicators */}
      <div className="slider-dots" style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "12px",
        zIndex: 20
      }}>
        {slides.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "30px" : "12px",
              height: "12px",
              borderRadius: "10px",
              background: i === current ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}
