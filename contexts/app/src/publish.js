const prompts = require("prompts");
const packageJson = require("../package.json");
const { config: configDotenv } = require("dotenv");

configDotenv({
  path: "./.env.production.local",
});

const { version } = packageJson;

const fetchWithTimeout = async (resource, options = {}) => {
  const { timeout = 60000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

const main = async () => {
  const basesUrl = process.env.NEXT_PUBLIC_BASES_URL;
  const basesUrlList = basesUrl.split(",");
  let index = 0;

  let baseUrl = null;

  do {
    baseUrl = basesUrlList.at(index);

    const urlMediafire = await prompts({
      type: "text",
      name: "value",
      message: "Write url mediafire of the file",
    });

    const headersFetch = new Headers();

    headersFetch.append("Content-Type", "application/json; charset=utf-8");

    if (urlMediafire.value || process.env.URL_MEDIAFIRE) {
      try {
        const response = await fetchWithTimeout(
          `${baseUrl}/psm/ultimate?version=${version}`,
          {
            method: "POST",
            body: JSON.stringify({
              url: process.env.URL_MEDIAFIRE || urlMediafire.value,
            }),
            headers: headersFetch,
          }
        );

        const data = await response.json();
        console.log(data);
      } catch (err) {
        index++;
        baseUrl = basesUrlList.at(index);
      }
    } else {
      console.log("Missing url mediafire");
    }
    process.exit(0);
  } while (baseUrl || !success);
};

main();
