#!/usr/bin/env node
import prompts from "prompts";
import { program } from "commander";
import config from "./config/index.js";
import openPes6 from "./utils/openPes6.js";
import loadHost from "./utils/loadHost.js";
import Spinner from "./utils/Spinner.js";

program
  .name("psm")
  .description(
    `Pes6 server manager helps its users to be able to have control of the servers where they play. In this way, with a few simple clicks, play PES 6 on the server of your choice. 💻⚽`
  )
  .version(
    "0.0.1",
    "-v, --version",
    "Output the Pes6 server manager's current version ⚽💻"
  );

const cli = async ({ open }) => {
  config.cli = true;
  const choices = config.hosts
    .map((host) => host.at(0).toUpperCase().concat(host.slice(1, host.length)))
    .map((host) => ({
      title: host,
      description: `Server ${host} ✨`,
      value: host,
    }));

  const { host } = await prompts({
    type: "select",
    name: "host",
    message: config.message,
    choices,
    initial: config.hosts.findIndex((host) => host === config.hostDefault),
  });
  if (host) {
    loadHost(host);
    console.log(`Server changed to ${host}! ✨`);
    if (open) {
      const spinner = new Spinner({
        text: "Opening Pes 6...",
      });
      spinner.start("Opening Pes 6...");
      return openPes6(spinner, () => {
        spinner.stop(`Opened pes 6! ⚽😉`);
        process.exit(0);
      });
    }
    return process.exit(0);
  }
  console.log("No host chosen for pes 6 😪");
};

program
  .option("-o, --open")
  .description("After changed host, open Pes 6 ✨⚽")
  .action(cli);

program.parse(process.argv);
