import { Section } from "@/components/Section";
import { LinkedInEmbedCard } from "@/components/LinkedInEmbedCard";
import { linkedinPosts } from "@/data/linkedinPosts";
import { ExternalLinkIcon } from "@/components/icons";
import { motion } from "framer-motion";

interface LinkedInSectionProps {
  id?: string;
}

export function LinkedInSection({ id = "linkedin" }: LinkedInSectionProps) {
  return (
    <Section id={id} comment="LinkedIn featured posts">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="display-font text-3xl md:text-5xl mb-10">
          Featured <span className="text-ink-dim">Posts</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {linkedinPosts.map((post) => (
            <LinkedInEmbedCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-6 text-right">
          <a
            href="https://www.linkedin.com/in/vionakaleb/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-green-800 hover:text-green-400 transition-colors"
          >
            View profile on LinkedIn
            <ExternalLinkIcon />
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
