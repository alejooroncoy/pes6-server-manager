import { compare, valid } from "semver";
import github from "../../libs/github.js";
import getSupabase from "../../libs/supabase.js";
import getLinkFromMediafire from "../../utils/getLinkFromMediafire.js";
import dropbox from "../../libs/dropbox.js";

const psmServices = {
  supabase: getSupabase(),
  async getPsmFileLite(version) {
    let pathFile;
    if (version === "latest") pathFile = await dropbox.getLatestFile();
    if (pathFile) pathFile = `${pathFile}/psm.exe`;
    const data = await dropbox.getLinkFile({
      pathFile: pathFile || `/bin/${version}/psm.exe`,
    });
    return data;
  },
  async getPsmFileUltimate(version) {
    const { supabase } = this;
    const urlDownloaded = await supabase.storage
      .from("url")
      .download(`urlMediafire-ultimate-${version}.txt`);
    const link = await urlDownloaded.data.text();
    return link;
  },
  async uploadPsmFileUltimate(body, version) {
    const { supabase } = this;
    const { url } = body;
    const link = await getLinkFromMediafire(url);
    const data = await supabase.storage
      .from("url")
      .upload(`urlMediafire-ultimate-${version}.txt`, link, {
        upsert: true,
      });

    return data;
  },
  async getPsmUltimateRelease(tag) {
    if (tag === "latest") {
      const release = await github.getReleaseLatest();
      return release;
    }
    const release = await github.getReleaseByTag(tag);
    return release;
  },
  async getAsset(assets, platform = "windows", updater = false) {
    const schema = {};
    if (platform === "windows") {
      const injectUrlAndSig = new Promise((res, rej) => {
        let index = 0;
        assets.forEach(async (asset) => {
          try {
            const { browser_download_url: browserDownloadUrl } = asset;
            if (asset.name.endsWith("x64_en-US.msi") && !updater) {
              schema.url = browserDownloadUrl;
              index += 1;
              return;
            }
            if (asset.name.endsWith("x64_en-US.msi.zip") && updater) {
              schema.url = browserDownloadUrl;
              index += 1;
              return;
            }
            if (asset.name.endsWith("x64_en-US.msi.zip.sig") && updater) {
              const signature = await github.getSignature(browserDownloadUrl);
              schema.signature = signature;
            }
            if (index === assets.length - 1) {
              res();
              return;
            }
            index += 1;
          } catch (err) {
            rej(err);
          }
        });
      });
      await injectUrlAndSig;
    }
    return schema;
  },
  async getPsmUltimateUpdater(tag, platform = "windows") {
    if (!valid(tag)) return null;
    const release = await this.getPsmUltimateRelease("latest");

    if (compare(release.tag_name, tag) === 1) {
      const schema = {
        url: "",
        version: release.tag_name,
        notes: release.body,
        pub_date: new Date(release.published_at).toISOString(),
        signature: "",
      };
      const { url, signature } = await this.getAsset(
        release.assets,
        platform,
        true
      );
      schema.url = url;
      schema.signature = signature;
      return schema;
    }
    return null;
  },
};

export default psmServices;
