import Navbar from "@/components/Navbar";
import LanguageSelector from "@/components/LanguageSelector";
import { LanguageProvider } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">

        <Navbar />

        <div className="flex justify-end px-8 py-3 bg-white">
          <LanguageSelector />
        </div>

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </div>
    </LanguageProvider>
  );
}
