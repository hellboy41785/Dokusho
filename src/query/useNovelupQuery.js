import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const fetchLatestData = async ({ page }) => {
  const res = await fetch(`/api/novelup/latest/${page}`);
  const data = res.json();
  return data;
};
const fetchInfoData = async ({ slug }) => {
  const res = await fetch(`/api/novelup/info/${slug}`);
  const data = res.json();
  return data;
};
const fetchSearchData = async ({value}) => {
  const res = await fetch(`/api/novelup/search/${value}`);
  const data = res.json();
  return data;
};

const fetchChapterData = async({ slug, page })=>{
  const res = await fetch(`/api/novelup/chapters/${slug}/${page}`);
  const data = res.json();
  return data;
}
const fetchReadData = async({id})=>{
  const res = await fetch(`/api/novelup/read/${id}`);
  const data = res.json();
  return data;
}
const fetchAllChaptersData = async ({slug})=>{
  const res = await fetch(`/api/novelup/allchapters/${slug}`);
  const data = res.json();
  return data;
} 
export const useLatestQuery = () => {
  return useInfiniteQuery({
    queryKey: ["latest"],
    queryFn: ({ pageParam = 0 }) => fetchLatestData({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length !== 0 ? nextPage : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
export const useInfoQuery = ({ slug }) => {
  return useQuery({
    queryKey: ["novelinfo", slug],
    queryFn: () => fetchInfoData({ slug }),
    staleTime: Infinity,
  });
};
export const useSearchQuery = ({ value }) => {
  return useQuery({
    queryKey: ["searchResult", value],
    queryFn: () => fetchSearchData({ value }),
    staleTime: Infinity,
  });
};
export const useChapterQuery = ({ slug, page }) => {
  return useQuery({
    queryKey: ["chapter", slug,page],
    queryFn: () => fetchChapterData({ slug, page }),
    staleTime: Infinity,
  });
};
export const useReadQuery = ({ id }) => {
  return useQuery({
    queryKey: ["chapter", id],
    queryFn: () => fetchReadData({ id}),
    staleTime: Infinity,
  });
};
export const useAllChaptersQuery = ({ slug }) => {
  return useQuery({
    queryKey: ["allChapters", slug],
    queryFn: () => fetchAllChaptersData({ slug}),
    staleTime: Infinity,
  });
};
