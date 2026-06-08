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
    <section id="talktalk" className="talktalk-section">
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

        {/* Main Big Cards (Top Row) */}
        <div className="talktalk-grid">
          {[
            { 
              id: 'giving', 
              badge: '따뜻한 연대',
              title: '나눔 요청하기', 
              desc: '물품, 화장품, 의류 등 소중한 마음을 나누고 싶은 분들의 신청을 기다립니다.', 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
              className: 'card-giving'
            },
            { 
              id: 'job', 
              badge: '자립의 기반',
              title: '탈북민 구인요청', 
              desc: '한반도의 미래를 함께 만들어갈 인재를 찾으시는 기관 및 기업의 요청을 받습니다.', 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              ),
              className: 'card-job'
            },
            { 
              id: 'survey', 
              badge: '학술·정책 연구',
              title: '설문조사 의뢰하기', 
              desc: '학술 연구 및 정책 제안을 위한 설문조사 대상자 모집 및 분석 지원을 의뢰하세요.', 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              ),
              className: 'card-survey'
            }
          ].map((item) => (
            <div key={item.id} className={`talk-card ${item.className} reveal-on-scroll`}>
              <div style={{ width: "100%" }}>
                <span className="talk-badge">{item.badge}</span>
                <div className="talk-icon-wrapper">{item.icon}</div>
                <h3 className="talk-card-title">{item.title}</h3>
                <p className="talk-card-desc">{item.desc}</p>
              </div>
              <button onClick={() => openModal(item.id)} className="talk-card-btn">
                신청 완료하기 &rarr;
              </button>
            </div>
          ))}
        </div>

        {/* Small Action Menu (Bottom Row - High Visibility Pills) */}
        <div className="talktalk-sub-bar reveal-on-scroll delay-300">
          {[
            { 
              id: 'volunteer', 
              label: '자원봉사 신청하기',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )
            },
            { 
              id: 'proposal', 
              label: '더라운드 제안하기',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              )
            },
            { 
              id: 'story', 
              label: '나의 스토리 공유',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              )
            }
          ].map((action) => (
            <button 
              key={action.id}
              onClick={() => openModal(action.id)}
              className="btn-sub-action"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {modalType && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container" style={{ maxWidth: "600px", width: "95%", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px" }}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-body" style={{ padding: "2.5rem" }}>
              <h3 style={{ marginBottom: "1.5rem", color: "var(--color-primary)", fontSize: "1.6rem", fontWeight: 800 }}>
                {modalType === 'giving' ? "나눔하기 신청" : modalType === 'job' ? "구인요청 신청" : modalType === 'volunteer' ? "자원봉사 신청" : modalType === 'proposal' ? "더라운드 제안" : modalType === 'story' ? "스토리 공유 요청" : "설문조사 의뢰"}
              </h3>
              <form onSubmit={handleSubmit} className="admin-form">
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>신청자 기본 정보</h4>
                  <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>성함 *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>연락처 *</label>
                      <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>지역 (구/시 단위) *</label>
                      <input type="text" name="region" value={formData.region} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>소속 *</label>
                      <input type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="form-group"><label>이메일 주소 *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                </div>
                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontWeight: 700 }}>상세 내용</label>
                  <textarea name="details" value={formData.details} onChange={handleInputChange} rows="3" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--color-border)" }} />
                </div>
                <div style={{ background: "#f8fafc", padding: "1.2rem", borderRadius: "16px", marginBottom: "2rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", cursor: "pointer" }}>
                    <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} required />
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                      <strong>더라운드 회원등록 및 개인정보 활용 동의 *</strong><br />
                      보내주신 정보는 더라운드 네트워크 관리 및 뉴스레터 발송, 활동 안내를 위해 소중하게 사용됩니다.
                    </span>
                  </label>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>
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
