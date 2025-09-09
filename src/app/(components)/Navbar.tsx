import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import BlueButton from "./BlueButton";
import Sidebar from "./Sidebar";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="flex gap-2 items-center p-4 border-b">
      <Link href={"/"} className="flex">
        <BlueButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-6"
          >
            <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </BlueButton>
      </Link>
      {session ? (
        <Sidebar userId={session.user.id} />
      ) : (
        <div className="flex justify-between items-center gap-2">
          <Link href={"/register"}>
            <BlueButton>Register</BlueButton>
          </Link>
          <Link href={"/api/auth/signin?callbackUrl=/"}>
            <BlueButton>Login</BlueButton>
          </Link>
        </div>
      )}
    </nav>
  );
}
