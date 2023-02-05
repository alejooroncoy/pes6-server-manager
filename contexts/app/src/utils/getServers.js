import config from "../config";
import logger from "../libs/logger";

export default async function getServers() {
  let success = false;
  do {
    try {
      config.updateBaseUrl();
      const urlListHosts = new URL(`${config.urlServers}/list`);
      logger.log(`Loading servers from ${urlListHosts} ⌛✨`);
      const response = await fetch(urlListHosts, {
        method: "GET",
      });
      const { data: list } = await response.json();
      logger.log(`Loaded servers ⚽✨`);
      success = true;
      return list;
    } catch (err) {
      config.updateBaseUrl();
    }
  } while (config.baseUrl || !success);
}
