"use client";

import { ToastContainer } from "react-toastify";
import useServers from "../../hooks/useServers";
import { IoLogoGameControllerB } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const HomeServersList = ({ servers: serversGetted }) => {
  const [servers, { chooseServer, serverPlaying }] = useServers(serversGetted);
  const handleClickChooseServer = ({ target }) => {
    const { name } = target.dataset;
    chooseServer(name);
  };

  return (
    <>
      <ul className="w-full p-0 m-0 flex gap-8 flex-col sm:flex-wrap sm:flex-row justify-center items-center">
        {!servers.length ? (
          <p className="text-xl font-bold py-4">
            We’re having trouble getting the servers, we recommend coming back
            later, or you can report it. ⚽👷‍♂️
          </p>
        ) : (
          servers
            .filter(({ status }) => status === "working")
            .map(({ img, name, id, activate }) => (
              <li key={id}>
                <img
                  data-name={name}
                  onClick={handleClickChooseServer}
                  className={[
                    "transition-all ease-linear duration-200 hover:grayscale-0 hover:scale-105 cursor-pointer",
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
              </li>
            ))
        )}
      </ul>
      <article className="flex gap-2 items-center pt-12 md:pt-4">
        <IoLogoGameControllerB size={30} />
        <h3 className="text-2xl font-bold">
          Playing in{" "}
          <span className="inline-block first-letter:uppercase bg-slate-900 rounded text-quaternary p-2">
            {serverPlaying.replace("_", " ")}
          </span>
        </h3>
      </article>
      <ToastContainer />
    </>
  );
};

export default HomeServersList;
