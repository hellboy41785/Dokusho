import { BookmarkSimple } from "phosphor-react";

import { useSession, signIn } from "next-auth/react";
import {
  useAddBookMarkQuery,
  useDeleteBookMarkQuery,
  useBookMarksQuery,
} from "@/query/useBookMarkQuery";
import { useRouter } from "next/router";

const BookMark = ({ data }) => {
  const { status } = useSession();
  const router = useRouter()
  const { data: bookMarks, isLoading } = useBookMarksQuery();
  const { mutate: addBookMark, isLoading: addisLoading } =
    useAddBookMarkQuery();
  const { mutate: deleteBookMark, isLoading: deleteisLoading } =
    useDeleteBookMarkQuery();
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
    <div className="flex justify-between items-center">
      <div className="w-4/5 lg:w-3/4 h-14">
        {addisLoading && (
          <div className="alert alert-success shadow-lg ease-in-out">
            <div className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="truncate">{data.title}</span>
            </div>
          </div>
        )}
        {deleteisLoading && (
          <div className="alert alert-error shadow-lg">
            <div className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="truncate">{data.title}</span>
            </div>
          </div>
        )}
      </div>
      <div className="disable">
        {myList === null ? (
          <BookmarkSimple
            className={`${addisLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            size={40}
            color="#d9d9d9"
            onClick={
              status === "unauthenticated"
                ? router.push("/auth/signin")
                : !addisLoading
                ? () => handleBookMark(data)
                : undefined
            }
          />
        ) : (
          <BookmarkSimple
          className={`${deleteisLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            size={40}
            color="#d9d9d9"
            weight="fill"
            onClick={
              !deleteisLoading ? () => deleteBookMark({ id: myList }) : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default BookMark;
