import "./globals.css";
import Footer from "@/components/footer";
import HelpButton from "@/components/help-button";
import Navbar from "@/components/navbar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28">
        {children}
      </main>
      <HelpButton />
      <Footer />
    </>
  );
}
