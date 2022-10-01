import fs from "fs";
import path from "path";

const load = (pathname: string): string => {
  return fs
    .readFileSync(path.resolve(process.cwd(), pathname))
    .toString("base64");
};

const zenn = load("public/logos/zenn.svg");
const qiita = load("public/logos/qiita.png");
const atcoderBlack = load("public/logos/atcoder_black.svg");
const atcoderWhite = load("public/logos/atcoder_white.svg");

fs.writeFileSync(
  "src/logos.json",
  JSON.stringify({ zenn, qiita, atcoderBlack, atcoderWhite })
);
