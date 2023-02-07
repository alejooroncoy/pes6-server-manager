"use client";

import { delimiter, resolve } from "@tauri-apps/api/path";
import { Command } from "@tauri-apps/api/shell";
import { getIsWsl, isWindows } from "../utils/getOs";

const paths = {
  winDir: null,
  async getRootPowershell() {
    if (!this.winDir) {
      const command = new Command(
        "powershell",
        ["(Get-PSDrive -PSProvider FileSystem).root"],
        {
          encoding: "utf-8",
        }
      );
      const executed = await command.execute();
      this.winDir = executed.stdout;
    }

    const [root] = this.winDir
      .trim()
      .split("\n")
      .map((root) => root.trim());
    const [device] = root.split(delimiter);

    return [device, root];
  },
  async getRoot() {
    const isWsl = await getIsWsl();
    const osIsWindows = await isWindows();
    if (isWsl || osIsWindows) {
      const [device, root] = await this.getRootPowershell();
      if (isWsl) return `/mnt/${device.toLowerCase()}/`;
      return root;
    }
  },
  async getPathDestHosts() {
    const isWsl = await getIsWsl();
    const OsIsWindows = await isWindows();
    const root = await this.getRoot();
    if (isWsl || OsIsWindows) {
      const pathDestHosts = await resolve(
        root,
        "Windows/System32/drivers/etc/hosts"
      );
      return pathDestHosts;
    }
    if (isLinux) return "/etc/hosts";
  },
};

export default paths;
