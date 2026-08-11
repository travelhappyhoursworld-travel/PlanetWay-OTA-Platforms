import "./globals.css";

export const metadata = {
  title: "PlanetWay",
  description: "PlanetWay Travel Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}