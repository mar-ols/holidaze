import { useState } from "react";

function useFetch(
  endpoint,
  method = "GET",
  params = null,
  token = null,
  apiKey = null
) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchData = async (body = null, requestMethod = method) => {
    setIsLoading(true);
    setIsError(null);

    const url = params ? `${endpoint}/${params}` : endpoint;

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(apiKey && { "X-Noroff-API-Key": apiKey }),
    };

    const options = {
      method: requestMethod,
      headers,
      ...(body &&
        requestMethod !== "GET" &&
        requestMethod !== "HEAD" && { body: JSON.stringify(body) }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(`${result.errors[0].message}`);
      }

      setData(result);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, fetchData };
}

export { useFetch };
