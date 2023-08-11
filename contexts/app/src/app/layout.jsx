import { Inter } from "next/font/google";
import Layout from "../layouts/Layout";
import "../styles/styles.input.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="light">
      <body className={`${inter.variable} font-inter`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
