"use client";

import { cn } from "./utils";

type ButtonProps = React.ComponentProps<'button'>

export const FlatButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cn('flex items-center gap-2 py-3 hover:bg-stone-500 hover:bg-opacity-10 active:bg-stone-500 active:bg-opacity-20 rounded-sm', className)} {...props}>
      {children}
    </button>
  );
};
