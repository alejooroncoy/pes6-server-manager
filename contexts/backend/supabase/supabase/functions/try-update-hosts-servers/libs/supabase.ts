import {
  SupabaseClient,
  createClient,
} from "https://esm.sh/@supabase/supabase-js@2";
import config from "../config/index.ts";

const getSupabase = () => {
  const client: SupabaseClient = createClient(
    config.supabaseUrl ?? "",
    config.supabaseServiceRoleKey ?? "",
    {
      auth: {
        persistSession: false,
      },

      global: {
        headers: {
          "x-my-custom-header": "psm",
        },
      },
    }
  );
  return client;
};

export default getSupabase;
