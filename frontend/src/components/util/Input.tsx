import classNames from "classnames";
import React, { memo } from "react";
import { AiOutlineCopy } from "react-icons/ai";

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  label: string;
  fullWidth?: boolean;
  withCopy?: boolean;
};

const Input: React.FC<InputProps> = memo((props) => {
  const { label, fullWidth, withCopy, className, ...inputProps } = props;

  return (
    <div className={classNames(className)}>
      <label>{label}</label>
      <span className="flex">
        {withCopy && (
          <button className="rounded-l border border-r-0 px-3 outline-none hover:bg-gray-50 active:bg-gray-100">
            <AiOutlineCopy />
          </button>
        )}
        <input
          {...inputProps}
          className={classNames("rounded-r border p-2 outline-none", {
            "w-full": fullWidth,
          })}
        />
      </span>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
