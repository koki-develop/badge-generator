import React, { memo, useMemo } from "react";
import Disclosure from "@/components/util/Disclosure";
import Input from "@/components/util/Input";

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

  const inputs = useMemo(() => {
    return [
      {
        label: "Markdown",
        value: `[![${badge.name}](${badge.src})](${badge.link})`,
      },
      {
        label: "HTML",
        value: `<a href="${badge.link}"><img src="${badge.src}" alt="${badge.name}" /></a>`,
      },
    ];
  }, [badge.link, badge.name, badge.src]);

  return (
    <Disclosure
      button={
        <div className="flex items-center">
          <h3 className="mr-2 font-semibold">{badge.name}</h3>
          <span className="mr-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badge.src} alt="Badge" />
          </span>
        </div>
      }
    >
      <div className="space-y-1">
        {inputs.map((input) => (
          <Input
            key={input.label}
            className="text-sm"
            label={input.label}
            fullWidth
            withCopy
            type="text"
            value={input.value}
            disabled
          />
        ))}
      </div>
    </Disclosure>
  );
});

BadgeBlock.displayName = "BadgeBlock";

export default BadgeBlock;
