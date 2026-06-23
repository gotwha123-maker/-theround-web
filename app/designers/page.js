import { Suspense } from "react";
import Header from "../../components/Header";
import DesignersContent from "./DesignersContent";
import Footer from "../../components/Footer";

export const dynamic = "force-dynamic";

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
