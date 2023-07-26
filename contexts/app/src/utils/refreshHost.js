import { getHostFromUrl } from "./getHost";

export default async function refreshHost(hostname) {
  await getHostFromUrl(hostname, {
    refetching: true,
    forceUpdate: true,
  });
}
