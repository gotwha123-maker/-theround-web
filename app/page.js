"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import CorePrograms from "../components/CorePrograms";
import DesignersSection from "../components/DesignersSection";
import Footer from "../components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openModal = (type) => {
    setModalType(type);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalType(null);
    document.body.style.overflow = "";
  };

  const getModalContent = () => {
    if (modalType === "school") {
      return {
        title: "리더십 스쿨",
        content: (
          <div>
            <p className="text-slate-600 font-bold text-sm mb-5 leading-relaxed [word-break:keep-all]">
              탈북민이 우리 사회의 당당한 주권자이자 전문가로 성장할 수 있도록 1:1 멘토링과 실무 비즈니스 교육을 체계적으로 제공합니다.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { title: "전문가 1:1 진로 매칭", desc: "분야별 시니어 전문가와 매칭하여 실질적이고 구체적인 커리어 로드맵을 설계합니다." },
                { title: "사회적 창업 및 실무 세미나", desc: "비즈니스 기획, 마케팅, 재무 관리 등 창업과 실무에 즉시 적용 가능한 지식을 함양합니다." },
                { title: "수료자 네트워크 지원", desc: "아카데미 수료 후에도 활발히 소통하며 성장을 이끌어갈 수 있는 독자적인 동문 네트워크를 제공합니다." }
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start p-3.5 bg-slate-50 rounded-xl border border-slate-100/50">
                  <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-2 shrink-0"></span>
                  <div>
                    <h5 className="font-extrabold text-[var(--color-text-primary)] text-sm mb-0.5">{item.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed [word-break:keep-all]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      };
    }
    if (modalType === "sports") {
      return {
        title: "통일인식 확산",
        content: (
          <div className="flex flex-col gap-4">
            {[
              { 
                title: "1) 유니원 FC (UniOne FC)", 
                desc: "스포츠를 통해 남과 북의 사람들이 대등한 파트너로 어우러지는 역동적인 화합의 현장입니다. 매주 정기 훈련과 친선 경기를 거듭하며 장벽 없는 단단한 공동체를 함께 빚어냅니다." 
              },
              { 
                title: "2) 통일포차 (Unification Pocha)", 
                desc: "맛있는 북한 요리와 문화적 요소를 현대적으로 융합하여, 시민사회와 함께 다소 경직될 수 있는 통일 이야기를 일상 속 따뜻하고 즐거운 페스티벌처럼 캐주얼하게 풀어내는 소통의 식탁입니다." 
              }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100/50">
                <h4 className="font-black text-[#ff4d5a] text-[15px] mb-2">{item.title}</h4>
                <p className="text-[13px] text-slate-600 leading-relaxed [word-break:keep-all]">{item.desc}</p>
              </div>
            ))}
          </div>
        )
      };
    }
    if (modalType === "forum") {
      return {
        title: "평화 포럼 및 아카이빙",
        content: (
          <div>
            <p className="text-slate-600 font-bold text-sm mb-5 leading-relaxed [word-break:keep-all]">
              선구자들의 소중한 삶의 기록을 영구 보존하고, 소통형 토론을 통해 사회 통합의 새로운 패러다임을 넓힙니다.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { title: "시민 개방형 토크 콘서트", desc: "시민 누구나 참여해 삶의 여정을 나누고, 평화에 관한 새로운 담론을 가벼운 소통으로 풀어갑니다." },
                { title: "탈북 서사 도서 출판 및 기록", desc: "치열하게 삶을 개척해 낸 목소리를 책과 콘텐츠로 발간하여 따뜻한 보편적 공감대를 확보합니다." },
                { title: "다국어 디지털 아카이빙", desc: "축적된 활동과 상생의 역사를 글로벌 아카이브에 영구히 보존하여 전 세계 시민사회와 연대합니다." }
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start p-3.5 bg-slate-50 rounded-xl border border-slate-100/50">
                  <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mt-2 shrink-0"></span>
                  <div>
                    <h5 className="font-extrabold text-[var(--color-text-primary)] text-sm mb-0.5">{item.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed [word-break:keep-all]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      };
    }
    return null;
  };

  const modalData = getModalContent();

  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* 더라운드 소개 및 3대 핵심가치 */}
        <div id="about"><About onOpenModal={openModal} /></div>

        {/* 더라운드 핵심 프로그램 (리더십 아카데미, 유니원 FC, 송년 축제) */}
        <div id="programs"><CorePrograms /></div>
        
        {/* 한반도 디자이너 */}
        <div id="designers"><DesignersSection /></div>
      </main>
      <Footer />

      {/* 핵심가치 상세 팝업 모달 */}
      {modalType && modalData && (
        <div className="modal open">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <button className="modal-close" onClick={closeModal} aria-label="모달 닫기">&times;</button>
            <div className="modal-body" style={{ padding: "2.5rem" }}>
              <h3 style={{ marginBottom: "1.5rem", color: "var(--color-primary)", fontSize: "1.6rem", fontWeight: 800 }}>
                {modalData.title}
              </h3>
              {modalData.content}
            </div>
          </div>
        </div>
      )}

      {/* 모달 애니메이션 및 구조적 스타일 보완 */}
      <style dangerouslySetInnerHTML={{__html: `
        .modal {
          position: fixed;
          inset: 0;
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 3000;
        }
        .modal.open {
          display: flex;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 5, 5, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .modal-container {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 28px;
          position: relative;
          width: 90%;
          max-width: 580px;
          box-shadow: var(--shadow-lg), 0 20px 40px rgba(0,0,0,0.15);
          animation: modalFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          overflow: hidden;
        }
        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: transparent;
          border: none;
          font-size: 2.2rem;
          cursor: pointer;
          color: var(--color-text-muted);
          line-height: 1;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .modal-close:hover {
          color: var(--color-primary);
          transform: scale(1.1);
        }
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}} />
    </>
  );
}

