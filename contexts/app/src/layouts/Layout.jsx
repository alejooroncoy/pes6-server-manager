import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import Updater from "../components/shared/Updater";

const Layout = ({ children, fontFamily }) => {
  return (
    <>
      <Header fontFamily={fontFamily} />
      {children}
      <Footer fontFamily={fontFamily} />
      <Updater />
    </>
  );
};

export default Layout;
