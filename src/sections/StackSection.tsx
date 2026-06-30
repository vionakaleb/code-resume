import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import type { StackItem } from "@/data/types";

interface StackSectionProps {
  id?: string;
  stack: StackItem[];
}

export function StackSection({ id = "stack", stack }: StackSectionProps) {
  return (
    <Section id={id} comment="My tech stack">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stack.map((item, i) => (
            <StackTile key={item.name} item={item} index={i} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function StackTile({ item, index }: { item: StackItem; index: number }) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-bg-elev border border-bg-border rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-sm font-medium text-ink-primary">
            {item.name}
          </span>
          <span className="ml-2 text-xs text-ink-dim">{item.type}</span>
        </div>
        <span className="text-xs font-semibold text-accent">{item.level}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-bg-panel rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: index * 0.07 + 0.2,
            ease: "easeOut",
          }}
          className="h-full bg-accent rounded-full"
        />
      </div>
    </motion.div>
  );
}
