import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { ClientFeatures } from "@/components/common/ClientFeatures";
import { FloatingWhatsAppWidget } from "@/components/common/FloatingWhatsAppWidget";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ClientFeatures />
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <FloatingWhatsAppWidget />
    </div>
  );
}
