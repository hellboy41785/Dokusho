/* eslint-disable @next/next/no-img-element */
import Error from "@/Error/Error";
import ReadingLoader from "@/Loader/ReadingLoader";
import { useReadQuery } from "@/query/useNovelupQuery";

const ReadChapter = ({ id }) => {
  const { data, isLoading, isError } = useReadQuery({ id: id });
  if (isLoading) return <ReadingLoader/>;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 ">
      <article className="prose lg:prose-2xl">
      <h4>{data.title}</h4>
       <div className="text-xl" dangerouslySetInnerHTML={{ __html: data.content }}  />
      </article>
    </div>
  );
};

export default ReadChapter;
