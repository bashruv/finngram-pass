"use server";

import { signIn, signOut } from "@/lib/auth";

export async function signinAction() {
  await signIn("google", { redirectTo: "/download-pass" });
}

export async function signoutAction() {
  await signOut();
}
