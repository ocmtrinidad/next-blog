import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";
import DeleteAccount from "./DeleteAccount";

export default async function ProfilePage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  return (
    <>
      <EditProfileForm user={session.user} />
      <DeleteAccount user={session.user} />
    </>
  );
}
