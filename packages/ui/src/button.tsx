"use client";

import { cn } from "./utils";

type ButtonProps = React.ComponentProps<'button'>

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cn('px-6 py-3 flex gap-3 items-center justify-center rounded-lg shadow-lg bg-primary', className)} {...props}>
      {children}
    </button>
  );
};
