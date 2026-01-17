import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MonitorProvider from "@/components/MonitorProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Frontend Watch Dog SDK 测试",
  description: "前端监控 SDK 功能测试项目",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MonitorProvider>{children}</MonitorProvider>
      </body>
    </html>
  );
}
