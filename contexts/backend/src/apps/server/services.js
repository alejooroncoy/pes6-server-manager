import getSupabase from "../../libs/supabase.js";

const serverServices = {
  supabase: getSupabase(),
  async getAll() {
    const { supabase } = this;
    const servers = await supabase.from("servers").select();
    return servers;
  },
  async getUnique(name) {
    const { supabase } = this;
    const server = await supabase.from("servers").select().eq("name", name);
    const [serverData] = server.data;
    server.data = serverData;
    return server;
  },
  /**
   *
   * @param {String} name
   * @returns {Promise<{
   *   data: Blob;
   *  error: null;
   *   }}
   */
  async getFileHostUnique(name) {
    const { supabase } = this;
    const fileHost = await supabase.storage.from("servers").download(name);
    return fileHost;
  },
};

export default serverServices;
