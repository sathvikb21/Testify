import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "~/components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Testify - Home</title>
        <meta name="description" content="Testify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
    </>
  );
};

export default Home;
