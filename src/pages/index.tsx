import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import logo from "~/assets/images/logo.png";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Testify - Home</title>
        <meta name="description" content="Testify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex flex-row items-center px-3">
        <Link href="/">
          <Image src={logo} alt="Testify" width={75} height={75} />
        </Link>

        <ul className="flex grow flex-row justify-center space-x-10">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div>
          {sessionData ? (
            <button
              onClick={() => void signOut()}
              className=""
            >
              Sign out
            </button>
          ) : (
              <div>
                <Link href="/signup"></Link>
                <button onClick={() => void signIn()} className="">
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
