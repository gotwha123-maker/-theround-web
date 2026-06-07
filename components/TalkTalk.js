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
      backgroundColor: "#fcfdfd",
      padding: "7rem 0"
    }}>
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle" style={{ color: "var(--color-primary)", letterSpacing: "2px", fontWeight: 700 }}>COMMUNICATION HUB</span>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--color-text-primary)" }}>
            톡톡(TalkTalk): 이야기가 이어지는 공간
          </h2>
          <p className="section-lead" style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", maxWidth: "800px", margin: "0 auto", lineHeight: "1.7", fontWeight: 400 }}>
            스토리는 사람을 연결합니다. 연결은 공감을 만들고,<br />공감은 한반도의 미래를 바꿉니다.
          </p>
        </div>

        {/* 1st Row: Main Actions */}
        <div className="talktalk-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "1.5rem", 
          marginTop: "4.5rem" 
        }}>
          {[
            { id: 'giving', title: '나눔 요청하기', desc: '물품, 화장품, 의류 등 소중한 마음을 나누고 싶은 분들의 신청을 기다립니다.', icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
            { id: 'job', title: '탈북민 구인요청', desc: '한반도의 미래를 함께 만들어갈 인재를 찾으시는 기관 및 기업의 요청을 받습니다.', icon: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
            { id: 'survey', title: '설문조사 의뢰하기', desc: '학술 연구 및 정책 제안을 위한 설문조사 대상자 모집 및 분석 지원을 의뢰하세요.', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }
          ].map((item, idx) => (
            <div key={item.id} className="talk-card reveal-on-scroll" style={{ 
              background: "white", padding: "2.8rem 2rem", borderRadius: "28px", border: "1.5px solid #f1f3f3",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxShadow: "0 12px 30px rgba(0,0,0,0.03)", transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(13, 148, 136, 0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#f1f3f3"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.03)"; }}
            >
              <div>
                <div style={{ color: "var(--color-primary)", marginBottom: "1.8rem", opacity: 0.8 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.id === 'job' ? <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect> : null}
                    <path d={item.icon}></path>
                    {item.id === 'survey' ? <><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></> : null}
                  </svg>
                </div>
                <h3 style={{ marginBottom: "0.8rem", fontSize: "1.45rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{item.title}</h3>
                <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)", fontSize: "0.98rem", lineHeight: "1.6" }}>{item.desc}</p>
              </div>
              <button onClick={() => openModal(item.id)} className="btn btn-primary btn-block" style={{ borderRadius: "14px", padding: "1rem", fontWeight: 700 }}>지금 신청하기</button>
            </div>
          ))}
        </div>

        {/* 2nd Row: Sub Actions - Standardized Card Shape */}
        <div className="talktalk-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "1.5rem", 
          marginTop: "1.5rem" 
        }}>
          {[
            { id: 'volunteer', title: '자원봉사 신청하기', desc: '더라운드와 함께 따뜻한 나눔을 실천할 봉사자분들의 손길을 기다립니다.', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
            { id: 'proposal', title: '더라운드 제안하기', desc: '통합의 내일을 위한 새로운 아이디어나 협업 프로젝트를 언제든 제안해 주세요.', icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.7 8.38 8.38 0 0 1 3.8.9L21 2z' },
            { id: 'story', title: '나의 스토리 공유', desc: '여러분의 소중한 삶의 이야기를 통해 한반도의 미래를 함께 연결해 주세요.', icon: 'M12 20h9' }
          ].map((item, idx) => (
            <div key={item.id} className="talk-card reveal-on-scroll" style={{ 
              background: "white", padding: "2.8rem 2rem", borderRadius: "28px", border: "1.5px solid #f1f3f3",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxShadow: "0 12px 30px rgba(0,0,0,0.03)", transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(13, 148, 136, 0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#f1f3f3"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.03)"; }}
            >
              <div>
                <div style={{ color: "var(--color-primary)", marginBottom: "1.8rem", opacity: 0.8 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon}></path>
                    {item.id === 'volunteer' ? <circle cx="9" cy="7" r="4"></circle> : null}
                    {item.id === 'story' ? <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path> : null}
                  </svg>
                </div>
                <h3 style={{ marginBottom: "0.8rem", fontSize: "1.45rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{item.title}</h3>
                <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)", fontSize: "0.98rem", lineHeight: "1.6" }}>{item.desc}</p>
              </div>
              <button onClick={() => openModal(item.id)} className="btn btn-outline btn-block" style={{ borderRadius: "14px", padding: "0.9rem", fontWeight: 700 }}>지금 참여하기</button>
            </div>
          ))}
        </div>
      </div>

      {modalType && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container" style={{ maxWidth: "600px", width: "95%", maxHeight: "90vh", overflowY: "auto", borderRadius: "32px", boxShadow: "0 30px 100px rgba(0,0,0,0.2)" }}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-body" style={{ padding: "3.5rem" }}>
              <h3 style={{ marginBottom: "2rem", color: "var(--color-primary)", fontSize: "1.7rem", fontWeight: 800 }}>
                {modalType === 'giving' ? "나눔하기 신청" : modalType === 'job' ? "구인요청 신청" : modalType === 'volunteer' ? "자원봉사 신청" : modalType === 'proposal' ? "더라운드 제안" : modalType === 'story' ? "스토리 공유 요청" : "설문조사 의뢰"}
              </h3>
              <form onSubmit={handleSubmit} className="admin-form">
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderLeft: "3px solid var(--color-primary)", paddingLeft: "0.8rem" }}>신청자 정보</h4>
                  <div className="form-row" style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
                    <div className="form-group" style={{ flex: 1 }}><label>성함 *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required /></div>
                    <div className="form-group" style={{ flex: 1 }}><label>연락처 *</label><input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required /></div>
                  </div>
                  <div className="form-row" style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
                    <div className="form-group" style={{ flex: 1 }}><label>지역 (구/시 단위) *</label><input type="text" name="region" value={formData.region} onChange={handleInputChange} required /></div>
                    <div className="form-group" style={{ flex: 1 }}><label>소속 *</label><input type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} required /></div>
                  </div>
                  <div className="form-group"><label>이메일 주소 *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                </div>
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
