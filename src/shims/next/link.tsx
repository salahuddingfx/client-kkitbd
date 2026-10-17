import React, { forwardRef } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

export interface NextLinkProps extends Omit<RouterLinkProps, "to"> {
  href: string | { pathname?: string; query?: Record<string, unknown>; hash?: string };
  children?: React.ReactNode;
  as?: string;
  passHref?: boolean;
  prefetch?: boolean;
  replace?: boolean;
  shallow?: boolean;
  scroll?: boolean;
  locale?: string | false;
}

const Link = forwardRef<HTMLAnchorElement, NextLinkProps>(({ href, children, ...props }, ref) => {
  let to = typeof href === "string" ? href : href?.pathname || "/";
  if (typeof href === "object" && href.query) {
    const searchParams = new URLSearchParams();
    Object.entries(href.query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        searchParams.append(k, String(v));
      }
    });
    const qs = searchParams.toString();
    if (qs) {
      to += (to.includes("?") ? "&" : "?") + qs;
    }
    if (href.hash) {
      to += href.hash.startsWith("#") ? href.hash : `#${href.hash}`;
    }
  }

  // Handle external links or protocols
  if (
    to.startsWith("http://") ||
    to.startsWith("https://") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:")
  ) {
    return (
      <a href={to} ref={ref} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to} ref={ref} {...props}>
      {children}
    </RouterLink>
  );
});

Link.displayName = "Link";

export default Link;
export { Link };
