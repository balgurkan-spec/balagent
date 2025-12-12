export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 24, lineHeight: 1.5 }}>
      <h1>balAgent</h1>
      <p>TR + EN multi-agent AI assistant (MVP).</p>

      <a
        href="/chat"
        style={{
          display: "inline-block",
          marginTop: 12,
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #e5e5e5",
          textDecoration: "none"
        }}
      >
        Open Chat →
      </a>
    </main>
  );
}
