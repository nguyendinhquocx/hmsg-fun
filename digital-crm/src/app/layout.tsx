import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HMSG Digital CRM",
  description: "Hệ thống quản lý cơ hội kinh doanh HMSG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
