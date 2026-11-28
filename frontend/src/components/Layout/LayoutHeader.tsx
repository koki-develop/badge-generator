import React, { memo } from "react";
import Logo from "@/../public/logo.svg";
import Link from "@/components/util/Link";

const LayoutHeader: React.FC = memo(() => {
  return (
    <header className="border-b border-gray-200 py-4 shadow-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <h1 className="inline-block text-2xl font-semibold">
          <Link className="flex items-center" href="/">
            <Logo />
            Badge Generator
          </Link>
        </h1>
      </div>
    </header>
  );
});

LayoutHeader.displayName = "LayoutHeader";

export default LayoutHeader;
