import * as os from "@tauri-apps/api/os";
import { invoke } from "@tauri-apps/api/tauri";

export const isWindows = async () => {
  const platform = await os.platform();
  return platform === "win32";
};

export const getIsWsl = () => {
  return invoke("is_wsl_tauri");
};

export const isLinux = async () => {
  const platform = (await os.platform()) === "linux";
  const isWsl = await getIsWsl();
  return platform && !isWsl;
};
