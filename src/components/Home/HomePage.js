import { useLatestQuery } from "@/query/useNovelupQuery";

import InfiniteScroll from "./Latest/InfiniteScroll";
import HomeLoader from "../../Loader/HomeLoader";
import Error from "@/Error/Error";
const HomePage = () => {
  const {
    data,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useLatestQuery();

  if (isLoading) return <HomeLoader />;
  if (isError) return <Error />;

  return (
    <>
      <InfiniteScroll
        data={data.pages}
        fetchNextPage={() => fetchNextPage()}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isFetched={isFetched}
        isFetching={isFetching}
      />
    </>
  );
};

export default HomePage;
