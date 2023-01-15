import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";
import config from "../config/index.js";
import cache from "../utils/cache.js";

/**
 * @name getSupabase
 * Get supabase instance
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
const getSupabase = () => {
  if (cache.has("supabase")) return cache.get("supabase");
  const options = {
    db: { schema: "public" },
    global: {
      fetch,
      headers: { "x-my-custom-header": "psm" },
    },
  };
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseApiKey,
    options
  );
  cache.set("supabase", supabase);
  return supabase;
};

export default getSupabase;
