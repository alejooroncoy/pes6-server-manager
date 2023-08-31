import { setConfigHost } from "../config/cache";

export default async function refreshHost(server) {
  await setConfigHost(server.name, {
    refetching: true,
    force: true,
    pushHosts: server.activate,
  });
}
