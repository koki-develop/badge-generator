import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import classNames from "classnames";
import React, { memo } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export type DisclosureProps = {
  button: React.ReactNode;
  children: React.ReactNode;
};

const Disclosure: React.FC<DisclosureProps> = memo((props) => {
  const { button, children } = props;

  return (
    <HeadlessDisclosure>
      {({ open }) => (
        <>
          <HeadlessDisclosure.Button
            className={classNames(
              "flex w-full items-center space-x-2 rounded-sm border border-gray-200 px-4 py-2 hover:bg-gray-50 active:bg-gray-100",
              { "rounded-b-none": open }
            )}
          >
            <span className="text-sm">
              {open && <BsChevronUp />}
              {!open && <BsChevronDown />}
            </span>
            {button}
          </HeadlessDisclosure.Button>
          <HeadlessDisclosure.Panel className="rounded-b border border-gray-200 border-t-0 p-4 pt-2">
            {children}
          </HeadlessDisclosure.Panel>
        </>
      )}
    </HeadlessDisclosure>
  );
});

Disclosure.displayName = "Disclosure";

export default Disclosure;
