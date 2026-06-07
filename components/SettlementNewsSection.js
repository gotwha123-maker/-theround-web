"use client";

import { useState, useEffect } from "react";

const mockNewsList = [
  {
    id: "news-2",
    category: "scholarship",
    badge: "장학정보",
    title: "글로벌 한반도 인재 육성을 위한 하반기 장학금 수혜자 모집",
    date: "2026. 06. 02",
    link: "#"
  },
  {
    id: "news-3",
    category: "housing",
    badge: "주택정보",
    title: "LH/SH 공공임대주택 통합 모집 공고 (가산동 및 수도권 지역)",
    date: "2026. 05. 28",
    link: "https://apply.lh.or.kr"
  },
  {
    id: "news-4",
    category: "job",
    badge: "일자리",
    title: "사회적 기업 연계 상반기 신입사원 채용 공고 (특별전형 포함)",
    date: "2026. 05. 25",
    link: "#"
  }
];

const tabs = [
  { id: "all", label: "전체보기" },
  { id: "scholarship", label: "장학정보" },
  { id: "housing", label: "주택정보" },
  { id: "job", label: "일자리" },
  { id: "university", label: "대학생활" },
  { id: "research", label: "연구설문" }
];

export default function SettlementNewsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [newsList, setNewsList] = useState(mockNewsList);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchNews() {
      try {
        const res = await fetch("/api/settlement-news", { cache: 'no-store' });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data && data.length > 0) setNewsList(data);
        }
      } catch (err) {
        console.error("Failed to fetch live news:", err);
      }
    }
    fetchNews();
    return () => { isMounted = false; };
  }, []);

  const filteredNews = activeTab === "all" 
    ? newsList 
    : newsList.filter(item => item.category === activeTab);

  const visibleList = showAll ? filteredNews : filteredNews.slice(0, 4);

  const getCategoryStyle = (cat) => {
    switch(cat) {
      case 'hana': return { bg: "rgba(13, 148, 136, 0.1)", color: "var(--color-primary)" };
      case 'scholarship': return { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" };
      case 'housing': return { bg: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" };
      case 'job': return { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" };
      case 'university': return { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981" };
      case 'research': return { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444" };
      default: return { bg: "#f3f4f6", color: "#6b7280" };
    }
  };

  return (
    <section id="settlement-news" className="section settlement-news-section" style={{ backgroundColor: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }}>
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">NEWSLETTER</span>
          <h2 style={{ marginBottom: "2rem" }}>뉴스레터</h2>
        </div>

        {/* Tab Menu */}
        <div className="tabs-container" style={{ overflowX: "auto", display: "flex", justifyContent: "center", marginBottom: "3rem", paddingBottom: "0.5rem" }}>
          <div className="tabs-wrapper" style={{ display: "flex", gap: "0.8rem", whiteSpace: "nowrap" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                    setActiveTab(tab.id);
                    setShowAll(false);
                }}
                style={{
                  padding: "0.7rem 1.4rem",
                  borderRadius: "50px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  border: activeTab === tab.id ? "2px solid var(--color-primary)" : "1.5px solid var(--color-border)",
                  backgroundColor: activeTab === tab.id ? "var(--color-primary)" : "white",
                  color: activeTab === tab.id ? "white" : "var(--color-text-muted)",
                  cursor: "pointer",
                  boxShadow: activeTab === tab.id ? "0 4px 12px rgba(220, 20, 20, 0.15)" : "none"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {visibleList.length === 0 ? (
            <div className="text-center" style={{ gridColumn: "1/-1", padding: "4rem", color: "var(--color-text-muted)" }}>
              해당 카테고리의 최신 소식이 아직 업데이트되지 않았습니다.
            </div>
          ) : (
            visibleList.map((news) => {
              const style = getCategoryStyle(news.category);
              return (
                <a 
                  href={news.link || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  key={news.id} 
                  className="news-item-card reveal-on-scroll"
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "20px",
                    border: "1px solid var(--color-border)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }}
                >
                  <span style={{ 
                    display: "inline-block", 
                    backgroundColor: style.bg, 
                    color: style.color, 
                    padding: "0.3rem 0.8rem", 
                    borderRadius: "6px", 
                    fontSize: "0.75rem", 
                    fontWeight: 700,
                    marginBottom: "1rem",
                    alignSelf: "flex-start"
                  }}>
                    {news.badge}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", lineHeight: 1.5, color: "var(--color-text-primary)", marginBottom: "1.5rem", flexGrow: 1, fontWeight: 700 }}>
                    {news.title}
                  </h3>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-dim)" }}>{news.date}</span>
                </a>
              );
            })
          )}
        </div>

        {filteredNews.length > 4 && (
          <div className="text-center" style={{ marginTop: "3.5rem" }}>
            <button 
              className="btn-text" 
              onClick={() => setShowAll(!showAll)}
              style={{ 
                color: "var(--color-primary)", 
                fontSize: "1rem", 
                fontWeight: 600,
                padding: "0.5rem 1rem",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
            >
              {showAll ? "간략히 보기" : "전체보기"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
