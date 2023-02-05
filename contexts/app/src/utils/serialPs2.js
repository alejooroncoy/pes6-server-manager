import { getSerialPes6Cache, setSerialPes6Cache } from "../config/cache.js";
import logger from "../libs/logger.js";
import serial from "../libs/serial.js";

const PS2_SERIAL_PC = "ESWV4EFNTPK63XVTATEF";

export const changeSerialPs2 = async () => {
  const serialGetted = await serial.getSerial();
  if (serialGetted !== PS2_SERIAL_PC) {
    logger.log(`Serial switching to -> ${PS2_SERIAL_PC} 📃✨`);
    await setSerialPes6Cache(serialGetted);
    await serial.setSerial(PS2_SERIAL_PC);
  }
};

export const restoreSerialPs2 = async () => {
  const serialGetted = await serial.getSerial();
  if (serialGetted === PS2_SERIAL_PC) {
    const serialPes6Cache = await getSerialPes6Cache();
    logger.log(`Restoring serial -> ${serialPes6Cache} 📃✨`);
    await config.setSerial(serialPes6Cache);
  }
};

export const actionSerial = async (host) => {
  if (host === "Ps2") await changeSerialPs2();
  else {
    await restoreSerialPs2();
  }
};
