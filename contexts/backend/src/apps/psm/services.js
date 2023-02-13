import github from "../../libs/github.js";
import getSupabase from "../../libs/supabase.js";
import getLinkFromMediafire from "../../utils/getLinkFromMediafire.js";

const psmServices = {
  supabase: getSupabase(),
  async getPsmFileBin(version) {
    const { supabase } = this;
    const urlDownloaded = await supabase.storage
      .from("url")
      .download(`urlMediafire-${version}.txt`);
    const link = await urlDownloaded.data.text();
    return link;
  },
  async uploadPsmFileBin(body, version) {
    const { supabase } = this;
    const { url } = body;
    const link = await getLinkFromMediafire(url);
    const data = await supabase.storage
      .from("url")
      .upload(`urlMediafire-${version}.txt`, link, {
        upsert: true,
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
  async getAsset(assets, platform = "windows_x86_64", updater = false) {
    const schema = {};
    if (platform === "windows_x86_64") {
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
            index += 1;
            if (index === assets.length - 1) res();
          } catch (err) {
            rej(err);
          }
        });
      });
      await injectUrlAndSig;
    }
    return schema;
  },
  async getPsmUltimateUpdater(tag, platform = "windows_x86_64") {
    const release = await this.getPsmUltimateRelease(tag);
    const schema = {
      url: "",
      version: release.tag_name,
      notes: release.body,
      pub_date: release.published_at,
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
  },
};

export default psmServices;
