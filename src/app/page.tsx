import Image from "next/image";

import { auth } from "@/lib/auth";
import FinngramLogo from "@/assets/finngram.svg";
import GoogleLoginBtn from "@/assets/google-login.svg";
import { signinAction } from "@/util/login";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/download-pass");
  }

  return (
    <main className="p-8 text-white flex flex-col gap-4 max-w-screen-sm mx-auto">
      <div>
        <Image src={FinngramLogo} alt="Finngram Logo" />
        <h1 className="font-bold wdth-expended">Apple Wallet Pass</h1>
      </div>
      <h2 className="text-2xl font-bold mt-4">
        Business Card
        <br />
        In your hands.
      </h2>
      <div className="text-sm">
        <p>
          To obtain a business card,
          <br />
          an identity verification is required.
        </p>
      </div>
      <div className="text-sm mb-4">
        <p>
          Please click the &quot;Continue with Google&quot; button
          <br />
          below to log in with an account from the `&quot;@finngram.com`&quot;
          domain.
        </p>
      </div>
      <form className="mx-auto" action={signinAction}>
        <button type="submit">
          <Image src={GoogleLoginBtn} alt="Continue with Google" height={40} />
        </button>
      </form>
    </main>
  );
}
