export default function homeDownloadMenu() {
  const menuDownload = document.querySelector("#menuDownload");
  menuDownload.addEventListener("click", () => {
    menuDownload.classList.toggle("open");
  });
}
