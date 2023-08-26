"use client";
import ServerSvg from "../componentsSvg/ServerSvg";
import LinkNext from "next/link";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar
      classNames={{
        base: "bg-secondary",
        wrapper: "max-w-screen-lg",
        brand: "justify-center md:justify-start gap-2 items-center",
      }}
    >
      <NavbarBrand as={LinkNext} href="/">
        <h1 className="flex font-extrabold text-2xl">PSM</h1>
        <ServerSvg size={25} />
      </NavbarBrand>
      <NavbarContent
        justify="end"
        className="fixed md:static top-14 left-0 w-full flex justify-center items-center gap-2 flex-row bg-primary py-1 md:justify-end md:bg-transparent"
      >
        <NavbarItem className="flex-auto flex md:flex-none">
          <Link
            as={LinkNext}
            className="font-bold mx-auto first-letter:uppercase text-thirdary md:text-black"
            href="#servers"
          >
            Servers
          </Link>
        </NavbarItem>
        <NavbarItem className="flex-auto flex md:flex-none">
          <Link
            as={LinkNext}
            className="font-bold mx-auto first-letter:uppercase text-thirdary md:text-black"
            href="#openPes6"
          >
            Open Pes 6
          </Link>
        </NavbarItem>
        <NavbarItem className="flex-auto flex md:flex-none">
          <Link
            as={LinkNext}
            href="#serial"
            className="font-bold mx-auto first-letter:uppercase text-thirdary md:text-black"
          >
            Serial
          </Link>
        </NavbarItem>
        <NavbarItem className="flex-auto flex md:flex-none">
          <Link
            as={LinkNext}
            href="#users"
            className="font-bold mx-auto first-letter:uppercase text-thirdary md:text-black"
          >
            For users ⚽
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
