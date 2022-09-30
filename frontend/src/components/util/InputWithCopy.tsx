import classNames from "classnames";
import React, { memo } from "react";
import { AiOutlineCopy } from "react-icons/ai";

export type InputWithCopyProps = React.HTMLProps<HTMLInputElement> & {
  label: string;
  fullWidth?: boolean;
};

const InputWithCopy: React.FC<InputWithCopyProps> = memo((props) => {
  const { label, fullWidth, className, ...inputProps } = props;

  return (
    <div className={classNames(className)}>
      <label>{label}</label>
      <span className="flex">
        <button className="rounded-l border border-r-0 px-3 outline-none hover:bg-gray-50 active:bg-gray-100">
          <AiOutlineCopy />
        </button>
        <input
          {...inputProps}
          className={classNames("rounded-r border p-2 outline-none", {
            "w-full": fullWidth,
          })}
          type="text"
        />
      </span>
    </div>
  );
});

InputWithCopy.displayName = "BadgeBlock";

export default InputWithCopy;
