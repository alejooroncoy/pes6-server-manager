import fetch from "node-fetch";
import ResEdit from "resedit";
import { Dropbox } from "dropbox";
import * as esbuild from "esbuild";
import exe from "@angablue/exe";
import path from "node:path";
import fs from "node:fs";
import packageJson from "../package.json" assert { type: "json" };
import { config as configDotenv } from "dotenv";

try {
  configDotenv();

  const { version } = packageJson;

  const pathPsmJs = path.resolve("./dist/psm.js");
  const output = path.resolve("./dist/psm.exe");

  const {
    BASES_URL: basesUrl,
    DROPBOX_REFRESH_TOKEN: dropboxRefreshToken,
    DROPBOX_CLIENT_ID: dropboxClientId,
    DROPBOX_CLIENT_SECRET: dropboxClientSecret,
  } = process.env;

  const basesUrlList = basesUrl.split(",");
  let index = 0;

  let baseUrl = basesUrlList.at(index);

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

  console.log("Making psm.exe 📦");

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

  const entries = res.entries.find(({ type }) => type === 24);

  res.replaceResourceEntry({
    ...entries,
    bin: Buffer.from(
      Buffer.from(entries.bin)
        .toString("utf-8")
        .replace(
          '<requestedPrivileges><requestedExecutionLevel level="asInvoker" uiAccess="false">',
          '<requestedPrivileges><requestedExecutionLevel level="requireAdministrator" uiAccess="false">'
        )
    ),
  });

  res.outputResource(exeContent);
  let newBinary = exeContent.generate();

  const dropbox = new Dropbox({
    refreshToken: dropboxRefreshToken,
    clientId: dropboxClientId,
    clientSecret: dropboxClientSecret,
    fetch,
  });

  console.log("Upload file ☁");
  await dropbox.filesUpload({
    mode: {
      ".tag": "overwrite",
    },
    path: `/bin/${version}/psm.exe`,
    contents: Buffer.from(newBinary),
    autorename: false,
  });

  console.log(`Publish success 🌟`);
} catch (err) {
  console.error("There is a error");
  console.log(err.message);
}
