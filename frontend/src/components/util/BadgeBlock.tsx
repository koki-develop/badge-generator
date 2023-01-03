import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Query } from "@/api/api";
import Disclosure from "@/components/util/Disclosure";
import Input from "@/components/util/Input";
import { BadgeStyle } from "@/lib/badge";

export type Badge = {
  name: string;
  buildUrl: (options: Query) => string;
  link: string;
};

export type BadgeBlockProps = {
  badge: Badge;
  username: string;
  style: BadgeStyle;
};

const BadgeBlock: React.FC<BadgeBlockProps> = memo((props) => {
  const { badge, username, style } = props;

  const [label, setLabel] = useState<string>("");
  const [badgeSrc, setBadgeSrc] = useState<string>(
    badge.buildUrl({ username, style, label })
  );

  const inputs = useMemo(() => {
    return [
      {
        label: "Markdown",
        value: `[![${badge.name}](${badgeSrc})](${badge.link})`,
      },
      {
        label: "HTML",
        value: `<a href="${badge.link}"><img src="${badgeSrc}" alt="${badge.name}" /></a>`,
      },
      {
        label: "URL",
        value: badgeSrc,
      },
    ];
  }, [badge.link, badge.name, badgeSrc]);

  const handleChangeLabel = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(event.currentTarget.value);
    },
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBadgeSrc(badge.buildUrl({ username, style, label }));
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badge, label, username]);

  // style の変更だけ即時反映させる
  useEffect(() => {
    setBadgeSrc(badge.buildUrl({ username, style, label }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style]);

  return (
    <Disclosure
      button={
        <div className="flex items-center">
          <h3 className="mr-2 font-semibold">{badge.name}</h3>
          <span className="mr-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badgeSrc} alt="Badge" />
          </span>
        </div>
      }
    >
      <div className="space-y-1 text-sm">
        <Input
          className="mb-4"
          label="ラベル"
          fullWidth
          type="text"
          placeholder={badge.name}
          value={label}
          onChange={handleChangeLabel}
        />

        {inputs.map((input) => (
          <Input
            key={input.label}
            label={input.label}
            fullWidth
            withCopy
            type="text"
            value={input.value}
            readOnly
          />
        ))}
      </div>
    </Disclosure>
  );
});

BadgeBlock.displayName = "BadgeBlock";

export default BadgeBlock;
