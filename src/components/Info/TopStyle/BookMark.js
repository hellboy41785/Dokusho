import { BookmarkSimple } from "phosphor-react";

import { useSession, signIn } from "next-auth/react";
import {
  useAddBookMarkQuery,
  useDeleteBookMarkQuery,
  useBookMarksQuery,
} from "@/query/useBookMarkQuery";

const BookMark = ({ data }) => {
  const { status } = useSession();
  const { data: bookMarks, isLoading } = useBookMarksQuery();
  const { mutate: addBookMark } = useAddBookMarkQuery();
  const { mutate: deleteBookMark } = useDeleteBookMarkQuery();
  if (isLoading) return <></>;

  const handleBookMark = async (value) => {
    addBookMark({
      title: value.title,
      type: value.type,
      img: value.img,
      ch: "0",
      chId: "0",
      slug: value.id,
    });
  };
  const myList =
    status === "unauthenticated"
      ? null
      : bookMarks?.find((e) => e.slug === data.id)?.id || null;

  return (
    <div className="flex justify-end">
      {myList === null ? (
        <BookmarkSimple
          className="cursor-pointer"
          size={40}
          color="#d9d9d9"
          onClick={
            status === "unauthenticated" ? signIn : () => handleBookMark(data)
          }
        />
      ) : (
        <BookmarkSimple
          className="cursor-pointer"
          size={40}
          color="#d9d9d9"
          weight="fill"
          onClick={() => deleteBookMark({ id: myList })}
        />
      )}
    </div>
  );
};

export default BookMark;
