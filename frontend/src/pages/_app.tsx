import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import "@/styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: router.pathname,
    });
  }, [mounted, router.pathname]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
