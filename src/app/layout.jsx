import Link from "next/link";
import "./globals.css";
import { getServerSession } from "next-auth";
import Logout from "./logout";

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <nav>
          {!!session && 
          <div className="w-full justify-between flex px-6 mt-2">
            Welcome, {session.user.name}
            <Logout />
          </div>
          }
          {!session && (
            <div className="w-full justify-end gap-7 flex px-6 mt-2">
              <Link href="/login" className="bg-black w-fit px-4 text-white">Login</Link>
              <Link href="/register" className="bg-black w-fit px-4 text-white">Register</Link>
            </div>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
