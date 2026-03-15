import { Star } from "lucide-react";
import { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card p-6">
      <div className="mb-4 flex gap-1 text-amber-400">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="fill-current" size={18} />
        ))}
      </div>
      <p className="text-sm leading-7 text-slate-600">“{testimonial.message}”</p>
      <div className="mt-4">
        <p className="font-semibold text-slate-950">{testimonial.customer_name}</p>
        <p className="text-sm text-slate-500">{testimonial.role}</p>
      </div>
    </div>
  );
}
