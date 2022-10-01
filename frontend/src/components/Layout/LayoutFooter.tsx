import React, { memo } from "react";
import { BsGithub } from "react-icons/bs";

const LayoutFooter: React.FC = memo(() => {
  return (
    <footer className="p-4">
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
    </footer>
  );
});

LayoutFooter.displayName = "LayoutFooter";

export default LayoutFooter;
