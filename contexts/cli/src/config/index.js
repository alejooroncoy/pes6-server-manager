import fetch from "node-fetch";
import prompts from "prompts";
import pathWindows from "node:path/win32";
import path from "node:path";
import { existsSync } from "node:fs";
import isWsl from "is-wsl";
import notifier from "node-notifier";
import internetAvailable from "internet-available";
import { spawnSync, execFile, execFileSync } from "node:child_process";
import { config as configDotenv } from "dotenv";

import { isWindows } from "../utils/findOs.js";
import {
  existsCache,
  getCacheList,
  getLocationPes6Cache,
  getPathCache,
  initialCache,
  setCache,
  setLocationPes6Cache,
} from "./cache.js";

configDotenv();

const changeLocationPathPes6 = async (locationPes6Cache, { spinner, name }) => {
  let location = locationPes6Cache;
  spinner.pause();
  const { wantUpdate } = await prompts({
    message: "Want to update the path where your Pes6.exe file is located? 🤔",
    type: "confirm",
    name: "wantUpdate",
  });
  if (wantUpdate) {
    const { locationPesUser } = await prompts({
      message: `Type the new path 📃`,
      type: "text",
      name: "locationPesUser",
    });
    setLocationPes6Cache(locationPesUser);
    location = locationPesUser;
  }

  try {
    const locationFormatted = pathWindows
      .format(location)
      .replaceAll(pathWindows.sep, "/");
    spinner.play();
    return locationFormatted;
  } catch (err) {
    console.log(
      !location
        ? "Please enter a valid path! 😁"
        : `${location} isn't path available ❌`
    );
    const notifyPromise = new Promise((rej, res) => {
      notifier.notify(
        {
          title: name,
          message: !location
            ? "Please enter a valid path! 😁"
            : `${location} isn't path available ❌`,
          icon: path.join(
            import.meta.url.replace("file:///", ""),
            "../..",
            "./assets/logo-psm.ico"
          ),
        },
        (err) => {
          if (err) return rej(err);
          res();
        }
      );
    });
    await notifyPromise;
    process.exit(0);
  }
};

const config = {
  name: "PSM",
  windDir: "",
  spinner: null,
  baseUrl: process.env.BASE_URL,
  __serial: null,
  pes6PathProperty: `HKLM:\\SOFTWARE\\WOW6432Node\\KONAMIPES6\\PES6`,
  get serial() {
    if (this.__serial) return this.__serial;
    const spawn = spawnSync(
      "powershell.exe",
      [`(Get-ItemProperty -Path ${this.pes6PathProperty}).code`],
      {
        encoding: "utf-8",
      }
    );
    if (spawn.stderr.toString().trim()) {
      console.log("SERIAL not found, we recommend installing pes6.exe 🙌");
      this.__serial = "";
    } else {
      this.__serial = spawn.output;
    }
    return this.__serial.trim();
  },
  set serial(newSerial) {
    const spawn = spawnSync(
      "powershell.exe",
      [
        `Set-ItemProperty -Path ${
          this.pes6PathProperty
        } -Name code -Value "${newSerial.trim()}"`,
      ],
      {
        encoding: "utf-8",
      }
    );
    if (spawn.stderr.toString().trim()) {
      console.log(
        `This server needs SERIAL change, we tried to change it, but we couldn’t, you can manually change it to this ${newSerial} serial. 😢`
      );
      notifier.notify({
        title: this.name,
        message: `This server needs SERIAL change, we tried to change it, but we couldn’t, you can manually change it to this ${newSerial} serial. 😢`,
        icon: path.join(
          import.meta.url.replace("file:///", ""),
          "../..",
          "./assets/logo-psm.ico"
        ),
      });
    }
    this.__serial = newSerial.trim();
  },
  getRootPowershell() {
    if (!this.winDir) {
      this.winDir = execFileSync(
        "powershell.exe",
        ["(Get-PSDrive -PSProvider FileSystem).root"],
        {
          encoding: "utf-8",
        }
      );
    }

    const [root] = this.winDir
      .trim()
      .split("\n")
      .map((root) => root.trim());
    const winDirParsed = pathWindows.parse(root.trim());
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
      const locationPes6Cache = getLocationPes6Cache();
      if (locationPes6Cache) {
        const location = changeLocationPathPes6(locationPes6Cache, this);
        return location;
      }
      const pathPes6Default = path.resolve(
        this.root,
        "./Program Files (x86)/KONAMI/Pro Evolution Soccer 6"
      );
      if (existsSync(pathPes6Default)) return pathPes6Default;

      const findLocationPes = new Promise((res, rej) => {
        execFile(
          "powershell.exe",
          [config.commandLocationPes],
          {
            encoding: "utf-8",
          },
          (err, locationPes) => {
            if (err) return res("");
            res(locationPes);
          }
        );
      });
      try {
        const locationPes = await findLocationPes;
        if (!locationPes) {
          const example =
            "C:/Program Files (x86)/KONAMI/Pro Evolution Soccer 6".replaceAll(
              "/",
              pathWindows.sep
            );
          this.spinner.stop();
          const { locationPesUser } = await prompts({
            message: `We could not autodect the location of your PES6.exe, please, you could give us the folder where your file is located, example (${example}). [Just this once 😎]`,
            name: "locationPesUser",
            type: "text",
          });
          const locationPesUserFormatted = pathWindows
            .format(setLocationPes6Cache(locationPesUser))
            .replaceAll(pathWindows.sep, "/");
          this.spinner.play();
          return locationPesUserFormatted;
        }
        const locationPesParsed = pathWindows.parse(locationPes.trim());
        locationPesParsed.dir = locationPesParsed.dir.replace(
          locationPesParsed.root,
          ""
        );
        locationPesParsed.root = this.root;

        return pathWindows
          .format(locationPesParsed)
          .replaceAll(pathWindows.sep, "/");
      } catch (err) {
        console.log("We couldn’t find your pes6.exe file path:(");
        process.exit(0);
      }
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
