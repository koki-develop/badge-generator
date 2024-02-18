import fs from "fs";
import path from "path";

const _readAsBase64 = (...paths: string[]): string => {
  return fs
    .readFileSync(path.resolve(process.cwd(), ...paths))
    .toString("base64");
};

const _base64ToDataUrl = (base64: string, mime: string): string =>
  `data:${mime};base64,${base64}`;

const mime = {
  png: "image/png",
  svg: "image/svg+xml",
} as const;

const logos = {
  zenn: { filename: "zenn.svg", mime: mime.svg },
  qiita: { filename: "qiita.png", mime: mime.png },
  atcoderBlack: { filename: "atcoder_black.svg", mime: mime.svg },
  atcoderWhite: { filename: "atcoder_white.svg", mime: mime.svg },
  bluesky: { filename: "bluesky.svg", mime: mime.svg },
};

const dataUrls = Object.entries(logos).reduce<Record<string, string>>(
  (result, [name, logo]) => {
    const base64 = _readAsBase64("public/logos", logo.filename);
    result[name] = _base64ToDataUrl(base64, logo.mime);
    return result;
  },
  {}
);

fs.writeFileSync("src/logos.json", JSON.stringify(dataUrls));
