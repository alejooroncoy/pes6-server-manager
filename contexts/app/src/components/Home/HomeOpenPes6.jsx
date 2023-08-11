"use client";

import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { CircularProgress } from "@nextui-org/progress";
import { Spinner } from "@nextui-org/spinner";
import { AiFillFolder } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import usePathPes6 from "../../hooks/usePathPes6";
import openPes6 from "../../utils/openPes6";

const HomeOpenPes6 = () => {
  const { directoryPes6, loading, setLocationPes6, autoDetectLocationPes6 } =
    usePathPes6();
  const [openLoading, setOpenLoading] = useState(false);

  const handleClickSelectPath = async () => {
    const selected = await open({
      directory: true,
    });
    if (selected) await setLocationPes6(selected);
  };

  const handleClickOpen = async () => {
    setOpenLoading(true);
    await openPes6();
    setOpenLoading(false);
  };

  const handleClickAutoDetected = async () => {
    await autoDetectLocationPes6();
  };
  return (
    <section id="openPes6" className="w-full md:w-2/3">
      <div className="px-5 flex flex-col gap-4 py-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Open pes6</h2>
        <p className="text-slate-900 text-md sm:text-lg">
          Locate your pes6.exe folder and you can play! 🎮⚽
        </p>
        <div className="flex gap-2 items-center flex-wrap w-full">
          <button
            type="button"
            onClick={handleClickSelectPath}
            className="p-3 font-extrabold text-slate-900 active:scale-95 transition-transform duration-200 rounded bg-gradient-to-tr from-[#EEF2E2] to-[#F5F9EE] flex gap-2 items-center"
          >
            <AiFillFolder size={30} /> My ubication PES6
          </button>
          <button
            onClick={handleClickAutoDetected}
            className="flex items-center gap-2 font-extrabold rounded bg-gradient-to-tr from-slate-900 to-primary text-white p-3 active:scale-95 transition-transform duration-200"
          >
            <BsSearch size={20} /> Autodetect PES folder
          </button>

          <div className="flex-full flex justify-start items-center w-full flex-wrap gap-2">
            {loading ? (
              <>
                <CircularProgress
                  classNames={{
                    base: "flex flex-row justify-start items-center w-full gap-2",
                    label: "font-bold",
                  }}
                  label="Loading directory Pes 6 Path"
                  color="primary"
                  size="lg"
                />
              </>
            ) : (
              <h3 className="flex items-center py-4 px-2 text-sm font-bold rounded bg-secondary">
                {directoryPes6
                  ? `Path actual: ${directoryPes6}`
                  : "Path Pes 6 not found 😢"}
              </h3>
            )}
            <div className="flex gap-2 items-center">
              {openLoading && <Spinner className="pl-2" type="gradient" />}
              <button
                onClick={handleClickOpen}
                className="p-2 py-4 font-bold bg-primary text-slate-100 rounded active:scale-95 transition-transform duration-200 w-full md:w-fit"
              >
                {openLoading ? "Opening pes 6 ✨" : "Play pes 6 ⚽✨"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeOpenPes6;
