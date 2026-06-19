import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import type { ResumeMain } from "@/data/types";

interface HeroSectionProps {
  id?: string;
  main: ResumeMain;
}

export function HeroSection({ id = "hero", main }: HeroSectionProps) {
  return (
    <Section id={id} comment="Hero section">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="display-font text-5xl md:text-7xl xl:text-8xl leading-[0.95] mb-8"
      >
        <span className="text-ink-primary">{main.role}</span>
        <br />
        <span className="text-ink-dim">{main.tagline}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-base text-ink-secondary max-w-2xl leading-relaxed"
      >
        {main.shortBio}
      </motion.p>
    </Section>
  );
}
