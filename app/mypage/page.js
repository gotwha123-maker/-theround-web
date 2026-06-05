"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Basic auth check
    const session = localStorage.getItem("mock_session");
    if (!session || session !== "user") {
      // If not logged in as user, check if admin. If admin, go to admin. Else go home.
      if (session === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
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
              <span className="highlight-text">더라운드 디지털 동반자님</span>
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
                <p style={{ fontSize: "1.2rem", fontWeight: 700 }}>홍길동 후원자님</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.2rem" }}>SINCE</p>
                <p style={{ fontSize: "1rem", fontFamily: "monospace" }}>2026. 06</p>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div style={{
            background: "var(--color-bg-secondary)",
            borderRadius: "20px",
            padding: "2.5rem",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
            lineHeight: "1.7",
            color: "var(--color-text-primary)"
          }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--color-primary)", marginBottom: "1.2rem", fontWeight: 800 }}>
              먼저 온 통일민과 함께, 한반도의 내일을 그립니다.
            </h3>
            <p style={{ marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              안녕하세요 동반자님. 더라운드에 가입해 주셔서 진심으로 감사드립니다.
            </p>
            <p style={{ marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              동반자님의 관심과 참여는 우리 사회의 보이지 않는 장벽을 허물고, 남북 청년들이 각자의 전문성을 살려 사회의 리더로 성장하는 데 가장 큰 원동력이 됩니다.
            </p>
            <p style={{ marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              이곳 라운지에서는 앞으로 동반자님만을 위한 특별한 행사 초청, 정기 간행물, 그리고 투명한 후원금 사용 내역을 확인하실 수 있도록 준비 중입니다.
            </p>
            <p style={{ fontWeight: 700, color: "var(--color-text-primary)", fontSize: "0.95rem" }}>
              작은 연대가 모여 거대한 변화를 만듭니다. 그 변화의 시작에 함께해 주셔서 고맙습니다.
            </p>
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px dashed var(--color-border)", textAlign: "right", fontStyle: "italic", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
              - 더라운드 팀 일동 드림
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
