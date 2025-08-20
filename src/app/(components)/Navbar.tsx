import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import BlueButton from "./BlueButton";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href={"/"}>NEXT BLOG</Link>
      {session ? (
        <div className="flex justify-between items-center gap-2">
          <Link href={"/create-post"}>
            <BlueButton>Create Post</BlueButton>
          </Link>
          <Link href={"/my-posts"}>
            <BlueButton>My Posts</BlueButton>
          </Link>
          <Link href={"/profile"}>
            <BlueButton>Profile</BlueButton>
          </Link>
          <Link href={"/api/auth/signout?callbackUrl=/"}>
            <BlueButton>Logout</BlueButton>
          </Link>
        </div>
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
