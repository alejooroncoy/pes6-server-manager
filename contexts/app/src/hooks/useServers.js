import { useEffect, useState } from "react";
import { configHostCache, setCache, existsCache } from "../config/cache";
import loadHost from "../utils/loadHost";
import hosts from "../libs/hosts";
import refreshHost from "../utils/refreshHost";

export default function useServers(serversGetted) {
  const [servers, setServers] = useState(serversGetted || []);
  const [serverPlaying, setServerPlaying] = useState(null);

  const chooseServer = async (id) => {
    const server = servers.find((server) => server.id === id);
    if (!configHostCache.length) await setCache(servers, "hosts");
    await loadHost(server.name);
    setServerPlaying(server);
  };

  const loadServers = async () => {
    const existsDirCache = await existsCache();
    if (!existsDirCache) await initialCache();
    await setCache(servers, "hosts");
    const hostDefault = await hosts.getHostDefault();
    const server = servers.find((server) => server.id === hostDefault);
    setServerPlaying(server);
  };

  const refreshHostServer = async (id) => {
    const server = servers.find((server) => server.id === id);
    await refreshHost(server);
  };

  useEffect(() => {
    loadServers();
  }, []);

  useEffect(() => {
    setServers(
      servers.map((server) => {
        if (server.name === serverPlaying?.name)
          return {
            ...server,
            activate: true,
          };
        if (server.activate)
          return {
            ...server,
            activate: false,
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
      refreshHost: refreshHostServer,
    },
  ];
}
