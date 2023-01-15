import exe from "@angablue/exe";
import { rm, writeFile } from "node:fs/promises";

export default async function fromJsToExe(contentJs, version) {
  await writeFile("./bin.js", contentJs, "utf-8");
  const output = "./build/bin/psm.exe";
  await exe({
    entry: "./bin.js",
    out: output,
    pkg: ["-C", "GZip"], // Specify extra pkg arguments
    version,
    target: "latest-win-x64",
    icon: "./assets/logo-psm.ico", // Application icons must be in .ico format
    properties: {
      CompanyName: "PSM-Team",
      ProductName: "PSM Bin",
      FileDescription: "Pes6 server manager version Bin. 💻⚽",
      LegalCopyright: "Copyright © PSM-Team MIT License",
    },
  });
  await rm("./bin.js");
  return output;
}
