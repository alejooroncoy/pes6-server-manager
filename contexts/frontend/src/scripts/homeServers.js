const homeServers = () => {
  const bgServerLazy = [...document.querySelectorAll(".bg-white-lazy")];
  bgServerLazy.forEach((serverDom) =>
    serverDom.classList.add("bg-slate-100", "p-4", "rounded")
  );
};

export default homeServers;
