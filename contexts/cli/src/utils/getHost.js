import { saveCacheHost, setConfigHost, TIME_EXPIRED } from "../config/cache.js";
import { createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import config from "../config/index.js";

export const getHostFromUrl = (
  host,
  { refetching = false, config: configCache } = {}
) =>
  new Promise(async (res, rej) => {
    const urlHosts = new URL(config.urlHosts);
    urlHosts.pathname += `/${host.toLowerCase()}/file`;
    if (refetching) {
      console.log(`Refetching the hosts from ${urlHosts} ⌛📋`);
    } else {
      console.log(`Loading hosts from ${urlHosts} ⌛📋`);
    }
    const { get } = await import(`node:${urlHosts.protocol.replace(":", "")}`);
    get(urlHosts, (response) => {
      const destFileName = path.resolve(config.root, config.pathDestHosts);
      const writeOutput = createWriteStream(destFileName, "utf-8");
      console.log(`Saving host in cache ⌛📁`);
      const writeCacheHost = saveCacheHost(host);
      response.pipe(writeOutput);
      response.pipe(writeCacheHost);
      response.on("end", async () => {
        console.log(`Loaded hosts ✨📋`);
        console.log(`Saved host in cache ✨📁`);
        if (refetching) {
          configCache.hostTimeExpire = new Date(
            new Date().getTime() + TIME_EXPIRED
          );
          return res();
        }
        await setConfigHost(host);
        res();
      });
      response.on("error", (err) => rej(err));
    });
  });

export const getHostFromCache = (pathCacheHost, host) =>
  new Promise((res, rej) => {
    console.log(`Loading hosts from ${pathCacheHost} ⌛📋`);
    const destFileName = path.resolve(config.root, config.pathDestHosts);
    const writeOutput = createWriteStream(destFileName, "utf-8");
    const readHosts = createReadStream(pathCacheHost, "utf-8");
    readHosts.pipe(writeOutput);
    readHosts.on("end", async () => {
      console.log(`Loaded hosts ✨📋`);
      await setConfigHost(host);
      res();
    });
    readHosts.on("error", (err) => rej(err));
  });
