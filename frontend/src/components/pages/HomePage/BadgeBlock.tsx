import React, { memo } from "react";
import Disclosure from "../../util/Disclosure";
import InputWithCopy from "../../util/InputWithCopy";

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
        <InputWithCopy
          className="w-full text-sm"
          type="text"
          value={`[![${badge.name}](${badge.src})](${badge.link})`}
          disabled
        />

        <label className="text-xs">HTML</label>
        <InputWithCopy
          className="w-full text-sm"
          type="text"
          value={`<a href="${badge.link}"><img src="${badge.src}" alt="${badge.name}" /></a>`}
          disabled
        />
      </div>
    </Disclosure>
  );
});

BadgeBlock.displayName = "BadgeBlock";

export default BadgeBlock;
