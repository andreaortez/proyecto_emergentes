import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavBar from "./components/navbar";
import Curtain from "./components/cortina";

export default function Home() {
  return (
    <>
      <Head>
        <title>$YUPI</title>
        <link rel="icon" href="/imagenes/logo.png" />
      </Head>
      <NavBar />
      <Curtain />
      <footer className={styles.footer}>

      </footer>

    </>
  );
}
