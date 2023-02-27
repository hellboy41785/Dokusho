/* eslint-disable @next/next/no-img-element */
import { useBookMarkStore } from "@/store/useStore";
import List from "@/components/MyList/List";
import Head from "next/head";

const MyList = () => {
  const bookMark = useBookMarkStore((state) => state.bookMark);
  return (
    <>
      <Head>
        <title>MyList</title>
        <meta name="MyList" content="mylist" />
        <link
          rel="icon"
          type="text/html"
          href="https://img.icons8.com/doodle/96/null/read.png"
        />
      </Head>
      <div>
        <div className="w-full p-4">
          <h1 className="btn btn-active btn-secondary  w-full">My List</h1>
        </div>
        {bookMark.length === 0 ? (
          <div>
            <h1>No Bookmark</h1>
          </div>
        ) : (
          <List bookMark={bookMark} />
        )}
      </div>
    </>
  );
};

export default MyList;
