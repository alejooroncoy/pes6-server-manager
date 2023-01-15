import { Dropbox } from "dropbox";
import fetch from "node-fetch";
import config from "../config/index.js";

/**
 * @name getDropbox
 * @returns {import('dropbox').Dropbox}
 */
const getDropbox = () => {
  const dropbox = new Dropbox({
    fetch,
    refreshToken: config.dropboxRefreshToken,
    clientId: config.dropboxClientId,
    clientSecret: config.dropboxClientSecret,
  });
  return dropbox;
};

export default getDropbox;
