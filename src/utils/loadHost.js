import { createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import config from "../config/index.js";

export default function loadHost(host) {
  const pathFileNameHosts = path.resolve(
    config.pathHosts,
    host.toLowerCase(),
    "./hosts"
  );
  const contentFileName = createReadStream(pathFileNameHosts, "utf-8");
  const destFileName = path.resolve(config.root, config.pathDestHosts);
  const writeOutput = createWriteStream(destFileName, "utf-8");
  contentFileName.pipe(writeOutput);
}
