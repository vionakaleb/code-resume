import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import type { WorkItem } from "@/data/types";

interface ExperienceSectionProps {
  work: WorkItem[];
  resumeApi: any;
  id?: string;
}

export function ExperienceSection({
  work,
  resumeApi,
  id = "experience",
}: ExperienceSectionProps) {
  const extractSkills = (text: string): string[] => {
    const allSkills = text.split("\n").flatMap((line) => {
      const afterColon = line.split(":")[1];
      if (!afterColon) return [];
      return afterColon
        .replace(/"/g, "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    });

    return [...new Set(allSkills)];
  };

  return (
    <Section id={id} comment="The Careers">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative pl-6 md:pl-[2.2rem] border-l border-bg-border space-y-10">
          {resumeApi.experience.map((item: any, i: number) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative"
            >
              <span className="absolute -left-[33px] md:-left-[41px] top-1.5 w-3 h-3 rounded-full bg-accent border-4 border-bg-base" />
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-ink-primary font-semibold text-lg">
                  {item.org}
                </h3>
                <span className="text-ink-muted text-sm">{item.title}</span>
              </div>
              <div className="text-xs text-ink-muted mb-3">{item.dates}</div>
              <ul className="space-y-2 mb-4">
                {item.bullets.map((desc: string, index: number) => {
                  const hasColon = desc.includes(":");

                  return (
                    <li
                      key={index}
                      className="text-ink-secondary text-sm flex gap-2 leading-relaxed"
                    >
                      {hasColon ? (
                        <div className="flex flex-wrap gap-1.5">
                          {extractSkills(desc).map((s, i) => (
                            <span
                              key={i}
                              className="text-xs text-ink-muted border border-bg-border px-2 py-1 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-ink-secondary text-sm flex gap-2 leading-relaxed">
                          {/* <span className="text-accent shrink-0">›</span> */}
                          <span>{desc}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* <div className="flex flex-wrap gap-1.5">{item.skills}</div> */}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
