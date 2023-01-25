import getSupabase from "../../libs/supabase.js";
import getLinkFromMediafire from "../../utils/getLinkFromMediafire.js";

const psmServices = {
  supabase: getSupabase(),
  async getPsmFileBin(version) {
    const { supabase } = this;
    const urlDownloaded = await supabase.storage
      .from("url")
      .download(`urlMediafire-${version}.txt`);
    const url = await urlDownloaded.data.text();
    const link = await getLinkFromMediafire(url);
    return link;
  },
  async uploadPsmFileBin(body, version) {
    const { supabase } = this;
    const { url } = body;
    const data = await supabase.storage
      .from("url")
      .upload(`urlMediafire-${version}.txt`, url, {
        upsert: true,
      });

    return data;
  },
};

export default psmServices;
