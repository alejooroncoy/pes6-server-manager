type Config = {
  [key: string]: string | undefined;
};

const config: Config = {
  baseUrlBackend: Deno.env.get("BASE_URL_BACKEND"),
  supabaseUrl: Deno.env.get("SUPABASE_URL"),
  supabaseServiceRoleKey: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
  zamzarApiKey: Deno.env.get("ZAMZAR_API_KEY"),
};

export default config;
