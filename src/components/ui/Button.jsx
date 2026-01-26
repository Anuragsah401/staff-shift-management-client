import React from "react";

const Button = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-orange-500 text-white hover:bg-orange-600",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-gray-300 hover:bg-gray-50",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      ghost: "hover:bg-gray-100",
      link: "text-orange-500 underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8 text-base",
      icon: "h-9 w-9",
    };

    const variantClass = variants[variant] || variants.default;
    const sizeClass = sizes[size] || sizes.default;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
