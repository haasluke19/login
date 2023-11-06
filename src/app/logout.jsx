'use client'

import { signOut } from "next-auth/react";

export default function Logout() {
  return <button className="bg-black w-fit px-4 text-white" onClick={() => signOut()}>Logout</button>;
}
