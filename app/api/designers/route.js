import { NextResponse } from "next/server";

const fallbackDesigners = [
  {
    id: "des-0",
    img: "assets/김은주.jpg",
    ko: { name: "김은주", tag: "작가·인권활동가", slogan: '"열한 살의 유서에서 전 세계를 울린 희망의 작가로"', specialty: "북한 인권 실상 증언 / 글로벌 인권 소통 / 회고록 집필", bio: "김은주 작가는 1986년 북한 함경북도에서 태어나 고난의 행군 시기 극심한 기아를 겪었습니다. 11살의 나이에 굶주림 속에서 썼던 유서의 기억을 담은 회고록 《열한 살의 유서》(A Thousand Miles to Freedom)를 통해 전 세계에 북한의 실상을 알렸습니다. 현재는 국제 무대에서 북한 주민들의 자유와 인권을 위해 목소리를 내고 있습니다.", career: "• 서강대학교 중국문화학과 졸업\n• 회고록 《열한 살의 유서》 8개 국어 번역 및 베스트셀러 달성\n• 통일부 북한인권증진위원\n• 북한이탈주민 글로벌교육센터(FSI) 간사\n• 유엔(UN) 본부 및 제네바 인권이사회 증언\n• 다큐멘터리 《비욘드 유토피아》 출연" }
  },
  {
    id: "des-1",
    img: "assets/이영현.jpg",
    ko: { name: "이영현", tag: "변호사·인권가", slogan: '"법률의 시선으로 남북의 마음을 잇는 변호사"', specialty: "탈북민 법률 자문 / 북한 인권 정책", bio: "대한민국 1호 탈북민 변호사로서 법률적 전문성을 바탕으로 우리 사회 정착 과정의 실질적인 갈등을 해결하며, 보편적 인권과 통합의 가치를 새롭게 디자인합니다.", career: "• 법무법인 이래 파트너 변호사\n• 대한변협 인권재단 사무총장\n• KIS(Korea Internet Studio) 대표\n• 제8회 변호사시험 합격 / 연세대 법대 졸" }
  },
  {
    id: "des-2",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
    ko: { name: "정유나", tag: "방송인·유튜버", slogan: '"북한의 진실을 세계에 전하는 글로벌 디자이너"', specialty: "북한 실상 증언 / 글로벌 인권 소통", bio: "뛰어난 영어 실력과 대중적인 입담을 겸비한 인권 활동가로, 다양한 미디어를 통해 북한의 실상을 알리고 남북한 사이의 편견을 해소하는 활동을 합니다.", career: "• 유튜브 \"정유나 TV\" 운영 (구독자 30만+)\n• 채널A \"이제 만나러 갑니다\" 고정 출연\n• 투자자 짐 로저스 방한 전담 통역\n• 북한 인권 운동 및 국제 강연 다수" }
  },
  {
    id: "des-3",
    img: "assets/김아라.jpg",
    ko: { name: "김아라", tag: "배우·방송인", slogan: '"예술을 통해 남북의 거리를 좁히는 화합의 아이콘"', specialty: "남북 문화 예술 / 미디어 속 북한 이미지", bio: "영화와 드라마를 넘나드는 배우로서, 문화 예술 콘텐츠가 가진 정서적 힘을 활용해 남북한 주민들이 서로를 따뜻하게 이해하도록 돕습니다.", career: "• 드라마 \"사랑의 불시착\" 출연 (사택 마을 주민)\n• 웹드라마 \"아는 사람\" 여주인공 역\n• 채널A \"이제 만나러 갑니다\" 메인 출연\n• 남북 문화 예술 교류 홍보대사 활동" }
  },
  {
    id: "des-4",
    img: "assets/박유성.jpg",
    ko: { name: "박유성", tag: "감독·유튜버", slogan: '"미디어의 프레임을 넘어 새로운 북한을 그리는 감독"', specialty: "영상 서사 분석 / 미디어 편견 해소", bio: "영화를 전공한 전문가의 시각으로 북한을 재해석하며, 자극적인 이미지를 넘어 생생한 삶의 이야기를 영상과 강연으로 디자인합니다.", career: "• 유튜브 \"북한남자\" 채널 운영 및 기획\n• 다큐멘터리 영화 \"메콩강에 악어가 산다\" 감독\n• 동국대학교 영화영상학과 전공\n• 최근 사회 공헌 및 정책 참여 활동" }
  },
  {
    id: "des-5",
    img: "assets/김소연.webp",
    ko: { name: "김소연", tag: "가수·뮤지션", slogan: '"목소리로 한반도의 희망을 노래하는 뮤지션"', specialty: "정서적 통합 음악 / 고난 극복 서사", bio: "역경을 딛고 일어선 개인의 삶을 음악에 담아 전달하며, 남북한이 공통으로 느끼는 보편적 감수성을 통해 하나 됨을 이끌어냅니다.", career: "• TV조선 \"미스트롯 3\" 최종 6위\n• \"탈북 심청이\" 별명으로 트로트 가수 활동\n• MBN \"특종세상\" 등 다수 방송 출연\n• 전국 희망 콘서트 및 정착 강연 진행" }
  },
  {
    id: "des-6",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
    ko: { name: "나민희", tag: "유튜버·엘리트", slogan: '"우리가 몰랐던 진짜 평양의 일상을 전하는 디자이너"', specialty: "평양 상류층 문화 / 북한 엘리트 교육", bio: "유럽 유학 및 북한 엘리트 집안의 경험을 바탕으로, 기존의 고정관념에서 벗어난 세련되고 정확한 평양의 실상을 대중에게 전달합니다.", career: "• 유튜브 \"평양여자 나민희\" 채널 운영\n• 유럽(몰타) 유학 및 파견 근무 경험\n• 이화여자대학교 정치외교학과 재학\n• 방송 \"이제 만나러 갑니다\" 전문 패널" }
  },
  {
    id: "des-7",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000",
    ko: { name: "김강혁", tag: "방송인·활동가", slogan: '"북한의 체제 모순을 넘어 자유의 가치를 증언하는 청년"', specialty: "북한 사회 체제 분석 / 군대 실상 교육", bio: "북한 내부의 생생한 군 조직 생활과 사회 체제를 날카롭게 분석하며, 남북 청년들이 함께 가져야 할 자유와 민주주의의 가치를 강연합니다.", career: "• 채널A \"이제 만나러 갑니다\" 정규 출연\n• 북한 인권 개선 캠페인 및 활동가\n• 공공기관/학교 대상 통일 안보 강사\n• 다수의 사회 정책 포럼 발제자" }
  },
  {
    id: "des-8",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
    ko: { name: "이은평", tag: "방송인·분석가", slogan: '"핵시설 부대 출신의 눈으로 본 국제 정세 전문가"', specialty: "북한 국방 기술 / 러시아 파병 실상", bio: "북한 특수 공병 부대 근무 및 러시아 파병 경험을 토대로, 현재 급변하는 한반도 안보 상황과 국제 정세의 이면을 생생하게 해설합니다.", career: "• 북한군 131부대(핵시설 건설) 근무\n• 러시아 파병 근무 중 탈북 및 한국 입국\n• 파병 북한군 지원 캠페인 및 스피치 활동\n• 채널A \"이제 만나러 갑니다\" 출연" }
  }
];

export async function DELETE(req) {
  const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
       return NextResponse.json({ error: "Record ID is required" }, { status: 400 });
    }

    const url = `https://api.airtable.com/v0/${baseId}/Designers/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      }
    });

    if (!res.ok) throw new Error("Airtable delete request failed");
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Airtable delete error:", err);
    return NextResponse.json({ error: "Failed to delete designer" }, { status: 500 });
  }
}
export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  // Fallback if environment variables are not set
  if (!apiKey || !baseId) {
    return NextResponse.json(fallbackDesigners);
  }

  try {
    const url = `https://api.airtable.com/v0/${baseId}/Designers?sort%5B0%5D%5Bfield%5D=order&sort%5B0%5D%5Bdirection%5D=asc`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, // Disable cache for immediate verification
    });

    if (!res.ok) throw new Error("Airtable request failed");

    const data = await res.json();
    const records = data.records.map((r) => ({
      id: r.id,
      img: r.fields.img_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.fields.name || "D")}&background=f44336&color=fff&size=512`,
      isHidden: !!r.fields.isHidden,
      order: r.fields.order || 0,
      ko: {
        name: r.fields.name || "한반도 디자이너",
        tag: r.fields.tag || "전문 강사",
        slogan: r.fields.slogan || "통일을 준비하는 사람들의 이야기",
        specialty: r.fields.specialty || "사회 공헌 / 정착 지원",
        bio: r.fields.bio || "상세 프로필을 준비 중입니다.",
        career: r.fields.career || "경력 정보를 업데이트 중입니다.",
      },
    }));

    return NextResponse.json(records);
  } catch (err) {
    console.error("Airtable fetch error, using fallbacks:", err);
    return NextResponse.json(fallbackDesigners);
  }
}

export async function PATCH(req) {
  const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { id, isHidden, order } = body;

    if (!id) {
       return NextResponse.json({ error: "Record ID is required" }, { status: 400 });
    }

    const fields = {};
    if (isHidden !== undefined) fields.isHidden = isHidden;
    if (order !== undefined) fields.order = order;

    const url = `https://api.airtable.com/v0/${baseId}/Designers/${id}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields })
    });

    if (!res.ok) throw new Error("Airtable update request failed");
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Airtable update error:", err);
    return NextResponse.json({ error: "Failed to update designer" }, { status: 500 });
  }
}
