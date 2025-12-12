export const runtime = "nodejs";

const API_URL = "https://router.huggingface.co/hf-inference/models/google/flan-t5-small";

export async function POST(req) {
  try {
    const { messages = [], language = "tr" } = await req.json();

    const hfKey = process.env.HF_API_KEY;
    if (!hfKey) {
      return Response.json({ content: "Hata: HF_API_KEY eksik." }, { status: 500 });
    }

    const lastUserMessage =
      messages.filter(m => m.role === "user").slice(-1)[0]?.content || "";

    const prompt =
      language === "en"
        ? `Answer clearly and briefly:\n${lastUserMessage}`
        : `Net ve kısa cevap ver:\n${lastUserMessage}`;

    const r = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.5
        }
      })
    });

    const data = await r.json().catch(() => null);

    if (!r.ok || !data) {
      return Response.json({
        content: "Ücretsiz AI servisi şu an yanıt vermiyor. Lütfen biraz sonra tekrar deneyin."
      });
    }

    const text =
      Array.isArray(data)
        ? data[0]?.generated_text
        : data.generated_text;

    return Response.json({
      content: text || "Cevap üretilemedi."
    });
  } catch (e) {
    return Response.json({
      content: "AI servisine ulaşılamadı (ücretsiz limit)."
    });
  }
}
