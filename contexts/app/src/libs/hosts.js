import config from "../config";
import {
  existsCache,
  getCacheList,
  getPathCache,
  initialCache,
} from "../config/cache";
import logger from "./logger";

const hosts = {
  async getHosts(list) {
    let success = false;
    try {
      do {
        try {
          logger.log(`Loading servers from ${urlListHosts} ⌛✨`);
          const existsDirCache = await existsCache();
          if (!existsDirCache) await initialCache();
          await setCache(list, "hosts");
          logger.log(`Loaded servers ⚽✨`);
          success = true;
          return list;
        } catch (err) {
          config.updateBaseUrl();
        }
      } while (config.baseUrl || !success);
      logger.error(
        `Our cloud service has problems now, we will try to get the cache data! 😢⚽`
      );
      throw Error("Try in cache");
    } catch (err) {
      const existsDirCache = await existsCache();
      if (existsDirCache) {
        const pathCache = await getPathCache();
        logger.log(`Loading servers from ${pathCache} ⌛✨`);
        const list = await getCacheList();
        logger.log(`Loaded servers ⚽✨`);
        return list;
      }
    }
  },
  async getHostDefault() {
    const hostsList = await getCacheList();
    return hostsList.find((host) => host.activate)?.id || 2;
  },
};

export default hosts;
