import { ExternalLinkIcon } from "@/components/icons";
import { Section } from "@/components/Section";
import type { Testimonial } from "@/data/types";

interface TestimonialsSectionProps {
  id?: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  id = "testimonials",
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <Section id={id} comment="What clients say">
      <div className="relative mb-10 select-none text-center">
        <div className="display-font text-[10vw] xl:text-[110px] leading-none text-bg-elev/60 tracking-tighter">
          WORDS MATTER
        </div>
      </div>

      <h2 className="display-font text-3xl md:text-5xl text-center mb-10">
        Feedback That <span className="text-ink-dim">Fuels Me</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <TestimonialCard key={t.author} testimonial={t} />
        ))}
      </div>

      <div className="mt-6 text-right">
        <a
          href="https://www.linkedin.com/in/vionakaleb/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-green-800 hover:text-green-400 transition-colors"
        >
          View all testimonials on LinkedIn
          <ExternalLinkIcon />
        </a>
      </div>
    </Section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="panel p-6 relative">
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white text-sm font-bold border-4 border-bg-base">
        {testimonial.author[0]}
      </div>
      <p className="text-ink-secondary leading-relaxed mb-4 pl-3">
        "{testimonial.quote}"
      </p>
      <div className="pl-3 text-sm">
        <span className="text-ink-primary font-medium">
          {testimonial.author}
        </span>
        <span className="text-ink-muted">, {testimonial.role} at </span>
        <div className="text-accent">{testimonial.org}</div>
      </div>
    </div>
  );
}
