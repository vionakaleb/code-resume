import { motion } from "framer-motion";

export function WorkTabHeader() {
  return (
    <div className="mb-12">
      <div className="text-sm code-comment mb-6">{`<!-- Work I have done -->`}</div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="display-font text-5xl md:text-7xl xl:text-8xl leading-[0.95]"
      >
        <span className="text-ink-primary">My Project</span>
        <br />
        <span className="text-ink-dim">Showcase</span>
      </motion.h1>
    </div>
  );
}

export function BlogTabHeader() {
  return (
    <div className="mb-12">
      <div className="text-sm code-comment mb-6">{`<!-- Here's what I think -->`}</div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="display-font text-5xl md:text-7xl xl:text-8xl leading-[0.95]"
      >
        <span className="text-ink-primary">My Writing &</span>
        <br />
        <span className="text-ink-dim">Articles</span>
      </motion.h1>
    </div>
  );
}
