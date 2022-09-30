import React, { memo, useCallback, useEffect, useState } from "react";
import { BadgeStyle } from "../../../lib/badge";
import { qiitaBadgeUrl } from "../../../lib/badgeUrl";
import Input from "../../util/Input";
import BadgeBlock, { Badge } from "../../util/BadgeBlock";

const usernameToBadges = (username: string, style: BadgeStyle): Badge[] => {
  const usernameOr = username || "koki_develop";

  return [
    {
      name: "Contributions",
      src: qiitaBadgeUrl({
        username: usernameOr,
        style,
        type: "contributions",
      }),
      link: `https://qiita.com/${usernameOr}`,
    },
    {
      name: "Followers",
      src: qiitaBadgeUrl({
        username: usernameOr,
        style,
        type: "followers",
      }),
      link: `https://qiita.com/${usernameOr}`,
    },
    {
      name: "Articles",
      src: qiitaBadgeUrl({
        username: usernameOr,
        style,
        type: "articles",
      }),
      link: `https://qiita.com/${usernameOr}`,
    },
  ];
};

const QiitaBadgeBlocks: React.FC = memo(() => {
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
      <div className="mb-2">
        <h2 className="text-2xl font-bold">Qiita</h2>
      </div>

      <div className="mb-4 space-y-1">
        <Input
          className="text-sm"
          inputClassname="w-full sm:w-1/3 text-base"
          label="ユーザー名"
          placeholder="koki_develop"
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

QiitaBadgeBlocks.displayName = "QiitaBadgeBlocks";

export default QiitaBadgeBlocks;
