import { SupabaseClient } from "https://esm.sh/v130/@supabase/supabase-js@2.31.0/dist/module/index.js";
import { encode } from "https://deno.land/std@0.197.0/encoding/base64.ts";
import getSupabase from "../libs/supabase.ts";
import {
  BlobReader,
  ZipReader,
  Entry,
  TextWriter,
} from "https://deno.land/x/zipjs/index.js";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import config from "../config/index.ts";

interface Server {
  name: string;
  created_at: Date;
  status: string;
  description: string;
  id: number;
  urlHost: string;
  img: string;
  urlHome: string;
}

interface HostsResolve {
  [key: string]: () => Promise<string | null>;
}

const uploadHost = (
  // deno-lint-ignore no-explicit-any
  supabase: SupabaseClient<any, "public", any>,
  server: Server,
  textHost: string
) => {
  return supabase.storage.from("servers").upload(server.name, textHost, {
    upsert: true,
  });
};

const fromZipToRar = async (hostNew: Blob) => {
  const formData = new FormData();
  const headers = new Headers();

  formData.append("target_format", "zip");
  formData.append("source_format", "rar");
  formData.append("source_file", hostNew);
  headers.append("Authorization", `Basic ${encode(`${config.zamzarApiKey}:`)}`);

  const responseJob = await fetch("https://sandbox.zamzar.com/v1/jobs/", {
    method: "POST",
    headers,
    body: formData,
  });
  const dataJob = await responseJob.json();
  let dataCheckJob = null;
  do {
    const responseCheckJob = await fetch(
      `https://sandbox.zamzar.com/v1/jobs/${dataJob.id}`,
      {
        method: "GET",
        headers,
      }
    );
    dataCheckJob = await responseCheckJob.json();
  } while (dataCheckJob.errors || dataCheckJob.status !== "successful");

  const {
    target_files: [fileCheckJob],
  } = dataCheckJob;
  const responseFile = await fetch(
    `https://sandbox.zamzar.com/v1/files/${fileCheckJob.id}/content`,
    {
      method: "GET",
      headers,
    }
  );

  const fileHostNew = await responseFile.blob();
  return fileHostNew;
};

const decompress = async (urlHost: string) => {
  const responseHost = await fetch(urlHost, {
    method: "GET",
  });

  let hostNew = await responseHost.blob();

  if (urlHost.endsWith(".rar")) {
    hostNew = await fromZipToRar(hostNew);
  }

  const zipFileHostNew = new BlobReader(hostNew);
  const zipFileHostNewReader = new ZipReader(zipFileHostNew);
  const entries = await zipFileHostNewReader.getEntries();

  let fileHostNew: string | null = null;

  let i = 0;

  const resolveEntries = new Promise((res, rej) => {
    entries.forEach(async (entrie: Entry) => {
      try {
        if (
          !fileHostNew &&
          entrie.filename.includes("hosts") &&
          entrie.getData
        ) {
          const entrieTransformStream = new TextWriter();
          const data = await entrie.getData(entrieTransformStream);
          if (
            data.includes("pes6gate-ec.winning-eleven.net") &&
            data.includes("we9stun.winning-eleven.net")
          )
            fileHostNew = data;
        }
        if (i === entries.length - 1) return res(null);
        i++;
      } catch (err) {
        rej(err);
      }
    });
  });

  await resolveEntries;

  await zipFileHostNewReader.close();
  return fileHostNew;
};

const getDom = async (urlHost: string) => {
  const response = await fetch(urlHost);
  const html = await response.text();
  const $ = cheerio.load(html);
  return $;
};

const getFileHostNew = async (server: Server): Promise<string | null> => {
  const hostsResolve: HostsResolve = {
    async stars() {
      const fileHostNew = await decompress(server.urlHost);
      return fileHostNew;
    },
    ["pes6.es"]: async function () {
      const $ = await getDom(server.urlHost);
      const element = $(
        "table.boxtable > tbody > tr > td > font > b > a:contains('HOST FILE')"
      );
      const href = element.attr()?.href?.toString() || "";
      const $$ = await getDom(href);
      const elementURL = $$("#download_link > #downloadButton");
      const url = elementURL.attr()?.href?.toString() || "";
      const fileHostNew = await decompress(url);
      return fileHostNew;
    },
  };
  const fileHostNew = await hostsResolve[server.name]?.call(hostsResolve);

  return fileHostNew;
};

export default async function checkUpdateHosts(servers: Server[]) {
  const serversAtCheck = servers.filter((server) => server.urlHost !== "local");
  let i = 0;
  const supabase = getSupabase();

  const checkHosts = new Promise((res, rej) => {
    serversAtCheck.forEach(async (server: Server) => {
      try {
        const fileHost = await supabase.storage
          .from("servers")
          .download(server.name);

        const textHostOld = await fileHost.data?.text();

        const fileHostNew = await getFileHostNew(server);

        if (fileHostNew && textHostOld && fileHostNew !== textHostOld)
          await uploadHost(supabase, server, fileHostNew);

        if (i === serversAtCheck.length - 1) return res(null);
        i++;
      } catch (err) {
        rej(err);
      }
    });
  });

  try {
    await checkHosts;
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
}
