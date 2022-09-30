import React, { memo } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import Disclosure from "../../util/Disclosure";

export type Badge = {
  name: string;
  src: string;
  link: string;
};

export type BadgeBlockProps = {
  badge: Badge;
};

const BadgeBlock: React.FC<BadgeBlockProps> = memo((props) => {
  const { badge } = props;

  return (
    <Disclosure
      button={
        <div className="flex items-center">
          <h3 className="mr-2">{badge.name}</h3>
          <span className="mr-2">
            <img src={badge.src} alt="Badge" />
          </span>
        </div>
      }
    >
      <div>
        <label className="text-xs">Markdown</label>
        <div className="mb-1 flex">
          <button className="rounded-l border border-r-0 p-2 outline-none hover:bg-gray-50 active:bg-gray-100">
            <AiOutlineCopy />
          </button>
          <input
            className="grow rounded-r border px-2 py-1 text-sm outline-none"
            style={{ outline: "none" }}
            type="text"
            value={`[![${badge.name}](${badge.src})](${badge.link})`}
            disabled
          />
        </div>

        <label className="text-xs">HTML</label>
        <div className="flex">
          <button className="rounded-l border border-r-0 p-2 outline-none hover:bg-gray-100 active:bg-gray-200">
            <AiOutlineCopy />
          </button>
          <input
            className="grow rounded-r border px-2 py-1 text-sm outline-none"
            style={{ outline: "none" }}
            type="text"
            value={`<a href="${badge.link}"><img src="${badge.src}" alt="${badge.name}" /></a>`}
            disabled
          />
        </div>
      </div>
    </Disclosure>
  );
});

BadgeBlock.displayName = "BadgeBlock";

export default BadgeBlock;
