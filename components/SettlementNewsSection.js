"use client";

import { useState, useEffect } from "react";

const mockNewsList = [
  // 1. Scholarships
  {
    id: "sc-1",
    category: "scholarship",
    badge: "한국장학재단",
    title: "2026학년도 2학기 국가장학금 1차 신청 공고 (~6/22 마감)",
    date: "2026. 05. 22",
    link: "https://www.kosaf.go.kr"
  },
  {
    id: "sc-2",
    category: "scholarship",
    badge: "남북하나재단",
    title: "2026년 북향민 청년 ‘미래날개’ 응시료 지원 사업 공고 (~12.5)",
    date: "2026. 04. 16",
    link: "https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=20102"
  },
  // 2. Housing
  {
    id: "hs-1",
    category: "housing",
    badge: "LH공사",
    title: "2026년 청년 매입임대주택 및 행복주택 공고 확인",
    date: "2026. 06. 07",
    link: "https://apply.lh.or.kr"
  },
  // 3. Jobs
  {
    id: "jb-1",
    category: "job",
    badge: "남북하나재단",
    title: "제1회 슬기로운 일자리 찾기 프로그램 참가자 모집공고 (~6.10)",
    date: "2026. 05. 27",
    link: "https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=20174"
  },
  // 4. University
  {
    id: "un-1",
    category: "university",
    badge: "남북하나재단",
    title: "2026년 진로·진학 1:1 맞춤형 전문 상담 신청 안내 (~11.30)",
    date: "2026. 03. 05",
    link: "https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=19983"
  },
  // 5. Welfare
  {
    id: "wf-1",
    category: "welfare",
    badge: "남북하나재단",
    title: "2026년 북향민 건강검진(피폭 실태조사)사업 참여 희망자 모집 (~11.30)",
    date: "2026. 03. 27",
    link: "https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=20042"
  }
];

const tabs = [
  { id: "scholarship", label: "장학정보" },
  { id: "housing", label: "주택정보" },
  { id: "job", label: "일자리" },
  { id: "university", label: "대학생활" },
  { id: "welfare", label: "생활지원" }
];

export default function SettlementNewsSection({ searchQuery = "", setSearchQuery = () => {} }) {
  const [activeTab, setActiveTab] = useState("scholarship"); // Scholarship as default
  const [newsList, setNewsList] = useState(mockNewsList);
  const [showAll, setShowAll] = useState(false);

  const recommendedTags = [
    { label: "장학금", query: "장학" },
    { label: "LH임대주택", query: "LH" },
    { label: "취업바우처", query: "취업바우처" },
    { label: "건강검진", query: "건강검진" }
  ];

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

  const filteredNews = newsList.filter(item => {
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      return (
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        (item.tag && item.tag.toLowerCase().includes(q))
      );
    }
    return item.category === activeTab;
  });
  
  const visibleList = showAll ? filteredNews : filteredNews.slice(0, 4);

  const getCategoryStyle = (cat) => {
    switch(cat) {
      case 'scholarship': return { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" };
      case 'housing': return { bg: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" };
      case 'job': return { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" };
      case 'university': return { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981" };
      case 'welfare': return { bg: "rgba(13, 148, 136, 0.1)", color: "#0d9488" }; // Teal color
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

        {/* Search Bar & Recommended Tags */}
        <div className="search-section" style={{
          maxWidth: "500px",
          margin: "0 auto 2.5rem auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.8rem"
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center"
          }}>
            <svg 
              style={{
                position: "absolute",
                left: "1.2rem",
                width: "1.2rem",
                height: "1.2rem",
                color: "var(--color-text-dim)",
                pointerEvents: "none"
              }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            <input
              type="text"
              placeholder="뉴스레터 공고 검색 (예: 장학, 임대주택)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(false);
              }}
              style={{
                width: "100%",
                padding: "0.8rem 3rem 0.8rem 2.8rem",
                borderRadius: "50px",
                border: "1.5px solid var(--color-border)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.95rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-primary)";
                e.target.style.boxShadow = "0 4px 15px rgba(220, 20, 20, 0.08)";
                e.target.style.backgroundColor = "white";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-border)";
                e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
              }}
            />

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowAll(false);
                }}
                style={{
                  position: "absolute",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  fontSize: "1.3rem",
                  color: "var(--color-text-dim)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.2rem",
                  borderRadius: "50%"
                }}
              >
                &times;
              </button>
            )}
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginRight: "0.2rem" }}>추천 검색어:</span>
            {recommendedTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => {
                  setSearchQuery(tag.query);
                  setShowAll(false);
                }}
                style={{
                  background: searchQuery === tag.query ? "var(--color-primary-light, rgba(220, 20, 20, 0.08))" : "rgba(0, 0, 0, 0.03)",
                  border: "none",
                  borderRadius: "20px",
                  padding: "0.3rem 0.7rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: searchQuery === tag.query ? "var(--color-primary)" : "var(--color-text-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  if (searchQuery !== tag.query) {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.06)";
                  }
                }}
                onMouseOut={(e) => {
                  if (searchQuery !== tag.query) {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.03)";
                  }
                }}
              >
                #{tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Menu - Replaced by query indicator if searching */}
        <div className="tabs-container" style={{ 
          overflowX: "auto", 
          display: "flex", 
          justifyContent: "center", 
          marginBottom: "3rem", 
          paddingBottom: "0.5rem",
          transition: "opacity 0.3s ease",
        }}>
          {searchQuery ? (
            <div style={{
              padding: "0.7rem 1.8rem",
              borderRadius: "50px",
              fontSize: "0.95rem",
              fontWeight: 700,
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-border)"
            }}>
              검색 결과 ({filteredNews.length}건)
            </div>
          ) : (
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
          )}
        </div>

        {/* News Grid */}
        <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {visibleList.length === 0 ? (
            <div className="text-center" style={{ gridColumn: "1/-1", padding: "4rem 2rem", color: "var(--color-text-muted)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <svg style={{ width: "3.5rem", height: "3.5rem", color: "var(--color-text-dim)", marginBottom: "0.5rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                {searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : "해당 카테고리의 최신 소식이 아직 업데이트되지 않았습니다."}
              </div>
              <p style={{ fontSize: "0.9rem", margin: "0" }}>다른 검색어를 입력하거나 아래 버튼을 눌러 검색어를 초기화해보세요.</p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowAll(false);
                  }}
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1.2rem",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 3px 8px rgba(220, 20, 20, 0.15)"
                  }}
                >
                  검색 초기화
                </button>
              )}
            </div>
          ) : (
            visibleList.map((news) => {
              const style = getCategoryStyle(news.category);
              return (
                <div 
                  key={news.id} 
                  className="news-item-card reveal-on-scroll active"
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "20px",
                    border: "1px solid var(--color-border)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-dim)" }}>{news.date}</span>
                    <a 
                      href={news.link || news.url || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        fontSize: "0.85rem", 
                        color: "var(--color-primary)", 
                        fontWeight: 700,
                        textDecoration: "underline"
                      }}
                    >
                      신청하러 가기 &rarr;
                    </a>
                  </div>
                </div>
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
            >
              {showAll ? "간략히 보기" : "전체보기"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
