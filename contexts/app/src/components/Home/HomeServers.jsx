import HomeServersWrapperList from "./HomeServersWrapperList";

const HomeServers = () => {
  return (
    <section id="servers" className="py-5 w-full overflow-hidden max-w-[100vw]">
      <div className="px-5 flex flex-col gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Servers availables:
        </h2>
        <p className="text-slate-900 text-md sm:text-lg">
          Choose the server where you want to play! 🎮⚽
        </p>
        <HomeServersWrapperList />
      </div>
    </section>
  );
};

export default HomeServers;
