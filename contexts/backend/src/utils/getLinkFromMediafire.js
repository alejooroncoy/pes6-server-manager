import { parse } from "node-html-parser";
import fetch from "node-fetch";

// some mediafire links are instant downloads
// and that will potentially crash our JSDOM parsing or make node run out of memory
// so this function makes sure that the given link returns "text/html" content-type
async function checkLinkResponseType(link) {
  const response = await fetch(link, {
    method: "HEAD",
  });
  const { headers } = response;

  // content type is something other than html
  if (!headers?.["content-type"]?.includes("text/html")) {
    return headers["content-type"];
  }

  return false;
}

export default async function getLinkFromMediafire(link) {
  try {
    // make sure we are going to be handling html before requesting data
    const type = await checkLinkResponseType(link);

    // TODO: return link based on content-type
    // right now we just assume anything besides text/html is a direct dl link
    if (type) return link;

    const response = await fetch(link, {
      method: "GET",
    });
    const content = await response.text();

    const dom = parse(content);
    const downloadButton = dom.querySelector("#downloadButton");

    if (!downloadButton) throw new Error("Could not find download button");

    return downloadButton.getAttribute("href");
  } catch (err) {
    if (err.response) {
      if (err.response.status === 404) {
        throw new Error("The key you provided for file access was invalid.");
      }

      throw new Error(`Mediafire returned status ${err.response.status}`);
    }

    throw err;
  }
}
