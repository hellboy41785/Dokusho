import Error from "@/Error/Error";
import { useAllChaptersQuery } from "@/query/useNovelupQuery";
import Link from "next/link";
import { Books } from "phosphor-react";
import AllChapterLoader from "@/Loader/AllChapterLoader";
import {
  useUpdateBookMarkQuery,
  useBookMarksQuery,
} from "@/query/useBookMarkQuery";

import { useSession } from "next-auth/react";

const SideBar = ({ slug, id }) => {
  const { status } = useSession();
  const { data: bookMarks } = useBookMarksQuery();
  const { mutate: updateBookMark } = useUpdateBookMarkQuery();
  const { data, isLoading, isError } = useAllChaptersQuery({ slug: slug });
  if (isLoading) return <AllChapterLoader />;
  if (isError) return <Error />;

  const myList =
    status === "unauthenticated"
      ? null
      : bookMarks?.find((e) => e.slug === data.slug)?.id || null;

  const handleUpdate = async (value, id) => {
    updateBookMark({
      chId: value.id,
      ch: value.ch,
      id: id,
    });
  };

  return (
    <div className="fixed bottom-0 drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex items-end pb-2 pl-2 drawer-content">
        <label htmlFor="my-drawer" className="p-1 drawer-button btn btn-circle">
          <Books size={40} color="#d9d9d9" />
        </label>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="flex flex-col gap-3 p-4 overflow-y-scroll text-lg w-80 bg-base-100 text-base-content scrollbar">
          {data.chapters.map((chap) => (
            <Link
              href={`/read/${slug}/${chap.id}`}
              className="w-full p-3 rounded-md hover:bg-primary"
              key={chap.id}
              onClick={() => myList !== null && handleUpdate(chap, myList)}
            >
              <p className={`${chap.id === `${id}/` && "text-yellow-300"}`}>
                {chap.ch}
              </p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
