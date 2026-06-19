import { useEffect, useState } from "react";
import { fetchMediumArticles } from "@/lib/medium";
import type { MediumArticle } from "@/data/types";

interface MediumState {
  articles: MediumArticle[];
  isLoading: boolean;
  error: string | null;
}

export function useMediumArticles(): MediumState {
  const [state, setState] = useState<MediumState>({
    articles: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    fetchMediumArticles()
      .then((articles) => {
        if (cancelled) return;
        setState({ articles, isLoading: false, error: null });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setState({ articles: [], isLoading: false, error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
