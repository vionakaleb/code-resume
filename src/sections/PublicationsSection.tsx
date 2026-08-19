import { Section } from "@/components/Section";
import type { PublicationItem } from "@/data/types";
import { motion } from "framer-motion";

interface PublicationsSectionProps {
  id?: string;
  publications: PublicationItem[];
  resumeApi: any;
}

export function PublicationsSection({
  id = "publications",
  publications,
  resumeApi,
}: PublicationsSectionProps) {
  const items = resumeApi?.publications?.length
    ? resumeApi.publications
    : publications;

  if (!items?.length) return null;

  return (
    <Section id={id} comment="My Publications">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-6"
      >
        {items.map((pub: any, index: number) => (
          <div key={index} className="panel p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <h3 className="text-ink-primary font-semibold text-lg">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <span className="text-accent shrink-0 font-medium text-sm">
                {pub.date}
              </span>
            </div>
            <p className="text-ink-secondary text-sm mt-1">
              {pub.publisher}
              {pub.authors?.length ? ` · ${pub.authors.join(", ")}` : ""}
            </p>
            {pub.description && (
              <p className="text-ink-muted text-sm mt-3">
                {pub.description}
              </p>
            )}
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
