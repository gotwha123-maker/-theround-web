"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import DesignersSection from "../../components/DesignersSection";
import Footer from "../../components/Footer";

function DesignersContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams.get("book") === "true") {
      // Trigger the booking modal by dispatching the custom event
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openDesignerBooking'));
      }, 300);
    }
  }, [searchParams]);

  return (
    <main style={{ minHeight: "100vh", paddingTop: "80px" }}>
      <DesignersSection />
    </main>
  );
}

export default function DesignersPage() {
  return (
    <>
      <Header forceSolid={true} />
      <Suspense fallback={<div style={{ minHeight: "100vh", paddingTop: "120px", textAlign: "center", color: "var(--color-text-muted)" }}>로딩 중...</div>}>
        <DesignersContent />
      </Suspense>
      <Footer />
    </>
  );
}
