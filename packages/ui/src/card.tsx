import { cn } from "./utils";

export function Card({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn("px-5 rounded-lg shadow-lg bg-primary overflow-hidden text-ellipsis", className)} {...props}>
      {children}
    </div>
  );
}
