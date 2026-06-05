import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { donorName, donorEmail, amount, type } = body;

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const n8nWebhook = process.env.N8N_WEBHOOK_URL;

    console.log("Donation request received:", body);

    // 1. Send to n8n if webhook is configured (this can trigger automated thank you emails)
    if (n8nWebhook) {
      try {
        await fetch(n8nWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "donation_received", ...body })
        });
        console.log("Sent notification trigger to n8n Webhook");
      } catch (err) {
        console.error("Failed to trigger n8n webhook:", err);
      }
    }

    // 2. Save to Airtable if credentials exist
    if (apiKey && baseId) {
      const url = `https://api.airtable.com/v0/${baseId}/DonationRequests`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            donor_name: donorName,
            donor_email: donorEmail,
            amount: Number(amount) || 10000,
            type: type || "정기후원",
            date: new Date().toISOString().split("T")[0]
          }
        })
      });

      if (!res.ok) {
        console.error("Failed to insert record into Airtable:", await res.text());
      }
    }

    return NextResponse.json({ success: true, message: "Donation logged successfully" });
  } catch (err) {
    console.error("Error in donation API route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
