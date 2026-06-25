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
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
              탈북민이 우리 사회의 전문가로 성장할 수 있도록 1:1 멘토링과 실무 비즈니스 교육을 제공합니다.
            </p>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "2" }}>
              <li>전문가 1:1 진로 매칭</li>
              <li>사회적 창업 및 실무 세미나</li>
              <li>수료자 네트워크 지원</li>
            </ul>
          </div>
        )
      };
    }
    if (modalType === "sports") {
      return {
        title: "통일인식 확산",
        content: (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>1) 유니원 FC (UniOne FC)</h4>
              <p style={{ lineHeight: "1.8" }}>스포츠를 통해 남과 북의 사람들이 대등한 파트너로 어우러지는 역동적인 화합의 현장입니다. 매주 정기 훈련과 경기를 통해 건강한 공동체를 형성합니다.</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
               <h4 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>2) 통일포차 (Unification Pocha)</h4>
               <p style={{ lineHeight: "1.8" }}>맛있는 음식과 문화적 요소를 융합하여 시민들과 함께 경직된 통일 이야기를 일상 속 축제처럼 가볍게 풀어내는 쌍방향 소통 무대입니다.</p>
            </div>
          </div>
        )
      };
    }
    if (modalType === "forum") {
      return {
        title: "평화 포럼 및 아카이빙",
        content: (
          <div>
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
              선구자들의 삶의 기록을 보존하고, 학술 토론을 통해 사회 통합의 새로운 패러다임을 제시합니다.
            </p>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "2" }}>
              <li>시민 개방형 토크 콘서트</li>
              <li>탈북 서사 도서 출판 및 기록</li>
              <li>다국어 디지털 아카이빙</li>
            </ul>
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

