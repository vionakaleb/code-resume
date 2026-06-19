import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/Section";
import { ArrowRightIcon, GridIcon, ListIcon } from "@/components/icons";
import { Loader2 } from "lucide-react";

interface GithubSectionProps {
  id?: string;
}

type ViewMode = "grid" | "list";

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  homepage: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
}

type Status = "loading" | "success" | "error";

const GITHUB_USERNAME = "vionakaleb";
const HIDE_FORKS = true;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=9&sort=updated`;

export function GithubSection({ id = "github" }: GithubSectionProps) {
  const [view, setView] = useState<ViewMode>("grid");

  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchRepos = async () => {
      try {
        const response = await fetch(REPOS_URL, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });

        // The API returns 403 with a JSON body when the rate limit is hit,
        // so a non-ok response is not always a network failure.
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              "GitHub's rate limit was hit (60 requests per hour for unauthenticated calls). Try again in a bit.",
            );
          }
          throw new Error(`GitHub responded with status ${response.status}.`);
        }

        const data: GithubRepo[] = await response.json();

        const visible = data
          .filter((repo) => !repo.archived)
          .filter((repo) => (HIDE_FORKS ? !repo.fork : true))
          .sort((a, b) => {
            // Repos with a real description come first.
            const aHasDesc = a.description?.trim() ? 1 : 0;
            const bHasDesc = b.description?.trim() ? 1 : 0;
            if (aHasDesc !== bHasDesc) {
              return bHasDesc - aHasDesc;
            }

            // Within each group, keep the old tiebreaker: stars, then most recent.
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return (
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
            );
          });

        setRepos(visible);
        setStatus("success");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong.",
        );
        setStatus("error");
      }
    };

    fetchRepos();

    return () => controller.abort();
  }, []);

  return (
    <Section id={id} comment="Featured work">
      <div className="flex items-center justify-between mb-8">
        <div className="text-ink-secondary text-sm">
          Repos(
          <span className="text-ink-primary">
            {repos.length.toString().padStart(2, "0")}
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
        {status === "loading" && (
          <div className="flex items-center justify-center gap-3 text-gray-400 py-12">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading repositories...</span>
          </div>
        )}

        {status === "error" && (
          <div className="max-w-xl mx-auto text-center border border-bg-border text-ink-muted hover:text-ink-secondary rounded-xl p-6">
            <p className="text-gray-300 mb-2">Could not load repositories.</p>
            <p className="text-gray-500 text-sm">{errorMessage}</p>
          </div>
        )}

        {status === "success" && repos.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            No public repositories to show.
          </p>
        )}

        {status === "success" && repos.length > 0 && (
          <>
            {view === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {repos.map((repo, i) => (
                  <RepoCard key={repo.name} repo={repo} index={i} />
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
                {repos.map((repo, i) => (
                  <RepoRow key={repo.name} repo={repo} index={i} />
                ))}
              </motion.div>
            )}
          </>
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

interface RepoCardProps {
  repo: GithubRepo;
  index: number;
}

function RepoCard({ repo, index }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
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
          <div className="text-xs text-accent mb-1">{repo.language}</div>
          <h3 className="text-ink-primary font-semibold text-lg">
            {repo.name}
          </h3>
        </div>
        <span className="text-accent group-hover:translate-x-0.5 transition-transform shrink-0">
          <ArrowRightIcon />
        </span>
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed mb-4">
        {repo.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {repo.topics.map((t) => (
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

function RepoRow({ repo, index }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group flex items-center justify-between gap-4 py-4 hover:bg-bg-panel transition-colors px-2"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-1">
          <h3 className="text-ink-primary font-medium">{repo.name}</h3>
          <span className="text-xs text-accent">{repo.language}</span>
        </div>
        <p className="text-sm text-ink-secondary truncate">
          {repo.description}
        </p>
      </div>
      <div className="hidden md:flex gap-1.5 shrink-0">
        {repo.topics.slice(0, 3).map((t) => (
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
