"use client";

import { useState } from "react";

export default function TalkTalk() {
  const [modalType, setModalType] = useState(null); // 'giving' | 'job' | 'volunteer' | 'proposal' | 'story' | 'survey'
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    region: "",
    affiliation: "",
    email: "",
    agreement: false,
    orgName: "",
    jobRole: "",
    volunteerArea: "",
    items: [],
    details: "",
    // Survey specialized fields
    surveyTargetCount: "",
    surveyAgeRange: "",
    surveyArrivalYear: "",
    surveyPurpose: ""
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
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      items: checked 
        ? [...prev.items, value] 
        : prev.items.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert("더라운드 회원등록 및 개인정보 활용에 동의해 주세요.");
      return;
    }
    setSubmitting(true);
    
    try {
      let message = `유형: ${modalType}\n상세내용: ${formData.details}\n지역: ${formData.region}\n소속: ${formData.affiliation}\n이메일: ${formData.email}\n회원가입동의: ${formData.agreement ? '예' : '아니오'}`;
      
      if (modalType === 'survey') {
        message += `\n[설문조사 요청 상세]\n- 목표 인원: ${formData.surveyTargetCount}\n- 연령대: ${formData.surveyAgeRange}\n- 입국 시기: ${formData.surveyArrivalYear}\n- 조사 목적: ${formData.surveyPurpose}`;
      } else if (modalType === 'giving') {
        message += `\n선택항목: ${formData.items.join(", ")}`;
      } else if (modalType === 'job') {
        message += `\n기관/회사: ${formData.orgName}\n채용분야: ${formData.jobRole}`;
      } else if (modalType === 'volunteer') {
        message += `\n봉사분야: ${formData.volunteerArea}`;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: `[TalkTalk] ${modalType.toUpperCase()} 신청`,
          message: message
        })
      });

      if (res.ok) {
        alert("정상적으로 접수되었습니다. 확인 후 담당자가 연락드리겠습니다.");
        closeModal();
      } else {
        alert("전송 중 오류가 발생했습니다.");
      }
    } catch (err) {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "1.5rem", 
          marginTop: "4rem" 
        }}>
          {/* Main Action Cards */}
          <div className="talk-card reveal-on-scroll" style={{ background: "var(--color-bg-secondary)", padding: "2rem", borderRadius: "24px", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "var(--shadow-md)" }}>
            <div>
              <div style={{ color: "var(--color-primary)", marginBottom: "1rem" }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
              <h3 style={{ marginBottom: "0.8rem", fontSize: "1.4rem" }}>나눔 요청하기</h3>
              <p style={{ marginBottom: "1.5rem", color: "var(--color-text-muted)", fontSize: "0.95rem" }}>물품, 화장품, 의류 등 소중한 마음을 나누고 싶은 분들의 신청을 기다립니다.</p>
            </div>
            <button onClick={() => openModal('giving')} className="btn btn-primary btn-block">나눔 신청하기</button>
          </div>

          <div className="talk-card reveal-on-scroll delay-100" style={{ background: "var(--color-bg-secondary)", padding: "2rem", borderRadius: "24px", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "var(--shadow-md)" }}>
            <div>
              <div style={{ color: "var(--color-primary)", marginBottom: "1rem" }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></div>
              <h3 style={{ marginBottom: "0.8rem", fontSize: "1.4rem" }}>구인 요청하기</h3>
              <p style={{ marginBottom: "1.5rem", color: "var(--color-text-muted)", fontSize: "0.95rem" }}>한반도의 미래를 함께 만들어갈 인재를 찾으시는 기관 및 기업의 요청을 받습니다.</p>
            </div>
            <button onClick={() => openModal('job')} className="btn btn-primary btn-block">구인 요청하기</button>
          </div>

          <div className="talk-card reveal-on-scroll delay-200" style={{ background: "var(--color-bg-secondary)", padding: "2rem", borderRadius: "24px", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "var(--shadow-md)" }}>
            <div>
              <div style={{ color: "var(--color-primary)", marginBottom: "1rem" }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
              <h3 style={{ marginBottom: "0.8rem", fontSize: "1.4rem" }}>설문조사 의뢰</h3>
              <p style={{ marginBottom: "1.5rem", color: "var(--color-text-muted)", fontSize: "0.95rem" }}>학술 연구 및 정책 제안을 위한 설문조사 대상자 모집 및 분석 지원을 의뢰하세요.</p>
            </div>
            <button onClick={() => openModal('survey')} className="btn btn-primary btn-block">조사 의뢰하기</button>
          </div>
        </div>

        {/* Small Menu Items */}
        <div className="talktalk-sub-menu reveal-on-scroll delay-300" style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "3rem", flexWrap: "wrap", padding: "1.5rem", background: "rgba(0,0,0,0.02)", borderRadius: "100px" }}>
          <button onClick={() => openModal('volunteer')} style={{ background: "none", border: "none", color: "var(--color-text-muted)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>자원봉사 신청하기</button>
          <span style={{ color: "#ccc" }}>|</span>
          <button onClick={() => openModal('proposal')} style={{ background: "none", border: "none", color: "var(--color-text-muted)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>더라운드 제안하기</button>
          <span style={{ color: "#ccc" }}>|</span>
          <button onClick={() => openModal('story')} style={{ background: "none", border: "none", color: "var(--color-text-muted)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>나의 스토리 공유</button>
        </div>
      </div>

      {/* TalkTalk Modals */}
      {modalType && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container" style={{ maxWidth: "600px", width: "95%", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px" }}>
            <button className="modal-close" onClick={closeDetail}>&times;</button>
            <div className="modal-body" style={{ padding: "2.5rem" }}>
              <h3 style={{ marginBottom: "1.5rem", color: "var(--color-primary)", fontSize: "1.6rem", fontWeight: 800 }}>
                {modalType === 'giving' && "나눔하기 신청"}
                {modalType === 'job' && "구인요청 신청"}
                {modalType === 'volunteer' && "자원봉사 신청"}
                {modalType === 'proposal' && "더라운드 제안"}
                {modalType === 'story' && "스토리 공유 요청"}
                {modalType === 'survey' && "설문조사 의뢰"}
              </h3>
              
              <form onSubmit={handleSubmit} className="admin-form">
                {/* 1. 기본 인적사항 (공통) */}
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>신청자 기본 정보</h4>
                  <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>성함 *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="성함" required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>연락처 *</label>
                      <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="연락처" required />
                    </div>
                  </div>
                  <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>지역 (구/시 단위) *</label>
                      <input type="text" name="region" value={formData.region} onChange={handleInputChange} placeholder="예: 서울 금천구" required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>소속 *</label>
                      <input type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} placeholder="직장/학교/기관" required />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>이메일 주소 *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" required />
                  </div>
                </div>

                {/* 2. 유형별 상세 정보 */}
                {modalType === 'survey' && (
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>의뢰 상세 사항</h4>
                    <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>목표 인원수 *</label>
                        <input type="text" name="surveyTargetCount" value={formData.surveyTargetCount} onChange={handleInputChange} placeholder="예: 50명" required />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>대상 연령대 *</label>
                        <input type="text" name="surveyAgeRange" value={formData.surveyAgeRange} onChange={handleInputChange} placeholder="예: 20-30대" required />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: "1rem" }}>
                      <label>입국 연도 조건 (필요 시)</label>
                      <input type="text" name="surveyArrivalYear" value={formData.surveyArrivalYear} onChange={handleInputChange} placeholder="예: 2010년 이후 입국자 중심" />
                    </div>
                    <div className="form-group" style={{ marginBottom: "1rem" }}>
                      <label>조사 목적/제목 *</label>
                      <input type="text" name="surveyPurpose" value={formData.surveyPurpose} onChange={handleInputChange} placeholder="연구 또는 조사 제목" required />
                    </div>
                  </div>
                )}

                {modalType === 'giving' && (
                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.8rem", fontWeight: 700 }}>나눔 품목 선택 *</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                      {["생활용품", "화장품", "의류", "도서", "전자제품", "기타"].map(item => (
                        <label key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
                          <input type="checkbox" value={item} onChange={handleCheckboxChange} />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {modalType === 'job' && (
                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>회사 / 기관명 및 채용직무 *</label>
                    <input type="text" name="jobRole" value={formData.jobRole} onChange={handleInputChange} placeholder="예: (주)더라운드 / 사무직" required style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--color-border)" }} />
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>상세 요청 내용</label>
                  <textarea name="details" value={formData.details} onChange={handleInputChange} placeholder="기타 세부 사항을 적어주세요." rows="3" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--color-border)" }} />
                </div>

                {/* 3. 회원가입 및 약관 동의 */}
                <div style={{ background: "#f8fafc", padding: "1.2rem", borderRadius: "16px", marginBottom: "2rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", cursor: "pointer" }}>
                    <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} style={{ marginTop: "0.3rem" }} required />
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
