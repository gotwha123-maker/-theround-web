import { NextResponse } from "next/server";
const Airtable = require('airtable');

export async function GET() {
  const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 500 });
  }

  const base = new Airtable({ apiKey: apiKey }).base(baseId);

  try {
    const stats = {
      newsCount: 0,
      storiesCount: 0,
      designersCount: 0,
      bookingsCount: 0,
      donationsCount: 0
    };

    // Note: To avoid hitting API limits quickly, in a real production app we might cache this, 
    // but for the admin dashboard, we fetch live counts.
    const news = await base('SettlementNews').select().all();
    stats.newsCount = news.length;

    const stories = await base('Stories').select().all();
    stats.storiesCount = stories.length;

    const designers = await base('Designers').select().all();
    stats.designersCount = designers.length;

    // Assuming we have these tables or will create them
    try {
      const bookings = await base('BookingRequests').select().all();
      stats.bookingsCount = bookings.length;
    } catch (e) { /* Ignore if table doesn't exist yet */ }

    try {
      const donations = await base('Donations').select().all();
      stats.donationsCount = donations.length;
    } catch (e) { /* Ignore if table doesn't exist yet */ }

    return NextResponse.json(stats);
  } catch (err) {
    console.error("Admin stats fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
