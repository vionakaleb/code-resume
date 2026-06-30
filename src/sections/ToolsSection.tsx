import { motion } from "framer-motion";
import { TOOLS } from "../data/resume";
import { SectionLabel } from "./AboutSection";

export function ToolsSection({ id = "stack", stack }: any) {
  return (
    <section id="tools" className="pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SectionLabel label="My Tech Stack" />

        <h2 className="text-2xl font-bold text-ink-primary mb-8">
          Tools Behind <span className="text-accent italic">My Code.</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {stack.map((item: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="panel p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-ink-primary font-medium truncate">
                  {item.name}
                </div>
                <div className="text-xs text-ink-muted">{item.level}%</div>
              </div>
              <div className="h-1.5 bg-bg-elev rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + index * 0.04,
                    ease: "easeOut",
                  }}
                  className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
