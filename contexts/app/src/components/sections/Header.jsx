import ServerSvg from "../componentsSvg/ServerSvg";

const Header = ({ fontFamily }) => {
  return (
    <header
      className={`fixed top-0 bg-secondary w-full left-0 z-10 ${fontFamily.className}`}
    >
      <nav className="py-4">
        <div className="flex items-center justify-center md:justify-between max-w-screen-lg mx-auto md:px-8 lg:px-0">
          <a href="/" className="flex gap-2 items-center justify-center">
            <h1 className="flex font-extrabold text-2xl">PSM</h1>
            <ServerSvg size={25} />
          </a>
          <ul className="fixed md:static top-14 left-0 w-full flex justify-center items-center gap-2 flex-row bg-primary text-thirdary md:text-black py-1 md:justify-end md:bg-transparent">
            <li className="flex-auto flex md:flex-none">
              <a
                className="font-bold mx-auto first-letter:uppercase"
                href="#servers"
              >
                Servers
              </a>
            </li>
            <li className="flex-auto flex md:flex-none">
              <a
                className="font-bold mx-auto first-letter:uppercase"
                href="#openPes6"
              >
                Open Pes 6
              </a>
            </li>
            <li className="flex-auto flex md:flex-none">
              <a
                href="#serial"
                className="font-bold mx-auto first-letter:uppercase"
              >
                Serial
              </a>
            </li>
            <li className="flex-auto flex md:flex-none">
              <a
                href="#users"
                className="font-bold mx-auto first-letter:uppercase"
              >
                For users ⚽
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
