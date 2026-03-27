import { Footer } from "@/components/footer";
import { HelpButton } from "@/components/help-button";
import { Navbar } from "@/components/navbar";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <HelpButton />
    </>
  );
}
