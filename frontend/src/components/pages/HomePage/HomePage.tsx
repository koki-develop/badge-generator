import type { NextPage } from "next";
import React from "react";
import BadgeBlock from "../../BadgeBlock";

const HomePage: NextPage = () => {
  return (
    <div className="pt-4">
      <div>
        <div>
          <h2 className="text-2xl font-bold">Zenn</h2>
        </div>

        <div className="mb-4">
          <div className="mb-2 flex flex-col">
            <label className="text-sm">ユーザー名</label>
            <input
              className="h-[38px] w-full rounded border px-2 outline-none sm:w-1/3"
              type="text"
            />
          </div>

          <div className="mb-2 flex flex-col">
            <label className="text-sm">スタイル</label>
            <select className="h-[38px] w-full rounded border px-2 outline-none hover:bg-gray-50 sm:w-1/3">
              <option value="" selected>
                plastic
              </option>
              <option value="">flat</option>
            </select>
          </div>
        </div>

        <div className="mb-2">
          <BadgeBlock
            name="Likes"
            src="/img/zenn/kou_pg_0131/likes"
            link="https://zenn.dev/kou_pg_0131"
          />
        </div>

        <div className="mb-2">
          <BadgeBlock
            name="Articles"
            src="/img/zenn/kou_pg_0131/articles"
            link="https://zenn.dev/kou_pg_0131"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
