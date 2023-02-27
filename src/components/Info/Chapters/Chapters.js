import { useState } from "react";
import ChapterInfo from "./ChapterInfo";
import { useBookMarkStore } from "@/store/useStore";
import Link from "next/link";
const Chapters = ({ slug, totalPage }) => {
  const bookMark = useBookMarkStore((state) => state.bookMark);
  const [page, setPage] = useState("1");
  const myList = bookMark?.find((e) => e.id === slug)?.ch || null;

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <h1 className="p-4 rounded bg-primary-focus">Chapters</h1>
          { myList !== null && (
            <Link href={`/read/${slug}/${myList.chid}`} className="p-4 rounded bg-primary-focus">
              Reading : {myList.chap}
            </Link>
          )}
        </div>

        <div className="flex flex-col w-1/3 p-4 rounded dropdown dropdown-hover bg-primary-focus">
          <label
            tabIndex={0}
            className="flex items-center justify-center w-full h-full "
          >
            Page : {page} / {totalPage}
          </label>
          <div className="flex justify-center">
            <ul
              tabIndex={0}
              className="grid w-full grid-cols-4 p-2 mt-5 shadow lg:grid-cols-7 dropdown-content menu bg-[#2c3441] rounded-box"
            >
              {[...Array(parseInt(totalPage))].map((_, index) => (
                <li className="flex items-center justify-center" key={index}>
                  <a onClick={() => setPage(index + 1)}>{index + 1}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ChapterInfo slug={slug} page={page} />
    </>
  );
};

export default Chapters;
