import { Section } from "@/components/Section";
import type { WhatIDo } from "@/data/types";
import { motion } from "framer-motion";

interface EducationSectionProps {
  education: any[];
  resumeApi: any;
}

export function EducationSection({
  education,
  resumeApi,
}: EducationSectionProps) {
  const educations = resumeApi?.education?.length
    ? resumeApi?.education
    : education;
  return (
    <Section id="education" comment="The Education">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="space-y-10">
          {educations.map((group: any, index: number) => (
            <div key={index}>
              <h3 className="text-ink-primary font-semibold text-lg">
                {group?.org ?? group.school}
              </h3>
              <p className="text-ink-secondary text-sm flex gap-2 mb-4">
                {group?.title ?? group.degree} |{" "}
                {group?.dates ?? group.graduated}
              </p>
              <div className="text-ink-muted text-sm flex gap-2">
                {group?.bullets?.length
                  ? group.bullets.map((desc: string, index: number) => {
                      return (
                        <div key={index}>
                          <span>{desc}</span>
                        </div>
                      );
                    })
                  : group.description}
              </div>
              {/* <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-ink-secondary text-sm flex gap-2"
                >
                  <span className="text-accent">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul> */}
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
