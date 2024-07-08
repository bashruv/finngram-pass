"use client";

import Image from "next/image";

import { signoutAction } from "@/util/login";
import FinngramLogo from "@/assets/finngram.svg";

export default function NotFound() {
  return (
    <main className="p-8 text-white flex flex-col gap-4 max-w-screen-sm mx-auto">
      <div>
        <Image src={FinngramLogo} alt="Finngram Logo" />
        <h1 className="font-bold wdth-expended">Apple Wallet Pass</h1>
      </div>
      <h2 className="text-2xl font-bold mt-4">Error | 404</h2>
      <div className="text-sm">
        <p>
          There is no team member information that
          <br />
          matches the currently logged-in email address.
        </p>
      </div>
      <div className="text-sm mb-4">
        <p>
          Please try again in a moment
          <br />
          by clicking the retry button below,
          <br />
          or log out and log in with a different account.
        </p>
      </div>
      <div className="text-sm mb-4">
        <p>
          If you are still unable to verify team member information after
          multiple attempts,
          <br />
          please contact your administrator for assistance.
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          className="btn"
          onClick={() => {
            window.location.reload();
          }}
        >
          Retry
        </button>
        <form action={signoutAction}>
          <button className="btn" type="submit">
            Log out
          </button>
        </form>
      </div>
    </main>
  );
}
