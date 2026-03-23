import * as React from "react";

import { cn } from "../../lib/utils";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "ui-select",
      "flex h-12 w-full appearance-none rounded-2xl border border-stone-300/80 bg-white px-4 py-3 text-base text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = "Select";
