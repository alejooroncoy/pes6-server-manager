"use client";

import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import * as marked from "marked";
import withReactContent from "sweetalert2-react-content";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";

const MySwal = withReactContent(Swal);

marked.use({
  renderer: {
    listitem(text) {
      return `<li class="before:bg-slate-700 before:w-[0.4rem] before:h-[0.4rem] before:block before:rounded-full flex gap-x-3 items-center"><p class="flex-[50%]">${text}</p></li>`;
    },
  },
});

const Updater = () => {
  const info = useRef();
  const anchorDetails = useRef();

  const handleClickDetails = (e) => {
    e.preventDefault();
    if (info.current.classList.contains("max-h-0")) {
      info.current.classList.replace("max-h-0", "max-h-80");
      info.current.classList.add("overflow-y-auto");
      anchorDetails.current.textContent = "Hide info";
    } else {
      info.current.classList.replace("max-h-80", "max-h-0");
      info.current.classList.remove("overflow-y-auto");
      anchorDetails.current.textContent = "Look more details";
    }
  };
  const handleUpdate = async () => {
    try {
      const update = await checkUpdate();
      if (update.shouldUpdate) {
        MySwal.fire({
          title: (
            <>
              A new version is available
              <span className="bg-clip-text text-transparent font-extrabold bg-gradient-to-tr from-primary to-slate-800 ml-1 text-xl">
                {update.manifest.version}
              </span>
            </>
          ),
          html: (
            <div>
              <a
                ref={anchorDetails}
                href="#"
                onClick={handleClickDetails}
                className="text-primary"
              >
                Look more details
              </a>
              <div
                ref={info}
                className="max-h-0 overflow-hidden transition-all duration-250"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(update.manifest.body),
                }}
              />
            </div>
          ),
          toast: true,
          position: "bottom-right",
          confirmButtonText: "Update!",
          showCancelButton: true,
          cancelButtonText: "I'll do it later",
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "text-black bg-secondary p-2 rounded font-semibold ml-2",
            cancelButton:
              "text-gray-100 bg-primary p-2 rounded font-semibold ml-2",
          },
        }).then(async ({ isConfirmed }) => {
          if (isConfirmed) {
            await installUpdate();
            const { getIsWsl, isWindows } = await import("../../utils/getOs");
            if (!isWindows() && !getIsWsl()) await relaunch();
          }
        });
      }
    } catch (err) {}
  };
  useEffect(() => {
    handleUpdate();
  }, []);
  return null;
};

export default Updater;
