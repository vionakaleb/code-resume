import { Section } from "@/components/Section";
import type { WhatIDo } from "@/data/types";

interface EducationSectionProps {
  education: any[];
  resumeApi: any;
}

export function EducationSection({
  education,
  resumeApi,
}: EducationSectionProps) {
  return (
    <Section id="education" comment="My Education">
      <div className="space-y-10">
        {resumeApi.education.map((group: any, index: number) => (
          <div key={index}>
            <h3 className="text-ink-primary font-semibold text-lg">
              {group.org}
            </h3>
            <p className="text-ink-secondary text-sm flex gap-2 mb-4">
              {group.title} | {group.dates}
            </p>
            <p className="text-ink-muted text-sm flex gap-2">
              {group.bullets.map((desc: string, index: number) => {
                return (
                  <div key={index}>
                    <span>{desc}</span>
                  </div>
                );
              })}
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
