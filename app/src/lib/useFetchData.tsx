import { useState, useEffect } from "react";

interface FetchOptions {
  method?: string;
  body?: any;
}

function useFetchData(url: string, options?: FetchOptions) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const fetchOptions: RequestInit = {
        method: options?.method || "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (options?.method === "POST" && options.body) {
        fetchOptions.body = JSON.stringify(options.body);
      }

      try {
        const response = await fetch(url, fetchOptions);
        const result = await response.json();
        setData(result);
      } catch (err:any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
}

export default useFetchData;
