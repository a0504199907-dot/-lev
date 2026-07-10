import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-coral text-white shadow-lg shadow-coral/25 hover:bg-coral-600 hover:shadow-coral/40",
        secondary:
          "bg-charcoal text-white hover:bg-charcoal-light",
        outline:
          "border-2 border-coral text-coral bg-transparent hover:bg-coral hover:text-white",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ghostDark:
          "text-slate-300 hover:bg-white/10 hover:text-white",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        success:
          "bg-emerald-600 text-white hover:bg-emerald-700",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
