import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getSerialPes6Cache,
  getSerialsPes6Cache,
  setSerialPes6Cache,
  setSerialsPes6Cache,
} from "../config/cache";
import serialActions from "../libs/serial";

export default function useSerial() {
  const serial = useSyncExternalStore(
    serialActions.subscribe.bind(serialActions),
    serialActions.getSnapshot.bind(serialActions)
  );
  const [seriales, setSeriales] = useState([]);

  const getSeriales = async () => {
    const serialsPes6Cache = await getSerialsPes6Cache();
    const serialesGetted = serialsPes6Cache?.split(",") || [];
    setSeriales(serialesGetted);
  };

  const setSerial = async (newSerial) => {
    await serialActions.setSerial(newSerial);
  };

  const getSerial = async () => {
    const serialGetted = await serialActions.getSerial();
    await setSerial(serialGetted);
    const serialPes6Cached = await getSerialPes6Cache();
    if (!serialPes6Cached) {
      await setSerialPes6Cache(serialGetted);
    }
  };

  const restoreSerial = async () => {
    const serialPes6Cached = await getSerialPes6Cache();
    await serialActions.setSerial(serialPes6Cached);
  };

  const setSerialsFromCache = async () => {
    if (serial.trim()) {
      const serialesGetted = [
        ...new Set([...seriales, serial].filter((srl) => !!srl)),
      ];
      await setSerialsPes6Cache(serialesGetted.join(","));
      getSeriales();
    }
  };
  useEffect(() => {
    getSerial();
    getSeriales();
  }, []);

  useEffect(() => {
    setSerialsFromCache();
  }, [serial]);
  return [serial, setSerial, restoreSerial, seriales];
}
