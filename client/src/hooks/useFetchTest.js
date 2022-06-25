import { useEffect, useState } from "react";

const useFetch = (url = "", options = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Check if component using this hook is still mounted / to update state varaible
    let isMounted = true;
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setData(data);
          setError(null);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error);
          setData(null);
        }
      })
      .finally(() => isMounted && setLoading(false));

    return () => (isMounted = false);
  }, [url, options]);
  return { error, data, loading };
};

export default useFetch;
