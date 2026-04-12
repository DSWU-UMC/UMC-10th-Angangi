import { useEffect, useState } from "react";

interface UseCustomFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useCustomFetch = <T>(
  url: string | null,
): UseCustomFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setIsLoading(false);
      setError("요청할 주소가 올바르지 않습니다.");
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("데이터를 불러오지 못했습니다.");
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError("데이터를 불러오는 중 문제가 발생했습니다.");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};
