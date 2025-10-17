import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getFollowings } from "@/models/followingModels";
import Link from "next/link";
import SmallProfilePicture from "../(components)/SmallProfilePicture";
import DisplayFollowUnfollow from "../(components)/DisplayFollowUnfollow";

export default async function FollowingPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const followings = await getFollowings(session.user.id);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Followed Users</h1>
      <div className="flex flex-col gap-2">
        {followings.length > 0 ? (
          followings.map((follow) => (
            <div
              key={follow.followed.id}
              className="flex border justify-between items-center p-2 rounded"
            >
              <Link
                href={`/user/${follow.followed.name}`}
                className="max-w-fit flex items-center gap-2"
              >
                <SmallProfilePicture user={follow.followed} />
                <p>{follow.followed.name}</p>
              </Link>
              <DisplayFollowUnfollow
                selectedUser={follow.followed}
                sessionUser={session.user}
              />
            </div>
          ))
        ) : (
          <p>You are not following any users</p>
        )}
      </div>
    </>
  );
}
