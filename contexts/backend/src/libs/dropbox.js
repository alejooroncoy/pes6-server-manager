import { Dropbox } from "dropbox";
import fetch from "node-fetch";
import { compare } from "semver";
import config from "../config/index.js";

const dropbox = {
  self: new Dropbox({
    fetch,
    refreshToken: config.dropboxRefreshToken,
    clientSecret: config.dropboxClientSecret,
    clientId: config.dropboxClientId,
  }),
  async uploadFile({ pathFile, contents }) {
    const fileUpload = await this.self.filesUpload({
      mode: {
        ".tag": "overwrite",
      },
      path: pathFile,
      contents,
      autorename: false,
    });
    return fileUpload;
  },
  async getLinkFile({ pathFile }) {
    const response = await this.self.filesGetTemporaryLink({
      path: pathFile,
    });
    return response;
  },
  async getLatestFile() {
    const folder = await this.self.filesListFolder({
      path: "/bin",
    });
    const entries = folder.result.entries.sort((entrieA, entrieB) =>
      compare(entrieA?.name, entrieB?.name)
    );
    return entries.at(-1)?.path_lower;
  },
};

export default dropbox;
