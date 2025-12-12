export const runtime = "nodejs";

// ✅ 100% offline demo: no API, no keys, no payments.
// Goal: feel like an AI assistant with smart-ish answers & templates.

function trDemoAnswer(text) {
  const t = (text || "").toLowerCase();

  // Quick intent routing (very simple)
  const isGreeting = ["merhaba", "selam", "hi", "hello", "sa"].some(k => t.includes(k));
  const isChecklist = ["checklist", "kontrol", "kontrol list", "liste"].some(k => t.includes(k));
  const isTraining = ["iha", "drone", "uçuş", "ucus", "eğitim", "egitim", "shgm", "sop", "prosedür", "prosedur"].some(k => t.includes(k));
  const isEtsy = ["etsy", "listing", "ürün", "urun", "açıklama", "aciklama", "title", "tag"].some(k => t.includes(k));
  const isSeo = ["seo", "blog", "landing", "metin", "içerik", "icerik"].some(k => t.includes(k));
  const isAutomation = ["otomasyon", "zapier", "make", "workflow", "api"].some(k => t.includes(k));

  if (isGreeting) {
    return `Merhaba! Ben **balAgent (DEMO)**.\n\nŞunlarda çok iyiyim:\n- **İHA/Drone uçuş eğitimi** (checklist, SOP, sınav soruları)\n- İş geliştirme / web içerik\n- Etsy/dijital ürün metinleri\n- Basit otomasyon fikirleri\n\nİstersen “**İHA uçuş öncesi kontrol listesi**” yaz, hemen örnek hazırlayayım.`;
  }

  if (isTraining && isChecklist) {
    return `Aşağıda **İHA / Drone Uçuş Öncesi Kontrol Listesi (DEMO)** var. İstersen marka/model ve uçuş senaryosuna göre özelleştiririm.\n\n## 1) Saha / Çevre\n- Uçuş alanı izinleri ve NOTAM/yerel kısıt kontrol\n- İnsan/araç yoğunluğu, engeller, rüzgar yönü\n- Kalkış/iniş alanı güvenliği (5–10 m güvenli alan)\n\n## 2) Hava Durumu\n- Rüzgar: limitler içinde mi?\n- Yağış / sis / görüş: güvenli mi?\n- Sıcaklık: batarya performansı etkisi\n\n## 3) Ekipman\n- Pervaneler: çatlak/gevşeklik yok\n- Gövde: hasar yok\n- Gimbal/kamera: sabit ve temiz\n- Kumanda: pil dolu\n- Batarya: şişme/hasar yok, %80+ önerilir\n\n## 4) Yazılım / Ayarlar\n- Firmware/uygulama güncel mi?\n- Home point doğru mu?\n- RTH yüksekliği uygun mu?\n- Compass/IMU uyarısı var mı?\n\n## 5) Uçuş Planı\n- Görev amacı net mi? (çekim / eğitim / keşif)\n- Maks irtifa / mesafe sınırları\n- Acil durum planı: RTH, iniş noktası\n\nİstersen bunu **Word/PDF şablonu** gibi de formatlayabilirim.`;
  }

  if (isTraining) {
    return `**İHA/Drone Uçuş Eğitimi (DEMO)** için hızlı bir yol haritası:\n\n## A) Temel Bilgi (1–2 gün)\n- İHA bileşenleri, uçuş mantığı, kumanda hakimiyeti\n- Güvenlik ve risk yönetimi\n\n## B) Uygulama (2–5 gün)\n- Stabil hover, yön kontrolü, 8 çizme\n- Kalkış/iniş prosedürü\n- RTH ve failsafe senaryoları\n\n## C) Operasyon (1–2 gün)\n- Görev planlama\n- Check-list ve SOP kullanımı\n- Olay/incident raporlama\n\nBana şu 3 bilgiyi ver, sana **tam müfredat + süre + sınav soruları** çıkarayım:\n1) Başlangıç mı ileri mi?\n2) Kullanılan drone modeli?\n3) Amaç: eğitim / çekim / endüstriyel?`;
  }

  if (isEtsy) {
    return `Etsy için (DEMO) hızlı şablon:\n\n## Başlık (Title)\n- “Drone Pilot Training Printable Pack | 40 Pages | Instant Download | SHGM-Compatible”\n\n## Kısa Açıklama\n- “Anında indirilebilir PDF + DOCX. Başlangıç seviyesine uygun, pratik checklist ve not sayfaları.”\n\n## Madde Madde İçerik\n- 40 sayfa\n- Uçuş öncesi checklist\n- Güvenlik notları\n- Eğitim takip çizelgesi\n\nİstersen ürün adını ve sayfa sayısını yaz, sana **tam Etsy listing** (title+tags+description) hazır vereyim.`;
  }

  if (isSeo) {
    return `SEO içerik (DEMO) için bana hedefi söyle:\n- Sayfa türü: Anasayfa / Landing / Blog\n- Hedef ülke/dil: TR / EN\n- Ana anahtar kelime\n\nÖrnek blog başlıkları:\n1) “İHA Uçuş Öncesi Kontrol Listesi: 25 Maddelik Rehber”\n2) “Drone Uçuş Güvenliği: Yeni Başlayanlar İçin 10 Altın Kural”\n3) “RTH Nedir? Ne Zaman Kullanılır?”`;
  }

  if (isAutomation) {
    return `Otomasyon (DEMO) fikri:\n\n- Form dolduran müşteriyi otomatik CRM’e ekleme\n- Ödeme sonrası otomatik e-posta + dijital dosya teslimi\n- “Yeni ilan” yayınlanınca sosyal medyaya otomatik post\n\nHangi sistemi kullanıyorsun? (Google Sheets / Airtable / WordPress / Shopify vs.)`;
  }

  // Default demo response
  return `Ben **balAgent (DEMO)**.\n\nMesajını aldım: “${text}”\n\nŞunlardan hangisini istersin?\n1) İHA uçuş eğitimi planı\n2) Uçuş öncesi/sonrası checklist\n3) Eğitim sertifikası metni\n4) Web/SEO içerik\n5) Etsy listing\n\nBirini yaz, ona göre hemen şablon hazırlayayım.`;
}

function enDemoAnswer(text) {
  const t = (text || "").toLowerCase();

  if (["hi", "hello", "hey"].some(k => t.includes(k))) {
    return `Hi! I’m **balAgent (DEMO)**.\n\nI can help with:\n- **UAV/Drone flight training** (checklists, SOPs, quizzes)\n- Business & website copy\n- Etsy/digital product listings\n- Automation ideas\n\nTry: “pre-flight checklist for drone training”.`;
  }

  return `I’m **balAgent (DEMO)**.\n\nI received: “${text}”\n\nPick one:\n1) Drone training plan\n2) Pre-flight checklist\n3) Certificate text\n4) Website/SEO copy\n5) Etsy listing\n\nType a number and I’ll generate a template.`;
}

export async function POST(req) {
  try {
    const { messages = [], language = "tr" } = await req.json();

    const lastUser =
      messages.filter((m) => m?.role === "user").slice(-1)[0]?.content || "";

    const content = (language || "tr").toLowerCase().startsWith("en")
      ? enDemoAnswer(lastUser)
      : trDemoAnswer(lastUser);

    return Response.json({ content });
  } catch (e) {
    return Response.json({ content: "Demo servis hatası. Lütfen tekrar deneyin." }, { status: 200 });
  }
}
