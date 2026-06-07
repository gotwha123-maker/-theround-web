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
    date: "2026. 05. 22",
    excerpt: "한국장학재단에서 실시하는 대학생 등록금 지원 사업으로, 6월 22일 18시까지 신청을 접수합니다.",
    url: "https://www.kosaf.go.kr"
  },
  {
    id: "sc-2",
    category: "scholarship",
    badge: "남북하나재단",
    title: "2026년 북향민 청년 ‘미래날개’ 응시료 지원 사업 공고 (~12.5)",
    date: "2026. 04. 16",
    excerpt: "북한이탈주민 청년들의 어학 및 자격증 시험 응시료를 지원하여 구직 비용 부담을 완화해 드립니다.",
    url: "https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=20102"
  },
  // 2. Housing
  {
    id: "hs-1",
    category: "housing",
    badge: "LH공사",
    title: "2026년 청년 매입임대주택 및 행복주택 공고 확인",
    date: "2026. 06. 07",
    excerpt: "LH청약플러스 홈페이지의 임대주택 공고를 통해 지역별 청년 매입임대, 행복주택 등의 모집 일정을 확인할 수 있습니다.",
    url: "https://apply.lh.or.kr"
  },
  // 3. Jobs
  {
    id: "jb-1",
    category: "job",
    badge: "남북하나재단",
    title: "제1회 슬기로운 일자리 찾기 프로그램 참가자 모집공고 (~6.10)",
    date: "2026. 05. 27",
    excerpt: "남북하나재단에서 북한이탈주민들의 취업 역량 강화 및 일자리 정보 연계를 위해 프로그램을 운영합니다.",
    url: "https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=20174"
  },
  // 4. University
  {
    id: "un-1",
    category: "university",
    badge: "남북하나재단",
    title: "2026년 진로·진학 1:1 맞춤형 전문 상담 신청 안내 (~11.30)",
    date: "2026. 03. 05",
    excerpt: "북향민 청소년 및 자녀들의 대학교 입시 및 진학 준비를 돕기 위한 1:1 맞춤형 전문 상담을 지원합니다.",
    url: "https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=19983"
  },
  // 5. Welfare
  {
    id: "wf-1",
    category: "welfare",
    badge: "남북하나재단",
    title: "2026년 북향민 건강검진(피폭 실태조사)사업 참여 희망자 모집 (~11.30)",
    date: "2026. 03. 27",
    excerpt: "북한이탈주민의 건강 관리 및 의료 지원을 위해 정밀 건강검진 참여 대상을 모집합니다.",
    url: "https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=20042"
  }
];

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  const cacheHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  };

  // Use fallback if no credentials found or to ensure immediate visibility
  if (!apiKey || !baseId) {
    return NextResponse.json(fallbackNewsList, { headers: cacheHeaders });
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
        return NextResponse.json(fallbackNewsList, { headers: cacheHeaders });
    }

    // Merge live data with fallback to ensure categories are always populated
    const records = data.records.map((r) => {
      let category = (r.fields.category || "").trim().toLowerCase();
      let badge = r.fields.badge;

      // Normalize Category to match client tabs (scholarship, housing, job, university, welfare)
      if (category === "jobs" || category === "job") {
        category = "job";
        if (!badge) badge = "일자리";
      } else if (category === "education") {
        const title = r.fields.title || "";
        if (title.includes("대학") || title.includes("입시") || title.includes("가이드북") || title.includes("진학") || title.includes("진로") || title.includes("학습")) {
          category = "university";
          if (!badge) badge = "대학생활";
        } else {
          category = "scholarship";
          if (!badge) badge = "장학정보";
        }
      } else if (category === "scholarship") {
        category = "scholarship";
        if (!badge) badge = "장학정보";
      } else if (category === "housing") {
        category = "housing";
        if (!badge) badge = "주택정보";
      } else if (category === "university") {
        category = "university";
        if (!badge) badge = "대학생활";
      } else if (category === "welfare" || category === "health") {
        const title = r.fields.title || "";
        if (title.includes("일자리") || title.includes("채용") || title.includes("취업") || title.includes("자금")) {
          category = "job";
          if (!badge) badge = "일자리";
        } else {
          category = "welfare";
          if (!badge) badge = "생활지원";
        }
      }

      return {
        id: r.id,
        category: category,
        badge: badge || "공지사항",
        title: r.fields.title,
        date: r.fields.date,
        excerpt: r.fields.excerpt || "",
        tag: r.fields.tag,
        url: r.fields.url || r.fields.link || "#",
      };
    }).filter(r => r.category !== 'research' && ['scholarship', 'housing', 'job', 'university', 'welfare'].includes(r.category));

    return NextResponse.json(records, { headers: cacheHeaders });
  } catch (err) {
    console.error("Airtable fetch error, using fallbacks:", err);
    return NextResponse.json(fallbackNewsList, { headers: cacheHeaders });
  }
}
