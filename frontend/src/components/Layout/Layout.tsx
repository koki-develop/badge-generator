import Link from "next/link";
import React, { memo } from "react";
import { BsGithub } from "react-icons/bs";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = memo((props) => {
  const { children } = props;

  return (
    <div className="min-h-screen py-4">
      <div className="px-4">
        <div className="container mx-auto">
          <Link href="/">
            <a>
              <h1 className="inline-block text-2xl font-semibold">
                Badge Generator
              </h1>
            </a>
          </Link>
        </div>
      </div>

      <main className="mb-4 px-4">
        <div className="container mx-auto">{children}</div>
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
});

Layout.displayName = "Layout";

export default Layout;
