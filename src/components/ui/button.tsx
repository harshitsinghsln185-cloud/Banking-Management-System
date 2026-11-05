import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading = false, disabled, children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full cursor-pointer select-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:transform-none";

    const hoverLift = "hover:-translate-y-0.5 active:translate-y-0";

    const variantStyles = {
      primary:
        "bg-[linear-gradient(135deg,#2ED3A0_0%,#8BF0CF_100%)] text-[#04201B] font-semibold shadow-[0_4px_14px_rgba(46,211,160,0.25)] hover:shadow-[0_6px_20px_rgba(46,211,160,0.35)]",
      ghost:
        "bg-transparent text-foreground hover:bg-surface2 hover:text-accent border border-transparent hover:border-border",
      danger:
        "bg-danger text-[#04201B] font-semibold shadow-[0_4px_14px_rgba(255,107,107,0.25)] hover:opacity-95",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          !disabled && !loading && hoverLift,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && <Spinner size="sm" className="text-current" />}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
