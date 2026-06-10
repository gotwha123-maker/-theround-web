import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

/**
 * Cleaned Fallback Data - Only used if local news.json is missing
 */
const fallbackNewsList = [
  {
    id: "sc-1",
    category: "scholarship",
    badge: "한국장학재단",
    title: "2026학년도 2학기 국가장학금 1차 신청 공고",
    date: "2026. 05. 22",
    excerpt: "국가장학금 신청이 진행 중입니다. 기간 내에 꼭 신청하세요.",
    url: "https://www.kosaf.go.kr"
  }
];

const LOCAL_DATA_PATH = path.join(process.cwd(), 'public/data/news.json');

export const dynamic = "force-dynamic";

export async function GET() {
  const cacheHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  };

  try {
    // 1. Always prioritize local data collected by our background agent
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      const fileContent = fs.readFileSync(LOCAL_DATA_PATH, 'utf8');
      const records = JSON.parse(fileContent);
      
      console.log(`[System] Serving ${records.length} latest news from Local DB.`);
      return NextResponse.json(records, { headers: cacheHeaders });
    }
  } catch (e) {
    console.error("Local DB read error:", e);
  }

  // 2. Try Airtable as a secondary background source if needed, 
  // but for now, we rely on our verified Local DB for speed and reliability.
  
  return NextResponse.json(fallbackNewsList, { headers: cacheHeaders });
}
