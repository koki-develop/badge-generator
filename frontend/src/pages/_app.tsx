import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="min-h-screen py-4">
      <Head>
        <title>Badge Generator</title>
      </Head>

      <div className="px-4">
        <div className="container mx-auto">
          <Link href="/">
            <a>
              <h1 className="text-2xl font-semibold">Badge Generator</h1>
            </a>
          </Link>
        </div>
      </div>

      <main className="mb-4 px-4">
        <div className="container mx-auto">
          <Component {...pageProps} />
        </div>
      </main>

      <div className="px-4">
        <div className="container mx-auto flex flex-col items-center justify-center text-gray-500">
          <div className="mb-2">
            <p>&copy;2022 Koki Sato</p>
          </div>
          <div>
            <a
              className="text-2xl"
              href="https://github.com/koki-develop/badge-generator"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApp;
