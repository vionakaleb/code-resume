import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "../data/resume";
import { ResumeMain, SocialLink } from "@/data/types";
import { MediumIcon } from "@/components/icons";
import { getYearExperience } from "@/hooks/useLiveTime";
import { Github, GlobeIcon, Linkedin } from "lucide-react";
import { Section } from "@/components/Section";

interface AboutSectionProps {
  id?: string;
  main: ResumeMain;
  resumeApi: any;
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  const start = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return { count, start };
}

function MetricCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, start } = useCountUp(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="text-4xl font-bold text-accent font-mono">
        {count}
        {suffix}
      </span>
      <span className="text-xs text-ink-muted">{label}</span>
    </div>
  );
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-sm text-green-800 code-comment mb-6 flex items-center gap-2">
      <span>{"///"}</span>
      <span>{label}</span>
    </p>
  );
}

export function AboutSection({
  id = "about",
  main,
  resumeApi,
}: AboutSectionProps) {
  return (
    <Section id={id} comment="About Me">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10"
      >
        <div className="relative mb-10 select-none">
          <div className="display-font text-[10vw] xl:text-[110px] leading-none text-bg-elev/100 tracking-tighter">
            SINCE {main.startedWorking}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-ink-muted text-xs">
            //////////////////////
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
          <div>
            <h2 className="display-font text-3xl md:text-5xl text-ink-primary mb-6">
              About <span className="text-ink-dim">Me</span>
            </h2>
            <div className="space-y-4 text-ink-secondary leading-relaxed">
              <p>
                I'm a <span className="code-highlight">Software Engineer</span>{" "}
                with{" "}
                <span className="code-highlight">
                  {getYearExperience(main.startedWorking)} years
                </span>{" "}
                of building digital products at large scale.
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: resumeApi?.summary ?? main.longBio,
                }}
              ></div>
            </div>
          </div>

          <div className="panel p-4 aspect-[1/1] flex flex-col">
            <img
              src={main.image}
              alt={resumeApi?.name ?? main.fullname}
              className="flex-1 rounded bg-gradient-to-br from-accent/30 via-bg-elev to-bg-base flex items-center justify-center text-6xl text-white/80 font-bold"
            />
            <div className="pt-3 text-xs text-ink-muted text-center">
              {resumeApi?.name ?? main.fullname}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12 mt-8 pt-6 border-t border-bg-border">
          <MetricCard
            value={PROFILE.projectsCompleted}
            suffix="+"
            label="Projects Completed"
          />
          <MetricCard
            value={PROFILE.industriesCovered}
            suffix="+"
            label="Industries Covered"
          />
          <MetricCard
            value={getYearExperience(main.startedWorking)}
            suffix="+"
            label="Years of Experience"
          />
        </div>
      </motion.div>
    </Section>
  );
}

export function SocialPill({ social }: { social: SocialLink }) {
  return (
    <a
      href={social?.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex border border-bg-border hover:border-accent text-ink-secondary hover:text-ink-primary px-3 py-1 rounded-full transition-colors"
    >
      {social.name.toLowerCase() === "github" ? (
        <Github className="w-5 h-5 mr-1" />
      ) : social.name.toLowerCase() === "linkedin" ? (
        <Linkedin className="w-5 h-5 mr-1" />
      ) : social.name.toLowerCase() === "medium" ? (
        <MediumIcon className="w-5 h-5 mr-1" />
      ) : social.name.toLowerCase() === "website" ? (
        <GlobeIcon className="w-5 h-5 mr-1" />
      ) : (
        <span className="w-5 h-5 mr-1">Bē</span>
      )}
      {social.name}
    </a>
  );
}
