"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DesignersSection from "../../components/DesignersSection";

export default function DesignersContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams.get("book") === "true") {
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
