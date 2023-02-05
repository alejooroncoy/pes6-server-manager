import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
