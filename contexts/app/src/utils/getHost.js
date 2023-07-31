import { saveCacheHost, setConfigHost, TIME_EXPIRED } from "../config/cache.js";
import { ResponseType, getClient } from "@tauri-apps/api/http";
import * as path from "@tauri-apps/api/path";
import config from "../config/index.js";
import { copyFile, writeTextFile } from "@tauri-apps/api/fs";
import paths from "../config/paths.js";
import logger from "../libs/logger.js";

export const getHostFromUrl = (
  host,
  {
    refetching = false,
    config: configCache,
    forceUpdate,
    pushHosts = true,
  } = {}
) => {
  const cb = async (res, rej) => {
    try {
      config.updateBaseUrl();
      const urlHosts = new URL(config.urlServers);
      urlHosts.pathname += `/${host.toLowerCase()}/file`;
      if (refetching) logger.log(`Refetching the hosts from ${urlHosts} ⌛📋`);
      else logger.log(`Loading hosts from ${urlHosts} ⌛📋`);

      const client = await getClient();
      const response = await client.get(urlHosts, {
        responseType: ResponseType.Text,
      });
      if (!response.ok) {
        config.updateBaseUrl();
        await cb(res, rej);
        return;
      }
      logger.log(`Saving host in cache ⌛📁`);
      const { data } = response;
      if (pushHosts) {
        const root = await paths.getRoot();
        const pathDestHosts = await paths.getPathDestHosts();
        const destFileName = await path.resolve(root, pathDestHosts);
        await writeTextFile(destFileName, data);
      }
      await saveCacheHost(host, data);
      logger.log(`Loaded hosts ✨📋`);
      logger.log(`Saved host in cache ✨📁`);
      if (refetching && !forceUpdate) {
        configCache.hostTimeExpire = new Date(
          new Date().getTime() + TIME_EXPIRED
        );
        return res();
      }
      await setConfigHost(host, forceUpdate);
      res();
    } catch (err) {
      rej(err);
    }
  };
  return new Promise(cb);
};

export const getHostFromCache = (pathCacheHost, host) =>
  new Promise(async (res, rej) => {
    try {
      logger.log(`Loading hosts from ${pathCacheHost} ⌛📋`);
      const pathDestHosts = await paths.getPathDestHosts();
      const destFileName = await path.resolve(pathDestHosts);
      await copyFile(pathCacheHost, destFileName);
      logger.log(`Loaded hosts ✨📋`);
      await setConfigHost(host);
      res();
    } catch (err) {
      rej(err);
    }
  });
