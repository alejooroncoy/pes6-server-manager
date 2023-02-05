"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useServers from "../../hooks/useServers";

const HomeServersList = ({ servers: serversGetted }) => {
  const [servers, { chooseServer }] = useServers(serversGetted);
  const handleClickChooseServer = ({ target }) => {
    const { name } = target.dataset;

    chooseServer(name);
  };

  return (
    <>
      <ul className="w-full p-0 m-0 flex gap-8 flex-col sm:flex-wrap sm:flex-row justify-center items-center">
        {servers
          .filter(({ status }) => status === "working")
          .map(({ img, name, id }) => (
            <li key={id}>
              <img
                data-name={name}
                onClick={handleClickChooseServer}
                className={[
                  "grayscale transition-all ease-linear duration-200 hover:grayscale-0 hover:scale-105 cursor-pointer",
                  name === "brasil_server"
                    ? "p-2 min-[160px]:p-4 rounded bg bg-slate-900"
                    : "",
                  name === "ps2" || name === "indie" ? "w-24" : "w-40",
                ]
                  .filter((className) => !!className.trim())
                  .join(" ")}
                alt={`${name.replace("_", " ")} logo`}
                src={img}
                width="auto"
                height="auto"
              />
            </li>
          ))}
      </ul>
      <ToastContainer />
    </>
  );
};

export default HomeServersList;
