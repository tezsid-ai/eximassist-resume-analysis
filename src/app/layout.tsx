import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EximAssist — Resume Analysis",
  description: "AI-powered resume analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-poppins h-full antialiased">
      <body className="min-h-full w-full overflow-x-hidden flex flex-col bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
