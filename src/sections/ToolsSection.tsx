import { motion } from "framer-motion";
import { TOOLS } from "../data/resume";
import { SectionLabel } from "./AboutSection";

export function ToolsSection() {
  return (
    <section id="tools" className="pb-16">
      <SectionLabel label="My favorite tools" />

      <h2 className="text-2xl font-bold text-ink-primary mb-8">
        Tools Behind{" "}
        <span className="text-accent">My Code</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="bg-bg-elev border border-bg-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-medium text-ink-primary">{tool.name}</span>
                <span className="ml-2 text-xs text-ink-dim">{tool.category}</span>
              </div>
              <span className="text-xs font-semibold text-accent">{tool.proficiency}%</span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-bg-panel rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${tool.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07 + 0.2, ease: "easeOut" }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
