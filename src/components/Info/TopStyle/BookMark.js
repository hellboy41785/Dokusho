import { useBookMarkStore } from "@/store/useStore";
import { BookmarkSimple } from "phosphor-react";

const BookMark = ({ data }) => {
  const bookMark = useBookMarkStore((state) => state.bookMark);
  const setBookMark = useBookMarkStore((state) => state.setBookMark);
  const setRemove = useBookMarkStore((state) => state.setRemove);


  const schema = {
    title: data.title,
    id: data.id,
    type: data.type,
    ch: 0,
    img: data.img,
  };
  const myList = bookMark?.find((e) => e.id === data.id)?.id || null;

  return (
    <div className="flex justify-end">
      {myList === null ? (
        <BookmarkSimple
          className="cursor-pointer"
          size={40}
          color="#d9d9d9"
          onClick={() => setBookMark(schema)}
        />
      ) : (
        <BookmarkSimple
          className="cursor-pointer"
          size={40}
          color="#d9d9d9"
          weight="fill"
          onClick={() => setRemove(data.id)}
        />
      )}
    </div>
  );
};

export default BookMark;
