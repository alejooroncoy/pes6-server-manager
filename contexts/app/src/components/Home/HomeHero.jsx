import { Image } from "@nextui-org/image";
import ImageNext from "next/image";
import LogoPsm from "../../assets/logo-psm.webp";

const HomeHero = () => {
  return (
    <section className="w-full pb-10 pt-9 bg-gradient-to-tr from-slate-100 to-slate-300">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row px-5">
        <article className="px-5 md:max-w-[35rem] flex flex-col gap-4">
          <header>
            <h2 className="text-lg sm:text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-tr from-blue-900 to-slate-800">
              Welcome to the first version of PSM (ultimate edition)
            </h2>
          </header>
          <div>
            <p className="text-slate-900 font-semibold">
              Thanks for using our service!, you can play on the servers you
              want, open the game, until you change your serial! , and we
              continue to receive proposals for improvement. 🎉⚽
            </p>
          </div>
        </article>
        <Image
          as={ImageNext}
          src={LogoPsm.src}
          alt="Logo"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
};

export default HomeHero;
