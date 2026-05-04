/** Safe `url("...")` fragment for inline CSS `backgroundImage`. */
export function cssBackgroundUrl(url: string): string {
  return `url("${url.trim().replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;
}
