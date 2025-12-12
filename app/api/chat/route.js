export const runtime = "nodejs";

// Lightweight instruct model (more likely to run on free serverless)
const MODEL_ID = "Qwen/Qwen2.5-0.5B-Instruct";
const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;

function buildPrompt({ language, messages }) {
  const sysTR =
    "Sen balAgent’sın. Profesyonel, net ve pratiksin. Ana uzmanlığın İHA/drone uçuş eğitimi, güvenlik ve operasyonlardır. Ayrıca iş geliştirme, e-ticaret, SEO ve otomasyon konularında da yardımcı olursun. Türkçe cevap ver.";
  const sysEN =
    "You are balAgent. Professional, clear, and practical. Main expertise: UAV/drone flight training, safety, operations. Also help with business, e-commerce, SEO, and automation. Reply in English.";

  const sys = language === "en" ? sysEN : sysTR;

  const lines = [];
  lines.push(`System: ${sys}`);

  for (const m of messages) {
    if (!m?.role || !m?.content) continue;
    const role =
      m.role === "user" ? "User" :
      m.role === "assistant" ? "Assistant" :
      m.role;
    lines.push(`${role}: ${String(m.content).trim()}`);
  }

  // Ask the model to respond as assistant
  lines.push("Assistant:");
  return lines.join("\n");
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(req) {
  try {
    const { messages = [], language = "tr" } = await req.json();

    const hfKey = process.env.HF_API_KEY;
    if (!hfKey) {
      return Response.json(
        { content: "Hata: HF_API_KEY Vercel'e ekli değil. (Vercel > Settings > Environment Variables)" },
        { status: 500 }
      );
    }

    const prompt = buildPrompt({ language, messages });

    // Retry if the model is loading (common on free tier)
    for (let attempt = 0; attempt < 3; attempt++) {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.6,
            return_full_text: false
          }
        }),
      });

      const data = await r.json().catch(() => null);

      // If model is loading, HF often returns { error: "...loading", estimated_time: N }
      if (!r.ok) {
        const errText = typeof data === "string" ? data : JSON.stringify(data);
        const isLoading =
          (data && typeof data === "object" && String(data.error || "").toLowerCase().includes("loading")) ||
          (typeof errText === "string" && errText.toLowerCase().includes("loading"));

        if (isLoading && attempt < 2) {
          const waitSec = Number(data?.estimated_time || 5);
          await sleep(Math.min(12, Math.max(2, waitSec)) * 1000);
          continue;
        }

        return Response.json(
          { content: `Hata: Hugging Face isteği başarısız. ${errText}` },
          { status: 500 }
        );
      }

      // Typical successful response is an array: [{ generated_text: "..." }]
      const content =
        Array.isArray(data) ? (data[0]?.generated_text ?? "") :
        (data?.generated_text ?? "");

      return Response.json({ content: String(content || "").trim() });
    }

    return Response.json(
      { content: "Hata: Model yükleniyor gibi görünüyor. Birkaç saniye sonra tekrar dene." },
      { status: 500 }
    );
  } catch (e) {
    return Response.json({ content: `Hata: ${String(e)}` }, { status: 500 });
  }
}
