import fs from "fs";
import path from "path";

const load = (pathname: string): string => {
  return fs
    .readFileSync(path.resolve(process.cwd(), pathname))
    .toString("base64");
};

const zenn = load("public/logos/zenn.svg");
const qiita = load("public/logos/qiita.png");

fs.writeFileSync("src/logos.json", JSON.stringify({ zenn, qiita }));
