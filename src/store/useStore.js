import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useNovelUpStore = create((set) => ({
  slug: [],
  setSlug: (value) => set({ slug: value }),
  searchToggle: false,
  setSearchToggle: () =>
    set((state) => ({ searchToggle: !state.searchToggle })),
}));

export const useBookMarkStore = create(
  persist(
    (set, get) => ({
      bookMark: [],
      setBookMark: (value) =>
        set((state) => ({ bookMark: [value, ...state.bookMark] })),
      setRemove: (value) =>
        set((state) => ({
          bookMark: state.bookMark.filter((bookMark) => bookMark.id !== value),
        })),
      setUpdateChapter: (id,ch) =>
        set((state) => ({
          bookMark: state.bookMark.map((e) => {
            if (e.id === id) {
              return { ...e, ch: ch };
            }
            return { ...e };
          }),  
        })),
    }),
    {
      name: "bookmarks", // unique name // (optional) by default, 'localStorage' is used
    }
  )
);
