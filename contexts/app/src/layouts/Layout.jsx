import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";

const Layout = ({ children, fontFamily }) => {
  return (
    <>
      <Header fontFamily={fontFamily} />
      {children}
      <Footer fontFamily={fontFamily} />
    </>
  );
};

export default Layout;
