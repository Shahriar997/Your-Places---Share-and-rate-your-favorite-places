import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

//useCallback is used so that it never runs again when the component rerenders
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
    //   const HttpAbortController = new AbortController();
      const cancelTokenSource = axios.CancelToken.source();
      activeHttpRequests.current.push(cancelTokenSource);
      try {
        const response = await axios({
          method: method,
          url: url,
          data: body,
          cancelToken: cancelTokenSource.token,
          headers: headers,
        });

        activeHttpRequests.current = activeHttpRequests.current.filter(
            cancelToken => cancelToken !== cancelTokenSource
        );

        setIsLoading(false);
        return response.data;
      } catch (err) {
        setError(
          err.response
            ? err.response.data.message
            : "Something Went Wrong. Please Try Again"
        );
        setIsLoading(false);
        throw err;
      }
    },
    []
  ); // empty array means no dependency

  const clearError = () => {
    setError(null);
  }

  useEffect(() => {
    return () => {
        activeHttpRequests.current.forEach( cancelToken => cancelToken.cancel('Request Canceled because of component unmount'));
    }
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

