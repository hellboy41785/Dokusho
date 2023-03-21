/* eslint-disable @next/next/no-img-element */

import { useBookMarksQuery } from "@/query/useBookMarkQuery";
import { useSession } from "next-auth/react";

import Head from "next/head";

import MyListLoader from "@/Loader/MyListLoader";
import Error from "@/Error/Error";
import List from "@/components/MyList/List";

const MyList = () => {
  const { status } = useSession();
  const { data, isLoading, isError } = useBookMarksQuery();

  if (isLoading) return <MyListLoader/>;
  if (isError) return <Error />;

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
          <h1 className="w-full btn btn-active btn-secondary">My List</h1>
        </div>
        {data?.length === 0 || status === "unauthenticated" ? (
          <div className="flex w-full items-center justify-center h-[600px]">
            <h1 className="text-4xl">
              No Bookmark
            </h1>
          </div>
        ) : (
          <List bookMark={data} />
        )}
      </div>
    </>
  );
};

export default MyList;
