import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import NavBar from "./navbar"

export default function Home() {
  return (
    <>
      <Head>
        <title>$YUPI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <footer className={styles.footer}>

      </footer>

    </>
  );
}
