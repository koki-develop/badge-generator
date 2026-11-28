import React, { memo, useCallback, useId, useState } from "react";
import BadgeBlocks from "@/components/pages/HomePage/BadgeBlocks";
import ServiceTab from "@/components/pages/HomePage/ServiceTab";
import { Badge } from "@/components/util/BadgeBlock";
import useMediaQuery from "@/hooks/useMediaQuery";

export type Service = {
  name: string;
  logo: string;
  defaultUsername: string;
  usernameToBadges: (username: string) => Badge[];
};

export type ServiceTabsProps = {
  services: Service[];
};

// 矢印キーで移る先のタブ。端から先へは反対の端に回る。タブを動かさないキーは undefined
const indexForKey = (
  key: string,
  current: number,
  last: number,
  vertical: boolean,
): number | undefined => {
  switch (key) {
    case vertical ? "ArrowUp" : "ArrowLeft":
      return current === 0 ? last : current - 1;
    case vertical ? "ArrowDown" : "ArrowRight":
      return current === last ? 0 : current + 1;
    case "Home":
      return 0;
    case "End":
      return last;
    default:
      return undefined;
  }
};

// タブは自前のボタンで作る。Headless UI 1.7 の Tab はクリックでもスクリプトからフォーカスを移すので、
// Chrome ではマウスで選んだだけでフォーカス枠（:focus-visible）が出てしまう。
const ServiceTabs: React.FC<ServiceTabsProps> = memo((props) => {
  const { services } = props;

  const id = useId();
  // md（48rem）以上はタブを左に縦に並べるので、矢印キーも上下で動かす
  const vertical = useMediaQuery("(min-width: 48rem)");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Alt+← の「戻る」のような、修飾キー付きのブラウザの操作は止めない
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const tabs = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]"),
      );
      const current = tabs.indexOf(event.target as HTMLButtonElement);
      if (current === -1) return;

      const index = indexForKey(event.key, current, tabs.length - 1, vertical);
      if (index === undefined) return;

      event.preventDefault();
      setSelectedIndex(index);
      tabs[index].focus();
    },
    [vertical],
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-10">
      <div
        role="tablist"
        aria-label="サービス"
        aria-orientation={vertical ? "vertical" : "horizontal"}
        onKeyDown={handleKeyDown}
        className="grid grid-cols-4 gap-1 md:w-44 md:shrink-0 md:grid-cols-1 md:content-start"
      >
        {services.map((service, index) => (
          <ServiceTab
            key={service.name}
            id={`${id}-tab-${index}`}
            panelId={`${id}-panel-${index}`}
            index={index}
            name={service.name}
            logo={service.logo}
            selected={index === selectedIndex}
            onSelect={setSelectedIndex}
          />
        ))}
      </div>

      <div className="min-w-0 flex-1">
        {services.map((service, index) => (
          // 切り替えても入力したユーザー名やスタイルが消えないよう、隠すだけでアンマウントしない
          <div
            key={service.name}
            id={`${id}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${index}`}
            hidden={index !== selectedIndex}
          >
            <BadgeBlocks
              defaultUsername={service.defaultUsername}
              usernameToBadges={service.usernameToBadges}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

ServiceTabs.displayName = "ServiceTabs";

export default ServiceTabs;
