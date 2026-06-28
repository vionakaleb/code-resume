import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import type { ResumeMain, TabKey } from "@/data/types";
import { DownloadIcon } from "lucide-react";

interface HeroSectionProps {
  id?: string;
  main: ResumeMain;
  resumeApi: any;
  onTabChange: (tab: TabKey) => void;
  onContactClick: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export function HeroSection({
  id = "hero",
  main,
  resumeApi,
  onTabChange,
  onContactClick,
}: HeroSectionProps) {
  return (
    <Section id={id} comment="Hero section">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="display-font text-5xl md:text-7xl xl:text-8xl leading-[0.95] mb-8"
      >
        <span className="text-ink-primary">{resumeApi.headline}</span>
        <br />
        <span className="text-ink-dim">{resumeApi.name}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-base text-ink-secondary max-w-2xl leading-relaxed mb-6"
      >
        {main.shortBio}
      </motion.p>

      <motion.div {...fadeUp(0.5)} className="flex items-center gap-3">
        <a
          href={main.resumeUrl}
          download
          className="flex items-center justify-between gap-1 px-4 sm:py-3 py-5 border border-ink-dim text-ink-secondary text-xs font-semibold rounded hover:border-ink-muted hover:text-ink-primary transition-colors"
        >
          <span>CV</span>
          <span className="text-ink-muted group-hover:text-accent transition-colors">
            <DownloadIcon height={16} />
          </span>
        </a>
        <a
          href="#work"
          onClick={(e) => onTabChange("work")}
          className="px-4 py-3 border border-ink-dim text-ink-secondary text-xs font-semibold rounded hover:border-ink-muted hover:text-ink-primary transition-colors"
        >
          See Projects
        </a>
        <a
          onClick={onContactClick}
          className="px-4 py-3 bg-accent text-white text-xs font-semibold rounded hover:bg-accent-hover transition-colors"
        >
          Hire Viona
        </a>
      </motion.div>
    </Section>
  );
}
