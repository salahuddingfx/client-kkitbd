interface FontOptions {
  variable?: string;
  subsets?: string[];
  weight?: string | string[];
  style?: string | string[];
  display?: string;
  preload?: boolean;
}

interface FontResult {
  className: string;
  variable: string;
  style: { fontFamily: string };
}

function createFontShim(defaultFont: string) {
  return function (options?: FontOptions): FontResult {
    return {
      className: options?.variable ? options.variable.replace(/^--/, "") : defaultFont.toLowerCase(),
      variable: options?.variable || `--font-${defaultFont.toLowerCase()}`,
      style: {
        fontFamily: `var(${options?.variable || `--font-${defaultFont.toLowerCase()}`}, sans-serif)`,
      },
    };
  };
}

export const Geist = createFontShim("geist-sans");
export const Geist_Mono = createFontShim("geist-mono");
export const Inter = createFontShim("inter");
export const Roboto = createFontShim("roboto");
export const Outfit = createFontShim("outfit");

const googleFonts = {
  Geist,
  Geist_Mono,
  Inter,
  Roboto,
  Outfit,
};

export default googleFonts;
