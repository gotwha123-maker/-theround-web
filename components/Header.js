"use client";

import { useState, useEffect } from "react";

export default function Header({ forceSolid = false }) {
  const [scrolled, setScrolled] = useState(forceSolid);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    if (forceSolid) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check mock session
    if (localStorage.getItem("mock_session")) {
      setIsLoggedIn(true);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceSolid]);

  const handleLogoClick = (e) => {
    const newClicks = logoClicks + 1;
    if (newClicks >= 5) {
      e.preventDefault();
      localStorage.setItem("mock_session", "admin");
      setIsLoggedIn(true);
      alert("관리자 모드가 활성화되었습니다.");
      window.location.href = "/admin";
      setLogoClicks(0);
    } else {
      setLogoClicks(newClicks);
      // Reset clicks after 3 seconds of inactivity
      setTimeout(() => setLogoClicks(0), 3000);
    }
    closeMenu();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (loginEmail === "admin@theround.kr" && loginPassword === adminPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("mock_session", "admin");
      localStorage.setItem("theround_user_name", "관리자");
      setAuthOpen(false);
      window.location.href = "/admin";
    } else if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("mock_session", "user");
      const tempName = loginEmail.split('@')[0];
      localStorage.setItem("theround_user_name", tempName);
      setAuthOpen(false);
      window.location.href = "/mypage";
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupName && loginEmail && loginPassword) {
      alert(`${signupName}님, 더라운드의 디지털 동반자가 되신 것을 환영합니다!`);
      setIsLoggedIn(true);
      localStorage.setItem("mock_session", "user");
      localStorage.setItem("theround_user_name", signupName);
      localStorage.setItem("theround_join_date", new Date().toLocaleDateString());
      setAuthOpen(false);
      window.location.href = "/mypage";
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("mock_session");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`} id="main-header">
        <div className="header-container">
          <div className="logo">
            <a href="/" className="logo-link" onClick={handleLogoClick}>
              <span className="logo-text" style={{ fontStyle: "normal", letterSpacing: "-1px" }}>
                THE <span className="accent-text" style={{ color: "var(--color-primary)", fontWeight: 900 }}>ROUND</span>
              </span>
            </a>
          </div>

          <nav className={`nav-menu ${menuOpen ? "open" : ""}`} id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item dropdown">
                <a href="/about" className="nav-link dropdown-toggle" onClick={closeMenu}>
                  더라운드 소개
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/about" className="nav-link-sub" onClick={closeMenu}>
                      더라운드 소개
                    </a>
                  </li>
                  <li>
                    <a href="/about-values" className="nav-link-sub" onClick={closeMenu}>
                      3대 핵심가치
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a href="/stats" className="nav-link dropdown-toggle" onClick={closeMenu}>
                  현황과 데이터
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/stats" className="nav-link-sub" onClick={closeMenu}>
                      종합 통계 현황
                    </a>
                  </li>
                  <li>
                    <a href="/news" className="nav-link-sub" onClick={closeMenu}>
                      정착지원 소식
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a href="/#solutions" className="nav-link dropdown-toggle" onClick={closeMenu}>
                  더라운드 활동
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/academy" className="nav-link-sub" onClick={closeMenu}>
                      리더십 아카데미
                    </a>
                  </li>
                  <li>
                    <a href="/mentoring" className="nav-link-sub" onClick={closeMenu}>
                      법률 1:1 멘토링
                    </a>
                  </li>
                  <li>
                    <a href="/community" className="nav-link-sub" onClick={closeMenu}>
                      커뮤니티 조성 & 연대
                    </a>
                  </li>
                  <li>
                    <a href="/designers" className="nav-link-sub" onClick={closeMenu}>
                      한반도 디자이너 섭외
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a href="/contact" className="nav-link dropdown-toggle" onClick={closeMenu}>
                  문의
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/talktalk" className="nav-link-sub" onClick={closeMenu}>
                      톡톡 이어지는 공간
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="nav-link-sub" onClick={closeMenu}>
                      1:1 문의하기
                    </a>
                  </li>
                </ul>
              </li>
              {!isLoggedIn ? (
                <li className="nav-item">
                  <span 
                    className="nav-link" 
                    style={{ color: "var(--color-primary)", fontWeight: 700, cursor: "pointer" }}
                    onClick={() => { setAuthOpen(true); closeMenu(); }}
                  >
                    로그인
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <a 
                      href={localStorage.getItem("mock_session") === "admin" ? "/admin" : "/mypage"} 
                      className="nav-link" 
                      style={{ color: "var(--color-primary)", fontWeight: 700 }}
                      onClick={closeMenu}
                    >
                      {localStorage.getItem("mock_session") === "admin" ? "관리자 대시보드" : "마이페이지"}
                    </a>
                  </li>
                  <li className="nav-item">
                    <span 
                      className="nav-link" 
                      style={{ color: "var(--color-text-muted)", fontWeight: 500, cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      로그아웃
                    </span>
                  </li>
                </>
              )}
              <li className="nav-item mobile-only-donate-item">
                <a 
                  href="/donation" 
                  className="btn btn-primary btn-mobile-donate"
                  onClick={closeMenu}
                >
                  후원하기
                </a>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <div className="lang-switcher-container" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginRight: "20px",
              padding: "5px 12px",
              background: scrolled ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.12)",
              borderRadius: "30px",
              border: scrolled ? "1px solid var(--color-border)" : "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: scrolled ? "var(--color-primary)" : "white", opacity: 0.9 }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <div style={{ display: "flex", gap: "4px", fontSize: "0.8rem", fontWeight: 800 }}>
                <span style={{
                  color: "white",
                  backgroundColor: "var(--color-primary)",
                  padding: "3px 8px",
                  borderRadius: "15px",
                  boxShadow: scrolled ? "0 2px 5px rgba(220, 20, 20, 0.2)" : "none",
                  cursor: "default"
                }}>
                  KO
                </span>
                <a 
                  href={typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://theround-web-en.vercel.app'} 
                  style={{
                    color: scrolled ? "var(--color-text-muted)" : "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    padding: "3px 8px",
                    borderRadius: "15px",
                    transition: "all 0.2s ease-in-out"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--color-primary)";
                    e.target.style.background = scrolled ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = scrolled ? "var(--color-text-muted)" : "rgba(255, 255, 255, 0.8)";
                    e.target.style.background = "transparent";
                  }}
                >
                  EN
                </a>
              </div>
            </div>
            <a href="/donation" className="btn btn-primary btn-header-donate" onClick={closeMenu}>
              후원하기
            </a>

            <button
              className={`hamburger ${menuOpen ? "active" : ""}`}
              id="hamburger-menu"
              aria-label="메뉴 열기"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Auth Modal (Login & Signup) */}
      {authOpen && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }}>
          <div className="modal-overlay" onClick={() => setAuthOpen(false)} style={{ opacity: 1, pointerEvents: 'auto' }}></div>
          <div className="modal-container" style={{ maxWidth: "440px", width: "90%", backgroundColor: "var(--color-bg-secondary)", borderRadius: "28px", position: "relative", zIndex: 3001, boxShadow: "var(--shadow-lg), 0 20px 40px rgba(0,0,0,0.1)", border: "1px solid var(--color-border)", overflow: "hidden" }}>
            <button className="modal-close" onClick={() => setAuthOpen(false)} style={{ top: "20px", right: "20px" }}>&times;</button>
            <div className="modal-body" style={{ padding: "3rem 2.5rem" }}>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 900, textAlign: "center", marginBottom: "1.5rem", color: "var(--color-text-primary)", letterSpacing: "-1px" }}>
                더라운드 <span style={{ color: "var(--color-primary)" }}>{authMode === "login" ? "로그인" : "회원가입"}</span>
              </h3>
              
              <div style={{ display: "flex", marginBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
                <button 
                  onClick={() => setAuthMode("login")}
                  style={{ flex: 1, padding: "0.8rem", background: "none", border: "none", borderBottom: authMode === "login" ? "2px solid var(--color-primary)" : "2px solid transparent", color: authMode === "login" ? "var(--color-primary)" : "var(--color-text-muted)", fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}
                >
                  로그인
                </button>
                <button 
                  onClick={() => setAuthMode("signup")}
                  style={{ flex: 1, padding: "0.8rem", background: "none", border: "none", borderBottom: authMode === "signup" ? "2px solid var(--color-primary)" : "2px solid transparent", color: authMode === "signup" ? "var(--color-primary)" : "var(--color-text-muted)", fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}
                >
                  회원가입
                </button>
              </div>

              {authMode === "login" ? (
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }} autoComplete="new-password">
                  <input style={{ display: "none" }} type="text" name="fake-user-name" />
                  <input style={{ display: "none" }} type="password" name="fake-password" />
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-muted)" }}>이메일 주소</label>
                    <input 
                      type="email" 
                      name="tr_secure_user_email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      onFocus={(e) => e.target.removeAttribute('readonly')}
                      readOnly
                      placeholder="이메일을 입력하세요" 
                      required 
                      autoComplete="off"
                      style={{ padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid var(--color-border)", fontSize: "0.95rem", width: "100%", outline: "none" }}
                    />
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-muted)" }}>비밀번호</label>
                    <input 
                      type="password" 
                      name="tr_secure_user_password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      onFocus={(e) => e.target.removeAttribute('readonly')}
                      readOnly
                      placeholder="비밀번호를 입력하세요" 
                      required 
                      autoComplete="new-password"
                      style={{ padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid var(--color-border)", fontSize: "0.95rem", width: "100%", outline: "none" }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%", borderRadius: "12px", padding: "1rem", fontSize: "1rem", fontWeight: 700 }}>
                    로그인
                  </button>
                  <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    아직 회원이 아니신가요? <span onClick={() => setAuthMode("signup")} style={{ color: "var(--color-primary)", fontWeight: 600, cursor: "pointer" }}>회원가입</span>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-muted)" }}>이름 (실명)</label>
                    <input 
                      type="text" 
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="홍길동" 
                      required 
                      style={{ padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid var(--color-border)", fontSize: "0.95rem", width: "100%", outline: "none" }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-muted)" }}>이메일 주소</label>
                    <input 
                      type="email" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="이메일을 입력하세요" 
                      required 
                      style={{ padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid var(--color-border)", fontSize: "0.95rem", width: "100%", outline: "none" }}
                    />
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-muted)" }}>비밀번호 설정</label>
                    <input 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="비밀번호를 입력하세요" 
                      required 
                      style={{ padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid var(--color-border)", fontSize: "0.95rem", width: "100%", outline: "none" }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%", borderRadius: "12px", padding: "1rem", fontSize: "1rem", fontWeight: 700 }}>
                    동반자 회원가입
                  </button>
                  <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    이미 계정이 있으신가요? <span onClick={() => setAuthMode("login")} style={{ color: "var(--color-primary)", fontWeight: 600, cursor: "pointer" }}>로그인</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
