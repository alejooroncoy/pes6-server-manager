"use client";

import { ToastContainer } from "react-toastify";
import { FaWpforms } from "react-icons/fa";
import useServers from "../../hooks/useServers";
import { IoLogoGameControllerB } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import HomeServer from "./HomeServer";

const HomeServersList = ({ servers: serversGetted }) => {
  const [servers, { chooseServer, serverPlaying, refreshHost }] =
    useServers(serversGetted);

  return (
    <>
      <ul className="w-full h-full m-0 flex flex-row items-center py-12 px-4 sm:pr-12 md:pr-0 overflow-x-auto overflow-y-hidden gap-8">
        {!servers.length ? (
          <li className="text-xl font-bold py-4">
            We’re having trouble getting the servers, we recommend coming back
            later, or you can report it. ⚽👷‍♂️
          </li>
        ) : (
          servers
            .filter(({ status }) => status === "working")
            .map(({ img, name, id, activate }) => (
              <HomeServer
                key={id}
                img={img}
                name={name}
                id={id}
                activate={activate}
                refreshHost={refreshHost}
                chooseServer={chooseServer}
              />
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
