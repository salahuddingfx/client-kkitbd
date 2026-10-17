import React, { useEffect } from "react";

export interface ScriptProps extends React.ScriptHTMLAttributes<HTMLScriptElement> {
  strategy?: "afterInteractive" | "lazyOnload" | "beforeInteractive" | "worker";
  children?: string;
}

export default function Script({
  src,
  children,
  strategy: _strategy,
  id,
  ...props
}: ScriptProps) {
  useEffect(() => {
    if (src) {
      if (id && document.getElementById(id)) return;
      const script = document.createElement("script");
      if (id) script.id = id;
      script.src = src;
      script.async = true;
      Object.assign(script, props);
      document.head.appendChild(script);
    } else if (children) {
      if (id && document.getElementById(id)) return;
      const script = document.createElement("script");
      if (id) script.id = id;
      script.innerHTML = typeof children === "string" ? children : "";
      document.head.appendChild(script);
    }
  }, [src, children, id, props]);

  return null;
}

export { Script };
