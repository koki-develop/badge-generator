import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import type { NextPage } from "next";
import React from "react";
import { AiOutlineCopy } from "react-icons/ai";

const Home: NextPage = () => {
  const source = "https://badgen.org/img/zenn/kou_pg_0131/likes";

  return (
    <div>
      <div>
        <h2 className="text-xl">Zenn</h2>

        <div className="mb-2 flex flex-col">
          <label className="text-sm">ユーザー名</label>
          <input
            className="w-full rounded border px-2 py-1 outline-none sm:w-1/3"
            type="text"
          />
        </div>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  "flex w-full items-center rounded border px-4 py-2",
                  { "rounded-b-none": open }
                )}
              >
                <h3 className="mr-2">Likes</h3>
                <span>
                  <img src={source} alt="" />
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="rounded-b border border-t-0 p-4 pt-2">
                <div>
                  <label className="text-xs">Markdown</label>
                  <div className="mb-1 flex">
                    <button className="rounded-l border border-r-0 p-2 outline-none hover:bg-gray-100 active:bg-gray-200">
                      <AiOutlineCopy />
                    </button>
                    <input
                      className="grow rounded-r border px-2 py-1 text-sm outline-none"
                      style={{ outline: "none" }}
                      type="text"
                      value={`[![Likes](${source})](https://zenn.dev/kou_pg_0131)`}
                      disabled
                    />
                  </div>

                  <label className="text-xs">HTML</label>
                  <div className="flex">
                    <button className="rounded-l border border-r-0 p-2 outline-none hover:bg-gray-100 active:bg-gray-200">
                      <AiOutlineCopy />
                    </button>
                    <input
                      className="grow rounded-r border px-2 py-1 text-sm outline-none"
                      style={{ outline: "none" }}
                      type="text"
                      value={`<a href="https://zenn.dev/kou_pg_0131"><img src="${source}" alt="Likes" /></a>`}
                      disabled
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Home;
