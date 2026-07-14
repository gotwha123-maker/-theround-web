"use client";

import { useState, useEffect } from "react";

const mockDesigners = [
  {
    id: "des-5",
    img: "assets/김소연.webp",
    ko: { name: "김소연", tag: "가수·뮤지션", slogan: '"목소리로 한반도의 희망을 노래하는 뮤지션"', specialty: "정서적 통합  음악 / 고난 극복 서사", bio: "역경을 딛고 일어선 개인의 삶을 음악에 담아 전달하며, 남북한이 공통으로 느끼는 보편적 감수성을  통해 하나 됨을 이끌어냅니다.", career: "• TV조선 \"미스트롯 3\" 최종 6위\n• \"탈북 심청이\" 별명으로 트로트 가수 활동\n• MBN \"특종세상\" 등 다수 방송 출연\n• 전국 희망 콘서트 및 정착 강연 진행" }
  },
  {
    id: "des-0",
    img: "assets/김은주.jpg",
    ko: { name: "김은주", tag: "작가·인권활동가", slogan: '"열한 살의 유서에서 전 세계를 울린 희망의 작가로"', specialty: "북한 인권 실상 증언 / 글로벌 인권 소통 / 회고록 집필", bio: "김은주 작가는 1986년 북한 함경북도에서 태어나 고난의 행군 시기 극 심한 기아를 겪었습니다. 11살의 나이에 굶주림 속에서 썼던 유서의 기억을 담은 회고록 《열한 살의 유서》(A Thousand Miles to Freedom)를 통해 전 세계에 북한의 실상을 알렸습니다. 현재는 국제 무대에서 북한 주민들의 자유와 인권을 위해 목소리를 내고 있습니다.", career: "• 서강대학교 중국문화학과 졸업\n• 회고록 《열한 살의 유서》 8개 국어 번역 및 베스트셀러 달성\n• 통일부 북한인권 증진위원\n• 북한이탈주민 글로벌교육센터(FSI) 간사\n• 유엔(UN) 본부 및 제네바 인권이사회 증언\n• 다큐멘터리 《비욘드 유토피아 》 출연" }
  },
  {
    id: "des-1",
    img: "assets/이영현.jpg",
    ko: { name: "이영현", tag: "변호사·인권가", slogan: '"법률의 시선으로 남북의 마음을 잇는 변호사"', specialty: "탈북민 법 률 자문 / 북한 인권 정책", bio: "대한민국 1호 탈북민 변호사로서 법률적 전문성을 바탕으로 우리 사회 정착 과정의 실질적인 갈등 을 해결하며, 보편적 인권과 통합의 가치를 새롭게 디자인합니다.", career: "• 법무법인 이래 파트너 변호사\n• 대한변협 인권재단  사무총장\n• KIS(Korea Internet Studio) 대표\n• 제8회 변호사시험 합격 / 연세대 법대 졸" }
  },
  {
    id: "des-4",
    img: "assets/박유성.jpg",
    ko: { name: "박유성", tag: "감독·유튜버", slogan: '"미디어의 프레임을 넘어 새로운 북한을 그리는 감독"', specialty: "영상 서사 분석 / 미디어 편견 해소", bio: "영화를 전공한 전문가의 시각으로 북한을 재해석하며, 자극적인 이미지를 넘어 생생한 삶의 이야기를 영상과 강연으로 디자인합니다.", career: "• 유튜브 \"북한남자\" 채널 운영 및 기획\n• 다큐멘터리 영화 \"메콩강에 악어가 산다\" 감독\n• 동국대학교 영화영상학과 전공\n• 최근 사회 공헌 및 정책 참여 활동" }
  },
  {
    id: "des-3",
    img: "assets/김아라.jpg",
    ko: { name: "김아라", tag: "배우·방송인", slogan: '"예술을 통해 남북의 거리를 좁히는 화합의 아이콘"', specialty: "남북 문화 예술 / 미디어 속 북한 이미지", bio: "영화와 드라마를 넘나드는 배우로서, 문화 예술 콘텐츠가 가진 정서적 힘을 활용해 남북한 주민들이 서로를 따뜻하게 이해하도록 돕습니다.", career: "• 드라마 \"사랑의 불시착\" 출연 (사택 마을 주민)\n• 웹드라마 \"아는 사람\" 여주인공 역\n• 채널A \"이제 만나러 갑니다\" 메인 출연\n• 남북 문화 예술 교류 홍보대사 활동" }
  },
  {
    id: "des-7",
    isHidden: false,
    img: "assets/김강우.jpg",
    ko: { name: "김강우", tag: "방송인·작가", slogan: '"기록으로 남북의 마음을 잇는 디자이너"', specialty: "북한 실상 증언 / 도서 집필 / 사회 활동", bio: "북한 내부의 생생한 경험을 바탕으로, 우리가 몰랐던 북한의 진실을 글과 목소리로 전합니다. 최근 저서를 통해 남북 청년들에게 희망의 메시지를 전달하고 있습니다.", career: "• 저서 《나의 지옥은 나를 죽이지 못했다》 집필 및 발 간\n• 채널A \"이제 만나러 갑니다\" 정규 출연\n• 북한 인권 개선 캠페인 및 활동가\n• 공공기관/학교 대상 통일 안보 강사" }      
  },
  {
    id: "des-10",
    isHidden: false,
    img: "assets/jung_haneul.jpg",
    ko: { name: "정하늘", tag: "방송인·통일교육 강사", slogan: '"꿈과 도전을 통해 남북의 벽을 허무는 메신저"', specialty: "정착 성공 수기 / 통일 교육 / 방송 활동", bio: "탈북 과정과 남한 정착기에서의 생생한 경험을 바탕으로, 대한민국에서 꿈을 실현해 나가는 희망의 메시지를 전달합니다. 편견을 넘어선 따뜻한 통합의 미래를 디자인합니다.", career: "• 채널A \"이제 만나러 갑니다\"(이만갑) 다수 출연\n• 남북하나재단 '찾아가는 통일교육' 전문 강사\n• 주요 공공기관 및 군부대 대상 통일 안보 강연\n• 정착 성공 사례 발표 및 토크 콘서트 패널 활동" }
  },
  {
    id: "des-2",
    isHidden: true,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
    ko: { name: "정유나", tag: "방송인·유튜버", slogan: '"북한의 진실을 세계에 전하는 글로벌 디자이너"', specialty: "북한 실 상 증언 / 글로벌 인권 소통", bio: "뛰어난 영어 실력과 대중적인 입담을 겸비한 인권 활동가로, 다양한 미디어를 통해 북한의 실상 을 알리고 남북한 사이의 편견을 해소하는 활동을 합니다.", career: "• 유튜브 \"정유나 TV\" 운영 (구독자 30만+)\n• 채널A \"이제 만나러 갑니다\" 고정 출연\n• 투자자 짐 로저스 방한 전담 통역\n• 북한 인권 운동 및 국제 강연 다수" }
  },
  {
    id: "des-6",
    isHidden: true,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
    ko: { name: "나민희", tag: "유튜버·엘리트", slogan: '"우리가 몰랐던 진짜 평양의 일상을 전하는 디자이너"', specialty: "평 양 상류층 문화 / 북한 엘리트 교육", bio: "유럽 유학 및 북한 엘리트 집안의 경험을 바탕으로, 기존의 고정관념에서 벗어난 세련되 고 정확한 평양의 실상을 대중에게 전달합니다.", career: "• 유튜브 \"평양여자 나민희\" 채널 운영\n• 유럽(몰타) 유학 및 파견 근 무 경험\n• 이화여자대학교 정치외교학과 재학\n• 방송 \"이제 만나러 갑니다\" 전문 패널" }
  },
  {
    id: "des-8",
    isHidden: true,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
    ko: { name: "이은평", tag: "방송인·분석가", slogan: '"핵시설 부대 출신의 눈으로 본 국제 정세 전문가"', specialty: "북한  국방 기술 / Russia 파병 실상", bio: "북한 특수 공병 부대 근무 및 러시아 파병 경험을 토대로, 현재 급변하는 한반도 안보 상황과 국제 정세의 이면을 생생하게 해설합니다.", career: "• BK군 131부대(핵시설 건설) 근무\n• 러시아 파병 근무 중 탈북 및 한국 입 국\n• 파병 북한군 지원 캠페인 및 스피치 활동\n• 채널A \"이제 만나러 갑니다\" 출연" }
  }
];

export default function DesignersSection() {
  const [designers, setDesigners] = useState(mockDesigners);
  const [showAll, setShowAll] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientOrg: "",
    orgType: "공공기관·지자체",
    clientName: "",
    clientPosition: "팀장·실무자",
    clientContact: "",
    clientEmail: "",
    designerName: "",
    eventPurpose: "인식개선 캠페인",
    topic: "",
    date1: "",
    time1: "2시간(표준)",
    date2: "",
    locationType: "오프라인 현장 강연",
    address: "",
    audienceAge: "대학생·취준생",
    audienceCount: "",
    audienceTrait: "입문(기초지식 없음)",
    lectureType: "단독 강연",
    budgetRange: "기관 내부 규정에 따름",
    paymentMethod: "세금계산서 발행",
    additionalSupport: "해당 없음",
    replyDeadline: "1주일 이내",
    loveCall: "더라운드의 전문성 신뢰",
    details: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchDesigners() {
      try {
        const res = await fetch("/api/designers", { cache: 'no-store' });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data && data.length > 0) {
            const liveMap = new Map(data.map(d => [d.id, d]));
            const orderedList = mockDesigners.map(d => ({
                ...d,
                ...(liveMap.get(d.id) || {})
            }));
            setDesigners(orderedList);
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

  const openDetail = (d) => { setSelectedDesigner(d); document.body.style.overflow = "hidden"; };
  const closeDetail = () => { setSelectedDesigner(null); document.body.style.overflow = ""; };

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

  const closeBooking = () => { setBookingOpen(false); document.body.style.overflow = ""; };
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };

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
        closeBooking();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (designers.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("active"); });
      }, { threshold: 0.1 });
      document.querySelectorAll(".designer-card, .designer-intro-card").forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [visibleList]);

  return (
    <section id="designers" className="section designers-section bg-[var(--color-bg-secondary)] py-20 px-4 md:py-32 md:px-8 border-b border-[var(--color-border)]">    
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className="section-header text-center mb-16">
          <span className="section-subtitle text-sm font-extrabold text-[var(--color-primary)] tracking-wide block mb-3">PEOPLE OF THE FUTURE</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-[var(--color-text-primary)] tracking-tight">한반도 디자이너</h2>
          <p className="section-lead text-base md:text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed [word-break:keep-all]">한반도 통합을 위한 디자이너를 소개합니다.</p>
        </div>

        {/* 한반도 디자이너 취지 및 의미 소개 코너 */}
        <div className="designer-intro-card reveal-on-scroll bg-gradient-to-br from-[hsla(354,85%,48%,0.04)] to-[hsla(354,85%,48%,0.01)] border border-[var(--color-border)] rounded-3xl p-8 md:p-10 max-w-[900px] mx-auto mt-12 shadow-sm text-center">
          <h3 className="text-xl font-extrabold text-[var(--color-primary)] mb-5">
            왜 "한반도 디자이너" 인가요?
          </h3>
          <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed [word-break:keep-all] mx-auto max-w-[800px]">
            남과 북의 경계를 넘어, 각자의 분야에서 한반도의 새로운 미래를 그려나가는 전문 연사이자 리더들을 의미합니다.<br />
            단순히 과거의 이야기를 증언하는 것을 넘어 <strong className="font-bold">법률, 문화예술, 인권, 미디어</strong> 등 다양한 전문 영역에서 남북한 주민들이 서로를 깊이 이해하고 화합할 수 있도록 주도적으로 사회적 인식과 가치를 '디자인'합니다.
          </p>
        </div>

        <div className="designers-grid-container mt-16">
          <div className="designers-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleList.map((d) => (
              <div className="designer-card reveal-on-scroll bg-[var(--color-bg-primary)] rounded-3xl overflow-hidden shadow-sm border border-[var(--color-border)] cursor-pointer" key={d.id} onClick={() => openDetail(d)}>
                <div className="designer-img-wrapper relative w-full aspect-[1/1.2] overflow-hidden">
                  <img src={d.img} alt={d.ko?.name} className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105" />
                </div>
                <div className="designer-info p-6 text-center">
                  <span className="designer-tag inline-block bg-[var(--color-primary)] text-white font-bold text-xs px-4 py-1.5 rounded-full mb-3 transition-colors duration-300 ease hover:bg-[var(--color-primary-hover)]">{d.ko?.tag}</span>
                  <h3 className="designer-name text-xl font-extrabold mb-2 text-[var(--color-text-primary)]">{d.ko?.name}</h3>
                  <p className="designer-slogan text-sm text-[var(--color-primary)] font-bold leading-tight">{d.ko?.slogan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <button className="btn-action-more min-w-[220px]" onClick={() => setShowAll(!showAll)}>
            {showAll ? "간략히 보기" : "전체보기"}
          </button>
        </div>
      </div>

      {selectedDesigner && (
        <div className="modal open fixed inset-0 flex items-center justify-center z-[2000] p-4">
          <div className="modal-overlay fixed inset-0 bg-black/60 opacity-100 pointer-events-auto" onClick={closeDetail}></div>
          <div className="modal-container bg-gradient-to-br from-[var(--color-bg-secondary)] to-[#f8fafc] rounded-[32px] max-h-[90vh] overflow-y-auto relative max-w-4xl w-full z-[2001] shadow-2xl mx-4 md:mx-auto border border-[var(--color-border)] animate-[modalFadeIn_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            {/* 고정 헤더 - 배경 투명도 수정 */}
            <div className="modal-header flex items-center justify-between px-8 py-5 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-bg-secondary)] z-10">
              <span className="text-xs font-black text-[var(--color-primary)] tracking-widest uppercase">DESIGNER PROFILE</span>
              <button className="modal-close text-3xl text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:rotate-90 transition-all duration-300 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100" onClick={closeDetail}>&times;</button>
            </div>
            {/* 내부 바디 */}
            <div className="modal-body p-0">
              <div className="designer-detail-layout grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0">
                
                {/* 좌측 카드 영역 */}
                <div className="designer-detail-left w-full min-w-0 text-center bg-slate-50/50 p-8 md:p-10 md:border-r md:border-[var(--color-border)]">
                  {/* 스쿼클 이미지 프레임 (모바일-데스크톱 황금비율 보완) */}
                  <div className="w-36 h-36 max-w-[150px] md:max-w-none rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mx-auto mb-6 p-1 bg-gradient-to-tr from-[var(--color-primary)] to-[#ff4d5a] shadow-lg md:w-48 md:h-48 transition-transform duration-500 hover:scale-[1.02]">
                    <div className="w-full h-full rounded-[1.8rem] md:rounded-[2.3rem] overflow-hidden bg-white">
                      <img src={selectedDesigner.img} alt={selectedDesigner.ko.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  {/* 그라데이션 태그 배지 */}
                  <span className="inline-block bg-gradient-to-r from-[var(--color-primary)] to-[#ff4d5a] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-sm mb-4">
                    {selectedDesigner.ko.tag}
                  </span>
                  <h2 className="text-3xl font-black mb-2 text-slate-800 tracking-tight">{selectedDesigner.ko.name}</h2>
                  <p className="text-xs text-[var(--color-primary)] font-extrabold leading-relaxed px-2 [word-break:keep-all]">
                    {selectedDesigner.ko.slogan.replace(/\s+/g, " ")}
                  </p>
                  
                  {/* 전문분야 카드 - 파싱 칩 및 공백 수정 */}
                  <div className="bg-white p-5 rounded-2xl text-left mt-8 border border-slate-100 shadow-sm border-l-4 border-l-[var(--color-primary)]">
                    <strong className="block text-[11px] text-[var(--color-text-muted)] font-black uppercase tracking-wider mb-3">SPECIALTY / 전문 분야</strong>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDesigner.ko.specialty.replace(/\s+/g, " ").replace("법 률", "법률").replace("실 상", "실상").split(/[\/,]/).map((chip, idx) => {
                        const cleanChip = chip.trim();
                        if (!cleanChip) return null;
                        return (
                          <span className="inline-block bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-bold px-2.5 py-1 rounded-lg" key={idx}>
                            {cleanChip}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 우측 본문 영역 */}
                <div className="designer-detail-right w-full min-w-0 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    {/* 강사 소개 */}
                    <div className="mb-14">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-[3px] h-5 bg-[var(--color-primary)] rounded-full"></span>
                        <h3 className="text-lg font-black text-slate-800">강사 소개</h3>
                      </div>
                      
                      <div className="relative pl-1">
                        <p className="text-sm md:text-[0.975rem] leading-relaxed text-slate-600 font-medium whitespace-pre-line [word-break:keep-all]">
                          {selectedDesigner.ko.bio.replace(/[ \t]{2,}/g, " ").replace("극 심한", "극심한").replace("갈등 을", "갈등을")}
                        </p>
                      </div>
                    </div>

                    {/* 수평 구분선 배치로 시각적 호흡 개선 */}
                    <hr className="border-t border-slate-100/80 my-10 md:my-12" />
                    
                    {/* 주요 경력 및 활동 */}
                    <div className="mb-14">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-[3px] h-5 bg-[var(--color-primary)] rounded-full"></span>
                        <h3 className="text-lg font-black text-slate-800">주요 경력 및 활동</h3>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        {selectedDesigner.ko.career.replace(/\\n/g, "\n").split("\n").map((line, idx) => {
                          const cleanLine = line.replace(/^•\s*/, "").replace(/\s+/g, " ").replace("발 간", "발간").replace("파변", "파병").replace("입 국", "입국").replace("근 무", "근무").trim();
                          if (!cleanLine) return null;
                          return (
                            <div className="flex items-start gap-3.5 p-4 border-b border-slate-50 last:border-b-0 hover:bg-slate-50/30 transition-colors" key={idx}>
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0 mt-2"></span>
                              <span className="text-sm font-semibold text-slate-700 leading-relaxed [word-break:keep-all]">
                                {cleanLine}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* 의뢰 버튼 */}
                  <button className="btn w-full h-14 bg-gradient-to-r from-[var(--color-primary)] to-[#ff4d5a] text-white text-base font-black rounded-2xl shadow-[var(--shadow-accent)] hover:translate-y-[-3px] hover:shadow-[0_12px_24px_rgba(220,20,20,0.25)] hover:brightness-105 transition-all duration-300 cursor-pointer" onClick={() => openBooking(selectedDesigner.ko.name)}>
                    강연 및 교육 의뢰하기
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {bookingOpen && (
        <div className="modal open fixed inset-0 flex items-center justify-center z-[2000] p-4">
          <div className="modal-overlay fixed inset-0 bg-black/60 opacity-100 pointer-events-auto" onClick={closeBooking}></div>
          <div className="modal-container mobile-scroll-fix bg-[var(--color-bg-secondary)] rounded-3xl max-h-[98vh] overflow-y-auto relative shadow-2xl max-w-5xl w-full sm:w-[98%] md:w-full lg:w-full">
            <button className="modal-close absolute top-4 right-4 text-2xl text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors z-10" onClick={closeBooking}>&times;</button>
            <div className="modal-body p-6 md:p-10">
              <h3 className="text-2xl font-black mb-8 text-[var(--color-primary)] text-center">강연 및 교육 섭외 신청</h3>
              
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: Who & What */}
                  <div>
                    <h4 className="text-lg font-extrabold mb-5 text-[var(--color-text-primary)] border-l-4 border-[var(--color-primary)] pl-3">1. 신청 기관 및 담당자</h4>
                    <div className="form-group mb-4 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">기관/단체 정식 명칭 *</label><input type="text" name="clientOrg" value={formData.clientOrg} onChange={handleChange} required className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]" /></div>
                    <div className="form-row flex flex-col sm:flex-row gap-3 mt-4">
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">기관 유형 *</label>
                        <select name="orgType" value={formData.orgType} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                          {["공공기관·지자체", "초·중·고교", "대학교·대학원", "일반기업", "NGO·비영리", "기타"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">담당자 직함 *</label>
                        <select name="clientPosition" value={formData.clientPosition} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                          {["주무관·사무관", "교사·교수", "팀장·실무자", "대표·임원", "학생회·동아리장"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-row flex flex-col sm:flex-row gap-3 mt-4">
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">성함 *</label><input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]" /></div>
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">연락처 *</label><input type="text" name="clientContact" value={formData.clientContact} onChange={handleChange} required className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]" /></div>
                    </div>
                    <div className="form-group mt-4 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">이메일 주소 *</label><input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} required className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]" /></div>

                    <h4 className="text-lg font-extrabold mb-5 text-[var(--color-text-primary)] border-l-4 border-[var(--color-primary)] pl-3 mt-10">2. 행사 개요</h4>
                    <div className="form-group flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">행사 성격 *</label>
                      <select name="eventPurpose" value={formData.eventPurpose} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                        {["정착지원 교육", "인식개선 캠페인", "리더십 역량강화", "문화·예술 행사", "정책자문·포럼"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="form-group mt-4 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">강연 주제(또는 가제) *</label><input type="text" name="topic" value={formData.topic} onChange={handleChange} required className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]" /></div>
                  </div>

                  {/* Right Column: Details & Benefits */}
                  <div>
                    <h4 className="text-lg font-extrabold mb-5 text-[var(--color-text-primary)] border-l-4 border-[var(--color-primary)] pl-3">3. 청중 및 강연 상세</h4>
                    <div className="form-row flex flex-col sm:flex-row gap-3">
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">주요 연령대 *</label>
                        <select name="audienceAge" value={formData.audienceAge} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                          {["청소년", "대학생·취준생", "일반 성인", "시니어", "전문가·공무원"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">예상 인원 *</label><input type="number" name="audienceCount" value={formData.audienceCount} onChange={handleChange} required className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]" /></div>
                    </div>
                    <div className="form-group mt-4 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">청중 성향 *</label>
                      <select name="audienceTrait" value={formData.audienceTrait} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                        {["입문(기초지식 없음)", "심화(전문지식 희망)", "인식개선 필요", "실무 적용 희망"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="form-group mt-4 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">강연 형태 *</label>
                      <select name="lectureType" value={formData.lectureType} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                        {["단독 강연", "토크 콘서트(Q&A 위주)", "패널 토론", "1:1 멘토링"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>

                    <h4 className="text-lg font-extrabold mb-5 text-[var(--color-text-primary)] border-l-4 border-[var(--color-primary)] pl-3 mt-10">4. 예산 및 조건</h4>
                    <div className="form-group flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">강연료 규모 *</label>
                      <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                        {["기관 내부 규정에 따름", "30~50만원", "50~100만원", "100만원 이상", "협의 필요"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="form-row flex flex-col sm:flex-row gap-3 mt-4">
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">정산 방법 *</label>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                          {["세금계산서 발행", "카드 결제", "원천세 신고(개인 이체)", "기타"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">추가 지원 여부</label>
                        <select name="additionalSupport" value={formData.additionalSupport} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                          {["교통비 별도 지급", "숙박 제공 가능", "식사 제공 가능", "해당 없음"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>

                    <h4 className="text-lg font-extrabold mb-5 text-[var(--color-text-primary)] border-l-4 border-[var(--color-primary)] pl-3 mt-10">5. 마감 및 선정 이유</h4>
                    <div className="form-row flex flex-col sm:flex-row gap-3">
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">회신 희망 기한 *</label>
                        <select name="replyDeadline" value={formData.replyDeadline} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                          {["3일 이내(긴급)", "1주일 이내", "2주일 이내", "여유 있음"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div className="form-group flex-1 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">선정 이유 *</label>
                        <select name="loveCall" value={formData.loveCall} onChange={handleChange} className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]">
                          {["방송 출연 모습이 좋아서", "저서 내용을 직접 듣고 싶어서", "주제와 경력이 일치해서", "더라운드의 전문성 신뢰", "지인 강력 추천"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group mt-6 flex flex-col items-start"><label className="text-sm font-bold text-[var(--color-text-muted)] mb-1.5">기타 요청사항</label><textarea name="details" rows="2" value={formData.details} onChange={handleChange} placeholder="추가 전달 내용" className="p-3 border border-[var(--color-border)] rounded-lg w-full text-base outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[hsla(354,85%,48%,0.1)]"></textarea></div>

                <div className="text-center mt-10">
                  <button type="submit" className="btn btn-primary w-full h-14 text-xl rounded-xl shadow-[var(--shadow-accent)] border-none cursor-pointer" disabled={submitting}>
                    {submitting ? "전송 중..." : "신청 완료하기"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
