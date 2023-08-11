import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import Providers from "../components/shared/Providers";
import Updater from "../components/shared/Updater";

const Layout = ({ children }) => {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
      <Updater />
    </Providers>
  );
};

export default Layout;
