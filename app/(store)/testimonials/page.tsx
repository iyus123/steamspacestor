import { SectionTitle } from "@/components/section-title";
import { TestimonialCard } from "@/components/testimonial-card";
import { getTestimonials } from "@/lib/data-store";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <section className="container-app py-20">
      <SectionTitle badge="Testimoni" title="Apa kata pelanggan SteamSpace" description="Semua testimoni ini bisa kamu edit lewat admin panel lokal." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {testimonials.map((item) => <TestimonialCard key={item.id} testimonial={item} />)}
      </div>
    </section>
  );
}
