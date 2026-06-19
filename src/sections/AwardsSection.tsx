import { Section } from "@/components/Section";
import type { Awards } from "@/data/types";

interface AwardsSectionProps {
  id?: string;
  awards: Awards;
}

export function AwardsSection({ id = "awards", awards }: AwardsSectionProps) {
  return (
    <Section id={id} comment="Achievements & milestones">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AwardList title="Industry recognition" items={awards.industry} />
        <AwardList title="Personal & team milestones" items={awards.personal} />
      </div>
    </Section>
  );
}

interface AwardListProps {
  title: string;
  items: { title: string; year: string }[];
}

function AwardList({ title, items }: AwardListProps) {
  return (
    <div className="panel p-5">
      <h3 className="text-ink-primary text-sm font-semibold uppercase tracking-wide mb-4 text-center border-b border-bg-border pb-3">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex items-baseline justify-between gap-3 text-sm"
          >
            <span className="text-ink-secondary">{item.title}</span>
            <span className="text-accent shrink-0 font-medium">
              {item.year}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
