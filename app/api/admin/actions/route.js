import { NextResponse } from "next/server";
const { exec } = require('child_process');

export async function POST(req) {
  // Use Vercel production environment variable for admin API authentication
  const authHeader = req.headers.get("Authorization");
  const secureToken = process.env.ADMIN_SECRET_TOKEN || "mock_admin_secret_token_2026";
  if (!authHeader || authHeader !== `Bearer ${secureToken}`) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { action } = await req.json();

    if (action === 'run_news_crawler') {
      return new Promise((resolve) => {
        // Execute the script we created earlier
        exec('node scripts/sync-news.js', { cwd: process.cwd() }, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            resolve(NextResponse.json({ success: false, error: error.message }, { status: 500 }));
            return;
          }
          console.log(`Crawler Output: ${stdout}`);
          resolve(NextResponse.json({ success: true, message: "크롤링 및 업데이트가 완료되었습니다.", logs: stdout }));
        });
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
