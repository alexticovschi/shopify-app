import App from "next/app";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
// import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Test App</title>
        <meta charSet="utf-8" />
        {/* <link
          rel="stylesheet"
          href="https://sdks.shopifycdn.com/polaris/5.1.0/polaris.min.css"
        /> */}
      </Head>
      <AppProvider i18n={"translations"}>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
