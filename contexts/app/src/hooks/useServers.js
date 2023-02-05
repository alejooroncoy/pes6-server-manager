import { useEffect, useState } from "react";
import {
  configHostCache,
  existsCache,
  initialCache,
  setCache,
} from "../config/cache";
import loadHost from "../utils/loadHost";

export default function useServers(serversGetted) {
  const [servers] = useState(serversGetted);
  const chooseServer = async (serverName) => {
    if (!configHostCache.length) await setCache(servers, "hosts");
    await loadHost(serverName);
  };

  const loadServers = async () => {
    const existsDirCache = await existsCache();
    if (!existsDirCache) await initialCache();
    await setCache(servers, "hosts");
  };

  useEffect(() => {
    loadServers();
  }, []);
  return [
    servers,
    {
      chooseServer,
    },
  ];
}
