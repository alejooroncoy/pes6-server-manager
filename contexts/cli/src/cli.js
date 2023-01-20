#!/usr/bin/env node
import prompts from "prompts";
import { program } from "commander";
import config from "./config/index.js";
import openPes6 from "./utils/openPes6.js";
import loadHost from "./utils/loadHost.js";
import Spinner from "./utils/Spinner.js";
import errorHandler from "./handles/error.handler.js";

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
  const hosts = await config.getHosts();
  const choices = hosts
    .map((host) => ({
      ...host,
      name: host.name
        .at(0)
        .toUpperCase()
        .concat(host.name.slice(1, host.name.length)),
    }))
    .map((host) => ({
      title: host.name,
      description: `Server ${host.name} ✨`,
      value: host.name,
      disabled: host.status !== "working",
    }));
  const { host } = await prompts({
    type: "select",
    name: "host",
    message: config.message,
    choices,
    initial: hosts.findIndex((host) => host.name === config.hostDefault),
    warn: `This server is still under development to be able to change its host, coming soon available ✨🛠`,
  });
  if (host) {
    await loadHost(host);
    let isOpen = open;
    if (open === undefined) {
      const { isOpen: canOpen } = await prompts({
        type: "confirm",
        name: "isOpen",
        message: "Do you want PES 6 to open?",
        initial: false,
      });
      isOpen = canOpen;
    }
    if (isOpen) {
      const spinner = new Spinner({
        text: "Opening Pes 6...",
      });
      spinner.start("Opening Pes 6...");
      return openPes6(spinner, () => {
        spinner.stop(`Opened pes 6! ⚽😉`);
        process.exit(0);
      });
    }
    return;
  }
  console.log("No host chosen for pes 6 😪");
};

program
  .option("-o, --open", "Open Pes 6 after change host ✨⚽")
  .description("After changed host, open Pes 6 ✨⚽")
  .action(cli);

program.parse(process.argv);
errorHandler(config);
