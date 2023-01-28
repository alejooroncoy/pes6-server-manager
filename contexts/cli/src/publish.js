import fetch from "node-fetch";
import prompts from "prompts";
import ResEdit from "resedit";
import * as esbuild from "esbuild";
import exe from "@angablue/exe";
import path from "node:path";
import fs from "node:fs";
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
let data = fs.readFileSync(output);

const exeContent = ResEdit.NtExecutable.from(data);
const res = ResEdit.NtExecutableResource.from(exeContent);

const entrie = res.entries.find(({ type }) => type === 24);

res.replaceResourceEntry({
  ...entrie,
  bin: Buffer.from(
    Buffer.from(entrie.bin)
      .toString("utf-8")
      .replace(
        '<requestedPrivileges><requestedExecutionLevel level="asInvoker" uiAccess="false">',
        '<requestedPrivileges><requestedExecutionLevel level="requireAdministrator" uiAccess="false">'
      )
  ),
});

res.outputResource(exeContent);
let newBinary = exeContent.generate();
fs.writeFileSync(output, Buffer.from(newBinary));

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
