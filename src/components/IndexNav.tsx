import { motion } from "framer-motion";

interface IndexNavProps {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function IndexNav({ items, activeId, onSelect }: IndexNavProps) {
  return (
    <nav className="hidden xl:flex flex-col w-44 shrink-0 pt-12 pl-6 pr-8 sticky top-12 self-start">
      {/* <div
        className="text-ink-secondary text-sm mb-6"
        onClick={() => onSelect("hero")}
      >
        Index
      </div> */}
      <ul className="space-y-3 text-sm">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <motion.div
                  layoutId="index-marker"
                  className="absolute -left-3 top-0 bottom-0 w-[2px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={`text-left transition-colors ${
                  isActive
                    ? "text-ink-primary"
                    : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
