import internetAvailable from "internet-available";
import { getPathCacheHost } from "../config/cache.js";
import { getHostFromCache, getHostFromUrl } from "./getHost.js";

export default async function loadHost(host) {
  const pathCacheHost = getPathCacheHost(host.toLowerCase());
  if (pathCacheHost) {
    await getHostFromCache(pathCacheHost, host.toLowerCase());
  } else {
    try {
      await internetAvailable();
      await getHostFromUrl(host);
    } catch (err) {
      console.log(err);
      await getHostFromCache(pathCacheHost, host.toLowerCase());
    }
  }
  console.log(`Server changed to ${host}! ✨`);
}
