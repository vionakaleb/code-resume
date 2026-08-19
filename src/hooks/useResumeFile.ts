import { useEffect, useState } from "react";

export type ResumeFileExt = "pdf" | "docx";

export interface ResumeFile {
  url: string;
  ext: ResumeFileExt;
  fileName: string;
}

interface ResumeFileState {
  status: "loading" | "ready" | "error";
  file: ResumeFile | null;
}

const EXT_PRIORITY: ResumeFileExt[] = ["pdf", "docx"];

async function fileExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (!res.ok) return false;
    // SPA hosting (dev server, Netlify/Vercel-style rewrites) serves
    // index.html with a 200 for unmatched paths instead of a 404.
    const contentType = res.headers.get("content-type") ?? "";
    return !contentType.includes("text/html");
  } catch {
    return false;
  }
}

export function useResumeFile(basePath: string): ResumeFileState {
  const [state, setState] = useState<ResumeFileState>({
    status: "loading",
    file: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", file: null });

    (async () => {
      for (const ext of EXT_PRIORITY) {
        const url = `${basePath}.${ext}`;
        if (await fileExists(url)) {
          if (!cancelled) {
            setState({
              status: "ready",
              file: { url, ext, fileName: `${basePath.split("/").pop()}.${ext}` },
            });
          }
          return;
        }
      }
      if (!cancelled) setState({ status: "error", file: null });
    })();

    return () => {
      cancelled = true;
    };
  }, [basePath]);

  return state;
}
