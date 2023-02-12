import { getLocationPes6Cache, setLocationPes6Cache } from "../config/cache";
import { getIsWsl, isWindows } from "../utils/getOs";
import { Command } from "@tauri-apps/api/shell";
import * as path from "@tauri-apps/api/path";
import paths from "../config/paths";
import serial from "./serial";
import logger from "./logger";

const locationPes6 = {
  async getCommandLocationPes() {
    const isWsl = await getIsWsl();
    const osIsWindows = await isWindows();

    if (isWsl || osIsWindows) {
      return `(Get-ItemProperty -Path ${serial.pes6PathProperty}).installdir`;
    }
  },
  async autoDetectLocationPes() {
    const findLocationPes = new Promise(async (res, rej) => {
      try {
        const commandLocationPes = await this.getCommandLocationPes();
        const command = new Command("powershell", [commandLocationPes], {
          encoding: "utf-8",
        });
        const executed = await command.execute();
        if (executed.stderr) res("");
        else res(executed.stdout.trim().slice(0, -1));
      } catch (err) {
        rej(err);
      }
    });
    const locationPes = await findLocationPes;
    if (locationPes) {
      await setLocationPes6Cache(locationPes);
    }
    return locationPes;
  },
  async getLocationPes() {
    const isWsl = await getIsWsl();
    const osIsWindows = await isWindows();
    if (isWsl || osIsWindows) {
      const locationPes6Cache = await getLocationPes6Cache();
      if (locationPes6Cache) return locationPes6Cache;
      const root = await paths.getRoot();

      const pathPes6Default = await path.resolve(
        root,
        "./Program Files (x86)/KONAMI/Pro Evolution Soccer 6"
      );
      const existsPathPes6Default = await exists(pathPes6Default);
      if (existsPathPes6Default) return pathPes6Default;

      const findLocationPes = new Promise(async (res, rej) => {
        try {
          const commandLocationPes = await this.getCommandLocationPes();
          const command = new Command("powershell", [commandLocationPes], {
            encoding: "utf-8",
          });
          const executed = await command.execute();
          if (executed.stderr) res("");
          else res(executed.stdout.trim().slice(0, -1));
        } catch (err) {
          rej(err);
        }
      });
      try {
        const locationPes = await findLocationPes;
        return locationPes;
      } catch (err) {
        logger.error("We couldn’t find your pes6.exe file path:(");
      }
    }
  },
  async getCommandStartPes6() {
    const isWsl = await getIsWsl();
    return isWsl ? "cmd.exe /c start pes6.exe" : 'cmd.exe /c "start pes6.exe"';
  },
};

export default locationPes6;
