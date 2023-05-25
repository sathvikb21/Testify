import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";

const SignIn = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <form method="post" className="flex flex-col">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="flex flex-col">
            Username
            <input name="username" type="text" className="rounded-lg border" />
          </label>
          <label className="flex flex-col">
            Password
            <input
              name="password"
              type="password"
              className="rounded-lg border"
            />
          </label>
          <button type="submit" className="mb-5 bg-[#EB584F]">
            Sign in
          </button>
        </form>

        <button
          type="button"
          className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-8 py-4 text-center text-lg font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
          onClick={() => void signIn("google")}
        >
          <svg
            className="-ml-1 mr-2 h-6 w-6"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default SignIn;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: {
      providers: providers ?? [],
      csrfToken: await getCsrfToken(context),
    },
  };
}
