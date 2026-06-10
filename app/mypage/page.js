"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MyPage() {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState({ name: "동반자", joinDate: "2026. 06. 09" });

  useEffect(() => {
    setMounted(true);
    // Basic auth check
    const session = localStorage.getItem("mock_session");
    if (!session || (session !== "user" && session !== "admin")) {
      window.location.href = "/";
    }

    // Load actual user data from localStorage
    const storedName = localStorage.getItem("theround_user_name");
    const storedDate = localStorage.getItem("theround_join_date");
    if (storedName) {
      setUserData({
        name: storedName,
        joinDate: storedDate || new Date().toLocaleDateString()
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Header />
      <main style={{ paddingTop: "120px", minHeight: "80vh", backgroundColor: "var(--color-bg-primary)" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          
          <div className="section-header text-center" style={{ marginBottom: "2.5rem" }}>
            <span className="section-subtitle">COMPANION LOUNGE</span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
              환영합니다!<br/>
              <span className="highlight-text">더라운드 {userData.name}님</span>
            </h2>
          </div>

          {/* Digital Card */}
          <div style={{
            background: "linear-gradient(135deg, var(--color-primary) 0%, hsl(24, 12%, 16%) 100%)",
            borderRadius: "20px",
            padding: "2.5rem",
            color: "white",
            boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
            position: "relative",
            overflow: "hidden",
            marginBottom: "2.5rem",
            aspectRatio: "1.6 / 1"
          }}>
            {/* Background design elements */}
            <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "250px", height: "250px", background: "rgba(255,255,255,0.06)", borderRadius: "50%" }}></div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3.5rem", position: "relative", zIndex: 2 }}>
              <div>
                <p style={{ fontSize: "0.85rem", opacity: 0.8, letterSpacing: "2px", marginBottom: "0.3rem" }}>MEMBERSHIP CARD</p>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>디지털 동반자 라운지</h3>
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>
                THE ROUND
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 2 }}>
              <div>
                <p style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.2rem" }}>MEMBER</p>
                <p style={{ fontSize: "1.2rem", fontWeight: 700 }}>{userData.name} 후원자님</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.2rem" }}>SINCE</p>
                <p style={{ fontSize: "1rem", fontFamily: "monospace" }}>{userData.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Member Exclusive Content Section (Migrated) */}
          <div className="exclusive-content-section" style={{ marginTop: "1rem", paddingTop: "0rem" }}>
            <h4 style={{ marginBottom: "1.5rem", color: "var(--color-primary)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.2rem", fontWeight: 800 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              회원님을 위한 특별한 감사
            </h4>
            
            {/* Gratitude Video */}
            <div className="video-placeholder" style={{ width: "100%", aspectRatio: "16/9", background: "#000", borderRadius: "20px", position: "relative", overflow: "hidden", marginBottom: "2rem", boxShadow: "var(--shadow-lg)" }}>
              <img src="/assets/story_book.png" alt="감사 영상 썸네일" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
                <button className="play-btn" style={{ width: "70px", height: "70px", borderRadius: "50%", background: "var(--color-primary)", border: "none", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: "1rem", transition: "all 0.3s", boxShadow: "0 0 20px rgba(var(--color-primary-rgb), 0.5)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
                <span style={{ fontWeight: 700, fontSize: "1.1rem", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>더라운드 감사 메시지 (영상)</span>
              </div>
            </div>

            {/* Digital Gratitude Card (Enhanced) */}
            <div className="gratitude-card-ui" style={{ 
              background: "#fff", 
              padding: "3rem 2rem", 
              borderRadius: "24px", 
              border: "1px solid var(--color-border)", 
              boxShadow: "var(--shadow-md)", 
              position: "relative", 
              overflow: "hidden", 
              backgroundImage: "radial-gradient(var(--color-primary) 0.6px, transparent 0.6px)", 
              backgroundSize: "24px 24px", 
              backgroundColor: "#fffaf4" 
            }}>
              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: "1.4rem", marginBottom: "1.5rem", fontWeight: 700 }}>Thank You Card</div>
                <p style={{ fontSize: "1.1rem", lineHeight: 2, color: "var(--color-text-primary)", fontWeight: 600, wordBreak: "keep-all" }}>
                  "회원님의 따뜻한 동행이<br/>
                  한반도 청년들의 내일을 설계하는<br/>
                  가장 든든한 주춧돌이 되었습니다."
                </p>
                <p style={{ marginTop: "1.5rem", fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
                  작은 연대가 모여 거대한 변화를 만듭니다.<br/>
                  그 변화의 시작에 함께해 주셔서 고맙습니다.
                </p>
                <div style={{ marginTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "1.5rem", fontSize: "0.9rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
                  더라운드(The Round) 임직원 일동 드림
                </div>
              </div>
              <div style={{ position: "absolute", bottom: "-20px", right: "-20px", opacity: 0.08, transform: "rotate(-15deg)" }}>
                <svg width="150" height="150" viewBox="0 0 24 24" fill="var(--color-primary)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
