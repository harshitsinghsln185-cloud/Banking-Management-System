import React from "react";
import { formatINR } from "@/lib/money";
import { cn } from "@/lib/utils";

export interface AmountProps extends React.HTMLAttributes<HTMLSpanElement> {
  paise: number;
  showSign?: boolean;
}

export function Amount({ paise, showSign = false, className, ...props }: AmountProps) {
  const formatted = formatINR(paise);

  return (
    <span className={cn("font-semibold tabular-nums tracking-tight", className)} {...props}>
      {showSign && paise > 0 ? `+${formatted}` : formatted}
    </span>
  );
}
