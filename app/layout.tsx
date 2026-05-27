import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DMTT & GIR Visualizer | OECD Pillar Two Global Tracker",
  description: "Interactive visualization of DMTT (Domestic Minimum Top-up Tax) and Globe Information Return (GIR) implementation status across OECD and G20 jurisdictions.",
  keywords: ["DMTT", "GIR", "OECD", "Pillar Two", "Global Minimum Tax", "GloBE", "UTPR", "IIR"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body
        className="min-h-full flex flex-col"
        style={{ background: "#020817", color: "#f1f5f9" }}
      >
        {children}
      </body>
    </html>
  );
}
