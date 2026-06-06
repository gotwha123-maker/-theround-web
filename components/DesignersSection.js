"use client";

import { useState, useEffect } from "react";

const mockDesigners = [
  {
    id: "des-0",
    img: "assets/김은주.jpg",
    ko: { name: "김은주", tag: "작가·인권활동가", slogan: '"열한 살의 유서에서 전 세계를 울린 희망의 작가로"', specialty: "북한 인권 실상 증언 / 글로벌 인권 소통 / 회고록 집필", bio: "김은주 작가는 1986년 북한 함경북도에서 태어나 고난의 행군 시기 극심한 기아를 겪었습니다. 11살의 나이에 굶주림 속에서 썼던 유서의 기억을 담은 회고록 《열한 살의 유서》(A Thousand Miles to Freedom)를 통해 전 세계에 북한의 실상을 알렸습니다. 현재는 국제 무대에서 북한 주민들의 자유와 인권을 위해 목소리를 내고 있습니다.", career: "• 서강대학교 중국문화학과 졸업\n• 회고록 《열한 살의 유서》 8개 국어 번역 및 베스트셀러 달성\n• 통일부 북한인권증진위원\n• 북한이탈주민 글로벌교육센터(FSI) 간사\n• 유엔(UN) 본부 및 제네바 인권이사회 증언\n• 다큐멘터리 《비욘드 유토피아》 출연" }
  },
  {
    id: "des-1",
    img: "assets/이영현.jpg",
    ko: { name: "이영현", tag: "변호사·인권가", slogan: '"법률의 시선으로 남북의 마음을 잇는 변호사"', specialty: "탈북민 법률 자문 / 북한 인권 정책", bio: "대한민국 1호 탈북민 변호사로서 법률적 전문성을 바탕으로 우리 사회 정착 과정의 실질적인 갈등을 해결하며, 보편적 인권과 통합의 가치를 새롭게 디자인합니다.", career: "• 법무법인 이래 파트너 변호사\n• 대한변협 인권재단 사무총장\n• KIS(Korea Internet Studio) 대표\n• 제8회 변호사시험 합격 / 연세대 법대 졸" }
  },
  {
    id: "des-2",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
    ko: { name: "정유나", tag: "방송인·유튜버", slogan: '"북한의 진실을 세계에 전하는 글로벌 디자이너"', specialty: "북한 실상 증언 / 글로벌 인권 소통", bio: "뛰어난 영어 실력과 대중적인 입담을 겸비한 인권 활동가로, 다양한 미디어를 통해 북한의 실상을 알리고 남북한 사이의 편견을 해소하는 활동을 합니다.", career: "• 유튜브 \"정유나 TV\" 운영 (구독자 30만+)\n• 채널A \"이제 만나러 갑니다\" 고정 출연\n• 투자자 짐 로저스 방한 전담 통역\n• 북한 인권 운동 및 국제 강연 다수" }
  },
  {
    id: "des-3",
    img: "assets/김아라.jpg",
    ko: { name: "김아라", tag: "배우·방송인", slogan: '"예술을 통해 남북의 거리를 좁히는 화합의 아이콘"', specialty: "남북 문화 예술 / 미디어 속 북한 이미지", bio: "영화와 드라마를 넘나드는 배우로서, 문화 예술 콘텐츠가 가진 정서적 힘을 활용해 남북한 주민들이 서로를 따뜻하게 이해하도록 돕습니다.", career: "• 드라마 \"사랑의 불시착\" 출연 (사택 마을 주민)\n• 웹드라마 \"아는 사람\" 여주인공 역\n• 채널A \"이제 만나러 갑니다\" 메인 출연\n• 남북 문화 예술 교류 홍보대사 활동" }
  },
  {
    id: "des-4",
    img: "assets/박유성.jpg",
    ko: { name: "박유성", tag: "감독·유튜버", slogan: '"미디어의 프레임을 넘어 새로운 북한을 그리는 감독"', specialty: "영상 서사 분석 / 미디어 편견 해소", bio: "영화를 전공한 전문가의 시각으로 북한을 재해석하며, 자극적인 이미지를 넘어 생생한 삶의 이야기를 영상과 강연으로 디자인합니다.", career: "• 유튜브 \"북한남자\" 채널 운영 및 기획\n• 다큐멘터리 영화 \"메콩강에 악어가 산다\" 감독\n• 동국대학교 영화영상학과 전공\n• 최근 사회 공헌 및 정책 참여 활동" }
  },
  {
    id: "des-5",
    img: "assets/김소연.webp",
    ko: { name: "김소연", tag: "가수·뮤지션", slogan: '"목소리로 한반도의 희망을 노래하는 뮤지션"', specialty: "정서적 통합 음악 / 고난 극복 서사", bio: "역경을 딛고 일어선 개인의 삶을 음악에 담아 전달하며, 남북한이 공통으로 느끼는 보편적 감수성을 통해 하나 됨을 이끌어냅니다.", career: "• TV조선 \"미스트롯 3\" 최종 6위\n• \"탈북 심청이\" 별명으로 트로트 가수 활동\n• MBN \"특종세상\" 등 다수 방송 출연\n• 전국 희망 콘서트 및 정착 강연 진행" }
  },
  {
    id: "des-6",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
    ko: { name: "나민희", tag: "유튜버·엘리트", slogan: '"우리가 몰랐던 진짜 평양의 일상을 전하는 디자이너"', specialty: "평양 상류층 문화 / 북한 엘리트 교육", bio: "유럽 유학 및 북한 엘리트 집안의 경험을 바탕으로, 기존의 고정관념에서 벗어난 세련되고 정확한 평양의 실상을 대중에게 전달합니다.", career: "• 유튜브 \"평양여자 나민희\" 채널 운영\n• 유럽(몰타) 유학 및 파견 근무 경험\n• 이화여자대학교 정치외교학과 재학\n• 방송 \"이제 만나러 갑니다\" 전문 패널" }
  },
  {
    id: "des-7",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000",
    ko: { name: "김강혁", tag: "방송인·활동가", slogan: '"북한의 체제 모순을 넘어 자유의 가치를 증언하는 청년"', specialty: "북한 사회 체제 분석 / 군대 실상 교육", bio: "북한 내부의 생생한 군 조직 생활과 사회 체제를 날카롭게 분석하며, 남북 청년들이 함께 가져야 할 자유와 민주주의의 가치를 강연합니다.", career: "• 채널A \"이제 만나러 갑니다\" 정규 출연\n• 북한 인권 개선 캠페인 및 활동가\n• 공공기관/학교 대상 통일 안보 강사\n• 다수의 사회 정책 포럼 발제자" }
  },
  {
    id: "des-8",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
    ko: { name: "이은평", tag: "방송인·분석가", slogan: '"핵시설 부대 출신의 눈으로 본 국제 정세 전문가"', specialty: "북한 국방 기술 / 러시아 파병 실상", bio: "북한 특수 공병 부대 근무 및 러시아 파병 경험을 토대로, 현재 급변하는 한반도 안보 상황과 국제 정세의 이면을 생생하게 해설합니다.", career: "• 북한군 131부대(핵시설 건설) 근무\n• 러시아 파병 근무 중 탈북 및 한국 입국\n• 파병 북한군 지원 캠페인 및 스피치 활동\n• 채널A \"이제 만나러 갑니다\" 출연" }
  }
];

export default function DesignersSection() {
  const [designers, setDesigners] = useState(mockDesigners);
  const [showAll, setShowAll] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientOrg: "",
    clientName: "",
    clientContact: "",
    designerName: "",
    target: "",
    topic: "",
    date: "",
    time: "",
    budget: "",
    details: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchDesigners() {
      console.log("Fetching designers...");
      try {
        const res = await fetch("/api/designers", { cache: 'no-store' });
        if (res.ok && isMounted) {
          const data = await res.json();
          console.log("Fetched designers count:", data.length);
          if (data && data.length > 0) {
            setDesigners(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch designers:", err);
      }
    }
    fetchDesigners();
    return () => { isMounted = false; };
  }, []);

  const activeDesigners = designers.filter(d => !d.isHidden);
  const visibleList = showAll ? activeDesigners : activeDesigners.slice(0, 4);

  const openDetail = (d) => {
    setSelectedDesigner(d);
    document.body.style.overflow = "hidden";
  };

  const closeDetail = () => {
    setSelectedDesigner(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleOpenBooking = () => openBooking();
    window.addEventListener('openDesignerBooking', handleOpenBooking);
    return () => window.removeEventListener('openDesignerBooking', handleOpenBooking);
  }, []);

  const openBooking = (name = "") => {
    setBookingOpen(true);
    setFormData(prev => ({ ...prev, designerName: name }));
    closeDetail();
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setBookingOpen(false);
    document.body.style.overflow = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("강연 의뢰 신청이 정상적으로 완료되었습니다! 담당자가 연락드리겠습니다.");
        setFormData({
          clientOrg: "",
          clientName: "",
          clientContact: "",
          designerName: "",
          target: "",
          topic: "",
          date: "",
          time: "",
          budget: "",
          details: ""
        });
        closeBooking();
      } else {
        alert("신청 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error(err);
      alert("네트워크 통신 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // Re-initialize animations after data is loaded
    if (designers.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".designer-card").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [visibleList]);

  return (
    <section id="designers" className="section designers-section" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">HANBANDO DESIGNERS</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            한반도의 내일을 그리는<br />
            <span className="highlight-text">한반도 디자이너 & 전문 강사</span>
          </h2>
          <p className="section-lead" style={{ fontSize: "1.15rem", color: "var(--color-text-muted)", maxWidth: "800px", margin: "0 auto" }}>
            남북의 경험을 품은 전문가들이 생생한 스토리와 깊은 통찰로 우리 사회의 편견을 해소하고 화합의 비전을 나눕니다.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="designers-grid-container" style={{ marginTop: "4rem" }}>
          {designers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
              디자이너 정보를 안전하게 불러오는 중입니다...
            </div>
          ) : (
            <div 
              className="designers-grid responsive-grid-4" 
              id="designers-grid"
            >
              {visibleList.map((d) => (
                <div 
                  className="designer-card reveal-on-scroll" 
                  key={d.id}
                  style={{ 
                    background: "var(--color-bg-secondary)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-md)",
                    border: "1px solid var(--color-border)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer"
                  }}
                  onClick={() => openDetail(d)}
                >
                  <div className="designer-img-wrapper" style={{ position: "relative", width: "100%", aspectRatio: "1/1.2", overflow: "hidden" }}>
                    <img
                      src={d.img}
                      alt={d.ko?.name || "디자이너"}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transition: "transform 0.5s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(d.ko?.name || "D")}&background=f44336&color=fff&size=512`;
                      }}
                    />
                  </div>
                  <div className="designer-info" style={{ padding: "1.5rem", textAlign: "center" }}>
                    <span className="designer-tag" style={{ 
                      display: "inline-block",
                      backgroundColor: "var(--color-primary)",
                      color: "white", 
                      fontWeight: 700, 
                      fontSize: "0.75rem",
                      padding: "0.3rem 1rem",
                      borderRadius: "4px",
                      marginBottom: "0.8rem",
                      boxShadow: "0 2px 4px rgba(220, 20, 20, 0.2)"
                    }}>
                      {d.ko?.tag}
                    </span>
                    <h3 className="designer-name" style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 0.6rem 0", color: "var(--color-text-primary)" }}>
                      {d.ko?.name}
                    </h3>
                    <p className="designer-slogan" style={{ 
                      fontSize: "0.85rem", 
                      color: "var(--color-primary)", 
                      fontWeight: "700",
                      fontStyle: "normal",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      margin: "0 auto",
                      maxWidth: "90%"
                    }}>
                      {d.ko?.slogan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center" style={{ marginTop: "3.5rem" }}>
          <button 
            className="btn" 
            style={{ 
              minWidth: "220px", 
              borderRadius: "50px", 
              fontWeight: 600,
              fontSize: "0.95rem",
              padding: "0.8rem 2.5rem",
              color: "var(--color-primary)",
              border: "1.5px solid var(--color-primary)",
              backgroundColor: "transparent",
              transition: "all 0.3s ease"
            }}
            onClick={() => setShowAll(!showAll)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
          >
            {showAll ? "간략히 보기" : "전체보기"}
          </button>
        </div>
      </div>

      {/* Designer Detail Modal */}
      {selectedDesigner && (
        <div className="modal open" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeDetail} style={{ opacity: 1, pointerEvents: 'auto' }}></div>
          <div className="modal-container" style={{ 
            maxWidth: "900px", 
            width: "95%", 
            backgroundColor: "var(--color-bg-secondary)", 
            borderRadius: "32px", 
            boxShadow: "var(--shadow-lg)",
            zIndex: 2001,
            position: "relative"
          }}>
            <button className="modal-close" onClick={closeDetail} style={{ top: "25px", right: "25px" }}>&times;</button>
            <div className="modal-body" style={{ padding: "0" }}>
              <div className="designer-detail-layout">
                {/* Left Side: Photo & Quick Info */}
                <div className="designer-detail-left">
                  <div style={{ 
                    width: "220px", 
                    height: "220px", 
                    borderRadius: "50%", 
                    overflow: "hidden", 
                    margin: "0 auto 2rem",
                    boxShadow: "var(--shadow-md)",
                    border: "6px solid white"
                  }}>
                    <img 
                      src={selectedDesigner.img} 
                      alt={selectedDesigner.ko.name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedDesigner.ko.name)}&background=f44336&color=fff&size=512`;
                      }}
                    />
                  </div>
                  <span style={{ 
                    color: "var(--color-primary)", 
                    fontWeight: 800, 
                    fontSize: "0.9rem", 
                    letterSpacing: "1px",
                    textTransform: "uppercase" 
                  }}>{selectedDesigner.ko.tag}</span>
                  <h2 style={{ fontSize: "2.4rem", fontWeight: 800, margin: "0.5rem 0", color: "var(--color-text-primary)" }}>{selectedDesigner.ko.name}</h2>
                  <p style={{ fontSize: "1.05rem", color: "var(--color-primary)", fontWeight: "700", fontStyle: "normal", marginBottom: "2rem" }}>{selectedDesigner.ko.slogan}</p>
                  
                  <div style={{ 
                    backgroundColor: "white", 
                    padding: "1.2rem", 
                    borderRadius: "16px", 
                    fontSize: "0.9rem",
                    border: "2px solid hsla(5, 75%, 48%, 0.1)",
                    textAlign: "left",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
                  }}>
                    <strong style={{ display: "block", color: "var(--color-text-primary)", marginBottom: "0.6rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>전문 분야</strong>
                    <span style={{ color: "var(--color-text-primary)", lineHeight: "1.6", fontWeight: "500" }}>{selectedDesigner.ko.specialty}</span>
                  </div>
                </div>

                {/* Right Side: Detailed Content */}
                <div className="designer-detail-right">
                  <div style={{ marginBottom: "3rem" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ width: "4px", height: "18px", backgroundColor: "var(--color-primary)", borderRadius: "2px" }}></span>
                      강사 소개
                    </h3>
                    <p style={{ fontSize: "1.05rem", color: "var(--color-text-primary)", lineHeight: "1.8", whiteSpace: "pre-line" }}>
                      {selectedDesigner.ko.bio}
                    </p>
                  </div>

                  <div style={{ marginBottom: "3.5rem" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ width: "4px", height: "18px", backgroundColor: "var(--color-primary)", borderRadius: "2px" }}></span>
                      주요 경력 및 활동
                    </h3>
                    <div style={{ 
                      fontSize: "1rem", 
                      color: "var(--color-text-muted)", 
                      lineHeight: "2", 
                      whiteSpace: "pre-line",
                      backgroundColor: "var(--color-bg-primary)",
                      padding: "1.5rem",
                      borderRadius: "16px"
                    }}>
                      {selectedDesigner.ko.career}
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary btn-block btn-lg" 
                    onClick={() => openBooking(selectedDesigner.ko.name)}
                    style={{ borderRadius: "16px", fontSize: "1.1rem" }}
                  >
                    강연 및 교육 의뢰하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {bookingOpen && (
        <div className="modal open" id="designer-booking" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="modal-overlay" onClick={closeBooking} style={{ opacity: 1, pointerEvents: 'auto' }}></div>
          <div className="modal-container" style={{ maxWidth: "650px", width: "95%", backgroundColor: "var(--color-bg-secondary)", borderRadius: "32px", maxHeight: "90vh", overflowY: "auto", position: "relative", zIndex: 2002 }}>
            <button className="modal-close" onClick={closeBooking} style={{ top: "20px", right: "20px" }}>&times;</button>
            <div className="modal-body" style={{ padding: "3.5rem" }}>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem", color: "var(--color-primary)", textAlign: "center" }}>강연 섭외 신청 (한반도 디자이너)</h3>
              
              <form onSubmit={handleSubmit} className="admin-form">
                
                {/* 1. 기본 정보 */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderBottom: "2px solid #f3f4f6", paddingBottom: "0.5rem" }}>1. 기본 정보</h4>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>기관/단체명 *</label>
                    <input type="text" name="clientOrg" value={formData.clientOrg} onChange={handleChange} placeholder="기관명을 입력하세요" required />
                  </div>
                  <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>신청자 성함 *</label>
                      <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="성함을 입력하세요" required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>연락처/이메일 *</label>
                      <input type="text" name="clientContact" value={formData.clientContact} onChange={handleChange} placeholder="연락 가능한 정보를 입력하세요" required />
                    </div>
                  </div>
                </div>

                {/* 2. 강연 상세 정보 */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderBottom: "2px solid #f3f4f6", paddingBottom: "0.5rem" }}>2. 강연 상세 정보</h4>
                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label>희망 디자이너(강사) *</label>
                    <select name="designerName" value={formData.designerName} onChange={handleChange} required style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--color-border)", backgroundColor: "white" }}>
                      <option value="">디자이너 선택 (또는 추천받기)</option>
                      <option value="추천 희망">분야에 맞는 디자이너 추천 희망</option>
                      {activeDesigners.map(d => (
                        <option key={d.id} value={d.ko.name}>{d.ko.name} ({d.ko.tag})</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text-primary)" }}>교육 대상 *</label>
                    <div className="chips-wrapper" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                      {["초등학생", "중고등학생", "일반시민", "교회", "기업/공공기관", "전문연구자"].map(t => (
                        <label key={t} className="select-chip">
                          <input type="radio" name="target" value={t} checked={formData.target === t} onChange={handleChange} required />
                          <span style={{ 
                            padding: "0.7rem 1.4rem", 
                            borderRadius: "12px", 
                            fontSize: "0.9rem", 
                            fontWeight: 600,
                            border: formData.target === t ? "2px solid var(--color-primary)" : "1.5px solid var(--color-border)",
                            backgroundColor: formData.target === t ? "rgba(220, 20, 20, 0.05)" : "white",
                            color: formData.target === t ? "var(--color-primary)" : "var(--color-text-muted)",
                            transition: "all 0.2s ease"
                          }}>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text-primary)" }}>핵심 주제 *</label>
                    <div className="chips-wrapper" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                      {["북한 일상/문화", "경제/장마당", "탈북 및 정착 서사", "남북 언어/소통", "통합 비전/리더십"].map(topic => (
                        <label key={topic} className="select-chip">
                          <input type="radio" name="topic" value={topic} checked={formData.topic === topic} onChange={handleChange} required />
                          <span style={{ 
                            padding: "0.7rem 1.4rem", 
                            borderRadius: "12px", 
                            fontSize: "0.9rem", 
                            fontWeight: 600,
                            border: formData.topic === topic ? "2px solid var(--color-primary)" : "1.5px solid var(--color-border)",
                            backgroundColor: formData.topic === topic ? "rgba(220, 20, 20, 0.05)" : "white",
                            color: formData.topic === topic ? "var(--color-primary)" : "var(--color-text-muted)",
                            transition: "all 0.2s ease"
                          }}>{topic}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. 일정 및 예산 */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--color-text-primary)", borderBottom: "2px solid #f3f4f6", paddingBottom: "0.5rem" }}>3. 일정 및 예산</h4>
                  <div className="form-row" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>희망 날짜 *</label>
                      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>선호 시간대 *</label>
                      <select name="time" value={formData.time} onChange={handleChange} required style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--color-border)", backgroundColor: "white" }}>
                        <option value="">시간대 선택</option>
                        <option value="오전 (09:00~12:00)">오전 (09:00~12:00)</option>
                        <option value="오후 (13:00~18:00)">오후 (13:00~18:00)</option>
                        <option value="저녁 (19:00~21:00)">저녁 (19:00~21:00)</option>
                        <option value="협의 가능">협의 가능</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text-primary)" }}>강사료 예산 범위 *</label>
                    <div className="chips-wrapper" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                      {["30만원 이하", "30~50만원", "50만원 이상", "내부 규정 따름"].map(b => (
                        <label key={b} className="select-chip">
                          <input type="radio" name="budget" value={b} checked={formData.budget === b} onChange={handleChange} required />
                          <span style={{ 
                            padding: "0.7rem 1.4rem", 
                            borderRadius: "12px", 
                            fontSize: "0.9rem", 
                            fontWeight: 600,
                            border: formData.budget === b ? "2px solid var(--color-primary)" : "1.5px solid var(--color-border)",
                            backgroundColor: formData.budget === b ? "rgba(220, 20, 20, 0.05)" : "white",
                            color: formData.budget === b ? "var(--color-primary)" : "var(--color-text-muted)",
                            transition: "all 0.2s ease"
                          }}>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "2.5rem" }}>
                  <label>추가 요청사항</label>
                  <textarea 
                    name="details" 
                    value={formData.details} 
                    onChange={handleChange} 
                    placeholder="기타 문의사항이나 요청하실 내용을 적어주세요." 
                    rows="3" 
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ borderRadius: "12px", padding: "1.2rem", fontSize: "1.1rem", fontWeight: 700 }} disabled={submitting}>
                  {submitting ? "발송 중..." : "섭외 신청 완료하기"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
