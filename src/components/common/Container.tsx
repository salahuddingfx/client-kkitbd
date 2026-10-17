import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
