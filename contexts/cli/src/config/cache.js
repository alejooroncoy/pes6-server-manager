import {
  existsSync,
  mkdirSync,
  createWriteStream,
  writeFileSync,
  readdirSync,
  readFileSync,
} from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { getHostFromUrl } from "../utils/getHost.js";
import config from "./index.js";

export const TIME_EXPIRED = 1000 * 60 * 60 * 24 * 5; // 5 days;

let configHostCache = [];

export const getPathCache = () =>
  path.resolve(config.root, "./Program Files/psm/.cache");

export const getPathLocationPes6Cache = () =>
  path.resolve(getPathCache(), `./location.txt`);

export const getPathSerialPes6Cache = () =>
  path.resolve(getPathCache(), `./serial.txt`);

export const getPathCacheHost = (hostName, createAction) => {
  const pathHostCache = path.resolve(
    getPathCache(),
    `./${hostName.toLowerCase()}`
  );
  const pathHostCacheFile = path.resolve(pathHostCache, "./hosts");
  if (createAction || existsSync(pathHostCacheFile)) return pathHostCacheFile;
};

export const getCacheList = () => {
  const pathHostConfigCache = path.resolve(getPathCache(), `./config.json`);
  if (!existsSync(pathHostConfigCache)) return [];
  const contentConfig = readFileSync(pathHostConfigCache, "utf-8");
  const hostsList = JSON.parse(contentConfig);
  return hostsList;
};

export const setCache = (hosts) => {
  const cacheHosts = readdirSync(getPathCache(), "utf-8");
  hosts
    .filter((host) => !cacheHosts.includes(host))
    .map((host) => {
      const pathHostCache = path.resolve(getPathCache(), `./${host.name}`);
      mkdirSync(pathHostCache, {
        recursive: true,
      });
    });

  const pathHostConfigCache = path.resolve(getPathCache(), `./config.json`);
  const hostsList = getCacheList();
  const hostsVerificated = !hostsList.length
    ? hosts.map((host) => ({
        ...host,
        activate: false,
        hostTimeExpire: new Date(new Date().getTime() + TIME_EXPIRED),
      }))
    : hostsList.map((host) => ({
        ...host,
        activate: false,
      }));

  configHostCache = new Proxy(hostsVerificated, {
    get(target, key) {
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      Reflect.set(target, key, value);
      writeFileSync(pathHostConfigCache, JSON.stringify(target), "utf-8");
    },
  });
};

export const saveCacheHost = (hostName) => {
  const pathCacheHost = getPathCacheHost(hostName, true);
  const writeOutput = createWriteStream(pathCacheHost, "utf-8");
  return writeOutput;
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
  await mkdir(getPathCache(), {
    recursive: true,
  });
};

export const existsCache = () => existsSync(getPathCache());

export const setLocationPes6Cache = (location) => {
  const pathLocationPes6Cache = getPathLocationPes6Cache();
  writeFileSync(pathLocationPes6Cache, location, "utf-8");
};

export const getLocationPes6Cache = () => {
  const pathLocationPes6Cache = getPathLocationPes6Cache();
  if (!existsSync(pathLocationPes6Cache)) return null;
  const location = readFileSync(pathLocationPes6Cache, "utf-8");
  return location;
};

export const setSerialPes6Cache = (serial) => {
  const pathSerialPes6Cache = getPathSerialPes6Cache();
  writeFileSync(pathSerialPes6Cache, serial, "utf-8");
};

export const getSerialPes6Cache = () => {
  const pathSerialPes6Cache = getPathSerialPes6Cache();
  if (!existsSync(pathSerialPes6Cache)) return null;
  const serial = readFileSync(pathSerialPes6Cache, "utf-8");
  return serial;
};
