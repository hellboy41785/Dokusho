/* eslint-disable @next/next/no-img-element */

import { useBookMarksQuery } from "@/query/useBookMarkQuery";
import { useSession } from "next-auth/react";

import Head from "next/head";


import Loader from "@/Loader/Loader";
import Error from "@/Error/Error";
import List from "@/components/MyList/List";

const MyList = () => {
  const { status } = useSession();
  const { data, isLoading, isError } = useBookMarksQuery();

  if (isLoading) return <Loader />;
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
          <div>
            <h1 className="w-full h-screen text-4xl text-center">
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
