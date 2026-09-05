import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1Fi — Shop",
  description: "Shop today, pay later using your mutual funds.",
  applicationName: "1Fi",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "1Fi",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#6C28D9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface-sunken">
        <div className="mx-auto w-full max-w-md min-h-screen bg-surface-sunken flex flex-col shadow-[0_0_40px_rgba(20,18,26,0.06)]">
          {children}
        </div>
      </body>
    </html>
  );
}
