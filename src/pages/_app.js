import Layout from "@/Layout/Layout";
import "@/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import useScrollRestoration from "@/PreserveScroll/usePreserveScroll";

import { useState } from "react";
export default function App({ session, Component, pageProps,router}) {
  const [queryClient] = useState(() => new QueryClient());

  useScrollRestoration(router);

  return (
    <>
      <Head>
        <title>Dokusho | Home</title>
        <meta name="Home" content="Home" />
        <link
          rel="icon"
          type="text/html"
          href="https://img.icons8.com/doodle/96/null/read.png"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
