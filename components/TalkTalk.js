"use client";

import { useState } from "react";

export default function TalkTalk() {
  const [modalType, setModalType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", contact: "", region: "", affiliation: "", email: "", agreement: false,
    orgName: "", jobRole: "", volunteerArea: "", items: [], details: "",
    surveyTargetCount: "", surveyAgeRange: "", surveyArrivalYear: "", surveyPurpose: ""
  });

  const openModal = (type) => {
    setModalType(type);
    setFormData({ 
      name: "", contact: "", region: "", affiliation: "", email: "", agreement: false,
      orgName: "", jobRole: "", volunteerArea: "", items: [], details: "",
      surveyTargetCount: "", surveyAgeRange: "", surveyArrivalYear: "", surveyPurpose: ""
    });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalType(null);
    document.body.style.overflow = "";
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      items: checked ? [...prev.items, value] : prev.items.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) { alert("동의 절차가 필요합니다."); return; }
    setSubmitting(true);
    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, subject: `[TalkTalk] ${modalType.toUpperCase()} 신청` })
        });
        if (res.ok) { alert("정상 접수되었습니다."); closeModal(); }
    } finally { setSubmitting(false); }
  };

  return (
    <section id="talktalk" className="section talktalk-section" style={{ 
        backgroundColor: "white",
        padding: "6rem 0"
    }}>
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle" style={{ letterSpacing: "3px", fontWeight: 700, color: "var(--color-primary)" }}>COMMUNICATION HUB</span>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 900, marginBottom: "1.2rem", letterSpacing: "-0.02em" }}>
            톡톡(TalkTalk): 이야기가 이어지는 공간
          </h2>
          <p className="section-lead" style={{ fontSize: "1.15rem", color: "var(--color-text-muted)", maxWidth: "700px", margin: "0 auto", lineHeight: "1.7" }}>
            스토리는 사람을 연결합니다. 연결은 공감을 만들고,<br />공감은 한반도의 미래를 바꿉니다.
          </p>
        </div>

        <div className="talktalk-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "1.8rem", 
          marginTop: "4.5rem" 
        }}>
          {/* Refined Action Cards */}
          {[
            { id: 'giving', title: '나눔 요청하기', desc: '물품, 화장품, 의류 등 소중한 마음을 나누고 싶은 분들을 기다립니다.', icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
            { id: 'job', title: '구인 요청하기', desc: '한반도의 미래를 함께 만들어갈 인재를 찾으시는 기관 및 기업의 요청을 받습니다.', icon: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
            { id: 'survey', title: '설문조사 의뢰', desc: '학술 연구 및 정책 제안을 위한 설문조사 대상자 모집 및 분석 지원을 의뢰하세요.', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }
          ].map((item, idx) => (
            <div key={item.id} className="talk-card reveal-on-scroll" style={{ 
              background: "rgba(13, 148, 136, 0.02)", padding: "2.8rem 2rem", borderRadius: "28px", border: "1px solid rgba(13, 148, 136, 0.08)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.06)"; e.currentTarget.style.backgroundColor = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "rgba(13, 148, 136, 0.02)"; }}
            >
              <div>
                <div style={{ color: "var(--color-primary)", marginBottom: "1.5rem", opacity: 0.8 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {item.id === 'job' ? <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect> : null}
                        <path d={item.icon}></path>
                        {item.id === 'survey' ? <><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></> : null}
                    </svg>
                </div>
                <h3 style={{ marginBottom: "0.8rem", fontSize: "1.45rem", fontWeight: 800, color: "var(--color-text-primary)" }}>{item.title}</h3>
                <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)", fontSize: "0.98rem", lineHeight: "1.6" }}>{item.desc}</p>
              </div>
              <button onClick={() => openModal(item.id)} className="btn btn-outline btn-block" style={{ borderRadius: "14px", fontWeight: 700, padding: "0.8rem" }}>신청하기</button>
            </div>
          ))}
        </div>

        {/* Small Menu Items - Sophisticated Underline Style */}
        <div className="talktalk-sub-menu reveal-on-scroll" style={{ 
          display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "4.5rem", flexWrap: "wrap",
          padding: "2rem 0", borderTop: "1px solid #eee"
        }}>
          <button onClick={() => openModal('volunteer')} className="nav-btn">자원봉사 신청하기</button>
          <button onClick={() => openModal('proposal')} className="nav-btn">더라운드 제안하기</button>
          <button onClick={() => openModal('story')} className="nav-btn">나의 스토리 공유</button>
        </div>
      </div>

      <style jsx>{`
        .nav-btn {
            background: none; border: none; color: var(--color-text-muted); font-weight: 700;
            font-size: 1.05rem; cursor: pointer; position: relative; padding: 0.5rem 0;
            transition: color 0.3s ease;
        }
        .nav-btn::after {
            content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
            background-color: var(--color-primary); transition: width 0.3s ease;
        }
        .nav-btn:hover { color: var(--color-primary); }
        .nav-btn:hover::after { width: 100%; }
      `}</style>

      {/* Modals with Clean Design */}
      {modalType && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container" style={{ maxWidth: "600px", width: "92%", maxHeight: "85vh", overflowY: "auto", borderRadius: "32px" }}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-body" style={{ padding: "3rem" }}>
              <h3 style={{ marginBottom: "1.8rem", color: "var(--color-primary)", fontSize: "1.7rem", fontWeight: 800 }}>
                {modalType === 'giving' ? "나눔하기 신청" : modalType === 'job' ? "구인요청 신청" : modalType === 'volunteer' ? "자원봉사 신청" : modalType === 'proposal' ? "더라운드 제안" : modalType === 'story' ? "스토리 공유 요청" : "설문조사 의뢰"}
              </h3>
              <form onSubmit={handleSubmit} className="admin-form">
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderLeft: "3px solid var(--color-primary)", paddingLeft: "0.8rem" }}>신청자 정보</h4>
                  <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <div className="form-group" style={{ flex: 1 }}><label>성함 *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required /></div>
                    <div className="form-group" style={{ flex: 1 }}><label>연락처 *</label><input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required /></div>
                  </div>
                  <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <div className="form-group" style={{ flex: 1 }}><label>지역 (구/시 단위) *</label><input type="text" name="region" value={formData.region} onChange={handleInputChange} required /></div>
                    <div className="form-group" style={{ flex: 1 }}><label>소속 *</label><input type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} required /></div>
                  </div>
                  <div className="form-group"><label>이메일 주소 *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                </div>

                {modalType === 'survey' && (
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderLeft: "3px solid var(--color-primary)", paddingLeft: "0.8rem" }}>의뢰 상세</h4>
                    <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                      <div className="form-group" style={{ flex: 1 }}><label>목표 인원 *</label><input type="text" name="surveyTargetCount" value={formData.surveyTargetCount} onChange={handleInputChange} required /></div>
                      <div className="form-group" style={{ flex: 1 }}><label>대상 연령대 *</label><input type="text" name="surveyAgeRange" value={formData.surveyAgeRange} onChange={handleInputChange} required /></div>
                    </div>
                    <div className="form-group" style={{ marginBottom: "1.5rem" }}><label>조사 제목/목적 *</label><input type="text" name="surveyPurpose" value={formData.surveyPurpose} onChange={handleInputChange} required /></div>
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontWeight: 700 }}>상세 내용</label>
                  <textarea name="details" value={formData.details} onChange={handleInputChange} rows="3" style={{ borderRadius: "12px", border: "1.5px solid #eee" }} />
                </div>

                <div style={{ background: "rgba(0,0,0,0.02)", padding: "1.2rem", borderRadius: "16px", marginBottom: "2.5rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", cursor: "pointer" }}>
                    <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} required />
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.5" }}>
                      <strong>더라운드 회원등록 및 개인정보 활용 동의 *</strong><br />
                      보내주신 소중한 정보는 커뮤니티 관리 및 활동 안내를 위해 안전하게 사용됩니다.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting} style={{ borderRadius: "14px" }}>
                  {submitting ? "전송 중..." : "신청 완료하기"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
