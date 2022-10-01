import React, { memo, useCallback, useEffect, useState } from "react";
import BadgeBlock, { Badge } from "@/components/util/BadgeBlock";
import Input from "@/components/util/Input";
import { BadgeStyle } from "@/lib/badge";
import { zennBadgeUrl } from "@/lib/badgeUrl";

const usernameToBadges = (username: string, style: BadgeStyle): Badge[] => {
  const usernameOr = username || "kou_pg_0131";

  return [
    {
      name: "Likes",
      src: zennBadgeUrl({ username: usernameOr, style, type: "likes" }),
      link: `https://zenn.dev/${usernameOr}`,
    },
    {
      name: "Followers",
      src: zennBadgeUrl({ username: usernameOr, style, type: "followers" }),
      link: `https://zenn.dev/${usernameOr}`,
    },
    {
      name: "Articles",
      src: zennBadgeUrl({ username: usernameOr, style, type: "articles" }),
      link: `https://zenn.dev/${usernameOr}`,
    },
    {
      name: "Books",
      src: zennBadgeUrl({ username: usernameOr, style, type: "books" }),
      link: `https://zenn.dev/${usernameOr}?tab=books`,
    },
    {
      name: "Scraps",
      src: zennBadgeUrl({ username: usernameOr, style, type: "scraps" }),
      link: `https://zenn.dev/${usernameOr}?tab=scraps`,
    },
  ];
};

const ZennBadgeBlocks: React.FC = memo(() => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [style, setStyle] = useState<BadgeStyle>("plastic");
  const [badges, setBadges] = useState<Badge[]>([]);

  const handleChangeUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.currentTarget.value);
    },
    []
  );

  const handleChangeStyle = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const style = event.currentTarget.value as BadgeStyle;
      setStyle(style);
      setBadges(usernameToBadges(username, style));
    },
    [username]
  );

  useEffect(() => {
    setMounted(true);
    const badges = usernameToBadges(username, style);

    if (mounted) {
      const timeoutId = setTimeout(() => {
        setBadges(badges);
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setBadges(badges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Zenn</h2>

      <div className="mb-4 space-y-1">
        <Input
          className="text-sm"
          inputClassname="w-full sm:w-1/3 text-base"
          label="ユーザー名"
          placeholder="kou_pg_0131"
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

ZennBadgeBlocks.displayName = "ZennBadgeBlocks";

export default ZennBadgeBlocks;
