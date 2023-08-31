import homeContact from "./homeContact";
import homeInstructions from "./homeInstructions";
import homeServers from "./homeServers";
import homeDownloadMenu from "./homeDownloadMenu";

window.addEventListener("DOMContentLoaded", () => {
  homeServers();
  homeContact();
  homeDownloadMenu();
  homeInstructions();
});
