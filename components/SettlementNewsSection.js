"use client";

import { useState, useEffect } from "react";

export default function SettlementNewsSection({ searchQuery = "", setSearchQuery = () => {} }) {
  const [activeTab, setActiveTab] = useState("전체");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const tabs = [
    { id: "전체", label: "전체보기" },
    { id: "장학", label: "장학정보" },
    { id: "주택", label: "주택정보" },
    { id: "일자리", label: "일자리" },
    { id: "교육", label: "교육/역량" },
    { id: "복지", label: "생활/복지" }
  ];

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/settlement-news", { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const sorted = data.sort((a, b) => {
             const dateA = a.date && !a.date.includes('관리자') ? new Date(a.date.replace(/\./g, '-')) : new Date(0);
             const dateB = b.date && !b.date.includes('관리자') ? new Date(b.date.replace(/\./g, '-')) : new Date(0);
             return dateB - dateA;
          });
          setNewsList(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const filteredNews = newsList.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = q === "" || 
      (item.title && item.title.toLowerCase().includes(q)) || 
      (item.badge && item.badge.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q));
    
    const matchesTab = activeTab === "전체" || 
      (item.category && item.category === getCategoryKey(activeTab));

    return matchesSearch && matchesTab;
  });

  function getCategoryKey(tabId) {
    switch(tabId) {
      case '장학': return 'scholarship';
      case '주택': return 'housing';
      case '일자리': return 'job';
      case '교육': return 'university';
      case '복지': return 'welfare';
      default: return tabId;
    }
  }
  
  // Initially show 6, show all if button clicked
  const visibleList = showAll ? filteredNews : filteredNews.slice(0, 6);

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'scholarship': return "#3b82f6";
      case 'housing': return "#8b5cf6";
      case 'job': return "#f59e0b";
      case 'university': return "#10b981";
      case 'welfare': return "#ec4899";
      default: return "var(--color-primary)";
    }
  };

  const getCategoryLabel = (cat) => {
    switch(cat) {
      case 'scholarship': return "장학정보";
      case 'housing': return "주택정보";
      case 'job': return "일자리";
      case 'university': return "교육/역량";
      case 'welfare': return "생활/복지";
      default: return cat;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr.includes("관리자") || dateStr.length < 5) {
      return new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '').slice(0, -1);
    }
    return dateStr;
  };

  return (
    <section id="news" className="section settlement-news-section" style={{ backgroundColor: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }}>
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>정착 지원 소식</h2>
        </div>

        {/* Tab Menu */}
        <div className="tabs-container" style={{ display: "flex", justifyContent: "center", gap: "0.8rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setShowAll(false); }}
              style={{
                padding: "0.7rem 1.5rem",
                borderRadius: "50px",
                border: "1.5px solid",
                borderColor: activeTab === tab.id ? "var(--color-primary)" : "var(--color-border)",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: activeTab === tab.id ? "var(--color-primary)" : "white",
                color: activeTab === tab.id ? "white" : "var(--color-text-muted)",
                boxShadow: activeTab === tab.id ? "0 4px 12px rgba(220, 20, 20, 0.15)" : "var(--shadow-sm)"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: "600px", margin: "0 auto 3.5rem auto", position: "relative" }}>
          <input 
            type="text" 
            placeholder="어떤 소식을 찾으시나요? (예: 장학금, LH)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "1.2rem 1.5rem 1.2rem 3.5rem", borderRadius: "50px", border: "1px solid var(--color-border)", fontSize: "1.05rem", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}
          />
          <span style={{ position: "absolute", left: "1.3rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.2rem" }}>🔍</span>
        </div>

        {/* News Grid */}
        <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {loading ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "5rem" }}>
               <div className="spinner" style={{ margin: "0 auto 1.5rem auto", width: "40px", height: "40px", border: "4px solid rgba(0,0,0,0.1)", borderTopColor: "var(--color-primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
            </div>
          ) : visibleList.length > 0 ? (
            visibleList.map((item) => (
              <div key={item.id} className="news-card reveal-on-scroll active" style={{ background: "white", borderRadius: "24px", padding: "2.5rem", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", height: "100%", transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ 
                    backgroundColor: `${getCategoryColor(item.category)}15`, 
                    color: getCategoryColor(item.category), 
                    padding: "0.5rem 1rem", 
                    borderRadius: "50px", 
                    fontSize: "0.85rem", 
                    fontWeight: 800,
                    border: `1px solid ${getCategoryColor(item.category)}20`
                  }}>
                    {getCategoryLabel(item.category)}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: 600 }}>{formatDate(item.date)}</span>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1rem", lineHeight: "1.45", color: "var(--color-text-primary)" }}>{item.title}</h3>
                <p className="news-excerpt" style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "2rem", flexGrow: 1 }}>
                  {item.excerpt || "탈북민 정착에 도움이 되는 실질적인 혜택 정보를 확인해 보세요."}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "1.5rem", borderTop: "1px solid var(--color-border)" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)" }}>{item.badge || "공공기관"}</span>
                  <a href={item.url || item.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-primary)", fontWeight: 800, textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem", transition: "all 0.2s" }} className="btn-detail-link">
                    자세히 보기 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "5rem", color: "#aaa", backgroundColor: "white", borderRadius: "24px", border: "2px dashed #eee" }}>현재 검색 조건에 맞는 최신 소식이 없습니다.</div>
          )}
        </div>

        {filteredNews.length > 6 && (
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <button onClick={() => setShowAll(!showAll)} style={{ background: "white", border: "1.5px solid var(--color-primary)", color: "var(--color-primary)", fontWeight: 800, padding: "0.8rem 2rem", borderRadius: "50px", cursor: "pointer", transition: "all 0.2s" }}>
              {showAll ? "간략히 보기" : `전체 소식 더보기 (${filteredNews.length}건)`}
            </button>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}
