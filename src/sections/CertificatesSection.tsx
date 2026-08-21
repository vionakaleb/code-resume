import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/Section";
import { ExternalLinkIcon } from "@/components/icons";
import type { CertificateItem } from "@/data/types";

interface CertificatesSectionProps {
  id?: string;
  certificates: CertificateItem[];
  resumeApi: any;
}

export function CertificatesSection({
  id = "certificates",
  certificates,
  resumeApi,
}: CertificatesSectionProps) {
  const items = resumeApi?.certificates?.length
    ? resumeApi.certificates
    : certificates;

  const [preview, setPreview] = useState<CertificateItem | null>(null);

  if (!items?.length) return null;

  return (
    <Section id={id} comment="My Certificates">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {items.map((cert: CertificateItem, index: number) => (
          <CertificateCard
            key={`${cert.name}-${index}`}
            cert={cert}
            index={index}
            onPreview={() => setPreview(cert)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {preview && (
          <CertificateLightbox
            cert={preview}
            mediaSrc={
              preview.isMedia ? `/certificates/${preview.media}` : preview.media
            }
            onClose={() => setPreview(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

interface CertificateCardProps {
  cert: CertificateItem;
  index: number;
  onPreview: () => void;
}

function CertificateCard({ cert, index, onPreview }: CertificateCardProps) {
  const mediaSrc = cert.isMedia ? `/certificates/${cert.media}` : cert.media;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="panel p-5 flex flex-col gap-4"
    >
      <button
        type="button"
        onClick={onPreview}
        aria-label={`Preview certificate: ${cert.name}`}
        className="group relative w-full h-40 rounded-lg overflow-hidden border border-bg-border bg-slate-200 flex items-center justify-center"
      >
        {mediaSrc ? (
          <img
            src={mediaSrc}
            alt={cert.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 text-transparent group-hover:text-white text-xs font-medium uppercase tracking-wide transition-colors">
          Preview Certificate
        </span>
      </button>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-ink-primary font-semibold text-lg">
            {cert.name}
          </h3>
          <span className="text-accent shrink-0 font-medium text-sm">
            {cert.issueDate}
          </span>
        </div>
        <p className="text-ink-secondary text-sm mt-1">{cert.issuer}</p>

        {cert.credentialId && (
          <p className="text-ink-muted text-xs mt-2">
            Credential ID: {cert.credentialId}
          </p>
        )}

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent text-sm mt-2 hover:underline"
          >
            View Credential
            <ExternalLinkIcon />
          </a>
        )}

        {cert.skills?.length ? (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs text-ink-muted border border-bg-border px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export function CertificateLightbox({
  cert,
  mediaSrc,
  onClose,
}: {
  cert: CertificateItem;
  mediaSrc: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-3xl w-full max-h-[85vh] bg-bg-panel border border-bg-border rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          ✕
        </button>
        {mediaSrc ? (
          <img
            src={mediaSrc}
            alt={cert.name}
            className="w-full max-h-[75vh] object-contain bg-slate-100"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-ink-muted text-sm">
            No preview available
          </div>
        )}
        <div className="p-4">
          <h3 className="text-ink-primary font-semibold">{cert.name}</h3>
          <p className="text-ink-secondary text-sm">{cert.issuer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
