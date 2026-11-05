import React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none text-foreground/90 select-none inline-flex items-center gap-1",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {required && <span className="text-danger">*</span>}
    </label>
  )
);

Label.displayName = "Label";

