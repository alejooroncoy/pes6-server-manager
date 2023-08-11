"use client";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
