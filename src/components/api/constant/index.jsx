import { useState, useEffect } from "react";

function useFetch(endpoint, params = null, token = null, apiKey = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      const url = params ? `${endpoint}/${params}` : endpoint;

      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(apiKey && { "x-api-key": apiKey }),
      };

      try {
        const response = await fetch(url, { headers });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setData(result);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, params, token, apiKey]);

  return { data, isLoading, isError };
}

export { useFetch };
