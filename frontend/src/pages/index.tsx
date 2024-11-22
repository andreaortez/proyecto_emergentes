import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavBar from "./components/navbar";
import Curtain from "./components/cortina";
import Body from "./components/informacion"
import Contactanos from "./components/contactanos";

export default function Home() {
  return (
    <>
      <Head>
        <title>$YUPI</title>
        <link rel="icon" href="/imagenes/logo.png" />
      </Head>
      <NavBar />
      <div className="paddingTop">
        <Curtain />
        <Body />
        <Contactanos />
      </div>
      <footer className="footerText">
        <p>© 2024 $YUPI</p>
      </footer>
    </>
  );
}
