import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return children;
}
