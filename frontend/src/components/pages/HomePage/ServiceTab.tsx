import classNames from "classnames";
import Image from "next/image";
import React, { memo, useCallback } from "react";

export type ServiceTabProps = {
  id: string;
  panelId: string;
  index: number;
  name: string;
  logo: string;
  selected: boolean;
  onSelect: (index: number) => void;
};

const ServiceTab: React.FC<ServiceTabProps> = memo((props) => {
  const { id, panelId, index, name, logo, selected, onSelect } = props;

  const handleClick = useCallback(() => {
    onSelect(index);
  }, [index, onSelect]);

  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      // 選んでいるタブだけを Tab キーで止まる場所にし、ほかへは矢印キーで移る
      tabIndex={selected ? 0 : -1}
      onClick={handleClick}
      className={classNames(
        // 4 つ並べると狭すぎる幅（22.5rem 未満、文字サイズが標準なら 360px 未満）では、名前をロゴの下に置く。
        // 文字が大きいほど要る幅も増えるので、境目も文字サイズに合わせて動く rem で決める
        "flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md px-1.5 py-2 text-sm min-[22.5rem]:flex-row min-[22.5rem]:gap-1.5 md:justify-start md:gap-2 md:px-2.5",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900",
        selected
          ? "bg-gray-100 font-bold"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
      )}
    >
      <Image src={logo} alt="" width={16} height={16} />
      <span>{name}</span>
    </button>
  );
});

ServiceTab.displayName = "ServiceTab";

export default ServiceTab;
