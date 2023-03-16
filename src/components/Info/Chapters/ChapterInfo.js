import Error from "@/Error/Error";
import { useChapterQuery } from "@/query/useNovelupQuery";
import {
  useUpdateBookMarkQuery,
  useBookMarksQuery,
} from "@/query/useBookMarkQuery";
import Link from "next/link";
import ChapterLoader from "@/Loader/ChapterLoader";
import { useSession } from "next-auth/react";

const ChapterInfo = ({ slug, page, bookMarks, status }) => {
  const { mutate: updateBookMark } = useUpdateBookMarkQuery();
  const { data, isLoading, isError } = useChapterQuery({
    slug: slug,
    page: page,
  });
  if (isLoading) return <ChapterLoader />;
  if (isError) return <Error />;

  const myList =
    status === "unauthenticated"
      ? null
      : bookMarks?.find((e) => e.slug === data.slug)?.id || null;

  const chapId =
    status === "unauthenticated"
      ? null
      : bookMarks?.find((e) => e.slug === data.slug)?.chId || null;

  const handleUpdate = async (value, id) => {
    updateBookMark({
      chId: value.id,
      ch: value.ch,
      id: id,
    });
  };

  return (
    <>
      <table className="table w-full text-center">
        {/* head */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Group</th>
            <th>Chapter</th>
          </tr>
        </thead>
        <tbody className="">
          {/* row 1 */}
          {data.chapters.length === 0 ? (
            <tr>
              <td></td>
              <td className="p-10 text-2xl">No Chapters</td>
              <td></td>
            </tr>
          ) : (
            data.chapters.map((chap) => (
              <tr key={chap.id}>
                <td>{chap.date}</td>
                <td>{chap.group}</td>
                <td>
                  <Link
                    className={`${
                      chapId === chap.id && "text-yellow-400"
                    } hover:text-[#5f718d] text-xl`}
                    href={`/read/${slug}/${chap.id}`}
                    onClick={() =>
                      myList !== null && handleUpdate(chap, myList)
                    }
                    scroll={false}
                  >
                    {chap.ch}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default ChapterInfo;
