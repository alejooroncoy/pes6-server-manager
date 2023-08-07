import { createError } from "https://deno.land/x/http_errors/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import checkUpdateHosts from "./utils/checkUpdateHosts.ts";
import config from "./config/index.ts";

serve(async () => {
  const response = await fetch(`${config.baseUrlBackend}/server/list`);

  if (response.ok) {
    const { data: servers } = await response.json();
    const checkHosts = await checkUpdateHosts(servers);
    if (checkHosts.success)
      return new Response("", {
        status: 204,
      });
    return new Response(JSON.stringify(createError(500)));
  }

  const dataError = await response.json();

  const error = createError(500, "Server Error", dataError);

  return new Response(JSON.stringify(error));
});
