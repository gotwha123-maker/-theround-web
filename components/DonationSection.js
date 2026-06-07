"use client";

import { useState } from "react";

export default function DonationSection() {
  const [supportType, setSupportType] = useState("regular"); // regular | once
  const [selectedAmount, setSelectedAmount] = useState("10000"); // preset | custom
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const getImpactMessage = () => {
    const amount = selectedAmount === "custom" ? Number(customAmount) : Number(selectedAmount);
    if (!amount || amount <= 0) return "더라운드의 든든한 동반자가 되어 주세요.";
    
    if (amount <= 10000) {
      return (
        <span>
          매월 <strong>{amount.toLocaleString()}원</strong>의 후원은 새로운 시작을 준비하는 이웃 1명에게 월 1회 기초 도서 및 정서 멘토링을 연계해 줄 수 있습니다.
        </span>
      );
    } else if (amount <= 30000) {
      return (
        <span>
          매월 <strong>{amount.toLocaleString()}원</strong>의 후원은 2명의 선구자에게 역량 개발 아카데미 교육 기재 및 직무 멘토링 매칭 비용으로 적립됩니다.
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
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: formData.name,
          donorEmail: formData.email,
          amount: finalAmount,
          type: supportType === "regular" ? "정기후원" : "일시후원"
        })
      });
      if (res.ok) {
        alert(`${formData.name}님, 더라운드의 소중한 동행자가 되어주셔서 진심으로 감사드립니다! 입력하신 이메일로 곧 디지털 감사장을 전송해 드리겠습니다.`);
        setFormData({ name: "", email: "" });
        setCustomAmount("");
      } else {
        alert("후원 신청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error(err);
      alert("네트워크 통신 중 오류가 발생했습니다.");
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
              여러분의 소중한 동참은 탈북민 이웃들이 더라운드의 실천적 무대에서 주체적인 전문가와 리더로 일어설 수 있도록 하는 데 전액 사용됩니다.
              단순 수혜가 아닌, 대등한 구성원으로서 함께 한반도의 내일을 열어가도록 따뜻한 동반자가 되어주세요.
            </p>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
