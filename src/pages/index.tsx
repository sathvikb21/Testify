import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Testify - Home</title>
        <meta name="description" content="Testify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <nav className="flex flex-row items-center justify-between px-3">
        <Link href="/" className="flex flex-row items-center">
          <Image src={logo} alt="Testify" width={75} height={75} />
          <h1 className="text-2xl font-bold text-[#EB584F] hover:text-[#C04841]">
            Testify
          </h1>
        </Link>

        <div className="">
          {sessionData ? (
            <button
              onClick={() => void signOut()}
              className="rounded-lg bg-[#EB584F] px-6 py-2 text-white hover:bg-[#C04841]"
            >
              Sign out
            </button>
          ) : (
            <div className="space-x-5">
              <Link
                href="/signup"
                className="text-md font-medium text-[#EB584F] hover:text-[#C04841]"
              >
                Sign up
              </Link>
              <button
                onClick={() => void signIn()}
                className="rounded-lg bg-[#EB584F] px-6 py-2 text-white hover:bg-[#C04841]"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </nav>

    </>
  );
};

export default Home;
