import Link from "next/link";
import { Suspense } from "react";
import UploadFormSection from "./_components/UploadFormSection";

export default function Home() {
  return (
    <div className="w-full relative min-h-screen flex flex-col bg-[var(--background)] font-poppins overflow-hidden">
      {/* Subtle Blue Blob Backgrounds */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--brand-blue-light)]/30 blur-[120px] -z-10" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[var(--brand-blue-light)]/25 blur-[120px] -z-10" />

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--white)]/85 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity cursor-pointer"
          >
            <img 
              src="/eximassist-logo.png" 
              alt="EximAssist Logo" 
              className="h-8 w-auto object-contain" 
            />
          </Link>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-6 relative z-10">
        <Suspense fallback={
          <div className="w-full max-w-[520px] mx-auto bg-[var(--white)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-md)] text-center text-xs text-[var(--text-muted)] font-medium">
            Loading...
          </div>
        }>
          <UploadFormSection />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--white)] border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-6xl mx-auto px-6">
          <p>© 2026 EximAssist. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
}
