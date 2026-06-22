import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/Section";
import { ArrowRightIcon, GridIcon, ListIcon } from "@/components/icons";
import type { ProjectItem } from "@/data/types";

interface ProjectSectionProps {
  id?: string;
  projects: ProjectItem[];
}

type ViewMode = "grid" | "list";

export function ProjectSection({
  id = "project",
  projects,
}: ProjectSectionProps) {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <Section id={id} comment="Featured Projects">
      <div className="flex items-center justify-between mb-8">
        <div className="text-ink-secondary text-sm">
          Projects(
          <span className="text-ink-primary">
            {projects.length.toString().padStart(2, "0")}
          </span>
          )
        </div>
        <div className="flex items-center gap-2">
          <ToggleBtn
            active={view === "grid"}
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <GridIcon />
          </ToggleBtn>
          <ToggleBtn
            active={view === "list"}
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <ListIcon />
          </ToggleBtn>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="divide-y divide-bg-border border-y border-bg-border"
          >
            {projects.map((project, i) => (
              <ProjectRow key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

interface ToggleBtnProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  "aria-label": string;
}

function ToggleBtn({ active, onClick, children, ...rest }: ToggleBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...rest}
      className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
        active
          ? "bg-accent-soft text-accent border border-accent/40"
          : "border border-bg-border text-ink-muted hover:text-ink-secondary"
      }`}
    >
      {children}
    </button>
  );
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="group panel p-5 hover:border-accent/50 transition-colors block"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-xs text-accent mb-1">{project.tag}</div>
          <h3 className="text-ink-primary font-semibold text-lg">
            {project.title}
          </h3>
        </div>
        <span className="text-accent group-hover:translate-x-0.5 transition-transform shrink-0">
          <ArrowRightIcon />
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-lg mb-3">
        <img
          src={`/portfolio/${project.image}`}
          alt={project.title}
          className="h-[230px] max-w-full object-contain shadow-2xl justify-self-center"
        />
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs text-ink-muted border border-bg-border px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function ProjectRow({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group flex items-center justify-between gap-4 py-4 hover:bg-bg-panel transition-colors px-2"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-1">
          <h3 className="text-ink-primary font-medium">{project.title}</h3>
          <span className="text-xs text-accent">{project.tag}</span>
        </div>
        <p className="text-sm text-ink-secondary truncate">
          {project.description}
        </p>
      </div>
      <div className="hidden md:flex gap-1.5 shrink-0">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="text-xs text-ink-muted">
            {t}
          </span>
        ))}
      </div>
      <span className="text-accent group-hover:translate-x-0.5 transition-transform shrink-0">
        <ArrowRightIcon />
      </span>
    </motion.a>
  );
}
