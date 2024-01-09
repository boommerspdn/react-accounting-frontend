import qs from "qs";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchContent = async (
  path: string,
  query: object | null | undefined
) => {
  let q = "";
  if (typeof query === "object") {
    q = qs.stringify(query);
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}?${q}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const fetchMultipleContent = async () => {
  const [comment, post] = await Promise.all([
    fetcher(`${import.meta.env.VITE_API_URL}/comments`),
    fetcher(`${import.meta.env.VITE_API_URL}/posts`),
  ]);

  return { comment, post };
};

export const useSWRFetch = <T>(
  url: string,
  query: object | null | undefined
) => {
  let q = "";
  if (typeof query === "object") {
    q = qs.stringify(query);
  }

  const { data, error, isLoading } = useSWR<T>(
    `${import.meta.env.VITE_API_URL}${url}?${q}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};

export const fetchLayout = async () => {
  const [navbar, services, footer, socials] = await Promise.all([
    fetcher(
      `${import.meta.env.VITE_API_URL}/api/accounting-navigation-bar?populate=*`
    ),
    fetcher(
      `${
        import.meta.env.VITE_API_URL
      }/api/accounting-services?fields[0]=name&fields[1]=slug`
    ),
    fetcher(`${import.meta.env.VITE_API_URL}/api/accounting-footer?populate=*`),
    fetcher(`${import.meta.env.VITE_API_URL}/api/accounting-social-networks?populate=*`),
  ]);

  return { navbar, services, footer, socials };
};
