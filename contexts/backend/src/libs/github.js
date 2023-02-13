import fetch from "node-fetch";
import config from "../config/index.js";

const github = {
  async getReleaseByTag(tag) {
    const response = await fetch(`${config.githubReleaseBase}/tags/${tag}`);
    const release = await response.json();
    return release;
  },
  async getReleaseLatest() {
    const response = await fetch(`${config.githubReleaseBase}/latest`);
    const release = await response.json();
    return release;
  },
  async getSignature(browserDownloadUrl) {
    const response = await fetch(browserDownloadUrl);
    const signature = await response.text();
    return signature;
  },
};

export default github;
