import { Post } from "@/models/postModels";
import Link from "next/link";
import DisplayPostUserButtons from "./DisplayPostUserButtons";
import DisplayLikeButton from "./DisplayLikeButton";
import SmallProfilePicture from "./SmallProfilePicture";
import DisplayCommentCounter from "./DisplayCommentCounter";
import { UserType } from "@/models/userModels";
import DisplayFollowUnfollow from "./DisplayFollowUnfollow";

export default function PostHeader({
  post,
  route,
  sessionUser,
}: {
  post: Post;
  route: string;
  sessionUser: UserType | null;
}) {
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
      </Link>
      <DisplayFollowUnfollow
        selectedUser={post.author}
        sessionUser={sessionUser}
      />
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
