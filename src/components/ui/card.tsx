import * as React from "react";

import { cn } from "../../lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ui-card",
      "rounded-[28px] border border-white/65 bg-white/80 shadow-[0_24px_90px_-45px_rgba(120,86,32,0.55)] backdrop-blur",
      className,
    )}
    {...props}
  />
));

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ui-card-header", "space-y-2 p-6", className)} {...props} />
));

CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "ui-card-title",
      "font-[Iowan_Old_Style,Palatino_Linotype,serif] text-2xl font-semibold tracking-tight text-stone-900",
      className,
    )}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("ui-card-description", "text-sm leading-6 text-stone-600", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ui-card-content", "p-6 pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";
