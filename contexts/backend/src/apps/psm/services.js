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
    const release = await github.getReleaseByTag(tag);
    return release;
  },
  async getAsset(assets, platform) {
    const schema = {};
    if (platform === "windows_x86_64") {
      await Promise.all(
        assets.forEach(async (asset) => {
          const { browser_download_url: browserDownloadUrl } = asset;
          if (asset.name.endsWith("x64_en-US.msi.zip")) {
            schema.url = browserDownloadUrl;
            return;
          }
          if (asset.name.endsWith("x64_en-US.msi.zip.sig")) {
            const signature = await github.getSignature(browserDownloadUrl);
            schema.signature = signature;
          }
        })
      );
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
    const { url, signature } = await this.getAsset(release.assets, platform);
    schema.url = url;
    schema.signature = signature;
    return schema;
  },
};

export default psmServices;
