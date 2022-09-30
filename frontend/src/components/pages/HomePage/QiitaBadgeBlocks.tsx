import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { BadgeStyle } from "../../../lib/badge";
import { badgeUrl } from "../../../lib/qiita/url";
import BadgeBlock, { Badge } from "./BadgeBlock";

const usernameToBadges = (username: string, style: BadgeStyle): Badge[] => {
  const encodedUsername = encodeURIComponent(username.trim() || "koki_develop");

  return [
    {
      name: "Articles",
      src: badgeUrl({ username: encodedUsername, style, type: "articles" }),
      link: `https://qiita.com/${encodedUsername}`,
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
      <div>
        <h2 className="text-2xl font-bold">Qiita</h2>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex flex-col">
          <label className="text-sm">ユーザー名</label>
          <input
            className="h-[38px] w-full rounded border px-2 outline-none sm:w-1/3"
            type="text"
            value={username}
            onChange={handleChangeUsername}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <label className="text-sm">スタイル</label>
          <select
            className="h-[38px] w-full rounded border px-2 outline-none hover:bg-gray-50 sm:w-1/3"
            value={style}
            onChange={handleChangeStyle}
          >
            {Object.values(BadgeStyle).map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
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
