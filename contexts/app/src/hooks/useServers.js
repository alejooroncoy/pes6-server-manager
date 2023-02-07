import { useEffect, useState } from "react";
import { configHostCache, setCache, existsCache } from "../config/cache";
import loadHost from "../utils/loadHost";
import hosts from "../libs/hosts";

export default function useServers(serversGetted) {
  const [servers, setServers] = useState(serversGetted);
  const [serverPlaying, setServerPlaying] = useState("");

  const chooseServer = async (serverName) => {
    if (!configHostCache.length) await setCache(servers, "hosts");
    await loadHost(serverName);
    setServerPlaying(serverName);
  };

  const loadServers = async () => {
    const existsDirCache = await existsCache();
    if (!existsDirCache) await initialCache();
    await setCache(servers, "hosts");
    const hostDefault = await hosts.getHostDefault();
    setServerPlaying(hostDefault);
  };

  useEffect(() => {
    loadServers();
  }, []);

  useEffect(() => {
    setServers(
      servers.map((server) => {
        if (server.activate)
          return {
            ...server,
            activate: false,
          };
        if (server.name === serverPlaying)
          return {
            ...server,
            activate: true,
          };
        return server;
      })
    );
  }, [serverPlaying]);
  return [
    servers,
    {
      chooseServer,
      serverPlaying,
      setServers,
    },
  ];
}
