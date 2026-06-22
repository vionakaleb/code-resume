import { MediumIcon } from "@/components/icons";
import { Section } from "@/components/Section";
import type { ResumeMain, SocialLink } from "@/data/types";
import { getYearExperience } from "@/hooks/useLiveTime";
import { Github, Linkedin } from "lucide-react";

interface AboutSectionProps {
  id?: string;
  main: ResumeMain;
}

export function AboutSection({ id = "about", main }: AboutSectionProps) {
  return (
    <Section id={id} comment="About me section">
      <div className="relative mb-10 select-none">
        <div className="display-font text-[12vw] xl:text-[160px] leading-none text-bg-elev/100 tracking-tighter">
          SINCE 2018
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
            <div dangerouslySetInnerHTML={{ __html: main.longBio }}></div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-ink-muted">Find me:</span>
            {main.social.map((s) => (
              <SocialPill key={s.name} social={s} />
            ))}
          </div>
        </div>

        <div className="panel p-4 aspect-[1/1] flex flex-col">
          <img
            src={main.image}
            alt={main.name}
            className="flex-1 rounded bg-gradient-to-br from-accent/30 via-bg-elev to-bg-base flex items-center justify-center text-6xl text-white/80 font-bold"
          />
          <div className="pt-3 text-xs text-ink-muted text-center">
            {main.fullname}
          </div>
        </div>
      </div>
    </Section>
  );
}

function SocialPill({ social }: { social: SocialLink }) {
  return (
    <a
      href={social.url}
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
      ) : (
        <span className="w-5 h-5 mr-1">Bē</span>
      )}
      {social.name}
    </a>
  );
}
