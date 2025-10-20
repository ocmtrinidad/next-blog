import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getFollowers } from "@/models/followingModels";
import Link from "next/link";
import SmallProfilePicture from "../(components)/SmallProfilePicture";
import DisplayFollowUnfollow from "../(components)/DisplayFollowUnfollow";

export default async function FollowerPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const followers = await getFollowers(session.user.id);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Your Followers</h1>
      <div className="flex flex-col gap-2">
        {followers.length > 0 ? (
          followers.map((follow) => (
            <div
              key={follow.follower.id}
              className="flex border justify-between items-center p-2 rounded"
            >
              <Link
                href={`/user/${follow.follower.name}`}
                className="max-w-fit flex items-center gap-2"
              >
                <SmallProfilePicture user={follow.follower} />
                <p>{follow.follower.name}</p>
              </Link>
              <DisplayFollowUnfollow
                selectedUser={follow.follower}
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
