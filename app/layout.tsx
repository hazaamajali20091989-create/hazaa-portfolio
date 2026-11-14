import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const font = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "هزاع المجالي — سيرة ذاتية بُنيت ولم تُكتب",
  description: "هزاع المجالي، طالب توجيهي من عمّان، شغوف بالذكاء الاصطناعي وبايثون. يبحث عن فرصة تدريب.",
  openGraph: { title: "هزاع المجالي", description: "سيرة ذاتية بُنيت ولم تُكتب.", locale: "ar_JO", type: "website" },
};

export const viewport: Viewport = { themeColor: "#050816", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={font.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
