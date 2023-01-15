import fetch from "node-fetch";
import pathWindows from "node:path/win32";
import isWsl from "is-wsl";
import internetAvailable from "internet-available";
import { exec, execFileSync } from "node:child_process";
import { config as configDotenv } from "dotenv";

import { isWindows } from "../utils/findOs.js";
import {
  existsCache,
  getCacheList,
  getPathCache,
  initialCache,
  setCache,
} from "./cache.js";

configDotenv();

const config = {
  windDir: "",
  baseUrl: process.env.BASE_URL,
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
  get urlHosts() {
    return new URL(`${this.baseUrl}/server`);
  },
  /**
   * @type {string[]}
   */
  async getHosts() {
    try {
      await internetAvailable();
      const urlListHosts = new URL(`${this.baseUrl}/server/list`);
      console.log(`Loading servers from ${urlListHosts} ⌛✨`);
      const response = await fetch(urlListHosts, {
        method: "GET",
      });
      const { data: list } = await response.json();
      if (!existsCache()) await initialCache();
      setCache(list, "hosts");
      console.log(`Loaded servers ⚽✨`);
      return list;
    } catch (err) {
      if (existsCache()) {
        console.log(`Loading servers from ${getPathCache()} ⌛✨`);
        const list = getCacheList();
        console.log(`Loaded servers ⚽✨`);
        return list;
      }
    }
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
    return isWsl ? "cmd.exe /c start pes6.exe" : 'cmd.exe /c "start pes6.exe"';
  },
  message: "Choose one server:",
  get hostDefault() {
    const hostsList = getCacheList();
    return hostsList.find((host) => host.activate)?.name || "pes6.es";
  },
};

export default config;
