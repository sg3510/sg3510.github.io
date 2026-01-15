import { useState, useEffect } from 'react';

interface UseMarkdownResult {
  content: string;
  loading: boolean;
  error: Error | null;
}

export function useMarkdown(path: string): UseMarkdownResult {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [path]);

  return { content, loading, error };
}
