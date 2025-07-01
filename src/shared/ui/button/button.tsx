import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";

const variantStyles: Record<string, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};

interface ButtonProps extends HeadlessButtonProps {
  variant?: (typeof variantStyles)[keyof typeof variantStyles];
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
      className={`px-4 py-2 rounded ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
}
