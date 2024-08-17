import { useState, useEffect } from "react";

type GISTPayload = {
  windows: {
    endpoint: string;
    version: string;
    date: string;
  };
  linux: {
    endpoint: string;
    version: string;
    date: string;
  };
  mac: {
    endpoint: string;
    version: string;
    date: string;
  };
};

const defaultPayload = {
  windows: {
    endpoint: "",
    version: "?",
    date: "?",
  },
  linux: {
    endpoint: "",
    version: "?",
    date: "?",
  },
  mac: {
    endpoint: "",
    version: "?",
    date: "?",
  },
};

const useReleaseData = () => {
  const [data, setData] = useState<GISTPayload>(defaultPayload);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.github.com/gists/dfd1e0c64d4d435c556f1743327f2c96",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const content = JSON.parse(data.files["releasedata.json"].content);
          setData(content);
        } else {
          console.warn("The response is not JSON:", response);
        }
      } catch (error) {
        setError(error);
        console.error("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useReleaseData;

/*
// cache,
import { useState, useEffect } from "react";

type GISTPayload = {
  windows: {
    endpoint: string;
    version: string;
    date: string;
  };
  linux: {
    endpoint: string;
    version: string;
    date: string;
  };
  mac: {
    endpoint: string;
    version: string;
    date: string;
  };
};

const defaultPayload = {
  windows: {
    endpoint: "",
    version: "?",
    date: "?",
  },
  linux: {
    endpoint: "",
    version: "?",
    date: "?",
  },
  mac: {
    endpoint: "",
    version: "?",
    date: "?",
  },
};

const getGistResponse = async () =>
  await fetch("https://api.github.com/gists/dfd1e0c64d4d435c556f1743327f2c96", {
    headers: {
      "Content-Type": "application/json",
    },
  });

// const getGistResponseExperimental = cache(getGistResponse);

const useReleaseData = () => {
  const [data, setData] = useState<GISTPayload>(defaultPayload);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await getGistResponse();

      try {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const content = JSON.parse(data.files["releasedata.json"].content);
          setData(content);
        } else {
          console.warn("The response is not JSON:", response);
        }
      } catch (error) {
        setError(new Error(String(error)));
        console.error("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useReleaseData;

*/
