"use client";

import { ToastContainer } from "react-toastify";
import { FaWpforms } from "react-icons/fa";
import useServers from "../../hooks/useServers";
import { IoLogoGameControllerB } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const HomeServersList = ({ servers: serversGetted }) => {
  const [servers, { chooseServer, serverPlaying }] = useServers(serversGetted);
  const handleClickChooseServer = (id) => {
    chooseServer(id);
  };

  return (
    <>
      <ul className="w-full p-0 m-0 flex gap-8 flex-col sm:flex-row sm:flex-wrap justify-center items-center md:py-2">
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
                  onClick={() => handleClickChooseServer(id)}
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
      <article className="flex flex-wrap gap-2 items-center justify-center md:justify-start pt-12 md:pt-4">
        <IoLogoGameControllerB size={30} />
        <h3 className="text-2xl font-bold">
          Playing in{" "}
          <span className="inline-block first-letter:uppercase bg-slate-900 rounded text-quaternary p-2">
            {serverPlaying?.name.replace("_", " ")}{" "}
          </span>{" "}
        </h3>
        <a
          href={serverPlaying?.urlHome}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary rounded p-2 text-quaternary flex gap-2 items-center text-2xl font-bold active:scale-95 duration-200 transition-transform"
        >
          Register page
          <FaWpforms size={25} />
        </a>
      </article>
      <ToastContainer />
    </>
  );
};

export default HomeServersList;
