"use client";

export default function TalkTalk() {
  return (
    <section id="talktalk" className="section talktalk-section">
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">COMMUNICATION HUB</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            톡톡(TalkTalk): 이야기가 이어지는 공간
          </h2>
          <p className="section-lead" style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", maxWidth: "800px", margin: "0 auto" }}>
            스토리는 사람을 연결합니다. 연결은 공감을 만들고, 공감은 한반도의 미래를 바꿉니다.
          </p>
        </div>

        <div className="talktalk-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2rem", 
          marginTop: "4rem" 
        }}>
          {/* Main CTAs */}
          <div className="talk-card reveal-on-scroll" style={{ 
            background: "var(--color-bg-secondary)", 
            padding: "2.5rem", 
            borderRadius: "24px", 
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <h3 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>더라운드에 제안하기</h3>
              <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)" }}>더라운드와 함께하고 싶은 활동이나 새로운 아이디어가 있다면 언제든 제안해 주세요.</p>
            </div>
            <a href="#contact" className="btn btn-outline btn-block">제안 요청하기</a>
          </div>

          <div className="talk-card reveal-on-scroll delay-100" style={{ 
            background: "var(--color-bg-secondary)", 
            padding: "2.5rem", 
            borderRadius: "24px", 
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <h3 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>나의 스토리 알리기</h3>
              <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)" }}>당신의 소중한 삶의 궤적과 이야기를 세상과 나누고 싶다면 지금 요청해 주세요.</p>
            </div>
            <a href="#contact" className="btn btn-outline btn-block">스토리 공유 요청</a>
          </div>
        </div>

        {/* Small Menu Items */}
        <div className="talktalk-sub-menu reveal-on-scroll delay-200" style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "1.5rem", 
          marginTop: "3rem",
          flexWrap: "wrap"
        }}>
          <a href="#donation" style={{ padding: "0.8rem 1.5rem", background: "rgba(13, 148, 136, 0.05)", borderRadius: "50px", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", border: "1px solid rgba(13, 148, 136, 0.1)" }}>
            나눔하기
          </a>
          <a href="#contact" style={{ padding: "0.8rem 1.5rem", background: "rgba(13, 148, 136, 0.05)", borderRadius: "50px", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", border: "1px solid rgba(13, 148, 136, 0.1)" }}>
            구인요청
          </a>
          <a href="#contact" style={{ padding: "0.8rem 1.5rem", background: "rgba(13, 148, 136, 0.05)", borderRadius: "50px", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", border: "1px solid rgba(13, 148, 136, 0.1)" }}>
            자원봉사 신청하기
          </a>
        </div>
      </div>
    </section>
  );
}
