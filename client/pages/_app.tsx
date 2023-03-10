import { ChakraProvider } from "@chakra-ui/react";
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import "katex/dist/katex.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import Script from "next/script";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BitesProvider } from "../contexts/BitesContext";
import { TagsProvider } from "../contexts/TagsContext";
import { UserProvider } from "../contexts/UserContext";
import "../styles/calender.scss";
import "../styles/cmdbar.scss";
import "../styles/editor.scss";
import "../styles/globals.css";
import { theme } from "../theme";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const HOST = "https://wrighterly.vercel.app";
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-3GJH7QG23L`}
      />
      <Script strategy="lazyOnload" id="ga">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-3GJH7QG23L', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      {router.pathname !== "/wright/[slug]" && (
        <Head>
          <meta property="og:image" content={`${HOST}/ogimage.png`} />
          <meta property="og:title" content="wrighterly" />
          <meta
            property="og:description"
            content="Minimal yet powerful writing app"
          />
          <meta property="og:url" content="https://wrighterly.vercel.app" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="wrighterly" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:image:alt" content="wrighterly" />
          <meta name="twitter:creator" content="@tk_vishal_tk" />
          <meta name="twitter:title" content="wrighterly" />
          <meta
            name="twitter:description"
            content="Minimal yet powerful writing app"
          />
          <meta name="twitter:image" content={`${HOST}/ogimage.png`} />
          <meta name="author" content="Vishal TK" />
          <meta name="description" content="Minimal yet powerful writing app" />
        </Head>
      )}
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          {/* <GrainyTexture /> */}
          <UserProvider>
            <TagsProvider>
              <BitesProvider>
                <Component {...pageProps} />
              </BitesProvider>
            </TagsProvider>
          </UserProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
