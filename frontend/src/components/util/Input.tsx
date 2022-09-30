import classNames from "classnames";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineCopy } from "react-icons/ai";
import copy from "copy-to-clipboard";

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

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(() => {
    const value = inputProps.value?.toString() ?? "";
    if (copy(value)) {
      setCopied(true);
    }
  }, [inputProps.value]);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [copied]);

  return (
    <div className={classNames(className)}>
      <label>{label}</label>
      <span className="flex">
        {withCopy && (
          <button
            className="rounded-l border border-r-0 px-3 outline-none hover:bg-gray-50 active:bg-gray-100"
            onClick={handleCopy}
          >
            {copied ? (
              <AiOutlineCheck className="text-green-600" />
            ) : (
              <AiOutlineCopy />
            )}
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
