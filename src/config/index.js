import { readdirSync } from "node:fs";
import path from "node:path";
import pathWindows from "node:path/win32";
import isWsl from "is-wsl";
import { isWindows } from "../utils/findOs.js";
import { exec, execFileSync } from "node:child_process";

const config = {
  windDir: "",
  getRootPowershell() {
    if (!this.winDir) {
      this.winDir = execFileSync("powershell.exe", ["echo $env:windir"], {
        encoding: "utf-8",
      });
    }
    const winDirParsed = pathWindows.parse(this.winDir.trim());
    const [device] = winDirParsed.root.split(":");
    return [device, winDirParsed];
  },
  cli: false,
  get root() {
    if (isWsl || isWindows()) {
      const [device, winDirParsed] = this.getRootPowershell();
      if (isWsl) return `/mnt/${device.toLowerCase()}/`;
      return winDirParsed.root.replaceAll(pathWindows.sep, "/");
    }
  },
  get pathHosts() {
    const prefix = `file:${"/".repeat(isWsl ? 2 : 3)}`;
    const url = import.meta.url || process.execPath;
    const pathNameWithoutPrefix = decodeURIComponent(url.replace(prefix, ""));
    return path.resolve(
      path.dirname(pathNameWithoutPrefix),
      `../../bd-hosts-server-pes6`
    );
  },
  /**
   * @type {string[]}
   */
  get hosts() {
    const hosts = readdirSync(this.pathHosts, "utf-8");
    return hosts;
  },
  get pathDestHosts() {
    if (isWsl || isWindows()) return "Windows/System32/drivers/etc/hosts";
  },

  get commandLocationPes() {
    if (isWsl || isWindows()) {
      const cdmLet = "Get-WmiObject";
      const flags = {
        class: "Win32_product",
        property: `'InstallLocation'`,
        filter: `\\"name='Pro Evolution Soccer 6'\\"`,
      };

      const pipes = ["ConvertTo-Json", "ConvertFrom-Json"];

      const flagsCommand = Object.entries(flags)
        .map(
          ([flag, value]) =>
            `-${flag.at(0).toUpperCase()}${flag.slice(1)} ${value}`
        )
        .join(" ");
      return `"(${cdmLet} ${flagsCommand} | ${pipes.join(
        " | "
      )}).InstallLocation"`;
    }
  },
  async getLocationPes() {
    if (isWsl || isWindows()) {
      const findLocationPes = new Promise((res, rej) => {
        exec(
          `powershell.exe ${config.commandLocationPes}`,
          (err, locationPes) => {
            if (err) return rej(err);
            res(locationPes);
          }
        );
      });
      const locationPes = await findLocationPes;
      const locationPesParsed = pathWindows.parse(locationPes.trim());
      locationPesParsed.dir = locationPesParsed.dir.replace(
        locationPesParsed.root,
        ""
      );
      locationPesParsed.root = this.root;
      return pathWindows
        .format(locationPesParsed)
        .replaceAll(pathWindows.sep, "/");
    }
  },
  get commandStartPes6() {
    return isWsl ? "cmd.exe /c start pes6.exe" : "pes6.exe";
  },
  message: "Choose one server:",
  hostDefault: "pes6.es",
};

export default config;
