import { useState } from "react";

/**
 * Custom React hook for fetching API data.
 *
 * @param {string} endpoint - Endpoint for API request
 * @param {string} [method="GET"] - Method for the request ("GET", "POST", "PUT", "DELETE"), request defaults to "GET" if nothing else is specified
 * @param {string|null} [params=null] - Optional parameters to append to the endpoint URL
 * @param {string|null} [token=null] - Optional access token for authorization should the endpoint require it
 * @param {string|null} [apiKey=null] - Optional API key for the `X-Noroff-API-Key` header should the endpoint require it
 *
 * @returns {Object} An object containing these properties:
 * - `data` {any} - The fetched data or `null` if no data is fetched
 * - `isLoading` {boolean} - Value that tells you if the fetch is still happening
 * - `isError` {string|null} - Error message if an error occurs, otherwise `null`
 * - `fetchData` {Function} - A function to initiate the fetch request
 *
 * @function fetchData
 * @param {Object|null} [body=null] - The request body for methods POST or PUT
 * @param {string} [requestMethod=method] - The method for this specific request
 * @param {Object} [query={}] - An object representing query parameters to append to the URL
 * @throws {Error} - If the response is isn't ok, an error is thrown with the message from the API
 *
 * @example
 * const { data, isLoading, isError, fetchData } = useFetch('https://v2.api.noroff.devholidaze/venues?_bookings=true');
 *
 * useEffect(() => {
 *   fetchData();
 * }, []);
 */

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

  const fetchData = async (body = null, requestMethod = method, query = {}) => {
    setIsLoading(true);
    setIsError(null);

    const queryString = Object.keys(query)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join("&");

    const url = params
      ? `${endpoint}/${params}${
          endpoint.includes("?") ? "&" : "?"
        }${queryString}`
      : `${endpoint}${endpoint.includes("?") ? "&" : "?"}${queryString}`;

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
