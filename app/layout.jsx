export const metadata = {
  title: "balAgent",
  description: "balAgent MVP"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
