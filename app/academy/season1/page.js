"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// 멘토 데이터 (사진 필드 제거 및 브로셔의 100% 팩트 약력 정보 유지)
const mentors = [
  {
    name: "이상하 멘토",
    role: "기업가치 (Corporate Value)",
    tag: "Value",
    details: [
      "現) ㈜비티비벤처스 회장",
      "現) ㈜비티비인베스트먼트 회장",
      "前) 두산그룹 재무전략 사장",
      "前) 네오플럭스 대표 사장",
      "前) OB맥주"
    ]
  },
  {
    name: "최규복 멘토",
    role: "기업의 사회적 역할과 책임",
    tag: "CSR",
    details: [
      "現) (사) CEO 지식나눔 회장",
      "前) 유한킴벌리 대표 사장"
    ]
  },
  {
    name: "이광성 멘토",
    role: "기업혁신 (프로세스 및 IT 관점)",
    tag: "Innovation",
    details: [
      "前) 한국 CIO포럼 회장",
      "前) 두산그룹 CIO 사장",
      "前) 삼성전자 CIO",
      "前) 삼성SDS 컨설팅본부장"
    ]
  },
  {
    name: "임정택 멘토",
    role: "창업스토리 Case Study",
    tag: "Startup",
    details: [
      "現) Hisbeans 대표"
    ]
  },
  {
    name: "박한울 멘토",
    role: "창업컨설팅 Key Success Factor",
    tag: "Consulting",
    details: [
      "現) 재단법인 심센터 본부장"
    ]
  },
  {
    name: "김승환 멘토",
    role: "경영프랙티스 (뷰티/소비재)",
    tag: "Practice",
    details: [
      "現) 아모레퍼시픽 대표 사장",
      "前) McKinsey"
    ]
  },
  {
    name: "최성우 멘토",
    role: "Back office 상시 멘토",
    tag: "Backoffice",
    details: [
      "現) 중앙노동위원회 사용자위원",
      "現) (사) CEO 지식나눔 회원",
      "現) 더라운드 고문",
      "前) 두산그룹 CHRO 사장",
      "前) 두산인프라코어 중국지주 전략담당",
      "前) 대우중공업 기획팀장"
    ]
  }
];

// 5회차 공식 일정 데이터
const schedules = [
  { id: "01", date: "08월 30일", title: "제1기 개강 및 1회차 세션 완료" },
  { id: "02", date: "09월 27일", title: "2회차 세션 완료" },
  { id: "03", date: "10월 25일", title: "3회차 세션 완료" },
  { id: "04", date: "11월 22일", title: "4회차 세션 완료" },
  { id: "05", date: "12월 27일", title: "5회차 최종 세션 및 수료 완료" }
];

// 위촉패 수여식 기념사진 갤러리 데이터
const plaqueGallery = [
  {
    name: "이상하 멘토",
    image: "/assets/activity_lee_sangha.jpg",
    caption: "이상하 멘토 위촉패 전달"
  },
  {
    name: "이광성 멘토",
    image: "/assets/activity_lee_gwangseong.jpg",
    caption: "이광성 멘토 위촉패 전달"
  },
  {
    name: "임정택 멘토",
    image: "/assets/activity_lim_jungtaek.jpg",
    caption: "임정택 멘토 위촉패 전달"
  },
  {
    name: "박한울 멘토",
    image: "/assets/activity_park_haneul.jpg",
    caption: "박한울 멘토 위촉패 전달"
  },
  {
    name: "김승환 멘토",
    image: "/assets/activity_kim_seunghwan.jpg",
    caption: "김승환 멘토 위촉패 전달"
  },
  {
    name: "최규복 멘토",
    image: "/assets/activity_choi_kyubok.jpg",
    caption: "최규복 멘토 위촉패 전달"
  }
];

// 아카데미 1기 현장 활동 사진 갤러리 데이터 (얼굴 블러/모자이크 처리 완료)
const activityGallery = [
  { src: "/assets/activity_censored_1.jpg", title: "네트워킹 식사 세션", desc: "식사를 나누며 진행된 격의 없는 대화와 고민 상담 시간" },
  { src: "/assets/activity_censored_2.jpg", title: "기업가치 특강", desc: "이상하 멘토가 들려주는 기업가치 평가와 재무 전략 강연" },
  { src: "/assets/activity_censored_3.jpg", title: "사회적 역할과 CSR 특강", desc: "최규복 멘토가 제시하는 현대 기업의 사회적 책임에 관한 세션" },
  { src: "/assets/activity_censored_4.jpg", title: "제1기 단체 응원 사진", desc: "리더십 아카데미를 무사히 마칠 것을 다짐하며 남북 청년들과 함께한 단체 사진" },
  { src: "/assets/activity_censored_5.jpg", title: "백오피스 멘토링 세션", desc: "최성우 CHRO 멘토가 제시하는 인사/조직 관리 핵심 실무 지식 강연" },
  { src: "/assets/activity_censored_6.jpg", title: "강연 및 질의응답 피드백", desc: "강연을 경청하며 개인 비즈니스 모델의 개선 방향을 토론하는 소그룹 시간" },
  { src: "/assets/activity_censored_7.jpg", title: "비즈니스 모델 심층 토론", desc: "참여 청년들이 설계해 온 비전을 멘토들과 함께 분석하고 정교화하는 과정" },
  { src: "/assets/activity_censored_8.jpg", title: "아카데미 수료 기념 단체사진 (1)", desc: "총 5회차의 대장정을 성공적으로 완주한 후 다 함께 모여 촬영한 수료 사진" },
  { src: "/assets/activity_censored_9.jpg", title: "아카데미 수료 기념 단체사진 (2)", desc: "남북 청년 경제 리더로 거듭난 시즌 1 수료생들의 영광스러운 순간" },
  { src: "/assets/activity_censored_10.jpg", title: "아카데미 최종 수료식 현장", desc: "수료장과 위촉패를 전달하며 서로를 격려하고 박수 갈채를 보내는 훈훈한 시간" },
  { src: "/assets/activity_censored_11.jpg", title: "아모레퍼시픽 사옥 견학 투어 (1)", desc: "세계적인 뷰티/소비재 기업의 본사 공간을 직접 탐방하는 현장 학습" },
  { src: "/assets/activity_censored_12.jpg", title: "소비재 비즈니스 현장 특강 (1)", desc: "김승환 아모레퍼시픽 대표 사장이 주관한 기업가 정신 및 뷰티 마케팅 특강" },
  { src: "/assets/activity_censored_14.jpg", title: "소비재 비즈니스 현장 특강 (2)", desc: "김승환 사장의 강연을 주의 깊게 필기하고 의견을 주고받는 청년들" },
  { src: "/assets/activity_censored_15.jpg", title: "소비재 비즈니스 현장 특강 (3)", desc: "소비자 니즈 발견과 비즈니스 성공 방정식에 대해 경청하는 강연 현장" }
];

export default function AcademySeason1Page() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (imgSrc) => {
    setLightboxImage(imgSrc);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Header forceSolid={true} />
      <main style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", paddingBottom: "6rem" }}>
        
        {/* Hero Section */}
        <section style={{ 
          backgroundImage: "linear-gradient(135deg, hsl(24, 12%, 6%) 0%, hsl(24, 12%, 14%) 100%)",
          color: "white", 
          padding: "13rem 0 10rem 0", 
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* 한반도 배경 맵 */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "60%",
            height: "90%",
            transform: "translate(-50%, -50%)",
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Korea_map_modern.svg/800px-Korea_map_modern.svg.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            opacity: 0.06,
            filter: "invert(1) brightness(1.6)",
            pointerEvents: "none"
          }}></div>

          <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "850px" }}>
            <span style={{ 
              color: "var(--color-accent-secondary)", 
              fontSize: "0.82rem", 
              fontWeight: 800, 
              letterSpacing: "3px",
              display: "inline-block",
              marginBottom: "1.2rem",
              background: "rgba(255, 255, 255, 0.04)",
              padding: "0.4rem 1.2rem",
              borderRadius: "50px",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}>
              ARCHIVE - SEASON 1
            </span>
            <h1 style={{ fontSize: "3.4rem", fontWeight: 900, marginTop: "0.5rem", marginBottom: "1.8rem", wordBreak: "keep-all", letterSpacing: "-1.5px", lineHeight: "1.2" }}>
              제1기 남북청년 <span className="accent-text" style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, #ff8a65 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>리더십 아카데미</span>
            </h1>
            <p style={{ fontSize: "1.15rem", opacity: 0.85, margin: "0 auto 3rem auto", lineHeight: "1.9", wordBreak: "keep-all", color: "var(--color-text-dim)" }}>
              "관계와 공감의 시작 (2025)"<br />
              남북 청년들이 비즈니스라는 실질적이고 강력한 미래 경제 언어로 하나 되어 소통하고,<br />
              체계적인 멘토링 프로그램 속에서 리더십 역량을 탄탄히 다진 과정입니다.
            </p>

            {/* 일정 요약 */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.8rem" }}>
              {schedules.map((s) => (
                <div key={s.id} style={{ 
                  background: "rgba(255, 255, 255, 0.03)", 
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  padding: "0.5rem 1rem", 
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <span style={{ 
                    width: "6px", 
                    height: "6px", 
                    borderRadius: "50%", 
                    background: "var(--color-primary)" 
                  }}></span>
                  <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.85)" }}>{s.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="section" style={{ padding: "8rem 0", background: "var(--color-bg-secondary)" }}>
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div className="section-header text-center" style={{ marginBottom: "5rem" }}>
              <span className="section-subtitle">01 OVERVIEW</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 800 }}>남북 청년 리더십 아카데미 취지</h2>
              <p className="section-lead" style={{ maxWidth: "700px" }}>
                비즈니스라는 공통 언어로 마음의 벽을 내리고 실질적 경제 리더십을 다졌습니다.
              </p>
            </div>

            {/* 개요 텍스트 */}
            <div style={{ 
              background: "var(--color-bg-primary)", 
              padding: "4rem 3.5rem", 
              borderRadius: "28px", 
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)"
            }}>
              <p style={{ color: "var(--color-text-primary)", fontSize: "1.08rem", lineHeight: "1.9", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
                남북청년 리더십 아카데미는 남북 청년들이 한반도의 미래를 준비하며, 자신들의 비즈니스 모델을 구체화하고 실질적인 경제 역량을 강화할 수 있도록 기획된 멘토링 및 네트워킹 프로그램입니다.
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.85", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
                강연과 단순 정보 전달에만 그치지 않고, 멘토들의 경험을 바탕으로 한 맞춤형 멘토링, 상호 간의 진솔한 토론, 다각적 네트워킹을 거쳐 남북 청년 스스로가 자신의 비전과 사업 계획을 주도적으로 검토 및 발전시킬 수 있도록 견고하게 설계되었습니다.
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.85", wordBreak: "keep-all" }}>
                경제와 비즈니스라는 공통 언어를 중심으로 청년와 기성세대가 만나, 경제적 관점에서 통일 이후 한반도 사회의 통합과 공동 번영의 비전을 함께 모색하며 세대 간의 단단한 연대를 형성하고자 하였습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Schedule & TimeTable Section */}
        <section className="section" style={{ backgroundColor: "var(--color-bg-dark)", color: "white", padding: "8rem 0" }}>
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div className="section-header text-center" style={{ marginBottom: "5rem" }}>
              <span className="section-subtitle" style={{ color: "var(--color-accent-secondary)" }}>02 SCHEDULE & TIMETABLE</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 800, color: "white" }}>운영 일정 및 프로그램 일과</h2>
              <p className="section-lead" style={{ color: "var(--color-text-dim)" }}>
                2025년 8월부터 12월까지 매월 1회 토요일(총 5회), 하루 4시간씩 체계적으로 진행되었습니다.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3.5rem", alignItems: "start" }}>
              
              {/* 왼쪽: 5회차 타임라인 */}
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "2rem", borderLeft: "3px solid var(--color-primary)", paddingLeft: "0.8rem", color: "white" }}>
                  5회차 공식 일정
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem", position: "relative", paddingLeft: "1.5rem" }}>
                  <div style={{ position: "absolute", left: "5px", top: "8px", bottom: "8px", width: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }}></div>
                  
                  {schedules.map((s) => (
                    <div key={s.id} style={{ position: "relative" }}>
                      <div style={{ 
                        position: "absolute", 
                        left: "-24px", 
                        top: "8px", 
                        width: "8px", 
                        height: "8px", 
                        borderRadius: "50%", 
                        backgroundColor: "var(--color-primary)"
                      }}></div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "white" }}>{s.date}</span>
                        <span style={{ fontSize: "0.82rem", color: "var(--color-text-dim)", fontWeight: 500 }}>
                          {s.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 일일 타임블록 구조 */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "2.5rem 2rem", borderRadius: "24px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "2rem", color: "white" }}>일일 시간 배분 (4시간 구성)</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                  <div>
                    <span style={{ 
                      fontSize: "0.8rem", 
                      fontWeight: 800, 
                      color: "white", 
                      background: "var(--gradient-accent)", 
                      padding: "0.3rem 0.7rem", 
                      borderRadius: "8px",
                      display: "inline-block",
                      marginBottom: "0.6rem"
                    }}>
                      16:00 ~ 18:00
                    </span>
                    <h4 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.4rem" }}>주제 강연 및 질의응답 (2시간)</h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--color-text-dim)", lineHeight: "1.6" }}>
                      - 1시간: 멘토진이 주관하는 비즈니스/창업 분야 강연<br />
                      - 1시간: 강연 관련 Q&A 및 참여 청년 개별 비전 피드백
                    </p>
                  </div>

                  <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }}></div>

                  <div>
                    <span style={{ 
                      fontSize: "0.8rem", 
                      fontWeight: 800, 
                      color: "var(--color-text-dim)", 
                      background: "rgba(255, 255, 255, 0.08)", 
                      padding: "0.3rem 0.7rem", 
                      borderRadius: "8px",
                      display: "inline-block",
                      marginBottom: "0.6rem"
                    }}>
                      18:00 ~ 20:00
                    </span>
                    <h4 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.4rem" }}>저녁 식사, 멘토링 & 네트워킹 (2시간)</h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--color-text-dim)", lineHeight: "1.6" }}>
                      - 식사를 겸한 자유로운 고민 상담 및 격식 없는 멘토링<br />
                      - 참여 남북 청년들과 멘토진 간의 깊이 있는 친밀 네트워크 구축
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Mentors Section (완전 이미지 프리 콤팩트화 UI) */}
        <section className="section" style={{ padding: "8rem 0", background: "var(--color-bg-secondary)" }}>
          <div className="container">
            <div className="section-header text-center" style={{ marginBottom: "5rem" }}>
              <span className="section-subtitle">03 LEADERSHIP MENTORS</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 800 }}>시즌 1 최고의 멘토진</h2>
              <p className="section-lead">
                제1기 아카데미의 신뢰할 수 있는 가이더가 되어준 비즈니스 멘토 7인입니다.
              </p>
            </div>

            {/* 멘토 콤팩트 그리드 카드 레이아웃 (사진 삭제형) */}
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center", 
              gap: "2rem",
              maxWidth: "1050px",
              margin: "0 auto" 
            }}>
              {mentors.map((m) => (
                <div 
                  key={m.name} 
                  style={{
                    background: "var(--color-bg-primary)",
                    borderRadius: "24px",
                    border: "1px solid var(--color-border)",
                    width: "220px",
                    padding: "1.8rem 1.2rem",
                    boxShadow: "var(--shadow-sm)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }}
                >
                  <span style={{ 
                    fontSize: "0.75rem", 
                    color: "var(--color-primary)", 
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    display: "block",
                    marginBottom: "0.4rem"
                  }}>
                    {m.tag}
                  </span>
                  
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 0.4rem 0" }}>
                    {m.name}
                  </h3>
                  
                  <span style={{ 
                    fontSize: "0.78rem", 
                    color: "var(--color-text-muted)", 
                    fontWeight: 500,
                    lineHeight: "1.35",
                    display: "block",
                    minHeight: "36px",
                    marginBottom: "1rem"
                  }}>
                    {m.role}
                  </span>

                  <div style={{ width: "100%", height: "1px", backgroundColor: "var(--color-border)", marginBottom: "1rem" }}></div>

                  {/* 콤팩트 약력 목록 */}
                  <ul style={{ 
                    listStyle: "none", 
                    padding: 0, 
                    margin: 0, 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "0.4rem",
                    width: "100%",
                    textAlign: "left"
                  }}>
                    {m.details.map((d, i) => (
                      <li key={i} style={{ 
                        fontSize: "0.78rem", 
                        color: "var(--color-text-muted)", 
                        lineHeight: "1.4", 
                        display: "flex", 
                        alignItems: "flex-start",
                        gap: "0.3rem"
                      }}>
                        <span style={{ color: "var(--color-primary)", fontSize: "0.6rem", marginTop: "2px" }}>•</span>
                        <span style={{ wordBreak: "keep-all" }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 멘토 위촉패 및 수여식 섹션 (04 MENTOR APPOINTMENT PLAQUE) */}
        <section className="section" style={{ padding: "8rem 0", background: "var(--color-bg-primary)" }}>
          <div className="container" style={{ maxWidth: "1200px" }}>
            <div className="section-header text-center" style={{ marginBottom: "5rem" }}>
              <span className="section-subtitle">04 MENTOR APPOINTMENT PLAQUE</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 800 }}>멘토 위촉패 수여식</h2>
              <p className="section-lead" style={{ maxWidth: "750px", margin: "0.5rem auto 0 auto" }}>
                남북청년들이 한반도 미래의 핵심 경제 리더로 성장할 수 있도록 지혜를 나누어주신 멘토분들께<br />
                더 라운드와 남북청년들의 깊은 감사와 존경을 담아 위촉패를 제작하여 전달해 드렸습니다.
              </p>
            </div>

            {/* 메인 레이아웃: 좌측 위촉패 액자 / 우측 수여 스냅사진 그리드 */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "4rem",
              alignItems: "start"
            }} className="plaque-layout-grid">
              
              {/* CSS 스타일링을 위한 반응형 스타일 태그 삽입 */}
              <style dangerouslySetInnerHTML={{__html: `
                .plaque-sticky-container {
                  position: static;
                }
                @media (min-width: 992px) {
                  .plaque-layout-grid {
                    grid-template-columns: 1fr 1.3fr !important;
                  }
                  .plaque-sticky-container {
                    position: sticky !important;
                    top: 120px;
                  }
                }
              `}} />

              {/* [좌측] 프리미엄 위촉패 액자 UI (수여 취지와 실제 문구 고정) */}
              <div className="plaque-sticky-container" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 10
              }}>
                <div style={{
                  width: "100%",
                  maxWidth: "430px",
                  background: "#fcfbf9", // 고급 한지 미색
                  borderRadius: "220px 220px 30px 30px", // 실제 위촉패 아치형 실루엣 재현
                  padding: "1.2rem",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.08), inset 0 0 30px rgba(220, 212, 195, 0.2)",
                  border: "3px double rgba(189, 155, 108, 0.5)", // 이중 라인
                  position: "relative"
                }}>
                  {/* 내부 아치 장식 보더 */}
                  <div style={{
                    border: "1.5px solid rgba(189, 155, 108, 0.4)",
                    borderRadius: "205px 205px 20px 20px",
                    padding: "4.5rem 1.8rem 3.5rem 1.8rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center"
                  }}>
                    {/* 상단 돔형 얇은 가이드 아치 */}
                    <div style={{
                      position: "absolute",
                      top: "2rem",
                      bottom: "2rem",
                      left: "2rem",
                      right: "2rem",
                      border: "1px dashed rgba(189, 155, 108, 0.3)",
                      borderRadius: "190px 190px 15px 15px",
                      pointerEvents: "none"
                    }}></div>

                    {/* 아치 내부 위촉패 콘텐츠 */}
                    <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
                      
                      {/* 타이틀 */}
                      <h3 style={{
                        fontSize: "2.1rem",
                        fontWeight: 800,
                        color: "#1c2d37",
                        letterSpacing: "8px",
                        margin: "0 0 2.2rem 0",
                        fontFamily: "'Playfair Display', 'Noto Serif KR', serif"
                      }}>
                        멘토 위촉패
                      </h3>

                      {/* 멘토 정보 (대표 예시: 이광성 회장) */}
                      <div style={{ marginBottom: "2.5rem" }}>
                        <p style={{
                          fontSize: "0.85rem",
                          color: "#666",
                          fontWeight: 500,
                          margin: "0 0 0.4rem 0",
                          letterSpacing: "0.5px"
                        }}>
                          두산그룹 CIO, 한국 CIO포럼
                        </p>
                        <p style={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: "#111",
                          margin: 0,
                          letterSpacing: "2px"
                        }}>
                          회장 <span style={{ fontSize: "1.45rem", fontWeight: 800 }}>이광성</span>
                        </p>
                      </div>

                      {/* 본문 내용 */}
                      <p style={{
                        fontSize: "0.93rem",
                        color: "#2c3e50",
                        lineHeight: "1.95",
                        textAlign: "center",
                        margin: "0 auto 2.5rem auto",
                        maxWidth: "310px",
                        wordBreak: "keep-all",
                        fontWeight: 400
                      }}>
                        <strong>이광성 회장</strong>께서는 남북청년들이 꿈과 희망을 가지고 미래비전에 도전할 수 있도록 커뮤니티와 리더십 아카데미의 멘토로 참여해 주시기에 감사와 존경의 마음을 담아 이 패를 드립니다.
                      </p>

                      {/* 수여 날짜 */}
                      <p style={{
                        fontSize: "0.88rem",
                        color: "#555",
                        fontWeight: 500,
                        margin: "0 0 3rem 0",
                        letterSpacing: "1px"
                      }}>
                        2025년 10월 25일
                      </p>

                      {/* 발급 기관 및 직인 */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        marginTop: "1rem"
                      }}>
                        {/* 로고 */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <span style={{
                            fontSize: "1.05rem",
                            fontWeight: 800,
                            letterSpacing: "1.5px",
                            color: "#d32f2f"
                          }}>
                            더 라운드
                          </span>
                          <span style={{
                            fontSize: "0.48rem",
                            letterSpacing: "1.5px",
                            color: "#d32f2f",
                            marginTop: "-3px"
                          }}>
                            THE ROUND
                          </span>
                        </div>

                        {/* 대표 이름 & 직인 */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative"
                        }}>
                          <span style={{
                            fontSize: "1.05rem",
                            fontWeight: 700,
                            color: "#222",
                            marginRight: "0.3rem"
                          }}>
                            대표 김은철
                          </span>
                          
                          {/* 빨간색 인감도장 모양 데코레이션 */}
                          <div style={{
                            border: "1.5px solid #d32f2f",
                            color: "#d32f2f",
                            padding: "3px 4px",
                            borderRadius: "4px",
                            fontSize: "0.65rem",
                            fontWeight: "bold",
                            lineHeight: "1.1",
                            letterSpacing: "0.5px",
                            fontFamily: "monospace",
                            backgroundColor: "rgba(211, 47, 47, 0.03)",
                            display: "inline-block",
                            transform: "rotate(-3deg)",
                            userSelect: "none"
                          }}>
                            더라운드<br />대표인
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
                
                {/* 하단 취지 보충 텍스트 설명 */}
                <p style={{
                  fontSize: "0.82rem",
                  color: "var(--color-text-muted)",
                  marginTop: "1.5rem",
                  textAlign: "center",
                  maxWidth: "380px",
                  lineHeight: "1.5",
                  wordBreak: "keep-all"
                }}>
                  ※ 위 내용은 멘토진 전체에 수여된 위촉패의 실제 디자인과 공통 문구 양식입니다.
                </p>
              </div>

              {/* [우측] 6인의 멘토 수여 기념사진 그리드 */}
              <div>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  marginBottom: "1.5rem",
                  color: "var(--color-text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem"
                }}>
                  <span style={{
                    width: "8px",
                    height: "18px",
                    borderRadius: "4px",
                    background: "var(--color-primary)",
                    display: "inline-block"
                  }}></span>
                  위촉패 전달 기념사진
                </h3>
                
                <p style={{
                  fontSize: "0.92rem",
                  color: "var(--color-text-muted)",
                  lineHeight: "1.6",
                  marginBottom: "2.5rem",
                  wordBreak: "keep-all"
                }}>
                  더 라운드의 남북청년 커뮤니티와 리더십 아카데미 멘토로 동참해 주신 대표님들께 감사와 존경을 표하며 전달해 드린 현장 기념사진입니다. (사진을 클릭하시면 크게 보실 수 있습니다.)
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "1.5rem"
                }}>
                  {plaqueGallery.map((mentor, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => openLightbox(mentor.image)}
                        style={{
                          background: "var(--color-bg-secondary)",
                          borderRadius: "20px",
                          overflow: "hidden",
                          border: "1px solid var(--color-border)",
                          boxShadow: "var(--shadow-sm)",
                          cursor: "zoom-in",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          display: "flex",
                          flexDirection: "column",
                          position: "relative"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
                          e.currentTarget.style.boxShadow = "var(--shadow-md)";
                          e.currentTarget.style.borderColor = "var(--color-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                          e.currentTarget.style.borderColor = "var(--color-border)";
                        }}
                      >
                        {/* 사진 영역 */}
                        <div style={{
                          position: "relative",
                          paddingTop: "75%", // 4:3 비율
                          overflow: "hidden",
                          backgroundColor: "var(--color-bg-dark)"
                        }}>
                          <img
                            src={mentor.image}
                            alt={mentor.caption}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.4s ease"
                            }}
                          />
                        </div>

                        {/* 멘토 정보 레이아웃 */}
                        <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", flexGrow: 1, textAlign: "center" }}>
                          <span style={{
                            fontSize: "0.75rem",
                            color: "var(--color-primary)",
                            fontWeight: 700,
                            marginBottom: "0.3rem",
                            letterSpacing: "0.5px"
                          }}>
                            제1기 리더십 아카데미
                          </span>
                          
                          <h4 style={{
                            fontSize: "0.95rem",
                            fontWeight: 800,
                            color: "var(--color-text-primary)",
                            margin: 0
                          }}>
                            {mentor.caption}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 현장 활동 사진 갤러리 섹션 (05 ACTIVE GALLERY) */}
        <section className="section" style={{ padding: "8rem 0", background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }}>
          <div className="container" style={{ maxWidth: "1200px" }}>
            <div className="section-header text-center" style={{ marginBottom: "5rem" }}>
              <span className="section-subtitle">05 ACTIVE GALLERY</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 800 }}>아카데미 현장 활동 기록</h2>
              <p className="section-lead" style={{ maxWidth: "700px", margin: "0.5rem auto 0 auto" }}>
                배움과 네트워킹, 그리고 뜨거운 열정이 가득했던 시즌 1의 생생한 교육 및 투어 현장 스냅사진입니다.
              </p>
            </div>

            {/* 활동 사진 그리드 배치 */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
              gap: "2rem" 
            }}>
              {activityGallery.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => openLightbox(item.src)}
                  style={{
                    background: "var(--color-bg-primary)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-sm)",
                    cursor: "zoom-in",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  {/* 사진 영역 */}
                  <div style={{ position: "relative", paddingTop: "66.67%", overflow: "hidden", backgroundColor: "var(--color-bg-dark)" }}>
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      style={{ 
                        position: "absolute", 
                        top: 0, 
                        left: 0, 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transition: "transform 0.4s ease"
                      }}
                    />
                  </div>

                  {/* 텍스트 내용 */}
                  <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--color-primary)", fontWeight: 800, marginBottom: "0.4rem", textTransform: "uppercase" }}>
                      Activity {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "0.4rem" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", margin: 0, lineHeight: "1.5", wordBreak: "keep-all" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* 고해상도 라이트박스 뷰어 모달 */}
      {lightboxImage && (
        <div 
          onClick={closeLightbox}
          style={{ 
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
            cursor: "zoom-out",
            padding: "2rem"
          }}
        >
          <div style={{ 
            position: "absolute", 
            top: "20px", 
            right: "30px", 
            color: "white", 
            fontSize: "2.5rem", 
            cursor: "pointer",
            userSelect: "none"
          }}>
            &times;
          </div>
          <img 
            src={lightboxImage} 
            alt="현장 스냅 고해상도 확대 뷰어" 
            style={{ 
              maxWidth: "95%", 
              maxHeight: "92vh", 
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
              border: "1px solid rgba(255,255,255,0.15)"
            }} 
          />
        </div>
      )}

      <Footer />
    </>
  );
}
