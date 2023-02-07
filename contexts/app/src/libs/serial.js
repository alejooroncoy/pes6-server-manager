import { Command } from "@tauri-apps/api/shell";
import logger from "./logger";

const serial = {
  __serial: "",
  listeners: [],
  pes6PathProperty: `HKLM:\\SOFTWARE\\WOW6432Node\\KONAMIPES6\\PES6`,
  emitChange() {
    this.listeners.forEach((listener) => {
      listener();
    });
  },
  async getSerial() {
    if (this.__serial) return this.__serial;
    const command = new Command(
      "powershell",
      [`(Get-ItemProperty -Path ${this.pes6PathProperty}).code`],
      {
        encoding: "utf-8",
      }
    );
    const executed = await command.execute();
    if (executed.stderr.toString().trim()) {
      logger.warn("SERIAL not found, we recommend installing pes6.exe 🙌");
      this.__serial = "";
    } else {
      this.__serial = executed.stdout;
    }
    return this.__serial.trim();
  },
  async setSerial(newSerial) {
    const command = new Command(
      "powershell",
      [
        `Set-ItemProperty -Path ${
          this.pes6PathProperty
        } -Name code -Value "${newSerial.trim()}"`,
      ],
      {
        encoding: "utf-8",
      }
    );
    const executed = await command.execute();
    if (executed.stderr.toString().trim()) {
      logger.warn(
        `This server needs SERIAL change, we tried to change it, but we couldn’t, you can manually change it to this ${newSerial} serial. 😢`
      );
    }
    this.__serial = newSerial.trim();
    this.emitChange();
  },
  subscribe(listener) {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return this.__serial;
  },
};

export default serial;
