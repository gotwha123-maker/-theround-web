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
  description: "한반도 통일은 누군가의 일이 아닌, 우리 모두의 책임입니다. 더라운드는 시민의 역할을 함께 만들어갑니다.",
  viewport: "width=device-width, initial-scale=1",
  other: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${outfit.variable}`}>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
