import { Inter } from "@next/font/google";
import Layout from "../layouts/Layout";
import "../styles/styles.output.css";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
});

export default function RootLayout({ Component, pageProps }) {
  return (
    <Layout fontFamily={inter}>
      <Component fontFamily={inter} {...pageProps} />
    </Layout>
  );
}
