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
  const [modalType, setModalType] = useState(null); // null, school, sports, forum

  useEffect(() => {
    // Scroll Animation Observer (reveal-on-scroll)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Animate only once
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
        title: "청년 리더십 스쿨",
        content: (
          <div>
            <h4 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>[핵심 목적 및 설계]</h4>
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
              자립준비 또는 정착 중인 남북 청년들이 각자의 지성과 가능성을 바탕으로, 스스로의 커리어와 리더십 로드맵을 설계하는 실무 전문 역량 강화 교육 과정입니다.
            </p>
            <h4 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>[제공 혜택]</h4>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "2", marginBottom: "1.5rem" }}>
              <li>현직 대기업/글로벌 멘토와의 1:1 진로 매칭 멘토링</li>
              <li>사회적 기업 및 창업 실무를 위한 소규모 집중 세미나</li>
              <li>리더십 도서 무상 제공 및 수료자 네트워킹 지원</li>
            </ul>
          </div>
        )
      };
    }
    if (modalType === "sports") {
      return {
        title: "스포츠 연대 유니원 FC",
        content: (
          <div>
            <h4 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>[그라운드 위에서의 연대]</h4>
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
              축구라는 보편적인 스포츠 언어를 통해 심리적 거리와 이질감을 허물고, 서로를 동등한 팀원으로 받아들이는 건강한 통합의 장입니다.
            </p>
            <h4 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>[활동 안내]</h4>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "2", marginBottom: "1.5rem" }}>
              <li>매주 토요일 정기 훈련 및 지역 아마추어 팀들과의 친선 경기</li>
              <li>전문 코칭스태프 영입을 통한 성숙한 스포츠맨십 훈련</li>
              <li>소외 없는 관계 형성을 위한 분기별 합동 체육대회 및 식사 나눔</li>
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
            <h4 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>[사회의 인식 변화와 기록]</h4>
            <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
              선구자들의 삶의 궤적을 엮는 구술사 아카이빙을 구축하고, 편견의 언어에서 공존의 담론으로 시민 인식을 디자인하는 평화/학술 포럼입니다.
            </p>
            <h4 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>[주요 성과]</h4>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "2", marginBottom: "1.5rem" }}>
              <li>연간 학술 세미나 및 시민 개방형 평화 토크 콘서트 개최</li>
              <li>탈북 청년/주민들의 삶과 꿈을 기록하는 도서 출판</li>
              <li>다큐멘터리 제작 및 다국어 아카이빙 서비스 제공</li>
            </ul>
          </div>
        )
      };
    }
    return null;
  };

  const modalData = getModalContent();

  const [showBarriers, setShowBarriers] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div id="stats"><Stats /></div>
        
        {/* 한반도 디자이너 (Moved Up) */}
        <div id="designers"><DesignersSection /></div>
        
        {/* 더라운드 정체성 */}
        <div id="about"><About /></div>
        
        {/* 이음 뉴스 */}
        <SettlementNewsSection />

        {/* 이음 스토리 */}
        <div id="stories"><StoriesSection /></div>

        {/* 핵심 사업 (Collapsible) */}
        <div id="solutions" className="section-compact">
          {!showSolutions ? (
            <div className="container text-center py-5">
              <h2 className="section-title-simple">핵심 사업</h2>
              <p className="section-lead-simple">더라운드가 진행하는 주체적 역량 설계와 연대 프로젝트를 확인해 보세요.</p>
              <button className="btn btn-outline btn-lg" onClick={() => setShowSolutions(true)}>사업 내용 자세히 보기</button>
            </div>
          ) : (
            <div className="reveal-on-scroll active">
              <SolutionsSection onOpenModal={openModal} />
              <div className="text-center pb-5">
                <button className="btn btn-text" onClick={() => setShowSolutions(false)}>접기 &uarr;</button>
              </div>
            </div>
          )}
        </div>

        {/* 우리의 과제 (Collapsible) */}
        <div id="barriers" className="section-compact" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
          {!showBarriers ? (
            <div className="container text-center py-5">
              <h2 className="section-title-simple">우리의 과제</h2>
              <p className="section-lead-simple">우리가 함께 풀어야 할 실천적 장벽과 설계 과제들을 확인해 보세요.</p>
              <button className="btn btn-outline btn-lg" onClick={() => setShowBarriers(true)}>과제 내용 자세히 보기</button>
            </div>
          ) : (
            <div className="reveal-on-scroll active">
              <BarriersSection />
              <div className="text-center pb-5">
                <button className="btn btn-text" onClick={() => setShowBarriers(false)}>접기 &uarr;</button>
              </div>
            </div>
          )}
        </div>

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

