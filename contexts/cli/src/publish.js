import fetch from "node-fetch";
import prompts from "prompts";
import * as esbuild from "esbuild";
import exe from "@angablue/exe";
import path from "node:path";
import packageJson from "../package.json" assert { type: "json" };
import { config as configDotenv } from "dotenv";

configDotenv();

const { version } = packageJson;

const pathPsmJs = path.resolve("./dist/psm.js");
const output = path.resolve("./dist/psm.exe");

const baseUrl = process.env.BASE_URL;

await esbuild.build({
  entryPoints: ["./src/cli.js"],
  outfile: pathPsmJs,
  bundle: true,
  target: "node18",
  platform: "node",
  define: {
    "process.env.BASE_URL": `"${baseUrl}"`,
  },
});

await exe({
  entry: pathPsmJs,
  out: output,
  pkg: ["-C", "GZip"], // Specify extra pkg arguments
  version,
  target: "latest-win-x64",
  icon: "./src/assets/logo-psm.ico", // Application icons must be in .ico format
  properties: {
    CompanyName: "PSM-Team",
    ProductName: "PSM Bin",
    FileDescription: "Pes6 server manager version Bin. 💻⚽",
    LegalCopyright: "Copyright © PSM-Team MIT License",
  },
});

const urlMediafire = await prompts({
  type: "text",
  name: "value",
  message: "Write url mediafire of the file",
});

const headersFetch = new Headers();

headersFetch.append("Content-Type", "application/json; charset=utf-8");

if (urlMediafire.value || process.env.URL_MEDIAFIRE) {
  const response = await fetch(`${baseUrl}/psm/bin?version=${version}`, {
    method: "POST",
    body: JSON.stringify({
      url: process.env.URL_MEDIAFIRE || urlMediafire.value,
    }),
    headers: headersFetch,
  });
  const data = await response.json();
  console.log(data);
  process.exit(0);
}

console.log("Missing url mediafire");
