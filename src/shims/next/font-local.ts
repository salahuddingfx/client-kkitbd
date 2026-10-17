interface LocalFontOptions {
  src: string | Array<{ path: string; weight?: string; style?: string }> | Record<string, unknown>;
  variable?: string;
  weight?: string;
  style?: string;
}

export default function localFont(options?: LocalFontOptions) {
  return {
    className: options?.variable ? options.variable.replace(/^--/, "") : "font-local",
    variable: options?.variable || "--font-local",
    style: {
      fontFamily: `var(${options?.variable || "--font-local"}, sans-serif)`,
    },
  };
}
