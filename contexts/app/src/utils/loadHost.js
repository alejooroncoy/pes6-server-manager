import { getPathCacheHost } from "../config/cache.js";
import logger from "../libs/logger.js";
import { getHostFromCache, getHostFromUrl } from "./getHost.js";
import { actionSerial } from "./serialPs2.js";

export default async function loadHost(host) {
  const pathCacheHost = await getPathCacheHost(host.toLowerCase());
  if (pathCacheHost) {
    await getHostFromCache(pathCacheHost, host.toLowerCase());
    await actionSerial(host);
  } else {
    try {
      await getHostFromUrl(host);
      await actionSerial(host);
    } catch (err) {
      await getHostFromCache(pathCacheHost, host.toLowerCase());
      await actionSerial(host);
    }
  }
  logger.log(`Server changed to ${host}! ⚽`, {
    icon: "✨",
  });
}
