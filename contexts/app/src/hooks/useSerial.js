import { useEffect, useSyncExternalStore } from "react";
import { getSerialPes6Cache, setSerialPes6Cache } from "../config/cache";
import serialActions from "../libs/serial";

export default function useSerial() {
  const serial = useSyncExternalStore(
    serialActions.subscribe.bind(serialActions),
    serialActions.getSnapshot.bind(serialActions)
  );
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

  useEffect(() => {
    getSerial();
  }, []);
  return [serial, setSerial, restoreSerial];
}
