"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("stories");
  const [stats, setStats] = useState(null);
  const [stories, setStories] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isCrawling, setIsCrawling] = useState(false);
  const [showAddStory, setShowAddStory] = useState(false);
  const [newStory, setNewStory] = useState({ title: '', date: '', excerpt: '', content_html: '' });

  useEffect(() => {
    setMounted(true);
    // Basic auth check
    const session = localStorage.getItem("mock_session");
    if (!session || session !== "admin") {
      window.location.href = "/";
      return;
    }

    // Fetch real stats
    fetch('/api/admin/stats').then(res => res.json()).then(data => setStats(data)).catch(err => console.error(err));
    fetch('/api/stories').then(res => res.json()).then(data => setStories(data)).catch(err => console.error(err));
    fetch('/api/designers').then(res => res.json()).then(data => setDesigners(data)).catch(err => console.error(err));
    fetch('/api/admin/bookings').then(res => res.json()).then(data => setBookings(data)).catch(err => console.error(err));

  }, []);

  const handleRunCrawler = async () => {
    if (!confirm("남북하나재단 뉴스를 지금 즉시 크롤링하여 업데이트하시겠습니까?")) return;
    
    setIsCrawling(true);
    try {
      const res = await fetch('/api/admin/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'run_news_crawler' })
      });
      const data = await res.json();
      if (data.success) {
        alert("업데이트 완료:\n" + (data.message || "성공적으로 동기화되었습니다."));
        // Refresh stats
        fetch('/api/admin/stats').then(res => res.json()).then(data => setStats(data));
      } else {
        alert("오류 발생: " + data.error);
      }
    } catch (e) {
      alert("서버 연결 오류가 발생했습니다.");
    } finally {
      setIsCrawling(false);
    }
  };

  const moveDesigner = async (index, direction) => {
    const newDesigners = [...designers].sort((a, b) => a.order - b.order);
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newDesigners.length) return;

    // Swap order values
    const tempOrder = newDesigners[index].order;
    newDesigners[index].order = newDesigners[targetIndex].order;
    newDesigners[targetIndex].order = tempOrder;

    // If orders were same, force unique
    if (newDesigners[index].order === newDesigners[targetIndex].order) {
       newDesigners.forEach((d, i) => d.order = i);
    }

    setDesigners([...newDesigners].sort((a, b) => a.order - b.order));

    // Update both in Airtable
    try {
      await Promise.all([
        fetch('/api/designers', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: newDesigners[index].id, order: newDesigners[index].order })
        }),
        fetch('/api/designers', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: newDesigners[targetIndex].id, order: newDesigners[targetIndex].order })
        })
      ]);
    } catch (e) {
      alert('순서 변경 저장 중 오류가 발생했습니다.');
    }
  };

  if (!mounted) return null;

  return (
    <>
      <Header />
      <main style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
        
        {/* Admin Header */}
        <div style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "2rem 0" }}>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>더라운드 관리자 대시보드</h1>
              <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>웹사이트의 주요 데이터와 콘텐츠를 관리합니다.</p>
            </div>
            <div>
              <span style={{ backgroundColor: "#dcfce7", color: "#065f46", padding: "0.4rem 1rem", borderRadius: "50px", fontSize: "0.85rem", fontWeight: 700 }}>
                마스터 권한 활성화됨
              </span>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "250px 1fr", gap: "2rem" }}>
          
          {/* Sidebar */}
          <aside style={{ backgroundColor: "white", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e5e7eb", alignSelf: "start" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button 
                onClick={() => setActiveTab("stories")}
                style={{ textAlign: "left", padding: "1rem", borderRadius: "8px", fontWeight: 600, transition: "all 0.2s", backgroundColor: activeTab === "stories" ? "#fee2e2" : "transparent", color: activeTab === "stories" ? "#b91c1c" : "#4b5563", border: "none", cursor: "pointer" }}
              >
                활동 소식 관리
              </button>
              <button 
                onClick={() => setActiveTab("designers")}
                style={{ textAlign: "left", padding: "1rem", borderRadius: "8px", fontWeight: 600, transition: "all 0.2s", backgroundColor: activeTab === "designers" ? "#fee2e2" : "transparent", color: activeTab === "designers" ? "#b91c1c" : "#4b5563", border: "none", cursor: "pointer" }}
              >
                한반도 디자이너
              </button>
              <button 
                onClick={() => setActiveTab("requests")}
                style={{ textAlign: "left", padding: "1rem", borderRadius: "8px", fontWeight: 600, transition: "all 0.2s", backgroundColor: activeTab === "requests" ? "#fee2e2" : "transparent", color: activeTab === "requests" ? "#b91c1c" : "#4b5563", border: "none", cursor: "pointer" }}
              >
                강연 신청 현황
              </button>
              <button 
                onClick={() => setActiveTab("users")}
                style={{ textAlign: "left", padding: "1rem", borderRadius: "8px", fontWeight: 600, transition: "all 0.2s", backgroundColor: activeTab === "users" ? "#fee2e2" : "transparent", color: activeTab === "users" ? "#b91c1c" : "#4b5563", border: "none", cursor: "pointer" }}
              >
                회원 관리
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                style={{ textAlign: "left", padding: "1rem", borderRadius: "8px", fontWeight: 600, transition: "all 0.2s", backgroundColor: activeTab === "settings" ? "#fee2e2" : "transparent", color: activeTab === "settings" ? "#b91c1c" : "#4b5563", border: "none", cursor: "pointer" }}
              >
                시스템 설정
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <section style={{ backgroundColor: "white", borderRadius: "16px", padding: "2.5rem", border: "1px solid #e5e7eb", minHeight: "600px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", position: "relative" }}>
            
            {activeTab === "stories" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827" }}>활동 소식 관리</h2>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button 
                      onClick={handleRunCrawler}
                      disabled={isCrawling}
                      style={{ backgroundColor: "white", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 600, cursor: isCrawling ? "wait" : "pointer", opacity: isCrawling ? 0.7 : 1 }}
                    >
                      {isCrawling ? "크롤링 중..." : "🔄 하나재단 뉴스 크롤링"}
                    </button>
                    <button 
                      onClick={() => setShowAddStory(true)}
                      style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer" }}
                    >
                      + 새 소식 등록
                    </button>
                  </div>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                  <div style={{ padding: "1.2rem", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #f3f4f6" }}>
                    <span style={{ display: "block", color: "#6b7280", fontSize: "0.85rem", marginBottom: "0.5rem" }}>크롤링된 정부 혜택 뉴스</span>
                    <strong style={{ fontSize: "1.8rem", color: "#111827" }}>{stats ? stats.newsCount : "로딩중..."}</strong>
                  </div>
                  <div style={{ padding: "1.2rem", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #f3f4f6" }}>
                    <span style={{ display: "block", color: "#6b7280", fontSize: "0.85rem", marginBottom: "0.5rem" }}>직접 작성한 활동 스토리</span>
                    <strong style={{ fontSize: "1.8rem", color: "var(--color-primary)" }}>{stats ? stats.storiesCount : "로딩중..."}</strong>
                  </div>
                  <div style={{ padding: "1.2rem", backgroundColor: "#f0fdf4", borderRadius: "12px", border: "1px solid #dcfce7" }}>
                    <span style={{ display: "block", color: "#065f46", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Airtable 동기화 상태</span>
                    <strong style={{ fontSize: "1.2rem", color: "#065f46", display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ width: "10px", height: "10px", backgroundColor: "#10b981", borderRadius: "50%" }}></span> 정상 연결됨</strong>
                  </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
                      <th style={{ padding: "1rem 0", color: "#6b7280", fontWeight: 600, fontSize: "0.9rem" }}>제목</th>
                      <th style={{ padding: "1rem 0", color: "#6b7280", fontWeight: 600, fontSize: "0.9rem" }}>게시일</th>
                      <th style={{ padding: "1rem 0", color: "#6b7280", fontWeight: 600, fontSize: "0.9rem", textAlign: "right" }}>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stories.length === 0 ? (
                      <tr><td colSpan="3" style={{ padding: "1rem 0", textAlign: "center", color: "#6b7280" }}>데이터를 불러오는 중입니다...</td></tr>
                    ) : (
                      stories.map((story) => (
                        <tr key={story.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                          <td style={{ padding: "1rem 0", fontWeight: 500, color: "#111827", maxWidth: "400px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{story.title}</td>
                          <td style={{ padding: "1rem 0", color: "#6b7280", fontSize: "0.9rem" }}>{story.date}</td>
                          <td style={{ padding: "1rem 0", textAlign: "right" }}>
                            <button style={{ background: "none", border: "none", color: "var(--color-primary)", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>수정</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "designers" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827" }}>한반도 디자이너 (강사 풀)</h2>
                  <button style={{ backgroundColor: "white", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }} onClick={() => fetch('/api/designers').then(r=>r.json()).then(setDesigners)}>새로고침</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {designers.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#6b7280", padding: "2rem" }}>로딩 중...</div>
                  ) : (
                    designers.map((d) => (
                      <div key={d.id} style={{ padding: "1.2rem 1.5rem", border: "1px solid #e5e7eb", borderRadius: "12px", display: "flex", alignItems: "center", gap: "1.5rem", position: "relative", backgroundColor: d.isHidden ? "#f9fafb" : "white", transition: "all 0.2s" }}>
                        {/* Rank Controls */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", backgroundColor: "#f3f4f6", padding: "6px", borderRadius: "8px" }}>
                          <button 
                            onClick={() => moveDesigner(designers.findIndex(designer => designer.id === d.id), 'up')}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem", padding: "2px", color: "#4b5563", lineHeight: 1 }}
                            title="위로 이동"
                          >▲</button>
                          <button 
                            onClick={() => moveDesigner(designers.findIndex(designer => designer.id === d.id), 'down')}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem", padding: "2px", color: "#4b5563", lineHeight: 1 }}
                            title="아래로 이동"
                          >▼</button>
                        </div>

                        <div style={{ width: "50px", height: "50px", backgroundColor: "#f3f4f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", overflow: "hidden", flexShrink: 0, border: "2px solid white", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                          <img src={d.img} alt={d.ko.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.2rem" }}>
                            <strong style={{ fontSize: "1.05rem", color: d.isHidden ? "#9ca3af" : "#111827", textDecoration: d.isHidden ? "line-through" : "none" }}>{d.ko.name}</strong>
                            <span style={{ backgroundColor: "var(--color-primary)", color: "white", fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "4px", fontWeight: 700 }}>{d.ko.tag}</span>
                            {d.isHidden && <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: 600 }}>(숨김 상태)</span>}
                          </div>
                          <p style={{ fontSize: "0.85rem", color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.ko.slogan}</p>
                        </div>

                        <div style={{ display: "flex", gap: "0.6rem" }}>
                          <button 
                            onClick={async () => {
                              try {
                                const res = await fetch('/api/designers', {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ id: d.id, isHidden: !d.isHidden })
                                });
                                if(res.ok) {
                                  setDesigners(designers.map(designer => designer.id === d.id ? { ...designer, isHidden: !d.isHidden } : designer));
                                } else {
                                  alert('상태 변경 실패');
                                }
                              } catch(e) {
                                alert('오류 발생');
                              }
                            }}
                            style={{ backgroundColor: d.isHidden ? "#4b5563" : "white", border: "1px solid #d1d5db", borderRadius: "8px", color: d.isHidden ? "white" : "#4b5563", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem", padding: "0.5rem 1rem", transition: "all 0.2s" }}
                          >
                            {d.isHidden ? "다시 보이기" : "숨기기"}
                          </button>
                          <button 
                            onClick={async () => {
                              if(confirm(`'${d.ko.name}' 디자이너를 삭제하시겠습니까? (이 작업은 되돌릴 수 없으며 메인 페이지에서 즉시 사라집니다)`)) {
                                try {
                                  const res = await fetch('/api/designers', {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ id: d.id })
                                  });
                                  if(res.ok) {
                                    setDesigners(designers.filter(designer => designer.id !== d.id));
                                    fetch('/api/admin/stats').then(r=>r.json()).then(setStats);
                                    alert('삭제되었습니다.');
                                  } else {
                                    alert('삭제 실패');
                                  }
                                } catch(e) {
                                  alert('오류 발생');
                                }
                              }
                            }}
                            style={{ backgroundColor: "white", border: "1px solid #fca5a5", borderRadius: "8px", color: "#ef4444", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem", padding: "0.5rem 1rem", transition: "all 0.2s" }}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", marginBottom: "2rem" }}>강연 의뢰 현황</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.5rem", backgroundColor: "#f8fafc" }}>
                    <h4 style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.5rem" }}>총 누적 의뢰</h4>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#111827" }}>{stats ? stats.bookingsCount : "..."}</span>
                      <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>건</span>
                    </div>
                  </div>
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.5rem", backgroundColor: "#f8fafc" }}>
                    <h4 style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.5rem" }}>대기 중인 의뢰</h4>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--color-primary)" }}>{bookings.filter(b => b.status === '대기').length}</span>
                      <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>건</span>
                    </div>
                  </div>
                </div>
                
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
                      <th style={{ padding: "1rem 0", color: "#6b7280", fontWeight: 600, fontSize: "0.9rem" }}>상태</th>
                      <th style={{ padding: "1rem 0", color: "#6b7280", fontWeight: 600, fontSize: "0.9rem" }}>의뢰자</th>
                      <th style={{ padding: "1rem 0", color: "#6b7280", fontWeight: 600, fontSize: "0.9rem" }}>희망 강사</th>
                      <th style={{ padding: "1rem 0", color: "#6b7280", fontWeight: 600, fontSize: "0.9rem" }}>희망 일정</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr><td colSpan="4" style={{ padding: "1rem 0", textAlign: "center", color: "#6b7280" }}>등록된 강연 의뢰가 없습니다.</td></tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr key={booking.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                          <td style={{ padding: "1rem 0", fontWeight: 500 }}>
                            <span style={{ 
                              padding: "0.2rem 0.6rem", 
                              backgroundColor: booking.status === '대기' ? "#fef2f2" : "#f0fdf4", 
                              color: booking.status === '대기' ? "#991b1b" : "#166534", 
                              borderRadius: "4px", fontSize: "0.8rem" 
                            }}>
                              {booking.status}
                            </span>
                          </td>
                          <td style={{ padding: "1rem 0", color: "#111827", fontSize: "0.9rem" }}>{booking.clientName}<br/><span style={{ color: "#6b7280", fontSize: "0.8rem" }}>{booking.clientPhone}</span></td>
                          <td style={{ padding: "1rem 0", color: "#111827", fontSize: "0.9rem" }}>{booking.designerName}</td>
                          <td style={{ padding: "1rem 0", color: "#6b7280", fontSize: "0.9rem" }}>{booking.date}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {(activeTab === "users" || activeTab === "settings") && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "400px", color: "#9ca3af" }}>
                <div style={{ width: "80px", height: "80px", backgroundColor: "#f3f4f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "2rem" }}>⚙️</span>
                </div>
                <h3 style={{ color: "#4b5563", fontSize: "1.2rem", marginBottom: "0.5rem" }}>모듈 설치 중</h3>
                <p style={{ fontSize: "0.95rem" }}>해당 기능은 다음 업데이트(v2.0)에 포함될 예정입니다.</p>
              </div>
            )}
            
            {/* Add Story Modal */}
            {showAddStory && (
              <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                <div style={{ backgroundColor: "white", padding: "2.5rem", borderRadius: "16px", width: "90%", maxWidth: "600px" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>새 활동 소식 등록</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const res = await fetch('/api/stories', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newStory)
                      });
                      if (res.ok) {
                        alert('성공적으로 등록되었습니다.');
                        setShowAddStory(false);
                        setNewStory({ title: '', date: '', excerpt: '', content_html: '' });
                        // Refresh stories and stats
                        fetch('/api/stories').then(res => res.json()).then(setStories);
                        fetch('/api/admin/stats').then(res => res.json()).then(setStats);
                      } else {
                        alert('등록에 실패했습니다.');
                      }
                    } catch (error) {
                      alert('오류가 발생했습니다.');
                    }
                  }}>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>제목</label>
                      <input type="text" required style={{ width: "100%", padding: "0.8rem", border: "1px solid #d1d5db", borderRadius: "8px" }} value={newStory.title} onChange={e => setNewStory({...newStory, title: e.target.value})} />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>날짜 (YYYY. MM. DD)</label>
                      <input type="text" required style={{ width: "100%", padding: "0.8rem", border: "1px solid #d1d5db", borderRadius: "8px" }} value={newStory.date} onChange={e => setNewStory({...newStory, date: e.target.value})} />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>요약 (Excerpt)</label>
                      <textarea required rows="2" style={{ width: "100%", padding: "0.8rem", border: "1px solid #d1d5db", borderRadius: "8px" }} value={newStory.excerpt} onChange={e => setNewStory({...newStory, excerpt: e.target.value})}></textarea>
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>본문 HTML</label>
                      <textarea required rows="4" style={{ width: "100%", padding: "0.8rem", border: "1px solid #d1d5db", borderRadius: "8px" }} value={newStory.content_html} onChange={e => setNewStory({...newStory, content_html: e.target.value})}></textarea>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                      <button type="button" onClick={() => setShowAddStory(false)} style={{ padding: "0.8rem 1.5rem", backgroundColor: "#f3f4f6", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>취소</button>
                      <button type="submit" style={{ padding: "0.8rem 1.5rem", backgroundColor: "var(--color-primary)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>등록하기</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </section>

        </div>
      </main>
    </>
  );
}
