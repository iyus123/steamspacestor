import { SectionTitle } from "@/components/section-title";
import { TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/lib/dummy-data";

export default function TestimonialsPage() {
  return (
    <section className="container-app py-20">
      <SectionTitle badge="Ulasan Pembeli" title="Apa kata pelanggan" description="Bangun rasa percaya dengan menampilkan testimoni terbaik di website katalog Anda." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} testimonial={item} />
        ))}
      </div>
    </section>
  );
}
