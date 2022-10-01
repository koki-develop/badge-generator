import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import "@/styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
