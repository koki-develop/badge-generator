import classNames from "classnames";
import React, { memo } from "react";
import { AiOutlineCopy } from "react-icons/ai";

type BaseProps = {
  inputClassname?: string;
  label: string;
  fullWidth?: boolean;
  withCopy?: boolean;
};

type TextProps = Omit<React.HTMLProps<HTMLInputElement>, "type"> & {
  type: "text";
};

type SelectProps = Omit<React.HTMLProps<HTMLSelectElement>, "children"> & {
  type: "select";
  options: Option[];
};

type Option = {
  text: string;
  value: string;
};

export type InputProps = BaseProps & (TextProps | SelectProps);

const Select: React.FC<SelectProps> = memo((props) => {
  const { type: _, options, ...selectProps } = props;

  return (
    <select
      {...selectProps}
      className={classNames(
        selectProps.className,
        "rounded border p-2 outline-none hover:bg-gray-50"
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
});

Select.displayName = "Select";

const Input: React.FC<InputProps> = memo((props) => {
  const {
    inputClassname,
    label,
    fullWidth,
    withCopy,
    className,
    ...inputProps
  } = props;

  return (
    <div className={classNames(className)}>
      <label>{label}</label>
      <span className="flex">
        {withCopy && (
          <button className="rounded-l border border-r-0 px-3 outline-none hover:bg-gray-50 active:bg-gray-100">
            <AiOutlineCopy />
          </button>
        )}
        {inputProps.type == "text" && (
          <input
            {...inputProps}
            className={classNames(
              inputClassname,
              "rounded-r border p-2 outline-none",
              {
                "w-full": fullWidth,
              }
            )}
          />
        )}
        {inputProps.type == "select" && (
          <Select className={inputClassname} {...inputProps} />
        )}
      </span>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
