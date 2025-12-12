"use client";

import { useRef, useState } from "react";

export default function ChatClient() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Merhaba! Ben balAgent. Sorunu yaz, yardımcı olayım." }
  ]);
  const listRef = useRef(null);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");

    try {
      const language = (navigator.language || "").toLowerCase().startsWith("en") ? "en" : "tr";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, language })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");

      setMessages([...nextMessages, { role: "assistant", content: data.content || "Cevap alınamadı." }]);
    } catch (err) {
      setMessages([...nextMessages, { role: "assistant", content: `Hata: ${err.message || err}` }]);
    }

    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
      <h1>balAgent Chat</h1>

      <div
        ref={listRef}
        style={{
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 12,
          height: 420,
          overflowY: "auto",
          marginBottom: 12
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong>{m.role === "user" ? "Sen" : "balAgent"}:</strong>
            <div style={{ whiteSpace: "pre-wrap" }}>{m.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mesaj yaz..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit">Gönder</button>
      </form>
    </main>
  );
}
