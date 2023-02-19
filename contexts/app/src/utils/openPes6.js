import { Command } from "@tauri-apps/api/shell";
import logger from "../libs/logger";
import locationPes6 from "../libs/locationPes6";
import { getIsWsl, isWindows } from "./getOs";

export default async function openPes6() {
  const locationPes = await locationPes6.getLocationPes();
  const commandStartPes6 = await locationPes6.getCommandStartPes6();
  const osIsWindows = await isWindows();
  const isWsl = await getIsWsl();
  if (osIsWindows || isWsl) {
    try {
      const command = new Command("powershell", commandStartPes6, {
        encoding: "utf-8",
        cwd: locationPes,
      });
      const executed = await command.execute();
      if (executed.stderr.length) {
        logger.error(
          "We couldn't open pes6 😢. We recommend changing the location of the folder where your PES6.exe is located 📁"
        );
        return;
      }
      logger.log(`Open pes6 from ${locationPes} ✨⚽`);
    } catch (err) {
      logger.error("We couldn't open pes6 😢");
    }
  }
}
