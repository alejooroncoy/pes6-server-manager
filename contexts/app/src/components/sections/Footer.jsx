import InstagramSvg from "../componentsSvg/InstagramSvg";
import { SiGmail } from "react-icons/si";
import { BsGithub } from "react-icons/bs";

const Footer = ({ fontFamily }) => {
  return (
    <footer className={["bg-primary", fontFamily.className].join(" ")}>
      <nav>
        <div className="flex flex-col gap-4 py-4 md:px-4 md:flex-row-reverse md:flex-wrap">
          <div className="px-4 flex flex-col flex-wrap gap-1 w-11/12 mx-auto md:flex-1">
            <h2 className="text-xl font-bold text-white">
              Our social networks:
            </h2>
            <ul className="flex gap-2 w-full flex-wrap justify-start relative">
              <li>
                <a href="https://www.instagram.com/psm.pes6/">
                  <InstagramSvg size={30} />
                </a>
              </li>
              <li>
                <a href="mailto:psm.team.pes6@gmail.com?Subject=Hi!%20I%20have%20an%20upgrade%20for%20PSM!">
                  <SiGmail className="w-8 h-8 text-red-500" />
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 flex flex-col flex-wrap gap-1 w-11/12 mx-auto md:flex-1">
            <h2 className="text-xl font-bold text-white">Authors:</h2>
            <ul className="flex gap-2 w-full flex-wrap justify-start relative">
              <li>
                <a
                  className="flex items-center gap-1 md:gap-2 text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/alejooroncoy"
                >
                  <BsGithub className="w-5 h-5 text-black" />
                  @alejooroncoy
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 flex flex-col flex-wrap gap-1 w-11/12 mx-auto md:flex-1">
            <h2 className="text-xl font-bold text-white">Thanks:</h2>
            <p className="text-white">
              Hello! , thank you for using our service. Any recommendation can
              be made to our page,{" "}
              <a
                className="font-extrabold underline decoration-wavy decoration-slate-900"
                target="_blank"
                rel="noopener noreferrer"
                href="https://pes6-server-manager.vercel.app/"
              >
                PSM page
              </a>
              , or our social networks.
            </p>
          </div>

          <h3 className="text-center text-sm md:text-md text-white px-8 flex-full">
            Copyright <i className="not-italic">©</i> 2023{" "}
            <a href="/" className="font-bold text-secondary">
              PSM
            </a>
            . Todos los derechos reservados.
          </h3>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
