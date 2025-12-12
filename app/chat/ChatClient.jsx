"use client";

import { useMemo, useRef, useState } from "react";

export default function ChatClient() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    { role: "assistant", content: "Hi! I’m balAgent. (Chat UI is ready ✅)" }
  ]);

  const listRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  function onSend(e) {
    e.preventDefault();
    if (!canSend) return;

    const text = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: `Echo: ${text}` }
    ]);

    scrollToBottom();
  }

  return (
    <main style={{ fontFamily: "system-ui", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>balAgent Chat</h1>
          <p style={{ margin: "6px 0 0", opacity: 0.7 }}>
            MVP chat screen. Next: connect OpenAI + TR/EN switch.
          </p>
        </div>
        <a href="/" style={{ textDecoration: "none" }}>← Home</a>
      </header>

      <section
        ref={listRef}
        style={{
          marginTop: 16,
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 12,
          height: 420,
          overflow: "auto",
          background: "white"
        }}
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              margin: "10px 0"
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                background: m.role === "user" ? "#f5f5f5" : "white",
                whiteSpace: "pre-wrap"
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>
                {m.role === "user" ? "You" : "balAgent"}
              </div>
              <div>{m.content}</div>
            </div>
          </div>
        ))}
      </section>

      <form onSubmit={onSend} style={{ marginTop: 12, display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          style={{
            flex: 1,
            padding: "12px 12px",
            borderRadius: 12,
            border: "1px solid #e5e5e5",
            outline: "none"
          }}
        />
        <button
          type="submit"
          disabled={!canSend}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #e5e5e5",
            background: canSend ? "black" : "#f0f0f0",
            color: canSend ? "white" : "#888",
            cursor: canSend ? "pointer" : "not-allowed"
          }}
        >
          Send
        </button>
      </form>
    </main>
  );
}
