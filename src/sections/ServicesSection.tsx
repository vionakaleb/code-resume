import { motion } from "framer-motion";
import { SERVICES } from "../data/resume";
import { SectionLabel } from "./AboutSection";

export function ServicesSection() {
  return (
    <section id="services" className="pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SectionLabel label="The Services" />

        <h2 className="text-2xl font-bold text-ink-primary mb-8">
          Service <span className="text-accent italic">I Provide.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-bg-elev border border-bg-border rounded-xl p-5 flex flex-col gap-3 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{service.icon}</span>
                <h3 className="text-sm font-semibold text-ink-primary">
                  {service.title}
                </h3>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
