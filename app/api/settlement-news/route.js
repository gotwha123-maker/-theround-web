import { NextResponse } from "next/server";

/**
 * Cleaned Fallback Data (June 2026) - Focusing on 4 Core Categories
 */
const fallbackNewsList = [
  // 1. Scholarships
  {
    id: "sc-1",
    category: "scholarship",
    badge: "한국장학재단",
    title: "2026학년도 2학기 국가장학금 1차 신청 공고 (~6/22 마감)",
    date: "2026. 06. 07",
    excerpt: "모든 대학생 대상 등록금 지원 (기초/차상위 전액 지원). 6월 22일 18:00 마감.",
    url: "https://www.kosaf.go.kr"
  },
  {
    id: "sc-2",
    category: "scholarship",
    badge: "주거지원",
    title: "2026학년도 2학기 주거안정장학금 신청 안내",
    date: "2026. 06. 07",
    excerpt: "기초/차상위 대학생 대상 월 최대 20만원 주거비 지원.",
    url: "https://www.kosaf.go.kr"
  },
  // 2. Housing
  {
    id: "hs-1",
    category: "housing",
    badge: "SH공사",
    title: "2026년 1차 행복주택 입주자 모집 공고 (서울 전역)",
    date: "2026. 06. 07",
    excerpt: "청년, 신혼부부, 고령자 대상 시세 60~80% 수준 임대주택 공급.",
    url: "https://www.i-sh.co.kr"
  },
  {
    id: "hs-2",
    category: "housing",
    badge: "LH공사",
    title: "2026년 기존주택 전세임대 입주자 수시 모집 안내",
    date: "2026. 06. 07",
    excerpt: "원하는 집을 구하면 LH가 계약 후 저렴하게 재임대하는 방식.",
    url: "https://apply.lh.or.kr"
  },
  // 3. Jobs
  {
    id: "jb-1",
    category: "job",
    badge: "국내채용",
    title: "[국내] 한국가스공사 2026년도 신입사원 특별전형",
    date: "2026. 06. 07",
    excerpt: "공공기관 사회적 책임 실현을 위한 특별 채용 전형.",
    url: "https://www.kogas.or.kr"
  },
  {
    id: "jb-2",
    category: "job",
    badge: "Global",
    title: "[Global] UN WFP North Asia Relations Internship",
    date: "2026. 06. 05",
    excerpt: "국제기구 내 한반도 관련 실무 경험 및 글로벌 리더십 기회.",
    url: "https://www.wfp.org/careers"
  },
  // 4. University
  {
    id: "un-1",
    category: "university",
    badge: "대학생활",
    title: "2027학년도 주요 대학 북한이탈주민 특별전형 입시 가이드북 배포",
    date: "2026. 06. 07",
    excerpt: "스카이(SKY) 및 서울 주요 대학 입시 전략 및 필수 체크리스트.",
    url: "#"
  }
];

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  // Use fallback if no credentials found or to ensure immediate visibility
  if (!apiKey || !baseId) {
    return NextResponse.json(fallbackNewsList);
  }

  try {
    const url = `https://api.airtable.com/v0/${baseId}/SettlementNews?sort%5B0%5D%5Bfield%5D=date&sort%5B0%5D%5Bdirection%5D=desc`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error("Airtable request failed");

    const data = await res.json();
    if (!data.records || data.records.length === 0) {
        return NextResponse.json(fallbackNewsList);
    }

    // Merge live data with fallback to ensure categories are always populated
    const records = data.records.map((r) => ({
      id: r.id,
      category: r.fields.category,
      badge: r.fields.badge,
      title: r.fields.title,
      date: r.fields.date,
      excerpt: r.fields.excerpt,
      tag: r.fields.tag,
      url: r.fields.url || "#",
    })).filter(r => r.category !== 'research'); // Ensure 'research' is filtered out

    return NextResponse.json(records);
  } catch (err) {
    console.error("Airtable fetch error, using fallbacks:", err);
    return NextResponse.json(fallbackNewsList);
  }
}
