import Error from "@/Error/Error";
import { useChapterQuery } from "@/query/useNovelupQuery";
import Link from "next/link";
import { useBookMarkStore } from "@/store/useStore";
import ChapterLoader from "@/Loader/ChapterLoader";

const ChapterInfo = ({ slug, page }) => {
  const setUpdateChapter = useBookMarkStore((state) => state.setUpdateChapter);
  const bookMark = useBookMarkStore((state) => state.bookMark);

  const { data, isLoading, isError } = useChapterQuery({
    slug: slug,
    page: page,
  });
  if (isLoading) return <ChapterLoader/>;
  if (isError) return <Error />;
  const myList = bookMark?.find((e) => e.id === data.slug)?.ch.chid || null;

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
              <td ></td>
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
                      myList === chap.id && "text-yellow-400"
                    } hover:text-[#5f718d] text-xl`}
                    href={`/read/${slug}/${chap.id}`}
                    onClick={() =>
                      setUpdateChapter(data.slug, {
                        chap: chap.ch,
                        chid: chap.id,
                      })
                    }
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
