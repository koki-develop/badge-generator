import classNames from "classnames";
import copy from "copy-to-clipboard";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineCopy } from "react-icons/ai";

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
        "rounded-sm border border-gray-200 p-2 outline-hidden hover:bg-gray-50"
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
            className="rounded-l border border-gray-200 border-r-0 px-3 outline-hidden hover:bg-gray-50 active:bg-gray-100"
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
              "rounded-r border border-gray-200 p-2 outline-hidden placeholder:text-gray-400!",
              {
                "w-full": fullWidth,
                rounded: !withCopy,
                "bg-gray-50": inputProps.readOnly,
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
