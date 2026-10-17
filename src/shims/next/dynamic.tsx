import React, { lazy, Suspense } from "react";

export interface DynamicOptions {
  ssr?: boolean;
  loading?: (props: { error?: Error | null; isLoading?: boolean; pastDelay?: boolean; retry?: () => void }) => React.ReactNode;
}

export default function dynamic<T extends React.ComponentType<any>>(
  loader: () => Promise<T | { default: T }>,
  options?: DynamicOptions
): React.ComponentType<React.ComponentProps<T>> {
  const LazyComponent = lazy(async () => {
    const mod = await loader();
    if (mod && typeof mod === "object" && "default" in mod) {
      return mod;
    }
    return { default: mod as T };
  });

  return function DynamicComponent(props: React.ComponentProps<T>) {
    const fallback = options?.loading ? options.loading({ isLoading: true }) : null;
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export { dynamic };
