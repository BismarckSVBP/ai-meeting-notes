
import React from "react";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
