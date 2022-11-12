#!/usr/bin/env node
import { program } from "commander";

program
  .name("pes6-server-manager")
  .description(
    `Pes6 server manager helps its users to be able to have control of the servers where they play. In this way, with a few simple clicks, play PES 6 on the server of your choice.`
  )
  .version("0.0.1");

const cli = async ({ open }) => {};

program
  .option("-o, --open")
  .description("After changed host, open Pes 6 ✨⚽")
  .action(cli);

program.parse(process.argv);
