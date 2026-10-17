export class NextResponse {
  static redirect(url: string | URL) {
    return { type: "redirect", url: url.toString() };
  }
  static next() {
    return { type: "next" };
  }
}

export type NextRequest = Request & {
  nextUrl?: URL;
  cookies?: {
    get: (name: string) => { name: string; value: string } | undefined;
    set: (name: string, value: string) => void;
    delete: (name: string) => void;
  };
};
