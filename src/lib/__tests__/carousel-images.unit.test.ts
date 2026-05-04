import { parseCarouselImageFilenames, resolveCarouselImageSrc } from "@/lib/carousel-images";
import { describe, expect, test } from "vitest";

describe("resolveCarouselImageSrc", () => {
  test("passes through http(s) and absolute paths", () => {
    expect(resolveCarouselImageSrc("https://example.com/a.png")).toBe("https://example.com/a.png");
    expect(resolveCarouselImageSrc("/uploads/photo.jpg")).toBe("/uploads/photo.jpg");
  });

  test("maps bare filenames to carousel folder", () => {
    expect(resolveCarouselImageSrc("01.png")).toBe("/carousel/images/01.png");
    expect(resolveCarouselImageSrc("my pic.webp")).toBe("/carousel/images/my%20pic.webp");
  });

  test("empty trimmed string yields empty", () => {
    expect(resolveCarouselImageSrc("   ")).toBe("");
  });
});

describe("parseCarouselImageFilenames", () => {
  test("splits on newlines and commas", () => {
    expect(parseCarouselImageFilenames("a.jpg\nb.png,c.webp")).toEqual(["a.jpg", "b.png", "c.webp"]);
  });

  test("trims whitespace", () => {
    expect(parseCarouselImageFilenames(" x.jpg \n y.png ")).toEqual(["x.jpg", "y.png"]);
  });
});
