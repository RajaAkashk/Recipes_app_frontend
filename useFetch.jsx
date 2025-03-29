import { useEffect, useState } from "react";

function useFetch(url, initialValue) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("error: ", error))
      .finally(() => setLoading(false));
  }, [url]);
  return { loading, error, data };
}

export default useFetch;
