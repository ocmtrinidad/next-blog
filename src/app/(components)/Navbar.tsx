import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import BlueButton from "./BlueButton";
import Sidebar from "./Sidebar";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="flex gap-2 items-center p-4 border-b">
      <Link href={"/"}>
        <BlueButton>Home</BlueButton>
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
