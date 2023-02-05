import { Inter } from "@next/font/google";
import Layout from "../layouts/Layout";
import "../styles/styles.output.css";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className.concat(" body")}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
