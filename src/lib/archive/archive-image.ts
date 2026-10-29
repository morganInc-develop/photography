/** Point portfolio views at the compressed, CDN served archive copy. */
export function getArchiveWebImage(src: string): string {
  return src.replace(/^\/Archive\//, "/Archive-web/");
}
