import { classNames } from "@/libs/classNames";
import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

type Inputprops = {
  isFullwidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  label?: React.ReactNode;
  labelProps?: React.ComponentProps<typeof Label>;
} & JSX.IntrinsicElements["input"];

type AddonProps = {
  children: React.ReactNode;
  isFilled?: boolean;
  className?: string;
  error?: boolean;
};

const Addon = ({ children, className }: AddonProps) => (
  <div
    className={classNames(
      "flex items-center px-2  border-slate-300 py-3 min-h-9 ",
      className
    )}
  >
    <span className="flex whitespace-nowrap items-center">{children}</span>
  </div>
);

export const Input = forwardRef<HTMLInputElement, Inputprops>(function Input(
  { isFullwidth, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        "placeholder:text-sm mt-0 text-base  bg-white block h-9 rounded-md px-3 py-2 outline-none  focus:outline-none",
        isFullwidth && "w-full",
        props.className
      )}
    />
  );
});

export const InputField = forwardRef<HTMLInputElement, Inputprops>(
  function InputField(props, ref) {
    const {
      containerClassName,
      labelProps,
      isFullwidth,
      prefixIcon,
      suffixIcon,
      labelClassName,
      label,
      ...otherProps
    } = props;
    return (
      <div className={classNames("w-full", containerClassName)}>
        {label && <Label {...labelProps}>{label}</Label>}

        {prefixIcon || suffixIcon ? (
          <div className="border transition-all border-slate-300 group  focus-within:ring-slate-900 flex  items-center justify-center rounded-md focus-within:outline-none focus-within:ring-2">
            {prefixIcon && (
              <Addon className={classNames("border-r-2")}>{prefixIcon}</Addon>
            )}
            <Input isFullwidth={isFullwidth} {...otherProps} ref={ref} />
            {suffixIcon && (
              <Addon className={classNames("border-l-2")}>{suffixIcon}</Addon>
            )}
          </div>
        ) : (
          <div className="border border-slate-300 group  focus-within:ring-slate-900 flex  items-center justify-center rounded-md focus-within:outline-none focus-within:ring-2">
            <Input isFullwidth={isFullwidth} {...otherProps} ref={ref} />
          </div>
        )}
        <ErrorMessage fieldName={props.name || ""} />
      </div>
    );
  }
);

export const EmailInputField = forwardRef<HTMLInputElement, Inputprops>(
  function EmailInputField(props, ref) {
    return (
      <InputField
        type="email"
        inputMode="email"
        autoCorrect="off"
        autoCapitalize="none"
        {...props}
        ref={ref}
      />
    );
  }
);

export const PasswordInputField = forwardRef<HTMLInputElement, Inputprops>(
  function PasswordInputField(props, ref) {
    const [visible, setVisible] = useState(false);
    return (
      <InputField
        type={visible ? "text" : "password"}
        inputMode="email"
        autoCorrect="off"
        autoCapitalize="none"
        {...props}
        ref={ref}
        suffixIcon={
          visible ? (
            <button type="button" onClick={() => setVisible(false)}>
              <FiEye size={14} />
            </button>
          ) : (
            <button type="button" onClick={() => setVisible(true)}>
              <FiEyeOff size={14} />
            </button>
          )
        }
      />
    );
  }
);
