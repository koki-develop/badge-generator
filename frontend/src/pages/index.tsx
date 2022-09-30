import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import type { NextPage } from "next";
import React from "react";
import { AiOutlineDown, AiOutlineUp, AiOutlineCopy } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Home: NextPage = () => {
  const source = "https://badgen.org/img/zenn/kou_pg_0131/likes";

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

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  "flex w-full items-center justify-between rounded border px-4 py-2 hover:bg-gray-50 active:bg-gray-100",
                  { "rounded-b-none": open }
                )}
              >
                <div className="flex items-center">
                  <h3 className="mr-2">Likes</h3>
                  <span className="mr-2">
                    <img src={source} alt="Badge" />
                  </span>
                </div>
                <span className="text-sm">
                  {open && <BsChevronUp />}
                  {!open && <BsChevronDown />}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="rounded-b border border-t-0 p-4 pt-2">
                <div>
                  <label className="text-xs">Markdown</label>
                  <div className="mb-1 flex">
                    <button className="rounded-l border border-r-0 p-2 outline-none hover:bg-gray-50 active:bg-gray-100">
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
