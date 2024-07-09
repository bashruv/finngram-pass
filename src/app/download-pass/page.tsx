import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getUserInfo } from "@/lib/query";
import FinngramLogo from "@/assets/finngram.svg";
import AppleWalletBtn from "@/assets/apple-wallet.svg";

export async function generateMetadata() {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    return {
      title: "ERROR | Finngram",
    };
  }

  return {
    title: `${userInfo.name} | Finngram`,
  };
}

export default async function DownloadPathPage() {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    notFound();
  }

  return (
    <main className="p-8 text-white flex flex-col gap-4 max-w-screen-sm ">
      <div>
        <Image src={FinngramLogo} alt="Finngram Logo" />
        <h1 className="font-bold wdth-expended">Apple Wallet Pass</h1>
      </div>
      <h2 className="text-2xl font-bold">
        The user information
        <br />
        has been verified.
      </h2>
      <div className="text-sm">
        <p>
          You can receive an Apple Wallet Pass
          <br />
          based on the information below.
        </p>
      </div>
      <div className="overflow-x-auto border">
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{userInfo.name}</td>
            </tr>
            <tr>
              <th>Position</th>
              <td>{userInfo.position}</td>
            </tr>
            <tr>
              <th>Tel</th>
              <td>
                +82 10 {userInfo.phone.slice(0, 4)} {userInfo.phone.slice(-4)}{" "}
                (KR)
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <th>Telegram</th>
              <td>{userInfo.telegram}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-sm">
        <p>
          If you have any issues,
          <br />
          please contact the administrator.
        </p>
      </div>
      <Link className="mx-auto" href="/api/pass">
        <Image src={AppleWalletBtn} height={40} alt="Add to Apple Wallet" />
      </Link>
    </main>
  );
}
