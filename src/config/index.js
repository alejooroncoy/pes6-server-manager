import { readdirSync } from "node:fs";
import path from "node:path";
import pathWindows from "node:path/win32";
import isWsl from "is-wsl";
import { isWindows } from "../utils/findOs.js";
import { execFileSync } from "node:child_process";

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
<<<<<<< Updated upstream
      "../../bd-hosts-server-pes6"
=======
      `../../bd-hosts-server-pes6`
>>>>>>> Stashed changes
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
  message: "Choose one server:",
  hostDefault: "pes6.es",
};

export default config;
