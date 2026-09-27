import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
});

export const metadata: Metadata = {
  title: "Tempest",
  description: "0-3hr severe weather nowcasting demo dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jbMono.variable}`}>
      <body className="bg-[#0a0a0a] text-[#ededed] h-screen overflow-hidden font-mono antialiased selection:bg-[#3b82f6] selection:text-white">
        {children}
      </body>
    </html>
  );
}
