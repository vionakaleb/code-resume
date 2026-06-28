import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  comment: string;
  children: ReactNode;
  className?: string;
}
//
export function Section({
  id,
  comment,
  children,
  className = "",
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`scroll-mt-20 pb-40 ${className}`}
    >
      <div className="text-sm code-comment mb-6 text-green-800">{`/// ${comment}`}</div>
      {children}
    </motion.section>
  );
}
