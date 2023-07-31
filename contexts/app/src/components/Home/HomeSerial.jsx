"use client";

import { useEffect, useRef } from "react";
import { Dropdown } from "@nextui-org/react";
import useSerial from "../../hooks/useSerial";
import logger from "../../libs/logger";

const HomeSerial = () => {
  const inputRef = useRef();
  const [serial, setSerial, restoreSerial, seriales] = useSerial();

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
  const handleSelectSerial = (newSerial) => {
    inputRef.current.value = newSerial;
  };

  return (
    <section className="flex-1">
      <div className="px-5 pb-5 md:pr-5 flex flex-col gap-3 pt-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Serial</h2>
        <p className="text-slate-900 text-md sm:text-lg">
          You can view and change your serial from this section! 📃
        </p>
        <form
          id="serial"
          onSubmit={handleSubmitChangeSerial}
          className="flex flex-wrap gap-3 w-full"
        >
          <input
            name="serial"
            ref={inputRef}
            className="leading-6 flex-full font-semibold bg-slate-200 rounded px-2"
            type="text"
            placeholder="Serial"
            defaultValue="Looking for your serial 📃"
            maxLength={20}
          />
          <Dropdown type="menu">
            <Dropdown.Button
              className="flex-full"
              fit="true"
              css={{
                bgColor: "#247291",
              }}
            >
              Serials used
            </Dropdown.Button>
            <Dropdown.Menu
              onAction={handleSelectSerial}
              aria-label="Serials used"
              items={seriales.map((serial) => ({
                serial,
              }))}
            >
              {({ serial: serialGetted }) => (
                <Dropdown.Item key={serialGetted}>{serialGetted}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <button className="py-2 active:scale-95 transition-transform duration-200 font-bold rounded-md px-2 bg-primary text-white flex-full sm:flex-1">
            Change the serial!
          </button>
          <button
            onClick={handleClickRestoreSerial}
            type="button"
            className="py-2 active:scale-95 transition-transform duration-200 rounded-md font-bold px-2 bg-secondary text-slate-900 flex-full sm:flex-1"
          >
            Restore to the original serial
          </button>
        </form>
      </div>
    </section>
  );
};

export default HomeSerial;
