import Link from "next/link";
import React, { memo } from "react";
import Logo from "@/../public/logo.svg";

const LayoutHeader: React.FC = memo(() => {
  return (
    <header className="border-b p-4 shadow">
      <div className="container mx-auto">
        <h1 className="inline-block text-2xl font-semibold">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
              Badge Generator
            </a>
          </Link>
        </h1>
      </div>
    </header>
  );
});

LayoutHeader.displayName = "LayoutHeader";

export default LayoutHeader;
