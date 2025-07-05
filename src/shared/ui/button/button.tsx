import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";

const variantStyles = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  text: "text-blue-500 hover:text-blue-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  outlined:
    "border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white",
};

interface ButtonProps extends HeadlessButtonProps {
  variant?: keyof typeof variantStyles;
}

export function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <HeadlessButton
      onClick={onClick}
      className={`px-4 py-2 select-none rounded cursor-pointer transition active:scale-95 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
}
