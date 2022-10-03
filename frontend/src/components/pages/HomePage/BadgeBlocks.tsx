import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { GoLinkExternal } from "react-icons/go";
import * as Scroll from "react-scroll";
import BadgeBlock, { Badge } from "@/components/util/BadgeBlock";
import Input from "@/components/util/Input";
import Link from "@/components/util/Link";
import { BadgeStyle } from "@/lib/badge";

export type BadgeBlocksProps = {
  title: string;
  serviceUrl: string;
  defaultUsername: string;
  usernameToBadges: (username: string) => Badge[];
};

const BadgeBlocks: React.FC<BadgeBlocksProps> = memo((props) => {
  const { title, serviceUrl, defaultUsername, usernameToBadges } = props;

  const [username, setUsername] = useState<string>("");
  const [style, setStyle] = useState<BadgeStyle>(BadgeStyle.plastic);
  const [badges, setBadges] = useState<Badge[]>(
    usernameToBadges(defaultUsername)
  );

  const handleChangeUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.currentTarget.value);
    },
    []
  );

  const handleChangeStyle = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setStyle(event.currentTarget.value as BadgeStyle);
    },
    []
  );

  const badgeUsername = useMemo(() => {
    return username.trim() || defaultUsername;
  }, [defaultUsername, username]);

  useEffect(() => {
    setBadges(usernameToBadges(badgeUsername));
  }, [badgeUsername, usernameToBadges]);

  return (
    <div>
      <Scroll.Element name={title} />
      <h2 className="mb-2 inline-block font-semibold">
        <Link
          className="flex items-center space-x-1"
          external
          href={serviceUrl}
        >
          <span className="text-2xl">{title}</span>
          <GoLinkExternal />
        </Link>
      </h2>

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
          <BadgeBlock username={badgeUsername} style={style} badge={badge} />
        </div>
      ))}
    </div>
  );
});

BadgeBlocks.displayName = "BadgeBlocks";

export default BadgeBlocks;
