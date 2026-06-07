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
    <section id="talktalk" className="section talktalk-section">
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">TALK TALK</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1.2rem" }}>
            톡톡(TalkTalk): 이야기가 이어지는 공간
          </h2>
          <p className="section-lead" style={{ fontSize: "1.1rem", color: "var(--color-text-primary)", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
            (스토리는 사람을 연결합니다, 연결은 공감을 만들고, 공감은 한반도의 미래를 바꿉니다)
          </p>
        </div>

        <div className="talktalk-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2rem", 
          marginTop: "4rem" 
        }}>
          {/* Main Actions */}
          <div className="talk-card reveal-on-scroll" style={{ background: "var(--color-bg-secondary)", padding: "2.5rem", borderRadius: "24px", border: "1.5px solid var(--color-primary)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ marginBottom: "1rem", color: "var(--color-primary)", fontWeight: 900 }}>나눔 요청하기</h3>
              <p style={{ marginBottom: "2rem", color: "var(--color-text-primary)" }}>물품, 화장품, 의류 등 소중한 마음을 나누고 싶은 분들의 신청을 기다립니다.</p>
            </div>
            <button onClick={() => openModal('giving')} className="btn btn-primary btn-block">지금 신청하기</button>
          </div>

          <div className="talk-card reveal-on-scroll delay-100" style={{ background: "var(--color-bg-secondary)", padding: "2.5rem", borderRadius: "24px", border: "1.5px solid var(--color-primary)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ marginBottom: "1rem", color: "var(--color-primary)", fontWeight: 900 }}>탈북민 구인요청</h3>
              <p style={{ marginBottom: "2rem", color: "var(--color-text-primary)" }}>한반도의 미래를 함께 만들어갈 인재를 찾으시는 기관 및 기업의 요청을 받습니다.</p>
            </div>
            <button onClick={() => openModal('job')} className="btn btn-primary btn-block">지금 신청하기</button>
          </div>

          <div className="talk-card reveal-on-scroll delay-200" style={{ background: "var(--color-bg-secondary)", padding: "2.5rem", borderRadius: "24px", border: "1.5px solid var(--color-primary)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ marginBottom: "1rem", color: "var(--color-primary)", fontWeight: 900 }}>설문조사 의뢰하기</h3>
              <p style={{ marginBottom: "2rem", color: "var(--color-text-primary)" }}>학술 연구 및 정책 제안을 위한 설문조사 대상자 모집 및 분석 지원을 의뢰하세요.</p>
            </div>
            <button onClick={() => openModal('survey')} className="btn btn-primary btn-block">지금 신청하기</button>
          </div>
        </div>

        {/* Small Menu Items */}
        <div className="talktalk-sub-menu reveal-on-scroll delay-300" style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "3.5rem", flexWrap: "wrap", padding: "1.5rem", borderTop: "2px solid var(--color-primary)" }}>
          <button onClick={() => openModal('volunteer')} style={{ background: "none", border: "none", color: "var(--color-primary)", fontWeight: 900, fontSize: "1.1rem", cursor: "pointer", textDecoration: "underline" }}>자원봉사 신청하기</button>
          <button onClick={() => openModal('proposal')} style={{ background: "none", border: "none", color: "var(--color-primary)", fontWeight: 900, fontSize: "1.1rem", cursor: "pointer", textDecoration: "underline" }}>더라운드 제안하기</button>
          <button onClick={() => openModal('story')} style={{ background: "none", border: "none", color: "var(--color-primary)", fontWeight: 900, fontSize: "1.1rem", cursor: "pointer", textDecoration: "underline" }}>나의 스토리 공유</button>
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
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>이메일 주소 *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                </div>

                {modalType === 'survey' && (
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>의뢰 상세 사항</h4>
                    <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                      <div className="form-group" style={{ flex: 1 }}><label>목표 인원수 *</label><input type="text" name="surveyTargetCount" value={formData.surveyTargetCount} onChange={handleInputChange} required /></div>
                      <div className="form-group" style={{ flex: 1 }}><label>대상 연령대 *</label><input type="text" name="surveyAgeRange" value={formData.surveyAgeRange} onChange={handleInputChange} required /></div>
                    </div>
                    <div className="form-group" style={{ marginBottom: "1rem" }}><label>조사 제목/목적 *</label><input type="text" name="surveyPurpose" value={formData.surveyPurpose} onChange={handleInputChange} required /></div>
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>상세 내용</label>
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
