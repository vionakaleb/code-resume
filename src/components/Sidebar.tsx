import { motion } from "framer-motion";
import type { ResumeMain } from "@/data/types";
import {
  BriefcaseIcon,
  MapPinIcon,
  LanguagesIcon,
  MailIcon,
  PhoneIcon,
  DownloadIcon,
  LinkedinIcon,
} from "@/components/icons";
import { getYearExperience } from "@/hooks/useLiveTime";
import { Github, Linkedin } from "lucide-react";

interface SidebarProps {
  main: ResumeMain;
  resumeApi: any;
  isLoading: boolean;
  onContactClick: () => void;
  onWorkClick: () => void;
}

export function Sidebar({
  main,
  resumeApi,
  isLoading,
  onContactClick,
  onWorkClick,
}: SidebarProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col min-w-[340px] min-h-[75vh] items-center justify-center gap-4">
        <div className="flex gap-2 items-center">
          <div
            className="w-2.5 h-2.5 rounded-full bg-accent
    animate-bounce [animation-delay:0ms]"
          ></div>
          <div
            className="w-2.5 h-2.5 rounded-full bg-accent
    animate-bounce [animation-delay:200ms]"
          ></div>
          <div
            className="w-2.5 h-2.5 rounded-full bg-accent
    animate-bounce [animation-delay:400ms]"
          ></div>
        </div>
      </div>
    );
  }
  console.log(resumeApi, "resumeApi");
  return (
    <aside className="hidden lg:flex w-[300px] xl:w-[340px] shrink-0 bg-bg-base border-r border-bg-border flex-col px-6 py-8">
      <div className="text-xs text-ink-muted mb-8">Welcome to my world!</div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4 mb-8"
      >
        <img
          src={main.image}
          alt={main.name}
          className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-accent/20"
        />
        <div>
          <div className="font-semibold text-ink-primary">
            {resumeApi?.name ?? main.name}
          </div>
          <div className="text-sm text-ink-secondary">
            {resumeApi?.headline ?? main.role}
          </div>
        </div>
      </motion.div>

      <p className="text-sm text-ink-secondary leading-relaxed mb-8">
        {main.shortBio}
      </p>

      <div className="space-y-4 text-sm text-ink-secondary mb-8">
        <InfoRow
          icon={<BriefcaseIcon />}
          text={`${getYearExperience(main.startedWorking)}+ YOE`}
        />
        <InfoRow
          icon={<MapPinIcon />}
          text={resumeApi?.location ?? main.location}
        />
        {/* <InfoRow icon={<LanguagesIcon />} text={main.languages} /> */}
        <InfoRow
          icon={<MailIcon />}
          text={resumeApi?.email ?? main.email}
          href={`mailto:${main.email}`}
        />
        {(resumeApi?.phone || main.phone) && (
          <InfoRow icon={<PhoneIcon />} text={resumeApi?.phone ?? main.phone} />
        )}
        {main.social?.find((soc) => soc?.name.toLowerCase() === "linkedin") && (
          <InfoRow
            icon={<Linkedin className="h-4 w-4" />}
            text={
              main.social?.find((soc) => soc?.name.toLowerCase() === "linkedin")
                ?.name ?? ""
            }
            href={
              main.social?.find((soc) => soc?.name.toLowerCase() === "linkedin")
                ?.url
            }
          />
        )}
        {main.social?.find((soc) => soc?.name.toLowerCase() === "github") && (
          <InfoRow
            icon={<Github className="h-4 w-4" />}
            text={
              main.social?.find((soc) => soc?.name.toLowerCase() === "github")
                ?.name ?? ""
            }
            href={
              main.social?.find((soc) => soc?.name.toLowerCase() === "github")
                ?.url
            }
          />
        )}
      </div>

      <a
        href={main.resumeUrl}
        download
        className="inline-flex items-center justify-between gap-2 border border-ink-dim hover:border-accent text-ink-primary text-sm px-4 py-3 rounded-md transition-colors mb-auto group"
      >
        <span>Download CV</span>
        <span className="text-ink-muted group-hover:text-accent transition-colors">
          <DownloadIcon />
        </span>
      </a>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={onWorkClick}
          className="w-full border border-ink-dim hover:border-accent hover:text-accent text-ink-primary text-sm font-medium py-3 rounded-md transition-colors"
        >
          See Projects
        </button>
        <button
          type="button"
          onClick={onContactClick}
          className="w-full bg-accent text-white text-sm font-semibold py-3 rounded-md hover:bg-ink-primary hover:text-accent transition-colors"
        >
          Hire Viona
        </button>
      </div>
    </aside>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
}

function InfoRow({ icon, text, href }: InfoRowProps) {
  const content = (
    <span className="flex items-center gap-3 hover:text-ink-primary transition-colors">
      <span className="text-ink-muted shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </span>
  );
  if (href) {
    return (
      <a href={href} target="_blank" className="block">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}
