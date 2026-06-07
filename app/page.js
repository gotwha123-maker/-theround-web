"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import SettlementNewsSection from "../components/SettlementNewsSection";
import About from "../components/About";
import DesignersSection from "../components/DesignersSection";
import BarriersSection from "../components/BarriersSection";
import SolutionsSection from "../components/SolutionsSection";
import StoriesSection from "../components/StoriesSection";
import AboutFounder from "../components/AboutFounder";
import DonationSection from "../components/DonationSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

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
        title: "유니원 FC",
        content: (
          <div>
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
              축구라는 공통의 언어로 남북의 사람들이 편견 없이 소통하며 건강한 공동체를 만듭니다.
            </p>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "2" }}>
              <li>매주 정기 훈련 및 친선 경기</li>
              <li>전문 코칭 지원</li>
              <li>합동 체육대회 및 교류 활동</li>
            </ul>
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
        
        {/* 현황 및 데이터 (통계 유지) */}
        <div id="stats"><Stats /></div>
        
        {/* 비전 및 미션 (상단 배치) */}
        <div id="about"><About /></div>
        
        {/* 핵심 사업 (상단 배치) */}
        <div id="solutions"><SolutionsSection onOpenModal={openModal} /></div>

        {/* 한반도 디자이너 (상단 노출) */}
        <div id="designers"><DesignersSection /></div>
        
        {/* 뉴스 및 활동 */}
        <SettlementNewsSection />
        <div id="stories"><StoriesSection /></div>

        <AboutFounder />
        <DonationSection />
        <div id="contact"><ContactSection /></div>
      </main>
      <Footer />

      {/* Program Details Modal */}
      {modalType && modalData && (
        <div className="modal open" style={{ display: "flex" }}>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container" style={{ maxWidth: "600px" }}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-body">
              <h3 style={{ marginBottom: "1.5rem", color: "var(--color-primary)" }}>{modalData.title}</h3>
              {modalData.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
