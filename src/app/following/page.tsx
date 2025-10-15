import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getFollowings } from "@/models/followingModels";
import Link from "next/link";
import UnfollowButton from "../(components)/UnfollowButton";
import FollowButton from "../(components)/FollowButton";
import SmallProfilePicture from "../(components)/SmallProfilePicture";

export default async function FollowingPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const followings = await getFollowings(session.user.id);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Following</h1>
      <div className="flex flex-col gap-2">
        {followings.length > 0 ? (
          followings.map((following) => (
            <div
              key={following.followed.id}
              className="flex border justify-between p-2"
            >
              <Link
                href={`/user/${following.followed.name}`}
                className="max-w-fit flex items-center gap-2"
              >
                <SmallProfilePicture user={following.followed} />
                <p>{following.followed.name}</p>
              </Link>
              {session.user.id !== following.followed.id ? (
                <FollowButton
                  followerId={session.user.id}
                  followedId={following.followed.id}
                />
              ) : (
                <UnfollowButton followingId={following.id} />
              )}
            </div>
          ))
        ) : (
          <p>You are not following any users</p>
        )}
      </div>
    </>
  );
}
