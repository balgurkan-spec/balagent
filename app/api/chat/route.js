export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { messages, language = "tr" } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY is missing in Vercel environment variables." },
        { status: 500 }
      );
    }

    const system = language === "en"
      ? "You are balAgent. Be clear, practical, and professional. Default focus: UAV/drone flight training. If user asks outside this, still help with business, e-commerce, SEO, and automation. Reply in English."
      : "Sen balAgent’sın. Net, pratik ve profesyonel ol. Varsayılan uzmanlığın İHA/drone uçuş eğitimi. Kullanıcı başka konu sorarsa (iş, e-ticaret, SEO, otomasyon) yine yardımcı ol. Türkçe cevap ver.";

    const payload = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: system },
        ...(Array.isArray(messages) ? messages : [])
      ],
      temperature: 0.6
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const txt = await r.text();
      return Response.json({ error: txt }, { status: 500 });
    }

    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content ?? "";

    return Response.json({ content });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
