import dynamic from "next/dynamic";
import HomeHero from "../components/Home/HomeHero";
import HomeMessage from "../components/Home/HomeMessage";
import HomeServers from "../components/Home/HomeServers";
import getServers from "../utils/getServers";

const HomeOpenPes6 = dynamic(() => import("../components/Home/HomeOpenPes6"), {
  ssr: false,
});

const HomeSerial = dynamic(() => import("../components/Home/HomeSerial"), {
  ssr: false,
});

const Home = ({ fontFamily, servers }) => {
  return (
    <main
      className={`min-h-screen overflow-hidden flex flex-wrap ${fontFamily.className}`}
    >
      <HomeHero />
      <section className="flex-[70%] md:px-6 flex gap-2 flex-wrap">
        <HomeServers servers={servers} />
        <HomeOpenPes6 />
        <HomeSerial />
      </section>
      <aside className="flex-1 lg:pr-6 lg:px-0 px-6">
        <div className="py-4 flex flex-col gap-4 h-full justify-center items-center">
          <HomeMessage />
        </div>
      </aside>
    </main>
  );
};

export default Home;

export const getStaticProps = async () => {
  const servers = await getServers();
  return {
    props: {
      servers,
    },
  };
};
