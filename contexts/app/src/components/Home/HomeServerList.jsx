"use client";

import { ToastContainer } from "react-toastify";
import { IconDeviceGamepad2, IconFileDescription } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import useServers from "../../hooks/useServers";
import HomeServer from "./HomeServer";

const HomeServerList = ({ servers: serversGetted }) => {
  const [servers, { chooseServer, serverPlaying, refreshHost }] =
    useServers(serversGetted);

  return (
    <>
      <ul className="w-full h-full m-0 flex flex-row items-center py-10 px-4 sm:pr-12 md:pr-0 overflow-x-auto overflow-y-hidden gap-8">
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
        <IconDeviceGamepad2 size={30} />
        <h3 className="text-2xl font-bold">
          Playing in{" "}
          <span className="inline-block first-letter:uppercase">
            {serverPlaying?.name.replace("_", " ")}
          </span>
        </h3>
        {serverPlaying?.urlHome && (
          <Button
            as="a"
            href={serverPlaying.urlHome}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            className="text-quaternary font-bold active:scale-95 duration-200 transition-transform text-xl"
            endContent={<IconFileDescription size={25} />}
            radius="sm"
            size="lg"
          >
            Register page
          </Button>
        )}
      </article>
      <ToastContainer />
    </>
  );
};

export default HomeServerList;
