import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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

  const [label, setLabel] = useState<string>("");
  const [badgeSrc, setBadgeSrc] = useState<string>(badge.src);

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
      const url = new URL(badge.src);
      const trimmedLabel = label.trim();
      if (trimmedLabel !== "") {
        url.searchParams.set("label", trimmedLabel);
      }
      setBadgeSrc(url.href);
    }, 250);
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

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
            disabled
          />
        ))}
      </div>
    </Disclosure>
  );
});

BadgeBlock.displayName = "BadgeBlock";

export default BadgeBlock;
