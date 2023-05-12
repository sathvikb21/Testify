import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
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

      <main>
        <Link href="/create" className="border border-red-400 p-4">create</Link>
      </main>
    </>
  );
};

export default Home;
