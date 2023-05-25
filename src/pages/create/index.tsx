import Link from "next/link";
import Navbar from "~/components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="flex h-[90vh] flex-col items-center">
        <Link href="/create/test">
          Create Test
        </Link>

        <Link href="/create/course">
          Create Course
        </Link>

        <Link href="/create/sections">
          Create Section
        </Link>

        {/* <Link href="/create/question">
          Create Question
        </Link> */}

        <Link href="/create/learningtarget">
          Create Learning Target
        </Link>

      </div>

    </>
  );
};

export default Home;
