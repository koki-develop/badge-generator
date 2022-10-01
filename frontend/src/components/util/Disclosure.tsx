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
              "flex w-full items-center justify-between rounded border px-4 py-2 hover:bg-gray-50 active:bg-gray-100",
              { "rounded-b-none": open }
            )}
          >
            {button}
            <span className="text-sm">
              {open && <BsChevronUp />}
              {!open && <BsChevronDown />}
            </span>
          </HeadlessDisclosure.Button>
          <HeadlessDisclosure.Panel className="rounded-b border border-t-0 p-4 pt-2">
            {children}
          </HeadlessDisclosure.Panel>
        </>
      )}
    </HeadlessDisclosure>
  );
});

Disclosure.displayName = "Disclosure";

export default Disclosure;
