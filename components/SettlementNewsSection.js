"use client";

import { useState, useEffect } from "react";

const mockNewsList = [
  {
    id: "news-1",
    category: "welfare",
    badge: "지원의료비/임대주택",
    title: "2026년 하반기 한국이탈주민 공공임대주택 우선 공급 신청 절차 및 가이드",
    date: "2026. 06. 04",
    excerpt: "국토교통부와 LH는 무주택 이탈주민 세대를 위해 하반기 매입임대 및 전세임대주택 우선 공급 대상자를 모집합니다. 보증금 지원 및 장기 거주 혜택이 주어집니다.",
    tag: "마감: 6/30",
    url: "#"
  },
  {
    id: "news-2",
    category: "education",
    badge: "장학금 300만원 지원",
    title: "남북하나재단 대학생 장학금 신청 및 보육료 무상 지원 공고",
    date: "2026. 05. 28",
    excerpt: "남북하나재단은 이탈주민 자녀들의 학업 안정을 위해 성적 우수 및 일반 장학생을 선발합니다. 영유아를 둔 가정의 어린이집 무상 보육 지원금 혜택도 함께 연계됩니다.",
    tag: "지원금: 최대 300만원",
    url: "#"
  },
  {
    id: "news-3",
    category: "jobs",
    badge: "국비 전액 지원",
    title: "중장년 이탈주민 맞춤 직업 훈련 (요양보호사, 바리스타 자격증 무료 취득반)",
    date: "2026. 05. 18",
    excerpt: "광명 일자리센터는 중장년층 이탈주민의 재취업을 돕기 위해 전문 자격증 무료 취득 교육생을 모집합니다. 교육 완료 후 우대 기업으로 즉각 알선 혜택이 주어집니다.",
    tag: "전액 무료 / 취업 연계",
    url: "#"
  },
  {
    id: "news-4",
    category: "health",
    badge: "무료 치과/검진 혜택",
    title: "광명시 협약 의료원 무료 건강검진 및 종합 치과 치료 지원 안내",
    date: "2026. 05. 10",
    excerpt: "더라운드와 지역 협약 병원이 연계하여 모든 탈북민 주민 대상 무료 정밀 건강검진과 안과/치과(틀니 및 기본 보철) 비급여 진료비를 지원합니다.",
    tag: "혜택: 정밀 검진 무료",
    url: "#"
  }
];

export default function SettlementNewsSection() {
  const [newsList, setNewsList] = useState(mockNewsList);
  const [activeTab, setActiveTab] = useState("all"); // all, welfare, education, jobs, health
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchNews() {
      try {
        const res = await fetch("/api/settlement-news", { cache: 'no-store' });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data && data.length > 0) {
            setNewsList(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live settlement news, using defaults:", err);
      }
    }
    fetchNews();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (newsList.length > 0) {
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

      document.querySelectorAll(".news-card.reveal-on-scroll").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [activeTab, newsList]);

  const filteredNews = activeTab === "all" 
    ? newsList 
    : newsList.filter(news => news.category === activeTab);

  const visibleList = showAll ? filteredNews : filteredNews.slice(0, 4);

  const tabs = [
    { id: "all", label: "전체소식" },
    { id: "welfare", label: "기본복지/주거" },
    { id: "education", label: "보육/자녀교육" },
    { id: "jobs", label: "일자리/직업훈련" },
    { id: "health", label: "의료/무료법률" }
  ];

  const getCategoryStyle = (category) => {
    switch (category) {
      case "welfare": return { bg: "#EEF2FF", color: "#4338CA", label: "기본복지/주거" };
      case "education": return { bg: "#ECFDF5", color: "#047857", label: "보육/교육" };
      case "jobs": return { bg: "#FFFBEB", color: "#B45309", label: "일자리/직업훈련" };
      case "health": return { bg: "#FEF2F2", color: "#B91C1C", label: "의료/무료법률" };
      default: return { bg: "#F3F4F6", color: "#374151", label: "기타소식" };
    }
  };

  return (
    <section id="settlement-news" className="section settlement-news-section" style={{ backgroundColor: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }}>
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">SETTLEMENT INFORMATION</span>
          <h2 style={{ marginBottom: "2rem" }}>먼저 온 통일민 정착 가이드 & 뉴스</h2>
        </div>

        {/* Categories Tab navigation with horizontal scroll on mobile */}
        <div className="tabs-container-wrapper" style={{ overflowX: "auto", display: "flex", justifyContent: "center", marginBottom: "3rem", paddingBottom: "0.5rem" }}>
          <div className="tabs-wrapper" style={{ display: "flex", gap: "0.8rem", whiteSpace: "nowrap" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setShowAll(false); }}
                className={`btn ${activeTab === tab.id ? "btn-primary" : "btn-outline"}`}
                style={{
                  padding: "0.5rem 1.4rem",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  border: activeTab === tab.id ? "none" : "1px solid var(--color-border)",
                  color: activeTab === tab.id ? "white" : "var(--color-text-primary)",
                  backgroundColor: activeTab === tab.id ? "var(--color-primary)" : "var(--color-bg-primary)",
                  boxShadow: activeTab === tab.id ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards list */}
        <div className="news-cards-grid responsive-grid-4">
          {filteredNews.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem", color: "var(--color-text-muted)" }}>
              등록된 정착 혜택 정보가 없습니다.
            </div>
          ) : (
            visibleList.map((news) => {
              const style = getCategoryStyle(news.category);
              return (
                <article 
                  key={news.id} 
                  className="news-card reveal-on-scroll"
                  style={{
                    background: "var(--color-bg-primary)",
                    borderRadius: "16px",
                    padding: "1.8rem",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
                  }}
                  onClick={() => window.open(news.url, "_blank")}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                      <span 
                        style={{
                          backgroundColor: style.bg,
                          color: style.color,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "0.3rem 0.7rem",
                          borderRadius: "6px"
                        }}
                      >
                        {style.label}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{news.date}</span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", color: "var(--color-text-primary)", fontWeight: 700, lineHeight: 1.4, marginBottom: "0.8rem", height: "3.1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", wordBreak: "keep-all" }}>
                      {news.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.75, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "1rem" }}>
                      {news.excerpt || "남북하나재단의 상세 공지사항을 확인하시려면 클릭하세요."}
                    </p>
                  </div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", borderTop: "1px solid var(--color-border)", paddingTop: "1.2rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 700 }}>
                      자세히 보기 &rarr;
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      출처: 남북하나재단
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {filteredNews.length > 4 && (
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
        )}
      </div>
    </section>
  );
}
