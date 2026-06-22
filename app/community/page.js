"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// 유니원 FC 앨범 갤러리 데이터셋 (대표 1장 + 추가 11장 = 총 12장)
const unioneFCGallery = [
  { src: "/assets/story_soccer_censored.png", title: "유니원 FC 단체전", desc: "경기 시작 전 파이팅을 외치며 하나 된 유니원 FC 선수단" },
  { src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200", title: "그라운드 위의 열정", desc: "푸른 잔디 위에서 펼쳐지는 역동적인 훈련 세션" },
  { src: "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?q=80&w=1200", title: "전술 토의 시간", desc: "작전판을 앞에 두고 다 함께 집중하는 전술 미팅" },
  { src: "https://images.unsplash.com/photo-1431324155629-1a6edd179650?q=80&w=1200", title: "러닝 및 체력 훈련", desc: "체력 증진을 위해 기초 러닝 훈련을 수행하는 청년들" },
  { src: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200", title: "볼 키핑 연습", desc: "정교한 볼 컨트롤 and 패스워크를 연습하는 순간" },
  { src: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200", title: "팀 빌딩 소통 게임", desc: "스포츠 레크리에이션을 통해 친밀감을 쌓는 시간" },
  { src: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1200", title: "슈팅 드릴 훈련", desc: "골문을 향해 시원하게 슈팅을 시도하는 선수" },
  { src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200", title: "정기 교류전 현장", desc: "외부 동호회 팀을 초청해 우호적인 매치를 치르는 모습" },
  { src: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=1200", title: "수분 섭취와 휴식", desc: "훈련 중간 시원한 음료와 함께 담소를 나누는 휴식 시간" },
  { src: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=1200", title: "패스 연계 플레이", desc: "삼자 패스를 통해 수비 라인을 허무는 조직력 훈련" },
  { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200", title: "우수 훈련원 격려", desc: "금주의 열정적인 플레이어로 선정된 청년의 시상" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200", title: "다음 경기를 기약하며", desc: "훈련 일정을 마친 후 장비를 정리하며 도란도란 걷는 퇴근길" }
];

// 송년회 앨범 갤러리 데이터셋 (총 5장)
const yearendGallery = [
  { src: "/assets/yearend_1.jpg", title: "따뜻한 만찬과 대화", desc: "남북 청년들과 멘토들이 함께 어우러져 맛있는 음식을 나누며 깊은 대화를 나누는 시간" },
  { src: "/assets/yearend_2.jpg", title: "서로를 알아가는 식탁", desc: "한자리에 둘러앉아 따뜻한 미소와 격려를 주고받는 대화의 현장" },
  { src: "/assets/yearend_3.jpg", title: "경청과 스피치", desc: "자립과 공동체를 향한 마음을 진솔하게 전하며 공감대를 넓혀가는 순서" },
  { src: "/assets/yearend_4.jpg", title: "그대 함께 걷는다면", desc: "송년의 밤을 마치며 참가자 전원이 함께 모여 약속하는 연대와 동행의 단체 사진" },
  { src: "/assets/yearend_5.jpg", title: "행사장을 가득 채운 온기", desc: "웃음꽃이 피어나는 테이블마다 서로가 서로에게 든든한 가족이자 친구가 되어주는 순간" }
];

export default function CommunityPage() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  
  // 앨범 라이트박스 상태 관리
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [albumCurrentIdx, setAlbumCurrentIdx] = useState(0);

  const getActiveAlbumGallery = () => {
    if (activeAlbum === "unione") return unioneFCGallery;
    if (activeAlbum === "yearend") return yearendGallery;
    return [];
  };

  const openAlbum = (albumName) => {
    setActiveAlbum(albumName);
    setAlbumCurrentIdx(0);
    document.body.style.overflow = "hidden";
  };

  const closeAlbum = () => {
    setActiveAlbum(null);
    document.body.style.overflow = "";
  };

  const nextAlbumImage = (e) => {
    if (e) e.stopPropagation();
    const gallery = getActiveAlbumGallery();
    setAlbumCurrentIdx((prev) => (prev + 1) % gallery.length);
  };

  const prevAlbumImage = (e) => {
    if (e) e.stopPropagation();
    const gallery = getActiveAlbumGallery();
    setAlbumCurrentIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // 앨범 방향키 및 ESC 제어
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeAlbum) return;
      if (e.key === "ArrowLeft") prevAlbumImage();
      if (e.key === "ArrowRight") nextAlbumImage();
      if (e.key === "Escape") closeAlbum();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeAlbum, albumCurrentIdx]);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("/api/stories", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const communityStories = data.filter((s) => s.category === "community");
          setStories(communityStories);
        }
      } catch (err) {
        console.error("Failed to fetch community stories:", err);
      }
    }
    fetchStories();
  }, []);

  const openDetail = (s) => {
    setSelectedStory(s);
    document.body.style.overflow = "hidden";
  };

  const closeDetail = () => {
    setSelectedStory(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Header forceSolid={true} />
      <main style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}>
        
        <section style={{ 
          background: "var(--gradient-hero)", 
          color: "white", 
          padding: "8rem 0 6rem 0", 
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            height: "100%",
            transform: "translate(-50%, -50%)",
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Korea_map_modern.svg/800px-Korea_map_modern.svg.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            opacity: 0.08,
            filter: "invert(1) brightness(2)",
            pointerEvents: "none"
          }}></div>

          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <span className="section-subtitle" style={{ color: "var(--color-accent-secondary)", fontSize: "0.9rem", fontWeight: 800 }}>COMMUNITY & SOLIDARITY</span>
            <h1 style={{ fontSize: "3.2rem", fontWeight: 900, marginTop: "1rem", marginBottom: "1.5rem", wordBreak: "keep-all" }}>
              커뮤니티 조성 <span className="accent-text">& 연대</span>
            </h1>
            <p className="hero-lead" style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", wordBreak: "keep-all", color: "rgba(255, 255, 255, 0.9)" }}>
              "그라운드 위의 열정부터 따뜻한 식탁의 환대까지"<br />
              고립과 소외를 해소하고 신뢰를 쌓아 누구도 소외되지 않는 정서적 울타리를 만듭니다.
            </p>
          </div>
        </section>

        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
              <div>
                <span className="section-subtitle">OUR COMMUNITY</span>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>
                  함께 땀 흘리고 식사하며<br />보이지 않는 벽을 허뭅니다.
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "2rem" }}>
                  더라운드의 연대 활동은 남북 청년들이 하나의 목적을 공유하며 대등하게 어우러지는 건강한 스킨십을 통해 시작됩니다. 매주 스포츠 활동과 정기 소통 캠페인을 통해 사회 구성원 간의 다리를 직접 잇고 있습니다.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>⚽ 스포츠 소통</span>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>🍲 연말 정기 모임</span>
                  <span style={{ backgroundColor: "rgba(5, 75, 48, 0.08)", color: "var(--color-success)", padding: "0.5rem 1.2rem", borderRadius: "30px", fontWeight: 700, fontSize: "0.9rem" }}>💬 일상 네트워킹</span>
                </div>
              </div>
              <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "var(--shadow-lg)", aspectRatio: "4/3" }}>
                <img src="/assets/story_soccer_censored.png" alt="UniOne FC 축구 사진" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070";
                }} />
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ backgroundColor: "var(--color-bg-secondary)", padding: "5rem 0" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">CORE PROGRAMS</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>주요 공동체 활동</h2>
              <p className="section-lead">일상 속에서 편견 없이 녹아드는 두 가지 핵심 통로입니다.</p>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              .photo-album-trigger {
                perspective: 1000px;
              }
              .photo-album-trigger:hover .album-card-1 {
                transform: translateX(-50%) translateY(-10px) rotate(0deg) !important;
                box-shadow: 0 25px 50px rgba(0,0,0,0.3) !important;
              }
              .photo-album-trigger:hover .album-card-2 {
                transform: translateX(-50%) translateY(-5px) rotate(-8deg) !important;
                opacity: 0.9 !important;
              }
              .photo-album-trigger:hover .album-card-3 {
                transform: translateX(-50%) translateY(-2px) rotate(8deg) !important;
                opacity: 0.8 !important;
              }
            `}} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", marginTop: "3rem" }}>
              <div style={{ 
                backgroundColor: "white", 
                padding: "3rem 3rem 2.5rem 3rem", 
                borderRadius: "24px", 
                border: "1px solid var(--color-border)", 
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ display: "inline-block", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--color-primary)", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 800, marginBottom: "1.5rem" }}>
                    SPORTS SOLIDARITY
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>유니원 FC (UniOne FC)</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                    축구라는 세계 보편의 언어로 남북 청년들이 매주 경기장에 모여 패스를 건네고 발을 맞춥니다. 잔디 위에서는 어떠한 정치적, 문화적 장벽도 없이 한 팀으로서 신뢰와 리더십을 체득합니다.
                  </p>
                  <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.8", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                    <li>매주 토요일 정기 훈련 및 경기 조율</li>
                    <li>아마추어 리그 참가 및 교류 경기</li>
                    <li>체력 증진 및 정서적 지지 시너지 효과</li>
                  </ul>
                </div>

                <div 
                  onClick={() => openAlbum("unione")}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "230px",
                    marginTop: "1.5rem",
                    cursor: "pointer"
                  }}
                  className="photo-album-trigger"
                >
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: "92%",
                    height: "100%",
                    transform: "translateX(-50%) rotate(4deg)",
                    borderRadius: "18px",
                    backgroundImage: `url(${unioneFCGallery[2].src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease",
                    opacity: 0.6,
                    zIndex: 1
                  }} className="album-card-3" />
                  
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: "92%",
                    height: "100%",
                    transform: "translateX(-50%) rotate(-3deg)",
                    borderRadius: "18px",
                    backgroundImage: `url(${unioneFCGallery[1].src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease",
                    opacity: 0.8,
                    zIndex: 2
                  }} className="album-card-2" />
                  
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: "92%",
                    height: "100%",
                    transform: "translateX(-50%) rotate(0deg)",
                    borderRadius: "18px",
                    backgroundImage: `url(${unioneFCGallery[0].src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                    transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease",
                    zIndex: 3
                  }} className="album-card-1" />

                  <div style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "8%",
                    background: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(4px)",
                    color: "white",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}>
                    📸 +{unioneFCGallery.length}장
                  </div>
                </div>
              </div>

              <div style={{ 
                backgroundColor: "white", 
                padding: "3rem 3rem 2.5rem 3rem", 
                borderRadius: "24px", 
                border: "1px solid var(--color-border)", 
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ display: "inline-block", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--color-primary)", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 800, marginBottom: "1.5rem" }}>
                    SOCIAL SHARING
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>커뮤니티 연말 송년회</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                    정착 과정의 외로움과 소외를 극복할 수 있도록 연말 정기 송년회, 명절 맞이 모임을 개설하여 따뜻한 밥 한 끼의 정을 공유합니다. 누구도 홀로 남지 않는 가족 같은 안전망을 조성합니다.
                  </p>
                  <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.8", color: "var(--color-text-muted)", marginBottom: "1.8rem" }}>
                    <li>정착 선배들의 진솔한 자립 노하우 전수</li>
                    <li>네트워킹 파티 및 문화 나눔 공연 개최</li>
                    <li>자발적인 멘토링 자매결연 형성 지원</li>
                  </ul>
                  <a 
                    href="/community/yearend"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                      padding: "0.8rem 1.6rem",
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                      marginBottom: "1.5rem"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#4f46e5";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "var(--color-primary)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    🎉 자립과 연대의 송년회 스토리 보기 →
                  </a>
                </div>

                <div 
                  onClick={() => openAlbum("yearend")}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "230px",
                    marginTop: "1.5rem",
                    cursor: "pointer"
                  }}
                  className="photo-album-trigger"
                >
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: "92%",
                    height: "100%",
                    transform: "translateX(-50%) rotate(4deg)",
                    borderRadius: "18px",
                    backgroundImage: `url(${yearendGallery[2].src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease",
                    opacity: 0.6,
                    zIndex: 1
                  }} className="album-card-3" />
                  
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: "92%",
                    height: "100%",
                    transform: "translateX(-50%) rotate(-3deg)",
                    borderRadius: "18px",
                    backgroundImage: `url(${yearendGallery[1].src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease",
                    opacity: 0.8,
                    zIndex: 2
                  }} className="album-card-2" />
                  
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: "92%",
                    height: "100%",
                    transform: "translateX(-50%) rotate(0deg)",
                    borderRadius: "18px",
                    backgroundImage: `url(${yearendGallery[0].src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                    transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease",
                    zIndex: 3
                  }} className="album-card-1" />

                  <div style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "8%",
                    background: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(4px)",
                    color: "white",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}>
                    📸 +{yearendGallery.length}장
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ padding: "5rem 0" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-subtitle">COMMUNITY STORIES</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>커뮤니티 소식 & 스토리</h2>
              <p className="section-lead">그라운드와 식탁에서 피어나는 행복하고 진솔한 일상 이야기입니다.</p>
            </div>

            {stories.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "3rem" }}>
                커뮤니티 조성 및 연대 활동의 소식이 곧 업데이트됩니다.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
                {stories.map((s) => (
                  <article 
                    className="story-card" 
                    key={s.id}
                    onClick={() => openDetail(s)}
                    style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      height: "100%",
                      background: "var(--color-bg-secondary)",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: "var(--shadow-sm)",
                      border: "1px solid var(--color-border)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ position: "relative", paddingTop: "60%", overflow: "hidden" }}>
                      <img 
                        src={s.img} 
                        alt={s.title} 
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070";
                        }}
                      />
                    </div>
                    <div style={{ padding: "1.8rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 800, marginBottom: "0.8rem", display: "block" }}>{s.date}</span>
                      <h3 style={{ fontSize: "1.25rem", lineHeight: 1.5, marginBottom: "1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{s.title}</h3>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--color-text-muted)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginTop: "auto" }}>{s.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeDetail}></div>
          <div className="modal-container" style={{ maxWidth: "800px", width: "95%" }}>
            <button className="modal-close" onClick={closeDetail}>&times;</button>
            <div className="modal-body" style={{ maxHeight: "80vh", overflowY: "auto", padding: "2rem" }}>
              <header style={{ marginBottom: "2rem", borderBottom: "2px solid var(--color-primary)", paddingBottom: "1.5rem" }}>
                <div style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  활동 기록 | {selectedStory.date}
                </div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-text-primary)", lineHeight: "1.35" }}>{selectedStory.title}</h2>
              </header>
              <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "2.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                <img 
                  src={selectedStory.img} 
                  alt={selectedStory.title} 
                  style={{ width: "100%", height: "auto", maxHeight: "450px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070";
                  }}
                />
              </div>
              <div 
                style={{ fontSize: "1.1rem", lineHeight: "1.9", color: "var(--color-text-primary)" }}
                dangerouslySetInnerHTML={{ __html: selectedStory.content }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* 앨범 라이트박스 슬라이더 모달 */}
      {activeAlbum && getActiveAlbumGallery().length > 0 && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100 }}>
          <div className="modal-overlay" onClick={closeAlbum} style={{ background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(8px)" }}></div>
          <div className="modal-container" style={{ maxWidth: "960px", width: "95%", background: "transparent", boxShadow: "none", border: "none", padding: 0 }}>
            <button className="modal-close" onClick={closeAlbum} style={{ color: "white", fontSize: "3rem", top: "-2.5rem", right: "0.5rem", background: "transparent", border: "none", cursor: "pointer" }}>&times;</button>
            <div className="modal-body" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
              <div style={{ position: "relative", width: "100%", height: "65vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* 이전 버튼 */}
                <button 
                  onClick={prevAlbumImage}
                  style={{
                    position: "absolute",
                    left: "-1.5rem",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: "50%",
                    width: "56px",
                    height: "56px",
                    cursor: "pointer",
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    zIndex: 1200,
                    backdropFilter: "blur(4px)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.25)";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  &#10094;
                </button>

                {/* 메인 이미지 */}
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "20px", overflow: "hidden", background: "rgba(0,0,0,0.2)" }}>
                  <img 
                    src={getActiveAlbumGallery()[albumCurrentIdx].src} 
                    alt={getActiveAlbumGallery()[albumCurrentIdx].title} 
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", userSelect: "none" }}
                  />
                </div>

                {/* 다음 버튼 */}
                <button 
                  onClick={nextAlbumImage}
                  style={{
                    position: "absolute",
                    right: "-1.5rem",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: "50%",
                    width: "56px",
                    height: "56px",
                    cursor: "pointer",
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    zIndex: 1200,
                    backdropFilter: "blur(4px)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.25)";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  &#10095;
                </button>
              </div>

              {/* 하단 정보 메타데이터 및 인디케이터 */}
              <div style={{ width: "100%", textAlign: "center", color: "white", marginTop: "2rem", padding: "0 2rem" }}>
                <h4 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem 0", fontWeight: 800, color: "#f3f4f6" }}>{getActiveAlbumGallery()[albumCurrentIdx].title}</h4>
                <p style={{ fontSize: "1rem", color: "#d1d5db", margin: "0 0 1.2rem 0", lineHeight: 1.6 }}>{getActiveAlbumGallery()[albumCurrentIdx].desc}</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.9rem", color: "#e5e7eb", background: "rgba(255,255,255,0.15)", padding: "0.4rem 1.2rem", borderRadius: "30px", fontWeight: 700 }}>
                    {albumCurrentIdx + 1} / {getActiveAlbumGallery().length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </>
  );
}
