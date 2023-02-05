import HomeServersList from "./HomeServersList";
import getServers from "../../utils/getServers";

const HomeServers = async () => {
  const servers = await getServers();
  return (
    <section className="py-5">
      <div className="px-5 flex flex-col gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Servers availables:
        </h2>
        <p className="text-slate-900 text-sm sm:text-md">
          Choose the server where you want to play! 🎮⚽
        </p>
        <HomeServersList servers={servers} />
      </div>
    </section>
  );
};

export default HomeServers;
