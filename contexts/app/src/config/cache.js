import {
  exists,
  createDir,
  readTextFile,
  readDir,
  writeTextFile,
} from "@tauri-apps/api/fs";
import * as path from "@tauri-apps/api/path";
import { getHostFromUrl } from "../utils/getHost.js";

export const TIME_EXPIRED = 1000 * 60 * 60 * 24 * 5; // 5 days;

export let configHostCache = [];

export const getPathCache = async () => {
  const appCacheDirPath = await path.appCacheDir();
  return appCacheDirPath;
};

export const getPathLocationPes6Cache = async () => {
  const pathCache = await getPathCache();
  return path.resolve(pathCache, `./location.txt`);
};
export const getPathSerialPes6Cache = async () => {
  const pathCache = await getPathCache();
  return path.resolve(pathCache, `./serial.txt`);
};

export const getPathCacheHost = async (hostName, createAction) => {
  const pathCache = await getPathCache();
  const pathHostCache = await path.resolve(
    pathCache,
    `./${hostName.toLowerCase()}`
  );
  const pathHostCacheFile = await path.resolve(pathHostCache, "./hosts");
  const exitsPathHostCacheFile = await exists(pathHostCacheFile);
  if (createAction || exitsPathHostCacheFile) return pathHostCacheFile;
};

export const getCacheList = async () => {
  const pathCache = await getPathCache();
  const pathHostConfigCache = await path.resolve(pathCache, `./config.json`);
  const isPathHostConfigCache = await exists(pathHostConfigCache);
  if (!isPathHostConfigCache) return [];
  const contentConfig = await readTextFile(pathHostConfigCache);
  const hostsList = JSON.parse(contentConfig);
  return hostsList;
};

export const setCache = async (hosts) => {
  const pathCache = await getPathCache();
  const cacheHosts = await readDir(pathCache);
  await Promise.all(
    hosts
      .filter((host) => !cacheHosts.includes(host))
      .map(async (host) => {
        const pathHostCache = await path.resolve(pathCache, `./${host.name}`);
        await createDir(pathHostCache, {
          recursive: true,
        });
      })
  );

  const pathHostConfigCache = await path.resolve(pathCache, `./config.json`);
  const hostCacheList = await getCacheList();
  const hostsVerificated = !hostCacheList.length
    ? hosts.map((host) => ({
        ...host,
        activate: false,
        hostTimeExpire: new Date(new Date().getTime() + TIME_EXPIRED),
      }))
    : hostCacheList.map((host) => ({
        ...host,
        activate: false,
      }));

  configHostCache = new Proxy(hostsVerificated, {
    get(target, key) {
      return Reflect.get(target, key);
    },
    async set(target, key, value) {
      Reflect.set(target, key, value);
      await writeTextFile(pathHostConfigCache, JSON.stringify(target));
    },
  });
};

export const saveCacheHost = async (hostName, hostContent) => {
  const pathCacheHost = await getPathCacheHost(hostName, true);
  await writeTextFile(pathCacheHost, hostContent);
};

export const setConfigHost = async (hostName) => {
  const configCacheIndex = configHostCache.findIndex(
    ({ name }) => name === hostName.toLowerCase()
  );
  const configCache = configHostCache.at(configCacheIndex);
  if (new Date(configCache.hostTimeExpire) < new Date()) {
    await getHostFromUrl(hostName, {
      refetching: true,
      config: configCache,
    });
  }
  configCache.activate = true;
  Reflect.set(configHostCache, configCacheIndex, configCache);
};

export const initialCache = async () => {
  const pathCache = await getPathCache();
  await createDir(pathCache, {
    recursive: true,
  });
};

export const existsCache = async () => {
  const pathCache = await getPathCache();
  return exists(pathCache);
};

export const setLocationPes6Cache = async (location) => {
  const pathLocationPes6Cache = await getPathLocationPes6Cache();
  await writeTextFile(pathLocationPes6Cache, location);
};

export const getLocationPes6Cache = async () => {
  const pathLocationPes6Cache = await getPathLocationPes6Cache();
  const isPathSerialPes6Cache = await exists(pathLocationPes6Cache);
  if (!isPathSerialPes6Cache) return null;
  let location = await readTextFile(pathLocationPes6Cache);
  if (location.at(-1) === path.sep) location.slice(0, -1);
  return location;
};

export const setSerialPes6Cache = async (serial) => {
  const pathSerialPes6Cache = await getPathSerialPes6Cache();
  await writeTextFile(pathSerialPes6Cache, serial);
};

export const getSerialPes6Cache = async () => {
  const pathSerialPes6Cache = await getPathSerialPes6Cache();
  const isPathSerialPes6Cache = await exists(pathSerialPes6Cache);
  if (!isPathSerialPes6Cache) return null;
  const serial = await readTextFile(pathSerialPes6Cache);
  return serial;
};
