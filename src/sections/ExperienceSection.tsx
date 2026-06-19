import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import type { WorkItem } from "@/data/types";

interface ExperienceSectionProps {
  work: WorkItem[];
  id?: string;
}

export function ExperienceSection({ work, id = "experience" }: ExperienceSectionProps) {
  return (
    <Section id={id} comment="Career timeline">
      <div className="relative pl-6 md:pl-10 border-l border-bg-border space-y-10">
        {work.map((item, i) => (
          <motion.article
            key={`${item.company}-${item.years}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative"
          >
            <span className="absolute -left-[33px] md:-left-[41px] top-1.5 w-3 h-3 rounded-full bg-accent border-4 border-bg-base" />
            <div className="flex flex-wrap items-baseline gap-3 mb-1">
              <h3 className="text-ink-primary font-semibold text-lg">{item.company}</h3>
              <span className="text-ink-muted text-sm">{item.title}</span>
            </div>
            <div className="text-xs text-ink-muted mb-3">{item.years}</div>
            <ul className="space-y-2 mb-4">
              {item.descriptions.map((desc) => (
                <li key={desc} className="text-ink-secondary text-sm flex gap-2 leading-relaxed">
                  <span className="text-accent shrink-0">›</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {item.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs text-ink-muted border border-bg-border px-2 py-1 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
