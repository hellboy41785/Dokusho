import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

const addBookMark = async ({ title, type, img, ch, chId, slug }) => {
  const { res } = await axios.post("/api/post/bookmark", {
    title,
    type,
    img,
    ch,
    chId,
    slug,
  });

  
};

const deleteBookMark = async ({ id }) => {
  const { res } = await axios.delete("/api/post/bookmark", {
    data: { id: id },
  });

 
};
const updateBookMark = async ({ chId, ch, id }) => {
  const { res } = await axios.put("/api/post/bookmark", {
    chId,
    ch,
    id,
  });
};

const fetchBookMarks = async () => {
  const res = await fetch("/api/post/bookmark");
  const data = res.json();
  return data;
};
// .............Query.....................

export const useAddBookMarkQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookMarks"] });
    },
  });
};
export const useDeleteBookMarkQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookMarks"] });
    },
  });
};
export const useUpdateBookMarkQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookMarks"] });
    },
  });
};

export const useBookMarksQuery = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["bookMarks"],
    queryFn: () => fetchBookMarks(),
    staleTime: Infinity
  });
};
