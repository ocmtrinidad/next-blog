import { Post } from "@/models/postModels";
import Link from "next/link";
import DisplayPostUserButtons from "./DisplayPostUserButtons";
import DisplayLikeButton from "./DisplayLikeButton";
import SmallProfilePicture from "./SmallProfilePicture";
import DisplayCommentCounter from "./DisplayCommentCounter";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import { getFollowing } from "@/models/followingModels";
import { getUserById, UserType } from "@/models/userModels";

// MAKE CLIENT COMPONENT?
export default async function PostHeader({
  post,
  route,
  sessionUser,
}: {
  post: Post;
  route: string;
  sessionUser: UserType | null;
}) {
  const following = await getFollowing(sessionUser!.id, post.author.id);
  const user = await getUserById(post.author.id);

  return (
    <div className="flex flex-col border-b">
      <Link
        href={`/post/${post.id}`}
        className="text-2xl font-bold max-w-fit line-clamp-1"
      >
        {post.title}
      </Link>
      <Link
        href={`/user/${post.author.name}`}
        className="max-w-fit flex items-center gap-2"
      >
        <SmallProfilePicture user={post.author} />
        <p>{post.author.name}</p>
        {sessionUser &&
          user &&
          sessionUser.id !== user.id &&
          (!following ? (
            <FollowButton followerId={sessionUser.id} followedId={user.id} />
          ) : (
            <UnfollowButton followingId={following.id} />
          ))}
      </Link>
      <div className="flex flex-col md:flex-row mb-2 items-start md:gap-2 md:items-center">
        <p>{new Date(post.createdAt).toDateString()}</p>
        <div className="flex items-center gap-2">
          <DisplayLikeButton user={sessionUser!} post={post} />
          <DisplayCommentCounter post={post} />
          <DisplayPostUserButtons
            post={post}
            route={route}
            userId={sessionUser!.id}
          />
        </div>
      </div>
    </div>
  );
}
