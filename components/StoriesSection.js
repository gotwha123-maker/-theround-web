"use client";

import { useState, useEffect } from "react";

const defaultStories = [
  { 
    id: 1, 
    date: '2026. 06. 01', 
    title: '리더십 아카데미: 한반도의 미래를 디자인하는 리더 육성', 
    excerpt: '단순한 정착을 넘어, 남북의 파트너들이 각자의 전문성을 바탕으로 우리 사회의 갈등을 조율하고 새로운 가치를 창출하는 핵심 리더로 성장합니다.', 
    img: 'assets/story_academy_censored.png', 
    content: `
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[활동 취지]</h4>
      <p style="margin-bottom: 2rem; color: var(--color-text-primary); line-height: 1.8;">탈북민들이 우리 사회의 수혜자에 머물지 않고, 적극적으로 사회 문제 해결에 참여하는 '주권자'로 거듭나도록 돕는 고도화된 실무 교육 과정입니다.</p>
      
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[긍정적 임팩트]</h4>
      <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2; color: var(--color-text-primary);">
        <li>전문가 멘토링을 통한 구체적 진로 및 리더십 로드맵 설계</li>
        <li>정책 제안 및 프로젝트 기획 등 실질적인 사회 문제 해결 역량 강화</li>
        <li>출신 배경을 넘어 서로의 강점을 결합하는 시너지 효과 창출</li>
      </ul>
      
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[더라운드의 비전]</h4>
      <p style="background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; font-style: italic; color: var(--color-text-muted);">"아카데미를 수료한 리더들은 각자의 자리에서 작은 통일을 실천하는 변화의 주역이 될 것입니다. 이들이 빚어낼 한반도의 새로운 청사진을 기대합니다."</p>
    `
  },
  { 
    id: 2, 
    date: '2026. 05. 20', 
    title: '스포츠 활동 "UniOne FC": 그라운드 위에서 증명하는 통합의 가능성', 
    excerpt: '땀 흘리며 달리는 90분. 스포츠라는 보편적인 언어를 통해 심리적 경계를 허물고, 서로를 동등한 팀원으로 긍정하는 화합의 장입니다.', 
    img: 'assets/story_soccer_censored.png', 
    content: `
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[활동 취지]</h4>
      <p style="margin-bottom: 2rem; color: var(--color-text-primary); line-height: 1.8;">말보다는 행동과 땀방울이 때로는 더 큰 이해를 낳습니다. 축구를 매개로 남북의 파트너들이 한 팀이 되어 상호 신뢰와 협동심을 기르는 역동적인 소통 프로그램입니다.</p>
      
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[긍정적 임팩트]</h4>
      <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2; color: var(--color-text-primary);">
        <li>긴박한 경기 상황 속에서 자연스럽게 체득하는 상호 존중과 신뢰</li>
        <li>규칙 준수와 페어플레이를 통한 성숙한 공동체 의식 함양</li>
        <li>건강한 신체 활동을 통한 스트레스 해소 및 정서적 안정 도모</li>
      </ul>
      
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[더라운드의 비전]</h4>
      <p style="background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; font-style: italic; color: var(--color-text-muted);">"운동장에서 우리는 북한 출신, 남한 출신이 아닌 오직 승리를 위해 함께 달리는 동료일 뿐입니다. 이 작은 그라운드가 곧 우리가 꿈꾸는 통합된 사회의 축소판입니다."</p>
    `
  },
  { 
    id: 3, 
    date: '2026. 05. 12', 
    title: '더라운드 정기 송년회: 따뜻한 환대 속에서 다지는 연대의 힘', 
    excerpt: '서로의 일상을 지지하고 외로움을 극복할 수 있도록, 함께 음식을 나누고 한 해를 돌아보며 누구도 소외되지 않는 가족 같은 공동체를 만듭니다.', 
    img: 'assets/story_gathering_censored.png', 
    content: `
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[활동 취지]</h4>
      <p style="margin-bottom: 2rem; color: var(--color-text-primary); line-height: 1.8;">낯선 사회에서의 정착 과정은 종종 깊은 외로움을 동반합니다. 명절이나 연말연시, 함께 온기를 나눌 수 있는 든든한 '식구(食口)'가 되어주기 위한 정서적 안전망 구축 활동입니다.</p>
      
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[긍정적 임팩트]</h4>
      <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2; color: var(--color-text-primary);">
        <li>따뜻한 식사 공유를 통한 정서적 소외감 해소 및 심리적 안정 제공</li>
        <li>정착 선배들의 진솔한 경험담 공유를 통한 실질적인 삶의 지혜 전수</li>
        <li>자발적인 참여와 봉사로 이루어지는 자생적이고 건강한 커뮤니티 형성</li>
      </ul>
      
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[더라운드의 비전]</h4>
      <p style="background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; font-style: italic; color: var(--color-text-muted);">"서로의 온기를 나누는 이 작은 모임들이 모여, 어떤 어려움 앞에서도 쉽게 무너지지 않는 가장 견고한 사회적 지지망이 될 것이라 확신합니다."</p>
    `
  },
  { 
    id: 4, 
    date: '2026. 05. 05', 
    title: '인식 개선 캠페인 "공존의 길": 지역 사회의 포용력을 넓히다', 
    excerpt: '탈북민들이 직접 기획한 캠페인을 통해 지역 주민들과 직접 만나 소통하며, 낡은 편견을 건강하고 열린 시각으로 디자인하는 퍼블릭 리더십 활동입니다.', 
    img: 'assets/story_cafe_censored.png', 
    content: `
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[활동 취지]</h4>
      <p style="margin-bottom: 2rem; color: var(--color-text-primary); line-height: 1.8;">통합은 일방적인 과정이 아니라 지역 공동체의 '상호 수용성'에 달려 있습니다. 이웃과 직접 마주하며 오해를 이해로 바꾸는 시민 참여형 인식 개선 프로그램입니다.</p>
      
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[긍정적 임팩트]</h4>
      <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2; color: var(--color-text-primary);">
        <li>지역 주민들과의 문턱 없는 스킨십을 통한 심리적 장벽 완화</li>
        <li>북한이탈주민에 대한 막연한 편견을 객관적 사실과 공감으로 전환</li>
        <li>참여 구성원들에게는 사회 구성원으로서의 당당함과 효능감 부여</li>
      </ul>
      
      <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[더라운드의 비전]</h4>
      <p style="background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; font-style: italic; color: var(--color-text-muted);">"인식의 변화는 소박하고 진정성 있는 대화에서 피어납니다. 지역 사회와 다리를 놓는 이 캠페인들이 모여 우리 사회 전체의 포용력을 넓히는 마중물이 될 것입니다."</p>
    `
  }
];

export default function StoriesSection() {
  const [stories, setStories] = useState(defaultStories);
  const [showAll, setShowAll] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchStories() {
      try {
        const res = await fetch("/api/stories", { cache: 'no-store' });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data && data.length > 0) {
            setStories(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live stories, using defaults:", err);
      }
    }
    fetchStories();
    return () => { isMounted = false; };
  }, []);

  const visibleList = showAll ? stories : stories.slice(0, 4);

  const openDetail = (s) => {
    setSelectedStory(s);
    document.body.style.overflow = "hidden";
  };

  const closeDetail = () => {
    setSelectedStory(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (stories.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".story-card.reveal-on-scroll").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [visibleList]);

  return (
    <section id="stories" className="section stories-section">
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">ACTIVITY STORIES</span>
          <h2>활동 스토리</h2>
          <p className="section-lead">더라운드가 만들어나가는 의미 있는 현장 소식들을 전해드립니다.</p>
        </div>

        <div className="stories-grid" id="stories-grid">
          {visibleList.map((s) => (
            <article 
              className="story-card reveal-on-scroll" 
              key={s.id}
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                height: "100%",
                background: "var(--color-bg-secondary)",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--color-border)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
            >
              <div 
                className="story-img-wrap clickable-detail-area" 
                style={{ cursor: "pointer", position: "relative", paddingTop: "60%", overflow: "hidden", borderRadius: "12px 12px 0 0" }}
                onClick={() => openDetail(s)}
              >
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="story-img" 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070";
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.03)", pointerEvents: "none" }}></div>
              </div>
              <div className="story-content" style={{ padding: "1.8rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <div className="story-meta" style={{ marginBottom: "1rem" }}>
                  <span className="story-date" style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 800, letterSpacing: "0.02em" }}>
                    {s.date}
                  </span>
                </div>
                <h3 
                  className="story-title clickable-detail-area" 
                  style={{ cursor: "pointer", fontSize: "1.25rem", lineHeight: 1.5, marginBottom: "1.2rem", color: "var(--color-text-primary)", fontWeight: 700, wordBreak: "keep-all", transition: "color 0.3s ease" }}
                  onClick={() => openDetail(s)}
                >
                  {s.title}
                </h3>
                <p 
                  className="story-excerpt" 
                  style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-muted)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginTop: "auto" }}
                >
                  {s.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "3.5rem" }}>
          <button 
            className="btn" 
            style={{ 
              minWidth: "220px", 
              borderRadius: "50px", 
              fontWeight: 600,
              fontSize: "0.95rem",
              padding: "0.8rem 2.5rem",
              color: "var(--color-primary)",
              border: "1.5px solid var(--color-primary)",
              backgroundColor: "transparent",
              transition: "all 0.3s ease"
            }}
            onClick={() => setShowAll(!showAll)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
          >
            {showAll ? "간략히 보기" : "전체보기"}
          </button>
        </div>
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="modal open" style={{ display: "flex" }}>
          <div className="modal-overlay" onClick={closeDetail}></div>
          <div className="modal-container" style={{ maxWidth: "800px" }}>
            <button className="modal-close" onClick={closeDetail}>&times;</button>
            <div className="modal-body" style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <div className="modal-article" style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1rem" }}>
                <header className="modal-article-header" style={{ marginBottom: "3rem", borderBottom: "2px solid var(--color-primary)", paddingBottom: "2rem" }}>
                  <div className="meta" style={{ color: "var(--color-primary)", fontWeight: 900, fontSize: "0.95rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ background: "var(--color-primary)", color: "white", padding: "0.2rem 0.6rem", borderRadius: "4px" }}>활동 기록</span>
                    <span>{selectedStory.date}</span>
                  </div>
                  <h2 className="title" style={{ fontSize: "2.2rem", lineHeight: 1.35, color: "var(--color-text-primary)", wordBreak: "keep-all", fontWeight: 800 }}>
                    {selectedStory.title}
                  </h2>
                </header>
                <div className="modal-article-img" style={{ marginBottom: "3.5rem", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}>
                  <img 
                    src={selectedStory.img} 
                    alt={selectedStory.title} 
                    style={{ width: "100%", height: "auto", maxHeight: "550px", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070";
                    }}
                  />
                </div>
                <div 
                  className="modal-article-body" 
                  style={{ fontSize: "1.15rem", lineHeight: 2, color: "var(--color-text-primary)" }}
                  dangerouslySetInnerHTML={{ __html: selectedStory.content }}
                ></div>
                <footer style={{ marginTop: "5rem", padding: "3rem 2rem", background: "var(--color-bg-alt)", borderRadius: "16px", textAlign: "center" }}>
                  <h5 style={{ marginBottom: "1rem", fontSize: "1.2rem", color: "var(--color-primary)" }}>"미래를 함께 디자인하는 더라운드"</h5>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.6" }}>
                    더라운드는 단순한 지원을 넘어 실질적인 변화를 만듭니다.
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
