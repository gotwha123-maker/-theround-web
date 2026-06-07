"use client";

import { useState } from "react";

export default function TalkTalk() {
  const [modalType, setModalType] = useState(null); // null | 'giving' | 'job' | 'volunteer' | 'proposal' | 'story'
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
    details: ""
  });

  const openModal = (type) => {
    setModalType(type);
    setFormData({ 
      name: "", contact: "", region: "", affiliation: "", email: "", agreement: false,
      orgName: "", jobRole: "", volunteerArea: "", items: [], details: "" 
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
      console.log("Submitting TalkTalk Form:", modalType, formData);
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: `[TalkTalk] ${modalType.toUpperCase()} 신청`,
          message: `유형: ${modalType}\n상세내용: ${formData.details}\n지역: ${formData.region}\n소속: ${formData.affiliation}\n이메일: ${formData.email}\n선택항목: ${formData.items.join(", ")}\n기관/회사: ${formData.orgName}\n역할: ${formData.jobRole}\n봉사분야: ${formData.volunteerArea}\n회원가입동의: ${formData.agreement ? '예' : '아니오'}`
        })
      });

      if (res.ok) {
        alert("신청이 정상적으로 접수되었습니다. 확인 후 담당자가 연락드리겠습니다.");
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
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2rem", 
          marginTop: "4rem" 
        }}>
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
            <button onClick={() => openModal('proposal')} className="btn btn-outline btn-block">제안 요청하기</button>
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
            <button onClick={() => openModal('story')} className="btn btn-outline btn-block">스토리 공유 요청</button>
          </div>
        </div>

        <div className="talktalk-sub-menu reveal-on-scroll delay-200" style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "1.5rem", 
          marginTop: "3rem",
          flexWrap: "wrap"
        }}>
          <button onClick={() => openModal('giving')} style={{ padding: "0.8rem 1.5rem", background: "rgba(13, 148, 136, 0.05)", borderRadius: "50px", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", border: "1px solid rgba(13, 148, 136, 0.1)", cursor: "pointer" }}>
            나눔하기
          </button>
          <button onClick={() => openModal('job')} style={{ padding: "0.8rem 1.5rem", background: "rgba(13, 148, 136, 0.05)", borderRadius: "50px", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", border: "1px solid rgba(13, 148, 136, 0.1)", cursor: "pointer" }}>
            구인요청
          </button>
          <button onClick={() => openModal('volunteer')} style={{ padding: "0.8rem 1.5rem", background: "rgba(13, 148, 136, 0.05)", borderRadius: "50px", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", border: "1px solid rgba(13, 148, 136, 0.1)", cursor: "pointer" }}>
            자원봉사 신청하기
          </button>
        </div>
      </div>

      {modalType && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container" style={{ maxWidth: "600px", width: "95%", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px" }}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-body" style={{ padding: "2.5rem" }}>
              <h3 style={{ marginBottom: "1.5rem", color: "var(--color-primary)", fontSize: "1.5rem", fontWeight: 800 }}>
                {modalType === 'giving' && "나눔하기 신청"}
                {modalType === 'job' && "구인요청 신청"}
                {modalType === 'volunteer' && "자원봉사 신청"}
                {modalType === 'proposal' && "더라운드 제안"}
                {modalType === 'story' && "스토리 공유 요청"}
              </h3>
              
              <form onSubmit={handleSubmit} className="admin-form">
                {/* 1. 개인 인적사항 */}
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1rem", color: "var(--color-text-primary)", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>신청자 정보</h4>
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
                      <input type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} placeholder="직장/학교 등" required />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>이메일 주소 *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" required />
                  </div>
                </div>

                {/* 2. 각 유형별 추가 정보 */}
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
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>채용 상세 (분야/조건)</label>
                    <input type="text" name="jobRole" value={formData.jobRole} onChange={handleInputChange} placeholder="예: 사무직, 매장관리 등" />
                  </div>
                )}

                {modalType === 'volunteer' && (
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>관심 봉사 분야</label>
                    <select name="volunteerArea" value={formData.volunteerArea} onChange={handleInputChange} style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "white" }}>
                      <option value="">분야를 선택하세요</option>
                      <option value="행사 운영 지원">행사 운영 지원</option>
                      <option value="디자인/영상">디자인/영상</option>
                      <option value="교육/멘토링">멘토링</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>상세 내용</label>
                  <textarea name="details" value={formData.details} onChange={handleInputChange} placeholder="추가적인 요청이나 상세 내용을 적어주세요." rows="3" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--color-border)" }} />
                </div>

                {/* 3. 회원가입 및 약관 동의 */}
                <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "12px", marginBottom: "2rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                    <input 
                      type="checkbox" 
                      name="agreement" 
                      checked={formData.agreement} 
                      onChange={handleInputChange} 
                      style={{ marginTop: "0.3rem" }} 
                      required
                    />
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.5" }}>
                      <strong>더라운드 회원등록 및 개인정보 활용 동의 *</strong><br />
                      보내주신 정보는 더라운드 커뮤니티 회원 관리 및 뉴스레터 발송, 활동 안내를 위해 사용됩니다.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                  {submitting ? "처리 중..." : "신청 완료하기"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
