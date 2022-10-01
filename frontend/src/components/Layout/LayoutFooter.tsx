import Link from "next/link";
import React, { memo } from "react";
import { BsGithub } from "react-icons/bs";

const LayoutFooter: React.FC = memo(() => {
  return (
    <footer className="p-4">
      <div className="container mx-auto">
        <ul className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-500">
          <li>
            <p>&copy;2022 Koki Sato</p>
          </li>
          <li>
            <Link href="/privacy">
              <a>プライバシーポリシー</a>
            </Link>
          </li>
          <li>
            <a
              className="text-2xl"
              href="https://github.com/koki-develop/badge-generator"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BsGithub />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
});

LayoutFooter.displayName = "LayoutFooter";

export default LayoutFooter;
