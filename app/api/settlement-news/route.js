import { NextResponse } from "next/server";

/**
 * New Fallback Data using the Latest Scraped Items
 */
const fallbackNewsList = [
  {
    id: "fb-1",
    category: "scholarship",
    badge: "장학정보",
    title: "2026년 하반기 푸른등대 삼성 기부장학금 신규장학생 선발 안내",
    date: "2026. 06. 07",
    excerpt: "삼성 기탁금을 활용한 사회적 배려계층 대학생 지원 장학금",
    url: "https://www.kosaf.go.kr"
  },
  {
    id: "fb-2",
    category: "scholarship",
    badge: "장학정보",
    title: "드림재단 제12기 탈북대학생 장학금 신청 공고",
    date: "2026. 06. 01",
    excerpt: "꿈을 향해 도전하는 탈북 대학생들을 위한 전용 장학 혜택",
    url: "#"
  },
  {
    id: "fb-3",
    category: "housing",
    badge: "주택정보",
    title: "[LH] 서울 금천구 가산동 인근 청년 매입임대주택 예비입주자 상시모집",
    date: "2026. 06. 07",
    excerpt: "가산디지털단지 인근 역세권 청년 주거 지원 공고",
    url: "https://apply.lh.or.kr"
  },
  {
    id: "fb-4",
    category: "housing",
    badge: "주택정보",
    title: "[SH] 2026년도 제1차 행복주택 입주자 모집 (구로/금천 지역)",
    date: "2026. 05. 30",
    excerpt: "서울시 거주 무주택 구성원을 위한 공공임대주택 정보",
    url: "https://www.i-sh.co.kr"
  },
  {
    id: "fb-5",
    category: "job",
    badge: "국내일자리",
    title: "[국내] 한국가스공사 2026년도 신입사원 채용 (사회적 배려 대상자 특별전형)",
    date: "2026. 06. 07",
    excerpt: "공공기관 사회적 책임 실현을 위한 특별 채용 전형 안내",
    url: "https://www.kogas.or.kr"
  },
  {
    id: "fb-6",
    category: "job",
    badge: "해외일자리",
    title: "[Global] UN World Food Programme (WFP) North Asia Relations Internship",
    date: "2026. 06. 05",
    excerpt: "국제기구 내 한반도 관련 실무 경험 및 글로벌 리더십 기회",
    url: "https://www.wfp.org/careers"
  },
  {
    id: "fb-7",
    category: "university",
    badge: "대학생활",
    title: "2027학년도 주요 대학 북한이탈주민 특별전형 입시 가이드북 배포",
    date: "2026. 06. 07",
    excerpt: "스카이(SKY) 및 서울 주요 대학 입시 전략 및 필수 체크리스트",
    url: "#"
  },
  {
    id: "fb-8",
    category: "research",
    badge: "연구설문",
    title: "[연구] 남북 통합 과정의 정서적 경험에 관한 심층 인터뷰 대상자 모집",
    date: "2026. 06. 07",
    excerpt: "한반도 미래 설계를 위한 소중한 목소리를 들려주세요 (소정의 사례비 지급)",
    url: "#"
  }
];

export async function GET() {
  const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  // Use fallback if no credentials found
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

    const records = data.records.map((r) => ({
      id: r.id,
      category: r.fields.category,
      badge: r.fields.badge,
      title: r.fields.title,
      date: r.fields.date,
      excerpt: r.fields.excerpt,
      tag: r.fields.tag,
      url: r.fields.url || "#",
    }));

    return NextResponse.json(records);
  } catch (err) {
    console.error("Airtable fetch error, using fallbacks:", err);
    return NextResponse.json(fallbackNewsList);
  }
}
