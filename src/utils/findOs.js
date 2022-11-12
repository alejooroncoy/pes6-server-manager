import isWsl from "is-wsl";
import os from "node:os";

export const isWindows = () => os.platform() === "win32";

export const isLinux = () => os.platform() === "linux" && !isWsl;
