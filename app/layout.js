import { Noto_Sans_KR, Outfit } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-noto-sans-kr",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-outfit",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "더라운드 (The Round) | 한반도의 내일을 디자인하는 테이블",
  description: "더라운드(The Round)는 탈북민 자녀 장학금, 대학 대입 전형 입시 소식, 일자리 채용 및 지원금 소식 등 북한이탈주민과 남북 청년을 위한 정착 지원 혜택 정보를 투명하고 빠르게 전달하는 한반도 통합 플랫폼입니다.",
  keywords: [
    "더라운드",
    "The Round",
    "탈북민 장학금",
    "탈북민 대입",
    "북한이탈주민 지원금",
    "탈북민 일자리",
    "탈북 대학생",
    "대입 특별전형",
    "통일 NGO",
    "남북청년"
  ],
  openGraph: {
    title: "더라운드 (The Round) | 한반도의 내일을 디자인하는 테이블",
    description: "탈북민 자녀 장학금, 대학 대입 전형 입시 소식, 일자리 채용 및 지원금 소식 등 북한이탈주민과 남북 청년을 위한 정착 지원 혜택을 투명하게 전하는 한반도 통합 플랫폼입니다.",
    url: "https://theroundyouth.org",
    siteName: "더라운드 (The Round)",
    images: [
      {
        url: "https://theroundyouth.org/assets/story_forum.png",
        width: 1200,
        height: 630,
        alt: "더라운드 공식 홈페이지 소셜 공유 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    naver: "cd6494f434aa59b40ce0842513f36806e5e12913",
  },
  other: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "더라운드 (The Round)",
    "alternateName": "The Round",
    "url": "https://theroundyouth.org",
    "logo": "https://theroundyouth.org/assets/story_forum.png",
    "sameAs": [
      "https://www.instagram.com/theroundyouth",
    ],
    "description": "북한이탈주민과 남북 청년을 위한 대학 입시, 장학 혜택, 정착 주거 지원 및 취업 정보를 수집하고 제공하는 한반도 통합 지원 플랫폼입니다.",
  };

  return (
    <html lang="ko" className={`${notoSansKR.variable} ${outfit.variable}`}>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
