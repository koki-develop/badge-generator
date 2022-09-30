import React, { memo } from "react";
import Disclosure from "../../util/Disclosure";
import Input from "../../util/Input";

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
          <h3 className="mr-2 font-semibold">{badge.name}</h3>
          <span className="mr-2">
            <img src={badge.src} alt="Badge" />
          </span>
        </div>
      }
    >
      <div className="space-y-1">
        <Input
          className="text-sm"
          label="Markdown"
          fullWidth
          withCopy
          type="text"
          value={`[![${badge.name}](${badge.src})](${badge.link})`}
          disabled
        />
        <Input
          className="text-sm"
          label="HTML"
          fullWidth
          withCopy
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
