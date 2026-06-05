"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace("contact-", "")]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacyAgree) {
      alert("개인정보 수집 및 이용에 동의하셔야 신청이 가능합니다.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("1:1 문의 발송이 완료되었습니다! 확인 후 신속히 응대해 드리겠습니다.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setPrivacyAgree(false);
      } else {
        alert("전송 중 일시적인 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error(err);
      alert("네트워크 통신 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">LOCATION & GET IN TOUCH</span>
          <h2>찾아오시는 길 & 1:1 문의</h2>
          <p className="section-lead">더라운드는 여러분의 목소리에 항상 귀 기울이고 있습니다. 궁금한 점이 있다면 언제든 문의해 주세요.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal-on-scroll">
            <h3>Contact Information</h3>
            <p className="contact-intro">방문 상담은 사전 예약을 통해 진행됩니다. 아래 연락처를 통해 일정을 조율해 주세요.</p>
            
            <ul className="contact-details-list" style={{ listStyle: "none", padding: 0 }}>
              <li style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="icon-wrap" style={{ color: "var(--color-primary)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <strong>본부 주소</strong>
                  <p>경기도 광명시 철산로 57 (7호선 철산역 인근)</p>
                </div>
              </li>
              <li style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="icon-wrap" style={{ color: "var(--color-primary)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.7 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <strong>대표 전화</strong>
                  <p>02-866-6296 (평일 09:00 - 18:00)</p>
                </div>
              </li>
              <li style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="icon-wrap" style={{ color: "var(--color-primary)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <strong>이메일 문의</strong>
                  <p>theround2030@naver.com</p>
                </div>
              </li>
            </ul>

            <div className="map-placeholder">
              <div className="map-art">
                <div className="map-pin"></div>
                <div className="pulse-ring"></div>
              </div>
              <span className="map-caption">더라운드 광명 본부 위치 안내</span>
            </div>
          </div>

          <div className="contact-form-card reveal-on-scroll delay-100">
            <h3>1:1 문의하기</h3>
            <form id="contact-submit-form" className="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="contact-name">성명 / 단체명 <span className="required" style={{ color: "var(--color-primary)" }}>*</span></label>
                  <input
                    type="text"
                    id="contact-name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="성명을 입력하세요"
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="contact-email">이메일 주소 <span className="required" style={{ color: "var(--color-primary)" }}>*</span></label>
                  <input
                    type="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="contact-subject">문의 유형 <span className="required" style={{ color: "var(--color-primary)" }}>*</span></label>
                <select id="contact-subject" value={formData.subject} onChange={handleChange} required>
                  <option value="">유형을 선택해 주세요</option>
                  <option value="강연/교육 문의">강연 및 교육 프로그램 문의</option>
                  <option value="협력/파트너십">협력 및 파트너십 제안</option>
                  <option value="후원 관련">후원 관련 문의</option>
                  <option value="기타 문의">기타 일반 문의</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="contact-message">상세 내용 <span className="required" style={{ color: "var(--color-primary)" }}>*</span></label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="궁금하신 내용을 자세히 적어주세요."
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="form-privacy" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  id="privacy-check"
                  checked={privacyAgree}
                  onChange={(e) => setPrivacyAgree(e.target.checked)}
                  required
                />
                <label htmlFor="privacy-check" style={{ fontSize: "0.85rem", cursor: "pointer" }}>
                  개인정보 수집 및 이용에 동의합니다. <span className="required" style={{ color: "var(--color-primary)" }}>*</span>
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>
                {submitting ? "문의 전송 중..." : "문의하기 발송"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
