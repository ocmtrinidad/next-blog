import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1>NEXT BLOG</h1>
      {session ? (
        <Link href={"/api/auth/signout?callbackUrl=/"}>
          <button className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
            Logout
          </button>
        </Link>
      ) : (
        <div className="flex justify-between items-center gap-2">
          <Link href={"/register"}>
            <button className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
              Register
            </button>
          </Link>
          <Link href={"/api/auth/signin?callbackUrl=/"}>
            <button className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
