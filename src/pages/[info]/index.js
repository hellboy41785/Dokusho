import React from "react";
import { useRouter } from "next/router";
import InfoPage from "@/components/Info/InfoPage";
import Head from "next/head";

const Info = () => {
  const router = useRouter();
  if (!router.query.info) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{router.query.info}</title>
        <meta name="Information" content="Information" />
        <link
          rel="icon"
          type="text/html"
          href="https://img.icons8.com/doodle/96/null/read.png"
        />
      </Head>
      <InfoPage slug={router.query.info} />
    </>
  );
};

export default Info;
