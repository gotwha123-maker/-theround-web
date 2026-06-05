import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { clientOrg, clientName, clientContact, designerName, target, topic, date, time, budget, details } = body;

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const n8nWebhook = process.env.N8N_WEBHOOK_URL;

    console.log("Lecture booking request received:", body);

    // Format details to include all specialized fields
    const finalDetails = `
[기본 정보]
- 기관/단체명: ${clientOrg}
- 신청자 성함: ${clientName}
- 연락처/이메일: ${clientContact}

[강연 상세]
- 교육 대상: ${target}
- 핵심 주제: ${topic}
- 희망 일정: ${date} (${time})
- 예산 범위: ${budget}

[추가 요청사항]
${details || "없음"}
`.trim();

    // 1. Send to n8n if webhook is configured
    if (n8nWebhook) {
      try {
        await fetch(n8nWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "lecture_booking", ...body, formattedDetails: finalDetails })
        });
        console.log("Sent notification trigger to n8n Webhook");
      } catch (err) {
        console.error("Failed to trigger n8n webhook:", err);
      }
    }

    // 2. Save to Airtable if credentials exist
    if (apiKey && baseId) {
      const url = `https://api.airtable.com/v0/${baseId}/BookingRequests`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            client_name: `${clientOrg} / ${clientName}`,
            client_email: clientContact,
            client_phone: clientContact,
            designer_name: designerName || "추천 희망",
            topic: topic,
            date: date,
            details: finalDetails,
            status: "대기"
          }
        })
      });

      if (!res.ok) {
        console.error("Failed to insert record into Airtable:", await res.text());
      }
    }

    return NextResponse.json({ success: true, message: "Booking saved successfully" });
  } catch (err) {
    console.error("Error in booking API route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
