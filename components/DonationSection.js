"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function DonationSection() {
  const [supportType, setSupportType] = useState("regular"); // regular | once
  const [selectedAmount, setSelectedAmount] = useState("10000"); // preset | custom
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("1005504626666");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getImpactMessage = () => {
    const amount = selectedAmount === "custom" ? Number(customAmount) : Number(selectedAmount);
    if (!amount || amount <= 0) return "더라운드의 든든한 동반자가 되어 주세요.";
    
    if (amount <= 10000) {
      return (
        <span>
          매월 <strong>{amount.toLocaleString()}원</strong>의 후원은 새로운 시작을 준비하는 분들에게 월 1회 도서 및 정서 멘토링을 연계하는 데 사용됩니다.
        </span>
      );
    } else if (amount <= 30000) {
      return (
        <span>
          매월 <strong>{amount.toLocaleString()}원</strong>의 후원은 구성원들에게 역량 개발 교육 기재 및 직무 멘토링 매칭 비용으로 적립됩니다.
        </span>
      );
    } else if (amount <= 50000) {
      return (
        <span>
          매월 <strong>{amount.toLocaleString()}원</strong>의 후원은 스포츠 유대 UniOne FC단 2명의 연간 훈련 및 유니폼 대여 비용을 완벽 지원할 수 있습니다.
        </span>
      );
    } else {
      return (
        <span>
          매월 <strong>{amount.toLocaleString()}원</strong>의 따뜻한 나눔은 더라운드가 다채로운 남북 통합 프로젝트를 자립적으로 실현할 수 있는 견고한 초석이 됩니다.
        </span>
      );
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace("donor-", "")]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const finalAmount = selectedAmount === "custom" ? customAmount : selectedAmount;
    
    const params = {
      donor_name: formData.name,
      donor_email: formData.email,
      amount: finalAmount,
      type: supportType === "regular" ? "정기후원" : "일시후원"
    };

    try {
      // TODO: Replace with actual Service ID and Template ID from EmailJS
      await emailjs.send(
        "YOUR_SERVICE_ID", 
        "YOUR_DONATION_TEMPLATE_ID", 
        params, 
        "YOUR_PUBLIC_KEY"
      );

      alert(`${formData.name}님, 더라운드의 소중한 동행자가 되어주셔서 진심으로 감사드립니다! 입력하신 이메일로 곧 디지털 감사장을 전송해 드리겠습니다.`);
      setFormData({ name: "", email: "" });
      setCustomAmount("");
    } catch (err) {
      console.error('EmailJS Error:', err);
      // Fallback for demo
      alert("후원 신청이 접수되었습니다. (데모 모드)");
      console.log('Donation Data:', params);
      setFormData({ name: "", email: "" });
      setCustomAmount("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="donation" className="section donation-section">
      <div className="donation-mesh-bg" style={{ opacity: 0.05 }}></div>
      <div className="container">
        <div className="donation-layout">
          <div className="donation-text reveal-on-scroll">
            <span className="section-subtitle highlight-text">MAKE A DIFFERENCE</span>
            <h2>
              한반도의 내일을 함께 만드는<br />가장 따뜻한 동행
            </h2>
            <p className="donation-desc" style={{ color: "var(--color-text-muted)" }}>
              여러분의 소중한 동참은 우리 사회의 구성원들이 더라운드의 실천적 무대에서 주체적인 전문가와 리더로 일어설 수 있도록 하는 데 전액 사용됩니다.
              단순 수혜가 아닌, 대등한 구성원으로서 함께 한반도의 내일을 열어가도록 따뜻한 동반자가 되어주세요.
            </p>

            {/* 계좌 안내 카드 (강조 및 복사 기능 포함) */}
            <div 
              style={{
                marginTop: "2rem",
                padding: "1.8rem",
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(220, 20, 20, 0.05) 100%)",
                border: "1.5px solid rgba(99, 102, 241, 0.25)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-primary)", letterSpacing: "0.05em" }}>
                  직접 계좌 이체 후원
                </span>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  style={{
                    backgroundColor: copied ? "var(--color-primary)" : "white",
                    color: copied ? "white" : "var(--color-primary)",
                    border: "1px solid var(--color-primary)",
                    borderRadius: "30px",
                    padding: "0.35rem 0.9rem",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                  }}
                >
                  {copied ? "✓ 복사되었습니다" : "📋 계좌번호 복사"}
                </button>
              </div>

              <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "-0.01em", margin: "0.4rem 0" }}>
                우리은행 1005-504-626666
              </div>

              <div style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", fontWeight: 600 }}>
                예금주: <strong style={{ color: "var(--color-text-primary)" }}>더라운드</strong>
              </div>
            </div>

            <div className="donation-benefits" style={{ marginTop: "2rem" }}>
              <div className="benefit-item">
                <span className="benefit-icon" style={{ color: "var(--color-primary)", fontWeight: "bold", marginRight: "0.5rem" }}>&#10003;</span>
                <div>
                  <h4 style={{ color: "var(--color-text-primary)" }}>기부금 영수증 발급 안내</h4>
                  <p style={{ color: "var(--color-text-muted)" }}>
                    현재 지정기부금 단체 신청을 준비 중이며, 발급이 가능해지는 시점에 맞춰 홈페이지를 통해 별도로 안내해 드릴 예정입니다. (약 1년 이상 소요 예상)
                  </p>
                </div>
              </div>
              <div className="benefit-item" style={{ marginTop: "1.5rem" }}>
                <span className="benefit-icon" style={{ color: "var(--color-primary)", fontWeight: "bold", marginRight: "0.5rem" }}>&#10003;</span>
                <div>
                  <h4 style={{ color: "var(--color-text-primary)" }}>투명한 재정 보고서 발행</h4>
                  <p style={{ color: "var(--color-text-muted)" }}>연 1회 연간 활동 및 재정 보고서를 우편과 메일로 투명하게 공개합니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="donation-widget-card reveal-on-scroll delay-100">
            <div className="widget-header">
              <button 
                className={`tab-btn ${supportType === "regular" ? "active" : ""}`}
                onClick={() => setSupportType("regular")}
              >
                정기후원
              </button>
              <button 
                className={`tab-btn ${supportType === "once" ? "active" : ""}`}
                onClick={() => setSupportType("once")}
              >
                일시후원
              </button>
            </div>
            <div className="widget-body">
              <p className="widget-label">후원 금액 선택</p>
              <div className="amount-presets">
                {["10000", "30000", "50000", "100000"].map((preset) => (
                  <button
                    key={preset}
                    className={`amount-btn ${selectedAmount === preset ? "active" : ""}`}
                    onClick={() => {
                      setSelectedAmount(preset);
                      setCustomAmount("");
                    }}
                  >
                    {(Number(preset) / 10000)}만원
                  </button>
                ))}
                <button
                  className={`amount-btn ${selectedAmount === "custom" ? "active" : ""}`}
                  onClick={() => setSelectedAmount("custom")}
                >
                  직접입력
                </button>
              </div>

              {selectedAmount === "custom" && (
                <div className="custom-amount-input-wrapper" id="custom-amount-wrapper">
                  <input
                    type="number"
                    id="custom-amount"
                    placeholder="금액을 입력하세요"
                    min="1000"
                    step="5000"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                  <span className="currency">원</span>
                </div>
              )}

              <div 
                className="impact-message-box" 
                id="impact-message" 
                style={{ color: "var(--color-text-primary)", minHeight: "50px", marginTop: "1rem" }}
              >
                {getImpactMessage()}
              </div>

              <form className="donation-form" id="donation-submit-form" onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <input
                    type="text"
                    id="donor-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="후원자명(또는 단체명)"
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <input
                    type="email"
                    id="donor-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="이메일 주소"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block btn-lg" 
                  id="donate-submit-btn"
                  disabled={submitting}
                >
                  {submitting ? "후원 신청서 처리 중..." : "더라운드 후원 신청하기"}
                </button>
              </form>
              <div style={{ marginTop: "1.8rem", textAlign: "center", paddingTop: "1.2rem", borderTop: "1px dashed var(--color-border)", fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.5" }}>
                직접 계좌 이체 후원:<br />
                <strong style={{ color: "var(--color-text-primary)", fontSize: "1.05rem" }}>우리은행 1005-504-626666</strong><br />
                <span style={{ fontSize: "0.85rem" }}>(예금주: 더라운드)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
