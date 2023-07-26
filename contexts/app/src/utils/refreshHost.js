import { setConfigHost } from "../config/cache";

export default async function refreshHost(hostname) {
  await setConfigHost(hostname, true);
}
