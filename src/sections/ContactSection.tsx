import { useState, type FormEvent } from "react";
import { Section } from "@/components/Section";
import type { ResumeMain } from "@/data/types";
import { motion } from "framer-motion";

interface ContactSectionProps {
  id?: string;
  main: ResumeMain;
}

export function ContactSection({ id = "contact", main }: ContactSectionProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      String(data.get("subject") ?? "Hello Viona"),
    );
    const body = encodeURIComponent(
      `From: ${data.get("firstName")} ${data.get("lastName")} (${data.get("email")})\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${main.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id={id} comment="Get in touch">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="display-font text-4xl md:text-6xl leading-tight mb-6">
              Let's Work <span className="text-ink-dim">Together</span>
            </h2>
            <p className="text-ink-secondary leading-relaxed mb-6">
              Open to interesting conversations. If you're building something
              good, say hi. I respond within a day or two.
            </p>
            <div className="space-y-3 text-sm">
              <ContactLine
                label="Email"
                value={main.email}
                href={`mailto:${main.email}`}
              />
              {main.phone && (
                <ContactLine
                  label="Phone"
                  value={main.phone}
                  href={`tel:${main.phone.replace(/\s/g, "")}`}
                />
              )}
              <ContactLine label="Location" value={main.location} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="panel p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="First name"
                name="firstName"
                placeholder="Viona"
                required
              />
              <Field label="Last name" name="lastName" placeholder="Kaleb" />
            </div>
            <Field
              label="Email address"
              name="email"
              type="email"
              placeholder="you@email.com"
              required
            />
            <Field
              label="Subject"
              name="subject"
              placeholder="Tell me the purpose"
              required
            />
            <div>
              <label className="block text-xs text-ink-secondary mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Write your message here"
                className="w-full bg-bg-base border border-bg-border focus:border-accent rounded px-3 py-2 text-sm text-ink-primary placeholder:text-ink-dim outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-bg-base font-semibold py-3 rounded hover:bg-ink-primary transition-colors"
            >
              {sent ? "Opening your email client" : "Send message"}
            </button>
          </form>
        </div>
      </motion.div>
    </Section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: FieldProps) {
  return (
    <div>
      <label className="block text-xs text-ink-secondary mb-2">
        {label}
        {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full bg-bg-base border border-bg-border focus:border-accent rounded px-3 py-2 text-sm text-ink-primary placeholder:text-ink-dim outline-none transition-colors"
      />
    </div>
  );
}

interface ContactLineProps {
  label: string;
  value: string;
  href?: string;
}

function ContactLine({ label, value, href }: ContactLineProps) {
  const inner = (
    <div className="flex items-baseline gap-3">
      <span className="text-ink-muted w-20 shrink-0">{label}</span>
      <span className="text-ink-primary">{value}</span>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block hover:text-accent transition-colors">
        {inner}
      </a>
    );
  }
  return inner;
}
