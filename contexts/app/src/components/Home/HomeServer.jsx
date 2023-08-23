import { useEffect, useMemo, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

const HomeServer = ({ name, chooseServer, refreshHost, id, img, activate }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleClickRefresh = (e) => {
    e.stopPropagation();
    refreshHost(id);
  };

  const handleClickChooseServer = () => {
    chooseServer(id);
  };

  const spaces = useMemo(() => {
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    if (width >= 640) return 2;
    return 1;
  }, [width]);

  useEffect(() => {
    const handleWindowResize = (e) => setWidth(e.target.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <li
      style={{
        flex: `1 0 calc(${100 / spaces}%)`,
      }}
      className="self-stretch w-full"
    >
      <article
        className={"flex py-4 px-4 flex-col gap-y-3 justify-center items-center h-full shadow-xl rounded-md hover:scale-105 transition-transform ease-linear duration-200 cursor-pointer card card--server ".concat(
          activate ? "bg-secondary" : "bg-gray-200"
        )}
        onClick={() => handleClickChooseServer(id)}
      >
        <div className="flex flex-col gap-y-2 items-center">
          <img
            className={[
              "transition-all ease-linear duration-200 card__img",
              name === "brasil_server"
                ? "p-2 min-[160px]:p-4 rounded bg bg-slate-900"
                : "",
              name === "ps2" || name === "indie" ? "w-32" : "w-60",
              activate ? "grayscale-0" : "grayscale",
            ]
              .filter((className) => !!className.trim())
              .join(" ")}
            alt={`${name.replace("_", " ")} logo`}
            src={img}
            width={200}
            height={200}
          />
          <h3 className="first-letter:uppercase text-center font-bold text-xl flex-full">
            {name.replace("_", " ")}
          </h3>
        </div>
        <footer>
          <button
            onClick={handleClickRefresh}
            className="bg-gradient-to-tr from-blue-900 to-slate-800 text-slate-50 p-2 active:scale-95 hover:scale-105 duration-250 transition-transform rounded-md font-bold text-lg md:text-sm  flex gap-2 items-center"
          >
            Refresh hosts
            <FiRefreshCw size={20} />
          </button>
        </footer>
      </article>
    </li>
  );
};

export default HomeServer;
