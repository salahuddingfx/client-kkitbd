import {
  useNavigate,
  useLocation,
  useSearchParams as useRouterSearchParams,
  useParams as useRouterParams,
} from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();

  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => window.location.reload(),
    prefetch: () => {},
  };
}

export function usePathname(): string {
  const location = useLocation();
  return location.pathname;
}

export function useSearchParams(): URLSearchParams {
  const [searchParams] = useRouterSearchParams();
  return searchParams;
}

export function useParams<T extends Record<string, string | string[]> = Record<string, string>>(): T {
  const params = useRouterParams();
  return (params || {}) as unknown as T;
}

export function useSelectedLayoutSegment(): string | null {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] || null;
}

export function useSelectedLayoutSegments(): string[] {
  const pathname = usePathname();
  return pathname.split("/").filter(Boolean);
}

export function redirect(url: string): never {
  window.location.href = url;
  throw new Error(`REDIRECT:${url}`);
}

export function permanentRedirect(url: string): never {
  window.location.href = url;
  throw new Error(`REDIRECT:${url}`);
}

export function notFound(): never {
  throw new Error("NEXT_NOT_FOUND");
}
