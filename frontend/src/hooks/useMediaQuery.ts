import { useCallback, useSyncExternalStore } from "react";

// サーバーには画面幅がないので、サーバーとハイドレーションの間は false として描き、
// ハイドレーションのあとにブラウザの値へ切り替える。
const getServerSnapshot = () => false;

const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => {
        mql.removeEventListener("change", onChange);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useMediaQuery;
