// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";

import HomeHero from "../components/Home/HomeHero";
import HomeServers from "../components/Home/HomeServers";

const Home = () => {
  return (
    <main className="min-h-screen">
      <HomeHero />
      <HomeServers />
    </main>
  );
};

export default Home;
