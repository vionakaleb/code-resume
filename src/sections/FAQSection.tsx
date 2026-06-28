import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "../data/resume";
import { SectionLabel } from "./AboutSection";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="pb-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SectionLabel label="The FAQs" />

        <h2 className="text-2xl font-bold text-ink-primary mb-8">
          Questions?{" "}
          <span className="text-accent italic font-normal">Look here.</span>
        </h2>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-bg-elev border border-bg-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-ink-primary pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-ink-muted flex-shrink-0 text-lg leading-none"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-xs text-ink-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
