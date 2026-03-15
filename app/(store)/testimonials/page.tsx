import { SectionTitle } from "@/components/section-title";
import { TestimonialCard } from "@/components/testimonial-card";
import { getTestimonials } from "@/lib/data-store";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <section className="container-app py-20">
      <SectionTitle badge="Testimoni" title="Apa kata pelanggan kami" description="Semua testimoni ditampilkan untuk membangun kepercayaan calon pembeli." />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => <TestimonialCard key={item.id} testimonial={item} />)}
      </div>
    </section>
  );
}
