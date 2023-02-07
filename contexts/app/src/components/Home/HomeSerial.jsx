"use client";

import { useEffect, useRef } from "react";
import useSerial from "../../hooks/useSerial";
import logger from "../../libs/logger";

const HomeSerial = () => {
  const inputRef = useRef();
  const [serial, setSerial, restoreSerial] = useSerial();

  const handleSubmitChangeSerial = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSerial = formData.get("serial");
    await setSerial(newSerial);
    logger.log("Serial changed 🌟");
  };
  const handleClickRestoreSerial = async () => {
    await restoreSerial();
    logger.log("Restored serial 🌟");
  };
  useEffect(() => {
    inputRef.current.value = serial;
  }, [serial]);
  return (
    <form
      id="serial"
      onSubmit={handleSubmitChangeSerial}
      className="flex flex-col gap-2 w-full"
    >
      <h2 className="text-2xl font-extrabold uppercase">SERIAL:</h2>
      <input
        name="serial"
        ref={inputRef}
        className="leading-6 font-semibold bg-slate-200 rounded px-2"
        type="text"
        placeholder="Serial"
        defaultValue="Looking for your serial 📃"
        maxLength={20}
      />
      <button className="leading-8 active:scale-95 transition-transform duration-200 font-bold rounded-md px-2 bg-primary text-white">
        Cambiar el serial!
      </button>
      <button
        onClick={handleClickRestoreSerial}
        type="button"
        className="leading-8 active:scale-95 transition-transform duration-200 rounded-md font-bold px-2 bg-secondary text-slate-900"
      >
        Restaurar al serial original
      </button>
    </form>
  );
};

export default HomeSerial;
