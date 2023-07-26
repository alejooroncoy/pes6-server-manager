import fetch from "node-fetch";
import config from "../config/index.js";

const github = {
  async getReleaseByTag(tag) {
    const response = await fetch(`${config.githubReleaseBase}/tags/${tag}`, {
      headers: {
        Authorization: `token ${config.githubToken}`,
      },
    });
    const release = await response.json();
    return release;
  },
  async getReleaseLatest() {
    const response = await fetch(`${config.githubReleaseBase}/latest`, {
      headers: {
        Authorization: `token ${config.githubToken}`,
      },
    });
    const release = await response.json();
    return release;
  },
  async getSignature(browserDownloadUrl) {
    const response = await fetch(browserDownloadUrl, {
      headers: {
        Authorization: `token ${config.githubToken}`,
      },
    });
    const signature = await response.text();
    return signature;
  },
};

export default github;
