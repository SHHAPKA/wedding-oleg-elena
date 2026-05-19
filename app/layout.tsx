import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Олег и Елена",
  description: "Свадебное приглашение Олега и Елены",
};

const oldStandard = localFont({
  src: [
    {
      path: "../public/fonts/OldStandard-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OldStandard-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/OldStandard-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-old-standard",
});

const princessDiana = localFont({
  src: "../public/fonts/Princess-Diana.ttf",
  variable: "--font-princess-diana",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${oldStandard.variable} ${princessDiana.variable}`}>{children}</body>
    </html>
  );
}
