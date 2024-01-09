import qs from "qs";

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
    fetch(`${import.meta.env.VITE_API_URL}/comments`).then(res => res.json()),
    fetch(`${import.meta.env.VITE_API_URL}/posts`).then(res => res.json()),
  ]);

  return { comment, post };    
}
