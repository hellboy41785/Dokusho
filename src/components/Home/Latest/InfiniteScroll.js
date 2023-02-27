import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Fragment } from "react";
import Latest from "./Latest";

const InfiniteScroll = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isFetched,
  isFetching,
}) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">
      <div className="w-full p-4 flex justify-center ">
        <h1 className="btn btn-secondary  max-w-2xl w-full">Latest</h1>
      </div>
      {data.map((page, i) => {
        return (
          <div
            className="grid w-full grid-cols-3 gap-2 p-4 lg:max-w-4xl md:grid-cols-5"
            key={i}
          >
            {page.map((el) => (
              <Fragment key={el.id}>
                <Latest data={el} />
              </Fragment>
            ))}
          </div>
        );
      })}
      <div className="flex items-center justify-center mt-4 btn">
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
};

export default InfiniteScroll;
