import config from "../config/index.js";
import { getSerialPes6Cache, setSerialPes6Cache } from "../config/cache.js";

const PS2_SERIAL_PC = "ESWV4EFNTPK63XVTATEF";

export const changeSerialPs2 = async () => {
  if (config.serial !== PS2_SERIAL_PC) {
    console.log(`Serial switching to -> ${PS2_SERIAL_PC} 📃✨`);
    setSerialPes6Cache(config.serial);
    config.serial = PS2_SERIAL_PC;
  }
};

export const restoreSerialPs2 = () => {
  if (config.serial === PS2_SERIAL_PC) {
    const serialPes6Cache = getSerialPes6Cache();
    console.log(`Restoring serial -> ${serialPes6Cache} 📃✨`);
    config.serial = serialPes6Cache;
  }
};

export const actionSerial = async (host) => {
  if (host === "Ps2") await changeSerialPs2();
  else restoreSerialPs2();
};
