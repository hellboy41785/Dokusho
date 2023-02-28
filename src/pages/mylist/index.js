/* eslint-disable @next/next/no-img-element */
import { useBookMarkStore } from "@/store/useStore";
// import List from "@/components/MyList/List";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect,useState } from "react";
const List = dynamic(() => import('@/components/MyList/List'), {
  ssr: false
})

const MyList = () => {
  const bookMark = useBookMarkStore((state) => state.bookMark);
  
  const [userList, setUserList] = useState([])
  
  useEffect(()=>{
    setUserList(bookMark)
  },[bookMark])
 
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
        {userList.length === 0 ? (
          <div>
            <h1 className="w-full h-screen text-4xl text-center">No Bookmark</h1>
          </div>
        ) : (
          <List bookMark={userList} />
        )}
      </div>
    </>
  );
};

export default MyList;
