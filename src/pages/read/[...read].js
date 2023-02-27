import { useRouter } from "next/router";
import ReadChapter from "@/components/ReadChapter/ReadChapter";
import SideBar from "@/components/ReadChapter/SideBar";
import Head from "next/head";
const Read = () => {
  const router = useRouter();
  if (!router.query.read) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{router.query.read[0]}</title>
        <meta name="Reading" content="reading" />
        <link
          rel="icon"
          type="text/html"
          href="https://img.icons8.com/doodle/96/null/read.png"
        />
      </Head>
      <ReadChapter id={router.query.read[1]} />
      <SideBar slug={router.query.read[0]} id={router.query.read[1]} />
    </>
  );
};

export default Read;
