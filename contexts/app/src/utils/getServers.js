import config from "../config";

export default async function getServers() {
  let success = false;
  const attemps = 5;
  let attempIndex = 0;
  do {
    try {
      config.updateBaseUrl();
      const urlListHosts = new URL(`${config.urlServers}/list`);
      console.log(`Loading servers from ${urlListHosts} ⌛✨`);
      const response = await fetch(urlListHosts, {
        method: "GET",
      });
      const { data: list } = await response.json();
      console.log(`Loaded servers ⚽✨`);
      success = true;
      return list;
    } catch (err) {
      if (attempIndex === attemps) return [];
      attempIndex++;
      config.updateBaseUrl();
    }
  } while (config.baseUrl || !success);
}
