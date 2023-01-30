import internetAvailable from "internet-available";
import { getPathCacheHost } from "../config/cache.js";
import { getHostFromCache, getHostFromUrl } from "./getHost.js";
import { actionSerial } from "./serialPs2.js";

export default async function loadHost(host) {
  const pathCacheHost = getPathCacheHost(host.toLowerCase());
  if (pathCacheHost) {
    await getHostFromCache(pathCacheHost, host.toLowerCase());
    await actionSerial(host);
  } else {
    try {
      await internetAvailable();
      await getHostFromUrl(host);
      await actionSerial(host);
    } catch (err) {
      await getHostFromCache(pathCacheHost, host.toLowerCase());
      await actionSerial(host);
    }
  }
  console.log(`Server changed to ${host}! ✨`);
}
