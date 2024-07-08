import { NextResponse } from "next/server";

import { createPass } from "@/lib/pass";
import { getUserInfo } from "@/lib/query";

export async function GET() {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    return NextResponse.error();
  }

  const pass = await createPass(userInfo);

  return new NextResponse(pass, {
    headers: {
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": `attachment; filename=${userInfo?.serial}.pkpass`,
    },
  });
}
