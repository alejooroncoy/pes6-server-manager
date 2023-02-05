import path from "node:path";
import { exec } from "node:child_process";
import config from "../config/index.js";

export default async function openPes6(callback) {
  const locationPes = await config.getLocationPes();
  const pathPes6 = path.resolve(config.root, locationPes);
  config.spinner.text = `Open pes6 from ${locationPes} ✨⚽`;
  const execPes6 = exec(`cd "${pathPes6}" && ${config.commandStartPes6}`, {
    timeout: 0,
  });
  execPes6.on(
    "exit",
    callback ||
      (() => {
        console.log(`Opened pes 6! ⚽😉`);
        process.exit(0);
      })
  );
}
