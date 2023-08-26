"use client";

import { useEffect, useMemo, useState } from "react";
import ImageNext from "next/image";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { IconRefresh } from "@tabler/icons-react";
import { ToastContainer } from "react-toastify";

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
      <Card
        as="article"
        className={"h-full p-4 hover:scale-105 transition-transform ease-linear duration-200 gap-y-2 justify-center card card--server ".concat(
          activate ? "bg-secondary" : "bg-gray-200"
        )}
        classNames={{
          header: "flex justify-center p-0",
          body: "items-center gap-y-2 p-0 flex-initial overflow-y-hidden",
        }}
        radius="md"
        shadow="lg"
        isPressable
        onPress={() => handleClickChooseServer(id)}
      >
        <CardHeader as="header">
          <Image
            as={ImageNext}
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
            classNames={{
              wrapper: "max-w-full",
            }}
            alt={`${name.replace("_", " ")} logo`}
            src={img}
            width={250}
            height={200}
          />
        </CardHeader>
        <CardBody as="div">
          <h3 className="first-letter:uppercase text-center font-bold text-xl">
            {name.replace("_", " ")}
          </h3>
          <Button
            onClick={handleClickRefresh}
            className="bg-gradient-to-tr from-blue-900 to-slate-800 text-slate-50 active:scale-95 hover:scale-105 duration-250 transition-transform font-bold"
            endContent={<IconRefresh size={20} />}
            radius="sm"
            size="md"
          >
            Refresh hosts
          </Button>
        </CardBody>
      </Card>
      <ToastContainer />
    </li>
  );
};

export default HomeServer;
