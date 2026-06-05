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

export const metadata = {
  title: "더라운드 (The Round) | 한반도의 내일을 디자인하는 테이블",
  description: "비영리 민간단체 더라운드(The Round)는 세대와 배경을 넘어 소통하는 원형 테이블입니다. 한반도의 내일을 함께 디자인합니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${outfit.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}

