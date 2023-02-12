import { Command } from "@tauri-apps/api/shell";
import logger from "../libs/logger";
import locationPes6 from "../libs/locationPes6";
import { getIsWsl, isWindows } from "./getOs";

export default async function openPes6() {
  const locationPes = await locationPes6.getLocationPes();
  const commandStartPes6 = await locationPes6.getCommandStartPes6();
  logger.log(`Open pes6 from ${locationPes} ✨⚽`);
  const osIsWindows = await isWindows();
  const isWsl = await getIsWsl();
  if (osIsWindows || isWsl) {
    const command = new Command("powershell", commandStartPes6, {
      encoding: "utf-8",
      cwd: locationPes,
    });
    await command.spawn();
  }
}
