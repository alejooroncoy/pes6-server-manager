const homeServers = () => {
  const pes6BrasilServer = document.querySelector("#pes6BrasilServer");
  pes6BrasilServer.addEventListener("load", () => {
    pes6BrasilServer.classList.add("bg-slate-900");
  });
};

window.addEventListener("DOMContentLoaded", homeServers);
