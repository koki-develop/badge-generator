import React, { memo, useCallback, useEffect, useState } from "react";
import BadgeBlock, { Badge } from "@/components/util/BadgeBlock";
import Input from "@/components/util/Input";
import { BadgeStyle } from "@/lib/badge";

export type BadgeBlocksProps = {
  title: string;
  defaultUsername: string;
  usernameToBadges: (username: string, style: BadgeStyle) => Badge[];
};

const BadgeBlocks: React.FC<BadgeBlocksProps> = memo((props) => {
  const { title, defaultUsername, usernameToBadges } = props;

  const [username, setUsername] = useState<string>("");
  const [style, setStyle] = useState<BadgeStyle>(BadgeStyle.plastic);
  const [badges, setBadges] = useState<Badge[]>(
    usernameToBadges(defaultUsername, style)
  );

  const handleChangeUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.currentTarget.value);
    },
    []
  );

  const handleChangeStyle = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const style = event.currentTarget.value as BadgeStyle;
      const badges = usernameToBadges(
        username.trim() || defaultUsername,
        style
      );
      setStyle(style);
      setBadges(badges);
    },
    [defaultUsername, username, usernameToBadges]
  );

  useEffect(() => {
    const badges = usernameToBadges(username.trim() || defaultUsername, style);

    const timeoutId = setTimeout(() => {
      setBadges(badges);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [defaultUsername, style, username, usernameToBadges]);

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>

      <div className="mb-4 space-y-1">
        <Input
          className="text-sm"
          inputClassname="w-full sm:w-1/3 text-base"
          label="ユーザー名"
          placeholder={defaultUsername}
          type="text"
          value={username}
          onChange={handleChangeUsername}
        />

        <Input
          className="text-sm"
          inputClassname="w-full sm:w-1/3 text-base"
          label="スタイル"
          type="select"
          options={Object.values(BadgeStyle).map((style) => ({
            text: style,
            value: style,
          }))}
          value={style}
          onChange={handleChangeStyle}
        />
      </div>

      {badges.map((badge) => (
        <div key={badge.name} className="mb-2">
          <BadgeBlock badge={badge} />
        </div>
      ))}
    </div>
  );
});

BadgeBlocks.displayName = "BadgeBlocks";

export default BadgeBlocks;
