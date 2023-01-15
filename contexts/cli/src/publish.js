import fetch from "node-fetch";
import * as esbuild from "esbuild";
import path from "node:path";
import packageJson from "../package.json" assert { type: "json" };
import { config as configDotenv } from "dotenv";

configDotenv();

const { version } = packageJson;

const pathPsmJs = path.resolve("./dist/psm.js");

const baseUrl = process.env.BASE_URL;

const builded = await esbuild.build({
  entryPoints: ["./src/cli.js"],
  outfile: pathPsmJs,
  bundle: true,
  write: false,
  target: "node18",
  platform: "node",
  define: {
    "process.env.BASE_URL": `"${baseUrl}"`,
  },
});

const { text: contentPsmJs } = builded.outputFiles.at(0);

const headersFetch = new Headers();
headersFetch.append("Content-Type", "application/javascript;charset=UTF-8");

const response = await fetch(`${baseUrl}/psm/bin?version=${version}`, {
  method: "POST",
  body: contentPsmJs,
  headers: headersFetch,
});

const data = await response.json();

console.log(data);
