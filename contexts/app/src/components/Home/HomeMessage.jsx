import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const HomeMessage = () => {
  return (
    <article
      id="users"
      className="bg-gradient-to-tl from-slate-600 to-slate-900 text-slate-100 p-4 rounded-xl"
    >
      <header>
        <h2 className="text-2xl font-extrabold">For our users:</h2>
      </header>
      <div className="flex flex-col gap-2 w-full">
        <p>
          Improvement proposals, bug reports, send them to the next email or
          number, thus improving our service.{" "}
        </p>
        <a
          className="w-full bg-primary p-2 rounded font-bold active:scale-95 transition-transform duration-200 flex gap-2 items-center justify-center text-center flex-row sm:flex-col md:flex-row"
          href="https://wa.link/wkiukd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsWhatsapp size={20} />
          PSM whatsapp
        </a>
        <a
          className="w-full bg-secondary p-2 rounded font-bold text-slate-900 active:scale-95 transition-transform duration-200 flex gap-2 items-center justify-center text-center flex-row sm:flex-col md:flex-row"
          href="mailto:psm.team.pes6@gmail.com?Subject=Hi!%20I%20have%20an%20upgrade%20for%20PSM!"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineMail size={20} />
          PSM email
        </a>
      </div>
    </article>
  );
};

export default HomeMessage;
