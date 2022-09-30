import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import React, { memo } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export type BadgeBlockProps = {
  name: string;
  src: string;
  link: string;
};

const BadgeBlock: React.FC<BadgeBlockProps> = memo((props) => {
  const { name, src, link } = props;

  return (
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
              <h3 className="mr-2">{name}</h3>
              <span className="mr-2">
                <img src={src} alt="Badge" />
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
                  value={`[![${name}](${src})](${link})`}
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
                  value={`<a href="${link}"><img src="${src}" alt="${name}" /></a>`}
                  disabled
                />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
});

BadgeBlock.displayName = "BadgeBlock";

export default BadgeBlock;
