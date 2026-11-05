import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border bg-surface2 px-4 py-2 text-sm text-foreground placeholder:text-muted/60 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50",
          hasError
            ? "border-danger focus-visible:ring-danger"
            : "border-border hover:border-accent/40 focus-visible:border-accent",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

