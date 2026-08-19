import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { DownloadIcon } from "@/components/icons";
import { useResumeFile } from "@/hooks/useResumeFile";
import type { ResumeMain } from "@/data/types";

interface ResumeSectionProps {
  id?: string;
  main: ResumeMain;
}

export function ResumeSection({ id = "resume", main }: ResumeSectionProps) {
  const resume = useResumeFile(main.resumeBasePath);

  return (
    <Section id={id} comment="Resume Preview">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="panel p-5"
      >
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <div className="text-ink-secondary text-sm">
            {resume.file?.fileName ?? "Resume"}
          </div>
          <a
            href={resume.file?.url}
            download={resume.file?.fileName}
            aria-disabled={!resume.file}
            className={`inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white text-xs font-semibold rounded hover:bg-accent-hover transition-colors ${
              !resume.file ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <DownloadIcon />
            Download Resume
          </a>
        </div>

        <ResumePreview
          status={resume.status}
          url={resume.file?.url}
          ext={resume.file?.ext}
        />
      </motion.div>
    </Section>
  );
}

interface ResumePreviewProps {
  status: "loading" | "ready" | "error";
  url?: string;
  ext?: "pdf" | "docx";
}

function ResumePreview({ status, url, ext }: ResumePreviewProps) {
  if (status === "loading") {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-ink-muted text-sm border border-bg-border rounded-lg">
        Loading resume preview...
      </div>
    );
  }

  if (status === "error" || !url) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-ink-muted text-sm border border-bg-border rounded-lg">
        No resume file found in /public/resume.
      </div>
    );
  }

  if (ext === "pdf") {
    return (
      <iframe
        src={url}
        title="Resume preview"
        className="w-full h-[90vh] rounded-lg border border-bg-border bg-white"
      />
    );
  }

  return <DocxPreview url={url} />;
}

function DocxPreview({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const { renderAsync } = await import("docx-preview");
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch resume file");
        const blob = await res.blob();
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        await renderAsync(blob, containerRef.current, undefined, {
          inWrapper: true,
          ignoreLastRenderedPageBreak: false,
        });
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className="w-full max-h-[90vh] overflow-y-auto rounded-lg border border-bg-border bg-white">
      {status === "error" && (
        <div className="w-full h-[90vh] flex items-center justify-center text-ink-muted text-sm">
          Couldn't render the resume preview.
        </div>
      )}
      <div ref={containerRef} className="docx-preview-container" />
    </div>
  );
}
