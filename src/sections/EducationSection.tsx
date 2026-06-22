import { Section } from "@/components/Section";
import type { WhatIDo } from "@/data/types";

interface EducationSectionProps {
  education: any[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <Section id="education" comment="My Education">
      <div className="space-y-10">
        {education.map((group) => (
          <div key={group.degree}>
            <h3 className="text-ink-primary font-semibold text-lg">
              {group.school}
            </h3>
            <p className="text-ink-secondary text-sm flex gap-2 mb-4">
              {group.degree} | {group.graduated}
            </p>
            <p className="text-ink-muted text-sm flex gap-2">
              {group.description}
            </p>
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
    </Section>
  );
}
