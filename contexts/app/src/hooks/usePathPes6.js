import { useEffect, useState } from "react";
import { setLocationPes6Cache } from "../config/cache";
import locationPes6 from "../libs/locationPes6";
import logger from "../libs/logger";

export default function usePathPes6() {
  const [directoryPes6, setDirectoryPes6] = useState("");
  const [loading, setLoading] = useState(true);

  const setLocationPes6 = async (locationPesUser) => {
    if (locationPesUser) {
      await setLocationPes6Cache(locationPesUser);
      setDirectoryPes6(locationPesUser);
      return;
    }
    const locationPes6Path = await locationPes6.getLocationPes();
    setLoading(false);
    setDirectoryPes6(locationPes6Path);
  };

  const autoDetectLocationPes6 = async () => {
    setLoading(true);
    const locationPes6Path = await locationPes6.autoDetectLocationPes();
    setLoading(false);
    if (!locationPes6Path) {
      logger.log("We could not autodetect the pes6 folder 🤔");
      return;
    }
    logger.log("We could find your folder ✨! to play :D");
    setDirectoryPes6(locationPes6Path);
  };

  useEffect(() => {
    setLocationPes6();
  }, []);

  return {
    loading,
    directoryPes6,
    setDirectoryPes6,
    setLocationPes6,
    autoDetectLocationPes6,
  };
}
