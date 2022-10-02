import React, { memo } from "react";
import { BsGithub } from "react-icons/bs";
import Link from "@/components/util/Link";

const LayoutFooter: React.FC = memo(() => {
  return (
    <footer className="p-4">
      <div className="container mx-auto">
        <ul className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-500">
          <li>
            <p>&copy;2022 Koki Sato</p>
          </li>
          <li>
            <Link href="/privacy">プライバシーポリシー</Link>
          </li>
          <li>
            <Link
              className="text-2xl"
              external
              href="https://github.com/koki-develop/badge-generator"
            >
              <BsGithub />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
});

LayoutFooter.displayName = "LayoutFooter";

export default LayoutFooter;
