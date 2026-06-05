import { NextResponse } from "next/server";

const fallbackNewsList = [
  {
    id: "news-1",
    category: "welfare",
    badge: "지원의료비/임대주택",
    title: "2026년 하반기 한국이탈주민 공공임대주택 우선 공급 신청 절차 및 가이드",
    date: "2026. 06. 04",
    excerpt: "국토교통부와 LH는 무주택 이탈주민 세대를 위해 하반기 매입임대 및 전세임대주택 우선 공급 대상자를 모집합니다. 보증금 지원 및 장기 거주 혜택이 주어집니다.",
    tag: "마감: 6/30",
    url: "#"
  },
  {
    id: "news-2",
    category: "education",
    badge: "장학금 300만원 지원",
    title: "남북하나재단 대학생 장학금 신청 및 보육료 무상 지원 공고",
    date: "2026. 05. 28",
    excerpt: "남북하나재단은 이탈주민 자녀들의 학업 안정을 위해 성적 우수 및 일반 장학생을 선발합니다. 영유아를 둔 가정의 어린이집 무상 보육 지원금 혜택도 함께 연계됩니다.",
    tag: "지원금: 최대 300만원",
    url: "#"
  },
  {
    id: "news-3",
    category: "jobs",
    badge: "국비 전액 지원",
    title: "중장년 이탈주민 맞춤 직업 훈련 (요양보호사, 바리스타 자격증 무료 취득반)",
    date: "2026. 05. 18",
    excerpt: "광명 일자리센터는 중장년층 이탈주민의 재취업을 돕기 위해 전문 자격증 무료 취득 교육생을 모집합니다. 교육 완료 후 우대 기업으로 즉각 알선 혜택이 주어집니다.",
    tag: "전액 무료 / 취업 연계",
    url: "#"
  },
  {
    id: "news-4",
    category: "health",
    badge: "무료 치과/검진 혜택",
    title: "광명시 협약 의료원 무료 건강검진 및 종합 치과 치료 지원 안내",
    date: "2026. 05. 10",
    excerpt: "더라운드와 지역 협약 병원이 연계하여 모든 탈북민 주민 대상 무료 정밀 건강검진과 안과/치과(틀니 및 기본 보철) 비급여 진료비를 지원합니다.",
    tag: "혜택: 정밀 검진 무료",
    url: "#"
  }
];

export async function GET() {
  const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

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
      next: { revalidate: 0 }, // Disable cache
    });

    if (!res.ok) throw new Error("Airtable request failed");

    const data = await res.json();
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
