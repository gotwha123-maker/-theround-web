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
    const records = await base('BookingRequests').select({
      sort: [{ field: 'date', direction: 'desc' }]
    }).all();

    const bookings = records.map(r => ({
      id: r.id,
      clientName: r.fields.client_name,
      clientEmail: r.fields.client_email,
      clientPhone: r.fields.client_phone,
      designerName: r.fields.designer_name,
      topic: r.fields.topic,
      date: r.fields.date,
      details: r.fields.details,
      status: r.fields.status || '대기'
    }));

    return NextResponse.json(bookings);
  } catch (err) {
    console.error("Fetch bookings error:", err.message);
    return NextResponse.json([]); // Return empty if table doesn't exist or fails
  }
}
